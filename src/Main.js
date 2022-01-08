import React, { Fragment } from "react";
import { createBrowserHistory } from "history";
import { useSelector } from "react-redux";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SidebarAdmin from "./Components/Sidebar/SidebarAdmin";
import Dashboard from "./Pages/Dashboard";
import CreateNewPartnerPage from "./Pages/Partner/CreateNewPartner";
import Login from "./Pages/Login";
import PartnerPage from "./Pages/Partner";
import UpdateMitraPage from "./Pages/Partner/UpdateMitra";
import CreateAccountPage from "./Pages/User/CreateAccountPage";
import BookingPage from "./Pages/Booking/index";
import NewsPage from "./Pages/News/Index";
import CreateNewsPage from "./Pages/News/CreateNews";
import UpdateNewsPage from "./Pages/News/UpdateNews";
import AllMapPage from "./Pages/Partner/AllMapPage";
import DashboardComponent from "./Components/Dashboard";
import DashboardMitra from "./Components/Dashboard/DashboardMitra";
import PartnerEditComponent from "./Components/Parts/PartnerEdit";
import UpdateAccountPage from "./Pages/User/UpdateAccountPage";
import HistoryBookingPage from "./Pages/Booking/HistoryBookingPage";
import SidebarMitra from "./Components/Sidebar/SidebarMitra";
import Forbiden from "./Components/Forbidden/index";

const Main = (props) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { isAdmin: currentAdmin } = useSelector((state) => state.auth);
  const AdminRoute = ({ children }) => {
    return currentUser !== null && currentAdmin === "admin" ? (
      children
    ) : currentUser !== null && currentAdmin !== "admin" ? (
      <Navigate to="/forbiden" />
    ) : (
      <Navigate to="/login" />
    );
  };
  const MitraRoute = ({ children }) => {
    console.log("ini current user", currentUser);
    return currentUser !== null && currentAdmin === "adminMitra" ? (
      children
    ) : currentUser !== null && currentAdmin !== "adminMitra" ? (
      <Navigate to="/forbiden" />
    ) : (
      <Navigate to="/login" />
    );
  };
  let history = createBrowserHistory();
  return (
    <BrowserRouter history={history}>
      {console.log(currentAdmin)}
      {currentAdmin === "admin" && <SidebarAdmin />}
      {currentAdmin === "adminMitra" && <SidebarMitra />}
      <Routes>
        <Fragment>
          <Route
            path="/dashboard"
            exact
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/create-partner"
            element={
              <AdminRoute>
                <CreateNewPartnerPage />
              </AdminRoute>
            }
          />
          <Route path="/forbiden" element={<Forbiden />} />
          <Route path="/login" exact element={<Login />} />

          <Route
            path="/partner"
            element={
              <AdminRoute>
                <PartnerPage />
              </AdminRoute>
            }
          />
          <Route
            path="/partner-edit"
            exact
            element={
              <MitraRoute>
                <UpdateMitraPage />
              </MitraRoute>
            }
          />
          <Route
            path="/news"
            element={
              <AdminRoute>
                <NewsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/create-news"
            element={
              <AdminRoute>
                <CreateNewsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/news-edit"
            element={
              <AdminRoute>
                <UpdateNewsPage />
              </AdminRoute>
            }
          />
          <Route
            path="/allmap-partner"
            element={
              <AdminRoute>
                <AllMapPage />
              </AdminRoute>
            }
          />
          <Route
            path="/dashboard-mitra"
            element={
              <MitraRoute>
                <DashboardMitra />
              </MitraRoute>
            }
          />
          <Route
            path="/data-mitra"
            element={
              <MitraRoute>
                <PartnerEditComponent />
              </MitraRoute>
            }
          />
          <Route path="/edit-account-partner" element={<UpdateAccountPage />} />

          <Route
            path="/history-booking"
            element={
              <MitraRoute>
                <HistoryBookingPage />
              </MitraRoute>
            }
          />
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
