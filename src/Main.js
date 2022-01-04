import React, { Fragment } from "react";
import { createBrowserHistory } from "history";
import { useSelector } from "react-redux";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SidebarAdmin from "./Components/Sidebar/SidebarAdmin";
import SidebarMitra from "./Components/Sidebar/SidebarMitra";
import Dashboard from "./Pages/Dashboard";
import CreateNewPartnerPage from "./Pages/Partner/CreateNewPartner";
import Login from "./Pages/Login";
import PartnerPage from "./Pages/Partner";
import UpdateMitraPage from "./Pages/Partner/UpdateMitra";
import CreateAccountPage from "./Pages/User/CreateAccountPage";
import BookingPage from "./Pages/Booking/index";

const Main = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const AdminRoute = ({ children }) => {
    return currentUser !== null ? children : <Navigate to="/login" />;
  };
  const MitraRoute = ({ children }) => {
    console.log("ini current user", currentUser);
    return currentUser !== null ? children : <Navigate to="/login" />;
  };
  let history = createBrowserHistory();
  return (
    <BrowserRouter history={history}>
      {currentUser  && <SidebarAdmin />}
    

      <Routes>
        <Fragment>
          <Route
            path="/"
            exact
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route path="/create-partner" element={<CreateNewPartnerPage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/partner" element={<PartnerPage />} />
          <Route path="/partner-edit" element={<UpdateMitraPage />} />
          <Route
            path="/booking"
            element={
              <MitraRoute>
                <BookingPage />
              </MitraRoute>
            }
          />

          <Route
            path="/create-account-partner"
            element={<CreateAccountPage />}
          />
        </Fragment>
      </Routes>
    </BrowserRouter>
  );
};

export default Main;
