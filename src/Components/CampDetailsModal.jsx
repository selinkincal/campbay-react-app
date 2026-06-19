import React from 'react';

const CampDetailsModal = ({ camp, onClose }) => {
  if (!camp) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 transition-opacity backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Kapat Butonu */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md z-10 font-bold w-10 h-10 flex items-center justify-center"
        >
          X
        </button>

        {/* Kapak Resmi */}
        <img src={camp.image} alt={camp.name} className="w-full h-72 object-cover" />

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-800">{camp.name}</h2>
              <p className="text-gray-500 font-medium text-lg mt-1">📍 {camp.location}</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-xl font-bold text-lg">
                {camp.price}
              </span>
              <p className="text-sm text-gray-500 mt-1">👥 {camp.crowdLevel}</p>
            </div>
          </div>

          {/* Deneyim Yazısı */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-3">📝 Deneyim Notlarım</h3>
            <p className="text-gray-600 leading-relaxed bg-gray-50 p-5 rounded-2xl border border-gray-100">
              {camp.detailedReview}
            </p>
          </div>

          {/* Artılar ve Eksiler */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
              <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">✅ Artıları</h3>
              <p className="text-green-700 text-sm">{camp.pros}</p>
            </div>
            <div className="bg-red-50 p-5 rounded-2xl border border-red-100">
              <h3 className="font-bold text-red-800 mb-2 flex items-center gap-2">❌ Eksileri</h3>
              <p className="text-red-700 text-sm">{camp.cons}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampDetailsModal;