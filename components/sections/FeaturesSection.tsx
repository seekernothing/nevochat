"use client";

import { motion } from "framer-motion";
import { Layers, BrainCircuit, Shield, Zap, Monitor, History } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Open-Source Models",
    description:
      "Access and chat with a wide variety of top-tier open-source AI models, seamlessly integrated into a single platform for your convenience.",
    icon: Layers,
    color: "bg-chart-1",
  },
  {
    title: "Intelligent Conversations",
    description:
      "A smart, highly interactive chat interface designed for the most accurate, contextual, and high-quality responses.",
    icon: BrainCircuit,
    color: "bg-chart-2",
  },
  {
    title: "Secure & Private",
    description:
      "Robust authentication ensuring your chat history and personal data remain completely safe and private.",
    icon: Shield,
    color: "bg-chart-3",
  },
  {
    title: "Advanced AI Capabilities",
    description:
      "Powered by chain-of-thought reasoning, dynamic model selection, and lightning-fast response generation.",
    icon: Zap,
    color: "bg-chart-4",
  },
  {
    title: "Beautiful & Responsive",
    description:
      "A clean, modern, and intuitive interface that works flawlessly across all devices, from mobile to desktop.",
    icon: Monitor,
    color: "bg-chart-5",
  },
  {
    title: "Seamless History",
    description:
      "A well-organized chat history sidebar to easily access, manage, and revisit past conversations anytime.",
    icon: History,
    color: "bg-chart-1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function FeaturesSection() {
  return (
    <section className="py-24 bg-secondary-background relative border-t-2 border-border">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-heading sm:text-4xl md:text-5xl"
          >
            Why <span className="text-main">NevoChat</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium"
          >
            Everything you need for intelligent AI conversations, beautifully
            wrapped.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[1fr] gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} className="h-full">
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Card className="h-full border-2 border-border shadow-shadow transition-shadow hover:shadow-[8px_8px_0px_0px_var(--border)] relative overflow-hidden group bg-background">
                  {/* Decorative background glow on hover */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg ${feature.color}`}
                  />

                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-base border-2 border-border shadow-shadow flex items-center justify-center mb-4 ${feature.color}`}
                    >
                      <feature.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <CardTitle className="text-xl font-heading">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base text-muted-foreground font-medium">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
