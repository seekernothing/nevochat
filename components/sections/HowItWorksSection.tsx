"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Sparkles, Settings, History } from "lucide-react";

const steps = [
  {
    value: "choose",
    label: "Choose a Model",
    icon: Settings,
    title: "Pick Your AI Model",
    description:
      "Browse and select from a curated list of top open-source models — Llama, Mistral, DeepSeek, Qwen, and more. Switch models anytime, mid-conversation.",
    visual: (
      <div className="grid grid-cols-2 gap-3">
        {[
          { name: "Llama 3.1", tag: "Meta", color: "bg-chart-2" },
          { name: "Mistral Large", tag: "Mistral AI", color: "bg-chart-4" },
          { name: "DeepSeek R1", tag: "DeepSeek", color: "bg-chart-1" },
          { name: "Qwen 2.5", tag: "Alibaba", color: "bg-chart-5" },
        ].map((model) => (
          <div
            key={model.name}
            className="border-2 border-border rounded-base p-3 bg-background shadow-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all cursor-pointer"
          >
            <div
              className={`w-8 h-8 rounded-full ${model.color} border-2 border-border mb-2`}
            />
            <p className="font-heading text-sm">{model.name}</p>
            <p className="text-xs text-muted-foreground font-medium">
              {model.tag}
            </p>
          </div>
        ))}
      </div>
    ),
  },
  {
    value: "chat",
    label: "Start Chatting",
    icon: MessageSquare,
    title: "Have a Conversation",
    description:
      "Ask anything — from coding questions to creative writing. Get real-time, streaming responses with chain-of-thought reasoning for complex queries.",
    visual: (
      <div className="space-y-3">
        <div className="self-end bg-main text-main-foreground rounded-base rounded-tr-sm px-4 py-3 border-2 border-border shadow-shadow ml-auto max-w-[85%]">
          <p className="text-sm font-medium">
            Write a Python function that sorts a list using quicksort.
          </p>
        </div>
        <div className="self-start bg-background text-foreground rounded-base rounded-tl-sm px-4 py-3 border-2 border-border shadow-shadow max-w-[85%]">
          <p className="text-sm font-medium mb-2">
            Here&apos;s an efficient quicksort implementation:
          </p>
          <div className="bg-foreground/5 rounded-base border-2 border-border p-3 font-mono text-xs">
            <span className="text-chart-2">def</span>{" "}
            <span className="text-chart-1">quicksort</span>(arr):
            <br />
            &nbsp;&nbsp;
            <span className="text-chart-2">if</span> len(arr) {"<="} 1:
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="text-chart-2">return</span> arr
            <br />
            &nbsp;&nbsp;pivot = arr[len(arr) // 2]
            <br />
            &nbsp;&nbsp;...
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "think",
    label: "AI Thinks Deep",
    icon: Sparkles,
    title: "Chain-of-Thought Reasoning",
    description:
      "For complex problems, NevoChat activates deep reasoning mode. Watch the AI break down problems step-by-step before delivering a comprehensive answer.",
    visual: (
      <div className="space-y-3">
        <div className="border-2 border-chart-4 bg-chart-4/10 rounded-base p-4">
          <p className="text-xs font-heading uppercase tracking-wider text-chart-4 mb-2">
            🧠 Thinking...
          </p>
          <div className="space-y-2 text-sm font-medium text-muted-foreground">
            <p>→ Breaking down the math problem...</p>
            <p>→ Identifying key variables and constraints...</p>
            <p>→ Applying relevant formulas...</p>
            <p className="text-foreground font-bold">
              → Generating final answer ✓
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    value: "history",
    label: "Revisit Anytime",
    icon: History,
    title: "Access Your History",
    description:
      "Every conversation is saved and organized in a clean sidebar. Search, revisit, and continue any past conversation exactly where you left off.",
    visual: (
      <div className="space-y-2">
        {[
          {
            title: "Python Quicksort Help",
            time: "2 hours ago",
            active: true,
          },
          { title: "Essay Review Draft", time: "Yesterday", active: false },
          {
            title: "API Design Patterns",
            time: "3 days ago",
            active: false,
          },
          { title: "Math Homework Q3", time: "Last week", active: false },
        ].map((item) => (
          <div
            key={item.title}
            className={`border-2 border-border rounded-base p-3 cursor-pointer transition-all hover:translate-x-[-2px] hover:shadow-[4px_4px_0px_0px_var(--border)] ${
              item.active
                ? "bg-main/20 shadow-shadow"
                : "bg-background"
            }`}
          >
            <p className="font-heading text-sm">{item.title}</p>
            <p className="text-xs text-muted-foreground font-medium">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    ),
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState("choose");
  const currentStep = steps.find((s) => s.value === activeStep) ?? steps[0];

  return (
    <section className="py-24 bg-background relative border-t-2 border-border">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-heading sm:text-4xl md:text-5xl"
          >
            How It <span className="text-main">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium"
          >
            From model selection to deep reasoning — in four simple steps.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Custom Tab Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-2 border-border rounded-base shadow-shadow overflow-hidden mb-8">
            {steps.map((step, index) => (
              <button
                key={step.value}
                onClick={() => setActiveStep(step.value)}
                className={`flex items-center justify-center gap-2 px-4 py-3.5 font-heading text-sm uppercase tracking-wide transition-all cursor-pointer ${
                  index < steps.length - 1
                    ? "border-r-2 border-border"
                    : ""
                } ${
                  index < 2 ? "border-b-2 sm:border-b-0" : ""
                } ${
                  activeStep === step.value
                    ? "bg-main text-main-foreground"
                    : "bg-secondary-background text-foreground hover:bg-main/20"
                }`}
              >
                <step.icon className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden text-xs">
                  {step.label.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Content Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 border-border shadow-shadow bg-background">
                <div className="grid md:grid-cols-2 gap-0">
                  <CardHeader className="p-8 flex flex-col justify-center border-b-2 md:border-b-0 md:border-r-2 border-border">
                    <CardTitle className="text-2xl font-heading mb-3">
                      {currentStep.title}
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground font-medium leading-relaxed">
                      {currentStep.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    {currentStep.visual}
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
