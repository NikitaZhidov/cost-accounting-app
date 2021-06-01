const requiredMessage = "Это обязательное поле";

export const emailV = () => ({
  required: requiredMessage,
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: "Некорректный email",
  },
});

export const sumV = () => ({
  required: requiredMessage,
});

export const selectV = () => ({
  required: requiredMessage,
  validate: (v) => v.length > 0,
});

export const passwordV = () => ({
  required: requiredMessage,
  minLength: {
    value: 4,
    message: "Минимальная длина пароля 4 символа",
  },
  maxLength: {
    value: 30,
    message: "Максимальная длина пароля 30 символов",
  },
});

export const nicknameV = () => ({
  required: requiredMessage,
  minLength: {
    value: 2,
    message: "Минимальная длина имени 2 символа",
  },
  maxLength: {
    value: 30,
    message: "Максимальная длина имени 30 символов",
  },
});

export const commentV = () => ({
  maxLength: {
    value: 80,
    message: "Максимальная длина 80 символов",
  },
});

export const categoryNameV = () => ({
  maxLength: {
    value: 30,
    message: "Максимальная длина 30 символов",
  },
  required: requiredMessage,
});
