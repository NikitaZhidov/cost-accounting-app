import classNames from "classnames";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Burger, DropDown, DropItem, NavRoute, SubmitButton } from "..";
import userIcon from "../../assets/img/icons/user.svg";
import { logout } from "../../redux/actions/auth";

import routes from "../../utils/navRouter";

import s from "./Navbar.module.scss";

function Navbar({ userName, className }) {
  const [isOpenNavbar, setIsOpenNavbar] = useState(false);

  const dispatch = useDispatch();

  const dropDownSelectHandler = (value) => {
    switch (value) {
      case "logout":
        dispatch(logout());
        break;
      default:
        break;
    }
    closeNavbar();
  };

  const overlayRef = useRef({});

  const closeNavbar = () => {
    setIsOpenNavbar(false);
  };

  const clickOverlayHandler = (e) => {
    if (overlayRef.current == e.target) {
      closeNavbar();
    }
  };

  return (
    <>
      <Burger onClick={() => setIsOpenNavbar(!isOpenNavbar)} />
      <div
        ref={overlayRef}
        onClick={clickOverlayHandler}
        className={classNames(s.navbarWrapper, { [s.open]: isOpenNavbar })}
      >
        <div
          className={classNames(s.navbar, className, {
            [s.light]: true,
            [s.open]: isOpenNavbar,
          })}
        >
          <div className={classNames(s.navbarUser, { [s.light]: true })}>
            <span onClick={closeNavbar} className={s.closeNavbar}>
              &times;
            </span>
            <img src={userIcon} alt="user" />
            <DropDown
              customLabel={userName}
              showArrow
              onSelect={dropDownSelectHandler}
            >
              <DropItem label={"Выйти"} value={"logout"} />
            </DropDown>
          </div>

          <nav className={s.navMenu}>
            {routes &&
              routes.map((route, index) => {
                return (
                  <NavRoute
                    onClick={closeNavbar}
                    key={`${route.linkName}_${index}`}
                    linkName={route.linkName}
                    to={route.to}
                    icon={route.icon}
                  />
                );
              })}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
