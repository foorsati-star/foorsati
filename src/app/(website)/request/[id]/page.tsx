"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RequestPage({
  params,
}: {
  params: { id: string };
}) {

  const [worker, setWorker] = useState<any>(null);

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientLocation, setClientLocation] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const getWorker = async () => {

      const { data, error } = await supabase
        .from("workers")
        .select("*")
        .eq("id", params.id)
        .single();

      if (error) {
        console.log(error);
      } else {
        setWorker(data);
      }

    };

    getWorker();

  }, [params.id]);

  const handleSubmit = async () => {

    if (
      !clientName ||
      !clientPhone ||
      !clientLocation ||
      !description
    ) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("requests")
      .insert([
        {
          worker_id: worker.id,

          client_name: clientName,

          client_phone: clientPhone,

          client_location: clientLocation,

          service: worker?.service,

          description: description,
        },
      ]);

    setLoading(false);

    if (error) {

      console.log(error);

      alert("حدث خطأ أثناء إرسال الطلب");

    } else {

      alert("تم إرسال الطلب بنجاح ✅");

      setClientName("");
      setClientPhone("");
      setClientLocation("");
      setDescription("");

    }

  };

  return (

    <div
      className="min-h-screen bg-slate-100 flex items-center justify-center p-6"
      dir="rtl"
    >

      <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-xl p-8">

        {/* Title */}

        <div className="text-center mb-10">

          <h1 className="text-4xl font-extrabold text-slate-900">
            كيف يمكننا مساعدتك؟
          </h1>

          <p className="text-slate-500 mt-4 text-lg leading-8">

            اكتب تفاصيل الخدمة المطلوبة
            وسيتم التواصل معك في أقرب وقت.

          </p>

        </div>

        {/* Name */}

        <div className="mb-5">

          <label className="block mb-3 font-bold text-slate-700">
            الاسم الكامل
          </label>

          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="اكتب اسمك الكامل"
            className="
              w-full
              p-5
              rounded-2xl
              border
              border-slate-200
              outline-none
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
              transition
            "
          />

        </div>

        {/* Phone */}

        <div className="mb-5">

          <label className="block mb-3 font-bold text-slate-700">
            رقم الهاتف
          </label>

          <input
            type="text"
            value={clientPhone}
            onChange={(e) => setClientPhone(e.target.value)}
            placeholder="اكتب رقم الهاتف"
            className="
              w-full
              p-5
              rounded-2xl
              border
              border-slate-200
              outline-none
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
              transition
            "
          />

        </div>

        {/* Location */}

        <div className="mb-5">

          <label className="block mb-3 font-bold text-slate-700">
            المنطقة
          </label>

          <input
            type="text"
            value={clientLocation}
            onChange={(e) => setClientLocation(e.target.value)}
            placeholder="اكتب منطقتك"
            className="
              w-full
              p-5
              rounded-2xl
              border
              border-slate-200
              outline-none
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
              transition
            "
          />

        </div>

        {/* Description */}

        <div className="mb-10">

          <label className="block mb-3 font-bold text-slate-700">
            ما المشكلة أو الخدمة المطلوبة؟
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="اكتب تفاصيل المشكلة أو الخدمة..."
            className="
              w-full
              h-44
              p-5
              rounded-2xl
              border
              border-slate-200
              outline-none
              focus:border-primary
              focus:ring-4
              focus:ring-primary/10
              transition
            "
          />

        </div>

        {/* Submit Button */}

        <div className="flex justify-center">

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              bg-primary
              text-white
              px-16
              py-5
              rounded-3xl
              text-xl
              font-extrabold
              shadow-[0_0_35px_rgba(16,185,129,0.35)]
              hover:scale-105
              hover:shadow-[0_0_60px_rgba(16,185,129,0.65)]
              transition-all
              duration-300
            "
          >

            {loading
              ? "جاري الإرسال..."
              : "إرسال الطلب"}

          </button>

        </div>

      </div>

    </div>

  );
}