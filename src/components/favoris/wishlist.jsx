import { useEffect, useState ,useContext } from "react";
import UsedCarCard from "@/components/car-list/car-list-v2/UsedCarCard copy";
import NewCarCard from "@/components/car-list/car-list-v2/NewCarCard copy";
import { getWishlist } from "@/utils/wishlist";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
export default function Wishlist() {
  const [wishlistCars, setWishlistCars] = useState([]);

  useEffect(() => {
    const stored = getWishlist();
    setWishlistCars(stored);
  }, []);
  const { lang } = useContext(LanguageContext);

  return (
    <div className="container pt-40 pb-40">
       <h2 className="text-30 fw-600 mb-30">{t[lang].favoris.title}</h2>
      {wishlistCars.length === 0 ? (
        <p className="text-16 text-light-1">{t[lang].favoris.empty}</p>
      ) : (
        <div className="row y-gap-30">
          {wishlistCars.map((car) =>
            car.source === "Occasion" ? (
              <UsedCarCard key={car.id} item={car} />
            ) : (
              <NewCarCard key={car.id} item={car} />
            )
          )}
        </div>
      )}
    </div>
  );
}
