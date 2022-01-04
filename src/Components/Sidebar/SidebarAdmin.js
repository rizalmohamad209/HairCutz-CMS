import React from "react";
import { NavLink, Link } from "react-router-dom";
import { signOut } from "../../Redux/features/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SidebarAdmin = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth);
  const [show, setShow] = React.useState(false);
  const Logout = () => {
    dispatch(signOut());
    navigate("/login");
  };
  return (
    <>
      {currentUser.role === "admin" ? (
        <div className=" fixed top-0 md:left-0 overflow-y-auto flex-row flex-nowrap rounded-tr-3xl rounded-br-3xl overflow-hidden shadow-2xl  w-64 z-10  transition-all duration-300">
          <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
            <div className="mx-auto bg-primary  h-screen ">
              <div className="px-6 py-6">
                <img
                  src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1605896307/profil_dxb6br.jpg"
                  alt=""
                  className="w-40 h-40 rounded-full mx-auto"
                />
                <h1 className="text-center text-white font-semibold mt-3">
                  Mohamad Rizal Khamami
                </h1>
                <h1 className="text-white bg-purple-800 text-center px-3 py-2 rounded-xl mt-3">
                  Admin
                </h1>
              </div>
              <div className="bg-four  py-2 px-6 rounded-3xl z-20 mt-1">
                <div className="flex flex-col  ">
                  <ul className="flex-col min-w-full flex list-none">
                    <li className="rounded-lg mb-1">
                      <Link
                        to="/"
                        exact
                        className="flex items-center gap-4 text-xl text-white font-medium px-4 py-3 rounded-lg"
                        activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                      >
                        <img
                          src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1605896302/dashboard_tqv8ez.svg"
                          alt=""
                          className="w-8 h-8"
                        />
                        <span>Dashboard</span>
                      </Link>
                    </li>
                    <li className="rounded-lg mb-1">
                      <Link
                        to="/berita"
                        className="flex items-center gap-4 text-xl text-white font-medium px-4 py-3 rounded-lg"
                        activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                      >
                        <img
                          src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1605896306/receipt_orlj8m.svg"
                          alt=""
                          className="w-8 h-8"
                        />
                        <span>Berita</span>
                      </Link>
                    </li>
                    <li className="rounded-lg mb-1 ">
                      <h1
                        className="flex items-center gap-4 text-xl  font-medium px-4 py-3 rounded-lg text-white cursor-pointer"
                        onClick={(_) => {
                          setShow(!show);
                        }}
                      >
                        <img
                          src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1605896305/map_xqgdpq.svg"
                          className="w-8 h-8"
                        />
                        Partner
                      </h1>
                      {show ? (
                        <ul className="flex-col min-w-full flex list-none pl-16 transition-all duration-300 gap-1">
                          <Link to="/partner">
                            <li className="text-white font-normal">
                              <h1 className="flex items-center   gap-4   rounded-lg text-white cursor-pointer">
                                - Daftar Mitra
                              </h1>
                            </li>
                          </Link>
                          <Link to="/mapmitra">
                            <li className="text-white font-normal">
                              <h1 className="flex items-center   gap-4   rounded-lg text-white cursor-pointer">
                                - Map Mitra
                              </h1>
                            </li>
                          </Link>
                          <Link to="/create-account-partner">
                            <li className="text-white font-normal">
                              <h1 className="flex items-center   gap-4   rounded-lg text-white cursor-pointer">
                                - Account Mitra
                              </h1>
                            </li>
                          </Link>
                        </ul>
                      ) : null}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 py-3">
                <h1
                  onClick={Logout}
                  className="text-white cursor-pointer bg-red-600 text-center px-3 py-2 rounded-xl mt-3 flex items-center  font-medium text-xl"
                >
                  <img
                    src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1605896304/logout_he6ph1.svg"
                    alt=""
                    className="w-8 h-8 mr-4"
                  />
                  Log out
                </h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" fixed top-0 md:left-0 overflow-y-auto flex-row flex-nowrap rounded-tr-3xl rounded-br-3xl overflow-hidden shadow-2xl  w-64 z-10  transition-all duration-300">
          <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
            <div className="mx-auto bg-primary  h-screen ">
              <div className="px-6 py-6">
                <img
                  src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1605896307/profil_dxb6br.jpg"
                  alt=""
                  className="w-40 h-40 rounded-full mx-auto"
                />
                <h1 className="text-center text-white font-semibold mt-3">
                  Mohamad Rizal Khamami
                </h1>
                <h1 className="text-white bg-purple-800 text-center px-3 py-2 rounded-xl mt-3">
                  Admin
                </h1>
              </div>
              <div className="bg-four  py-2 px-6 rounded-3xl z-20 mt-1">
                <div className="flex flex-col  ">
                  <ul className="flex-col min-w-full flex list-none">
                    <li className="rounded-lg mb-1">
                      <Link
                        to="/"
                        exact
                        className="flex items-center gap-4 text-xl text-white font-medium px-4 py-3 rounded-lg"
                        activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                      >
                        <img
                          src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1605896302/dashboard_tqv8ez.svg"
                          alt=""
                          className="w-8 h-8"
                        />
                        <span>Dashboard</span>
                      </Link>
                    </li>
                    <li className="rounded-lg mb-1">
                      <Link
                        to="/berita"
                        className="flex items-center gap-4 text-xl text-white font-medium px-4 py-3 rounded-lg"
                        activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                      >
                        <img
                          src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1605896306/receipt_orlj8m.svg"
                          alt=""
                          className="w-8 h-8"
                        />
                        <span>Berita</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="px-6 py-3">
                <h1
                  onClick={Logout}
                  className="text-white cursor-pointer bg-red-600 text-center px-3 py-2 rounded-xl mt-3 flex items-center  font-medium text-xl"
                >
                  <img
                    src="https://res.cloudinary.com/dk4dgvu4w/image/upload/v1605896304/logout_he6ph1.svg"
                    alt=""
                    className="w-8 h-8 mr-4"
                  />
                  Log out
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarAdmin;
