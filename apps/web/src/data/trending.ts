
export interface TrendingItem {
  id: number;
  title: string;
  price: string;
  image: string;
  store: "Amazon" | "Flipkart" | "Myntra" | "Zara" | "H&M";
  productUrl: string;
  rating: number;
  category: string;
}

export const TRENDING_ITEMS: TrendingItem[] = [
  {
    id: 1,
    title: "Shasmi Women's Cinched Western Dress",
    price: "₹599",
    image: "/images/products/brown-dress.jpg",
    store: "Amazon",
    productUrl: "https://www.amazon.in/Shasmi-Cinched-Western-Elegant-246/dp/B0FLK9RWQV",
    rating: 4.2,
    category: "Dresses"
  },
  {
    id: 2,
    title: "Bhadriyaa Women Kurta Pant Dupatta Set",
    price: "₹1,299",
    image: "/images/products/kurta-set.jpg",
    store: "Flipkart",
    productUrl: "https://www.flipkart.com/bhadriyaa-women-kurta-pant-dupatta-set/p/itmbea63717e9ad9?pid=ETHH44DHJSBR4ZGM",
    rating: 4.3,
    category: "Dresses"
  },
  {
    id: 3,
    title: "Globus Women Bodycon Black Midi Dress",
    price: "₹899",
    image: "/images/products/black-dress.jpg",
    store: "Flipkart",
    productUrl: "https://www.flipkart.com/globus-women-bodycon-black-midi-calf-length-dress/p/itm3abaed51a4e94?pid=DREGZENKWNSKX8HW",
    rating: 4.1,
    category: "Dresses"
  },
  {
    id: 4,
    title: "Alan Jones Women's Full Sleeve Sweatshirt",
    price: "₹649",
    image: "/images/products/black-sweatshirt.jpg",
    store: "Flipkart",
    productUrl: "https://www.flipkart.com/alan-jones-full-sleeve-solid-women-sweatshirt/p/itmf3yd56k5fwwj8?pid=SWSEY5U4HHAVUFCR",
    rating: 4.0,
    category: "T-Shirts"
  },
  {
    id: 5,
    title: "Louis Philippe Men's White Linen Shirt",
    price: "₹1,599",
    image: "/images/products/white-shirt.jpg",
    store: "Amazon",
    productUrl: "https://www.amazon.in/Louis-Philippe-Mens-Shirt-LRSFNSLPV93180_White/dp/B0D5LZ382X",
    rating: 4.4,
    category: "Shirts"
  },
  {
    id: 6,
    title: "TURN Men's Casual Striped Shirt",
    price: "₹799",
    image: "/images/products/striped-shirt.jpg",
    store: "Amazon",
    productUrl: "https://www.amazon.in/TURN-Casual-Striped-Shirt-Light/dp/B0CBX5119W",
    rating: 4.2,
    category: "Shirts"
  },
  {
    id: 7,
    title: "THALASI Aesthetic Oversized T-Shirt",
    price: "₹499",
    image: "/images/products/oversized-tshirt-1.jpg",
    store: "Amazon",
    productUrl: "https://www.amazon.in/THALASI-Aesthetic-Oversized-Jerseys-T-shirts/dp/B0FBX732Y7",
    rating: 4.3,
    category: "T-Shirts"
  },
  {
    id: 8,
    title: "Souled Store Avatar Oversized T-Shirt",
    price: "₹699",
    image: "/images/products/oversized-tshirt-2.jpg",
    store: "Amazon",
    productUrl: "https://www.amazon.in/Souled-Store-Official-Avatar-Oversized/dp/B0CSYZSC4F",
    rating: 4.5,
    category: "T-Shirts"
  }
];

