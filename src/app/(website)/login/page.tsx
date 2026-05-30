"use client";

import Link from "next/link";

import Image from "next/image";

import {
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(true);

  // تحميل آخر إيميل محفوظ

  useEffect(() => {

    const savedEmail =
      localStorage.getItem(
        "saved_email"
      );

    if (savedEmail) {

      setEmail(savedEmail);

    }

  }, []);

  // Login

  const handleLogin = async () => {

    try {

      setLoading(true);

      // Login

      const {
        data,
        error,
      } = await supabase.auth.signInWithPassword({

        email,

        password,

      });

      if (error) {

        alert(error.message);

        return;

      }

      const user =
        data.user;

      if (!user) {

        alert(
          "حدث خطأ أثناء تسجيل الدخول"
        );

        return;

      }

      // حفظ الإيميل

      if (rememberMe) {

        localStorage.setItem(
          "saved_email",
          email
        );

      } else {

        localStorage.removeItem(
          "saved_email"
        );

      }

      // جلب الـ Profile

      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError || !profile) {

        console.log(profileError);

        alert(
          "لم يتم العثور على الملف الشخصي"
        );

        return;

      }

      // Redirect حسب نوع الحساب

      if (
  profile.account_type ===
  "worker"
) {

  router.push(
    "/dashboard/artisan"
  );

} else if (
  profile.account_type ===
  "client"
) {

  router.push(
    "/dashboard/client"
  );

} else {

  router.push("/");
}

    } catch (err) {

      console.log(err);

      alert(
        "حدث خطأ أثناء تسجيل الدخول"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
        bg-white
        min-h-[calc(100vh-64px)]
        flex
        justify-center
      "
      dir="rtl"
    >

      {/* Right Side */}

      <div
        className="
          w-full
          max-w-xl
          flex
          items-center
          justify-center
          p-6
          md:p-12
          mx-auto
        "
      >

        <div className="w-full max-w-md">

          {/* Header */}

          <div
            className="
              mb-10
              text-center
            "
          >

            <Link
              href="/"
              className="
                inline-flex
                items-center
                justify-center
                px-5
                h-14
                rounded-2xl
                bg-primary
                mb-6
                shadow-md
                shadow-primary/10
              "
            >

              <span
                className="
                  text-white
                  font-bold
                  text-lg
                "
              >

                منصة فرصتي

              </span>

            </Link>

            <h1
              className="
                text-3xl
                font-bold
                text-slate-900
                mb-2
              "
            >

              مرحباً بعودتك

            </h1>

            <p
              className="
                text-slate-500
                font-medium
              "
            >

              سجل الدخول للمتابعة
              إلى حسابك

            </p>

          </div>

          {/* Form */}

          <form
            className="space-y-5"
            onSubmit={(e) => {

              e.preventDefault();

              handleLogin();

            }}
          >

            {/* Email */}

            <div>

              <label
                className="
                  block
                  text-sm
                  font-bold
                  text-slate-700
                  mb-2
                "
              >

                البريد الإلكتروني

              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                placeholder="example@email.com"
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  outline-none
                  text-slate-700
                  focus:border-primary
                  focus:ring-4
                  focus:ring-primary/5
                  transition-all
                "
                required
              />

            </div>

            {/* Password */}

            <div>

              <label
                className="
                  block
                  text-sm
                  font-bold
                  text-slate-700
                  mb-2
                "
              >

                كلمة المرور

              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                placeholder="********"
                className="
                  w-full
                  h-14
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  outline-none
                  text-slate-700
                  focus:border-primary
                  focus:ring-4
                  focus:ring-primary/5
                  transition-all
                "
                required
              />

              {/* Options */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mt-3
                  mb-5
                "
              >

                <Link
                  href="/forgot-password"
                  className="
                    text-sm
                    text-primary
                    font-semibold
                    hover:underline
                  "
                >

                  نسيت كلمة المرور؟

                </Link>

                <label
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-slate-600
                    cursor-pointer
                  "
                >

                  <span>

                    تذكرني

                  </span>

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(
                        e.target.checked
                      )
                    }
                    className="
                      rounded
                      border-slate-300
                      text-primary
                      focus:ring-primary
                    "
                  />

                </label>

              </div>

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-14
                rounded-2xl
                bg-primary
                text-white
                font-bold
                hover:opacity-90
                transition-all
                shadow-lg
                shadow-primary/10
                flex
                items-center
                justify-center
                gap-2
              "
            >

              {
                loading
                  ? "جاري تسجيل الدخول..."
                  : "تسجيل الدخول"
              }

              <ArrowRight
                className="
                  w-5
                  h-5
                  rotate-180
                "
              />

            </button>

           {/* Register */}

<div
  className="
    text-center
    pt-6
    border-t
    border-slate-100
  "
>

  <p
    className="
      text-slate-500
      mb-4
    "
  >

    ليس لديك حساب؟

  </p>

  <div
    className="
      flex
      flex-col
      gap-3
    "
  >

    <Link
      href="/register"
      className="
        h-12
        rounded-2xl
        bg-primary
        text-white
        font-bold
        flex
        items-center
        justify-center
      "
    >

      إنشاء حساب عميل

    </Link>

    <Link
      href="/join"
      className="
        h-12
        rounded-2xl
        border-2
        border-primary
        text-primary
        font-bold
        flex
        items-center
        justify-center
      "
    >

      التسجيل كحرفي

    </Link>

  </div>

</div>

          </form>

        </div>

      </div>

      {/* Left Side */}

      <div
        className="
          hidden
          lg:flex
          w-1/2
          bg-slate-50
          relative
          p-12
          items-center
          justify-center
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            inset-0
            bg-primary/5
          "
        ></div>

        <div
          className="
            relative
            z-10
            max-w-lg
          "
        >

          {/* Image */}

          <div
            className="
              relative
              h-80
              w-full
              rounded-3xl
              overflow-hidden
              shadow-2xl
              mb-8
              border-4
              border-white
            "
          >

            <Image
              src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=1000&auto=format&fit=crop"
              alt="حرفي"
              fill
              className="object-cover"
            />

          </div>

          {/* Card */}

          <div
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-xl
              border
              border-slate-100
              flex
              items-start
              gap-4
            "
          >

            <div
              className="
                w-12
                h-12
                bg-green-50
                rounded-2xl
                flex
                items-center
                justify-center
                shrink-0
              "
            >

              <ShieldCheck
                className="
                  w-6
                  h-6
                  text-green-600
                "
              />

            </div>

            <div>

              <h3
                className="
                  font-bold
                  text-slate-900
                  text-lg
                  mb-1
                "
              >

                منصة موثوقة وآمنة

              </h3>

              <p
                className="
                  text-sm
                  text-slate-600
                  leading-relaxed
                  font-medium
                "
              >

                انضم إلى آلاف المستخدمين
                الذين يثقون في فرصتي
                للوصول إلى أفضل الحرفيين
                أو تقديم خدماتهم باحترافية.

              </p>

            </div>

          </div>

        </div>

        {/* Decorations */}

        <div
          className="
            absolute
            top-20
            right-20
            w-64
            h-64
            bg-primary/5
            rounded-full
            blur-3xl
          "
        ></div>

        <div
          className="
            absolute
            bottom-20
            left-20
            w-64
            h-64
            bg-amber-500/5
            rounded-full
            blur-3xl
          "
        ></div>

      </div>

    </div>

  );

}