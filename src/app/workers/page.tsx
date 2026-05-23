import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import WorkerCard from "@/components/ui/WorkerCard";
import FiltersSidebar from "@/components/ui/FiltersSidebar";

export default function WorkersListingPage() {
  const workers = [
    { id: "1", name: "أحمد بن علي", profession: "كهربائي", rating: 4.9, reviewsCount: 124, location: "ورقلة، وسط المدينة", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop", isVerified: true },
    { id: "2", name: "محمد صالح", profession: "سباك", rating: 4.7, reviewsCount: 89, location: "الرويسات", image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=600&auto=format&fit=crop", isVerified: true },
    { id: "3", name: "يوسف ابراهيم", profession: "بناء ومقاولات", rating: 5.0, reviewsCount: 42, location: "سيدي خويلد", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop", isVerified: true },
    { id: "4", name: "عبد القادر", profession: "دهان وصباغة", rating: 4.8, reviewsCount: 67, location: "عين البيضاء", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=600&auto=format&fit=crop", isVerified: false },
    { id: "5", name: "طارق زياد", profession: "كهربائي", rating: 4.6, reviewsCount: 34, location: "حاسي مسعود", image: "https://images.unsplash.com/photo-1508214751196-bfdd4ca4ccaa?q=80&w=600&auto=format&fit=crop", isVerified: true },
    { id: "6", name: "كريم حسن", profession: "نقل عفش", rating: 4.9, reviewsCount: 156, location: "ورقلة، وسط المدينة", image: "https://images.unsplash.com/photo-1603714228681-b399c5418bf6?q=80&w=600&auto=format&fit=crop", isVerified: true },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">تصفح الحرفيين</h1>
          <p className="text-slate-500">ابحث واعثر على أفضل الحرفيين في ورقلة ومحيطها</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-1/4">
            <div className="sticky top-24">
              <FiltersSidebar />
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="w-full lg:w-3/4">
            
            {/* Search and Sort bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-2 flex flex-col md:flex-row gap-2 mb-6">
              <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl">
                <Search className="w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="ابحث بالاسم أو الخدمة..."
                  className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400 text-sm md:text-base"
                />
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl md:w-48 shrink-0 relative cursor-pointer hover:border-primary/50 transition-colors">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
                <select className="bg-transparent border-none outline-none w-full text-slate-700 text-sm appearance-none cursor-pointer absolute inset-0 opacity-0 z-10">
                  <option>الأعلى تقييماً</option>
                  <option>الأحدث</option>
                  <option>الأكثر تقييماً</option>
                </select>
                <span className="text-sm text-slate-600 font-medium">الأعلى تقييماً</span>
                <ChevronDown className="w-4 h-4 text-slate-400 mr-auto" />
              </div>
            </div>
            
            {/* Workers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workers.map((worker) => (
                <WorkerCard key={worker.id} {...worker} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 font-medium transition-colors">1</button>
                <button className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-sm shadow-primary/20">2</button>
                <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 font-medium transition-colors">3</button>
              </div>
            </div>
            
          </main>
        </div>
      </div>
    </div>
  );
}
