import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button as CustomButton } from "@/UI/Button";
import { useNote } from "@/hooks/useNote";
import { NoteType } from "@/types/note.type";

interface EditNoteDialogProps {
  note: NoteType;
  setNote: React.Dispatch<React.SetStateAction<NoteType>>;
}

export const EditNoteDialog = ({ note, setNote }: EditNoteDialogProps) => {
  const { updateNote } = useNote();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleValueChange = (filed: keyof NoteType, value: string) => {
    setNote((prev) => ({ ...prev, [filed]: value }));
  };

  const handleUpdateNote = async () => {
    setLoading(true);
    await updateNote(note._id as string, note);
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <form onSubmit={handleUpdateNote}>
          <DialogTrigger asChild>
            <CustomButton
              type="button"
              text="Edit Note"
              className="px-6 rounded-sm"
              onClick={() => {
                setOpen(true);
              }}
            />
          </DialogTrigger>

          <DialogContent className="w-[700px] max-sm:w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Your Notes</DialogTitle>
              <DialogDescription>
                Edit your notes here. Click <b>Edit</b> when you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title.."
                  value={note.title}
                  onChange={(e) => handleValueChange("title", e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Note</Label>
                <Textarea
                  placeholder="Type your note here.."
                  rows={10}
                  className="h-[300px]"
                  value={note.description}
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
                text="Edit Note"
                className="rounded-[8px] text-[14px]"
                onClick={handleUpdateNote}
                loading={loading}
                loadingIconSize={26}
              />
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};
