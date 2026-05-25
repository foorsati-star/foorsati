"use client";

import Link from "next/link";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function RegisterPage() {

  const router = useRouter();

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [city, setCity] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [role, setRole] =
    useState("client");

  // Register

  const handleRegister = async () => {

    try {

      setLoading(true);

      // إنشاء الحساب

      const {
        data,
        error,
      } = await supabase.auth.signUp({

        email,

        password,

      });

      if (error) {

        alert(error.message);

        return;

      }

      if (!data.user) {

        alert(
          "حدث خطأ أثناء إنشاء الحساب"
        );

        return;

      }

      // إنشاء Profile

      const {
        error: profileError,
      } = await supabase
        .from("profiles")
        .insert({

          id: data.user.id,

          full_name: fullName,

          bio: "",

          city,

          category,

          account_type: role,

        });

      if (profileError) {

        console.log(profileError);

        alert(
          "تم إنشاء الحساب لكن حدث خطأ في إنشاء الملف الشخصي"
        );

        return;

      }

      // نجاح

      alert(
        "تم إنشاء الحساب بنجاح"
      );

      // Redirect ذكي

      if (role === "worker") {

        router.push(
          "/dashboard/artisan"
        );

      } else {

        router.push("/");

      }

    } catch (err) {

      console.log(err);

      alert(
        "حدث خطأ غير متوقع"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
        bg-slate-100
        min-h-screen
        flex
        items-center
        justify-center
        py-10
        px-4
      "
      dir="rtl"
    >

      <div
        className="
          w-full
          max-w-2xl
          bg-white
          rounded-[40px]
          shadow-xl
          p-8
          md:p-12
        "
      >

        {/* Header */}

        <div className="mb-10 text-center">

          <Link
            href="/"
            className="
              inline-flex
              items-center
              justify-center
              px-6
              h-14
              rounded-2xl
              bg-primary
              mb-7
              shadow-lg
            "
          >

            <span
              className="
                text-white
                font-extrabold
                text-lg
              "
            >
              منصة فرصتي
            </span>

          </Link>

          <h1
            className="
              text-4xl
              font-extrabold
              text-slate-900
              mb-3
            "
          >
            إنشاء حساب جديد
          </h1>

          <p
            className="
              text-slate-500
              text-lg
            "
          >
            انضم الآن إلى منصة فرصتي
            وابدأ باستخدام الخدمات
          </p>

        </div>

        {/* Form */}

        <form
          className="space-y-6"
          onSubmit={(e) => {

            e.preventDefault();

            handleRegister();

          }}
        >

          {/* Account Type */}

          <div>

            <label
              className="
                block
                text-sm
                font-bold
                text-slate-800
                mb-3
              "
            >
              نوع الحساب
            </label>

            <div className="grid grid-cols-2 gap-4">

              {/* Client */}

              <button
                type="button"
                onClick={() =>
                  setRole("client")
                }
                className={`
                  h-14
                  rounded-2xl
                  font-bold
                  transition-all
                  duration-300
                  ${
                    role === "client"
                      ? "bg-primary text-white shadow-lg"
                      : "bg-slate-100 text-slate-700"
                  }
                `}
              >

                عميل

              </button>

              {/* Worker */}

              <button
                type="button"
                onClick={() =>
                  setRole("worker")
                }
                className={`
                  h-14
                  rounded-2xl
                  font-bold
                  transition-all
                  duration-300
                  ${
                    role === "worker"
                      ? "bg-primary text-white shadow-lg"
                      : "bg-slate-100 text-slate-700"
                  }
                `}
              >

                حرفي

              </button>

            </div>

          </div>

          {/* Full Name */}

          <div>

            <label
              className="
                block
                text-sm
                font-bold
                text-slate-800
                mb-2
              "
            >
              الاسم الكامل
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(
                  e.target.value
                )
              }
              placeholder=""
              className="
                w-full
                h-14
                rounded-2xl
                border
                border-slate-200
                px-5
                outline-none
                focus:border-primary
              "
              required
            />

          </div>

          {/* Email */}

          <div>

            <label
              className="
                block
                text-sm
                font-bold
                text-slate-800
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
                px-5
                outline-none
                focus:border-primary
              "
              required
            />

          </div>

          {/* Phone */}

          <div>

            <label
              className="
                block
                text-sm
                font-bold
                text-slate-800
                mb-2
              "
            >
              رقم الهاتف
            </label>

            <div
              className="
                flex
                border
                border-slate-200
                rounded-2xl
                overflow-hidden
              "
            >

              <input
                type="text"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                placeholder="0661234567"
                className="
                  flex-1
                  h-14
                  px-5
                  outline-none
                "
                required
              />

              <div
                className="
                  w-24
                  flex
                  items-center
                  justify-center
                  border-r
                  border-slate-200
                  text-primary
                  font-bold
                "
              >

                +213

              </div>

            </div>

          </div>

          {/* City */}

          <div>

            <label
              className="
                block
                text-sm
                font-bold
                text-slate-800
                mb-2
              "
            >
              المدينة
            </label>

            <input
              type="text"
              value={city}
              onChange={(e) =>
                setCity(
                  e.target.value
                )
              }
              placeholder="مثال: الرويسات"
              className="
                w-full
                h-14
                rounded-2xl
                border
                border-slate-200
                px-5
                outline-none
                focus:border-primary
              "
              required
            />

          </div>

          {/* Category */}

          <div>

            <label
              className="
                block
                text-sm
                font-bold
                text-slate-800
                mb-2
              "
            >
              التخصص
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              placeholder="مثال: كهربائي"
              className="
                w-full
                h-14
                rounded-2xl
                border
                border-slate-200
                px-5
                outline-none
                focus:border-primary
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
                text-slate-800
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
                px-5
                outline-none
                focus:border-primary
              "
              required
            />

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
              font-extrabold
              text-lg
              hover:opacity-90
              transition-all
              shadow-lg
            "
          >

            {
              loading
                ? "جاري إنشاء الحساب..."
                : "إنشاء الحساب"
            }

          </button>

          {/* Login */}

          <div className="text-center pt-3">

            <span className="text-slate-500">

              لديك حساب بالفعل؟

            </span>

            <Link
              href="/login"
              className="
                text-primary
                font-bold
                mr-2
              "
            >

              سجل الدخول

            </Link>

          </div>

        </form>

      </div>

    </div>

  );

}