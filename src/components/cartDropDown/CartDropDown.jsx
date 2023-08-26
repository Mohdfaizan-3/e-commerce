import { useContext } from "react";
import { cartContext } from "../../context/Cart.context";
import CartItem from "../CartItem/CartItem";
import "./styles.scss";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const CartDropdown = () => {
  const { cartItems } = useContext(cartContext);
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate('/checkout')
  }
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      <Button style={{margin:"0 auto"}} buttonType={"inverted"} onClick={handleCheckout}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
