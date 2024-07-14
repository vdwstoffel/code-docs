import { useAppDispatch, useAppSelector } from "./store/storeHooks";
import { logout } from "./store/authSlice";
import { signInUser } from "./api/auth";

import "./App.css";

function App() {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.auth.user);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <p>Name: {userDetails.name}</p>
      <p>Id: {userDetails.id}</p>
      <p>Status: {isLoggedIn}</p>
      <button onClick={() => dispatch(signInUser())}>Sign In</button>
      <button onClick={() => dispatch(logout())}>Log Out</button>
    </>
  );
}

export default App;
