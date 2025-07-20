import { useState, useCallback, useMemo, useContext } from "react";
//import CreateAnnonce from "./CreateAnnonce";
import CreateAnnonce from "./CreateAnnonceForm";
import AnnonceCard from "./AnnonceCard";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const AnnoncesListing = () => {
  const { lang } = useContext(LanguageContext);
  const [annonces, setAnnonces] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddAnnonce = useCallback((newAnnonce) => {
    setIsLoading(true);
    setTimeout(() => {
      const adaptedAnnonce = {
        id: Date.now(),
        title: newAnnonce.title || t[lang].annonceListing.add,
        location: newAnnonce.city || "",
        price: newAnnonce.price ? `${newAnnonce.price.toLocaleString()} MAD` : "",
        brand: newAnnonce.brand || "",
        model: newAnnonce.model || "",
        transmission: newAnnonce.transmission || "",
        door: newAnnonce.doors || 4,
        time: "À l'instant",
        slideImg: newAnnonce.photos?.length > 0 ? newAnnonce.photos : ["https://via.placeholder.com/300x250?text=Aucune+image"],
        source: {
          label: newAnnonce.condition === "neuf" ? "Neuf" : "Occasion",
          color: newAnnonce.condition === "neuf" ? "#00a86b" : "#2196f3"
        },
        storeName: "",
        tag: newAnnonce.isUrgent ? "Urgent" : "",
        delayAnimation: 0,
        year: newAnnonce.year || new Date().getFullYear(),
        mileage: newAnnonce.mileage || 0,
        fuel: newAnnonce.fuel || "",
        createdAt: new Date().toISOString(),
      };
      setAnnonces(prev => [adaptedAnnonce, ...prev]);
      setIsLoading(false);
    }, 300);
  }, [lang]);

  const handleCloseCreate = useCallback(() =>{ setShowCreate(false);setIsEditing(!isEditing)}, [isEditing]);
  const handleSaveAnnonce = useCallback((data) => {
    handleAddAnnonce(data);
    setShowCreate(false);
    setIsEditing(!isEditing);
  }, [handleAddAnnonce, isEditing]);

  const handleDeleteAnnonce = useCallback((id) => {
    if (window.confirm(t[lang].annonceListing.deleteConfirm)) {
      setAnnonces(prev => prev.filter(a => a.id !== id));
    }
  }, [lang]);

  const EmptyState = useMemo(() => (
    <div className="empty-state">
      <div className="emoji"><i className="bi bi-car-front-fill fs-1"></i></div>
      <h2>{t[lang].annonceListing.emptyTitle}</h2>
      <p>{t[lang].annonceListing.emptyDesc}</p>
      <button onClick={() => {
            setShowCreate(true);
            setIsEditing(!isEditing);
      }}>{t[lang].annonceListing.emptyBtn}</button>
    </div>
  ), [lang]);

  return (
    <div className="annonces-wrapper">
        {!isEditing &&
      <header className="annonces-header">
        <div>
          <h1>{t[lang].annonceListing.title}</h1>
          <p>{t[lang].annonceListing.description}</p>
        </div>
        <button
          className="add-btn"
          onClick={() => {
            setShowCreate(true);
            setIsEditing(!isEditing);
          }
          }
          disabled={isLoading}
        >
          {isLoading ? t[lang].annonceListing.loading : "+"} {t[lang].annonceListing.add}
        </button>
      </header>}

      {showCreate ? (
        <div className="create-section">
          <CreateAnnonce onClose={handleCloseCreate} onSave={handleSaveAnnonce} isLoading={isLoading} />
        </div>
      ) : (
        annonces.length === 0 ? EmptyState : (
          <div className="cards-container">
            {annonces.map((item) => (
              <AnnonceCard item={item} key={item.id} handleDeleteAnnonce={handleDeleteAnnonce} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default AnnoncesListing;