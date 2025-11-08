import { NoteType } from "@/types/note.type";
import { axiosInstance } from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useNote = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);

  const getNotes = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/get-note");
      setNotes(res.data.data);
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message);
      }
    }
  }, []);

  const addNote = useCallback(
    async (data: NoteType) => {
      try {
        const res = await axiosInstance.post("/add-note", data);
        toast.success(res.data.message);
      } catch (err) {
        if (isAxiosError(err)) {
          toast.error(err.response?.data.message);
        }
      }
    },
    []
  );

  return {
    notes,
    getNotes,
    addNote,
  };
};
