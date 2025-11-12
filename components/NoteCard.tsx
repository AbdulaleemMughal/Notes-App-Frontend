import { NoteType } from "@/types/note.type";
import { Loader2, Star } from "lucide-react";
import dateFormat from "dateformat";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useNote } from "@/hooks/useNote";

type NoteCardProps = {
  data: NoteType;
};

export const NoteCard = ({ data }: NoteCardProps) => {
  const router = useRouter();
  const { updateNote } = useNote();
  const [starLoading, setStarLoading] = useState<string>("");
  const [note, setNote] = useState<NoteType>(data);

  const handleUpdateNote = async () => {
    setStarLoading(data._id as string);
    setNote((prev) => ({ ...prev, isFavourite: !note.isFavourite }));
    await updateNote(note._id as string, note);
    setStarLoading("");
  };

  return (
    <div
      onClick={() => {
        router.push(`/note/${data._id}`);
      }}
      className="col-span-3 shadow-[0_3px_2px_rgba(255,223,186,0.5)] px-6 py-5 rounded-lg cursor-pointer bg-neutral-800 max-lg:col-span-4 max-sm:col-span-6 max-sm:px-3 max-sm:py-2"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-neutral-200 max-lg:text-xl max-md:text-lg">
          {data.title.length > 20
            ? data.title.slice(0, 20) + "..."
            : data.title}
        </h1>
        {starLoading === data._id ? (
          <span className="pl-2 cursor-not-allowed">
            <Loader2 className="animate-spin" />
          </span>
        ) : (
          <span
            className="pl-2"
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateNote();
            }}
          >
            <Star
              fill={data.isFavourite ? "red" : "none"}
              strokeWidth={data.isFavourite ? "0px" : "1px"}
            />
          </span>
        )}
      </div>
      <p className="mt-3 text-sm text-neutral-400">
        {data.description.length > 20
          ? data.description.slice(0, 400) + "..."
          : data.description}
      </p>
      <p className="mt-5 text-right text-sm text-neutral-400">
        {dateFormat(data.createdAt, "mmmm dS, yyyy, h:MM:ss TT")}
      </p>
    </div>
  );
};
