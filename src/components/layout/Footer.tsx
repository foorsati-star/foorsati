import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity mb-4" dir="ltr">
              <Logo />
            </Link>
            <p className="text-sm text-slate-500 mb-6 max-w-xs">
              منصتك الموثوقة لربط العملاء بأفضل الحرفيين والعمال المحليين في ورقلة والجزائر.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-800 mb-4">الخدمات</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/workers?category=electrician" className="hover:text-primary transition-colors">كهربائي</Link></li>
              <li><Link href="/workers?category=plumber" className="hover:text-primary transition-colors">سباك</Link></li>
              <li><Link href="/workers?category=builder" className="hover:text-primary transition-colors">بناء ومقاولات</Link></li>
              <li><Link href="/workers?category=cleaner" className="hover:text-primary transition-colors">تنظيف</Link></li>
              <li><Link href="/workers?category=moving" className="hover:text-primary transition-colors">نقل عفش</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-800 mb-4">روابط هامة</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link href="/about" className="hover:text-primary transition-colors">من نحن</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">اتصل بنا</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-slate-800 mb-4">انضم إلينا</h3>
            <p className="text-sm text-slate-600 mb-4">
              هل أنت حرفي وتبحث عن المزيد من العملاء؟ انضم إلى منصتنا اليوم.
            </p>
            <Link 
              href="/join" 
              className="inline-block text-sm font-medium bg-primary-50 text-primary px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors"
            >
              سجل كحرفي الآن
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-slate-500">
          <p>© {new Date().getFullYear()} فرصتي. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="hover:text-primary cursor-pointer transition-colors">فيسبوك</span>
            <span className="hover:text-primary cursor-pointer transition-colors">انستغرام</span>
            <span className="hover:text-primary cursor-pointer transition-colors">تويتر</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
