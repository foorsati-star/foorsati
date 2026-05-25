"use client";

import Link from "next/link";

import Logo from "@/components/ui/Logo";

import {
  useEffect,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  Home,
  Briefcase,
  Newspaper,
  MessageCircle,
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

export default function Navbar() {

  const router = useRouter();

  const pathname =
    usePathname();

  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  // جلب المستخدم

  useEffect(() => {

    const getUser =
      async () => {

        const {
          data: { user },
        } = await supabase.auth.getUser();

        setUser(user);

        setLoading(false);

      };

    getUser();

    // مراقبة تسجيل الدخول

    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange(

      async (
        _event,
        session
      ) => {

        setUser(
          session?.user || null
        );

      }

    );

    return () => {

      authListener.subscription.unsubscribe();

    };

  }, []);

  // Logout

  const handleLogout =
    async () => {

      await supabase.auth.signOut();

      router.push("/");

      router.refresh();

    };

  // Bottom Navigation

  const mobileLinks = [

    {
      name: "الرئيسية",
      href: "/",
      icon: Home,
    },

    {
      name: "الحرفيون",
      href: "/workers",
      icon: Briefcase,
    },

    {
      name: "المنشورات",
      href: "/feed",
      icon: Newspaper,
    },

    {
      name: "المحادثات",
      href:
        "/dashboard/artisan/chats",
      icon: MessageCircle,
    },

  ];

  if (user) {

    mobileLinks.push({

      name: "الحساب",

      href:
        "/dashboard/artisan",

      icon: LayoutDashboard,

    });

  }

  return (

    <>

      {/* Desktop + Top */}

      <header
        className="
          sticky
          top-0
          z-50
          w-full
          bg-white/90
          backdrop-blur-2xl
          border-b
          border-slate-200/70
          shadow-sm
        "
      >

        {/* Top */}

        <div
          className="
            container
            mx-auto
            px-4
            md:px-6
            h-20
            flex
            items-center
            justify-between
          "
        >

          {/* Buttons */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            {/* Feed */}

            <Link
              href="/feed"
              className="
                hidden
                md:flex
                px-5
                h-11
                rounded-2xl
                bg-slate-100
                text-slate-700
                text-sm
                font-bold
                items-center
                justify-center
                hover:bg-slate-200
                transition-all
                duration-300
              "
            >

              المنشورات

            </Link>

            {/* Dashboard */}

            {
              user && (

                <Link
                  href="/dashboard/artisan"
                  className="
                    hidden
                    md:flex
                    px-5
                    h-11
                    rounded-2xl
                    bg-primary
                    text-white
                    text-sm
                    font-bold
                    items-center
                    justify-center
                    hover:opacity-90
                    transition-all
                    duration-300
                    shadow-lg
                  "
                >

                  لوحة التحكم

                </Link>

              )
            }

            {/* Login / Logout */}

            {
              !loading && (

                user ? (

                  <button
                    onClick={
                      handleLogout
                    }
                    className="
                      hidden
                      md:flex
                      px-5
                      h-11
                      rounded-2xl
                      border
                      border-red-200
                      bg-red-50
                      text-red-600
                      text-sm
                      font-bold
                      items-center
                      justify-center
                      hover:bg-red-100
                      transition-all
                      duration-300
                    "
                  >

                    تسجيل الخروج

                  </button>

                ) : (

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

                )

              )
            }

          </div>

          {/* Logo */}

          <Link
            href="/"
            className="
              flex
              items-center
              hover:opacity-90
              transition-opacity
            "
            dir="ltr"
          >

            <Logo />

          </Link>

        </div>

        {/* Desktop Navigation */}

        <nav
          className="
            hidden
            md:flex
            items-center
            justify-center
            gap-8
            py-3
            text-sm
            font-medium
            text-slate-600
            border-t
            border-slate-100
          "
        >

          <Link
            href="/"
            className="
              hover:text-primary
              transition-colors
            "
          >

            الرئيسية

          </Link>

          <Link
            href="/workers"
            className="
              hover:text-primary
              transition-colors
            "
          >

            تصفح الحرفيين

          </Link>

          <Link
            href="/feed"
            className="
              hover:text-primary
              transition-colors
            "
          >

            المنشورات

          </Link>

          <Link
            href="/about"
            className="
              hover:text-primary
              transition-colors
            "
          >

            من نحن

          </Link>

        </nav>

      </header>

      {/* Bottom Mobile Navigation */}

      <div
        className="
          md:hidden
          fixed
          bottom-0
          left-0
          right-0
          z-[100]
          px-4
          pb-[max(12px,env(safe-area-inset-bottom))]
          pt-3
          bg-white/90
          backdrop-blur-2xl
          border-t
          border-slate-200
          shadow-[0_-10px_30px_rgba(0,0,0,0.06)]
        "
      >

        <div
          className="
            grid
            grid-cols-5
            gap-2
          "
        >

          {mobileLinks.map(
            (link) => {

              const active =
                pathname ===
                link.href;

              const Icon =
                link.icon;

              return (

                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex
                    flex-col
                    items-center
                    justify-center
                    gap-1
                    py-3
                    rounded-2xl
                    transition-all
                    duration-300
                    ${
                      active
                        ? "bg-primary text-white shadow-lg scale-105"
                        : "text-slate-500 hover:bg-slate-100"
                    }
                  `}
                >

                  <Icon
                    className="
                      w-5
                      h-5
                    "
                  />

                  <span
                    className="
                      text-[11px]
                      font-bold
                    "
                  >

                    {link.name}

                  </span>

                </Link>

              );

            }
          )}

        </div>

        {/* Logout Mobile */}

        {
          user && (

            <button
              onClick={
                handleLogout
              }
              className="
                mt-3
                w-full
                bg-red-50
                text-red-600
                rounded-2xl
                py-3
                font-bold
                flex
                items-center
                justify-center
                gap-2
              "
            >

              <LogOut
                className="
                  w-5
                  h-5
                "
              />

              تسجيل الخروج

            </button>

          )
        }

      </div>

    </>

  );

}