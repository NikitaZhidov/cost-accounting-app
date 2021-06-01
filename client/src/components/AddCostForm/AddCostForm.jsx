import React from "react";
import { useForm } from "react-hook-form";
import s from "./AddCostForm.module.scss";

import "react-datepicker/dist/react-datepicker.css";

import {
  AcceptButton,
  AddCostFormItem,
  InputSum,
  SelectCategory,
  SelectConsumers,
  SelectDate,
} from "../.";

import classNames from "classnames";
import { commentV, sumV } from "../../utils/formValidation";

const AddCostForm = ({
  onSubmitForm,
  addCategories,
  generalCategories,
  users,
  isUsersLoading,
  isCategoriesLoading,
  isCostsLoading,
}) => {
  const { register, handleSubmit, errors, control, reset } = useForm();

  const onSubmit = (formData) => {
    onSubmitForm({
      ...formData,
      category: JSON.parse(formData.category),
    });
    reset();
  };

  return (
    <>
      <form className={s.addCostForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={classNames(s.formRow, s.formMain)}>
          <div className={s.formColumn}>
            <AddCostFormItem label={"Cумма"}>
              <InputSum
                name={"sum"}
                inputRef={register(sumV())}
                placeholder={"Сумма..."}
                valute={"rub"}
                type={"number"}
                step={0.01}
                min={0}
                error={errors.sum}
              />
            </AddCostFormItem>
            <AddCostFormItem
              className={s.selectCategoryWrapper}
              label={"Категория"}
            >
              <SelectCategory
                isLoading={isCategoriesLoading}
                inputRef={register}
                generalCategories={generalCategories}
                addCategories={addCategories}
              />
            </AddCostFormItem>
            <AddCostFormItem label={"Дата"}>
              <SelectDate inputRef={register} />
            </AddCostFormItem>
          </div>
          <div className={s.formColumn}>
            <AddCostFormItem label={"Потребитель"}>
              <SelectConsumers
                control={control}
                isUsersLoading={isUsersLoading}
                inputRef={register}
                errors={errors}
                users={users}
              />
            </AddCostFormItem>
            <AddCostFormItem
              classNameWrapper={s.commentFormItem}
              className={s.commentFormItem}
              classNameChildrenWrapper={s.commentWrapper}
              error={errors.comment}
              label={"Комментарий"}
            >
              <textarea
                ref={register(commentV())}
                className={classNames(s.commentArea, {
                  [s.light]: true,
                  [s.error]: errors.comment,
                })}
                name={"comment"}
              ></textarea>
            </AddCostFormItem>
          </div>
        </div>
        <AcceptButton
          disabled={isCategoriesLoading || isCostsLoading}
          className={s.submitBtn}
          text={"Добавить"}
        />
      </form>
    </>
  );
};

export default AddCostForm;
