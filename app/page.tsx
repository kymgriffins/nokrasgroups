"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  useEffect(() => {
    // Add scroll-based animations using Intersection Observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="scroll-smooth">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          poster="/nokras.jpeg"
        >
          <source src="/nokras.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Welcome to Nokras Hotels
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-8 opacity-90">
            Experience luxury and serenity in the heart of nature
          </p>
          <Link href="/booking">
            <Button size="lg" className="hero-cta bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Book Your Stay
            </Button>
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="section py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
            Discover Paradise
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Nestled amidst breathtaking landscapes, Nokras Hotels offers an unparalleled escape from the ordinary.
            Our luxurious accommodations blend seamlessly with nature, providing the perfect sanctuary for
            relaxation, adventure, and unforgettable memories.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Luxury Redefined</h3>
              <p className="text-gray-600">Experience world-class hospitality in our meticulously designed suites</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Adventure Awaits</h3>
              <p className="text-gray-600">Explore the surrounding wilderness with our curated activities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Luxury</h3>
              <p className="text-gray-600">Committed to preserving our environment while providing exceptional service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Hotels Section */}
      <section className="section py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">
            Our Premier Hotels
          </h2>
          <p className="text-xl text-gray-600 mb-16 text-center max-w-3xl mx-auto">
            Discover luxury across our four exceptional properties, each offering unique experiences in the heart of Kenya
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-lg shadow-lg bg-white">
              <Image
                src="/accommodation/1635418501-DJI_0931_1500px.jpg"
                alt="Nokras Riverine Hotel & Spa"
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-900">Nokras Riverine Hotel & Spa</h3>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Sagana, Kenya</p>
                <p className="text-sm text-gray-600 mb-4">A luxurious riverside hotel offering premium accommodations with spa facilities, located along the scenic Sagana River.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Spa & Wellness</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Swimming Pool</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Restaurant</span>
                </div>
                <Link href="/booking">
                  <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-lg bg-white">
              <Image
                src="/accommodation/1670073867-3W1A6074.jpg"
                alt="Nokras SilverOak Hotel"
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-900">Nokras SilverOak Hotel</h3>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Embu, Kenya</p>
                <p className="text-sm text-gray-600 mb-4">A modern business hotel in the heart of Embu town, offering comfortable accommodations for business and leisure travelers.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Business Center</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Conference Rooms</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Fitness Center</span>
                </div>
                <Link href="/booking">
                  <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-lg bg-white">
              <Image
                src="/accommodation/1671363606-3W1A2455.jpg"
                alt="Nokras Enkare Hotel"
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-900">Nokras Enkare Hotel</h3>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Sagana, Kenya</p>
                <p className="text-sm text-gray-600 mb-4">A scenic hotel along the Nakuru-Nairobi highway, offering breathtaking views and comfortable accommodations.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Scenic Views</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Garden</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Restaurant</span>
                </div>
                <Link href="/booking">
                  <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg shadow-lg bg-white">
              <Image
                src="/accommodation/1670503589-3W1A7171.jpg"
                alt="Nokras Murang'a Town Hotel"
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-bold text-gray-900">Nokras Murang'a Town Hotel</h3>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Murang'a, Kenya</p>
                <p className="text-sm text-gray-600 mb-4">Located in the central business district, offering convenient access to local attractions and business facilities.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">CBD Location</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Meeting Rooms</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Shopping Access</span>
                </div>
                <Link href="/booking">
                  <Button size="sm" className="bg-gray-900 text-white hover:bg-gray-800">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/booking">
              <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold">
                Explore All Hotels
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="section py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
            Activities & Experiences
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Immerse yourself in the beauty of nature with our carefully curated selection of activities
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <Image
                src="/activities/kayaking.jpg"
                alt="Kayaking"
                width={200}
                height={150}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold">Kayaking</h3>
            </div>
            <div className="text-center">
              <Image
                src="/activities/fishing.jpg"
                alt="Fishing"
                width={200}
                height={150}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold">Fishing</h3>
            </div>
            <div className="text-center">
              <Image
                src="/activities/wildlife.jpg"
                alt="Wildlife Safari"
                width={200}
                height={150}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold">Wildlife Safari</h3>
            </div>
            <div className="text-center">
              <Image
                src="/activities/pool.jpg"
                alt="Swimming Pool"
                width={200}
                height={150}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="font-semibold">Swimming</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section py-20 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready for Your Luxury Escape?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book your unforgettable experience today and create memories that will last a lifetime.
          </p>
          <Link href="/booking">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Start Booking Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
