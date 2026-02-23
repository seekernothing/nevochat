"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteChatModalProps {
  chatId: string;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function DeleteChatModal({
  chatId,
  isModalOpen,
  setIsModalOpen,
}: DeleteChatModalProps) {
  const handleDelete = () => {
    // Placeholder deletion logic
    console.log("Deleting chat:", chatId);
    setIsModalOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-md border-4 border-border shadow-shadow bg-secondary-background">
        <DialogHeader>
          <DialogTitle className="font-heading uppercase tracking-widest pl-2">
            Delete Chat?
          </DialogTitle>
          <DialogDescription className="font-base text-foreground/80 pl-2">
            Are you sure you want to delete this chat forever?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end gap-2 mt-4 px-2">
          <Button
            type="button"
            variant="noShadow"
            className="bg-secondary-background hover:bg-main hover:text-main-foreground font-bold"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="noShadow"
            className="bg-red-500 hover:bg-red-600 text-white font-bold"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
