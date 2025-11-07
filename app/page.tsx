"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";

export default function Home() {
  const router = useRouter();
  const { getProfile } = useAuth();
  const isUserLoggedIn = useSelector((store: RootState) => store.user.user);

  useEffect(() => {
    (async () => {
      await getProfile();
      if (!isUserLoggedIn) {
        router.push("/login");
      }
    })();
  }, []);

  return (
    <>
      <Header />
    </>
  );
}
