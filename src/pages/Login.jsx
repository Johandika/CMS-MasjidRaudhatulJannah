import React, { useState } from "react";
import axios from "axios";
import { config } from "../configs";

import { Button, Input, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import erjemasjid from "../images/erjemasjid.jpg";
import logo from "../images/logo.svg";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    axios({
      method: "POST",
      url: `${config.api_host_dev}/user/login`,
      data: {
        email: email,
        password: password,
      },
    })
      .then((response) => {
        message.loading("Loading...", 1, () => {
          localStorage.setItem("authorization", response.data.authorization);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("email", response.data.email);
          message.success(response.data.message);
          navigate("/");
        });
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full h-screen flex p-5 ">
      {/* Kanan */}
      <div className="w-[55%] bg-slate-100 h-full rounded-lg overflow-hidden">
        <img
          src={erjemasjid}
          alt="masjid erje"
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* Kiri */}
      <div className="w-[45%] flex flex-col px-10 ">
        <div className="flex justify-start items-center  gap-3">
          <img
            src={logo}
            alt="logo RJIC"
            className="w-14"
          />
          <div className="flex flex-col">
            <p className="font-bold  text-Green ">Raudhatul Jannah</p>
            <p className="font-bold  text-Green  -mt-2">Islamic Center</p>
          </div>
        </div>

        <div className="flex flex-col justify-center flex-1 gap-5">
          <div>
            <p className="text-2xl font-bold mt-5 text-Green">Masuk</p>
            <p className="font-light text-gray-500">
              Silahkan masukkan e-mail dan password anda.
            </p>
          </div>

          <div className="w-full rounded-xl gap-5 flex flex-col">
            <div className="flex flex-col gap-2">
              <div>
                {/* Email */}
                <label
                  htmlFor="email"
                  className=" text-slate-500"
                >
                  E-mail
                </label>
                <Input
                  autoComplete="off"
                  placeholder="Masukkan E-mail Anda"
                  id="email"
                  size="large"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div>
                {/* Password */}
                <label
                  htmlFor="password"
                  className=" text-slate-500"
                >
                  Password
                </label>
                <Input.Password
                  id="password"
                  size="large"
                  placeholder="Masukkan Password Anda"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                size="large"
                type="primary"
                block
                className=" bg-Green"
                onClick={() => handleSubmit()}
              >
                Login
              </Button>
              <p className="font-light text-sm ">
                Belum Punya Akun?{" "}
                <span
                  className="text-sky-900  cursor-pointer font-semibold"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
