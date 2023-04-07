import { Role } from "enums";
import { LoginDto, UserInfo } from "interfaces/login";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState } from "../store/config";

export default function NoAuthGuard() {
  const loginState: LoginDto<UserInfo> = useSelector(
    (state: RootState) => state.loginReducer
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (loginState.token !== "") {
      switch (loginState.user.role) {
        case Role.ADMIN: {
          navigate("/admin/user-management");

          break;
        }
        case Role.USER: {
          navigate("/");
          break;
        }

        default: {
          navigate("/");
          break;
        }
      }
    }
  }, []);

  return <Outlet />;
}
