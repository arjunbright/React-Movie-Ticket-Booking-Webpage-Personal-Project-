import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/cart.css";

const Cart = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [showPayment, setShowPayment] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: "",
        expiry: "",
        cvv: "",
    });
    const [errors, setErrors] = useState({});
    const [booking, setBooking] = useState(state || null); // fallback state

    useEffect(() => {
        if (!state) {
            const recentBooking = JSON.parse(sessionStorage.getItem("recentBooking"));
            if (recentBooking) setBooking(recentBooking);
        } else {
            sessionStorage.setItem("recentBooking", JSON.stringify(state));
        }
    }, [state]);

    if (!booking) return <h2>Cart is empty.</h2>;

    const { movie, selectedSeats = [], price = 0, date, time } = booking;

    const handleProceed = () => {
        setShowPayment(true);
    };

    const handleInputChange = (e) => {
        setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    };

    const validateCard = () => {
        const newErrors = {};
        if (!paymentInfo.cardNumber.match(/^\d{16}$/)) {
            newErrors.cardNumber = "Card number must be 16 digits";
        }
        if (!paymentInfo.expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
            newErrors.expiry = "Expiry must be in MM/YY format";
        }
        if (!paymentInfo.cvv.match(/^\d{3}$/)) {
            newErrors.cvv = "CVV must be 3 digits";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePay = () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        if (paymentMethod === "card" && !validateCard()) return;

        alert(`Payment via ${paymentMethod.toUpperCase()} Successful!`);
        // Optionally clear cart sessionStorage
        // sessionStorage.removeItem("bookings");
        navigate("/home");
    };

    return (
        <div className="cart-container">
            <h2 className="cart-heading">Your Cart</h2>

            <div className="cart-content">
                <div className="cart-items">
                    <div className="cart-item">
                        <div className="item-info">
                            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                            <div>
                                <h3>{movie.title}</h3>
                                <p>
                                    {date} | {time}
                                </p>
                                <p>
                                    {selectedSeats.length} seat(s): {selectedSeats.join(", ")}
                                </p>
                            </div>
                        </div>
                        <div className="item-price">${price.toFixed(2)}</div>
                    </div>
                </div>

                {!showPayment ? (
                    <div className="cart-totals">
                        <h3>Cart Totals</h3>
                        <p>Subtotal: ${price.toFixed(2)}</p>
                        <p>Tax: $0.00</p>
                        <p>Shipping: Free</p>
                        <hr />
                        <h4>Total: ${price.toFixed(2)}</h4>
                        <button onClick={handleProceed}>Proceed to Checkout</button>
                        <button className="continue" onClick={() => navigate("/MovieList")}>
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="cart-totals">
                        <h3>How would you like to pay?</h3>
                        <div className="payment-options">
                            <label>
                                <input type="radio" name="method" value="card" onChange={(e) => setPaymentMethod(e.target.value)} />
                                Card
                            </label>
                            <label>
                                <input type="radio" name="method" value="gpay" onChange={(e) => setPaymentMethod(e.target.value)} />
                                Google Pay
                            </label>
                            <label>
                                <input type="radio" name="method" value="apple" onChange={(e) => setPaymentMethod(e.target.value)} />
                                Apple Pay
                            </label>
                        </div>

                        {paymentMethod === "card" && (
                            <div className="card-details">
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    value={paymentInfo.cardNumber}
                                    onChange={handleInputChange}
                                />
                                {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

                                <input
                                    type="text"
                                    name="expiry"
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    value={paymentInfo.expiry}
                                    onChange={handleInputChange}
                                />
                                {errors.expiry && <p className="error">{errors.expiry}</p>}

                                <input type="text" name="cvv" placeholder="CVV" maxLength={3} value={paymentInfo.cvv} onChange={handleInputChange} />
                                {errors.cvv && <p className="error">{errors.cvv}</p>}
                            </div>
                        )}

                        <button className="pay-btn" onClick={handlePay}>
                            Pay Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
