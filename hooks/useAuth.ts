import { BASE_URL } from "@/constants/baseurl";
import { addUser, removeUser } from "@/store/slices/userSlice";
import { UserType } from "@/types/user.type";
import {
  removeTokenFromLocalStorage,
  saveTokenToLocalStorage,
} from "@/utils/auth";
import { axiosInstance } from "@/utils/axiosInstance";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const login = useCallback(async (data: UserType) => {
    try {
      const res = await axios.post(BASE_URL + "/login", data);
      saveTokenToLocalStorage(res.data.token);
      toast.success(res.data.message);
      dispatch(addUser(res.data.user));
      router.push("/");
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message);
      }
    }
  }, []);

  const signup = useCallback(async (data: UserType) => {
    try {
      const res = await axios.post(BASE_URL + "/signup", data);
      saveTokenToLocalStorage(res.data.token);
      toast.success(res.data.message);
      dispatch(addUser(res.data.user));
      router.push("/");
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message);
      }
    }
  }, []);

  const logout = useCallback(async () => {
    try {

        await axios.post(BASE_URL + '/logout');
        dispatch(removeUser());
        removeTokenFromLocalStorage();
        router.push("/login");
        
    } catch (err) {
        if (isAxiosError(err)) {
        toast.error(err.response?.data.message);
        router.push('/')
      }
    }
  }, []);

  const getProfile = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/getProfile");
      dispatch(addUser(res.data.user));
    } catch (err) {
      if (isAxiosError(err)) {
        removeTokenFromLocalStorage();
        dispatch(removeUser());
        router.push("/login");
        toast.error(err.response?.data.message);
      }
    }
  }, []);

  return {
    login,
    signup,
    getProfile,
    logout
  };
};
