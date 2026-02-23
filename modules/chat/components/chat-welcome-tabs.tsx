"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Code, GraduationCap, Newspaper, Sparkles } from "lucide-react";

const CHAT_TAB_MESSAGE = [
  {
    tabName: "Create",
    icon: <Sparkles className="h-4 w-4" />,
    messages: [
      "Write a short story about a robot discovering emotions",
      "Help me outline a sci-fi novel set in a post-apocalyptic world",
      "Create a character profile for a complex villain with sympathetic motives",
      "Give me 5 creative writing prompts for flash fiction",
    ],
  },
  {
    tabName: "Explore",
    icon: <Newspaper className="h-4 w-4" />,
    messages: [
      "Good books for fans of Rick Rubin",
      "Countries ranked by number of corgis",
      "Most successful companies in the world",
      "How much does Claude cost?",
    ],
  },
  {
    tabName: "Code",
    icon: <Code className="h-4 w-4" />,
    messages: [
      "Write code to invert a binary search tree in Python",
      "What is the difference between Promise.all and Promise.allSettled?",
      "Explain React's useEffect cleanup function",
      "Best practices for error handling in async/await",
    ],
  },
  {
    tabName: "Learn",
    icon: <GraduationCap className="h-4 w-4" />,
    messages: [
      "Beginner's guide to TypeScript",
      "Explain the CAP theorem in distributed systems",
      "Why is AI so expensive?",
      "Are black holes real?",
    ],
  },
];

interface ChatWelcomeTabsProps {
  userName: string;
  onMessageSelect: (message: string) => void;
}

const ChatWelcomeTabs = ({
  userName,
  onMessageSelect,
}: ChatWelcomeTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const displayName = userName?.slice(0, userName.indexOf(" ")) || userName;

  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl space-y-8">
        <h1 className="text-4xl font-heading uppercase tracking-tight text-foreground">
          How can I help you, {displayName}?
        </h1>

        <div className="flex flex-wrap gap-2 w-full">
          {CHAT_TAB_MESSAGE.map((tab, index) => (
            <Button
              key={tab.tabName}
              variant={activeTab === index ? "default" : "noShadow"}
              onClick={() => setActiveTab(index)}
              className={`w-[110px] justify-start ${
                activeTab !== index
                  ? "bg-secondary-background hover:bg-main hover:text-main-foreground border-2 border-border"
                  : ""
              }`}
            >
              {tab.icon}
              <span className="ml-2 font-bold">{tab.tabName}</span>
            </Button>
          ))}
        </div>

        <div className="space-y-0 w-full min-h-[240px]">
          {CHAT_TAB_MESSAGE[activeTab].messages.map((message, index) => (
            <div key={index}>
              <button
                onClick={() => onMessageSelect(message)}
                className="w-full text-left text-sm font-base text-foreground/70 hover:text-foreground hover:bg-secondary-background rounded-base transition-colors duration-200 ease-in-out py-3 px-3 cursor-pointer"
              >
                {message}
              </button>
              {index < CHAT_TAB_MESSAGE[activeTab].messages.length - 1 && (
                <div className="border-b-2 border-border/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatWelcomeTabs;
