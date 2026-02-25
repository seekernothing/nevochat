import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createChatWithMessage, deleteChat, getChatById } from "../actions";
import { toast } from "sonner";

export const useCreateChat = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (values: any) => createChatWithMessage(values),
    onSuccess: (res) => {
      console.log("Create Chat Response:", res);
      if (res.success && res.data) {
        // add optimistic ui
        const chat = res.data;

        queryClient.invalidateQueries({ queryKey: ["chats"] });

        router.push(`/chat/${chat.id}?autoTrigger=true`);
      } else if (!res.success) {
        toast.error(res.message || "Failed to create chat");
      }
    },
    onError: (error) => {
      console.error("Create chat error:", error);
      toast.error("Failed to create chat");
    },
  });
};

export const useDeleteChat = (chatId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteChat(chatId),
    onSuccess: (res) => {
      console.log("Delete Chat Response:", res);
      if (res.success) {
        queryClient.invalidateQueries({ queryKey: ["chats"] });
      } else {
        toast.error(res.message || "Failed to delete chat");
      }
    },
    onError: (error) => {
      console.error("Delete chat error:", error);
      toast.error("Failed to delete chat");
    },
  });
};

export const useGetChatById = (chatId: string) => {
  return useQuery({
    queryKey: ["chats", chatId],
    queryFn: async () => {
      const res = await getChatById(chatId);
      console.log("Get Chat Response:", res);
      return res;
    },
  });
};
