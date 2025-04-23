"use client";

import { useChat } from "@ai-sdk/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "./ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef } from "react";
import { Logo } from "./logo";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Brain, Circle, Send, Trash } from "lucide-react";
import Markdown from "react-markdown";

const WELCOME_MESSAGE = "👋 Welcome to NotebudAI! How can I help you today?";
const SUGGESTED_PROMPTS = [
  "Summary of my notes grouped by folder.",
  "What are my favorite notes?",
  "What are my most recent notes?",
  "What are the notes I added this week?",
];

export default function ChatInterface() {
  const {
    messages,
    setMessages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setInput,
  } = useChat({
    api: "/api/chat",
  });

  const { data: session } = useSession();

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  const showWelcome = messages.length === 0;

  return (
    <Card className="bg-card/40 mx-auto w-full backdrop-blur-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Chat with Bud</CardTitle>
        <CardDescription>
          Ask Bud questions about your notes, what is the color of the sky, or
          why she don&apos;t love you the way you love her.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <ScrollArea className="h-[66vh] px-4" ref={scrollRef}>
          <div className="space-y-4">
            {showWelcome && (
              <div className="flex justify-center">
                <div className="flex w-full flex-col items-center justify-center space-y-10 rounded-md text-center">
                  <Logo className="mt-10" />
                  <div className="font-semibold">{WELCOME_MESSAGE}</div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <Button
                        key={prompt}
                        size="sm"
                        type="button"
                        onClick={() => {
                          setInput(prompt);
                          setTimeout(() => {
                            // Find the form and submit it programmatically
                            document.getElementById("chat-form")?.dispatchEvent(
                              new Event("submit", {
                                cancelable: true,
                                bubbles: true,
                              }),
                            );
                          }, 0);
                        }}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <Avatar className="mr-2 size-8">
                    <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                      <Brain className="text-primary-foreground h-5 w-5" />
                    </div>
                  </Avatar>
                )}
                <div
                  className={`relative max-w-[70%] rounded-md p-3 break-words ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {/* Chat bubble tail */}
                  {message.role === "user" ? (
                    <span className="border-l-primary absolute right-[-8px] bottom-2 h-0 w-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent" />
                  ) : (
                    <span className="border-r-secondary absolute bottom-2 left-[-8px] h-0 w-0 border-t-8 border-r-8 border-b-8 border-t-transparent border-b-transparent" />
                  )}
                  <Markdown>{message.content}</Markdown>
                </div>
                {message.role === "user" && (
                  <Avatar className="ml-2 size-8">
                    {session?.user?.image ? (
                      <AvatarImage
                        src={session.user.image}
                        alt={session.user.name ?? "User"}
                      />
                    ) : (
                      <AvatarFallback>
                        {session?.user?.name?.[0] ?? "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                )}
              </div>
            ))}
            {status === "streaming" && (
              <div className="flex justify-start">
                <Badge className="animate-pulse">
                  <Circle className="animate-spin" /> Streaming...
                </Badge>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form
          id="chat-form"
          onSubmit={handleSubmit}
          className="flex w-full items-center space-x-2"
        >
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            className="flex-1"
            autoFocus
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            disabled={messages.length === 0 || status === "streaming"}
            onClick={() => setMessages([])}
          >
            <Trash />
          </Button>
          <Button
            type="submit"
            size="icon"
            disabled={status === "streaming" || !input.trim()}
          >
            <Send />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
