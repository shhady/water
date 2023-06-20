import { Outlet } from "react-router-dom";
import { Alert } from "../";

const SharedLayout = () => {
  return (
    <div className="container">
      <Alert />
      <Outlet />
    </div>
  );
};

export default SharedLayout;
