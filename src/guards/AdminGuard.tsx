import { RootState } from "../store/config";
import { notification } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Role } from "../enums";

export default function AdminGuard(): JSX.Element {
  const userState = useSelector((state: RootState) => state.loginReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.token === "") {
      notification.warning({
        message: "Cannot access without logging in!",
      });
      navigate("/login");
    } else {
      switch (userState.user.role) {
        case Role.USER:
          notification.warning({
            message: "Customer is not authorized to access!",
          });
          navigate("/");
          break;
        case Role.ADMIN:
          notification.success({
            message: "Accessed management page successfully!",
          });
          navigate("/admin");
          break;
        default:
          break;
      }
    }
  }, []);

  return <Outlet />;
}
