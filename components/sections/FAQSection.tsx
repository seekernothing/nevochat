"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is NevoChat free to use?",
    answer:
      "Yes! NevoChat is completely free to use with open-source models. Simply sign in with Google or GitHub and start chatting right away — no credit card or API keys required.",
  },
  {
    question: "What AI models are available?",
    answer:
      "NevoChat supports a wide range of top-tier open-source models including Llama 3.1 (Meta), DeepSeek R1, Mistral Large, Qwen 2.5, Gemma 2, Phi-3, and many more via our OpenRouter integration. New models are added regularly.",
  },
  {
    question: "Is my chat data private and secure?",
    answer:
      "Absolutely. NevoChat uses robust authentication (Google & GitHub OAuth) to protect your account. Your chat history is stored securely and is only accessible to you. We never share your conversations with third parties.",
  },
  {
    question: "What is chain-of-thought reasoning?",
    answer:
      "Chain-of-thought is an advanced AI capability where the model 'thinks' step-by-step before answering. For complex questions, you can see the reasoning process unfold in real-time, leading to more accurate and well-structured responses.",
  },
  {
    question: "Can I switch models mid-conversation?",
    answer:
      "Yes! NevoChat supports dynamic model selection. You can switch between different AI models at any point during a conversation to compare responses or find the best model for your specific task.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes, NevoChat is fully responsive and works flawlessly across all devices — from desktop browsers to tablets and mobile phones. The interface adapts beautifully to any screen size.",
  },
];

export function FAQSection() {
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
            Frequently <span className="text-main">Asked</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[500px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-medium"
          >
            Got questions? We&apos;ve got answers.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
              >
                <AccordionTrigger className="text-left text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-medium leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
