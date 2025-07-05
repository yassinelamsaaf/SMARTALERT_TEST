import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";

const BlockGuide = () => {
  const { lang } = useContext(LanguageContext);

  const blockContent = [
    {
      id: 1,
      icon: `${import.meta.env.BASE_URL}/img/featureIcons/3/3.svg`,
      title: t[lang].home.guide._1.title,
      text: t[lang].home.guide._1.text,
      delayAnim: "0",
    },
    {
      id: 2,
      icon: `${import.meta.env.BASE_URL}/img/featureIcons/3/2.svg`,
      title: t[lang].home.guide._2.title,
      text: t[lang].home.guide._2.text,
      delayAnim: "50",
    },
    {
      id: 3,
      icon: `${import.meta.env.BASE_URL}/img/featureIcons/2/2.svg`,
      title: t[lang].home.guide._3.title,
      text: t[lang].home.guide._3.text,
      delayAnim: "100",
    },
  ];

  return (
    <>
      {blockContent.map((item) => (
        <div
          className="col-lg-4 col-sm-6"
          data-aos="fade"
          data-aos-delay={item.delayAnim}
          key={item.id}
        >
          <div className="featureIcon -type-1 -hover-shadow px-50 py-50 lg:px-24 lg:py-15">
            <div className="d-flex justify-center">
              <img src={item.icon} alt="image" className="js-lazy" />
            </div>
            <div className="text-center mt-30">
              <h4 className="text-18 fw-500">{item.title}</h4>
              <p className="text-15 mt-10">{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlockGuide;
