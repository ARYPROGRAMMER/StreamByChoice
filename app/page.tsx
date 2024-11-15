"use client"
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Appbar } from "./components/Appbar";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import { TooltipProvider, TooltipContent } from "@radix-ui/react-tooltip";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.data?.user){
      router.push('/dashboard')
    }

  },[session]);
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1E1E1E] via-[#2B2B2B] to-[#1E1E1E] text-gray-100 font-comfortaa">
      <Appbar />
    
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col justify-center items-center text-center space-y-8">
          <motion.h1
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#9B51E0] to-[#E83E8C] animate-text-glow"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Build. Scale. Dominate.
          </motion.h1>
          <p className="text-lg text-gray-400 max-w-3xl">
            The ultimate platform for creators and developers. Unlock your potential with cutting-edge tools and a vibrant community.
          </p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button className="px-8 py-4 bg-gradient-to-r from-[#9B51E0] to-[#E83E8C] hover:from-[#7B3FB0] hover:to-[#B8297C] text-white rounded-lg">
              Get Started
            </Button>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6">
          <motion.div
            className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.3 },
              },
              hidden: { opacity: 0 },
            }}
          >
            {[{
                title: "Real-Time Analytics",
                description: "Monitor and analyze in real-time to make better decisions.",
                icon: "https://assets.grammarly.com/emoji/v1/1f4c8.svg", // Updated URL for real-time analytics icon
              },
              {
                title: "Customizable Overlays",
                description: "Design overlays tailored to your needs.",
                icon: "https://assets.grammarly.com/emoji/v1/1f4c8.svg", // Customizable overlays
              },
              {
                title: "AI Tools",
                description: "Leverage AI to enhance your workflow.",
                icon: "https://assets.grammarly.com/emoji/v1/1f4c8.svg", // AI tools illustration
              },
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </motion.div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 bg-[#2B2B2B] text-gray-200">
          <motion.div
            className="container mx-auto space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
          >
            <h2 className="text-4xl font-bold text-center">Our Journey</h2>
            <div className="space-y-8">
              {[{
                  year: "2024", event: "Launched our platform.",
                },
                {
                  year: "2024", event: "Reached XM+ users worldwide.",
                },
                {
                  year: "2024", event: "Introduced AI-powered features.",
                },
              ].map((item, index) => (
                <TimelineItem key={index} {...item} />
              ))}
            </div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6 bg-[#212121]">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-100">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="mt-12 space-y-4">
              {[{
                  question: "How do I get started?", answer: "Sign up and explore our tools today!",
                },
                {
                  question: "Is there a free plan?", answer: "Yes, we offer a free tier with basic features.",
                },
                {
                  question: "Do you provide support?", answer: "Our support team is available 24/7.",
                },
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-black text-center text-gray-400">
          <TooltipProvider>
            <div className="flex justify-center space-x-4">
              {[{
                  icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkbq-094WlodH_1w7xW6QoUqoafZcgLPKbA&s", link: "https://twitter.com",
                },
                {
                  icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbqj9Ii13d6hx5a9kyLnC5A8A96LDSaSZv_w&s", link: "https://github.com",
                },
                {
                  icon: "https://media.licdn.com/dms/image/D4D12AQFSkkazpND0Tg/article-cover_image-shrink_720_1280/0/1696901179396?e=2147483647&v=beta&t=sy1mG4edVFhzPGGjPYoC7GZjph70EmjszvQYVjHV6PM", link: "https://linkedin.com",
                },
              ].map((social, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <a href={social.link} target="_blank" rel="noopener noreferrer">
                      <Image src={social.icon} alt="" width={24} height={24} />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    Visit us on {social.link}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
          <p className="mt-6">© 2024. All Rights Reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <motion.div
    className="flex flex-col items-center p-6 bg-[#3D3D3D] rounded-lg shadow-lg transition-transform hover:scale-105"
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    }}
  >
    <Image src={icon} alt={title} width={64} height={64} />
    <h3 className="text-xl font-semibold text-gray-100 mt-4">{title}</h3>
    <p className="text-gray-400 text-center">{description}</p>
  </motion.div>
);

interface TimelineItemProps {
  year: string;
  event: string;
}

const TimelineItem = ({ year, event }: TimelineItemProps) => (
  <div className="flex items-start space-x-6">
    <div className="flex-none w-12 h-12 bg-[#9B51E0] rounded-full flex items-center justify-center text-white font-bold">
      {year}
    </div>
    <div>
      <h4 className="text-lg font-semibold">{event}</h4>
    </div>
  </div>
);
