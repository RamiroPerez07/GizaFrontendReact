import { USER_TYPES } from "../types/types";


const initial_state = {
  user : null,
}

export const userReducer = (state=initial_state,action) => {
  switch(action.type){
    case USER_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state;
  }
}