import React, { useState, useEffect } from 'react'; // 'useEffect' kancasını ekledik
import CampCard from '../Components/CampCard';
import AddCampForm from '../Components/AddCampForm';
import CampDetailsModal from '../Components/CampDetailsModal';
import HeroSlider from '../Components/HeroSlider';
import Footer from '../Components/Footer'; 

const Home = () => {
  // SİHİRLİ BAŞLANGIÇ: Sayfa ilk açıldığında tarayıcı hafızasında (localStorage) veri var mı diye bakıyoruz
  const [camps, setCamps] = useState(() => {
    const savedCamps = localStorage.getItem('campbay_diary');
    // Eğer önceden kaydedilmiş ilanlar varsa onları yükle, yoksa varsayılan bu 2 örneği getir
    return savedCamps ? JSON.parse(savedCamps) : [
      {
        id: 1,
        name: "Akyaka Orman Kampı",
        location: "Muğla, Türkiye",
        shortNote: "Çam kokuları arasında harika bir uyanış. Hem çadır hem karavan için uygun.",
        price: "450 ₺ / Gece",
        priceType: "ucretli",
        category: "both", 
        crowdLevel: "Hafta sonu çok kalabalık",
        pros: "Denize sıfır, gölgelik alan çok, temiz hava.",
        cons: "Tuvaletler sezonda yetersiz kalabiliyor, otopark sorunu var.",
        detailedReview: "Geçen yaz gittiğimde inanılmaz keyif aldım. Çadırı tam çam ağaçlarının altına kurduk. Sabah denizin sesiyle uyanmak harikaydı. Azmak nehrine yürüme mesafesinde olması büyük avantaj.",
        image: "https://images.unsplash.com/photo-1504280390267-33106d153bec?w=800"
      },
      {
        id: 2,
        name: "Cunda Cennet Koyu",
        location: "Balıkesir, Türkiye",
        shortNote: "Denizi cam gibi ama suyu biraz serin.",
        price: "Ücretsiz (Vahşi Kamp)",
        priceType: "ucretsiz",
        category: "karavan",
        crowdLevel: "Sakin ve huzurlu",
        pros: "Tamamen doğayla iç içe, inanılmaz bir gün batımı manzarası.",
        cons: "Tesis yok, suyu ve elektriği kendiniz getirmeleniz. Yolu biraz bozuk.",
        detailedReview: "Gerçek bir 'vahşi kamp' deneyimi arayanlar için muazzam. Etrafta hiçbir işletme yok, sadece siz ve doğa. Gece yıldızlar o kadar net görünüyor ki saatlerce izleyebilirsiniz.",
        image: "https://images.unsplash.com/photo-153756526675b-34db64f8fc5f?w=800"
      }
    ];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const [campToEdit, setCampToEdit] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  const [selectedPriceType, setSelectedPriceType] = useState('all'); 

  // SİHİRLİ TAKİPÇİ: 'camps' listesinde ne zaman bir değişiklik (Ekleme, Silme, Güncelleme) olsa,
  // bu fonksiyon anında tetiklenir ve listenin son halini tarayıcının kalıcı hafızasına kaydeder.
  useEffect(() => {
    localStorage.setItem('campbay_diary', JSON.stringify(camps));
  }, [camps]);

  const handleSaveCamp = (formData) => {
    if (campToEdit) {
      setCamps(camps.map(camp => camp.id === formData.id ? formData : camp));
    } else {
      setCamps([formData, ...camps]);
    }
    setCampToEdit(null);
  };

  const handleDeleteCamp = (id) => {
    setCamps(camps.filter(camp => camp.id !== id));
  };

  const handleEditClick = (camp) => {
    setCampToEdit(camp);
    setIsFormOpen(true);
  };

  const handleAddNewClick = () => {
    setCampToEdit(null);
    setIsFormOpen(true);
  };

  const filteredCamps = camps.filter(camp => {
    const matchesSearch = camp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          camp.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                            (selectedCategory === 'cadir' && (camp.category === 'cadir' || camp.category === 'both')) ||
                            (selectedCategory === 'karavan' && (camp.category === 'karavan' || camp.category === 'both')) ||
                            (selectedCategory === 'both' && camp.category === 'both');

    const matchesPriceType = selectedPriceType === 'all' || camp.priceType === selectedPriceType;
    
    return matchesSearch && matchesCategory && matchesPriceType;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CampDetailsModal camp={selectedCamp} onClose={() => setSelectedCamp(null)} />

      <nav className="bg-white shadow-sm p-6 relative z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-black text-emerald-800 tracking-tight">🏕️ CampBay Günlüğüm</h1>
          <button 
            onClick={() => setIsEditMode(!isEditMode)}
            className={`px-5 py-2.5 rounded-full font-bold transition-all duration-300 shadow-sm ${
              isEditMode ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {isEditMode ? "🔓 Yönetici Paneli" : "🔒 Gezgin Modu"}
          </button>
        </div>
      </nav>

      <HeroSlider />

      {isFormOpen && (
        <AddCampForm 
          onClose={() => { setIsFormOpen(false); setCampToEdit(null); }} 
          onSave={handleSaveCamp} 
          campToEdit={campToEdit}
        />
      )}

      <div className="max-w-3xl mx-auto w-full mb-12 px-6">
        <div className="bg-white shadow-sm rounded-2xl border border-gray-200 p-2 flex items-center mb-6 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
          <span className="text-xl pl-3 pr-2 text-gray-400">🔍</span>
          <input 
            type="text" 
            placeholder="Koy veya şehir ara..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 bg-transparent text-gray-700 placeholder-gray-400 outline-none font-medium text-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex flex-wrap gap-1.5 justify-center">
            <button onClick={() => setSelectedCategory('all')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === 'all' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>Hepsi</button>
            <button onClick={() => setSelectedCategory('cadir')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === 'cadir' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>Çadır</button>
            <button onClick={() => setSelectedCategory('karavan')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === 'karavan' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>Karavan</button>
            <button onClick={() => setSelectedCategory('both')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === 'both' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>Çadır+Karavan</button>
          </div>

          <span className="h-6 w-px bg-gray-200 hidden sm:inline"></span>

          <div className="flex flex-wrap gap-1.5 justify-center">
            <button onClick={() => setSelectedPriceType('all')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedPriceType === 'all' ? 'bg-gray-800 text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>Hepsi</button>
            <button onClick={() => setSelectedPriceType('ucretli')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedPriceType === 'ucretli' ? 'bg-gray-800 text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>Ücretli</button>
            <button onClick={() => setSelectedPriceType('ucretsiz')} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedPriceType === 'ucretsiz' ? 'bg-gray-800 text-white shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>Ücretsiz</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full flex-grow">
        {isEditMode && (
          <div className="mb-10 p-6 bg-white rounded-2xl shadow-lg border-l-4 border-amber-400 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Sistem Yönetimi Aktif</h2>
              <p className="text-gray-500 text-sm mt-1">Bu alandan yeni günlükler ekleyebilir veya mevcut olanları silebilirsin.</p>
            </div>
            <button 
              onClick={handleAddNewClick}
              className="bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg hover:bg-emerald-700 hover:-translate-y-1 transition-all duration-300"
            >
              + Yeni Deneyim Ekle
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCamps.map((camp) => (
            <CampCard 
              key={camp.id} 
              camp={camp} 
              isEditMode={isEditMode} 
              onViewDetails={setSelectedCamp}
              onDelete={handleDeleteCamp}
              onEdit={handleEditClick}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;