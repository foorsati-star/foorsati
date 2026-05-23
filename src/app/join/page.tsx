import Link from "next/link";
import { Briefcase, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function JoinPage() {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-140px)]">
      
      {/* Header */}
      <div className="bg-primary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            انضم إلى شبكة الحرفيين الأولى في منطقتك
          </h1>
          <p className="text-primary-100 text-lg md:text-xl mb-10 leading-relaxed">
            سجل الآن مجاناً، اعرض خدماتك، واحصل على المزيد من طلبات العمل من عملاء يبحثون عن مهاراتك.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 -mt-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Form */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-10 border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">تسجيل كحرفي جديد</h2>
            <p className="text-slate-500 mb-8">أكمل النموذج التالي وسنتواصل معك لتفعيل حسابك</p>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">الاسم الأول</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-primary focus:bg-white transition-colors" placeholder="مثال: أحمد" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">اسم العائلة</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-primary focus:bg-white transition-colors" placeholder="مثال: بن علي" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">رقم الهاتف</label>
                <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:border-primary focus-within:bg-white transition-colors bg-slate-50">
                  <div className="bg-slate-100 px-4 py-3 border-l border-slate-200 text-slate-500 font-medium ltr" dir="ltr">
                    +213
                  </div>
                  <input type="tel" className="w-full bg-transparent py-3 px-4 outline-none text-left" dir="ltr" placeholder="555 123 456" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">المهنة / الخدمة الرئيسية</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-primary focus:bg-white transition-colors appearance-none">
                  <option value="">اختر المهنة...</option>
                  <option value="electrician">كهربائي</option>
                  <option value="plumber">سباك</option>
                  <option value="builder">بناء ومقاول</option>
                  <option value="painter">دهان</option>
                  <option value="cleaner">خدمات تنظيف</option>
                  <option value="other">أخرى</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">المنطقة (البلدية)</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-primary focus:bg-white transition-colors appearance-none font-medium">
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
              
              <button type="button" className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-800 hover:-translate-y-0.5 transition-all mt-4">
                تقديم طلب التسجيل
              </button>
              
              <p className="text-center text-sm text-slate-500 mt-4">
                لديك حساب بالفعل؟ <Link href="/login" className="text-primary font-bold hover:underline">سجل الدخول</Link>
              </p>
            </form>
          </div>
          
          {/* Benefits */}
          <div className="lg:pt-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">لماذا تنضم إلى فرصتي؟</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0 bg-primary-50 text-primary rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">زيادة دخلك وعملائك</h3>
                  <p className="text-slate-600 leading-relaxed">
                    نحن نربطك مباشرة بمئات العملاء في منطقتك الذين يبحثون عن خدماتك يومياً، مما يعني زيادة مستمرة في طلبات العمل والدخل.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">مرونة في العمل</h3>
                  <p className="text-slate-600 leading-relaxed">
                    أنت مدير نفسك! اقبل الطلبات التي تناسب وقتك، وحدد أسعارك الخاصة وتفاوض مباشرة مع العميل دون أي قيود.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-14 h-14 shrink-0 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">نبني سمعتك الرقمية</h3>
                  <p className="text-slate-600 leading-relaxed">
                    احصل على تقييمات إيجابية من عملائك لتظهر في أعلى نتائج البحث، مما يبني لك اسماً موثوقاً في السوق المحلي.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-slate-100 rounded-2xl p-6 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-slate-600 text-sm leading-relaxed">
                التسجيل مجاني تماماً وسيظل كذلك لفترة محدودة. يتم مراجعة جميع الطلبات لضمان جودة الحرفيين في المنصة.
              </p>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
