const ADD_STATUS = "ADD_STATUS",
  REMOVE_STATUS = "REMOVE_STATUS";

const initialState = {
  statusList: [],
};

export const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STATUS:
      return { ...state, statusList: [...state.statusList, action.payload] };
    case REMOVE_STATUS:
      return {
        ...state,
        statusList: state.statusList.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export const addToDoStatus = (payload) => {
  return { type: ADD_STATUS, payload };
};

export const removeToDoStatus = (payload) => {
  return { type: REMOVE_STATUS, payload };
};
