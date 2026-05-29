"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

export default function ArtisanDashboard() {

  const [worker, setWorker] =
    useState<any>(null);

  const [profile, setProfile] =
    useState<any>(null);

  const [requests, setRequests] =
    useState<any[]>([]);

  const [pendingRequests, setPendingRequests] =
    useState(0);

  const [newNotification, setNewNotification] =
    useState(false);

  const [uploading, setUploading] =
    useState(false);

  // رفع الصورة

  const uploadAvatar = async (
    e: any
  ) => {

    try {

      const file =
        e.target.files?.[0];

      if (!file) return;

      setUploading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        alert(
          "يجب تسجيل الدخول أولاً"
        );

        return;

      }

      // اسم الملف

      const fileExt =
        file.name
          .split(".")
          .pop();

      const fileName =
        `${user.id}-${Date.now()}.${fileExt}`;

      // رفع الصورة

      const {
        error: uploadError,
      } = await supabase.storage
        .from("avatars")
        .upload(
          fileName,
          file,
          {
            upsert: true,
          }
        );

      // Error

      if (uploadError) {

        console.log(
          uploadError
        );

        alert(
          JSON.stringify(
            uploadError
          )
        );

        return;

      }

      // Public URL

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("avatars")
        .getPublicUrl(
          fileName
        );

      const avatarUrl =
        publicUrlData.publicUrl;

      // تحديث الـ profile

      const {
        error: updateError,
      } = await supabase
        .from("profiles")
        .update({

          avatar_url:
            avatarUrl,

        })
        .eq("id", user.id);

      if (updateError) {

        console.log(
          updateError
        );

        alert(
          JSON.stringify(
            updateError
          )
        );

        return;

      }

      // تحديث الواجهة

      setProfile(
        (prev: any) => ({

          ...prev,

          avatar_url:
            avatarUrl,

        })
      );

      alert(
        "تم رفع الصورة بنجاح"
      );

    } catch (err) {

      console.log(err);

      alert(
        JSON.stringify(err)
      );

    } finally {

      setUploading(false);

    }

  };

  // جلب البيانات

  useEffect(() => {

    let requestsChannel: any;

    const getDashboardData =
      async () => {

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        // Worker

        const {
          data: workerData,
          error: workerError,
        } = await supabase
          .from("workers")
          .select("*")
          .eq(
            "user_id",
            user.id
          )
          .single();

        if (workerError) {

          console.log(
            workerError
          );

        } else {

          setWorker(
            workerData
          );

        }

        // Profile

        const {
          data: profileData,
        } = await supabase
          .from("profiles")
          .select("*")
          .eq(
            "id",
            user.id
          )
          .single();

        setProfile(
          profileData
        );

        // Requests

        if (workerData) {

          const {
            data: requestsData,
            error:
              requestsError,
          } = await supabase
            .from("requests")
            .select("*")
            .eq(
              "worker_id",
              workerData.id
            )
            .order(
              "created_at",
              {
                ascending:
                  false,
              }
            );

          if (requestsError) {

            console.log(
              requestsError
            );

          } else {

            setRequests(
              requestsData || []
            );

            setPendingRequests(

              requestsData?.filter(
                (r) =>
                  r.status ===
                  "pending"
              ).length || 0

            );

          }

          // Realtime

          requestsChannel =
            supabase
              .channel(
                `artisan-dashboard-${workerData.id}`
              )
              .on(
                "postgres_changes",
                {
                  event: "*",
                  schema:
                    "public",
                  table:
                    "requests",
                },
                async (
                  payload
                ) => {

                  const newRequest =
                    payload.new as any;

                  if (
                    newRequest?.worker_id ===
                    workerData.id
                  ) {

                    const {
                      data:
                        updatedRequests,
                    } =
                      await supabase
                        .from(
                          "requests"
                        )
                        .select("*")
                        .eq(
                          "worker_id",
                          workerData.id
                        )
                        .order(
                          "created_at",
                          {
                            ascending:
                              false,
                          }
                        );

                    setRequests(
                      updatedRequests || []
                    );

                    setPendingRequests(

                      updatedRequests?.filter(
                        (r) =>
                          r.status ===
                          "pending"
                      ).length || 0

                    );

                    setNewNotification(
                      true
                    );

                 window.setTimeout(() => {

  setNewNotification(
    false
  );

}, 3000);

                  }

                }
              )
              .subscribe();

        }

      };
      

    getDashboardData();

    return () => {

      if (
        requestsChannel
      ) {

        supabase.removeChannel(
          requestsChannel
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

      <div className="max-w-7xl mx-auto">

        {/* Navbar */}

        <div
          className="
            bg-white
            rounded-[35px]
            shadow-sm
            p-5
            mb-6
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-5
          "
        >

         {/* Right */}

<div
  className="
    text-center
    w-full
  "
>

  <h1
    className="
      text-3xl
      font-extrabold
      text-slate-900
    "
  >

    مرحبًا {profile?.full_name} 👋

  </h1>

  <p
    className="
      text-slate-500
      mt-2
      text-lg
    "
  >

    لوحة تحكم الحرفي الخاصة بك

  </p>

</div>

{/* Left */}

<div
  className="
    flex
    flex-wrap
    justify-center
    items-center
    gap-2
    w-full
  "
>

  <Link
    href="/"
    className="
      bg-slate-100
      hover:bg-slate-200
      transition
      px-4
      py-3
      rounded-2xl
      font-bold
      text-slate-700
    "
  >
    الرئيسية
  </Link>

  <Link
    href="/workers"
    className="
      bg-slate-100
      hover:bg-slate-200
      transition
      px-4
      py-3
      rounded-2xl
      font-bold
      text-slate-700
    "
  >
    الحرفيون
  </Link>

  <Link
    href="/dashboard/artisan/chats"
    className="
      relative
      bg-slate-100
      hover:bg-slate-200
      transition
      px-4
      py-3
      rounded-2xl
      font-bold
      text-slate-700
    "
  >
    المحادثات
  </Link>

  <Link
    href="/dashboard/artisan/requests"
    className={`
      relative
      text-white
      px-4
      py-3
      rounded-2xl
      font-bold
      ${
        newNotification
          ? "bg-red-500"
          : "bg-primary"
      }
    `}
  >

    الطلبات

    {pendingRequests > 0 && (

      <div
        className="
          absolute
          -top-2
          -left-2
          bg-red-500
          text-white
          w-6
          h-6
          rounded-full
          flex
          items-center
          justify-center
          text-xs
          font-bold
        "
      >

        {pendingRequests}

      </div>

    )}

  </Link>

  <button
    onClick={async () => {

      await supabase.auth.signOut();

      window.location.href = "/";

    }}
    className="
      bg-red-50
      text-red-600
      px-4
      py-3
      rounded-2xl
      font-bold
      hover:bg-red-100
      transition
    "
  >

    تسجيل الخروج

  </button>
  </div>

</div>
        {/* Main Grid */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-6
          "
        >

          {/* Right Side */}

<div
  className="
    space-y-6
  "
>

            {/* Profile */}

<div
  className="
    bg-white
    rounded-[35px]
    shadow-sm
    p-6
    text-center
  "
>
              <div
                className="
                  flex
                  flex-col
                  items-center
                "
              >

                {/* Avatar */}

                <div className="relative">

                  <img
                    src={
                      profile?.avatar_url ||
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                    }
                    className="
                      w-32
                      h-32
                      rounded-full
                      object-cover
                      shadow-lg
                      border-4
                      border-white
                    "
                  />

                </div>

                {/* Upload */}

                <label
                  className="
                    mt-5
                    cursor-pointer
                    bg-primary
                    text-white
                    px-5
                    py-3
                    rounded-2xl
                    font-bold
                    hover:scale-105
                    transition-all
                    duration-300
                    shadow-lg
                  "
                >

                  {
                    uploading
                      ? "جاري الرفع..."
                      : "تغيير الصورة"
                  }

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={
                      uploadAvatar
                    }
                  />

                </label>

                {/* Name */}

                <h2
                  className="
                    text-2xl
                    font-bold
                    mt-5
                    text-center
                  "
                >

                  {
                    profile?.full_name
                  }

                </h2>

                {/* Category */}

                <p
                  className="
                    text-slate-500
                    mt-2
                    text-lg
                  "
                >

                  {
                    profile?.category
                  }

                </p>

                {/* Verified */}

                <div
                  className="
                    mt-4
                    bg-green-100
                    text-green-700
                    px-5
                    py-2
                    rounded-full
                    text-sm
                    font-bold
                  "
                >

                  موثق ✓

                </div>

              </div>

              {/* Info */}

              <div
  className="
    mt-8
    space-y-4
    text-center
  "
>

                <div
                  className="
                    bg-slate-50
                    rounded-2xl
                    p-4
                  "
                >

                  <p
                    className="
                      text-slate-500
                      text-sm
                    "
                  >

                    المنطقة

                  </p>

                  <p className="font-bold mt-2">

                    {
                      profile?.city
                    }

                  </p>

                </div>

                <div
                  className="
                    bg-slate-50
                    rounded-2xl
                    p-4
                  "
                >

                  <p
                    className="
                      text-slate-500
                      text-sm
                    "
                  >

                    البريد الإلكتروني

                  </p>

                  <p
                    className="
                      font-bold
                      mt-2
                      break-all
                    "
                  >

                    {
                      worker?.email
                    }

                  </p>

                </div>

              </div>

            </div>

            {/* Stats */}

            <div
  className="
    grid
    grid-cols-2
    gap-4
  "
>

              <div
                className="
                  bg-white
                  rounded-[30px]
                  p-6
                  shadow-sm
                "
              >

                <p className="text-slate-500">

                  إجمالي الطلبات

                </p>

                <h2
                  className="
                    text-4xl
                    font-extrabold
                    text-primary
                    mt-4
                  "
                >

                  {
                    requests.length
                  }

                </h2>

              </div>

              <div
                className="
                  bg-white
                  rounded-[30px]
                  p-6
                  shadow-sm
                "
              >

                <p className="text-slate-500">

                  الطلبات المعلقة

                </p>

                <h2
                  className="
                    text-4xl
                    font-extrabold
                    text-red-500
                    mt-4
                  "
                >

                  {
                    pendingRequests
                  }

                </h2>

              </div>

            </div>

          </div>

          {/* Left Side */}

          <div className="lg:col-span-2">

            <div
              className="
                bg-white
                rounded-[35px]
                shadow-sm
                p-8
              "
            >

              <h2
                className="
                  text-4xl
                  font-extrabold
                  text-slate-900
                "
              >

                أهلاً بك 👋

              </h2>

              <p
                className="
                  text-slate-500
                  mt-5
                  text-xl
                  leading-9
                "
              >

                يمكنك الآن إدارة طلباتك
                ومحادثاتك والتواصل
                مع العملاء بسهولة.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}