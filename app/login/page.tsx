"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { UserType } from "@/types/user.type";
import { Button } from "@/UI/Button";
import { getTokenFromLocalStorage } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [logInData, setLogInData] = useState<UserType>({
    userName: "",
    password: "",
    layout: "grid",
  });

  useEffect(() => {
    const isTokenAvailable = getTokenFromLocalStorage();
    if (isTokenAvailable) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, []);

  const handleDataChange = (field: keyof UserType, value: string) => {
    setLogInData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(logInData);
    setLoading(false);
    setLogInData({
      userName: "",
      password: "",
      layout: "grid",
    });
  };

  return (
    <div className="flex justify-center items-center py-auto h-[100vh]">
      <form
        onSubmit={handleLogin}
        className="py-5 px-7 w-[500px] bg-neutral-800 rounded-lg flex justify-center items-center flex-col space-y-5 max-sm:w-full max-sm:h-screen"
      >
        <h1 className="text-[#f3f4f6] text-3xl font-semibold font-[Roboto]">
          Log In
        </h1>
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="username" className="text-white">
            Username:
          </Label>
          <Input
            type="text"
            placeholder="Username"
            id="username"
            className="text-white"
            value={logInData.userName}
            onChange={(e) => handleDataChange("userName", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <div className="flex justify-between items-center">
            <Label htmlFor="passowrd" className="text-white">
              Password:
            </Label>
            {showPassword ? (
              <span
                className="text-[12px] text-blue-500 cursor-pointer"
                onClick={() => setShowPassword(false)}
              >
                Hide Password
              </span>
            ) : (
              <span
                className="text-[12px] text-blue-500 cursor-pointer"
                onClick={() => setShowPassword(true)}
              >
                Show Password
              </span>
            )}
          </div>
          <Input
            type={!showPassword ? "password" : "text"}
            placeholder="Passowrd"
            id="passowrd"
            className="text-white"
            value={logInData.password}
            onChange={(e) => handleDataChange("password", e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="mt-4 rounded-full w-full text-lg font-semibold"
          text="Log In"
          onClick={() => handleLogin}
          loading={loading}
        />
        <div>
          New to our app?{" "}
          <span
            className="ml-2 underline font-semibold cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
