import { useContext } from "react";
import  {ReactComponent as ShoppingIcon} from "../../assest/shoppingBag.svg";
import "./cartIcon.scss"
import { cartContext } from "../../context/Cart.context";
const CartIcon = () => {
    const {isCartOpen , setCartOpen, cartCount} = useContext(cartContext);
    const toggleCartOpen = () => {
        setCartOpen(!isCartOpen);
    }
  return (
    <div className="cart-icon-container" onClick={toggleCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
