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

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      alert("تم تسجيل الدخول بنجاح");

      router.push("/dashboard");

    } catch (err) {

      console.error(err);
      alert("حدث خطأ أثناء تسجيل الدخول");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-[calc(100vh-64px)] flex">

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">

        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="mb-10 text-center lg:text-right">

            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 h-14 rounded-2xl bg-primary mb-6"
            >
              <span className="text-white font-bold text-lg">
                منصة فرصتي
              </span>
            </Link>

            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              مرحباً بعودتك
            </h1>

            <p className="text-slate-500 font-medium">
              سجل الدخول للمتابعة إلى حسابك في فرصتي
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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-colors text-left"
                dir="ltr"
                placeholder="email@example.com / 0661234567"
              />

            </div>
 <label className="block text-sm font-bold text-slate-700">
                  كلمة المرور
                </label>
            {/* Password */}
            <div>


              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-colors text-left"
                dir="ltr"
                placeholder="••••••••"
              />


              <div className="flex items-center justify-between mb-2">

              <div className="flex items-center justify-between mt-3 mb-5">

  <Link
    href="/forgot-password"
    className="text-sm text-primary font-semibold hover:underline"
  >
    نسيت كلمة المرور؟
  </Link>


</div>

              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-md shadow-primary/20 hover:bg-primary-800 hover:-translate-y-0.5 transition-all mt-8 flex items-center justify-center gap-2 disabled:opacity-60"
            >

              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}

              <ArrowRight className="w-5 h-5 rotate-180" />

            </button>

          </form>

          {/* Bottom */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center lg:text-right">

            <Link
              href="/register"
              className="text-sm text-slate-500 font-medium mb-4 inline-block hover:text-primary transition-colors"
            >
              ليس لديك حساب؟
            </Link>

            <div className="flex flex-col sm:flex-row gap-3">

              <Link
                href="/register"
                className="flex-1 py-3 text-center border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
              >
                حساب عميل
              </Link>

              <Link
                href="/join"
                className="flex-1 py-3 text-center border border-primary/20 bg-primary-50 text-primary font-bold rounded-xl hover:bg-primary-100 transition-colors"
              >
                حساب حرفي
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-slate-50 relative p-12 items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-primary-900/5"></div>

        <div className="relative z-10 max-w-lg">

          <div className="relative h-80 w-full rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-white">

            <Image
              src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=1000&auto=format&fit=crop"
              alt="حرفي"
              fill
              className="object-cover"
            />

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-start gap-4">

            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center shrink-0">

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