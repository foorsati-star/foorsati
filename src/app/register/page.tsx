"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (data.user) {

        const { error: insertError } = await supabase
          .from("users")
          .insert({
            id: data.user.id,
            full_name: fullName,
            email,
            phone,
            role: "client",
          });

        if (insertError) {
          console.error(insertError);
          alert("تم إنشاء الحساب لكن حدث خطأ في حفظ البيانات");
          return;
        }

        alert("تم إنشاء الحساب بنجاح");
      }

    } catch (err) {
      console.error(err);
      alert("حدث خطأ غير متوقع");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-[calc(100vh-64px)] flex">

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">

        <div className="w-full max-w-md">

          <div className="mb-10 text-center lg:text-right">

            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 h-12 rounded-xl bg-primary mb-6"
            >
              <span className="text-white font-bold text-sm leading-none">
                منصة فرصتي
              </span>
            </Link>

            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              إنشاء حساب جديد
            </h1>

            <p className="text-slate-500 font-medium">
              سجل الآن لتبدأ في طلب الخدمات من أمهر الحرفيين
            </p>

          </div>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >

            {/* Full Name */}
            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">
                الاسم الكامل
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-colors"
                placeholder="مثال: محمد عبدالله"
                required
              />

            </div>

            {/* Email */}
            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">
                البريد الإلكتروني
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-colors"
                placeholder="example@email.com"
                required
              />

            </div>

            {/* Phone */}
            <div>

              <label className="block text-sm font-bold text-slate-700 mb-2">
                رقم الهاتف
              </label>

              <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:border-primary transition-colors">

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0661234567"
                  className="flex-1 h-14 px-4 bg-transparent outline-none text-right"
                  required
                />

                <div className="px-4 text-slate-500 font-bold border-r border-slate-200 h-14 flex items-center justify-center bg-slate-100">
                  +213
                </div>

              </div>

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
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-colors"
                placeholder="********"
                required
              />

            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-md shadow-primary/20 hover:bg-primary-800 hover:-translate-y-0.5 transition-all mt-8 flex items-center justify-center gap-2 disabled:opacity-50"
            >

              {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}

              <ArrowRight className="w-5 h-5 rotate-180" />

            </button>

          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center lg:text-right">

            <p className="text-sm text-slate-500 font-medium mb-4">
              لديك حساب بالفعل؟{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:underline"
              >
                سجل الدخول
              </Link>
            </p>

            <div className="bg-slate-50 p-4 rounded-xl flex items-center justify-between">

              <span className="text-sm font-medium text-slate-700">
                هل أنت حرفي وتبحث عن عمل؟
              </span>

              <Link
                href="/join"
                className="text-sm font-bold text-primary hover:underline"
              >
                سجل كحرفي
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-slate-50 relative p-12 items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-primary-900/5"></div>

        <div className="relative z-10 max-w-lg">

          <div className="relative h-80 w-full rounded-3xl overflow-hidden shadow-2xl mb-8 border-4 border-white bg-slate-200">

            <Image
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
              alt="تنظيف المنزل"
              fill
              className="object-cover"
            />

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 flex items-start gap-4">

            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">

              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />

            </div>

            <div>

              <h3 className="font-bold text-slate-900 text-lg mb-1">
                خدمات عالية الجودة
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                اكتشف أفضل الحرفيين والمهنيين في منطقتك.
                تصفح التقييمات، تواصل مباشرة،
                واحصل على خدمة مضمونة وموثوقة.
              </p>

            </div>

          </div>

        </div>

        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>

      </div>

    </div>
  );
}