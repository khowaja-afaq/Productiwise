
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, Task } from '../types';
import { getWiselyResponse, extractTaskFromText, getTextFromImage } from '../services/geminiService';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Icon } from './Icon';

interface WiselyScreenProps {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const ChatBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-2xl ${isUser ? 'bg-primary-600 text-white rounded-br-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-bl-lg'}`}>
        {message.image && <img src={message.image} alt="user upload" className="rounded-lg mb-2 max-h-48" />}
        <p className="text-sm break-words">{message.text}</p>
      </div>
    </div>
  );
};

export const WiselyScreen: React.FC<WiselyScreenProps> = ({ setTasks }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Wisely. How can I help you be more productive today? You can ask me to add a task, give you a tip, or even read a photo of a sticky note." },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSpeechResult = useCallback((transcript: string) => {
    setInput(transcript);
    // Automatically send message after speech recognition
    // Using a function to get latest messages state
    setMessages(prev => [...prev, { role: 'user', text: transcript }]);
    processMessage(transcript);
  }, []);

  const { isListening, startListening } = useSpeechRecognition(handleSpeechResult);

  const processMessage = async (text: string, imageUrl?: string) => {
      setIsLoading(true);
      
      const newHistory: ChatMessage[] = [...messages, { role: 'user', text, image: imageUrl }];

      try {
          // Check if user wants to add a task
          if (text.toLowerCase().includes('add task') || text.toLowerCase().includes('create a task') || text.toLowerCase().includes('remind me to')) {
              const taskDetails = await extractTaskFromText(text);
              if (taskDetails) {
                  const newTask: Task = {
                      id: Date.now().toString(),
                      ...taskDetails,
                  } as Task;
                  setTasks(prev => [newTask, ...prev]);
                  setMessages([...newHistory, { role: 'model', text: `Sure, I've added "${newTask.title}" to your planner.` }]);
              } else {
                  setMessages([...newHistory, { role: 'model', text: "I had trouble creating that task. Could you try phrasing it differently?" }]);
              }
          } else if (imageUrl) {
               const ocrText = await getTextFromImage(imageUrl.split(',')[1], 'image/png');
               setMessages([...newHistory, { role: 'model', text: `Here's what I read from the image:\n\n"${ocrText}"\n\nWould you like me to create a task from this?` }]);
          } else {
              const response = await getWiselyResponse(newHistory);
              setMessages([...newHistory, { role: 'model', text: response }]);
          }
      } catch (error) {
          console.error(error);
          setMessages([...newHistory, { role: 'model', text: "Oops, something went wrong. Please try again." }]);
      } finally {
          setIsLoading(false);
      }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    processMessage(input);
    setInput('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const userMessage = "Can you read this note and create a task?";
        setMessages([...messages, { role: 'user', text: userMessage, image: base64String }]);
        processMessage(userMessage, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 p-3 rounded-2xl rounded-bl-lg">
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
	                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
	                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                </div>
             </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-2 border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />
          <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-500 hover:text-primary-600">
            <Icon name="photo" />
          </button>
          <button type="button" onClick={startListening} className={`p-2 ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-500 hover:text-primary-600'}`}>
            <Icon name="mic" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? 'Listening...' : 'Chat with Wisely...'}
            className="flex-1 p-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          />
          <button type="submit" className="p-2 bg-primary-600 text-white rounded-lg disabled:bg-slate-400" disabled={isLoading || !input}>
            <Icon name="send" />
          </button>
        </form>
      </div>
    </div>
  );
};
