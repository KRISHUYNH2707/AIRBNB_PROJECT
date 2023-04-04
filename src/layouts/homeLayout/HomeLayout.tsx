import React from "react";
import { NavLink } from "react-router-dom";

export default function HomeLayout(): JSX.Element {
  return <NavLink to={"/login"}> Login </NavLink>;
}
