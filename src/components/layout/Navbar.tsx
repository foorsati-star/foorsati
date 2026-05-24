import Link from "next/link";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">

      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">

        {/* Right Side */}
  {/* Buttons */}

<div className="flex items-center gap-3">

<Link
  href="/login"
className="
px-5
h-11
rounded-2xl
border
border-[#0B6B57]/20
bg-[#0B6B57]
text-white
text-sm
font-bold
flex
items-center
justify-center
shadow-[0_4px_14px_rgba(11,107,87,0.12)]
hover:bg-[#095746]
hover:shadow-[0_6px_18px_rgba(11,107,87,0.18)]
transition-all
duration-300
"
>
  تسجيل الدخول
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