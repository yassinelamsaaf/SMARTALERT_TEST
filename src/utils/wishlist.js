const WISHLIST_KEY = "wishlist-cars";

// ✅ Récupère la liste
export const getWishlist = () => {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
};

// ✅ Vérifie si une voiture est déjà en wishlist
export const isInWishlist = (id) => {
  const wishlist = getWishlist();
  return wishlist.some((item) => item.id === id);
};

// ✅ Ajoute une voiture complète
export function addToWishlist(car) {
  const list = getWishlist();
  if (!isInWishlist(car.id)) {
    list.push(car);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  }
}

// ✅ Supprime par ID
export function removeFromWishlist(id) {
  const list = getWishlist().filter((car) => car.id !== id);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}

// ✅ Bascule

export const toggleWishlist = (car) => {
  let wishlist = getWishlist();
  const exists = wishlist.find((item) => item.id === car.id);

  if (exists) {
    wishlist = wishlist.filter((item) => item.id !== car.id);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    return false;
  } else {
    wishlist.push(car);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    return true;
  }
};