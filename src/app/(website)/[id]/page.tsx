"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ChatPage({
  params,
}: {
  params: { id: string };
}) {

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);

  // جلب الرسائل

  useEffect(() => {

    const getMessages = async () => {

      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("chat_id", params.id)
        .order("created_at", {
          ascending: true,
        });

      if (error) {
        console.log(error);
      } else {
        setMessages(data || []);
      }

    };

    getMessages();

    // Realtime

    const channel = supabase
      .channel(`chat-${params.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {

          const newMessage = payload.new as any;

          // فقط رسائل هذه المحادثة

          if (newMessage.chat_id === params.id) {

            setMessages((prev) => {

              // منع التكرار

              const exists = prev.find(
                (msg) => msg.id === newMessage.id
              );

              if (exists) return prev;

              return [...prev, newMessage];

            });

          }

        }
      )
      .subscribe();

    // Cleanup

    return () => {

      supabase.removeChannel(channel);

    };

  }, [params.id]);

  // النزول للأسفل

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // إرسال الرسالة

  const sendMessage = async () => {

    if (!message.trim()) return;

    const tempMessage = message;

    setMessage("");

    const { error } = await supabase
      .from("messages")
      .insert([
        {
          chat_id: params.id,

          sender: "worker",

          message: tempMessage,
        },
      ]);

    if (error) {
      console.log(error);
    }

  };

  return (

    <div
      className="min-h-screen bg-slate-100 flex flex-col"
      dir="rtl"
    >

      {/* Header */}

      <div className="
        bg-white
        shadow-sm
        px-6
        py-5
        flex
        items-center
        justify-between
      ">

        <div>

          <h1 className="text-2xl font-extrabold text-slate-900">
            المحادثة
          </h1>

          <p className="text-slate-500 mt-1">
            تواصل بسهولة وأمان
          </p>

        </div>

      </div>

      {/* Messages */}

      <div className="
        flex-1
        overflow-y-auto
        p-6
        space-y-4
      ">

        {messages.length === 0 && (

          <div className="
            flex
            items-center
            justify-center
            h-full
          ">

            <div className="
              bg-white
              px-10
              py-8
              rounded-[35px]
              shadow-sm
              text-center
            ">

              <h2 className="text-3xl font-bold text-slate-800">
                لا توجد رسائل بعد
              </h2>

              <p className="text-slate-500 mt-4 text-lg">
                ابدأ المحادثة الآن
              </p>

            </div>

          </div>

        )}

        {messages.map((msg, index) => (

          <div
            key={msg.id || index}
            className={`
              flex
              ${msg.sender === "worker"
                ? "justify-start"
                : "justify-end"}
            `}
          >

            <div
              className={`
                max-w-[75%]
                px-6
                py-4
                rounded-[30px]
                text-lg
                shadow-sm
                leading-8
                break-words
                ${msg.sender === "worker"
                  ? "bg-primary text-white rounded-br-md"
                  : "bg-white text-slate-800 rounded-bl-md"}
              `}
            >

              {msg.message}

            </div>

          </div>

        ))}

        <div ref={bottomRef}></div>

      </div>

      {/* Input */}

      <div className="
        bg-white
        border-t
        border-slate-200
        p-5
      ">

        <div className="
          max-w-4xl
          mx-auto
          flex
          items-center
          gap-4
        ">

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="اكتب رسالتك..."
            className="
              flex-1
              bg-slate-100
              rounded-3xl
              px-6
              py-4
              outline-none
              text-lg
              focus:ring-4
              focus:ring-primary/10
            "
          />

          <button
            onClick={sendMessage}
            className="
              bg-primary
              text-white
              px-8
              py-4
              rounded-3xl
              font-extrabold
              text-lg
              shadow-[0_0_30px_rgba(16,185,129,0.35)]
              hover:scale-105
              hover:shadow-[0_0_55px_rgba(16,185,129,0.6)]
              transition-all
              duration-300
            "
          >
            إرسال
          </button>

        </div>

      </div>

    </div>

  );
}