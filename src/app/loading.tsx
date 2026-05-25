export default function Loading() {

  return (

    <div
      className="
        fixed
        inset-0
        z-[9999]
        bg-slate-100
        flex
        items-center
        justify-center
        overflow-hidden
      "
      dir="rtl"
    >

      {/* Background Glow */}

      <div
        className="
          absolute
          w-[300px]
          h-[300px]
          rounded-full
          bg-primary/10
          blur-3xl
          animate-pulse
        "
      ></div>

      {/* Content */}

      <div
        className="
          relative
          flex
          flex-col
          items-center
          justify-center
        "
      >

        {/* Logo */}

        <div
          className="
            w-24
            h-24
            rounded-[30px]
            bg-primary
            shadow-floating
            flex
            items-center
            justify-center
            animate-float
          "
        >

          <span
            className="
              text-white
              text-4xl
              font-black
            "
          >

            ف

          </span>

        </div>

        {/* Loader */}

        <div
          className="
            mt-10
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              w-3
              h-3
              rounded-full
              bg-primary
              animate-bounce
            "
          ></div>

          <div
            className="
              w-3
              h-3
              rounded-full
              bg-primary
              animate-bounce
              [animation-delay:0.15s]
            "
          ></div>

          <div
            className="
              w-3
              h-3
              rounded-full
              bg-primary
              animate-bounce
              [animation-delay:0.3s]
            "
          ></div>

        </div>

        {/* Text */}

        <p
          className="
            mt-8
            text-slate-500
            text-lg
            font-medium
            tracking-wide
          "
        >

          جاري تحميل التجربة...

        </p>

      </div>

    </div>

  );

}