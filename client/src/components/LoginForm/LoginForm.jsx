import React from "react";
import { TextField } from "..";
import SubmitButton from "../ui/SubmitButton/SubmitButton";
import { useForm } from "react-hook-form";

import "react-toastify/dist/ReactToastify.css";

import s from "./LoginForm.module.scss";
import { emailV, passwordV } from "../../utils/formValidation";

export default function LoginForm({ onSubmitForm }) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = React.useCallback(async (data) => {
    onSubmitForm(data);
  }, []);

  return (
    <div className={s.wrapper}>
      <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          inputRef={register(emailV())}
          error={errors.email}
          name={"email"}
          className={s.input}
          label={"Email"}
          type={"email"}
        />
        <TextField
          inputRef={register(passwordV())}
          error={errors.password}
          name={"password"}
          className={s.input}
          label={"Пароль"}
          type={"password"}
        />
        <SubmitButton text={"Войти"} />
      </form>
    </div>
  );
}
