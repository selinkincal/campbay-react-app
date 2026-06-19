import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-20 py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <p className="text-xl font-black text-emerald-800 tracking-tight">🏕️ CampBay Günlüğüm</p>
          <p className="text-gray-400 text-sm mt-1">Gezilen koylar, deneyimlenen maceralar ve tutulan notlar.</p>
        </div>
        
        {/* Senin Kişisel Bilgilerinin Yer Aldığı Alan */}
        <div className="text-gray-500 text-sm md:text-right bg-gray-50 md:bg-transparent p-4 md:p-0 rounded-2xl border border-gray-100 md:border-0">
          <p className="text-lg font-black text-emerald-600 mt-0.5">Selin Kıncal</p>
          <p className="text-xs text-gray-400 font-medium mt-1">
            Yazılım Mühendisliği Öğrencisi | TNC Group Eğitim-Staj Projesi
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-6 pt-6 border-t border-gray-50 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} CampBay. Tüm Hakları Saklıdır.
      </div>
    </footer>
  );
};

export default Footer;