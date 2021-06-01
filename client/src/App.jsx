import { BrowserRouter, Redirect, Route } from "react-router-dom";
import s from "./App.module.scss";

import { Burger, Navbar, Preloader } from "./components";
import { LoginPage } from "./pages";

import routes from "./utils/navRouter";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { auth } from "./redux/actions/auth";

import { setMessage, setError } from "./redux/actions/messages";

import { toast, ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addRoutes from "./utils/addRoutes";

function App() {
  const [lastLocation, setLastLocation] = useState(null);
  const isAuth = useSelector(({ auth }) => auth.isAuth);
  const userName = useSelector(({ auth }) => auth.user.nickname);
  const isAuthLoading = useSelector(({ auth }) => auth.isAuthLoading);

  const { errorMsg, msg } = useSelector(({ messages }) => messages);

  const dispatch = useDispatch();

  if (
    window.location.pathname != "/login" &&
    window.location.pathname != lastLocation
  ) {
    setLastLocation(window.location.pathname);
  }

  useEffect(() => {
    dispatch(auth());
  }, []);

  if (errorMsg) {
    toast.error(errorMsg);
    dispatch(setError(null));
  }

  if (msg) {
    toast.success(msg);
    dispatch(setMessage(null));
  }

  if (isAuthLoading) {
    return <Preloader />;
  }

  // todo реализовать history pagination как в сбере
  // todo - сделать возьможность выбора PAGE_SIZE
  // todo Разобраться с датой в базе данных (почему 21 00)
  // todo Декомпозировать costsHistory
  // todo Сделать нормальный header в costsHistory + навигацию

  return (
    <div className={s.app}>
      <BrowserRouter>
        {!isAuth && <Redirect to="/login" />}
        {isAuth && <Navbar userName={userName} />}
        {isAuth && (
          <div className={s.content}>
            <ToastContainer
              autoClose={2500}
              hideProgressBar={true}
              transition={Flip}
            />
            {routes.map((route, index) => {
              return (
                <Route
                  key={`${index}_${route}`}
                  path={route.to}
                  component={route.component}
                />
              );
            })}
          </div>
        )}
        <Route
          path="/login"
          render={() => (
            <LoginPage lastLocation={lastLocation} isAuth={isAuth} />
          )}
          exact
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
