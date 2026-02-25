"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { NevoChatLogo } from "@/components/ui/NevoChatLogo";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserButton from "@/modules/authentication/components/user-button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { PlusIcon, SearchIcon, Trash, MessageSquare } from "lucide-react";
import DeleteChatModal from "./modal/chat-delete-modal";
import { useChatStore } from "../store/chat-store";

const ChatSidebar = ({ user, chats }: { user: unknown; chats: unknown[] }) => {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  const { activeChatId } = useChatStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = useMemo(() => {
    if (!searchQuery.trim()) return chats;
    const query = searchQuery.toLocaleLowerCase();
    return chats.filter(
      (chat) =>
        (chat as { title?: string }).title?.toLowerCase().includes(query) ||
        (chat as { messages?: unknown[] }).messages?.some((msg: unknown) =>
          (msg as { content?: string }).content?.toLowerCase().includes(query),
        ),
    );
  }, [chats, searchQuery]);

  const groupedChats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const groups: Record<string, unknown[]> = {
      today: [],
      yesterday: [],
      lastWeek: [],
      older: [],
    };

    filteredChats.forEach((chat) => {
      const chatDate = new Date((chat as { createdAt: string }).createdAt);
      if (chatDate >= today) groups.today.push(chat);
      else if (chatDate >= yesterday) groups.yesterday.push(chat);
      else if (chatDate >= lastWeek) groups.lastWeek.push(chat);
      else groups.older.push(chat);
    });

    return groups;
  }, [filteredChats]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const onDelete = (e: React.MouseEvent, chatId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedChatId(chatId);
    setIsModalOpen(true);
  };

  const renderChatList = (chatList: unknown[]) => {
    if (!chatList || chatList.length === 0) return null;
    return chatList.map((chatObj) => {
      const chat = chatObj as { id: string; title?: string };
      const isSelected = chat.id === activeChatId;

      return (
        <DropdownMenu key={chat.id}>
          <DropdownMenuTrigger asChild>
            <button
              title={chat.title || "New Chat"}
              className={`block w-full text-left rounded-base p-2 text-sm font-semibold transition-colors hover:bg-main hover:text-main-foreground cursor-pointer border-0 bg-transparent ${
                isSelected
                  ? "bg-main text-main-foreground outline-2 outline-border"
                  : ""
              }`}
            >
              <span className="block truncate">{chat.title || "New Chat"}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            side="right"
            className="w-48 bg-secondary-background border-2 border-border"
          >
            <DropdownMenuLabel className="truncate">
              {chat.title || "New Chat"}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              asChild
              className="flex gap-2 cursor-pointer focus:bg-main focus:text-main-foreground"
            >
              <Link href={`/chat/${chat.id}`}>
                <MessageSquare className="h-4 w-4" />
                <span className="font-bold">Go to Chat</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete(e, chat.id);
              }}
              className="flex gap-2 cursor-pointer focus:bg-red-100 focus:text-red-900"
            >
              <Trash className="h-4 w-4 text-red-500" />
              <span className="font-bold text-red-500">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    });
  };

  return (
    <Sidebar collapsible="icon" className="border-r-4 border-r-border">
      {/* ─── Header: same bg-main & h-16 as main header to align seamlessly ─── */}
      <SidebarHeader className="h-16 flex items-center justify-center bg-main overflow-hidden border-b-4 border-b-border">
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-8 h-8 cursor-pointer"
              >
                <NevoChatLogo size={24} className="dark:invert" />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="border-2 border-border font-bold"
            >
              Expand Sidebar
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-2 px-2 w-full">
            <div className="flex items-center justify-center bg-white dark:bg-black border-4 border-border rounded-base px-2 py-1 shadow-shadow">
              <NevoChatLogo size={32} className="dark:invert" />
            </div>
          </div>
        )}
      </SidebarHeader>

      {/* ─── Content ─── */}
      <SidebarContent className="bg-background">
        {isCollapsed ? (
          /* ── Collapsed: icon-only strip ── */
          <div className="flex flex-col items-center gap-1 pt-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleSidebar}
                  className="flex items-center justify-center w-10 h-10 rounded-base border-2 border-border bg-main text-main-foreground hover:shadow-shadow transition-all cursor-pointer"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="border-2 border-border font-bold"
              >
                New Chat
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleSidebar}
                  className="flex items-center justify-center w-10 h-10 rounded-base border-2 border-border bg-secondary-background hover:bg-main hover:text-main-foreground transition-all cursor-pointer"
                >
                  <SearchIcon className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="border-2 border-border font-bold"
              >
                Search
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          /* ── Expanded: full sidebar ── */
          <>
            <div className="p-4 flex flex-col gap-4">
              <Button
                asChild
                className="w-full justify-start font-heading uppercase tracking-wider text-base h-12"
              >
                <Link href="/">
                  <PlusIcon className="mr-2 h-5 w-5" />
                  New Chat
                </Link>
              </Button>

              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-main-foreground/70" />
                <Input
                  placeholder="Search your chats..."
                  className="pl-10 h-12 font-base bg-secondary-background"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

            <div className="flex-1 px-4 text-foreground font-base pb-4 overflow-y-auto">
              {filteredChats.length === 0 ? (
                <div className="text-center text-sm font-semibold opacity-70 mt-8">
                  {searchQuery ? "No Chats Found" : "No Chats Yet"}
                </div>
              ) : (
                <div className="flex flex-col gap-6 pt-2">
                  {groupedChats.today.length > 0 && (
                    <div>
                      <div className="mb-2 text-xs font-heading tracking-widest uppercase opacity-60">
                        Today
                      </div>
                      <div className="flex flex-col gap-1">
                        {renderChatList(groupedChats.today)}
                      </div>
                    </div>
                  )}
                  {groupedChats.yesterday.length > 0 && (
                    <div>
                      <div className="mb-2 text-xs font-heading tracking-widest uppercase opacity-60">
                        Yesterday
                      </div>
                      <div className="flex flex-col gap-1">
                        {renderChatList(groupedChats.yesterday)}
                      </div>
                    </div>
                  )}
                  {groupedChats.lastWeek.length > 0 && (
                    <div>
                      <div className="mb-2 text-xs font-heading tracking-widest uppercase opacity-60">
                        Last 7 Days
                      </div>
                      <div className="flex flex-col gap-1">
                        {renderChatList(groupedChats.lastWeek)}
                      </div>
                    </div>
                  )}
                  {groupedChats.older.length > 0 && (
                    <div>
                      <div className="mb-2 text-xs font-heading tracking-widest uppercase opacity-60">
                        Older
                      </div>
                      <div className="flex flex-col gap-1">
                        {renderChatList(groupedChats.older)}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </SidebarContent>

      {/* ─── Footer ─── */}
      <SidebarFooter className="border-t-4 border-t-border bg-secondary-background flex items-center justify-center p-2 overflow-hidden">
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="flex items-center justify-center cursor-pointer"
                onClick={toggleSidebar}
              >
                <UserButton user={user as any} />
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="border-2 border-border font-bold"
            >
              {(user as { name?: string })?.name || "User"}
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-3 w-full p-2">
            <UserButton user={user as any} />
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-bold truncate">
                {(user as { name?: string })?.name || "User"}
              </span>
              <span className="block text-xs font-base truncate opacity-70">
                {(user as { email?: string })?.email}
              </span>
            </div>
          </div>
        )}
      </SidebarFooter>

      {selectedChatId && (
        <DeleteChatModal
          chatId={selectedChatId}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </Sidebar>
  );
};

export default ChatSidebar;
