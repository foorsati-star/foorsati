"use client";

import Link from "next/link";
import { Briefcase, User, ArrowRight } from "lucide-react";

export default function ChooseAccountPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">

      <div className="w-full max-w-5xl">

        {/* Header */}
        <div className="text-center mb-12">

          <h1 className="text-4xl font-black text-slate-900 mb-4">
            مرحباً بك في فرصتي
          </h1>

          <p className="text-slate-500 text-lg font-medium">
            اختر الطريقة التي تريد استخدام المنصة بها
          </p>

        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Client */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all">

            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">

              <User className="w-8 h-8 text-primary" />

            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-4">
              أريد طلب خدمة
            </h2>

            <p className="text-slate-500 leading-8 mb-8 font-medium">
              ابحث عن أفضل الحرفيين والعمال الموثوقين في ولايتك
              وتواصل معهم بسهولة.
            </p>

            <ul className="space-y-4 mb-10">

              <li className="flex items-center gap-3 text-slate-700 font-medium">
                ✓ البحث عن الحرفيين
              </li>

              <li className="flex items-center gap-3 text-slate-700 font-medium">
                ✓ نشر طلبات الخدمات
              </li>

              <li className="flex items-center gap-3 text-slate-700 font-medium">
                ✓ تقييم العمال
              </li>

            </ul>

            <Link
              href="/"
              className="w-full h-14 rounded-2xl bg-primary text-white font-bold flex items-center justify-center gap-2 hover:bg-primary-800 transition-all"
            >

              دخول كعميل

              <ArrowRight className="w-5 h-5 rotate-180" />

            </Link>

          </div>

          {/* Worker */}
          <div className="bg-primary rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">

            <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">

              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">

                <Briefcase className="w-8 h-8 text-white" />

              </div>

              <h2 className="text-2xl font-black mb-4">
                أريد العمل كحرفي
              </h2>

              <p className="text-white/80 leading-8 mb-8 font-medium">
                أنشئ بروفايل احترافي وابدأ في استقبال العملاء
                والطلبات داخل منصتك.
              </p>

              <ul className="space-y-4 mb-10">

                <li className="flex items-center gap-3 font-medium">
                  ✓ إنشاء بروفايل مهني
                </li>

                <li className="flex items-center gap-3 font-medium">
                  ✓ استقبال الطلبات
                </li>

                <li className="flex items-center gap-3 font-medium">
                  ✓ رفع صور الأعمال
                </li>

              </ul>

              <Link
                href="/join"
                className="w-full h-14 rounded-2xl bg-white text-primary font-black flex items-center justify-center gap-2 hover:bg-slate-100 transition-all"
              >

                التسجيل كحرفي

                <ArrowRight className="w-5 h-5 rotate-180" />

              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
