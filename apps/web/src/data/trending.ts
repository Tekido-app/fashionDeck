
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
    title: "Vero Moda Women's Floral A-Line Dress",
    price: "₹1,499",
    image: "https://m.media-amazon.com/images/I/71rQ+P-p+bL._SY879_.jpg",
    store: "Amazon",
    productUrl: "https://www.amazon.in/Vero-Moda-Womens-A-Line-Dress/dp/B08J3N5F6H",
    rating: 4.4,
    category: "Dresses"
  },
  {
    id: 2,
    title: "Dennis Lingo Men's Slim Fit Casual Shirt",
    price: "₹699",
    image: "https://m.media-amazon.com/images/I/618Wek95laL._SX679_.jpg",
    store: "Amazon",
    productUrl: "https://www.amazon.in/Dennis-Lingo-Solid-Casual-Shirt/dp/B07K816G5Z",
    rating: 4.1,
    category: "Shirts"
  },
  {
    id: 3,
    title: "Tokyo Talkies Women Black Floral Print Maxi Dress",
    price: "₹899",
    image: "https://rukminim2.flixcart.com/image/832/832/xif0q/dress/z/s/i/s-tt-d-6655-black-tokyo-talkies-original-imagm2h2z5z5z5z5.jpeg?q=70",
    store: "Flipkart",
    productUrl: "https://www.flipkart.com/tokyo-talkies-women-maxi-black-dress/p/itmf3z5z5z5z5z5z",
    rating: 4.3,
    category: "Dresses"
  },
  {
    id: 4,
    title: "Levi's Men's 511 Slim Fit Jeans",
    price: "₹2,199",
    image: "https://m.media-amazon.com/images/I/81+dJo-0lUL._SX679_.jpg",
    store: "Amazon",
    productUrl: "https://www.amazon.in/Levis-Mens-Slim-Jeans-18298-1144_Blue/dp/B07MQ7XW44",
    rating: 4.5,
    category: "Jeans"
  },
  {
    id: 5,
    title: "Rare Women's Synthetic a-line Knee-Long Dress",
    price: "₹959",
    image: "https://m.media-amazon.com/images/I/71Y+I2-yM+L._SX679_.jpg",
    store: "Amazon",
    productUrl: "https://www.amazon.in/Rare-Womens-Synthetic-a-line-Knee-Long/dp/B07H3P4X3S",
    rating: 4.0,
    category: "Dresses"
  },
  {
    id: 6,
    title: "Adidas Originals Men's T-Shirt",
    price: "₹1,299",
    image: "https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/25169002/2023/9/26/d28302f3-8b77-4b7b-9993-9609657619221695707758652-ADIDAS-Originals-Men-Tshirts-2071695707758210-1.jpg",
    store: "Myntra",
    productUrl: "https://www.myntra.com/tshirts/adidas-originals/adidas-originals-men-trefoil-essentials-t-shirt/25169002/buy",
    rating: 4.6,
    category: "T-Shirts"
  },
  {
    id: 7,
    title: "Zara Ruffled Linen Blend Dress",
    price: "₹2,990",
    image: "https://static.zara.net/photos///2023/I/0/1/p/8342/227/250/2/w/850/8342227250_1_1_1.jpg?ts=1688033622435",
    store: "Zara",
    productUrl: "https://www.zara.com/in/en/ruffled-linen-blend-dress-p08342227.html",
    rating: 4.7,
    category: "Dresses"
  },
  {
    id: 8,
    title: "H&M Regular Fit Linen-blend Shirt",
    price: "₹1,999",
    image: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ff5%2F3b%2Ff53ba63012973167448358485200385966453625.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bmen_shirts_casual%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",
    store: "H&M",
    productUrl: "https://www2.hm.com/en_in/productpage.1066896001.html",
    rating: 4.5,
    category: "Shirts"
  }
];
