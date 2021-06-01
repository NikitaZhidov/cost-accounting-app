export const SET_USERS = "SET_USERS";
export const SET_IS_USERS_LOADING = "SET_IS_USERS_LOADING";

const initialState = {
  users: [],
  isUsersLoading: false,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_USERS:
      return { ...state, users: payload };
    case SET_IS_USERS_LOADING:
      return { ...state, isUsersLoading: payload };
    default:
      return state;
  }
}
