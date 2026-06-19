import React from 'react';

const CampCard = ({ camp, isEditMode, onViewDetails, onDelete, onEdit }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col h-full relative group">
      
      {/* Gelişmiş Kategori Etiket Yapısı */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5">
        <span className="bg-emerald-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md uppercase">
          {camp.category === 'cadir' ? '⛺ Çadır' : camp.category === 'karavan' ? '🚐 Karavan' : '⛺+🚐 Çadır & Karavan'}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-md uppercase backdrop-blur-md text-white ${
          camp.priceType === 'ucretsiz' ? 'bg-amber-500/90' : 'bg-blue-600/90'
        }`}>
          {camp.priceType === 'ucretsiz' ? '💵 Ücretsiz' : '💳 Ücretli'}
        </span>
      </div>

      {/* Kamp Resmi */}
      <div className="relative overflow-hidden cursor-pointer h-52" onClick={() => onViewDetails(camp)}>
        <img 
          src={camp.image} 
          alt={camp.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
          <span className="bg-white text-gray-800 px-4 py-2 rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl text-sm">
            Detayları Oku
          </span>
        </div>
      </div>
      
      {/* Kart İçeriği */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-gray-800 tracking-tight">{camp.name}</h3>
        <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">📍 {camp.location}</p>
        <p className="text-gray-600 mt-4 italic line-clamp-2 flex-grow text-sm">"{camp.shortNote}"</p>
        
        {isEditMode && (
          <div className="mt-6 pt-4 flex gap-2 border-t border-gray-100">
            <button 
              onClick={() => onEdit(camp)}
              className="flex-1 bg-blue-50 text-blue-600 px-3 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-100 transition-colors"
            >
              Düzenle
            </button>
            <button 
              onClick={() => onDelete(camp.id)} 
              className="flex-1 bg-red-50 text-red-600 px-3 py-2.5 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors"
            >
              Sil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampCard;