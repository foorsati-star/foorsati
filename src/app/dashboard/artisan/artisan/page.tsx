export default function ArtisanDashboard() {

  return (

    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-72 bg-white border-l border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-primary mb-10">
          فرصتي
        </h2>

        <nav className="space-y-3">

          <button className="w-full text-right px-4 py-3 rounded-2xl bg-primary text-white font-semibold">
            الرئيسية
          </button>

          <button className="w-full text-right px-4 py-3 rounded-2xl hover:bg-slate-100 transition-all">
            الطلبات
          </button>

          <button className="w-full text-right px-4 py-3 rounded-2xl hover:bg-slate-100 transition-all">
            الرسائل
          </button>

          <button className="w-full text-right px-4 py-3 rounded-2xl hover:bg-slate-100 transition-all">
            الملف الشخصي
          </button>

          <button className="w-full text-right px-4 py-3 rounded-2xl hover:bg-red-50 text-red-500 transition-all">
            تسجيل الخروج
          </button>

        </nav>

      </aside>

      {/* Content */}
      <main className="flex-1 p-10 bg-slate-50">

        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          مرحبًا بك 👋
        </h1>

        <p className="text-slate-500">
          هذه لوحة تحكم الحرفي.
        </p>

      </main>

    </div>

  );

}