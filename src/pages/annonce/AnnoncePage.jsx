import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1/index";
import Footer2 from "@/components/footer/footer-2";
import AnnoncesListing from "@/components/Annonces/AnnonceListing";

const metadata = {
  title: "Vitrine|| SMARTALERT",
  description: "SMARTALERT Favoris - Découvrez les voitures que vous avez ajoutées à vos favoris. Consultez votre liste de souhaits pour retrouver facilement vos véhicules préférés.",
};

export default function AnnoncePage() {
  return (
     <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <div className="header-margin"></div>
      <AnnoncesListing/>
      <Footer2 />
    </>
  )
}
