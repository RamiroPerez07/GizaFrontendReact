import { USER_TYPES } from "../types/types";

export const setCurrentUser = (user) => {
  return {
    type: USER_TYPES.SET_CURRENT_USER, 
    payload: user,
  };
};