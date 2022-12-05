import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Manage from "pages/Manage";
import Edit from "pages/Edit";
import Main from "pages/Main";
import Login from "pages/Login";
import View from "pages/View";
import Response from "pages/Response";
import Result from "pages/Result";
import Forum from "pages/Forum";

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
  {
    path: "/forms/:id/response",
    element: <Response />,
  },
  {
    path: "/forms/:id/result",
    element: <Result />,
  },
  {
    path: "/forum",
    element: <Forum />,
  },
]);

export default router;
