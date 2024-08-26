import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.scss";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { IoMdLogOut } from "react-icons/io";
const Sidebar = ({ navLists, component: Component, pageTitle = "" }) => {
  const dpath = useLocation().pathname;
  const [visible, setVisible] = useState(false);
  const [subLinksVisible, setSubLinksVisible] = useState({});

  const isActive = (path) => {
    if (dpath === path) {
      return true;
    }
    return false;
  };

  const dispatch = useDispatch();

  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const { auth, isAuthenticated } = useSelector((state) => state.user);

  const toggleSubLinks = (index) => {
    setSubLinksVisible((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <section id="sidebar">
        <div className="row">
          <div className="nav">
            <img src={logo} className="logo" alt="" />

            {navLists && navLists.length > 0
              ? navLists.map((l, index) => (
                <div className="link-container" key={index}>
                  <Link
                    to={l.value}
                    className={isActive(l.value) ? "active" : ""}
                    onClick={l.subLinks ? () => toggleSubLinks(index) : null}
                  >
                    {l.label}
                  </Link>
                  {l.subLinks && (
                    <ul
                      className={
                        subLinksVisible[index] ? "visible" : "hidden"
                      }
                    >
                      {l.subLinks.map((sl, subIndex) => (
                        <li key={subIndex}>
                          <Link to={sl.value}>{sl.label}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
              : ""}
          </div>
          <div className="component-area">
            <div className="content">
              <div className="header">
                {pageTitle === "" ? (
                  <p>
                    Greeting!{" "}
                    <span> {isAuthenticated && auth.user.bioData.name}</span>
                  </p>
                ) : (
                  <p className="heading">{pageTitle}</p>
                )}

                <IoMdLogOut onClick={clickHandler} />

              </div>
              <Component />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
