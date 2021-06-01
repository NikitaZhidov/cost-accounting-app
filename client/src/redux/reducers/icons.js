export const SET_ICONS = "SET_ICONS";

const initialState = {
  icons: [],
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_ICONS:
      return { ...state, icons: payload };
    default:
      return state;
  }
}
