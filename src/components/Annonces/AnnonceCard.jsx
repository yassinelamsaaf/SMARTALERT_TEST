import { handleLoadImageError } from "@/utils/helper";
import isTextMatched from "@/utils/isTextMatched";
import { Link } from "react-router-dom"
import Slider from "react-slick"

export default function AnnonceCard({ item = {} ,handleDeleteAnnonce}) {
    var itemSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    // custom navigation
    function Arrow(props) {
        let className =
            props.type === "next"
                ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -brown-2 bg-white shadow-1 size-30 rounded-full sm:d-none js-next"
                : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -brown-2 bg-white shadow-1 size-30 rounded-full sm:d-none js-prev";
        className += " arrow";
        const char =
            props.type === "next" ? (
                <>
                    <i className="icon icon-chevron-right text-12"></i>
                </>
            ) : (
                <>
                    <span className="icon icon-chevron-left text-12"></span>
                </>
            );
        return (
            <button className={className} onClick={props.onClick}>
                {char}
            </button>
        );
    }
    return (
        <div
            className="col-lg-4 col-sm-6 position-relative annonce-card"
            key={item.id}
            data-aos="fade"
            data-aos-delay={item.delayAnimation}
            >
            <button
                type="button"
                className="delete-btn"
                onClick={() => handleDeleteAnnonce(item.id)}
                title="Supprimer l'annonce"
            >
                <i className="bi bi-x" />
            </button>
            <Link
                onClick={(e) => {
                    if (item?.tag)
                        e.preventDefault()
                }}
                to={`/occasion/${item.id}`}
                className="carCard -type-1 d-block rounded-4 hover-inside-slider"
            >
                <div className="carCard__image">
                    <div className="cardImage inside-slider">
                        <div className="border-light rounded-4 overflow-hidden">
                            {" "}
                            <Slider
                                {...itemSettings}
                                arrows={true}
                                nextArrow={item?.tag ? null : <Arrow type="next" />}
                                prevArrow={item?.tag ? null : <Arrow type="prev" />}
                            >
                                {item?.slideImg?.map((slide, i) => (
                                    <div className="cardImage ratio ratio-6:5" key={i}>
                                        <div className="cardImage__content ">
                                            <img
                                                className="col-12 js-lazy"
                                                src={slide.url}
                                                alt="image"
                                                onError={handleLoadImageError}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        {/* <div className="cardImage__wishlist">
                            <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                                <i className="icon-heart text-12" />
                            </button>
                        </div> */}

                        <div className="cardImage__leftBadge">
                            <div
                                className={`py-5 px-15 rounded-right-4 text-12 lh-16 fw-500 uppercase 
                                    ${item?.tag ? "bg-blue-1 text-white"
                                        : ""
                                    }`}
                            >
                                {item?.tag}
                            </div>
                        </div>
                    </div>
                </div>
                {/* End image card */}

                <div className="carCard__content mt-10">
                    <div className="d-flex items-center lh-14 mb-5">
                        <div className="text-14 text-light-1">{item?.location}</div>
                        <div className="size-3 bg-light-1 rounded-full ml-10 mr-10" />
                        <div className="text-14 text-light-1 uppercase">
                            {item?.time}
                        </div>
                    </div>
                    <div className="d-flex items-center mb-5">
                        <h4 className="text-dark-1 text-18 lh-16 fw-500">
                            {item?.title}{"  "}
                            {item?.storeName && (
                                <span className="text-15 text-light-1 fw-400">{item?.storeName}</span>
                            )}
                        </h4>
                    </div>
                    <p className="text-light-1 lh-14 text-14 mt-5" />
                    {/* End .row */}

                    <div className="col-lg-11 mt-20">
                        <div className="row y-gap-5">
                            <div className="col-sm-6">
                                <div className="d-flex items-center">
                                    <i className="icon-car" />
                                    <div className="text-14 mx-2">{item?.brand}</div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="d-flex items-center">
                                    <i className="icon-jeep" />
                                    <div className="text-14 mx-2">{item?.model}</div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="d-flex items-center">
                                    <i className="icon-transmission" />
                                    <div className="text-14 mx-2">
                                        {item?.transmission}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="d-flex items-center">
                                    <i className="icon-customer" />
                                    <div className="text-14 mx-2">{item?.door}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End .row */}

                    <div className="row mt-5">
                        <div className="col-7 text-light-1">
                            <i className="icon-price-label mr-10" />
                            <span className="fw-500 text-dark-1">{item?.price}</span>
                        </div>
                        <div className="col flex-center rounded-4 mr-15 text-12 fw-600 text-white"
                            style={{ backgroundColor: item?.source?.color }}
                        >
                            {item.source?.label}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}