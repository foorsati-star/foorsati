"use client";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

import toast from "react-hot-toast";

import {
  MapPin,
  Clock3,
  Plus,
  Send,
  Briefcase,
  Sparkles,
} from "lucide-react";

export default function FeedPage() {

  const [posts, setPosts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [creating, setCreating] =
    useState(false);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [category, setCategory] =
    useState("");

  // Load Data

  useEffect(() => {

    let postsChannel: any;

    const getPosts = async () => {

      const {
        data,
        error,
      } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {

        console.log(error);

        toast.error(
          "فشل تحميل المنشورات"
        );

      } else {

        setPosts(data || []);

      }

      setLoading(false);

      // Realtime

      postsChannel =
        supabase.channel(
          "posts-feed"
        );

      postsChannel.on(

        "postgres_changes",

        {
          event: "INSERT",

          schema: "public",

          table: "posts",

        },

        (payload: any) => {

          setPosts((prev) => [

            payload.new,

            ...prev,

          ]);

          toast.success(
            "تم نشر منشور جديد"
          );

        }

      );

      postsChannel.subscribe();

    };

    getPosts();

    return () => {

      if (postsChannel) {

        supabase.removeChannel(
          postsChannel
        );

      }

    };

  }, []);

  // Create Post

  const createPost = async () => {

    if (
      !title ||
      !description ||
      !location ||
      !category
    ) {

      toast.error(
        "يرجى ملء جميع الحقول"
      );

      return;

    }

    setCreating(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      setCreating(false);

      toast.error(
        "يجب تسجيل الدخول أولاً"
      );

      return;

    }

    const newPost = {

      user_id: user.id,

      user_type: "client",

      title,

      description,

      location,

      category,

    };

    const { error } =
      await supabase
        .from("posts")
        .insert([newPost]);

    setCreating(false);

    if (error) {

      console.log(error);

      toast.error(
        "فشل إنشاء المنشور"
      );

      return;

    }

    setTitle("");

    setDescription("");

    setLocation("");

    setCategory("");

    setShowModal(false);

    toast.success(
      "تم نشر المنشور بنجاح"
    );

  };

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        py-8
        md:py-10
      "
      dir="rtl"
    >

      <div
        className="
          max-w-5xl
          mx-auto
          px-4
        "
      >

        {/* Hero */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[40px]
            bg-gradient-to-br
            from-primary
            to-emerald-700
            p-8
            md:p-10
            text-white
            shadow-floating
            mb-8
          "
        >

          <div
            className="
              absolute
              w-72
              h-72
              rounded-full
              bg-white/10
              blur-3xl
              -top-20
              -left-20
            "
          ></div>

          <div
            className="
              relative
              z-10
              flex
              flex-col
              md:flex-row
              items-start
              md:items-center
              justify-between
              gap-6
            "
          >

            <div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    w-14
                    h-14
                    rounded-3xl
                    bg-white/15
                    flex
                    items-center
                    justify-center
                    backdrop-blur-xl
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

                  <h1
                    className="
                      text-4xl
                      md:text-5xl
                      font-black
                    "
                  >

                    الفرص والمنشورات

                  </h1>

                  <p
                    className="
                      mt-3
                      text-white/80
                      text-lg
                    "
                  >

                    استكشف أحدث الفرص
                    وتواصل مع العملاء
                    والحرفيين داخل المنصة

                  </p>

                </div>

              </div>

            </div>

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="
                bg-white
                text-primary
                px-7
                py-4
                rounded-3xl
                font-black
                text-lg
                flex
                items-center
                gap-3
                shadow-2xl
                hover:scale-105
                transition-all
                duration-300
                press-effect
              "
            >

              <Plus className="w-6 h-6" />

              إنشاء منشور

            </button>

          </div>

        </div>

        {/* Loading */}

        {loading && (

          <div
            className="
              grid
              gap-6
            "
          >

            {[1,2,3].map((item) => (

              <div
                key={item}
                className="
                  bg-white
                  rounded-[35px]
                  p-7
                  animate-pulse
                "
              >

                <div
                  className="
                    h-6
                    w-1/2
                    bg-slate-200
                    rounded-xl
                  "
                ></div>

                <div
                  className="
                    mt-5
                    h-4
                    w-full
                    bg-slate-100
                    rounded-xl
                  "
                ></div>

                <div
                  className="
                    mt-3
                    h-4
                    w-2/3
                    bg-slate-100
                    rounded-xl
                  "
                ></div>

              </div>

            ))}

          </div>

        )}

        {/* Empty */}

        {!loading &&
          posts.length === 0 && (

          <div
            className="
              relative
              overflow-hidden
              bg-white
              rounded-[40px]
              p-12
              md:p-20
              text-center
              shadow-card
            "
          >

            <div
              className="
                absolute
                w-72
                h-72
                bg-primary/5
                rounded-full
                blur-3xl
                -top-20
                -right-20
              "
            ></div>

            <div
              className="
                relative
                z-10
              "
            >

              <div
                className="
                  w-28
                  h-28
                  mx-auto
                  rounded-[35px]
                  bg-primary/10
                  flex
                  items-center
                  justify-center
                "
              >

                <Briefcase
                  className="
                    w-14
                    h-14
                    text-primary
                  "
                />

              </div>

              <h2
                className="
                  mt-8
                  text-4xl
                  font-black
                  text-slate-900
                "
              >

                لا توجد منشورات بعد

              </h2>

              <p
                className="
                  text-slate-500
                  mt-5
                  text-lg
                  leading-9
                  max-w-2xl
                  mx-auto
                "
              >

                ابدأ الآن بنشر أول فرصة
                أو مشروع داخل المنصة
                ودع الحرفيين يتواصلون معك.

              </p>

              <button
                onClick={() =>
                  setShowModal(true)
                }
                className="
                  mt-10
                  bg-primary
                  text-white
                  px-8
                  py-4
                  rounded-3xl
                  font-black
                  text-lg
                  shadow-floating
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >

                إنشاء أول منشور

              </button>

            </div>

          </div>

        )}

        {/* Posts */}

        <div className="space-y-6">

          {posts.map((post) => (

            <div
              key={post.id}
              className="
                bg-white
                rounded-[35px]
                p-6
                md:p-8
                shadow-card
                hover:shadow-soft
                transition-all
                duration-300
                fade-in
              "
            >

              {/* Top */}

              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  items-start
                  justify-between
                  gap-5
                "
              >

                <div
                  className="
                    flex
                    items-start
                    gap-4
                  "
                >

                  <div
                    className="
                      w-16
                      h-16
                      rounded-full
                      bg-primary
                      text-white
                      flex
                      items-center
                      justify-center
                      text-2xl
                      font-black
                      shadow-lg
                      shrink-0
                    "
                  >

                    {
                      post.user_type ===
                      "client"
                        ? "ع"
                        : "ح"
                    }

                  </div>

                  <div>

                    <h2
                      className="
                        text-2xl
                        md:text-3xl
                        font-black
                        text-slate-900
                      "
                    >

                      {post.title}

                    </h2>

                    <div
                      className="
                        flex
                        flex-wrap
                        items-center
                        gap-4
                        mt-4
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

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <Clock3 className="w-4 h-4" />

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

                </div>

                <div
                  className="
                    bg-primary/10
                    text-primary
                    px-5
                    py-3
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
                  mt-8
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

      {/* Modal */}

      {showModal && (

        <div
          className="
            fixed
            inset-0
            bg-black/40
            backdrop-blur-md
            z-50
            flex
            items-end
            md:items-center
            justify-center
            p-0
            md:p-4
          "
        >

          <div
            className="
              w-full
              md:max-w-2xl
              bg-white
              rounded-t-[40px]
              md:rounded-[40px]
              p-6
              md:p-8
              shadow-2xl
              animate-fadeUp
            "
          >

            <h2
              className="
                text-3xl
                font-black
                text-slate-900
                mb-8
              "
            >

              إنشاء منشور جديد

            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="عنوان المنشور"
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-slate-100
                  rounded-3xl
                  px-5
                  py-4
                  outline-none
                "
              />

              <textarea
                placeholder="اكتب تفاصيل المنشور..."
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                rows={5}
                className="
                  w-full
                  bg-slate-100
                  rounded-3xl
                  px-5
                  py-4
                  outline-none
                  resize-none
                "
              />

              <input
                type="text"
                placeholder="المنطقة"
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-slate-100
                  rounded-3xl
                  px-5
                  py-4
                  outline-none
                "
              />

              <input
                type="text"
                placeholder="التخصص"
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-slate-100
                  rounded-3xl
                  px-5
                  py-4
                  outline-none
                "
              />

            </div>

            <div
              className="
                mt-8
                flex
                items-center
                justify-end
                gap-4
              "
            >

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="
                  px-6
                  py-3
                  rounded-2xl
                  bg-slate-100
                  font-bold
                  text-slate-700
                "
              >

                إلغاء

              </button>

              <button
                onClick={createPost}
                disabled={creating}
                className="
                  bg-primary
                  text-white
                  px-7
                  py-3
                  rounded-2xl
                  font-black
                  flex
                  items-center
                  gap-2
                  shadow-floating
                  disabled:opacity-60
                "
              >

                <Send className="w-5 h-5" />

                {
                  creating
                    ? "جاري النشر..."
                    : "نشر المنشور"
                }

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}