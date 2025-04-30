import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protector(props) {
  const { Component } = props;
  const navigate = useNavigate();
  const User = useSelector((state) => state.counter.User);
  console.log(User);

  useEffect(() => {
    if (!User) {
      navigate("/login");
    }
  }, []);

  if (User) {
    return <Component />;
  }
  return null;
}
