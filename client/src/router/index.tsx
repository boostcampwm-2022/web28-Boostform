import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MyForms from "pages/MyForms";
import Edit from "pages/Edit";
import Main from "pages/Main";
import Login from "pages/Login";
import View from "pages/View";
import Response from "pages/Response";
import Result from "pages/Result";
import Forum from "pages/Forum";
import Error from "pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
  },
  {
    path: "/forms/:id/edit",
    element: <Edit />,
    errorElement: <Error />,
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
    path: "/myForms",
    element: <MyForms />,
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
  {
    path: "/error",
    element: <Error />,
  },
]);

export default router;
