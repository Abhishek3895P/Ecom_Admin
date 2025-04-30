import React, { useState } from "react";
import { login } from "../controllers/Network/Featcher";
import { useDispatch } from "react-redux";
import { set_User } from "../store/counterSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Loading, setLoading] = useState(false);
  const [errormsg, seterrormsg] = useState(null);
  const dispacher = useDispatch();
const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    seterrormsg(null);
    console.log(formData);

    login(formData)
      .then((res) => {
        console.log(res);
        if (res.data.role == "user") {
          dispacher(set_User(res.data));
          console.log("Called")
          navigate("/")
          console.log("Called")
        } else {
          seterrormsg("Unauthorized user!");
        }
      })
      .catch((err) => {
        console.log(err.message);
        seterrormsg(err.message);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
