import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyle from "styles/GlobalStyle";
import Manage from "pages/Manage/Manage.component";
import Create from "pages/Create/Create.component";
import Main from "pages/Main/Main.component";
import Login from "pages/Login/Login.component";
import reportWebVitals from "./reportWebVitals";

const AuthContext = createContext({ userID: "" });

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
	},
	{
		path: "/forms/:id",
		element: <Create />,
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

root.render(
	<React.StrictMode>
		<GlobalStyle />
		<AuthContext.Provider value={{ userID: "" }}>
			<RouterProvider router={router} />
		</AuthContext.Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default AuthContext;
