
import Wishlist from '../../components/favoris/wishlist';
import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1/index";
import Footer2 from "@/components/footer/footer-2";

const metadata = {
  title: "Favoris || SMARTALERT",
  description: "SMARTALERT Favoris - Découvrez les voitures que vous avez ajoutées à vos favoris. Consultez votre liste de souhaits pour retrouver facilement vos véhicules préférés.",
};
export default function WishlistPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <div className="header-margin"></div>
      <Wishlist />
      <Footer2 />
    </>
  )
}

  

