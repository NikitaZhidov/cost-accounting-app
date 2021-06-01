export const SET_USER = "SET_USER";
export const LOGOUT = "LOGOUT";

export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";

export const SET_IS_LOADING = "SET_IS_LOADING";
export const SET_IS_AUTH_LOADING = "SET_IS_AUTH_LOADING";

const initialState = {
  isAuth: false,
  user: {
    id: null,
    nickname: null,
  },

  activeTab: null,
  isAuthLoading: false,
  isLoading: false,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        isAuth: true,
        user: payload,
        authMessage: null,
        authError: null,
      };
    case LOGOUT:
      return { ...state, isAuth: false, user: {} };
    case SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: payload,
        authMessage: null,
        authError: null,
      };
    case SET_IS_AUTH_LOADING:
      return { ...state, isAuthLoading: payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: payload };
    default:
      return state;
  }
}
