import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  date: string;
  rating: number;
  content: string;
  service: string;
}

export default function TestimonialCard({
  name,
  date,
  rating,
  content,
  service,
}: TestimonialCardProps) {
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-lg">
            {name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-slate-800">{name}</h4>
            <p className="text-xs text-slate-500 mt-0.5">{date}</p>
          </div>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
      
      <p className="text-slate-600 text-sm leading-relaxed mb-4">
        "{content}"
      </p>
      
      <div className="inline-block bg-slate-50 text-slate-500 text-xs px-3 py-1.5 rounded-lg font-medium">
        الخدمة: {service}
      </div>
    </div>
  );
}
