"use client";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDeleteChat } from "../../hooks/chat";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const DeleteChatModal = ({ isModalOpen, setIsModalOpen, chatId }: any) => {
  const router = useRouter();
  const { mutateAsync, isPending } = useDeleteChat(chatId);

  const handleDelete = async () => {
    try {
      await mutateAsync();
      toast.success("Chat Deleted Successfully");
      setIsModalOpen(false);
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to delete chat");
      console.error("Failed to delete chat:", error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Chat</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this Chat? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <p className="text-sm text-foreground/70">
            Once deleted, all requests and data in this Chat will be permanently
            removed.
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="neutral"
            onClick={() => setIsModalOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button variant="default" onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChatModal;
