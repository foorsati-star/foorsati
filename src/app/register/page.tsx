"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("client");

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
            role,
          });

        if (insertError) {
          console.error(insertError);
          alert("تم إنشاء الحساب لكن حدث خطأ في حفظ البيانات");
          return;
        }

        alert("تم إنشاء الحساب بنجاح");

        window.location.href = "/choose-account";
      }

    } catch (err) {

      console.error(err);
      alert("حدث خطأ غير متوقع");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-white min-h-[calc(100vh-64px)] flex items-center justify-center py-10">

      <div className="w-full max-w-xl flex items-center justify-center p-6 md:p-12 mx-auto">

        <div className="w-full max-w-md">

          {/* Header */}

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

          {/* Form */}

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >

            {/* Account Type */}

            <div className="grid grid-cols-2 gap-3 mb-6">

              {/* Client */}

            </div>

            {/* Full Name */}

            <div>

              <label className="block text-sm font-bold text-slate-800 mb-2">
                الاسم الكامل
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثال: محمد عبدالله"
                className="w-full h-14 rounded-2xl border border-slate-200 px-4 outline-none focus:border-primary"
                required
              />

            </div>

            {/* Email */}

            <div>

              <label className="block text-sm font-bold text-slate-800 mb-2">
                البريد الإلكتروني
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full h-14 rounded-2xl border border-slate-200 px-4 outline-none focus:border-primary"
                required
              />

            </div>

            {/* Phone */}

            <div>

              <label className="block text-sm font-bold text-slate-800 mb-2">
                رقم الهاتف
              </label>

              <div className="flex border border-slate-200 rounded-2xl overflow-hidden">

                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0661234567"
                  className="flex-1 h-14 px-4 outline-none"
                  required
                />

                <div className="w-24 flex items-center justify-center border-r border-slate-200 text-primary font-bold">
                  +213
                </div>

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="block text-sm font-bold text-slate-800 mb-2">
                كلمة المرور
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full h-14 rounded-2xl border border-slate-200 px-4 outline-none focus:border-primary"
                required
              />

            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-primary text-white font-bold hover:opacity-90 transition-all"
            >
              {loading ? "جاري الإنشاء..." : "إنشاء الحساب"}
            </button>

            {/* Login */}

            <div className="text-center pt-4">

              <span className="text-slate-500">
                لديك حساب بالفعل؟
              </span>

              <Link
                href="/login"
                className="text-primary font-bold mr-2"
              >
                سجل الدخول
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}