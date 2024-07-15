import authSlice from "../store/authSlice";
import { AppDispatch } from "../store/store";

export const signInUser = () => {
  return async (dispatch: AppDispatch) => {
    const fakeDBData = { name: "John", id: 547 };
    dispatch(authSlice.actions.authenticateUser({ user: fakeDBData }));
  };
};
