import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context"; 
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../cart/cart-icon/cart-icon.component";
import CartDropdownMenu from "../cart/cart-dropdown/cart-dropdown.component";
import CrwnLogo from '../../../public/crown.svg?react';
import styles from './style.module.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { showCartMenu } = useContext(CartContext);

    return (
        <Fragment>
            <div className={styles.navigation}>
                <Link className={styles.logoContainer} to="/">
                    <CrwnLogo className="logo" />
                </Link>
                <div className={styles.navLinksContainer}>
                    <Link className={styles.navLink} to="/shop">
                        SHOP
                    </Link>
                    {
                        currentUser ? (
                            <span className={styles.navLink} onClick={signOutUser}>SIGN OUT</span>
                        ) : (
                            <Link className={styles.navLink} to="/authentication">
                                SIGN IN
                            </Link>
                        )
                    }
                    <CartIcon />
                </div>
                {showCartMenu && <CartDropdownMenu />}
            </div>
            <Outlet />
        </Fragment>
    )
  };

export default Navigation;