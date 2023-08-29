import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutItem from "../../components/CheckoutItem/CheckoutItem";
import { cartContext } from "../../context/Cart.context";
import { UserContext } from "../../context/User.context";
import { makePayment } from "../../payment/razorpay";
import { postPurchasedItems } from "../../utils/firebase/firebase";
import "./styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(cartContext);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!currentUser?.uid) {
      toast.error("please sign in first");
      return;
    }
    await makePayment(cartTotal, currentUser.email, navigate);
    await postPurchasedItems(currentUser.uid, cartItems, cartTotal);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <span className="total">Total: ${cartTotal}</span>
      <button onClick={handlePayment}>proceed to pay</button>
    </div>
  );
};

export default Checkout;
