"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Code2, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Persistent Memory",
    description:
      "NevoChat remembers context across sessions. Never repeat yourself again and build on past conversations seamlessly.",
    icon: BrainCircuit,
    color: "bg-chart-1",
  },
  {
    title: "Developer-First Architecture",
    description:
      "Built with modern stack components. Clean APIs, extensible integrations, and robust documentation out of the box.",
    icon: Code2,
    color: "bg-chart-2",
  },
  {
    title: "Secure & Fast",
    description:
      "Enterprise-grade security with lightning-fast streaming responses. Your data is encrypted and remains under your control.",
    icon: Shield,
    color: "bg-chart-3",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
            Built for the <span className="text-main">Future</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium"
          >
            Powerful features wrapped in a minimalist, distraction-free
            interface.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
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
