import React, { useState } from 'react';

const AddCampForm = ({ onClose, onSave, campToEdit }) => {
  const [name, setName] = useState(campToEdit ? campToEdit.name : '');
  const [location, setLocation] = useState(campToEdit ? campToEdit.location : '');
  const [shortNote, setShortNote] = useState(campToEdit ? campToEdit.shortNote : '');
  const [price, setPrice] = useState(campToEdit ? campToEdit.price : '');
  const [crowdLevel, setCrowdLevel] = useState(campToEdit ? campToEdit.crowdLevel : '');
  const [pros, setPros] = useState(campToEdit ? campToEdit.pros : '');
  const [cons, setCons] = useState(campToEdit ? campToEdit.cons : '');
  const [detailedReview, setDetailedReview] = useState(campToEdit ? campToEdit.detailedReview : '');
  const [image, setImage] = useState(campToEdit ? campToEdit.image : '');
  
  const [category, setCategory] = useState(campToEdit ? campToEdit.category : 'cadir');
  const [priceType, setPriceType] = useState(campToEdit ? campToEdit.priceType : 'ucretsiz');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setImage(reader.result); };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !location || !image) {
      alert("Lütfen en azından İsim, Konum ve Resim alanlarını doldurun!");
      return;
    }

    const formData = {
      id: campToEdit ? campToEdit.id : Date.now(),
      name, location, shortNote, price, crowdLevel, pros, cons, detailedReview, image,
      category, priceType 
    };

    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <h2 className="text-3xl font-black text-gray-800 mb-6">
          {campToEdit ? "✏️ Deneyimi Güncelle" : "⛺ Yeni Deneyim Ekle"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Koy / Kamp Adı</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Konum (Şehir)</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Örn: Muğla, Türkiye" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Konaklama Türü</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400">
                <option value="cadir">⛺ Çadır Kampı</option>
                <option value="karavan">🚐 Karavan Kampı</option>
                <option value="both">⛺+🚐 Hem Çadır Hem Karavan</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Giriş Türü</label>
              <select value={priceType} onChange={(e) => setPriceType(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400">
                <option value="ucretsiz">💵 Ücretsiz </option>
                <option value="ucretli">💳 Ücretli </option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Kısa Özet Not</label>
              <input type="text" value={shortNote} onChange={(e) => setShortNote(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Detaylı Fiyat / Ücret Bilgisi</label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Örn: 450 ₺ / Gece veya Ücretsiz" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Kalabalıklık Durumu</label>
              <input type="text" value={crowdLevel} onChange={(e) => setCrowdLevel(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400" />
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Kapak Resmi Yükle</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-4 py-2 rounded-xl border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer" />
              {image && (
                <div className="mt-2 flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-100">
                  <img src={image} alt="Önizleme" className="h-12 w-20 object-cover rounded-md shadow-sm" />
                  <span className="text-xs text-emerald-600 font-bold">✓ Resim Yüklendi</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-green-700 font-semibold mb-1">✅ Artıları</label>
              <input type="text" value={pros} onChange={(e) => setPros(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-green-200 bg-green-50" />
            </div>
            <div>
              <label className="block text-red-700 font-semibold mb-1">❌ Eksileri</label>
              <input type="text" value={cons} onChange={(e) => setCons(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-red-200 bg-red-50" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Uzun Deneyim Yazısı (Detaylar)</label>
            <textarea value={detailedReview} onChange={(e) => setDetailedReview(e.target.value)} rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"></textarea>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-100 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-200">İptal</button>
            <button type="submit" className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700">
              {campToEdit ? "Değişiklikleri Kaydet" : "Günlüğe Ekle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCampForm;