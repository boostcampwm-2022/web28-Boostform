import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "styles/GlobalStyle";
import Manage from "pages/Manage/Manage.component";
import Create from "pages/Create/Create.component";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Manage />,
	},
	{
		path: "/forms/:id",
		element: <Create />,
	},
]);

root.render(
	<React.StrictMode>
		<GlobalStyle />
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
