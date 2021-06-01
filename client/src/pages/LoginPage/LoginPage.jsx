import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import {
  LoginForm,
  Preloader,
  RegistrationForm,
  TabBar,
  TabBarItem,
} from "../../components";

import { toast, ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login, register, setActiveTab } from "../../redux/actions/auth";

import { setError, setMessage } from "../../redux/actions/messages";

import s from "./LoginPage.module.scss";

const LoginPage = ({ isAuth, lastLocation }) => {
  const dispatch = useDispatch();

  const { activeTab, isLoading } = useSelector(({ auth }) => auth);

  const { errorMsg, msg } = useSelector(({ messages }) => messages);

  if (isAuth) {
    return <Redirect to={lastLocation || "/"} />;
  }

  if (errorMsg) {
    toast.error(errorMsg);
    dispatch(setError(null));
  }

  if (msg) {
    toast.success(msg);
    dispatch(setMessage(null));
  }

  const loginHandler = async (data) => {
    dispatch(login(data));
  };

  const registerHandler = async (data) => {
    dispatch(register(data));
  };

  const setActiveTabItem = (tabLabel) => {
    dispatch(setActiveTab(tabLabel));
  };

  return (
    <div className={classNames(s.loginPage, { [s.light]: true })}>
      <ToastContainer
        autoClose={2500}
        hideProgressBar={true}
        transition={Flip}
      />
      <div className={classNames(s.formWrapper, { [s.light]: true })}>
        {isLoading && (
          <div className={s.preloaderWrapper}>
            <Preloader medium />
          </div>
        )}
        <TabBar activeTabItem={activeTab} onSetActiveTabItem={setActiveTabItem}>
          <TabBarItem label="Авторизация">
            <LoginForm onSubmitForm={loginHandler} />
          </TabBarItem>
          <TabBarItem label="Регистрация">
            <RegistrationForm onSubmitForm={registerHandler} />
          </TabBarItem>
        </TabBar>
      </div>
    </div>
  );
};

export default React.memo(LoginPage);
