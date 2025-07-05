import { useNavigate } from "react-router-dom";
import "../../../public/sass/alerts/AlertCard.scss";
import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";
import { useContext } from "react";

function formatDate(dateStr) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    if (isNaN(d)) return "-";
    return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
  }
  
  const CARD_COLORS = [
    "#6bb7b7", "#f7b267", "#f4845f", "#4f98ca", "#a1c349", "#e05d5d", "#b07bac"
  ];
  
  function getRandomColor(id) {
    // Use idx to keep color stable per render, but random per card
    // const id = Math.round(Math.random()*CARD_COLORS.length)
    return CARD_COLORS[id % CARD_COLORS.length];
  //   return CARD_COLORS[ % CARD_COLORS.length];
  }

export const AlertCard = ({idx, alert, deleteMode, selected, handleCardClick}) => {
    const { lang } = useContext(LanguageContext);
    let cardClass = "alert-card d-flex flex-column justify-between h-100 px-24 py-20";
    let cardStyle = {};
    if (deleteMode) {
        if (selected) {
        cardClass += " active-delete";
        cardStyle.background = "var(--color-red-1)";
        } else {
        cardClass += " inactive-delete";
        cardStyle.background = "var(--color-blue-2)";
        }
    } else {
        cardStyle.background = getRandomColor(idx);
    }
    
    // Check if there are unread announcements
    const unreadCount = alert.unreadAnnouncementsCount || 0;
    const hasUnread = unreadCount > 0;
    
    return (
        <div key={idx} className="col-12 col-md-6 col-lg-4" style={{width: "20vw"}}>
            <div
                className={cardClass}
                style={cardStyle}
                onClick={() => handleCardClick(alert)}
            >
                {/* Notification Badge */}
                {hasUnread && (
                    <div className="alert-card__notification-badge">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </div>
                )}
                
                <div className="alert-card__label fw-600 mb-16">
                {alert.label || `alert-${idx + 1}`}
                </div>
                <div className="alert-card__tags">
                {alert.alert.city && (
                    <span className="alert-card__tag px-16 py-4 rounded-8 bg-light-2 text-dark-1 text-13">
                    {alert.alert.city.translations[lang] || alert.alert.city.label || alert.alert.city}
                    </span>
                )}
                {alert.alert.searches.find(search => search.label === "brand") && (
                    <span className="alert-card__tag px-16 py-4 rounded-8 bg-light-2 text-dark-1 text-13">
                    {alert.alert.searches.find(search => search.label === "brand")?.valeurObject?.translations?.[lang]}
                    </span>
                )}
                {alert.alert.searches.find(search => search.label === "model") && (
                    <span className="alert-card__tag px-16 py-4 rounded-8 bg-light-2 text-dark-1 text-13">
                    {alert.alert.searches.find(search => search.label === "model")?.valeurObject?.translations[lang]}
                    </span>
                )}
                {Array.isArray(alert.alert.sources) && alert.alert.sources.length > 0 && alert.alert.sources[0].label && (
                    <span className="alert-card__tag px-16 py-4 rounded-8 bg-light-2 text-dark-1 text-13">
                        {`www.${alert.alert.sources[0].label.replace(/\s+/g, '').toLowerCase()}.ma`}
                    </span>
                )}
                </div>
                <div className="alert-card__footer">
                <span className="text-13 text-dark-1">
                    {t[lang].alert.show.createdOn}: {formatDate(alert.createdAt)}
                </span>
                <span className="alert-card__arrow fs-20">&rarr;</span>
                </div>
            </div>
        </div>
    )
}