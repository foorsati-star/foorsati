"use client";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();

  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const links = [

    {
      name: "الرئيسية",
      href: "/dashboard/artisan",
    },

    {
      name: "الطلبات",
      href:
        "/dashboard/artisan/requests",
    },

    {
      name: "المحادثات",
      href:
        "/dashboard/artisan/chats",
    },

    {
      name: "العودة للموقع",
      href: "/",
    },

  ];

  // حماية الداشبورد

  useEffect(() => {

    const checkUser = async () => {

      const {
        data: { session },
      } = await supabase.auth.getSession();

      // إذا غير مسجل دخول

      if (!session) {

        router.push("/login");

        return;

      }

      setLoading(false);

    };

    checkUser();

  }, [router]);

  // Logout

  const handleLogout = async () => {

    await supabase.auth.signOut();

    router.push("/login");

  };

  // Loading

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-slate-100
        "
      >

        <div
          className="
            text-2xl
            font-bold
            text-slate-700
          "
        >
          جاري التحميل...
        </div>

      </div>

    );

  }

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        flex
      "
      dir="rtl"
    >

      {/* Sidebar */}

      <aside
        className="
          w-[290px]
          bg-white
          shadow-sm
          border-l
          border-slate-200
          hidden
          lg:flex
          flex-col
          justify-between
          p-6
        "
      >

        <div>

          {/* Logo */}

          <Link
            href="/"
            className="
              flex
              items-center
              justify-center
              h-16
              rounded-3xl
              bg-primary
              text-white
              font-extrabold
              text-2xl
              shadow-lg
              shadow-primary/20
              mb-10
            "
          >

            فرصتي

          </Link>

          {/* Links */}

          <div className="space-y-3">

            {links.map((link) => {

              const active =
                pathname === link.href;

              return (

                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex
                    items-center
                    px-5
                    py-4
                    rounded-2xl
                    font-bold
                    transition-all
                    duration-300
                    ${
                      active
                        ? "bg-primary text-white shadow-lg"
                        : "text-slate-700 hover:bg-slate-100"
                    }
                  `}
                >

                  {link.name}

                </Link>

              );

            })}

          </div>

        </div>

        {/* Bottom */}

        <div className="space-y-4">

          {/* Info */}

          <div
            className="
              bg-slate-100
              rounded-3xl
              p-5
            "
          >

            <h3
              className="
                text-lg
                font-extrabold
                text-slate-900
              "
            >
              لوحة الحرفي
            </h3>

            <p
              className="
                text-slate-500
                mt-2
                leading-7
              "
            >
              يمكنك إدارة الطلبات
              والمحادثات الخاصة بك
              بسهولة من هنا.
            </p>

          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="
              w-full
              bg-red-500
              hover:bg-red-600
              text-white
              py-4
              rounded-2xl
              font-bold
              transition-all
              duration-300
              shadow-lg
            "
          >

            تسجيل الخروج

          </button>

        </div>

      </aside>

      {/* Main Content */}

      <main
  className="
    flex-1
    w-full
    overflow-x-hidden
  "
>

        <div
  className="
    lg:hidden
    bg-white
    p-2
    shadow-sm
    flex
    gap-2
  "
>

  {links.map((link) => {

    const active =
      pathname === link.href;

    return (

      <Link
        key={link.href}
        href={link.href}
        className={`
          flex-1
          text-center
          py-3
          px-2
          rounded-xl
          text-xs
          font-bold
          transition-all
          duration-300
          ${
            active
              ? "bg-primary text-white"
              : "bg-slate-100 text-slate-700"
          }
        `}
      >

        {link.name}

      </Link>

    );

  })}

</div>
        {/* Page */}

        <div
  className="
    w-full
    max-w-full
    overflow-x-hidden
  "
>

  {children}

</div>

      </main>

    </div>

  );

}