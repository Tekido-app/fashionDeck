import { ExternalLink, Star } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  store: "Amazon" | "Flipkart" | "Myntra" | "Zara" | "H&M";
  productUrl: string;
  rating?: number;
}

export function ProductCard({
  title,
  price,
  image,
  store,
  productUrl,
  rating,
}: ProductCardProps) {
  return (
    <a
      href={productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
        {/* Using standard img tag temporarily to bypass Next.js proxy issues with external images */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Store Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-sm border border-gray-100 z-10">
          {store}
        </div>

        {/* Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="bg-white/95 backdrop-blur-md px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
            View on {store}
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-medium text-gray-900 line-clamp-2 text-sm leading-relaxed mb-1 group-hover:text-black transition-colors">
            {title}
          </h3>

          {rating && (
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-500">
                {rating}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            {price}
          </span>
          <div className="p-2 bg-gray-50 rounded-full group-hover:bg-black group-hover:text-white transition-all duration-300">
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </div>
    </a>
  );
}
