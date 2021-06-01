import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AcceptButton, Icons, Preloader, TextField } from "..";
import config from "../../config/config";
import { categoryNameV } from "../../utils/formValidation";
import s from "./CategoryInfo.module.scss";

const CategoryInfo = ({
  category,
  className,
  onDelete,
  onEdit,
  isConfirmation,
  isCategoryEditing,
  icons,
}) => {
  const { register, handleSubmit, errors } = useForm();

  const [isOpenConfirm, setIsOpenConfirm] = useState(isConfirmation);
  const [isCategoryDeletingLast, setIsCategoryDeletingLast] = useState(false);

  const [activeIconId, setActiveIconId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const classes = classNames(className);

  const onDeleteHandler = () => {
    if (onDelete) onDelete(category.id);
  };

  useEffect(() => {
    setActiveIconId(icons?.find?.((i) => i.src == category?.icon)?._id);
  }, [category, icons, isEditMode]);

  useEffect(() => {
    setIsCategoryDeletingLast(isCategoryEditing);

    if (!isConfirmation) {
      setIsOpenConfirm(isConfirmation);
      setIsEditMode(isConfirmation);
    }
  }, [isConfirmation]);

  if (
    isCategoryEditing ||
    isCategoryDeletingLast != isCategoryEditing ||
    !category
  ) {
    return <Preloader medium />;
  }

  const onSelectIconHandler = (iconId) => {
    setActiveIconId(iconId);
  };

  const onEditCategory = (formData) => {
    if (formData.name == category.name) {
      const prevIconId = icons?.find?.((i) => i.src == category?.icon)?._id;
      if (prevIconId == activeIconId) {
        setIsEditMode(false);
        return;
      }
    }

    const iconSrc = icons?.find?.((i) => i._id === activeIconId).src;

    if (onEdit)
      onEdit({
        name: formData.name,
        iconId: activeIconId,
        id: category.id,
        iconSrc,
      });

    setIsEditMode(false);
  };

  const onClickCloseEditMode = (e) => {
    e.preventDefault();
    setIsEditMode(false);
  };

  return (
    <div className={classes}>
      {isEditMode && !isOpenConfirm && (
        <form onSubmit={handleSubmit(onEditCategory)}>
          <Icons
            idActiveIcon={activeIconId}
            onClickIcon={onSelectIconHandler}
            icons={icons}
            className={s.selectIcon}
          />
          <TextField
            error={errors.name}
            inputRef={register(categoryNameV())}
            className={s.inputCategoryName}
            defaultValue={category.name}
            placeholder={"Имя категории..."}
            name={"name"}
          />
          <div className={s.buttonsArea}>
            <AcceptButton
              text={"Удалить"}
              onClick={() => setIsOpenConfirm(true)}
              cancelStyle
            />
            <AcceptButton text={"Изменить"} type={"sumbit"} />
            <AcceptButton text={"Отмена"} onClick={onClickCloseEditMode} />
          </div>
        </form>
      )}
      {isOpenConfirm && (
        <div>
          <div className={s.confirmMessage}>
            <p>
              Вы действительно хотите удалить категорию{" "}
              <strong>{category?.name}</strong>?
            </p>
            <p>
              Все расходы из данной категории будут <b>удалены</b>.
            </p>
          </div>
          <div className={s.buttonsArea}>
            <AcceptButton
              text={"Удалить"}
              cancelStyle
              onClick={onDeleteHandler}
            />
            <AcceptButton
              text={"Отмена"}
              onClick={() => setIsOpenConfirm(false)}
            />
          </div>
        </div>
      )}
      {!isOpenConfirm && !isEditMode && (
        <div>
          <div className={classNames(s.categoryIcon, { [s.light]: true })}>
            {category && <img src={config.baseURL + category.icon} />}
          </div>
          <div className={classNames(s.categoryName, { [s.light]: true })}>
            {category && category.name}
          </div>
          {!category?.isGeneral && (
            <div className={s.buttonsArea}>
              <AcceptButton
                text={"Редактировать"}
                onClick={() => setIsEditMode(true)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryInfo;
