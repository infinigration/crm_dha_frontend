import React, { useState } from "react";
import "./auth.scss";
import logo from "../../../assets/logo.png";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/actions/auth";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <section className="section" id="login">
      <form action="" onSubmit={submitHandler}>
        <img src={logo} alt="" />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span>
          <input
            type={visible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {visible ? (
            <FaRegEye onClick={() => setVisible(!visible)} />
          ) : (
            <FaRegEyeSlash onClick={() => setVisible(!visible)} />
          )}
        </span>
        <button className="primary-btn">Login</button>
      </form>
    </section>
  );
};

export default Login;
