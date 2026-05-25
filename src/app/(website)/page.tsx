import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star, Shield, Clock, ThumbsUp, Wrench, Zap, Paintbrush, Truck, Droplets } from "lucide-react";
import LocationSelect from "@/components/ui/LocationSelect";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="absolute inset-0 bg-primary-900/5 -z-10" />
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-800 text-sm font-medium mb-6">
                المنصة الأولى للحرفيين في ورقلة
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-[4rem] leading-[1.15] font-bold text-slate-800 tracking-tight mb-8">
                اعثر على <span className="text-primary">أمهر الحرفيين</span><br className="hidden md:block" /> لمشروعك القادم
              </h1>
              <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl leading-relaxed font-medium">
                منصة فرصتي تربطك بأفضل العمال والحرفيين المحليين الموثوقين في مجالات الكهرباء، السباكة، البناء والمزيد.
              </p>
              
              {/* Search Box */}
              <div className="bg-white p-2 rounded-2xl shadow-lg shadow-slate-200/50 flex flex-col md:flex-row gap-2 max-w-2xl relative z-40">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="ما الخدمة التي تبحث عنها؟ (مثال: كهربائي)"
                    className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400 text-sm md:text-base"
                  />
                </div>
                <LocationSelect />
                <button className="bg-primary hover:bg-primary-800 text-white px-8 py-3 rounded-xl font-medium transition-colors whitespace-nowrap">
                  بحث
                </button>
              </div>
              
              <div className="mt-8 flex items-center gap-4 text-sm text-slate-500 font-medium">
                <span>شائع الآن:</span>
                <Link href="/workers?category=electrician" className="hover:text-primary underline decoration-slate-300 underline-offset-4">كهربائي</Link>
                <Link href="/workers?category=plumber" className="hover:text-primary underline decoration-slate-300 underline-offset-4">سباك</Link>
                <Link href="/workers?category=builder" className="hover:text-primary underline decoration-slate-300 underline-offset-4">بناء</Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="/hero.png" 
                  alt="حرفي محترف في عمله" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
              {/* Trust Badge overlay */}
              <div className="absolute -bottom-6 -right-6 md:-left-8 md:right-auto bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">حرفيون موثوقون</p>
                  <p className="text-sm text-slate-500">تم التحقق من هويتهم</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">تصفح حسب الخدمة</h2>
            <p className="text-slate-500">اختر من بين مجموعة واسعة من الخدمات المهنية</p>
          </div>
          <Link href="/categories" className="hidden md:inline-flex text-primary font-medium hover:underline underline-offset-4 items-center gap-1">
            عرض الكل
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {[
            { id: 'electrician', name: 'كهرباء', icon: Zap, count: 42, color: 'text-amber-500', bg: 'bg-amber-50' },
            { id: 'plumber', name: 'سباكة', icon: Droplets, count: 38, color: 'text-blue-500', bg: 'bg-blue-50' },
            { id: 'builder', name: 'بناء ومقاولات', icon: Wrench, count: 56, color: 'text-stone-500', bg: 'bg-stone-50' },
            { id: 'painter', name: 'دهان وصباغة', icon: Paintbrush, count: 24, color: 'text-rose-500', bg: 'bg-rose-50' },
            { id: 'moving', name: 'نقل عفش', icon: Truck, count: 18, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          ].map((cat) => (
            <Link key={cat.id} href={`/workers?category=${cat.id}`} className="group block p-6 bg-white rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all text-center">
              <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 ${cat.bg} group-hover:scale-110 transition-transform`}>
                <cat.icon className={`w-7 h-7 ${cat.color}`} />
              </div>
              <h3 className="font-bold text-slate-800 mb-1">{cat.name}</h3>
              <p className="text-sm text-slate-400">{cat.count} حرفي</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Workers */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">أمهر الحرفيين في منطقتك</h2>
            <p className="text-slate-600">
              تعرف على الحرفيين الأعلى تقييمًا والذين حازوا على ثقة عملائنا في ورقلة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-xl transition-all group cursor-pointer">
                <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-slate-200">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                    صورة الحرفي
                  </div>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">أحمد بن علي</h3>
                    <p className="text-sm text-slate-500">كهربائي منازل</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-amber-700">4.9</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>ورقلة، وسط المدينة</span>
                </div>
                <Link href={`/workers/${i}`} className="block w-full py-2.5 text-center text-sm font-medium text-primary bg-primary-50 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                  عرض الملف
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/workers" className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 rounded-full font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              تصفح المزيد من الحرفيين
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">كيف تعمل منصة فرصتي؟</h2>
          <p className="text-slate-600">خطوات بسيطة وسريعة للحصول على أفضل خدمة لمشروعك</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Search, title: '1. ابحث عن حرفي', desc: 'تصفح قائمة الحرفيين المحترفين في منطقتك حسب نوع الخدمة المطلوبة.' },
            { icon: Clock, title: '2. تواصل بسهولة', desc: 'اختر الحرفي المناسب وتواصل معه مباشرة للاتفاق على التفاصيل والسعر.' },
            { icon: ThumbsUp, title: '3. أنجز عملك', desc: 'احصل على الخدمة المطلوبة بجودة عالية ثم قم بتقييم الحرفي لمساعدة الآخرين.' }
          ].map((step, idx) => (
            <div key={idx} className="text-center px-4">
              <div className="w-16 h-16 mx-auto bg-primary-50 text-primary rounded-2xl flex items-center justify-center mb-6 relative">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="bg-primary rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-right">
            <div className="max-w-xl text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">هل أنت حرفي محترف؟</h2>
              <p className="text-primary-100 text-lg mb-0">
                انضم إلى منصة فرصتي اليوم ووسع قاعدة عملائك. سجل مجاناً وابدأ في استقبال طلبات العمل من سكان منطقتك.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-4">
              <Link href="/join" className="bg-white text-primary hover:bg-slate-50 px-8 py-4 rounded-xl font-bold text-lg transition-colors">
                سجل كحرفي الآن
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
