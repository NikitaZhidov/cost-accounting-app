import auth from "./reducers/auth";
import costs from "./reducers/costs";
import messages from "./reducers/messages";
import icons from "./reducers/icons";
import users from "./reducers/users";

const { combineReducers } = require("redux");
const rootReducer = combineReducers({ auth, costs, messages, icons, users });

export default rootReducer;
