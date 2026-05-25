"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

export default function ChatPage({
  params,
}: {
  params: { id: string };
}) {

  const [messages, setMessages] =
    useState<any[]>([]);

  const [message, setMessage] =
    useState("");

  const [typingUser, setTypingUser] =
    useState(false);

  const [onlineStatus, setOnlineStatus] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  const typingTimeout =
    useRef<any>(null);

  // Setup Chat

  useEffect(() => {

    let messagesChannel: any;

    let typingChannel: any;

    let onlineChannel: any;

    const setupChat = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        toast.error(
          "يجب تسجيل الدخول"
        );

        return;

      }

      // Online Status

      await supabase
        .from("online_status")
        .upsert({

          user_id: user.id,

          user_type: "worker",

          is_online: true,

          last_seen:
            new Date(),

        });

      // Fetch Messages

      const {
        data,
        error,
      } = await supabase
        .from("messages")
        .select("*")
        .eq(
          "chat_id",
          params.id
        )
        .order(
          "created_at",
          {
            ascending: true,
          }
        );

      if (error) {

        console.error(error);

        toast.error(
          "فشل تحميل الرسائل"
        );

      } else {

        setMessages(
          data || []
        );

      }

      // Seen Messages

      await supabase
        .from("messages")
        .update({
          is_read: true,
        })
        .eq(
          "chat_id",
          params.id
        )
        .neq(
          "sender",
          "worker"
        );

      // Online Status

      const {
        data: statusData,
      } = await supabase
        .from("online_status")
        .select("*")
        .eq(
          "user_type",
          "client"
        )
        .single();

      setOnlineStatus(
        statusData
      );

      // Realtime Messages

      messagesChannel =
        supabase.channel(
          `chat-${params.id}`
        );

      messagesChannel.on(

        "postgres_changes",

        {
          event: "*",

          schema: "public",

          table: "messages",

          filter:
            `chat_id=eq.${params.id}`,

        },

        async () => {

          const {
            data:
              updatedMessages,
          } = await supabase
            .from("messages")
            .select("*")
            .eq(
              "chat_id",
              params.id
            )
            .order(
              "created_at",
              {
                ascending:
                  true,
              }
            );

          setMessages(
            updatedMessages ||
              []
          );

        }

      );

      // Typing Channel

      typingChannel =
        supabase.channel(
          `typing-${params.id}`
        );

      typingChannel.on(

        "postgres_changes",

        {
          event: "*",

          schema: "public",

          table:
            "typing_status",

          filter:
            `chat_id=eq.${params.id}`,

        },

        async () => {

          const {
            data: typingData,
          } = await supabase
            .from(
              "typing_status"
            )
            .select("*")
            .eq(
              "chat_id",
              params.id
            )
            .eq(
              "user_type",
              "client"
            )
            .single();

          setTypingUser(

            typingData?.is_typing ||
              false

          );

        }

      );

      // Online Channel

      onlineChannel =
        supabase.channel(
          `online-${params.id}`
        );

      onlineChannel.on(

        "postgres_changes",

        {
          event: "*",

          schema: "public",

          table:
            "online_status",

        },

        async () => {

          const {
            data: statusData,
          } = await supabase
            .from(
              "online_status"
            )
            .select("*")
            .eq(
              "user_type",
              "client"
            )
            .single();

          setOnlineStatus(
            statusData
          );

        }

      );

      await messagesChannel.subscribe();

      await typingChannel.subscribe();

      await onlineChannel.subscribe();

      setLoading(false);

      // Before Unload

      window.addEventListener(

        "beforeunload",

        async () => {

          await supabase
            .from(
              "online_status"
            )
            .upsert({

              user_id:
                user.id,

              user_type:
                "worker",

              is_online:
                false,

              last_seen:
                new Date(),

            });

        }

      );

    };

    setupChat();

    return () => {

      if (
        messagesChannel
      ) {

        supabase.removeChannel(
          messagesChannel
        );

      }

      if (
        typingChannel
      ) {

        supabase.removeChannel(
          typingChannel
        );

      }

      if (
        onlineChannel
      ) {

        supabase.removeChannel(
          onlineChannel
        );

      }

    };

  }, [params.id]);

  // Scroll Bottom

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // Typing

  const handleTyping = async (
    value: string
  ) => {

    setMessage(value);

    await supabase
      .from("typing_status")
      .upsert({

        chat_id: params.id,

        user_type: "worker",

        is_typing: true,

      });

    if (
      typingTimeout.current
    ) {

      clearTimeout(
        typingTimeout.current
      );

    }

    typingTimeout.current =
      setTimeout(
        async () => {

          await supabase
            .from(
              "typing_status"
            )
            .upsert({

              chat_id:
                params.id,

              user_type:
                "worker",

              is_typing:
                false,

            });

        },

        1500

      );

  };

  // Send Message

  const sendMessage =
    async () => {

      if (
        !message.trim()
      ) return;

      const {
        data: { user },
      } =
        await supabase.auth.getUser();

      if (!user) {

        toast.error(
          "يجب تسجيل الدخول"
        );

        return;

      }

      const newMessage = {

        chat_id:
          params.id,

        sender:
          "worker",

        sender_id:
          user.id,

        message:
          message.trim(),

        is_read: false,

      };

      // Optimistic Update

      setMessages(
        (prev) => [
          ...prev,
          newMessage,
        ]
      );

      setMessage("");

      // Stop Typing

      await supabase
        .from(
          "typing_status"
        )
        .upsert({

          chat_id:
            params.id,

          user_type:
            "worker",

          is_typing:
            false,

        });

      // Insert

      const { error } =
        await supabase
          .from("messages")
          .insert([
            newMessage,
          ]);

      if (error) {

        console.error(
          "MESSAGE ERROR:",
          error
        );

        toast.error(
          "فشل إرسال الرسالة"
        );

      }

    };

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        flex
        flex-col
        pb-[120px]
      "
      dir="rtl"
    >

      {/* Header */}

      <div
        className="
          bg-white
          px-6
          py-5
          shadow-sm
          sticky
          top-0
          z-20
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h1
              className="
                text-2xl
                font-extrabold
                text-slate-900
              "
            >

              المحادثة

            </h1>

            <div
              className="
                mt-2
                flex
                items-center
                gap-3
              "
            >

              {onlineStatus?.is_online ? (

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-green-600
                    font-bold
                  "
                >

                  <div
                    className="
                      w-3
                      h-3
                      rounded-full
                      bg-green-500
                      animate-pulse
                    "
                  ></div>

                  متصل الآن

                </div>

              ) : (

                <div
                  className="
                    text-slate-500
                    text-sm
                  "
                >

                  غير متصل

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

      {/* Messages */}

      <div
        className="
          flex-1
          overflow-y-auto
          p-5
          space-y-4
        "
      >

        {loading && (

          <div
            className="
              text-center
              text-slate-500
            "
          >

            جاري التحميل...

          </div>

        )}

        {messages.map(
          (
            msg,
            index
          ) => (

            <div
              key={index}
              className={`
                flex
                ${
                  msg.sender ===
                  "worker"
                    ? "justify-start"
                    : "justify-end"
                }
              `}
            >

              <div
                className={`
                  max-w-[80%]
                  px-5
                  py-4
                  rounded-[28px]
                  text-base
                  leading-7
                  shadow-sm
                  ${
                    msg.sender ===
                    "worker"
                      ? "bg-primary text-white rounded-br-md"
                      : "bg-white text-slate-800 rounded-bl-md"
                  }
                `}
              >

                {msg.message}

              </div>

            </div>

          )
        )}

        {typingUser && (

          <div
            className="
              flex
              justify-end
            "
          >

            <div
              className="
                bg-white
                px-5
                py-3
                rounded-3xl
                text-slate-500
                shadow-sm
                animate-pulse
              "
            >

              العميل يكتب الآن...

            </div>

          </div>

        )}

        <div ref={bottomRef}></div>

      </div>

      {/* Input */}

      <div
        className="
          fixed
          bottom-[85px]
          left-0
          right-0
          bg-white
          border-t
          border-slate-200
          p-4
          z-30
        "
      >

        <div
          className="
            max-w-4xl
            mx-auto
            flex
            items-center
            gap-3
          "
        >

          <input

            type="text"

            value={message}

            onChange={(e) =>
              handleTyping(
                e.target.value
              )
            }

            placeholder="اكتب رسالتك..."

            className="
              flex-1
              bg-slate-100
              rounded-3xl
              px-5
              py-4
              outline-none
              text-base
              focus:ring-4
              focus:ring-primary/10
            "

          />

          <button

            onClick={
              sendMessage
            }

            className="
              bg-primary
              text-white
              px-7
              py-4
              rounded-3xl
              font-bold
              shadow-lg
              hover:scale-105
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