import Link from "next/link";
import { Search, Menu, User } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center hover:opacity-90 transition-opacity" dir="ltr">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <Link href="/workers" className="hover:text-primary transition-colors">تصفح الحرفيين</Link>
          <Link href="/about" className="hover:text-primary transition-colors">من نحن</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              تسجيل الدخول
            </Link>
            <Link 
              href="/join" 
              className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-800 transition-colors shadow-sm"
            >
              سجل كحرفي
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-slate-600 hover:bg-gray-50 rounded-md">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
