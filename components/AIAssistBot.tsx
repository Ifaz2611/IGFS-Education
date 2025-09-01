/// <reference types="vite/client" />
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatIcon, XIcon, ArrowRightIcon } from "./icons";

type Message = {
  sender: "user" | "bot";
  text: string;
};

const AIAssistBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  const quickReplies = [
    "Looking for Study Abroad",
    "IELTS",
    "Event / Fair Information",
  ];

  // ✅ Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, showQuickReplies]);

  // ✅ Start conversation when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startConversation();
      if (showBadge) setShowBadge(false);
    }
  }, [isOpen]);

  // ✅ Start conversation with backend
  const startConversation = async () => {
    setIsLoading(true);
    setShowQuickReplies(false);
    setMessages([{ sender: "bot", text: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Hello, please introduce yourself and greet me.",
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.details || data.error);
      }

      setMessages([{ sender: "bot", text: data.reply || "..." }]);
      setError(null);
    } catch (err: any) {
      console.error("Error starting conversation:", err);
      setError("Could not connect to AI Assistant. Please try again later.");
      setMessages([
        {
          sender: "bot",
          text: "Sorry, I am having trouble connecting right now.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setShowQuickReplies(true);
    }
  };

  // ✅ Send message to backend
  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    setShowQuickReplies(false);
    const userMessage: Message = { sender: "user", text: messageText };
    setMessages((prev) => [...prev, userMessage, { sender: "bot", text: "" }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.details || data.error);
      }

      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = data.reply || "...";
        return newMessages;
      });
      setError(null);
    } catch (err: any) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text =
          "Sorry, something went wrong. Please try again.";
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
  };

  const handleQuickReplyClick = (reply: string) => sendMessage(reply);

  return (
    <>
      {/* ✅ Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-20 right-6 z-[60]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-brand-primary text-white p-4 rounded-full shadow-lg flex items-center justify-center relative"
            aria-label="Open AI Assistant"
          >
            <ChatIcon className="h-7 w-7" />
            {showBadge && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 justify-center items-center text-white text-xs">
                  1
                </span>
              </span>
            )}
          </motion.button>
        </div>
      )}

      {/* ✅ Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-[55] overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <header className="bg-brand-primary text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">IGFS AI Assistant</h3>
                <p className="text-sm text-gray-200">Your study abroad guide</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </header>

            <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <div className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-sm">
                    <strong>Error:</strong> {error}
                  </div>
                )}

                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-brand-secondary text-brand-primary rounded-br-none"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {msg.text || "..."}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {showQuickReplies && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-wrap justify-end gap-2 pt-2"
                  >
                    {quickReplies.map((reply) => (
                      <motion.button
                        key={reply}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuickReplyClick(reply)}
                        className="px-4 py-2 border border-gray-400 dark:border-gray-500 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
                      >
                        {reply}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 rounded-bl-none flex items-center space-x-2">
                      <span className="block w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="block w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="block w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <footer className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={error ? "AI not available" : "Ask a question..."}
                  disabled={isLoading || !!error}
                  className="flex-grow px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm text-gray-800 dark:text-gray-200 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim() || !!error}
                  className="bg-brand-primary text-white p-2.5 rounded-full hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </form>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistBot;
