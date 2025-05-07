import React, { useState, useEffect } from 'react';
import { User, Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Karim",
      location: "Casablanca",
      text: "J'utilise Toora.ma tous les jours pour me rendre au travail. C'est rapide, économique et je me sens bien de contribuer à un environnement plus propre.",
      rating: 5,
      color: "bg-emerald-400"
    },
    {
      name: "Fatima",
      location: "Rabat",
      text: "L'application est super intuitive et les trottinettes sont toujours en bon état. Je recommande vivement!",
      rating: 5,
      color: "bg-indigo-400"
    },
    {
      name: "Ahmed",
      location: "Marrakech",
      text: "Fini les problèmes de stationnement et les embouteillages! Toora.ma a changé ma façon de me déplacer en ville.",
      rating: 5,
      color: "bg-amber-400"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <Quote className="text-emerald-500 mb-4" size={36} />
          <h2 className="text-4xl font-bold text-center mb-3 text-slate-800">Ce que disent nos utilisateurs</h2>
          <div className="w-24 h-1 bg-emerald-500 rounded-full"></div>
        </div>

        <div className="relative">
          {/* Testimonial cards */}
          <div className="relative h-96 overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute w-full transition-all duration-500 ease-in-out ${
                  index === activeIndex
                    ? "opacity-100 translate-x-0"
                    : index < activeIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="grid md:grid-cols-5">
                    {/* Avatar side */}
                    <div className={`${testimonial.color} p-8 md:col-span-2 flex flex-col justify-center items-center`}>
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-4">
                        <User size={40} className="text-slate-700" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-1">{testimonial.name}</h3>
                      <p className="text-white opacity-90">{testimonial.location}</p>
                      <div className="flex mt-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={16} className="text-white fill-white mr-1" />
                        ))}
                      </div>
                    </div>
                    
                    {/* Content side */}
                    <div className="p-8 md:col-span-3 flex flex-col justify-center">
                      <div className="text-3xl font-serif text-slate-800 mb-6">"</div>
                      <p className="text-slate-600 text-lg italic mb-6">
                        {testimonial.text}
                      </p>
                      <div className="text-3xl font-serif text-slate-800 self-end">"</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 bg-white p-2 rounded-full shadow-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <ChevronLeft size={24} className="text-slate-700" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 bg-white p-2 rounded-full shadow-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <ChevronRight size={24} className="text-slate-700" />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full transition-all ${
                index === activeIndex ? "bg-emerald-500 w-8" : "bg-slate-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;