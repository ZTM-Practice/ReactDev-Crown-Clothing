/// <reference types="vite-plugin-svgr/client" />
import { Outlet, Link, ScrollRestoration } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signOutStart } from "../../store/user/user.action";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectShowCartMenu } from "../../store/cart/cart.selector";
import CartIcon from "../cart/cart-icon/cart-icon.component";
import CartDropdownMenu from "../cart/cart-dropdown/cart-dropdown.component";
import CrwnLogo from '../../public/crown.svg?react';
import styles from './style.module.scss';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const showCartMenu = useSelector(selectShowCartMenu);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [showCartMenu]);

    const handleSignOut = () => dispatch(signOutStart())

    return (
        <Fragment>
            <ScrollRestoration />
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
                            <span className={styles.navLink} onClick={handleSignOut}>SIGN OUT</span>
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