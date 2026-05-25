"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import {
  Briefcase,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function JoinPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // إنشاء الحساب
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  console.log("AUTH DATA:", data);

  // استخراج اليوزر
  const user = data.user;

  if (!user) {
    alert("لم يتم إنشاء المستخدم");
    return;
  }

  // إدخال بيانات الحرفي
  const { error: workerError } = await supabase
    .from("workers")
    .insert([
      {
        user_id: user.id,

        first_name: firstName,
        last_name: lastName,

        phone: phone,
        email: email,

        service: service,
        location: location,
      },
    ]);

  // فحص الخطأ
  if (workerError) {
    console.log(workerError);

    alert(workerError.message);

    return;
  }

  alert("تم إنشاء الحساب بنجاح");

  router.push("/dashboard/artisan");
};

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-140px)] overflow-hidden">

      {/* Hero */}
      <div className="bg-primary text-white py-20 md:py-24 relative">

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,white,transparent_70%)]" />

        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl relative z-10">

          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            انضم إلى شبكة الحرفيين الأولى في منطقتك
          </h1>

          <p className="text-primary-100 text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto">
            سجل الآن مجاناً، اعرض خدماتك، واحصل على المزيد من طلبات
            العمل من عملاء يبحثون يومياً عن مهاراتك.
          </p>

        </div>

      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 -mt-8 pb-24 relative z-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start max-w-6xl mx-auto">

          {/* Form */}
          <div className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl shadow-slate-300/20 border border-white/40 p-7 md:p-10">

            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              تسجيل كحرفي جديد
            </h2>

            <p className="text-slate-500 mb-8 leading-relaxed">
              أكمل النموذج التالي وسنتواصل معك لتفعيل حسابك
            </p>

            <form onSubmit={handleSubmit}>

              {/* Names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    الاسم الأول
                  </label>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="مثال: أحمد"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 outline-none focus:border-primary"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    اسم العائلة
                  </label>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="مثال: بن علي"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 outline-none focus:border-primary"
                  />

                </div>

              </div>

              {/* Phone */}
              <div className="mt-5">

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  رقم الهاتف
                </label>

                <div className="flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white h-14">

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    dir="ltr"
                    className="w-full bg-transparent py-3.5 px-4 outline-none text-left"
                  />

                  <div
                    className="h-full px-5 flex items-center justify-center border-r border-slate-200 bg-slate-50 text-primary font-bold text-lg"
                    dir="ltr"
                  >
                    +213
                  </div>

                </div>

              </div>

              {/* Email */}
              <div className="mt-5">

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  البريد الإلكتروني
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 outline-none focus:border-primary"
                />

              </div>

              {/* Password */}
              <div className="mt-5">

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  كلمة المرور
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 outline-none focus:border-primary"
                />

              </div>

              {/* Service */}
              <div className="mt-5">

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  المهنة / الخدمة الرئيسية
                </label>

                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 outline-none focus:border-primary"
                >
                  <option value="">اختر المهنة...</option>
                  <option value="كهربائي">كهربائي</option>
                  <option value="سباك">سباك</option>
                  <option value="بناء ومقاول">بناء ومقاول</option>
                  <option value="دهان">دهان</option>
                  <option value="خدمات تنظيف">خدمات تنظيف</option>
                  <option value="أخرى">أخرى</option>
                </select>

              </div>

              {/* Location */}
              <div className="mt-5">

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  المنطقة (البلدية)
                </label>

                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 outline-none focus:border-primary"
                >
                  <option value="">اختر المنطقة...</option>
                  <option value="ورقلة">ورقلة</option>
                  <option value="الرويسات">الرويسات</option>
                  <option value="سيدي خويلد">سيدي خويلد</option>
                  <option value="عين البيضاء">عين البيضاء</option>
                  <option value="حاسي مسعود">حاسي مسعود</option>
                  <option value="تقرت">تقرت</option>
                </select>

              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-4 rounded-2xl mt-6"
              >
                تقديم طلب التسجيل
              </button>

              <p className="text-center text-sm text-slate-500 pt-4">

                لديك حساب بالفعل؟

                <Link
                  href="/login"
                  className="text-primary font-bold hover:underline mr-2"
                >
                  سجل الدخول
                </Link>

              </p>

            </form>

          </div>

          {/* Benefits */}
          <div className="lg:pt-16">

            <h2 className="text-3xl font-bold text-slate-900 mb-10">
              لماذا تنضم إلى فرصتي؟
            </h2>

            <div className="space-y-8">

              <div className="flex gap-5">

                <div className="w-16 h-16 shrink-0 bg-primary/10 text-primary rounded-3xl flex items-center justify-center shadow-sm">
                  <TrendingUp className="w-8 h-8" />
                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    زيادة دخلك وعملائك
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-[15px]">
                    نحن نربطك مباشرة بمئات العملاء في منطقتك.
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-16 h-16 shrink-0 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center shadow-sm">
                  <Briefcase className="w-8 h-8" />
                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    مرونة كاملة في العمل
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-[15px]">
                    أنت مدير نفسك وتقبل الطلبات التي تناسبك.
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-16 h-16 shrink-0 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-8 h-8" />
                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    نبني سمعتك الرقمية
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-[15px]">
                    احصل على تقييمات إيجابية من العملاء.
                  </p>

                </div>

              </div>

            </div>

            <div className="mt-12 bg-white rounded-3xl p-6 flex items-start gap-4 shadow-sm border border-slate-100">

              <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />

              <p className="text-slate-600 text-sm leading-relaxed">
                التسجيل مجاني تماماً لفترة محدودة.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}