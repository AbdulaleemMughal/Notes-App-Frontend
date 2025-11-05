"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/UI/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
          />
        </div>
        <Button
          className=" mt-4 rounded-full w-full text-lg font-semibold"
          text="Log In"
          onClick={() => {}}
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
      </div>
    </div>
  );
};

export default Login;
