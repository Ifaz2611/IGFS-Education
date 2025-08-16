import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatIcon, XIcon, ArrowRightIcon } from './icons';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const AIAssistBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatInstance = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [showQuickReplies, setShowQuickReplies] = useState(false);

    const quickReplies = ["Looking for Study Abroad", "IELTS", "Event / Fair Information"];

    useEffect(() => {
        if (isOpen && !chatInstance.current) {
            try {
                if (!process.env.API_KEY) {
                    throw new Error("API_KEY is not set.");
                }
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                chatInstance.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: "You are a friendly and helpful AI assistant for IGFS (International Guide for Students). Your name is 'IGFS Guide'. Your goal is to answer questions about studying abroad, the services IGFS offers, destinations like the USA, South Korea, and Italy, and the application process. Keep your answers helpful and relatively concise. Do not reveal you are a language model. Start the conversation with a friendly greeting and ask what the user needs help with, for example 'Hi! What brings you to IGFS today?'.",
                    }
                });
                setError(null);
            } catch (e) {
                console.error("Failed to initialize AI Assistant:", e);
                setError("Could not initialize AI Assistant. API key might be missing.");
                return;
            }

            const startConversation = async () => {
                setIsLoading(true);
                setShowQuickReplies(false);
                setMessages([{ sender: 'bot', text: '' }]);
                try {
                    const response = await chatInstance.current!.sendMessageStream({ message: "Hello, please introduce yourself and greet me." });
                    let botResponse = '';

                    for await (const chunk of response) {
                        botResponse += chunk.text;
                        setMessages([{ sender: 'bot', text: botResponse }]);
                    }
                } catch (e) {
                    console.error("Error starting conversation:", e);
                    setMessages([{ sender: 'bot', text: 'Sorry, I am having trouble connecting. Please try again later.' }]);
                } finally {
                    setIsLoading(false);
                    setShowQuickReplies(true);
                }
            };

            if (messages.length === 0) {
                startConversation();
            }
        }
    }, [isOpen]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading, showQuickReplies]);

    const sendMessage = async (messageText: string) => {
        if (!messageText.trim() || isLoading || !chatInstance.current) return;

        setShowQuickReplies(false);
        const userMessage: Message = { sender: 'user', text: messageText };
        setMessages(prev => [...prev, userMessage, { sender: 'bot', text: '' }]);
        setIsLoading(true);

        try {
            const stream = await chatInstance.current.sendMessageStream({ message: messageText });
            let botResponse = '';

            for await (const chunk of stream) {
                botResponse += chunk.text;
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text = botResponse;
                    return newMessages;
                });
            }
        } catch (e) {
            console.error("Error sending message:", e);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = 'Sorry, something went wrong. Please try again.';
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
        setInput('');
    };
    
    const handleQuickReplyClick = (reply: string) => {
        sendMessage(reply);
    };

    return (
        <>
            <div className="fixed bottom-6 right-6 z-[60]">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-brand-primary text-white p-4 rounded-full shadow-lg flex items-center justify-center relative"
                    aria-label="Toggle AI Assistant"
                >
                    <AnimatePresence>
                        {isOpen ? (
                            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                <XIcon className="h-7 w-7" />
                            </motion.div>
                        ) : (
                            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                                <ChatIcon className="h-7 w-7" />
                                {messages.length === 0 && !error && (
                                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 justify-center items-center text-white text-xs">1</span>
                                    </span>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[70vh] max-h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col z-[55] overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                        <header className="bg-brand-primary text-white p-4 flex items-center justify-between flex-shrink-0">
                            <div>
                                <h3 className="font-bold text-lg">IGFS AI Assistant</h3>
                                <p className="text-sm text-gray-200">Your study abroad guide</p>
                            </div>
                        </header>
                        
                        <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                            <div className="space-y-4">
                                {error ? (
                                    <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 text-sm">
                                        <strong>Error:</strong> {error}
                                    </div>
                                ) : (
                                    messages.map((msg, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[80%] p-3 rounded-2xl ${
                                                msg.sender === 'user' 
                                                ? 'bg-brand-secondary text-brand-primary rounded-br-none' 
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                                            }`}>
                                                <p className="text-sm whitespace-pre-wrap">{msg.text || '...'}</p>
                                            </div>
                                        </motion.div>
                                    ))
                                )}

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

                                {isLoading && messages.length > 0 && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
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

                        <footer className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 bg-white dark:bg-gray-800">
                             <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={error ? "AI not available" : "Ask a question..."}
                                    disabled={isLoading || !!error}
                                    className="flex-grow px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm text-gray-800 dark:text-gray-200 disabled:opacity-50"
                                />
                                <button type="submit" disabled={isLoading || !input.trim() || !!error} className="bg-brand-primary text-white p-2.5 rounded-full hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed transition-all">
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