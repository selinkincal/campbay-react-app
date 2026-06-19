import React, { useState, useEffect } from 'react';

const HeroSlider = () => {
  // Slider'da dönecek muazzam doğa fotoğrafları ve yazılarımız
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1600",
      title: "Doğanın Kalbine Yolculuk",
      subtitle: "Keşfedilmemiş koylar ve huzur dolu ormanlar seni bekliyor."
    },
    {
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=1600",
      title: "Yıldızların Altında Uyu",
      subtitle: "Şehrin gürültüsünden uzak, gerçek vahşi kamp deneyimleri."
    },
    {
      image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?w=1600",
      title: "Sonsuz Mavilik",
      subtitle: "Türkiye'nin en gizli ve el değmemiş kamp alanlarını keşfet."
    }
  ];

  const [current, setCurrent] = useState(0);

  // 5 saniyede bir fotoğrafı otomatik değiştiren zamanlayıcı (Sihir burada)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    // Ekranın büyük kısmını kaplayan, alt köşeleri yuvarlak havalı çerçeve
    <div className="relative w-full h-[60vh] overflow-hidden rounded-b-[3rem] shadow-2xl mb-12">
      
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Yazılar okunsun diye resmin üstüne hafif siyah bir tül (overlay) atıyoruz */}
          <div className="absolute inset-0 bg-black/40 z-10" /> 
          
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          
          {/* Ortadaki Yazılar */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-white text-center px-4">
            <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl font-medium drop-shadow-lg max-w-2xl text-gray-100">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}
      
      {/* Alt taraftaki küçük navigasyon noktaları */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-white scale-150" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;