"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Bot, SendHorizonal, Sparkles, Square, X } from "lucide-react"

import chatConfig from "@/lib/data/chatyong.json"
import { cn } from "@/lib/utils"

type ChatMessage = {
  id: string
  role: "assistant" | "user"
  content: string
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function resolveReply(input: string) {
  const normalizedInput = normalizeText(input)

  const bestMatch = chatConfig.replies
    .map((reply) => {
      const keywordScore = reply.keywords.reduce((score, keyword) => {
        return normalizedInput.includes(normalizeText(keyword))
          ? score + 2
          : score
      }, 0)

      const promptScore = chatConfig.relatedPrompts.reduce((score, prompt) => {
        return normalizeText(prompt) === normalizedInput ? score + 5 : score
      }, 0)

      return {
        reply,
        score: keywordScore + promptScore,
      }
    })
    .sort((left, right) => right.score - left.score)[0]

  return bestMatch && bestMatch.score > 0
    ? bestMatch.reply.answer
    : chatConfig.fallbackReply
}

export function ChatYong() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [inputFocused, setInputFocused] = useState(false)
  const [typing, setTyping] = useState(false)
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null)
  const [typingTarget, setTypingTarget] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: chatConfig.welcomeMessage,
    },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, typing])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!typing || !typingMessageId) return

    if (typingIndex >= typingTarget.length) {
      setTyping(false)
      setTypingMessageId(null)
      setTypingTarget("")
      setTypingIndex(0)
      return
    }

    const currentCharacter = typingTarget[typingIndex]
    const nextStep = currentCharacter === " " ? 1 : 2
    const nextIndex = Math.min(typingIndex + nextStep, typingTarget.length)
    const delay = /[,.!?]/.test(currentCharacter) ? 38 : 18

    timeoutRef.current = setTimeout(() => {
      setMessages((current) =>
        current.map((message) =>
          message.id === typingMessageId
            ? { ...message, content: typingTarget.slice(0, nextIndex) }
            : message
        )
      )
      setTypingIndex(nextIndex)
    }, delay)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [typing, typingIndex, typingMessageId, typingTarget])

  useEffect(() => {
    if (!textareaRef.current) return

    textareaRef.current.style.height = "0px"
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }, [input])

  const visiblePrompts = useMemo(
    () => chatConfig.relatedPrompts.slice(0, 6),
    []
  )

  const stopTyping = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setTyping(false)
    setTypingMessageId(null)
    setTypingTarget("")
    setTypingIndex(0)
  }

  const sendMessage = (rawMessage: string) => {
    const trimmedMessage = rawMessage.trim()
    if (!trimmedMessage || typing) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmedMessage,
    }
    const assistantReply = resolveReply(trimmedMessage)
    const assistantMessageId = `assistant-${Date.now()}`

    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    setMessages((current) => [
      ...current,
      userMessage,
      {
        id: assistantMessageId,
        role: "assistant",
        content: "",
      },
    ])
    setInput("")
    setTyping(true)
    setTypingMessageId(assistantMessageId)
    setTypingTarget(assistantReply)
    setTypingIndex(0)
  }

  return (
    <>
      <div className="fixed right-4 bottom-4 z-230 sm:right-6 sm:bottom-6">
        {open ? (
          <div className="w-[calc(100vw-2rem)] max-w-104 overflow-hidden rounded-[28px] border border-primary/30 bg-[#0f1630]/95 shadow-[0_28px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/8 bg-linear-to-r from-primary/16 via-primary/8 to-transparent px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_10px_24px_rgba(124,77,255,0.35)]">
                  <Bot className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black text-white">
                      {chatConfig.assistantName}
                    </p>
                    <span className="rounded-full border border-primary/30 bg-primary/12 px-2 py-0.5 text-[10px] font-bold tracking-[0.18em] text-primary uppercase">
                      AI
                    </span>
                  </div>
                  <p className="text-xs text-white/45">
                    {chatConfig.assistantTitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition hover:border-white/20 hover:bg-white/6 hover:text-white"
                aria-label="Close chatYONG"
              >
                <X className="size-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="max-h-[58vh] space-y-4 overflow-y-auto bg-linear-to-b from-white/2 to-transparent px-4 py-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "assistant"
                      ? "justify-start"
                      : "justify-end"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm",
                      message.role === "assistant"
                        ? "rounded-bl-md border border-white/8 bg-white/6 text-white/82"
                        : "rounded-br-md bg-primary text-white"
                    )}
                  >
                    {message.content}
                    {typing && message.id === typingMessageId ? (
                      <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse rounded-full bg-current align-middle opacity-80" />
                    ) : null}
                  </div>
                </div>
              ))}

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-out",
                  inputFocused && !typing
                    ? "max-h-80 translate-y-0 opacity-100"
                    : "max-h-0 translate-y-2 opacity-0"
                )}
              >
                <div className="pt-1">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] text-white/35 uppercase">
                    <Sparkles className="size-3.5 text-primary" />
                    Suggested Prompts
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {visiblePrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => sendMessage(prompt)}
                        disabled={typing}
                        className="rounded-full border border-white/10 bg-white/4 px-3 py-2 text-left text-xs text-white/68 transition hover:border-primary/40 hover:bg-primary/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/8 px-4 py-4">
              <p className="mb-3 text-xs text-white/35">
                {chatConfig.emptyState}
              </p>
              <form
                onSubmit={(event) => {
                  event.preventDefault()
                  sendMessage(input)
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  rows={1}
                  placeholder={chatConfig.placeholder}
                  disabled={typing}
                  className="min-h-12 flex-1 resize-none overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition outline-none placeholder:text-white/25 focus:border-primary/40 disabled:cursor-not-allowed disabled:opacity-45"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (typing) {
                      stopTyping()
                      return
                    }

                    sendMessage(input)
                  }}
                  className="inline-flex size-12 items-center justify-center rounded-2xl bg-primary text-white transition hover:bg-primary/88 disabled:opacity-50"
                  disabled={!typing && !input.trim()}
                  aria-label={
                    typing ? "Stop response" : "Send message to chatYONG"
                  }
                >
                  {typing ? (
                    <Square className="size-4" fill="currentColor" />
                  ) : (
                    <SendHorizonal className="size-4.5" />
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative inline-flex size-16 items-center justify-center rounded-full border border-primary/30 bg-[#101932]/92 text-white shadow-[0_24px_70px_rgba(0,0,0,0.4)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-primary/45 hover:bg-[#131d3e]"
            aria-label="Open chatYONG"
          >
            <span className="absolute inset-0 rounded-full bg-linear-to-r from-primary/18 to-transparent opacity-80" />
            <span className="relative inline-flex size-11 items-center justify-center rounded-full bg-primary text-white shadow-[0_10px_24px_rgba(124,77,255,0.35)]">
              <Bot className="size-5" />
            </span>
          </button>
        )}
      </div>
    </>
  )
}
