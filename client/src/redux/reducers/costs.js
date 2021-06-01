export const SET_COSTS = "SET_COSTS";
export const UPLOAD_COSTS = "UPLOAD_COSTS";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const ADD_COST = "ADD_COST";
export const SET_IS_COSTS_LOADING = "SET_IS_COSTS_LOADING";
export const SET_IS_CATEGORIES_LOADING = "SET_IS_CATEGORIES_LOADING";
export const SET_IS_CATEGORY_EDITING = "SET_IS_CATEGORY_EDITING";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export const DELETE_COST = "DELETE_COST";
export const SET_IS_COST_DELETING = "SET_IS_COST_DELETING";

const initialState = {
  costs: {
    users: [],
  },
  isCostsLoading: false,
  isCategoriesLoading: false,
  isCategoryEditing: false,
  isCostDeleting: false,
  categories: {
    addCategories: [],
    generalCategories: [],
  },
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SET_COSTS:
      return {
        ...state,
        costs: {
          ...state.costs,
          users: payload.users,
          hasNext: payload.hasNext,
        },
      };
    case UPLOAD_COSTS: {
      const newUsers = [...state.costs.users];
      payload.users.forEach((pu) => {
        let beforeUserPayloadIndex = state.costs.users.findIndex(
          (u) => u._id === pu._id
        );
        if (beforeUserPayloadIndex > -1) {
          newUsers[beforeUserPayloadIndex] = {
            ...newUsers[beforeUserPayloadIndex],
            costs: {
              ...newUsers[beforeUserPayloadIndex].costs,
              costs: [
                ...newUsers[beforeUserPayloadIndex].costs.costs,
                ...pu.costs.costs,
              ],
            },
          };
        } else {
          newUsers.push(pu);
        }
      });

      return {
        ...state,
        costs: {
          ...state.costs,
          users: newUsers,
          hasNext: payload.hasNext,
        },
      };
    }
    case ADD_COST:
      return {
        ...state,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: {
          generalCategories: payload.general,
          addCategories: payload.addCategories,
        },
      };
    case SET_IS_COSTS_LOADING:
      return {
        ...state,
        isCostsLoading: payload,
      };
    case SET_IS_CATEGORIES_LOADING:
      return {
        ...state,
        isCategoriesLoading: payload,
      };
    case SET_IS_CATEGORY_EDITING:
      return {
        ...state,
        isCategoryEditing: payload,
      };
    case SET_IS_COST_DELETING:
      return {
        ...state,
        isCostDeleting: payload,
      };
    case DELETE_COST:
      const newUsers = state.costs.users.map((user) => {
        if (user._id === payload.userId) {
          return {
            ...user,
            costs: {
              ...user.costs,
              costs: user.costs.costs.filter((c) => c._id !== payload.costId),
            },
          };
        }
        return user;
      });

      return {
        ...state,
        costs: {
          ...state.costs,
          users: [...newUsers],
        },
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        categories: {
          ...state.categories,
          addCategories: [
            ...state.categories.addCategories.map((c) => {
              if (c.id === payload.id) {
                return {
                  name: payload.name,
                  isGeneral: false,
                  id: payload.id,
                  icon: payload.iconSrc,
                };
              }
              return c;
            }),
          ],
        },
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: {
          ...state.categories,
          addCategories: [
            ...state.categories.addCategories.filter(
              (c) => c.id !== payload.id
            ),
          ],
        },
      };
    default:
      return state;
  }
}
