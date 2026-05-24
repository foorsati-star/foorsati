import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">

      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        {/* Right Side */}
        <div className="flex items-center gap-3">

          <Link
            href="/login"
            className="text-sm font-medium text-slate-700 hover:text-primary transition-colors whitespace-nowrap"
          >
            تسجيل الدخول
          </Link>

          <Link
            href="/register"
            className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary-800 transition-colors whitespace-nowrap"
          >
            إنشاء حساب
          </Link>

        </div>

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center hover:opacity-90 transition-opacity"
          dir="ltr"
        >
          <Logo />
        </Link>

      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-center gap-8 py-3 text-sm font-medium text-slate-600 border-t border-gray-100">

        <Link
          href="/"
          className="hover:text-primary transition-colors"
        >
          الرئيسية
        </Link>

        <Link
          href="/workers"
          className="hover:text-primary transition-colors"
        >
          تصفح الحرفيين
        </Link>

        <Link
          href="/about"
          className="hover:text-primary transition-colors"
        >
          من نحن
        </Link>

      </nav>

    </header>
  );
}