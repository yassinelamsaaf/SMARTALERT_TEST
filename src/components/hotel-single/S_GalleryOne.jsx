import { Gallery, Item } from "react-photoswipe-gallery";
import React, { useContext } from "react";
import t from "@/i18n/t";
import { LanguageContext } from "@/i18n/LanguageProvider";

export default function GalleryOne({ hotel }) {
  const { lang } = useContext(LanguageContext);
  const lastImgIndex = (hotel?.slideImg?.length ?? 0) - 1
  const dataSource = hotel?.slideImg.map(image => {
    return {
      src: image,
      width: 450,
      height: 375,
    }
  })

  return (
    <>
      <section className="pt-40">
        <div className="container">
          <div className="row y-gap-20 justify-between items-end">
            <div className="col-auto">
              <div className="row x-gap-20  items-center">
                <div className="col-auto">
                  <h1 className="text-30 sm:text-25 fw-600">{hotel?.title}</h1>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}

            </div>
            {/* End .col */}

            <div className="col-auto">
              <div className="row x-gap-15 y-gap-15 items-center">
                <div className="col-auto">
                  <div className="text-14">
                    {t[lang].newCars.priceFrom} {" "}
                    <span className="text-22 text-dark-1 fw-500" dir="ltr">
                      {hotel?.price}
                    </span>
                  </div>
                </div>
                <div className="col-auto">
                  <a
                    href={hotel?.carUri}
                    className="button h-50 px-24 -dark-2 bg-brown-2 text-white"
                  >
                    {t[lang].newCars.moreDetails} <div className="icon-arrow-top-right ml-15" />
                  </a>
                </div>
              </div>
            </div>
            {/* End .col */}
          </div>
          {/* End .row */}

          <Gallery options={{
            dataSource: dataSource,
          }}>
            <div className="galleryGrid -type-1 pt-30">
              <div className="galleryGrid__item relative d-flex">
                <Item
                  original={hotel?.img}
                  thumbnail={hotel?.img}
                  width={660}
                  height={660}
                >
                  {({ ref, open }) => (
                    <img
                      src={hotel?.img}
                      ref={ref}
                      onClick={open}
                      alt="image"
                      role="button"
                      className="rounded-4"
                    />
                  )}
                </Item>
              </div>
              {/* End .galleryGrid__item */}

              {
                hotel?.slideImg?.slice(1, 4)?.map((image, index) => {
                  if (index % 2 == 1) {
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
                    )
                  } else {
                    return (
                      <div className="galleryGrid__item relative d-flex" key={index}>
                        <img
                          src={image}
                          alt="image"
                          className="rounded-4"
                        />
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
                    )
                  }
                })
              }
              <div className="galleryGrid__item relative d-flex">
                <img
                  src={hotel?.slideImg[lastImgIndex]}
                  alt="image"
                  className="rounded-4"
                />
                <div className="absolute px-10 py-10 col-12 h-full d-flex justify-end items-end">

                  <Item
                    original={hotel?.slideImg[lastImgIndex]}
                    thumbnail={hotel?.slideImg[lastImgIndex]}
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
        {/* End .container */}
      </section>
    </>
  );
}
