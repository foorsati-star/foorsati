"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

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

      // Current User

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Online

      await supabase
        .from("online_status")
        .upsert({

          user_id: user.id,

          user_type: "worker",

          is_online: true,

          last_seen: new Date(),

        });

      // Messages

      const {
        data,
        error,
      } = await supabase
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

      // Seen

      await supabase
        .from("messages")
        .update({
          is_read: true,
        })
        .eq("chat_id", params.id)
        .neq("sender", "worker");

      // Online Status

      const {
        data: statusData,
      } = await supabase
        .from("online_status")
        .select("*")
        .eq("user_type", "client")
        .single();

      setOnlineStatus(statusData);

      // Messages Realtime

      messagesChannel = supabase.channel(
        `chat-${params.id}`
      );

      messagesChannel.on(

        "postgres_changes",

        {
          event: "INSERT",

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
            updatedMessages || []
          );

        }

      );

      // Typing Realtime

      typingChannel = supabase.channel(
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

            typingData?.is_typing
              || false

          );

        }

      );

      // Online Realtime

      onlineChannel = supabase.channel(
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

      // Subscribe مرة واحدة فقط

      await messagesChannel.subscribe();

      await typingChannel.subscribe();

      await onlineChannel.subscribe();

      // قبل إغلاق الصفحة

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

  // Scroll

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

    if (typingTimeout.current) {

      clearTimeout(
        typingTimeout.current
      );

    }

    typingTimeout.current =
      setTimeout(async () => {

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

      }, 1500);

  };

  // Send Message

  const sendMessage = async () => {

    if (!message.trim()) return;

    const newMessage = {

      chat_id: params.id,

      sender: "worker",

      message,

      is_read: false,

    };

    setMessage("");

    await supabase
      .from("typing_status")
      .upsert({

        chat_id: params.id,

        user_type: "worker",

        is_typing: false,

      });

    const { error } =
      await supabase
        .from("messages")
        .insert([
          newMessage,
        ]);

    if (error) {

      console.log(error);

    }

  };

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        flex
        flex-col
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
          flex
          items-center
          justify-between
        "
      >

        <div>

          <h1
            className="
              text-3xl
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

                آخر ظهور:

                {" "}

                {
                  onlineStatus?.last_seen
                    ? new Date(
                        onlineStatus.last_seen
                      ).toLocaleString("ar")
                    : "غير معروف"
                }

              </div>

            )}

          </div>

        </div>

      </div>

      {/* Messages */}

      <div
        className="
          flex-1
          overflow-y-auto
          p-6
          space-y-4
        "
      >

        {messages.map(
          (msg, index) => (

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
                  max-w-[75%]
                  px-5
                  py-4
                  rounded-[28px]
                  text-lg
                  shadow-sm
                  leading-8
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
          bg-white
          border-t
          border-slate-200
          p-5
        "
      >

        <div
          className="
            max-w-4xl
            mx-auto
            flex
            items-center
            gap-4
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
              shadow-[0_0_25px_rgba(16,185,129,0.35)]
              hover:scale-105
              hover:shadow-[0_0_45px_rgba(16,185,129,0.6)]
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