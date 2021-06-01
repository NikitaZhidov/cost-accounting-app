export const SET_ERROR = "SET_ERROR";
export const SET_MESSAGE = "SET_MESSAGE";

const initialState = {
  msg: null,
  errorMsg: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_ERROR:
      return { ...state, errorMsg: payload };
    case SET_MESSAGE:
      return { ...state, msg: payload };

    default:
      return state;
  }
}
