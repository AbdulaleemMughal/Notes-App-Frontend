"use client";

import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { UserType } from "@/types/user.type";
import { Button } from "@/UI/Button";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserType>({
    userName: "",
    email: "",
    password: "",
  });

  const handleUserChange = (field: keyof UserType, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    setLoading(true);
    await signup(userData);
    setLoading(false);
    setUserData({
      userName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex justify-center items-center py-auto h-[100vh]">
      <div className="py-5 px-7 w-[500px] bg-neutral-800 rounded-lg flex justify-center items-center flex-col space-y-5 max-sm:w-full max-sm:h-screen">
        <h1 className="text-[#f3f4f6] text-3xl font-semibold font-[Roboto]">
          Sign Up
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
            value={userData.userName}
            onChange={(e) => handleUserChange("userName", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label htmlFor="email" className="text-white">
            Email:
          </Label>
          <Input
            type="email"
            placeholder="Email"
            id="email"
            className="text-white"
            value={userData.email}
            onChange={(e) => handleUserChange("email", e.target.value)}
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
            value={userData.password}
            onChange={(e) => handleUserChange("password", e.target.value)}
          />
        </div>
        <Button
          className=" mt-4 rounded-full w-full text-lg font-semibold"
          text="Sign Up"
          onClick={() => handleSignUp()}
          loading={loading}
        />
        <div>
          Already have an account?{" "}
          <span
            className="ml-2 underline font-semibold cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Log In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
