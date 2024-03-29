import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import CrwnLogo from '../../../public/crown.svg?react';
import styles from './style.module.scss';

const Navigation = () => {
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
                    <Link className={styles.navLink} to="/login">
                        LOGIN
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    )
  };

export default Navigation;