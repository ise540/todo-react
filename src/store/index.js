import { statusReducer } from "./statusReducer";
import { todoReducer } from "./todoReducer";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
    statusReducer,
    todoReducer
})

export const store = createStore(rootReducer);