import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Button as CustomButton } from "./Button";
import { useState } from "react";
import { NoteType } from "@/types/note.type";
import { useNote } from "@/hooks/useNote";

interface AddNoteButtonProps {
  onClick: () => void;
}

export const AddNoteButton = ({ onClick }: AddNoteButtonProps) => {
  const { addNote } = useNote();
  const [loading, setLoading] = useState<boolean>(false);
  const [noteData, setNoteData] = useState<NoteType>({
    title: "",
    description: "",
  });
  const [open, setOpen] = useState(false);

  const handleValueChange = (field: keyof NoteType, value: string) => {
    setNoteData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddNote = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    await addNote(noteData);
    await onClick?.();

    setLoading(false);
    setOpen(false);
    setNoteData({ title: "", description: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleAddNote}>
        <DialogTrigger asChild>
          <button
            onClick={() => {
              onClick();
              setOpen(true);
            }}
            className="fixed bottom-10 right-12 bg-[#ff6608] text-white p-2 rounded-full shadow-lg cursor-pointer max-sm:right-7"
          >
            <Plus size={30} />
          </button>
        </DialogTrigger>

        <DialogContent className="w-[700px] max-sm:w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Your Custom Notes</DialogTitle>
            <DialogDescription>
              Create your notes here. Click <b>Add Note</b> when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Title.."
                value={noteData.title}
                onChange={(e) => handleValueChange("title", e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Note</Label>
              <Textarea
                placeholder="Type your note here.."
                rows={10}
                className="h-[300px]"
                value={noteData.description}
                onChange={(e) =>
                  handleValueChange("description", e.target.value)
                }
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>

            <CustomButton
              type="submit"
              text="Add Note"
              className="rounded-[8px] text-[14px]"
              onClick={handleAddNote}
              loading={loading}
            />
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
