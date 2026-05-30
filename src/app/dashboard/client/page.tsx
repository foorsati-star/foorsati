"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {

  Briefcase,

  MessageCircle,

  Heart,

  Settings,

  LogOut,

  Clock3,

  CheckCircle2,

  Sparkles,

  UserCircle2,

  ShieldCheck,

  Star,

  ArrowLeft,

} from "lucide-react";

export default function ClientDashboard() {

  const [profile, setProfile] =
    useState<any>(null);

  useEffect(() => {

    const loadProfile = async () => {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const {
        data,
        error,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error) {

        setProfile(data);

      }

    };

    loadProfile();

  }, []);

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        pb-24
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
            max-w-7xl
            mx-auto
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              items-start
              lg:items-center
              justify-between
              gap-8
            "
          >

            {/* User */}

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

                <div
                  className="
                    w-36
                    h-36
                    rounded-full
                    bg-white
                    text-primary
                    flex
                    items-center
                    justify-center
                    text-5xl
                    font-black
                    border-[6px]
                    border-white
                    shadow-2xl
                  "
                >

                  م

                </div>

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

              {/* Info */}

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
  {profile?.full_name}
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

                    <ShieldCheck
                      className="
                        w-5
                        h-5
                      "
                    />

                    عميل موثق

                  </div>

                </div>

                <p
                  className="
                    text-white/80
                    text-xl
                    mt-4
                  "
                >

                  عميل داخل منصة فرصتي

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

                    <CheckCircle2
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

                      18 طلب مكتمل

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

                      تقييم ممتاز

                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* Actions */}

            <div
              className="
                flex
                flex-col
                gap-4
                w-full
                lg:w-auto
              "
            >
<Link
  href="/dashboard/client/chats"
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

  الرسائل

</Link>

              <button
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
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >

                <Settings
                  className="
                    w-6
                    h-6
                  "
                />

                الإعدادات

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Content */}

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-4
          -mt-16
        "
      >

        {/* Stats */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-5
          "
        >

          {/* Active Orders */}

          <div
            className="
              bg-white
              rounded-[30px]
              p-7
              shadow-card
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
                mb-5
              "
            >

              <Briefcase
                className="
                  w-7
                  h-7
                "
              />

            </div>

            <p
              className="
                text-slate-500
              "
            >

              الطلبات النشطة

            </p>

            <h2
              className="
                text-5xl
                font-black
                text-slate-900
                mt-3
              "
            >

              4

            </h2>

          </div>

          {/* Messages */}

          <div
            className="
              bg-white
              rounded-[30px]
              p-7
              shadow-card
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
                mb-5
              "
            >

              <MessageCircle
                className="
                  w-7
                  h-7
                "
              />

            </div>

            <p
              className="
                text-slate-500
              "
            >

              الرسائل الجديدة

            </p>

            <h2
              className="
                text-5xl
                font-black
                text-slate-900
                mt-3
              "
            >

              12

            </h2>

          </div>

          {/* Saved */}

          <div
            className="
              bg-white
              rounded-[30px]
              p-7
              shadow-card
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
                mb-5
              "
            >

              <Heart
                className="
                  w-7
                  h-7
                "
              />

            </div>

            <p
              className="
                text-slate-500
              "
            >

              الحرفيون المحفوظون

            </p>

            <h2
              className="
                text-5xl
                font-black
                text-slate-900
                mt-3
              "
            >

              7

            </h2>

          </div>

          {/* Completed */}

          <div
            className="
              bg-white
              rounded-[30px]
              p-7
              shadow-card
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
                mb-5
              "
            >

              <CheckCircle2
                className="
                  w-7
                  h-7
                "
              />

            </div>

            <p
              className="
                text-slate-500
              "
            >

              الطلبات المكتملة

            </p>

            <h2
              className="
                text-5xl
                font-black
                text-slate-900
                mt-3
              "
            >

              18

            </h2>

          </div>

        </div>

        {/* Recent Orders */}

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
              justify-between
              gap-4
              mb-8
            "
          >

            <div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-slate-900
                "
              >

                آخر الطلبات

              </h2>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >

                متابعة أحدث الطلبات الخاصة بك

              </p>

            </div>

            <button
              className="
                text-primary
                font-bold
                flex
                items-center
                gap-2
              "
            >

              عرض الكل

              <ArrowLeft
                className="
                  w-4
                  h-4
                "
              />

            </button>

          </div>

          <div className="space-y-5">

            {[

              {
                title:
                  "صيانة كهربائية منزلية",

                time:
                  "منذ ساعتين",

                status:
                  "قيد التنفيذ",

                color:
                  "bg-amber-100 text-amber-700",

              },

              {
                title:
                  "تركيب إنارة حديثة",

                time:
                  "أمس",

                status:
                  "مكتمل",

                color:
                  "bg-green-100 text-green-700",

              },

            ].map((order, index) => (

              <div
                key={index}
                className="
                  border
                  border-slate-100
                  rounded-[28px]
                  p-6
                  hover:shadow-soft
                  transition-all
                  duration-300
                  flex
                  flex-col
                  md:flex-row
                  items-start
                  md:items-center
                  justify-between
                  gap-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-5
                  "
                >

                  <div
                    className="
                      w-16
                      h-16
                      rounded-3xl
                      bg-primary/10
                      text-primary
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Sparkles
                      className="
                        w-8
                        h-8
                      "
                    />

                  </div>

                  <div>

                    <h3
                      className="
                        font-black
                        text-xl
                        text-slate-900
                      "
                    >

                      {order.title}

                    </h3>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-slate-500
                        mt-2
                      "
                    >

                      <Clock3
                        className="
                          w-4
                          h-4
                        "
                      />

                      {order.time}

                    </div>

                  </div>

                </div>

                <span
                  className={`
                    px-5
                    py-3
                    rounded-2xl
                    font-bold
                    text-sm
                    ${order.color}
                  `}
                >

                  {order.status}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Saved Workers */}

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
              justify-between
              gap-4
              mb-8
            "
          >

            <div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-slate-900
                "
              >

                الحرفيون المحفوظون

              </h2>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >

                الحرفيون الذين قمت بحفظهم

              </p>

            </div>

            <button
              className="
                text-primary
                font-bold
                flex
                items-center
                gap-2
              "
            >

              عرض الكل

              <ArrowLeft
                className="
                  w-4
                  h-4
                "
              />

            </button>

          </div>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
          >

            {[1,2,3].map((worker) => (

              <div
                key={worker}
                className="
                  border
                  border-slate-100
                  rounded-[32px]
                  p-6
                  hover:shadow-soft
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-5
                    mb-6
                  "
                >

                  <div
                    className="
                      w-20
                      h-20
                      rounded-3xl
                      bg-slate-200
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <UserCircle2
                      className="
                        w-12
                        h-12
                        text-slate-500
                      "
                    />

                  </div>

                  <div>

                    <h3
                      className="
                        font-black
                        text-xl
                        text-slate-900
                      "
                    >

                      أحمد بن علي

                    </h3>

                    <p
                      className="
                        text-slate-500
                        mt-1
                      "
                    >

                      كهربائي

                    </p>

                  </div>

                </div>

                <Link
                  href="/workers/1"
                  className="
                    w-full
                    py-4
                    rounded-2xl
                    bg-primary
                    text-white
                    font-black
                    hover:opacity-90
                    transition-all
                    flex
                    items-center
                    justify-center
                    gap-3
                  "
                >

                  عرض الملف

                </Link>

              </div>

            ))}

          </div>

        </div>

        {/* Logout */}

        <div
          className="
            mt-8
          "
        >

          <button
            className="
              w-full
              bg-red-50
              text-red-600
              rounded-[30px]
              py-5
              font-black
              text-lg
              hover:bg-red-100
              transition-all
              duration-300
              flex
              items-center
              justify-center
              gap-3
            "
          >

            <LogOut
              className="
                w-6
                h-6
              "
            />

            تسجيل الخروج

          </button>

        </div>

      </div>

    </div>

  );

}