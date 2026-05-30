"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

export default function ArtisanChatsPage() {

  const [chats, setChats] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [newMessage, setNewMessage] =
    useState(0);

  useEffect(() => {

    let messagesChannel: any;

    const getChats = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // جلب الحرفي

      const { data: worker } =
        await supabase
          .from("workers")
          .select("*")
          .eq("user_id", user.id)
          .single();

      if (!worker) return;

      // جلب المحادثات

      const {
        data: chatsData,
        error,
      } = await supabase
        .from("chats")
        .select("*")
        .eq("worker_id", worker.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {

        console.log(error);

      }

      // جلب آخر رسالة لكل محادثة

      const chatsWithMessages =
        await Promise.all(

          (chatsData || []).map(
            async (chat) => {
const {
  data: messages,
} = await supabase
  .from("messages")
  .select("*")
  .eq("chat_id", chat.id)
  .order("created_at", {
    ascending: false,
  });

const unreadCount =
  messages?.filter(
    (msg) =>
      msg.sender === "client" &&
      !msg.is_read
  ).length || 0;

              return {

                ...chat,

                lastMessage:
                  messages?.[0],

                unreadCount,

              };

            }
          )

        );

      setChats(chatsWithMessages);

      setLoading(false);

      // Realtime Messages

      messagesChannel = supabase
        .channel(
          `artisan-chats-${worker.id}`
        )
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
          },
          async () => {

            // إعادة تحميل المحادثات

            const {
              data: refreshedChats,
            } = await supabase
              .from("chats")
              .select("*")
              .eq("worker_id", worker.id)
              .order("created_at", {
                ascending: false,
              });

            const updatedChats =
              await Promise.all(

                (refreshedChats || []).map(
                  async (chat) => {

                    const {
                      data: messages,
                    } = await supabase
                      .from("messages")
                      .select("*")
                      .eq(
                        "chat_id",
                        chat.id
                      )
                      .order(
                        "created_at",
                        {
                          ascending: false,
                        }
                      )
                      .limit(1);

                    const unreadCount =
                      messages?.filter(
                        (msg) =>
                          msg.sender !==
                          "worker"
                      ).length || 0;

                    return {

                      ...chat,

                      lastMessage:
                        messages?.[0],

                      unreadCount,

                    };

                  }
                )

              );

            setChats(updatedChats);

            // Glow

            setNewMessage(true);

            setTimeout(() => {

              setNewMessage(false);

            }, 3000);

          }
        )
        .subscribe();

    };

    getChats();

    // Cleanup

    return () => {

      if (messagesChannel) {

        supabase.removeChannel(
          messagesChannel
        );

      }

    };

  }, []);

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        p-6
      "
      dir="rtl"
    >

      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="
          mb-8
          flex
          items-center
          justify-between
          gap-4
        ">

          <div>

            <h1 className="
              text-4xl
              font-extrabold
              text-slate-900
            ">
              المحادثات
            </h1>

            <p className="
              text-slate-500
              mt-3
              text-lg
            ">
              جميع محادثاتك مع العملاء
            </p>

          </div>

          {/* Badge */}

          <div
            className={`
              relative
              px-6
              py-4
              rounded-3xl
              font-bold
              text-white
              shadow-xl
              transition-all
              duration-300
              ${
                newMessage
                  ? "bg-red-500 shadow-[0_0_40px_rgba(239,68,68,0.8)]"
                  : "bg-primary"
              }
            `}
          >

            الرسائل

            <div className="
              absolute
              -top-2
              -left-2
              bg-white
              text-primary
              w-8
              h-8
              rounded-full
              flex
              items-center
              justify-center
              text-sm
              font-extrabold
              shadow-lg
            ">

              {
                chats.reduce(
                  (
                    total,
                    chat
                  ) =>

                    total +
                    (
                      chat.unreadCount
                      || 0
                    ),

                  0
                )
              }

            </div>

          </div>

        </div>

        {/* Loading */}

        {loading && (

          <div className="
            text-center
            text-slate-500
            text-lg
          ">

            جاري تحميل المحادثات...

          </div>

        )}

        {/* Empty */}

        {!loading &&
          chats.length === 0 && (

          <div className="
            bg-white
            rounded-[40px]
            p-14
            text-center
            shadow-sm
          ">

            <h2 className="
              text-3xl
              font-bold
              text-slate-800
            ">
              لا توجد محادثات بعد
            </h2>

            <p className="
              text-slate-500
              mt-4
              text-lg
            ">
              عندما يراسلك العملاء
              ستظهر المحادثات هنا
            </p>

          </div>

        )}

        {/* Chats */}

        <div className="space-y-4">

          {chats.map((chat) => (

            <Link
              key={chat.id}
              href={`/chat/${chat.id}`}
              className={`
                relative
                block
                bg-white
                rounded-[30px]
                p-6
                shadow-sm
                hover:shadow-xl
                hover:scale-[1.01]
                transition-all
                duration-300
                ${
                  chat.unreadCount > 0
                    ? "border-2 border-primary/20"
                    : ""
                }
              `}
            >

              {/* Unread Badge */}

              {chat.unreadCount > 0 && (

                <div className="
                  absolute
                  top-5
                  left-5
                  bg-red-500
                  text-white
                  w-8
                  h-8
                  rounded-full
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-bold
                  shadow-lg
                  animate-pulse
                ">

                  {chat.unreadCount}

                </div>

              )}

              <div className="
                flex
                items-center
                gap-5
              ">

                {/* Avatar */}

                <div className="
                  w-16
                  h-16
                  rounded-full
                  bg-primary
                  text-white
                  flex
                  items-center
                  justify-center
                  text-2xl
                  font-bold
                  shadow-lg
                ">

                  ع

                </div>

                {/* Content */}

                <div className="flex-1">

                  <div className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  ">

                    <h2 className="
                      text-2xl
                      font-bold
                      text-slate-900
                    ">

                      عميل جديد

                    </h2>

                    <p className="
                      text-slate-400
                      text-sm
                    ">

                      {
                        chat.lastMessage
                          ?.created_at
                          ? new Date(
                              chat
                                .lastMessage
                                .created_at
                            ).toLocaleDateString(
                              "ar"
                            )
                          : ""
                      }

                    </p>

                  </div>

                  <p className={`
                    mt-3
                    text-lg
                    truncate
                    ${
                      chat.unreadCount > 0
                        ? "text-slate-900 font-bold"
                        : "text-slate-500"
                    }
                  `}>

                    {
                      chat.lastMessage
                        ?.message
                        || "ابدأ المحادثة الآن"
                    }

                  </p>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>

  );

}