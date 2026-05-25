import Link from "next/link";

export default function NotFoundPage() {

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        flex
        items-center
        justify-center
        px-4
      "
      dir="rtl"
    >

      <div
        className="
          bg-white
          rounded-[40px]
          shadow-xl
          p-10
          md:p-16
          text-center
          max-w-2xl
          w-full
        "
      >

        {/* 404 */}

        <div
          className="
            text-[120px]
            md:text-[170px]
            font-black
            leading-none
            text-primary
            opacity-10
          "
        >

          404

        </div>

        {/* Title */}

        <h1
          className="
            text-4xl
            md:text-5xl
            font-extrabold
            text-slate-900
            -mt-10
          "
        >

          الصفحة غير موجودة

        </h1>

        {/* Description */}

        <p
          className="
            text-slate-500
            text-lg
            leading-9
            mt-6
            max-w-xl
            mx-auto
          "
        >

          يبدو أن الصفحة التي تبحث عنها
          غير موجودة أو تم نقلها
          أو حذفها من المنصة.

        </p>

        {/* Buttons */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-4
            mt-10
          "
        >

          <Link
            href="/"
            className="
              bg-primary
              text-white
              px-8
              py-4
              rounded-2xl
              font-bold
              text-lg
              shadow-lg
              hover:scale-105
              transition-all
              duration-300
            "
          >

            العودة للرئيسية

          </Link>

          <Link
            href="/feed"
            className="
              bg-slate-100
              text-slate-700
              px-8
              py-4
              rounded-2xl
              font-bold
              text-lg
              hover:bg-slate-200
              transition-all
              duration-300
            "
          >

            تصفح المنشورات

          </Link>

        </div>

      </div>

    </div>

  );

}