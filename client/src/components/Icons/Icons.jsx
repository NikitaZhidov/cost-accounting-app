import classNames from "classnames";
import React from "react";
import config from "../../config/config";
import s from "./Icons.module.scss";

const Icons = ({ icons, onClickIcon, className, idActiveIcon }) => {
  const classes = classNames(s.iconsWrapper, className);
  return (
    <div className={classes}>
      {icons &&
        icons.map((icon, i) => {
          return (
            <Icon
              onClick={onClickIcon}
              active={icon._id === idActiveIcon}
              src={icon.src}
              key={`${icon._id}_${i}`}
              id={icon._id}
            />
          );
        })}
    </div>
  );
};

const Icon = ({ src, id, onClick, active }) => {
  const onClickHandler = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div
      onClick={onClickHandler}
      className={classNames(s.icon, {
        [s.light]: true,
        [s.iconActive]: active,
      })}
    >
      <img src={config.baseURL + src} alt="" />
    </div>
  );
};

export default Icons;
