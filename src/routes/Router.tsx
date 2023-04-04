import LocationForm from "pages/location-form/LocationForm";
import React from "react";
import { useRoutes } from "react-router-dom";
import { PathAdmin } from "enums";
import AdminGuard from "guards/AdminGuard";
import NoAuthGuard from "guards/NoAuthGuard";
import AdminLayout from "layouts/adminLayout/AdminLayout";
import HomeLayout from "layouts/homeLayout/HomeLayout";
import LocationDataInformation from "pages/location-data-information/LocationDataInformation";
import Login from "pages/login/Login";
import PageNotFound from "pages/page-not-found/PageNotFound";
import RoomInformation from "pages/room-information/RoomInformation";
import RoomReservationInformation from "pages/room-reservation-information/RoomReservationInformation";
import UserForm from "pages/user-form/UserForm";
import UserManagement from "pages/user-management/UserManagement";
import RoomForm from "pages/room-form/RoomForm";
import Home from "pages/home/Home";
import RoomList from "pages/room/RoomList";

export default function Router(): React.ReactElement<any> | null {
  //path
  const { ADMIN, USER, LOCATION, ROOM, ROOM_RESERVATION, CREATE, UPDATE } =
    PathAdmin;

  const routing = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/room-list",
      element: <RoomList />,
    },
    {
      path: "/",
      element: <NoAuthGuard />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: ADMIN,
      element: <AdminGuard />,
      children: [
        {
          path: ADMIN,
          element: <AdminLayout />,
          children: [
            {
              path: `${ADMIN + USER}`,
              element: <UserManagement />,
            },
            {
              path: `${ADMIN + USER + CREATE}`,
              element: <UserForm />,
            },
            {
              path: `${ADMIN + USER + UPDATE + ":userId"}`,
              element: <UserForm />,
            },
            {
              path: `${ADMIN + LOCATION}`,
              element: <LocationDataInformation />,
            },
            {
              path: `${ADMIN + LOCATION + CREATE}`,
              element: <LocationForm />,
            },
            {
              path: `${ADMIN + LOCATION + UPDATE + ":locationId"}`,
              element: <LocationForm />,
            },
            {
              path: `${ADMIN + ROOM}`,
              element: <RoomInformation />,
            },
            {
              path: `${ADMIN + ROOM + CREATE}`,
              element: <RoomForm />,
            },
            {
              path: `${ADMIN + ROOM + UPDATE + ":roomId"}`,
              element: <RoomForm />,
            },
            {
              path: `${ADMIN + ROOM_RESERVATION}`,
              element: <RoomReservationInformation />,
            },
          ],
        },
        {},
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return routing;
}
