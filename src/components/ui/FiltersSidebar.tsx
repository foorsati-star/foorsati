"use client";

import { useState } from "react";
import { ChevronDown, Star, MapPin, Wrench } from "lucide-react";

export default function FiltersSidebar() {
  const [openSections, setOpenSections] = useState({
    location: true,
    category: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const locations = [
    "كل ورقلة",
    "وسط المدينة",
    "الرويسات",
    "سيدي خويلد",
    "عين البيضاء",
    "النزلة",
    "حاسي مسعود",
  ];

  const categories = [
    "كهرباء",
    "سباكة",
    "بناء ومقاولات",
    "دهان وصباغة",
    "نقل عفش",
    "نجارة",
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <h2 className="font-bold text-lg text-slate-800">تصفية النتائج</h2>
        <button className="text-sm text-slate-400 hover:text-primary transition-colors">
          مسح الكل
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-right mb-3 group"
        >
          <div className="flex items-center gap-2 text-slate-800 font-bold group-hover:text-primary transition-colors">
            <Wrench className="w-4 h-4 text-slate-400 group-hover:text-primary" />
            <span>الخدمة المطلوبة</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform ${
              openSections.category ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.category && (
          <div className="space-y-2 mt-3">
            {categories.map((cat, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-md checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                  />
                  <svg
                    className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="w-full h-px bg-slate-100 my-6"></div>

      {/* Location Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("location")}
          className="flex items-center justify-between w-full text-right mb-3 group"
        >
          <div className="flex items-center gap-2 text-slate-800 font-bold group-hover:text-primary transition-colors">
            <MapPin className="w-4 h-4 text-slate-400 group-hover:text-primary" />
            <span>المنطقة</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform ${
              openSections.location ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.location && (
          <div className="space-y-2 mt-3 max-h-48 overflow-y-auto custom-scrollbar pr-1">
            {locations.map((loc, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="location"
                    defaultChecked={i === 0}
                    className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-full checked:border-primary transition-colors cursor-pointer"
                  />
                  <div className="absolute w-2.5 h-2.5 bg-primary rounded-full opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                  {loc}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="w-full h-px bg-slate-100 my-6"></div>

      {/* Rating Filter */}
      <div>
        <button
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full text-right mb-3 group"
        >
          <div className="flex items-center gap-2 text-slate-800 font-bold group-hover:text-primary transition-colors">
            <Star className="w-4 h-4 text-slate-400 group-hover:text-primary" />
            <span>التقييم</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform ${
              openSections.rating ? "rotate-180" : ""
            }`}
          />
        </button>
        {openSections.rating && (
          <div className="space-y-2 mt-3">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-md checked:bg-primary checked:border-primary transition-colors cursor-pointer"
                  />
                  <svg
                    className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-slate-500 mr-2">فأكثر</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
      
      <button className="w-full mt-8 bg-primary hover:bg-primary-800 text-white font-bold py-3 rounded-xl transition-colors">
        تطبيق الفلاتر
      </button>
    </div>
  );
}
