import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { SubmitButton, TextField } from "..";

import { emailV, nicknameV, passwordV } from "../../utils/formValidation";
import s from "./RegistrationForm.module.scss";

export default function RegistrationForm({ onSubmitForm }) {
  const { register, handleSubmit, errors, watch } = useForm();
  const password = useRef({});

  password.current = watch("password", "");

  const onSubmit = React.useCallback((data) => {
    onSubmitForm(data);
  }, []);

  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          inputRef={register(emailV())}
          className={s.input}
          type={"email"}
          label={"Email"}
          name={"email"}
          error={errors.email}
        />
        <TextField
          inputRef={register(nicknameV())}
          className={s.input}
          type={"text"}
          label={"Имя"}
          name={"nickname"}
          error={errors.nickname}
        />
        <TextField
          inputRef={register(passwordV())}
          className={s.input}
          type={"password"}
          label={"Пароль"}
          name={"password"}
          error={errors.password}
        />
        <TextField
          inputRef={register({
            validate: (v) => v === password.current || "Пароли не совпадают",
          })}
          name={"confirm_password"}
          className={s.input}
          type={"password"}
          label={"Пароль еще раз"}
          error={errors.confirm_password}
        />
        <SubmitButton text={"Зарегистрироваться"} />
      </form>
    </div>
  );
}
