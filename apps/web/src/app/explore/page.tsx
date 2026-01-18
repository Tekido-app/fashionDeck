import { ProductCard } from "@/components/ProductCard";

// Mock data service
const TRENDING_ITEMS = [
  {
    id: 1,
    title: "Zara Flowy Midi Dress with Ruffles - Floral Print",
    price: "₹2,490",
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    store: "Zara" as const,
    rating: 4.5,
  },
  {
    id: 2,
    title: "Black Velvet Cocktail Dress with Slit",
    price: "₹1,899",
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    store: "Amazon" as const,
    rating: 4.2,
  },
  {
    id: 3,
    title: "Summer Breeze Cotton Sundress - White",
    price: "₹999",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    store: "Flipkart" as const,
    rating: 3.8,
  },
  {
    id: 4,
    title: "Elegant Red Evening Gown - Satin Finish",
    price: "₹4,500",
    image:
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    store: "Myntra" as const,
    rating: 4.8,
  },
  {
    id: 5,
    title: "Casual Denim Shirt Dress",
    price: "₹1,299",
    image:
      "https://images.unsplash.com/photo-1551163943-3f6a29e39426?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    store: "Amazon" as const,
    rating: 4.0,
  },
  {
    id: 6,
    title: "Bohemian Maxi Dress - Earth Tones",
    price: "₹2,100",
    image:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    store: "Flipkart" as const,
    rating: 4.3,
  },
];

export default function ExplorePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-shadow mb-2">
          Explore Trending
        </h1>
        <p className="text-gray-500">
          Curated picks from top retailers just for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {TRENDING_ITEMS.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
