import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AcceptButton, Icons, TextField } from "..";
import { categoryNameV } from "../../utils/formValidation";
import s from "./AddCategoryForm.module.scss";

const AddCategoryForm = ({ icons, onSubmit, onCancel }) => {
  const [activeIconId, setActiveIconId] = useState(null);

  const { register, errors, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (icons.length > 0) setActiveIconId(icons[0]._id);
  }, [icons]);

  const onSubmitForm = (formData) => {
    if (onSubmit) onSubmit({ name: formData.name, id: activeIconId });
    formReset();
    onCancel();
  };

  const formReset = () => {
    reset();
    if (icons.length > 0) setActiveIconId(icons[0]._id);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    formReset();
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className={classNames(s.labelName, { [s.light]: true })}>
        Имя категории
      </div>
      <TextField
        error={errors.name}
        inputRef={register(categoryNameV())}
        className={s.inputName}
        name={"name"}
        placeholder={"Имя категории..."}
      />
      <div className={classNames(s.labelName, { [s.light]: true })}>Иконка</div>
      <Icons
        onClickIcon={setActiveIconId}
        idActiveIcon={activeIconId}
        className={s.icons}
        icons={icons}
      />
      <div className={s.sumbitBtns}>
        <AcceptButton text={"Добавить"} />
        <AcceptButton text={"Отмена"} onClick={cancelHandler} cancelStyle />
      </div>
    </form>
  );
};

export default AddCategoryForm;
