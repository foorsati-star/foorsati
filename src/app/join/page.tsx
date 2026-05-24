import Link from "next/link";
import {
  Briefcase,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function JoinPage() {
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

          {/* Form Card */}

          <div className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl shadow-slate-300/20 border border-white/40 p-7 md:p-10">

            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              تسجيل كحرفي جديد
            </h2>

            <p className="text-slate-500 mb-8 leading-relaxed">
              أكمل النموذج التالي وسنتواصل معك لتفعيل حسابك
            </p>

            <form className="space-y-5">

              {/* Names */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    الاسم الأول
                  </label>

                  <input
                    type="text"
                    placeholder="مثال: أحمد"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-all"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    اسم العائلة
                  </label>

                  <input
                    type="text"
                    placeholder="مثال: بن علي"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-all"
                  />

                </div>

              </div>

{/* Phone */}

<div>

  <label className="block text-sm font-medium text-slate-700 mb-2">
    رقم الهاتف
  </label>

  <div className="flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-white focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5 transition-all h-14">

    {/* Input */}

    <input
      type="tel"
      dir="ltr"
      placeholder="0661234567"
      className="
        flex-1
        h-full
        bg-transparent
        px-5
        text-slate-700
        placeholder:text-slate-400
        outline-none
        text-left
      "
    />

    {/* Country Code */}

    <div
      className="
        h-full
        px-5
        flex
        items-center
        justify-center
        border-r
        border-slate-200
        bg-slate-50
        text-primary
        font-bold
        text-lg
      "
      dir="ltr"
    >
      +213
    </div>

  </div>

</div>

{/* Email */}

<div>

  <label className="block text-sm font-medium text-slate-700 mb-2">
    البريد الإلكتروني
  </label>

  <input
    type="email"
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
      placeholder:text-slate-400
      focus:border-primary
      focus:ring-4
      focus:ring-primary/5
      transition-all
    "
  />

</div>
              {/* Profession */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  المهنة / الخدمة الرئيسية
                </label>

                <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-all appearance-none">

                  <option value="">اختر المهنة...</option>
                  <option value="electrician">كهربائي</option>
                  <option value="plumber">سباك</option>
                  <option value="builder">بناء ومقاول</option>
                  <option value="painter">دهان</option>
                  <option value="cleaner">خدمات تنظيف</option>
                  <option value="other">أخرى</option>

                </select>

              </div>

              {/* Area */}

              <div>

                <label className="block text-sm font-medium text-slate-700 mb-2">
                  المنطقة (البلدية)
                </label>

                <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-all appearance-none">

                  <option value="">اختر المنطقة في ورقلة...</option>
                  <option value="centre">وسط المدينة</option>
                  <option value="rouissat">الرويسات</option>
                  <option value="sidi_khouiled">سيدي خويلد</option>
                  <option value="ain_beida">عين البيضاء</option>
                  <option value="nezla">النزلة</option>
                  <option value="hassi_messaoud">حاسي مسعود</option>
                  <option value="touggourt">تقرت</option>
                  <option value="temacine">تماسين</option>
                  <option value="el_hadjira">الحجيرة</option>
                  <option value="taibet">الطيبات</option>

                </select>

              </div>

              {/* CTA */}

              <button
                type="button"
                className="
                  w-full
                  bg-primary
                  text-white
                  font-bold
                  py-4
                  rounded-2xl
                  shadow-[0_10px_30px_rgba(11,107,87,0.18)]
                  hover:bg-primary-800
                  hover:-translate-y-1
                  hover:shadow-[0_14px_40px_rgba(11,107,87,0.24)]
                  transition-all
                  duration-300
                  mt-2
                "
              >
                تقديم طلب التسجيل
              </button>

              {/* Login */}

              <p className="text-center text-sm text-slate-500 pt-2">

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

              {/* Benefit */}

              <div className="flex gap-5">

                <div className="w-16 h-16 shrink-0 bg-primary/10 text-primary rounded-3xl flex items-center justify-center shadow-sm">

                  <TrendingUp className="w-8 h-8" />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    زيادة دخلك وعملائك
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-[15px]">
                    نحن نربطك مباشرة بمئات العملاء في منطقتك الذين يبحثون
                    عن خدماتك يومياً، مما يعني زيادة مستمرة في طلبات العمل.
                  </p>

                </div>

              </div>

              {/* Benefit */}

              <div className="flex gap-5">

                <div className="w-16 h-16 shrink-0 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center shadow-sm">

                  <Briefcase className="w-8 h-8" />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    مرونة كاملة في العمل
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-[15px]">
                    أنت مدير نفسك! اقبل الطلبات التي تناسب وقتك وحدد
                    أسعارك الخاصة بحرية كاملة.
                  </p>

                </div>

              </div>

              {/* Benefit */}

              <div className="flex gap-5">

                <div className="w-16 h-16 shrink-0 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center shadow-sm">

                  <ShieldCheck className="w-8 h-8" />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    نبني سمعتك الرقمية
                  </h3>

                  <p className="text-slate-600 leading-relaxed text-[15px]">
                    احصل على تقييمات إيجابية من العملاء لتظهر في أعلى نتائج
                    البحث داخل المنصة.
                  </p>

                </div>

              </div>

            </div>

            {/* Note */}

            <div className="mt-12 bg-white rounded-3xl p-6 flex items-start gap-4 shadow-sm border border-slate-100">

              <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />

              <p className="text-slate-600 text-sm leading-relaxed">
                التسجيل مجاني تماماً لفترة محدودة. يتم مراجعة جميع الطلبات
                لضمان جودة الحرفيين داخل منصة فرصتي.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}