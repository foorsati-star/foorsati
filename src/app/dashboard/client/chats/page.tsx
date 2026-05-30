"use client";

import Link from "next/link";

export default function ClientChatsPage() {

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        p-4
        md:p-6
      "
      dir="rtl"
    >

      <div
        className="
          max-w-5xl
          mx-auto
        "
      >

        {/* Header */}

        <div
          className="
            bg-white
            rounded-[30px]
            p-6
            shadow-sm
            mb-6
          "
        >

          <h1
            className="
              text-2xl
              md:text-3xl
              font-extrabold
              text-slate-900
            "
          >

            المحادثات 💬

          </h1>

          <p
            className="
              text-slate-500
              mt-2
            "
          >

            جميع محادثاتك مع الحرفيين ستظهر هنا.

          </p>

        </div>

        {/* Empty State */}

        <div
          className="
            bg-white
            rounded-[30px]
            p-10
            shadow-sm
            text-center
          "
        >

          <div
            className="
              text-6xl
              mb-4
            "
          >

            💬

          </div>

          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >

            لا توجد محادثات حالياً

          </h2>

          <p
            className="
              text-slate-500
              mt-3
              max-w-md
              mx-auto
            "
          >

            عندما تبدأ التواصل مع أحد الحرفيين
            ستظهر جميع المحادثات هنا.

          </p>

          <Link
            href="/workers"
            className="
              inline-flex
              mt-6
              bg-primary
              text-white
              px-6
              py-3
              rounded-2xl
              font-bold
            "
          >

            تصفح الحرفيين

          </Link>

        </div>

      </div>

    </div>

  );

}