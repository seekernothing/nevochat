"use client";

import { motion } from "framer-motion";

const models = [
  {
    name: "Llama 3.1",
    provider: "Meta",
    tags: ["405B", "70B", "8B"],
    color: "bg-chart-2",
    description: "Meta's most capable open-source model family.",
  },
  {
    name: "DeepSeek R1",
    provider: "DeepSeek",
    tags: ["Reasoning", "671B"],
    color: "bg-chart-1",
    description: "State-of-the-art reasoning and deep thinking.",
  },
  {
    name: "Mistral Large",
    provider: "Mistral AI",
    tags: ["123B", "Multilingual"],
    color: "bg-chart-4",
    description: "Excellent multilingual & coding capabilities.",
  },
  {
    name: "Qwen 2.5",
    provider: "Alibaba",
    tags: ["72B", "Coder"],
    color: "bg-chart-5",
    description: "Powerful coding and mathematical reasoning.",
  },
  {
    name: "Gemma 2",
    provider: "Google",
    tags: ["27B", "9B"],
    color: "bg-chart-3",
    description: "Lightweight yet surprisingly capable.",
  },
  {
    name: "Phi-3",
    provider: "Microsoft",
    tags: ["14B", "Small"],
    color: "bg-chart-2",
    description: "Compact model with punchy performance.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function ModelsShowcaseSection() {
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
            Powered by the{" "}
            <span className="text-main">Best Models</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium"
          >
            All the top open-source AI models, one click away. No API keys required.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[1fr] gap-6 max-w-5xl mx-auto"
        >
          {models.map((model) => (
            <motion.div
              key={model.name}
              variants={itemVariants}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <div className="h-full border-2 border-border rounded-base p-5 bg-background shadow-shadow hover:shadow-[6px_6px_0px_0px_var(--border)] transition-all cursor-pointer flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-full ${model.color} border-2 border-border flex items-center justify-center font-heading text-sm text-foreground`}
                    >
                      {model.name[0]}
                    </div>
                    <div>
                      <p className="font-heading text-base">{model.name}</p>
                      <p className="text-xs text-muted-foreground font-medium">
                        by {model.provider}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground font-medium mb-3 flex-1">
                    {model.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {model.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-base border-2 border-border bg-main/15 px-2 py-0.5 text-xs font-bold uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-8 text-sm text-muted-foreground font-medium"
        >
          ...and many more via{" "}
          <span className="font-bold text-foreground">OpenRouter</span>{" "}
          integration.
        </motion.p>
      </div>
    </section>
  );
}
