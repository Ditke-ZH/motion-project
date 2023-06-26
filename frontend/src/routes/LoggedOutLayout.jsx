import { Outlet } from "react-router-dom";

export default function LoggedOutLayout() {
  // some other code here

  return (
    <>
      {/* <h1>LoggedOutLayout</h1> */}
      <Outlet />
    </>
  );
}
