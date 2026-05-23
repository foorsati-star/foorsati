import Link from "next/link";
import { ArrowRight, KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-140px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 mx-auto flex items-center justify-center mb-6">
            <KeyRound className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">نسيت كلمة المرور؟</h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            لا تقلق، أدخل رقم هاتفك أو بريدك الإلكتروني المرتبط بحسابك وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100">
          <form className="space-y-6">
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف أو البريد الإلكتروني</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 outline-none focus:border-primary focus:bg-white transition-colors text-left" 
                dir="ltr"
                placeholder="email@example.com / 555 123 456" 
              />
            </div>
            
            <button type="button" className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-md shadow-primary/20 hover:bg-primary-800 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
              إرسال رابط الاستعادة
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors flex items-center justify-center gap-2">
              <ArrowRight className="w-4 h-4" />
              العودة إلى صفحة تسجيل الدخول
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
