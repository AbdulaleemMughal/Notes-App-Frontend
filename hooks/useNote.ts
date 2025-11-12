import { NoteType } from "@/types/note.type";
import { axiosInstance } from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export const useNote = () => {
  const router = useRouter();
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

  const addNote = useCallback(async (data: NoteType) => {
    try {
      const res = await axiosInstance.post("/add-note", data);
      toast.success(res.data.message);
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message);
      }
    }
  }, []);

  const updateNote = async (id: string, data: NoteType) => {
    try {
      const res = await axiosInstance.patch(`/update-note/${id}`, data);
      toast.success(res.data.message);
      router.push(`/note/${id}`);
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message);
      }
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/delete-note/${id}`);
      toast.success(res.data.message);
      router.push("/");
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message);
      }
    }
  };

  const getSingleNote = async (id: string) => {
    try {
      const res = await axiosInstance.get(`/get-single-note/${id}`);
      return res.data.data;
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data.message);
      }
    }
  };

  return {
    notes,
    getNotes,
    addNote,
    updateNote,
    deleteNote,
    getSingleNote,
  };
};
