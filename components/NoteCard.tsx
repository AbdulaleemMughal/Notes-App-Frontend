import dateFormat from "dateformat";
import { useRouter } from "next/navigation";
import { NoteType } from "@/types/note.type";

type NoteCardProps = {
  data: NoteType;
};

export const NoteCard = ({ data }: NoteCardProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/note/${data._id}`)}
      className="col-span-3 shadow-[0_3px_2px_rgba(255,223,186,0.5)] px-6 py-5 rounded-lg cursor-pointer bg-white dark:bg-neutral-800 max-lg:col-span-4 max-sm:col-span-6 max-sm:px-3 max-sm:py-2"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-neutral-200 max-lg:text-xl max-md:text-lg">
          {data.title.length > 20
            ? data.title.slice(0, 20) + "..."
            : data.title}
        </h1>
      </div>

      <p className="mt-3 text-sm text-gray-500 dark:text-neutral-400">
        {data.description.length > 400
          ? data.description.slice(0, 400) + "..."
          : data.description}
      </p>

      <p className="mt-5 text-right text-sm text-neutral-400">
        {dateFormat(data.createdAt, "mmmm dS, yyyy, h:MM:ss TT")}
      </p>
    </div>
  );
};
