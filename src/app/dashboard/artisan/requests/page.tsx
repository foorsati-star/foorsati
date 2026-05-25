"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ArtisanRequestsPage() {

  const [requests, setRequests] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getRequests = async () => {

      // المستخدم الحالي

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // بيانات الحرفي

      const { data: worker } = await supabase
        .from("workers")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!worker) return;

      // الطلبات

      const { data, error } = await supabase
        .from("requests")
        .select("*")
        .eq("worker_id", worker.id)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.log(error);
      } else {
        setRequests(data || []);
      }

      setLoading(false);

    };

    getRequests();

  }, []);

  // تحديث الحالة

  const updateRequestStatus = async (
    requestId: string,
    status: string
  ) => {

    const { error } = await supabase
      .from("requests")
      .update({ status })
      .eq("id", requestId);

    if (error) {
      console.log(error);
      return;
    }

    // تحديث مباشر

    setRequests((prev) =>
      prev.map((request) =>
        request.id === requestId
          ? { ...request, status }
          : request
      )
    );

  };

  // لون الحالة

  const getStatusStyle = (status: string) => {

    if (status === "accepted") {
      return "bg-green-100 text-green-700";
    }

    if (status === "rejected") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";

  };

  // نص الحالة

  const getStatusText = (status: string) => {

    if (status === "accepted") {
      return "تم القبول";
    }

    if (status === "rejected") {
      return "تم الرفض";
    }

    return "قيد الانتظار";

  };

  return (

    <div
      className="min-h-screen bg-slate-100 p-6"
      dir="rtl"
    >

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <h1 className="text-4xl font-extrabold text-slate-900">
              الطلبات
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              جميع الطلبات الواردة من العملاء
            </p>

          </div>

          {/* Badge */}

          <div className="relative">

            <div className="bg-primary text-white px-6 py-4 rounded-3xl font-bold shadow-lg">

              الطلبات

            </div>

            <div className="
              absolute
              -top-3
              -left-3
              bg-red-500
              text-white
              w-8
              h-8
              rounded-full
              flex
              items-center
              justify-center
              text-sm
              font-bold
              shadow-lg
            ">

              {
                requests.filter(
                  (r) => r.status === "pending"
                ).length
              }

            </div>

          </div>

        </div>

        {/* Loading */}

        {loading && (

          <div className="text-center text-slate-500 text-lg">

            جاري تحميل الطلبات...

          </div>

        )}

        {/* Empty */}

        {!loading && requests.length === 0 && (

          <div className="bg-white rounded-[40px] p-14 text-center shadow-sm">

            <h2 className="text-3xl font-bold text-slate-800">
              لا توجد طلبات بعد
            </h2>

            <p className="text-slate-500 mt-4 text-lg">
              عندما يرسل العملاء طلبات ستظهر هنا
            </p>

          </div>

        )}

        {/* Requests */}

        <div className="space-y-6">

          {requests.map((request) => (

            <div
              key={request.id}
              className="
                bg-white
                rounded-[35px]
                p-7
                shadow-sm
                hover:shadow-xl
                transition
              "
            >

              {/* Top */}

              <div className="
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-5
              ">

                <div>

                  <h2 className="text-3xl font-bold text-slate-900">

                    {request.client_name}

                  </h2>

                  <p className="text-slate-500 mt-3 text-lg">

                    {request.service}

                  </p>

                </div>

                {/* Status */}

                <div
                  className={`
                    px-5
                    py-3
                    rounded-2xl
                    font-bold
                    text-sm
                    w-fit
                    ${getStatusStyle(request.status)}
                  `}
                >

                  {getStatusText(request.status)}

                </div>

              </div>

              {/* Info */}

              <div className="grid md:grid-cols-2 gap-4 mt-7">

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-slate-500 text-sm">
                    رقم الهاتف
                  </p>

                  <p className="font-bold mt-3 text-lg">
                    {request.client_phone}
                  </p>

                </div>

                <div className="bg-slate-50 rounded-2xl p-5">

                  <p className="text-slate-500 text-sm">
                    المنطقة
                  </p>

                  <p className="font-bold mt-3 text-lg">
                    {request.client_location}
                  </p>

                </div>

              </div>

              {/* Description */}

              <div className="bg-slate-50 rounded-3xl p-6 mt-6">

                <p className="text-slate-500 text-sm mb-4">
                  وصف المشكلة
                </p>

                <p className="text-slate-700 leading-9 text-lg">

                  {request.description}

                </p>

              </div>

              {/* Actions */}

              <div className="flex flex-wrap gap-4 mt-7">

                {/* Pending */}

                {request.status === "pending" && (

                  <>

                    <button
                      onClick={() =>
                        updateRequestStatus(
                          request.id,
                          "accepted"
                        )
                      }
                      className="
                        flex-1
                        min-w-[180px]
                        bg-green-500
                        text-white
                        py-4
                        rounded-2xl
                        font-bold
                        shadow-lg
                        hover:scale-[1.02]
                        transition
                      "
                    >
                      قبول الطلب
                    </button>

                    <button
                      onClick={() =>
                        updateRequestStatus(
                          request.id,
                          "rejected"
                        )
                      }
                      className="
                        flex-1
                        min-w-[180px]
                        bg-red-500
                        text-white
                        py-4
                        rounded-2xl
                        font-bold
                        shadow-lg
                        hover:scale-[1.02]
                        transition
                      "
                    >
                      رفض الطلب
                    </button>

                  </>

                )}

                {/* Chat */}

                <Link
                  href={`/chat/${request.id}`}
                  className="
                    flex-1
                    min-w-[220px]
                    bg-primary
                    text-white
                    py-4
                    rounded-2xl
                    text-center
                    font-extrabold
                    shadow-[0_0_35px_rgba(16,185,129,0.35)]
                    hover:scale-[1.02]
                    hover:shadow-[0_0_55px_rgba(16,185,129,0.6)]
                    transition-all
                    duration-300
                  "
                >
                  فتح المحادثة
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}