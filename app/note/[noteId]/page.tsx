"use client";

import { useNote } from "@/hooks/useNote";
import { NoteType } from "@/types/note.type";
import { Loader, Loader2, Star } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { Button } from "@/UI/Button";
import { EditNoteDialog } from "@/UI/EditNoteDialog";

const SingleNote = () => {
  const { noteId } = useParams();
  const { getSingleNote, deleteNote, updateNote } = useNote();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [starLoading, setStarLoading] = useState<boolean>(false);
  const [note, setNote] = useState<NoteType>({} as NoteType);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getSingleNote(noteId as string);
      setNote(data);
      setLoading(false);
    })();
  }, []);

  const handleUpdateNote = async () => {
    setStarLoading(true);
    setNote((prev) => ({ ...prev, isFavourite: !note.isFavourite }));
    await updateNote(note._id as string, note);
    setStarLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Loader className="animate-spin" size={50} color="#ff6608" />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="mt-7 w-[800px] flex flex-col">
          <div className="flex items-start justify-between space-x-5">
            <div className="flex flex-col space-y-1">
              <h1 className="text-3xl font-[Roboto]">{note.title}</h1>
              <p className="text-sm text-neutral-400">
                Created At:{" "}
                <span>
                  {dateFormat(note.createdAt, "mmmm dS, yyyy, h:MM:ss TT")}
                </span>
              </p>
            </div>
            {starLoading ? (
              <span className="cursor-not-allowed">
                <Loader2 className="animate-spin" />
              </span>
            ) : (
              <span
                className="cursor-pointer"
                onClick={() => handleUpdateNote()}
              >
                <Star
                  fill={note.isFavourite ? "red" : "none"}
                  strokeWidth={note.isFavourite ? "0px" : "1px"}
                />
              </span>
            )}
          </div>
          <div className="my-5 bg-neutral-600 w-[150px] h-1"></div>
          <div>
            <p>{note.description}</p>
          </div>
          <div className="flex justify-end space-x-3">
            <EditNoteDialog note={note} setNote={setNote} />
            <Button
              type="button"
              loading={deleteLoading}
              loadingIconSize={28}
              text="Delete"
              className="bg-red-600 px-6 rounded-sm"
              onClick={async () => {
                setDeleteLoading(true);
                await deleteNote(note._id as string);
                setDeleteLoading(false);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleNote;
