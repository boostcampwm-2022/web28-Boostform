import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Manage from "pages/Manage";
import Edit from "pages/Edit";
import Main from "pages/Main";
import Login from "pages/Login";
import View from "pages/View";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/forms/:id/edit",
    element: <Edit />,
  },
  {
    path: "/forms/:id/view",
    element: <View />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/manage",
    element: <Manage />,
  },
]);

export default router;
