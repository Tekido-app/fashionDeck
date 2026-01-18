import { ShoppingCart, ExternalLink } from "lucide-react";

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  store: "Amazon" | "Flipkart" | "Myntra" | "Zara";
  rating?: number;
}

export function ProductCard({
  title,
  price,
  image,
  store,
  rating,
}: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
          {store}
        </div>
        <button className="absolute bottom-3 right-3 p-2 bg-black text-white rounded-full translate-y-12 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 line-clamp-2 text-sm leading-relaxed">
            {title}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-black">{price}</span>
          {rating && (
            <div className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
              <span>★</span>
              <span>{rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
