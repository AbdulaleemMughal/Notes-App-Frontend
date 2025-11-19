"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/appStore";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AddNoteButton } from "@/UI/AddNoteButton";
import { Badge } from "@/components/ui/badge";
import { MoveDown } from "lucide-react";
import { LayoutDropdown } from "@/components/LayoutDropdown";
import { NoteCard } from "@/components/NoteCard";
import { useNote } from "@/hooks/useNote";
import { Skeleton } from "@/components/ui/skeleton";
import Loader from "@/assets/loader/Spin@1x-1.0s-200px-200px.svg";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { getProfile } = useAuth();
  const { notes, getNotes } = useNote();
  const [loading, setLoading] = useState<boolean>(true);
  const isUserLoggedIn = useSelector((store: RootState) => store.user.user);
  const isLoading = useSelector((store: RootState) => store.user.isLoading);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        await getNotes();
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    (async () => {
      await getProfile();
      if (!isUserLoggedIn) {
        router.push("/login");
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={Loader} alt="Loading..." className="w-20" />
      </div>
    );
  }

  return (
    <div className="relative">
      <AddNoteButton
        onClick={async () => {
          setLoading(true);
          await getNotes();
          setLoading(false);
        }}
      />
      <div className="mt-5 px-16 flex justify-between items-center max-sm:px-2">
        <h1 className="text-2xl font-bold flex items-center gap-2 max-lg:text-xl max-md:text-lg">
          Welcome,{" "}
          <span>
            {!isUserLoggedIn?.userName ? (
              <Skeleton className="w-16 h-7" />
            ) : (
              isUserLoggedIn?.userName
            )}
          </span>
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

      {loading ? (
        <div className="mt-5 px-16 grid grid-cols-12 gap-7 max-sm:px-2 max-sm:gap-3">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="col-span-3 max-lg:col-span-4 max-sm:col-span-6"
            >
              <Skeleton className="h-[300px] w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="my-5 px-16 grid grid-cols-12 gap-7 max-sm:px-2 max-sm:gap-3">
          {notes && notes.length > 0 ? (
            notes.map((note) => <NoteCard key={note._id} data={note} />)
          ) : (
            <p className="col-span-12 text-center text-gray-500">
              No notes found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
