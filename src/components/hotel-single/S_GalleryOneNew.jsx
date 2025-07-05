import { Gallery, Item } from "react-photoswipe-gallery";
import { useState, useContext } from "react";
import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";
import { isInWishlist, toggleWishlist } from "@/utils/wishlist";

export default function GalleryOne({ car }) {
  const { lang } = useContext(LanguageContext);
  const lastImgIndex = (car?.slideImg?.length ?? 0) - 1;

 const dataSource = car?.slideImg.map(image => {
    return {
      src: image,
      width: 450,
      height: 375,
    }
  });

  const [wishlisted, setWishlisted] = useState(() => isInWishlist(car.id));

const handleWishlist = (e) => {
  e.preventDefault();
  const newState = toggleWishlist(car);
  setWishlisted(newState);
};
 

  return (
    <>
      <section className="pt-40">
        <div className="container">
          {/* TITLE + HEART + PRICE + BUTTON */}
          <div className="row y-gap-20">
            <div className="col-12">
              {/* Titre + cœur */}
              <div className="d-flex justify-between align-items-center flex-wrap gap-10">
                <h1 className="text-30 sm:text-25 fw-600 mb-0">{car?.title}</h1>
                <button
                  onClick={handleWishlist}
                  className="btn p-0 border-0 bg-transparent"
                  title="Ajouter aux favoris"
                >
                  <i
                    className={`bi ${
                      wishlisted ? "bi-heart-fill text-danger" : "bi-heart"
                    } fs-4`}
                  ></i>
                </button>
              </div>

              {/* Prix + bouton */}
              <div className="d-flex justify-between align-items-center flex-wrap gap-10 mt-10">
                <div className="text-14">
                  {t[lang].newCars.priceFrom}{" "}
                  <span className="text-22 text-dark-1 fw-500" dir="ltr">
                    {car?.price}
                  </span>
                </div>
                <a
                  href={car?.carUri}
                  className="button h-50 px-24 -dark-2 bg-brown-2 text-white"
                >
                  {t[lang].newCars.moreDetails}
                  <div className="icon-arrow-top-right ml-15" />
                </a>
              </div>
            </div>
          </div>

          {/* GALLERY GRID */}
          <Gallery options={{ dataSource }}>
            <div className="galleryGrid -type-1 pt-30">
              <div className="galleryGrid__item relative d-flex">
                <Item
                  original={car?.img}
                  thumbnail={car?.img}
                  width={660}
                  height={660}
                >
                  {({ ref, open }) => (
                    <img
                      src={car?.img}
                      ref={ref}
                      onClick={open}
                      alt="image"
                      role="button"
                      className="rounded-4"
                    />
                  )}
                </Item>
              </div>

              {car?.slideImg?.slice(1, 4)?.map((image, index) => {
                if (index % 2 === 1) {
                  return (
                    <div className="galleryGrid__item" key={index}>
                      <Item
                        original={image}
                        thumbnail={image}
                        width={450}
                        height={375}
                      >
                        {({ ref, open }) => (
                          <img
                            ref={ref}
                            onClick={open}
                            src={image}
                            alt="image"
                            className="rounded-4"
                            role="button"
                          />
                        )}
                      </Item>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="galleryGrid__item relative d-flex"
                      key={index}
                    >
                      <img src={image} alt="image" className="rounded-4" />
                      <div className="absolute px-10 py-10 col-12 h-full d-flex justify-end items-end">
                        <Item
                          original={image}
                          thumbnail={image}
                          width={450}
                          height={375}
                        >
                          {({ ref, open }) => (
                            <img
                              ref={ref}
                              onClick={open}
                              src={image}
                              alt="image"
                              className="rounded-4"
                              role="button"
                            />
                          )}
                        </Item>
                      </div>
                    </div>
                  );
                }
              })}

              <div className="galleryGrid__item relative d-flex">
                <img
                  src={car?.slideImg[lastImgIndex]}
                  alt="image"
                  className="rounded-4"
                />
                <div className="absolute px-10 py-10 col-12 h-full d-flex justify-end items-end">
                  <Item
                    original={car?.slideImg[lastImgIndex]}
                    thumbnail={car?.slideImg[lastImgIndex]}
                    width={450}
                    height={375}
                  >
                    {({ ref, open }) => (
                      <div
                        className="button -blue-1 px-24 py-15 bg-white text-dark-1 js-gallery"
                        ref={ref}
                        onClick={open}
                        role="button"
                      >
                        See All Photos
                      </div>
                    )}
                  </Item>
                </div>
              </div>
            </div>
          </Gallery>
        </div>
      </section>
    </>
  );
}
