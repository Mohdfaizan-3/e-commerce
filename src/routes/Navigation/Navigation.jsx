import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assest/crown.svg";
import CartIcon from "../../components/CartIcon/CartIcon";
import { cartContext } from "../../context/Cart.context";
import { UserContext } from "../../context/User.context";
import { signOutUser } from "../../utils/firebase/firebase";
import "./navigation.styles.scss";
import CartDropdown from "../../components/cartDropDown/CartDropDown";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(cartContext);

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/">
            SHOP
          </Link>
          {!currentUser ? (
            <Link className="nav-link" to="/signIn">
              SIGN IN
            </Link>
          ) : (
            <span className="nav-link" onClick={signOutUser}>
              SIGN OUT
            </span>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown/>}
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
