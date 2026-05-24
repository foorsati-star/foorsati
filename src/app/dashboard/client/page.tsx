export default function ClientDashboard() {

  return (

    <div className="flex min-h-screen">

      {/* Sidebar */}
<aside className="w-72 bg-white border-l border-slate-200 p-6 shadow-sm">

  <div className="mb-10">

    <h2 className="text-3xl font-extrabold text-primary">
      فرصتي
    </h2>

    <p className="text-sm text-slate-400 mt-2">
      لوحة تحكم العميل
    </p>

  </div>

  <nav className="space-y-2">

    <button className="
      w-full
      text-right
      px-5
      py-4
      rounded-2xl
      bg-primary
      text-white
      font-bold
      shadow-lg
      shadow-primary/10
    ">
      الرئيسية
    </button>

    <button className="
      w-full
      text-right
      px-5
      py-4
      rounded-2xl
      text-slate-700
      hover:bg-slate-100
      transition-all
      font-medium
    ">
      طلباتي
    </button>

    <button className="
      w-full
      text-right
      px-5
      py-4
      rounded-2xl
      text-slate-700
      hover:bg-slate-100
      transition-all
      font-medium
    ">
      الرسائل
    </button>

    <button className="
      w-full
      text-right
      px-5
      py-4
      rounded-2xl
      text-slate-700
      hover:bg-slate-100
      transition-all
      font-medium
    ">
      الحرفيون المحفوظون
    </button>

    <button className="
      w-full
      text-right
      px-5
      py-4
      rounded-2xl
      text-slate-700
      hover:bg-slate-100
      transition-all
      font-medium
    ">
      إعدادات الحساب
    </button>

    <div className="pt-6 mt-6 border-t border-slate-100">

      <button className="
        w-full
        text-right
        px-5
        py-4
        rounded-2xl
        text-red-500
        hover:bg-red-50
        transition-all
        font-semibold
      ">
        تسجيل الخروج
      </button>

    </div>

  </nav>

</aside>
      {/* Content */}
      <main className="flex-1 p-10 bg-slate-50">

        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          مرحبًا بك 👋
        </h1>

        <p className="text-slate-500 mb-10">
          هذه لوحة تحكم العميل.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">

            <h3 className="text-slate-500 text-sm mb-2">
              الطلبات النشطة
            </h3>

            <p className="text-4xl font-bold text-primary">
              4
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">

            <h3 className="text-slate-500 text-sm mb-2">
              الرسائل الجديدة
            </h3>

            <p className="text-4xl font-bold text-primary">
              12
            </p>

          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">

            <h3 className="text-slate-500 text-sm mb-2">
              الحرفيون المحفوظون
            </h3>

            <p className="text-4xl font-bold text-primary">
              7
            </p>

          </div>

        </div>

      </main>

    </div>

  );

}