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
import Error from "components/Error";

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
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/myForms",
    element: <MyForms />,
    errorElement: <Error />,
  },
  {
    path: "/forms/:id/response",
    element: <Response />,
    errorElement: <Error />,
  },
  {
    path: "/forms/:id/result",
    element: <Result />,
    errorElement: <Error />,
  },
  {
    path: "/forum",
    element: <Forum />,
    errorElement: <Error />,
  },
]);

export default router;
