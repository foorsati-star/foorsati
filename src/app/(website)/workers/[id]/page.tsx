"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {

  MapPin,

  Mail,

  Phone,

  BadgeCheck,

  MessageCircle,

  Briefcase,

  Sparkles,

  ShieldCheck,

  Clock3,

  Star,

} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function WorkerProfile({
  params,
}: {
  params: { id: string };
}) {

  const router = useRouter();

  const [worker, setWorker] =
    useState<any>(null);

  const [chatLoading, setChatLoading] =
    useState(false);

  // Load Worker

  useEffect(() => {

    const getWorker = async () => {

      const {
        data,
        error,
      } = await supabase
        .from("workers")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {

        console.log(error);

      } else {

        setWorker(data);

      }

    };

    getWorker();

  }, [params.id]);

  // Open Chat

  const handleChat = async () => {

  try {

    if (!worker) return;

    setChatLoading(true);

    // المستخدم الحالي

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // إذا غير مسجل دخول

    if (!user) {

      router.push("/login");

      return;

    }

    // البحث عن محادثة موجودة

    const {
      data: existingChat,
      error: existingError,
    } = await supabase

      .from("chats")

      .select("*")

      .eq("client_id", user.id)

      .eq("worker_id", worker.id)

      .maybeSingle();

    // إذا المحادثة موجودة

    if (existingChat) {

      router.push(
        `/chat/${existingChat.id}`
      );

      return;

    }

    // إنشاء محادثة جديدة

    const {
      data: newChat,
      error: createError,
    } = await supabase

      .from("chats")

      .insert([

        {

          client_id: user.id,

          worker_id: worker.id,

        },

      ])

      .select()

      .single();

    // خطأ

    if (createError) {

      console.error(createError);

      alert(
        "فشل إنشاء المحادثة"
      );

      return;

    }

    // فتح المحادثة

    router.push(
      `/chat/${newChat.id}`
    );

  } catch (error) {

    console.error(error);

    alert(
      "حدث خطأ أثناء فتح المحادثة"
    );

  } finally {

    setChatLoading(false);

  }

};

    
  // Loading

  if (!worker) {

    return (

      <div
        className="
          min-h-screen
          bg-slate-100
          flex
          items-center
          justify-center
          px-4
        "
        dir="rtl"
      >

        <div
          className="
            bg-white
            rounded-[35px]
            p-10
            shadow-card
            text-center
            animate-pulse
          "
        >

          <div
            className="
              w-24
              h-24
              rounded-full
              bg-slate-200
              mx-auto
            "
          ></div>

          <div
            className="
              h-6
              w-52
              bg-slate-200
              rounded-xl
              mx-auto
              mt-6
            "
          ></div>

          <div
            className="
              h-4
              w-32
              bg-slate-100
              rounded-xl
              mx-auto
              mt-4
            "
          ></div>

        </div>

      </div>

    );

  }

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        pb-20
      "
      dir="rtl"
    >

      {/* Hero */}

      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-br
          from-primary
          to-emerald-700
          px-5
          pt-10
          pb-28
        "
      >

        {/* Glow */}

        <div
          className="
            absolute
            w-[350px]
            h-[350px]
            rounded-full
            bg-white/10
            blur-3xl
            -top-24
            -left-24
          "
        ></div>

        <div
          className="
            relative
            max-w-6xl
            mx-auto
          "
        >

          {/* Top */}

          <div
            className="
              flex
              flex-col
              md:flex-row
              items-center
              justify-between
              gap-8
            "
          >

            {/* Info */}

            <div
              className="
                flex
                flex-col
                md:flex-row
                items-center
                gap-6
                text-center
                md:text-right
              "
            >

              {/* Avatar */}

              <div
                className="
                  relative
                "
              >

                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                  className="
                    w-36
                    h-36
                    md:w-44
                    md:h-44
                    rounded-full
                    object-cover
                    border-[6px]
                    border-white
                    shadow-2xl
                  "
                />

                {/* Online */}

                <div
                  className="
                    absolute
                    bottom-3
                    left-3
                    w-6
                    h-6
                    rounded-full
                    bg-green-500
                    border-4
                    border-white
                  "
                ></div>

              </div>

              {/* Text */}

              <div>

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    md:justify-start
                    gap-3
                    flex-wrap
                  "
                >

                  <h1
                    className="
                      text-4xl
                      md:text-5xl
                      font-black
                      text-white
                    "
                  >

                    {worker.first_name}

                    {" "}

                    {worker.last_name}

                  </h1>

                  <div
                    className="
                      bg-white/15
                      backdrop-blur-xl
                      text-white
                      px-4
                      py-2
                      rounded-full
                      flex
                      items-center
                      gap-2
                      font-bold
                    "
                  >

                    <BadgeCheck
                      className="
                        w-5
                        h-5
                      "
                    />

                    موثق

                  </div>

                </div>

                <p
                  className="
                    text-white/80
                    text-xl
                    mt-4
                  "
                >

                  {worker.service}

                </p>

                {/* Stats */}

                <div
                  className="
                    mt-6
                    flex
                    flex-wrap
                    items-center
                    justify-center
                    md:justify-start
                    gap-4
                  "
                >

                  <div
                    className="
                      bg-white/10
                      backdrop-blur-xl
                      px-5
                      py-3
                      rounded-2xl
                      text-white
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <Star
                      className="
                        w-5
                        h-5
                      "
                    />

                    <span
                      className="
                        font-bold
                      "
                    >

                      4.9 تقييم

                    </span>

                  </div>

                  <div
                    className="
                      bg-white/10
                      backdrop-blur-xl
                      px-5
                      py-3
                      rounded-2xl
                      text-white
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <Clock3
                      className="
                        w-5
                        h-5
                      "
                    />

                    <span
                      className="
                        font-bold
                      "
                    >

                      سريع الاستجابة

                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* CTA */}

            <div
              className="
                flex
                flex-col
                gap-4
                w-full
                md:w-auto
              "
            >

              <button
                onClick={handleChat}
                disabled={chatLoading}
                className="
                  bg-white
                  text-primary
                  px-10
                  py-5
                  rounded-3xl
                  text-lg
                  font-black
                  shadow-2xl
                  hover:scale-105
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >

                <MessageCircle
                  className="
                    w-6
                    h-6
                  "
                />

                {
                  chatLoading
                    ? "جاري فتح المحادثة..."
                    : "إرسال رسالة"
                }

              </button>

              <Link
                href={`/request/${worker.id}`}
                className="
                  bg-black/15
                  backdrop-blur-xl
                  border
                  border-white/20
                  text-white
                  px-10
                  py-5
                  rounded-3xl
                  text-lg
                  font-black
                  hover:bg-black/25
                  transition-all
                  duration-300
                  text-center
                "
              >

                طلب خدمة

              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* Content */}

      <div
        className="
          relative
          z-10
          max-w-6xl
          mx-auto
          px-4
          -mt-16
        "
      >

        {/* Info Cards */}

        <div
          className="
            grid
            md:grid-cols-3
            gap-5
          "
        >

          {/* Phone */}

          <div
            className="
              bg-white
              rounded-[30px]
              p-6
              shadow-card
              flex
              items-center
              gap-5
            "
          >

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-primary/10
                text-primary
                flex
                items-center
                justify-center
              "
            >

              <Phone
                className="
                  w-6
                  h-6
                "
              />

            </div>

            <div>

              <p
                className="
                  text-slate-500
                "
              >

                رقم الهاتف

              </p>

              <h2
                className="
                  font-black
                  text-xl
                  mt-1
                "
              >

                {worker.phone}

              </h2>

            </div>

          </div>

          {/* Location */}

          <div
            className="
              bg-white
              rounded-[30px]
              p-6
              shadow-card
              flex
              items-center
              gap-5
            "
          >

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-primary/10
                text-primary
                flex
                items-center
                justify-center
              "
            >

              <MapPin
                className="
                  w-6
                  h-6
                "
              />

            </div>

            <div>

              <p
                className="
                  text-slate-500
                "
              >

                المنطقة

              </p>

              <h2
                className="
                  font-black
                  text-xl
                  mt-1
                "
              >

                {worker.location}

              </h2>

            </div>

          </div>

          {/* Email */}

          <div
            className="
              bg-white
              rounded-[30px]
              p-6
              shadow-card
              flex
              items-center
              gap-5
            "
          >

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-primary/10
                text-primary
                flex
                items-center
                justify-center
              "
            >

              <Mail
                className="
                  w-6
                  h-6
                "
              />

            </div>

            <div
              className="
                min-w-0
              "
            >

              <p
                className="
                  text-slate-500
                "
              >

                البريد الإلكتروني

              </p>

              <h2
                className="
                  font-bold
                  text-sm
                  mt-1
                  break-all
                "
              >

                {worker.email}

              </h2>

            </div>

          </div>

        </div>

        {/* About */}

        <div
          className="
            mt-8
            bg-white
            rounded-[35px]
            p-7
            md:p-10
            shadow-card
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
              mb-8
            "
          >

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-primary/10
                text-primary
                flex
                items-center
                justify-center
              "
            >

              <Sparkles
                className="
                  w-7
                  h-7
                "
              />

            </div>

            <div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-slate-900
                "
              >

                نبذة عن الحرفي

              </h2>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >

                معلومات مختصرة عن الخبرة والخدمات

              </p>

            </div>

          </div>

          <div
            className="
              bg-slate-50
              rounded-[30px]
              p-7
              leading-9
              text-slate-700
              text-lg
            "
          >

            حرفي محترف متخصص في مجال

            {" "}

            <span
              className="
                font-black
                text-primary
              "
            >

              {worker.service}

            </span>

            {" "}

            ويقدم خدمات احترافية
            وعالية الجودة داخل منطقة

            {" "}

            <span
              className="
                font-black
                text-primary
              "
            >

              {worker.location}

            </span>

            {" "}

            مع اهتمام كبير بالدقة
            والالتزام وجودة التنفيذ.

          </div>

        </div>

        {/* Services */}

        <div
          className="
            mt-8
            bg-white
            rounded-[35px]
            p-7
            md:p-10
            shadow-card
          "
        >

          <div
            className="
              flex
              items-center
              gap-4
              mb-8
            "
          >

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-primary/10
                text-primary
                flex
                items-center
                justify-center
              "
            >

              <Briefcase
                className="
                  w-7
                  h-7
                "
              />

            </div>

            <div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-slate-900
                "
              >

                الخدمات

              </h2>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >

                الخدمات التي يقدمها الحرفي

              </p>

            </div>

          </div>

          <div
            className="
              grid
              md:grid-cols-2
              gap-5
            "
          >

            {[

              worker.service,

              "صيانة وإصلاح",

              "تركيب وتجهيز",

              "خدمة سريعة",

            ].map((service, index) => (

              <div
                key={index}
                className="
                  bg-slate-50
                  rounded-[28px]
                  p-6
                  text-lg
                  font-bold
                  text-slate-700
                  flex
                  items-center
                  gap-4
                  hover:bg-primary
                  hover:text-white
                  transition-all
                  duration-300
                "
              >

                <ShieldCheck
                  className="
                    w-6
                    h-6
                  "
                />

                {service}

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}