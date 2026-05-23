import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="bg-white min-h-[calc(100vh-64px)] flex">
      {/* Right Side: Form (First in RTL) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          
          <div className="mb-10 text-center lg:text-right">
            <Link href="/" className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary mb-6">
              <span className="text-white font-bold text-2xl leading-none pt-1">ف</span>
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">مرحباً بعودتك</h1>
            <p className="text-slate-500 font-medium">سجل الدخول للمتابعة إلى حسابك في فرصتي</p>
          </div>
          
          <form className="space-y-5">
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف أو البريد الإلكتروني</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-colors text-left" 
                dir="ltr"
                placeholder="email@example.com / 555 123 456" 
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700">كلمة المرور</label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline font-bold">نسيت كلمة المرور؟</Link>
              </div>
              <input 
                type="password" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-colors text-left" 
                dir="ltr"
                placeholder="••••••••" 
              />
            </div>
            
            <button type="button" className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-md shadow-primary/20 hover:bg-primary-800 hover:-translate-y-0.5 transition-all mt-8 flex items-center justify-center gap-2">
              تسجيل الدخول
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center lg:text-right">
            <Link
  href="/register"
  className="text-sm text-slate-500 font-medium mb-4 inline-block hover:text-primary transition-colors"
>
  ليس لديك حساب؟
</Link>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/register" className="flex-1 py-3 text-center border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                حساب عميل
              </Link>
              <Link href="/join" className="flex-1 py-3 text-center border border-primary/20 bg-primary-50 text-primary font-bold rounded-xl hover:bg-primary-100 transition-colors">
                حساب حرفي
              </Link>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Left Side: Branding/Image */}
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
              <h3 className="font-bold text-slate-900 text-lg mb-1">منصة موثوقة وآمنة</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                انضم إلى الآلاف من المستخدمين الذين يثقون في فرصتي للوصول إلى أفضل الحرفيين أو تقديم خدماتهم باحترافية وأمان.
              </p>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
