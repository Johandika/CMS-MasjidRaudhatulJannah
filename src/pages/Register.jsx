import React, { useState } from "react";
import { config } from "../configs";

import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Modal } from "antd";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telepon, setTelepon] = useState("");

  const handleSubmit = async () => {
    const data = await axios({
      url: `${config.api_host_dev}/user/register`,
      method: "POST",
      data: {
        username,
        email,
        password,
        telepon,
      },
    })
      .then((response) => {
        message.loading("Loading...", 1, () => {
          navigate("/login");
          message.success(response.data.message);
        });
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full h-screen flex p-5">
      {/* Kanan */}
      <div className="w-[55%] bg-slate-200 h-full rounded-lg">
        <div className="flex justify-center items-center w-full"></div>
      </div>

      {/* Kiri */}
      <div className="w-[45%] px-10">
        <p className=" font-black text-3xl mb-7 mt-5">REGISTER</p>

        <div className="w-full rounded-xl">
          {/* Display Name */}
          <label
            htmlFor="username"
            className="font-semibold"
          >
            Username
          </label>
          <Input
            id="username"
            autoComplete="off"
            size="large"
            placeholder="Masukkan Username"
            className="mb-3"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          {/* Email */}
          <label
            htmlFor="email"
            className="font-semibold"
          >
            E-mail
          </label>
          <Input
            id="email"
            autoComplete="off"
            size="large"
            placeholder="Masukkan Email"
            className="mb-3"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          {/* Password */}
          <label
            htmlFor="password"
            className="font-semibold"
          >
            Password
          </label>
          <Input.Password
            id="password"
            autoComplete="off"
            size="large"
            placeholder="Masukkan Password"
            className="mb-3"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          {/* Phone Number */}
          <label
            htmlFor="telepon"
            className="font-semibold"
          >
            Telepon
          </label>
          <Input
            id="telepon"
            autoComplete="off"
            size="large"
            placeholder="Masukkan Nomor Telepon"
            className="mb-3"
            value={telepon}
            onChange={(e) => {
              setTelepon(e.target.value);
            }}
          />

          <Button
            autoComplete="off"
            size="large"
            type="primary"
            block
            className="bg-sky-600 mb-3"
            onClick={() => handleSubmit()}
          >
            Register
          </Button>

          <p className="font-light text-sm">
            Sudah Punya Akun?{" "}
            <span
              className="text-primaryDark font-semibold  cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
