"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Search, Check } from 'lucide-react';

const locations = [
  { id: 'all', name: 'كل ورقلة' },
  { id: 'centre', name: 'وسط المدينة' },
  { id: 'rouissat', name: 'الرويسات' },
  { id: 'sidi_khouiled', name: 'سيدي خويلد' },
  { id: 'ain_beida', name: 'عين البيضاء' },
  { id: 'nezla', name: 'النزلة' },
  { id: 'hassi_messaoud', name: 'حاسي مسعود' },
  { id: 'touggourt', name: 'تقرت' },
  { id: 'temacine', name: 'تماسين' },
  { id: 'el_hadjira', name: 'الحجيرة' },
  { id: 'taibet', name: 'الطيبات' },
];

export default function LocationSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(locations[0]);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredLocations = locations.filter(loc => 
    loc.name.includes(search)
  );

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      {/* trigger */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-right"
      >
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-slate-400" />
          <span className="text-slate-700 font-medium text-sm md:text-base">{selected.name}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* dropdown */}
      {isOpen && (
        <div className="absolute z-50 top-full mt-2 w-full min-w-[240px] bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden right-0 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-3 border-b border-slate-50 bg-slate-50/50">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text"
                placeholder="ابحث عن منطقة..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>
          <ul className="max-h-60 overflow-y-auto p-2 space-y-1 custom-scrollbar">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((loc) => (
                <li key={loc.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(loc);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-right text-sm transition-colors ${selected.id === loc.id ? 'bg-primary-50 text-primary font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    {loc.name}
                    {selected.id === loc.id && <Check className="w-4 h-4 text-primary" />}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-3 py-6 text-center text-sm text-slate-500">
                لم يتم العثور على منطقة بهذا الاسم
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
