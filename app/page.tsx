"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import { AddNoteButton } from "@/UI/AddNoteButton";
import { Badge } from "@/components/ui/badge";
import { MoveDown } from "lucide-react";
import { LayoutDropdown } from "@/components/LayoutDropdown";
import { NoteCard } from "@/components/NoteCard";
import { useNote } from "@/hooks/useNote";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const router = useRouter();
  const { getProfile } = useAuth();
  const { notes, getNotes } = useNote();
  const isUserLoggedIn = useSelector((store: RootState) => store.user.user);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    (async () => {
      await getProfile();
      if (!isUserLoggedIn) {
        router.push("/login");
      }
    })();
  }, []);

  return (
    <div className="relative">
      <Header />
      <AddNoteButton
        onClick={async () => {
          await getNotes();
        }}
      />
      <div className="mt-5 px-16 flex justify-between items-center max-sm:px-2">
        <h1 className="text-2xl font-bold max-lg:text-xl max-md:text-lg">
          Welcome, {isUserLoggedIn?.userName}
        </h1>
        <div className="flex items-center space-x-4 max-sm:flex-col max-sm:gap-2">
          <Badge
            variant="outline"
            className="py-1 px-4 text-[15px] cursor-pointer transition-all duration-150 hover:bg-[#ff6608]"
          >
            Date <MoveDown />
          </Badge>
          <LayoutDropdown />
        </div>
      </div>
      {notes.length === 0 ? (
        <div className="mt-5 px-16 grid grid-cols-12 gap-7 max-sm:px-2 max-sm:gap-3">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div className="col-span-3 max-lg:col-span-4 max-sm:col-span-6">
              <Skeleton key={idx} className="h-[300px] w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 px-16 grid grid-cols-12 gap-7 max-sm:px-2 max-sm:gap-3">
          {notes.map((note) => {
            return <NoteCard key={note._id} data={note} />;
          })}
        </div>
      )}
    </div>
  );
}
