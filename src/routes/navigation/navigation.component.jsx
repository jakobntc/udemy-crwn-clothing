import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"

import { UserContext } from "../../contexts/user.context"

import './navigation.styles.scss'


const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  console.log("currentUser = ", currentUser);
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <div className="logo" styles="margin: 20px;"><CrwnLogo className="logo" /></div>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            SHOP
          </Link>
          <Link className="nav-link" to="/contact">
            CONTACT
          </Link>
          {
            currentUser ? (
              <span className="nav-link">SIGN OUT</span>
            ) : (
              <Link className="nav-link" to="/auth">
                SIGN IN
              </Link>
            )
          }
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default Navigation