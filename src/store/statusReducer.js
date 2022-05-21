const ADD_STATUS = "ADD_STATUS",
  REMOVE_STATUS = "REMOVE_STATUS";

const initialState = {
  statusList: [],
};

export const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STATUS:
      return { ...state, todoList: [...state.todoList, action.payload] };
    case REMOVE_STATUS:
      return {
        ...state,
        todoList: state.todoList.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export const addToDoAction = (payload) => {
  return { type: ADD_STATUS, payload };
};

export const removeToDoAction = (payload) => {
  return { type: REMOVE_STATUS, payload };
};
