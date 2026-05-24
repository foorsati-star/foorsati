"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    try {

      setLoading(true);

      let email = identifier;

      // إذا أدخل رقم هاتف
      if (!identifier.includes("@")) {

        const cleanPhone = identifier.replace(/\s+/g, "");

        email = `user${cleanPhone}@foorsati.com`;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      // جلب نوع الحساب
      const { data: userData } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();

      // تحويل حسب نوع المستخدم
      if (userData?.role === "artisan") {

        router.push("/dashboard/artisan");

      } else {

        router.push("/dashboard/client");

      }

    } catch (err) {

      console.error(err);
      alert("حدث خطأ أثناء تسجيل الدخول");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-white min-h-[calc(100vh-64px)] flex justify-center">

      {/* Right Side: Form */}
      <div className="w-full max-w-xl flex items-center justify-center p-6 md:p-12 mx-auto">

        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-10 text-center">

            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 h-14 rounded-2xl bg-primary mb-6 shadow-md shadow-primary/10"
            >
              <span className="text-white font-bold text-lg">
                منصة فرصتي
              </span>
            </Link>

            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              مرحباً بعودتك
            </h1>

            <p className="text-slate-500 font-medium">
              سجل الدخول للمتابعة إلى حسابك
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

            {/* Email or Phone */}
            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">
                رقم الهاتف أو البريد الإلكتروني
              </label>

              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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
                  text-left
                "
                dir="ltr"
              />

            </div>

            {/* Password */}
            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">
                كلمة المرور
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  text-left
                "
                dir="ltr"
              />

              {/* Forgot Password + Remember */}
              <div className="flex items-center justify-between mt-3 mb-5">

                <Link
                  href="/forgot-password"
                  className="text-sm text-primary font-semibold hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link>

                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">

                  <span>تذكرني</span>

                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-primary focus:ring-primary"
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

              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}

              <ArrowRight className="w-5 h-5 rotate-180" />

            </button>

          </form>

          {/* Bottom */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">

            <p className="text-sm text-slate-500 mb-4">
              ليس لديك حساب؟
            </p>

            <div className="grid grid-cols-2 gap-3">

              <Link
                href="/register"
                className="
                  py-3
                  rounded-2xl
                  border
                  border-slate-200
                  text-slate-700
                  font-bold
                  hover:bg-slate-50
                  transition-all
                "
              >
                حساب عميل
              </Link>

              <Link
                href="/join"
                className="
                  py-3
                  rounded-2xl
                  border
                  border-primary/20
                  bg-primary/5
                  text-primary
                  font-bold
                  hover:bg-primary/10
                  transition-all
                "
              >
                حساب حرفي
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-slate-50 relative p-12 items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-primary/5"></div>

        <div className="relative z-10 max-w-lg">

          <div className="relative h-80 w-full rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-white">

            <Image
              src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=1000&auto=format&fit=crop"
              alt="حرفي"
              fill
              className="object-cover"
            />

          </div>

          <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex items-start gap-4">

            <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center shrink-0">

              <ShieldCheck className="w-6 h-6 text-green-600" />

            </div>

            <div>

              <h3 className="font-bold text-slate-900 text-lg mb-1">
                منصة موثوقة وآمنة
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                انضم إلى الآلاف من المستخدمين الذين يثقون في فرصتي للوصول
                إلى أفضل الحرفيين أو تقديم خدماتهم باحترافية وأمان.
              </p>

            </div>

          </div>

        </div>

        {/* Decorative */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="absolute bottom-20 left-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>

      </div>

    </div>

  );

}