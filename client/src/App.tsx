import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "pages/Main/Main.component";
import Login from "pages/Login/Login.component";
import Manage from "pages/Manage/Manage.component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manage" element={<Manage />} />

        <Route path="*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
