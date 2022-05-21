const ADD_TODO = "ADD_TODO",
  REMOVE_TODO = "REMOVE_TODO",
  UPDATE_TODO = "UPDATE_TODO";

const initialState = {
  todoList: [],
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todoList: [...state.todoList, action.payload] };
    case REMOVE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((item) => item.id !== action.payload),
      };
    case UPDATE_TODO:
        const elemIndex = state.todoList.findIndex((item)=> item.id === action.payload.id)
        state.todoList[elemIndex] = action.payload;
        return {...state}

    default:
      return state;
  }
};

export const addToDoAction = (payload) => {
  return { type: ADD_TODO, payload };
};

export const removeToDoAction = (payload) => {
  return { type: REMOVE_TODO, payload };
};

export const updateToDoAction = (payload) => {
    return { type: UPDATE_TODO, payload };
  };
