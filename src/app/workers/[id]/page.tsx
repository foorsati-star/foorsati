import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, Phone, CheckCircle2, Share2, Shield, CalendarDays, Clock, ThumbsUp, Image as ImageIcon } from "lucide-react";
import TestimonialCard from "@/components/ui/TestimonialCard";

export default function WorkerProfilePage({ params }: { params: { id: string } }) {
  // Mock data based on id
  const worker = {
    name: "أحمد بن علي",
    category: "كهربائي منازل",
    rating: 4.9,
    reviewsCount: 124,
    location: "ورقلة، وسط المدينة",
    joinDate: "منذ 2021",
    bio: "كهربائي محترف بخبرة تزيد عن 10 سنوات في صيانة وتركيب الأنظمة الكهربائية للمنازل والمحلات التجارية. أضمن لك جودة العمل، السرعة في الإنجاز، والأسعار التنافسية. متوفر للحالات الطارئة على مدار الساعة.",
    services: [
      { name: "تأسيس كهرباء المنازل", price: "يبدأ من 5000 د.ج" },
      { name: "صيانة وتصليح الأعطال", price: "يبدأ من 1500 د.ج" },
      { name: "تركيب الثريات والإنارة", price: "يبدأ من 1000 د.ج" },
      { name: "فحص الأسلاك والمقابس", price: "حسب التقييم" },
    ],
    verified: true,
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85164e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=600&auto=format&fit=crop",
    ],
    reviews: [
      { name: "سعيد م.", date: "قبل أسبوعين", rating: 5, service: "صيانة وتصليح الأعطال", content: "خدمة ممتازة وسريعة، محترم جداً في التعامل وحل مشكلة الكهرباء في وقت قياسي وبسعر مناسب. أنصح بالتعامل معه بشدة." },
      { name: "خالد بن صالح", date: "قبل شهر", rating: 5, service: "تركيب الثريات والإنارة", content: "تم تركيب الإضاءة للصالون بشكل احترافي. دقة في المواعيد وعمل نظيف. شكرا لك أحمد." },
      { name: "عبد النور", date: "قبل شهرين", rating: 4, service: "تأسيس كهرباء المنازل", content: "عمل جيد ومتقن، الأسعار معقولة مقارنة بالسوق. تأخر قليلا عن الموعد لكنه أنجز العمل في الوقت المطلوب." }
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link href="/workers" className="hover:text-primary transition-colors">الحرفيين</Link>
          <span>/</span>
          <span className="text-slate-800">{worker.name}</span>
        </nav>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info - Left (RTL so it's technically Right visually) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Header Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                
                <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-slate-100 rounded-2xl overflow-hidden relative border-4 border-white shadow-lg mx-auto md:mx-0">
                  <Image src={worker.image} alt={worker.name} fill className="object-cover" />
                </div>
                
                <div className="flex-1 text-center md:text-right w-full">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-2">
                      {worker.name}
                      {worker.verified && <CheckCircle2 className="w-6 h-6 text-green-600 fill-green-50" />}
                    </h1>
                    <button className="hidden md:flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors bg-slate-50 px-4 py-2 rounded-xl text-sm font-medium hover:bg-slate-100">
                      <Share2 className="w-4 h-4" />
                      مشاركة
                    </button>
                  </div>
                  
                  <p className="text-lg text-primary font-bold mb-4">{worker.category}</p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-3 text-sm text-slate-600 mb-6 font-medium">
                    <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <span className="font-bold text-amber-700">{worker.rating}</span>
                      <span className="text-amber-600/80">({worker.reviewsCount} تقييم)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-5 h-5 text-slate-400" />
                      <span>{worker.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="w-5 h-5 text-slate-400" />
                      <span>{worker.joinDate}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons for Mobile */}
                  <div className="grid grid-cols-2 gap-3 md:hidden">
                    <button className="flex items-center justify-center gap-2 bg-primary text-white py-3.5 px-4 rounded-xl font-bold shadow-sm shadow-primary/20 hover:bg-primary-800 transition-colors">
                      <Phone className="w-5 h-5 shrink-0" />
                      اتصال
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 px-4 rounded-xl font-bold shadow-sm hover:bg-[#20bd5a] transition-colors">
                      <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                      </svg>
                      واتساب
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
            
            {/* About */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">نبذة عني</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                {worker.bio}
              </p>
            </div>
            
            {/* Services & Prices */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">الخدمات والأسعار</h2>
              <div className="space-y-3">
                {worker.services.map((service, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-primary/20 transition-colors bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-bold text-slate-800">{service.name}</span>
                    </div>
                    <span className="text-sm font-bold text-primary bg-primary-50 px-3 py-1.5 rounded-lg">
                      {service.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gallery */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-slate-400" />
                  معرض الأعمال
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {worker.gallery.map((img, idx) => (
                  <div key={idx} className="relative h-32 md:h-48 rounded-xl overflow-hidden group cursor-pointer">
                    <Image src={img} alt={`عمل ${idx + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-slate-900">تقييمات العملاء</h2>
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-lg">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-amber-700 text-lg">{worker.rating}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {worker.reviews.map((review, idx) => (
                  <TestimonialCard key={idx} {...review} />
                ))}
              </div>
              
              <button className="w-full mt-6 py-3.5 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                عرض كل التقييمات ({worker.reviewsCount})
              </button>
            </div>
            
          </div>
          
          {/* Sidebar - Sticky Action Panel */}
          <aside className="w-full">
            <div className="sticky top-24 space-y-6">
              
              {/* Contact Card */}
              <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6">
                <h3 className="font-bold text-slate-900 mb-6 text-lg">تواصل مع الحرفي</h3>
                
                <div className="space-y-3 mb-6 hidden md:block">
                  <button className="w-full flex items-center justify-center gap-3 bg-primary text-white py-4 px-4 rounded-xl font-bold shadow-sm shadow-primary/20 hover:bg-primary-800 transition-all hover:-translate-y-0.5">
                    <Phone className="w-5 h-5 shrink-0" />
                    إظهار رقم الهاتف
                  </button>
                  <button className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 px-4 rounded-xl font-bold shadow-sm hover:bg-[#20bd5a] transition-all hover:-translate-y-0.5">
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                    </svg>
                    مراسلة عبر واتساب
                  </button>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-slate-500 bg-slate-50 p-4 rounded-xl">
                  <Clock className="w-5 h-5 text-primary shrink-0" />
                  <p>عادة ما يرد خلال <span className="font-bold text-slate-700">ساعة واحدة</span></p>
                </div>
              </div>
              
              {/* Trust Card */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50/20 rounded-2xl border border-green-100 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-slate-800 text-lg">ضمان فرصتي</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">
                  نحن نضمن جودة العمل وحفظ حقوقك عند حجز الخدمة والتواصل من خلال منصة فرصتي.
                </p>
                <Link href="/trust" className="text-sm font-bold text-primary hover:underline">
                  اعرف المزيد عن سياسة الضمان
                </Link>
              </div>
              
            </div>
          </aside>
          
        </div>
      </div>
    </div>
  );
}
