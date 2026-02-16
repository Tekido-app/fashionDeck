"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, ArrowRight, Instagram, Twitter } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-editorial-white text-editorial-text font-sans selection:bg-editorial-accent/30 w-full overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-editorial-white/90 backdrop-blur-md border-b border-editorial-divider transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="font-serif text-2xl tracking-tight font-medium hover:opacity-80 transition-opacity"
            >
              FashionDeck
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/explore"
              className="text-sm font-medium text-editorial-text-muted hover:text-editorial-text transition-colors"
            >
              Explore
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-editorial-text-muted hover:text-editorial-text transition-colors"
            >
              How it works
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-editorial-text-muted hover:text-editorial-text transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="/app"
              className="text-sm font-medium border-b border-editorial-text pb-0.5 hover:border-editorial-text-muted hover:text-editorial-text-muted transition-all"
            >
              Try for free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
              Tell us the vibe. <br />
              We build the outfit.
            </h1>
            <p className="text-lg md:text-xl text-editorial-text-muted max-w-md leading-relaxed">
              Turn natural language requests into ready-to-buy outfits from
              Amazon and Flipkart. No scrolling. No filters. Just the look.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <Link
                href="/app"
                className="bg-editorial-text text-editorial-white px-8 py-4 text-sm font-medium hover:bg-editorial-text-muted hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center shadow-sm hover:shadow-md"
              >
                Try for free
              </Link>
              <Link
                href="/explore"
                className="text-sm border-b border-gray-300 pb-1 hover:border-editorial-text transition-all"
              >
                Explore Trending
              </Link>
            </div>

            {/* Social Proof Teaser */}
            <div className="pt-8 flex items-center gap-4 text-xs text-editorial-text-muted/60 border-t border-editorial-divider w-max">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                  >
                    <Image
                      src={`/avatar-${i}.png`}
                      alt={`User ${i}`}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <p>Trusted by 2,000+ early users</p>
            </div>
          </div>

          <div className="relative order-1 lg:order-2 aspect-[4/5] bg-gray-100 overflow-hidden group">
            <Image
              src="/hero-collage.jpg"
              alt="Fashion Editorial"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
        </div>
      </section>

      {/* Ticker / Marquee - Content Expansion */}
      <div className="border-y border-editorial-divider py-4 overflow-hidden bg-editorial-white">
        <div className="flex gap-12 animate-marquee whitespace-nowrap text-editorial-text-muted/40 uppercase text-xs tracking-[0.2em] font-medium items-center justify-center">
          <span>Korean Minimal</span> • <span>Y2K Streetwear</span> •{" "}
          <span>Old Money</span> • <span>Gorpcore</span> •{" "}
          <span>Vintage Americana</span> • <span>Scandinavian</span> •{" "}
          <span>Acubi</span> • <span>Preppy</span> • <span>Avant Garde</span> •{" "}
          <span>Techwear</span>
        </div>
      </div>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16">
            <h2 className="font-serif text-3xl md:text-5xl mb-4">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="space-y-3">
              <span className="font-serif text-4xl md:text-5xl text-gray-200">
                01
              </span>
              <h3 className="text-lg md:text-xl font-medium">
                Describe the vibe
              </h3>
              <p className="text-sm text-editorial-text-muted leading-relaxed">
                Type something like &quot;korean minimal fit, size M, under
                1500&quot; or &quot;90s vintage streetwear&quot;.
              </p>
            </div>
            <div className="space-y-3">
              <span className="font-serif text-4xl md:text-5xl text-gray-200">
                02
              </span>
              <h3 className="text-lg md:text-xl font-medium">
                We build the outfit
              </h3>
              <p className="text-sm text-editorial-text-muted leading-relaxed">
                Our system matches your aesthetic using real products from
                multiple marketplaces like Amazon & Flipkart.
              </p>
            </div>
            <div className="space-y-3">
              <span className="font-serif text-4xl md:text-5xl text-gray-200">
                03
              </span>
              <h3 className="text-lg md:text-xl font-medium">
                Buy it instantly
              </h3>
              <p className="text-sm text-editorial-text-muted leading-relaxed">
                Get distinct, complete outfits sourced directly from leading
                retailers with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gray-50 border-y border-editorial-divider">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
                Designed for how people actually shop.
              </h2>
              <p className="text-editorial-text-muted leading-relaxed max-w-sm">
                Forget opening 20 tabs. We do the hunting, matching, and
                budget-checking for you.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
              <div className="group cursor-default">
                <h3 className="font-medium text-lg mb-2 group-hover:text-editorial-text transition-colors">
                  Aesthetic-first shopping
                </h3>
                <p className="text-sm text-editorial-text-muted leading-relaxed">
                  Shop by vibes: Korean, Y2K, Minimal, Streetwear, Vintage.
                </p>
              </div>
              <div className="group cursor-default">
                <h3 className="font-medium text-lg mb-2 group-hover:text-editorial-text transition-colors">
                  Cross-marketplace results
                </h3>
                <p className="text-sm text-editorial-text-muted leading-relaxed">
                  Get the best combo from Amazon and Flipkart in one place.
                </p>
              </div>
              <div className="group cursor-default">
                <h3 className="font-medium text-lg mb-2 group-hover:text-editorial-text transition-colors">
                  Budget & size aware
                </h3>
                <p className="text-sm text-editorial-text-muted leading-relaxed">
                  Filter by price and size automatically in your prompt.
                </p>
              </div>
              <div className="group cursor-default">
                <h3 className="font-medium text-lg mb-2 group-hover:text-editorial-text transition-colors">
                  Complete outfits
                </h3>
                <p className="text-sm text-editorial-text-muted leading-relaxed">
                  Not just single items, full cohesive looks that work together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Output / Inspiration */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl">
            Outfits you can actually buy
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1 */}
          <Link href="/explore" className="group cursor-pointer block">
            <div className="aspect-[4/5] bg-gray-100 relative mb-4 overflow-hidden">
              <Image
                src="/outfit-korean.jpg"
                alt="Korean Minimal Outfit"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium group-hover:underline decoration-1 underline-offset-4">
                  Korean Minimal
                </h3>
                <p className="text-sm text-gray-500 mt-1">~ ₹3,500</p>
              </div>
              <ArrowRight
                size={18}
                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-editorial-text"
              />
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/explore" className="group cursor-pointer block">
            <div className="aspect-[4/5] bg-gray-100 relative mb-4 overflow-hidden">
              <Image
                src="/outfit-streetwear.jpg"
                alt="Urban Streetwear Outfit"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium group-hover:underline decoration-1 underline-offset-4">
                  Urban Streetwear
                </h3>
                <p className="text-sm text-gray-500 mt-1">~ ₹4,200</p>
              </div>
              <ArrowRight
                size={18}
                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-editorial-text"
              />
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/explore" className="group cursor-pointer block">
            <div className="aspect-[4/5] bg-gray-100 relative mb-4 overflow-hidden">
              <Image
                src="/outfit-vintage.jpg"
                alt="Vintage Casual Outfit"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium group-hover:underline decoration-1 underline-offset-4">
                  Vintage Casual
                </h3>
                <p className="text-sm text-gray-500 mt-1">~ ₹2,800</p>
              </div>
              <ArrowRight
                size={18}
                className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-editorial-text"
              />
            </div>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/app"
            className="inline-block border border-editorial-text px-8 py-3 text-sm font-medium hover:bg-editorial-text hover:text-white transition-all uppercase tracking-wide"
          >
            Generate your own look
          </Link>
        </div>
      </section>

      {/* Marketplaces */}
      <section className="py-16 md:py-24 px-4 md:px-6 border-t border-editorial-divider text-center bg-gray-50/50">
        <div className="max-w-4xl mx-auto">
          <p className="text-editorial-text-muted mb-8 text-xs uppercase tracking-widest">
            Direct integration with
          </p>

          <div className="flex justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* Amazon Logo Placeholder */}
            <span className="text-2xl md:text-3xl font-bold tracking-tight hover:scale-110 transition-transform duration-300 cursor-pointer">
              amazon
            </span>
            <span className="h-8 w-px bg-gray-300"></span>
            {/* Flipkart Logo Placeholder */}
            <span className="text-2xl md:text-3xl font-bold italic text-blue-600 hover:scale-110 transition-transform duration-300 cursor-pointer">
              Flipkart
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-16 md:py-24 px-4 md:px-6 bg-editorial-white border-t border-editorial-divider"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "How does it work?",
                a: "Describe your desired look, budget, and size in plain English. We search top retailers to build a complete outfit that matches your request.",
              },
              {
                q: "Where do the products come from?",
                a: "We currently source products from Amazon and Flipkart to ensure fast delivery and reliable service. More retailers are coming soon.",
              },
              {
                q: "Do you sell the items directly?",
                a: "No, we are a discovery platform. We provide direct links to purchase items from the respective retailers, so you buy from them directly.",
              },
              {
                q: "Which sizes do you support?",
                a: "You can specify any standard size (XS to XXL) in your prompt, and we'll filter for available items to ensure a perfect fit.",
              },
              {
                q: "Is it free to use?",
                a: "Yes, FashionDeck is completely free to use for outfit generation and discovery. We might introduce premium features later.",
              },
            ].map((item, i) => (
              <FaqItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Redesigned */}
      <footer className="py-20 px-4 md:px-6 border-t border-editorial-divider bg-editorial-text text-editorial-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 mb-16">
            <div>
              <h3 className="font-serif text-3xl md:text-4xl mb-6">
                Stay in style.
              </h3>
              <p className="text-gray-400 max-w-sm mb-8">
                Join our newsletter for weekly outfit inspo and new feature
                updates.
              </p>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-white/10 border-white/10 text-white placeholder-gray-500 px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-white/30"
                />
                <button className="bg-white text-editorial-text px-6 py-3 font-medium hover:bg-gray-200 transition-colors">
                  Join
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <h4 className="text-white/40 uppercase tracking-widest text-xs mb-6">
                  Explore
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/app"
                      className="hover:text-white text-gray-400 transition-colors"
                    >
                      Outfit Generator
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#how-it-works"
                      className="hover:text-white text-gray-400 transition-colors"
                    >
                      How it Works
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white text-gray-400 transition-colors"
                    >
                      Style Guide
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white/40 uppercase tracking-widest text-xs mb-6">
                  Company
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white text-gray-400 transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white text-gray-400 transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white text-gray-400 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-white/40 uppercase tracking-widest text-xs mb-6">
                  Social
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white text-gray-400 transition-colors flex items-center gap-2"
                    >
                      <Instagram size={16} /> Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-white text-gray-400 transition-colors flex items-center gap-2"
                    >
                      <Twitter size={16} /> Twitter
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; 2026 FashionDeck. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-gray-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Simple Accordion Component for FAQ
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-editorial-divider bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-lg">{question}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 text-gray-400 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="p-6 pt-0 text-editorial-text-muted leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}
