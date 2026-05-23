import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ShieldCheck } from "lucide-react";

interface WorkerCardProps {
  id: string;
  name: string;
  profession: string;
  rating: number;
  reviewsCount: number;
  location: string;
  image: string;
  isVerified?: boolean;
}

export default function WorkerCard({
  id,
  name,
  profession,
  rating,
  reviewsCount,
  location,
  image,
  isVerified = true,
}: WorkerCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group cursor-pointer flex flex-col h-full">
      <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden mb-4 bg-slate-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {isVerified && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span className="text-xs font-bold text-slate-800">موثوق</span>
          </div>
        )}
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">{profession}</p>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg shrink-0">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-sm font-bold text-amber-700">{rating}</span>
            <span className="text-xs text-amber-600/70 ml-0.5">({reviewsCount})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-5">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>
      </div>
      
      <div className="pt-4 border-t border-slate-50 mt-auto flex gap-2">
        <Link 
          href={`/workers/${id}`} 
          className="flex-1 py-2.5 text-center text-sm font-bold text-primary bg-primary-50 rounded-xl hover:bg-primary hover:text-white transition-colors"
        >
          عرض الملف
        </Link>
        <button 
          className="flex items-center justify-center w-10 h-10 bg-[#25D366]/10 text-[#25D366] rounded-xl hover:bg-[#25D366] hover:text-white transition-colors shrink-0"
          title="تواصل عبر واتساب"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
