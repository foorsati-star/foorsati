"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function WorkersPage() {

  const [workers, setWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getWorkers = async () => {

      const { data, error } = await supabase
        .from("workers")
        .select("*");

      if (error) {
        console.log(error);
      } else {
        setWorkers(data || []);
      }

      setLoading(false);
    };

    getWorkers();

  }, []);

  return (

    <div
      className="min-h-screen bg-slate-100 p-6"
      dir="rtl"
    >

      {/* Header */}

      <div className="mb-10 text-center">

        <h1 className="text-4xl font-bold text-slate-900">
          تصفح الحرفيين
        </h1>

        <p className="text-slate-500 mt-3">
          اختر أفضل الحرفيين القريبين منك
        </p>

      </div>

      {/* Loading */}

      {loading && (

        <div className="text-center text-slate-500">
          جاري تحميل الحرفيين...
        </div>

      )}

      {/* Workers Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {workers.map((worker) => (

          <div
            key={worker.id}
            className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition"
          >

            {/* Image */}

            <div className="flex justify-center">

              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                className="w-28 h-28 rounded-full object-cover"
              />

            </div>

            {/* Name */}

            <h2 className="text-2xl font-bold text-center mt-5">

              {worker.first_name} {worker.last_name}

            </h2>

            {/* Service */}

            <p className="text-center text-slate-500 mt-2">

              {worker.service}

            </p>

            {/* Location */}

            <div className="mt-5 flex justify-center">

              <span className="bg-slate-100 text-slate-700 px-4 py-2 rounded-full text-sm">

                📍 {worker.location}

              </span>

            </div>

            {/* Button */}

            <Link
              href={`/workers/${worker.id}`}
              className="block mt-6 bg-primary text-white text-center py-3 rounded-2xl font-bold hover:opacity-90 transition"
            >
              عرض الملف
            </Link>

          </div>

        ))}

      </div>

    </div>

  );
}