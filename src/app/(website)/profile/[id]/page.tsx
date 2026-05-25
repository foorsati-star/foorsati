"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useParams,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  MapPin,
  Briefcase,
  MessageCircle,
  Send,
} from "lucide-react";

export default function ProfilePage() {

  const params = useParams();

  const [profile, setProfile] =
    useState<any>(null);

  const [posts, setPosts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // جلب البيانات

  useEffect(() => {

    const getProfile = async () => {

      // Profile

      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", params.id)
        .single();

      if (profileError) {

        console.log(profileError);

        setLoading(false);

        return;

      }

      setProfile(profileData);

      // Posts

      const {
        data: postsData,
      } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", params.id)
        .order("created_at", {
          ascending: false,
        });

      setPosts(postsData || []);

      setLoading(false);

    };

    getProfile();

  }, [params.id]);

  // Loading

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          bg-slate-100
          flex
          items-center
          justify-center
          text-slate-500
          text-lg
        "
      >

        جاري تحميل الملف الشخصي...

      </div>

    );

  }

  // Not Found

  if (!profile) {

    return (

      <div
        className="
          min-h-screen
          bg-slate-100
          flex
          items-center
          justify-center
          text-center
          px-4
        "
      >

        <div
          className="
            bg-white
            rounded-[35px]
            p-10
            shadow-sm
            max-w-lg
            w-full
          "
        >

          <h1
            className="
              text-3xl
              font-extrabold
              text-slate-900
              mb-4
            "
          >

            الملف الشخصي غير موجود

          </h1>

          <p
            className="
              text-slate-500
              leading-8
            "
          >

            لم نتمكن من العثور
            على هذا المستخدم.

          </p>

        </div>

      </div>

    );

  }

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        py-10
      "
      dir="rtl"
    >

      <div
        className="
          max-w-6xl
          mx-auto
          px-4
        "
      >

        {/* Profile Header */}

        <div
          className="
            bg-white
            rounded-[40px]
            p-8
            shadow-sm
            mb-8
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

            {/* Left */}

            <div
              className="
                flex
                items-center
                gap-6
              "
            >

              {/* Avatar */}

              <div
                className="
                  w-32
                  h-32
                  rounded-full
                  bg-primary
                  text-white
                  flex
                  items-center
                  justify-center
                  text-5xl
                  font-extrabold
                  shadow-xl
                "
              >

                {
                  profile.full_name?.charAt(
                    0
                  ) || "U"
                }

              </div>

              {/* Info */}

              <div>

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-4
                    mb-4
                  "
                >

                  <h1
                    className="
                      text-4xl
                      font-extrabold
                      text-slate-900
                    "
                  >

                    {
                      profile.full_name
                    }

                  </h1>

                  <div
                    className={`
                      px-5
                      py-2
                      rounded-2xl
                      font-bold
                      ${
                        profile.account_type ===
                        "worker"
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-slate-700"
                      }
                    `}
                  >

                    {
                      profile.account_type ===
                      "worker"
                        ? "حرفي"
                        : "عميل"
                    }

                  </div>

                </div>

                {/* Meta */}

                <div
                  className="
                    flex
                    flex-wrap
                    items-center
                    gap-6
                    text-slate-500
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <MapPin className="w-5 h-5" />

                    {profile.city || "غير محدد"}

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                    "
                  >

                    <Briefcase className="w-5 h-5" />

                    {
                      profile.category
                        || "بدون تخصص"
                    }

                  </div>

                </div>

                {/* Bio */}

                <p
                  className="
                    mt-6
                    text-slate-700
                    leading-9
                    max-w-3xl
                    text-lg
                  "
                >

                  {
                    profile.bio
                      || "لا توجد نبذة شخصية بعد."
                  }

                </p>

              </div>

            </div>

            {/* Actions */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-4
              "
            >

              <button
                className="
                  bg-primary
                  text-white
                  px-7
                  py-4
                  rounded-2xl
                  font-bold
                  flex
                  items-center
                  gap-3
                  shadow-lg
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >

                <MessageCircle className="w-5 h-5" />

                مراسلة

              </button>

              <button
                className="
                  bg-slate-100
                  text-slate-700
                  px-7
                  py-4
                  rounded-2xl
                  font-bold
                  flex
                  items-center
                  gap-3
                  hover:bg-slate-200
                  transition-all
                "
              >

                <Send className="w-5 h-5" />

                إرسال طلب

              </button>

            </div>

          </div>

        </div>

        {/* Posts */}

        <div>

          <div
            className="
              flex
              items-center
              justify-between
              mb-6
            "
          >

            <h2
              className="
                text-3xl
                font-extrabold
                text-slate-900
              "
            >

              المنشورات

            </h2>

            <div
              className="
                bg-white
                px-5
                py-2
                rounded-2xl
                font-bold
                text-slate-700
                shadow-sm
              "
            >

              {posts.length} منشور

            </div>

          </div>

          {/* Empty */}

          {posts.length === 0 && (

            <div
              className="
                bg-white
                rounded-[35px]
                p-14
                text-center
                shadow-sm
              "
            >

              <h3
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                "
              >

                لا توجد منشورات بعد

              </h3>

              <p
                className="
                  text-slate-500
                  mt-4
                  text-lg
                "
              >

                هذا المستخدم لم ينشر
                أي منشورات حتى الآن.

              </p>

            </div>

          )}

          {/* Posts List */}

          <div className="space-y-6">

            {posts.map((post) => (

              <div
                key={post.id}
                className="
                  bg-white
                  rounded-[35px]
                  p-7
                  shadow-sm
                  hover:shadow-xl
                  transition-all
                  duration-300
                "
              >

                {/* Top */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-4
                  "
                >

                  <div>

                    <h3
                      className="
                        text-2xl
                        font-bold
                        text-slate-900
                        mb-4
                      "
                    >

                      {post.title}

                    </h3>

                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-5
                        text-slate-500
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <MapPin className="w-4 h-4" />

                        {post.location}

                      </div>

                      <div>

                        {
                          new Date(
                            post.created_at
                          ).toLocaleDateString(
                            "ar"
                          )
                        }

                      </div>

                    </div>

                  </div>

                  {/* Category */}

                  <div
                    className="
                      bg-primary/10
                      text-primary
                      px-5
                      py-2
                      rounded-2xl
                      font-bold
                    "
                  >

                    {post.category}

                  </div>

                </div>

                {/* Description */}

                <p
                  className="
                    mt-6
                    text-lg
                    leading-9
                    text-slate-700
                  "
                >

                  {post.description}

                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}