import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Message, MessageSender } from '../types';
import { geminiService } from '../services/geminiService';
import { SendIcon, BackIcon } from './icons';

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.sender === MessageSender.USER;
    return (
        <div
            className={`flex items-end gap-2 animate-fade-in-slide-up-fast ${
                isUser ? 'justify-end' : 'justify-start'
            }`}
            style={{ opacity: 0 }}
        >
            <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl ${
                    isUser
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
            >
                <p className="text-sm break-words">{message.text}</p>
            </div>
        </div>
    );
};

const ChatScreen: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'init',
            text: 'Hello! How can I help you with the Karnataka dairy industry today?',
            sender: MessageSender.BOT,
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        chatContainerRef.current?.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: MessageSender.USER,
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const botResponse = await geminiService.sendMessage(input);
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: botResponse,
                sender: MessageSender.BOT,
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble connecting. Please try again later.",
                sender: MessageSender.BOT,
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                <Link
                    to="/"
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Back to overview"
                >
                    <BackIcon className="w-6 h-6 text-gray-600" />
                </Link>
                <div className="text-center">
                    <h1 className="text-lg font-bold text-blue-900">Dairy Chatbot</h1>
                    <p className="text-xs text-gray-500">Powered by Gemini</p>
                </div>
                <div className="w-10"></div>
            </header>

            <main
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
            >
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                {isLoading && (
                    <div
                        className="flex justify-start animate-fade-in-slide-up-fast"
                        style={{ opacity: 0 }}
                    >
                        <div className="px-4 py-3 rounded-2xl rounded-bl-none bg-gray-200">
                            <div className="flex items-center space-x-2">
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="p-4 bg-white border-t border-gray-200 sticky bottom-0">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2 max-w-4xl mx-auto">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about KMF, Nandini..."
                        className="flex-1 w-full px-4 py-3 text-sm bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="p-3 bg-blue-600 text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
                        aria-label="Send message"
                    >
                        <SendIcon className="w-6 h-6" />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default ChatScreen;