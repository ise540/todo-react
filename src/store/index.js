import { statusReducer } from "./statusReducer";
import { todoReducer } from "./todoReducer";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { save, load } from "redux-localstorage-simple"

const createStoreWithMiddleware 
    = applyMiddleware(
        save()
    )(createStore)

const rootReducer = combineReducers({
    statusReducer,
    todoReducer
})

export const store = createStoreWithMiddleware(
    rootReducer,    
    load()
)   