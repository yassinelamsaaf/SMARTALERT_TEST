import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";

const BlockGuide = () => {
  const { lang } = useContext(LanguageContext);

  const blockContent = [
    {
      id: 1,
      icon: `${import.meta.env.BASE_URL}/img/featureIcons/1/1.svg`,
      title: t[lang].about.whyUs.bloc_1.title,
      text: t[lang].about.whyUs.bloc_1.text,
      delayAnim: "100",
    },
    {
      id: 2,
      icon: `${import.meta.env.BASE_URL}/img/featureIcons/1/2.svg`,
      title: t[lang].about.whyUs.bloc_2.title,
      text: t[lang].about.whyUs.bloc_2.text,
      delayAnim: "200",
    },
    {
      id: 3,
      icon: `${import.meta.env.BASE_URL}/img/featureIcons/1/3.svg`,
      title: t[lang].about.whyUs.bloc_3.title,
      text: t[lang].about.whyUs.bloc_3.text,
      delayAnim: "300",
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div
          className="col-lg-3 col-sm-6"
          data-aos="fade"
          data-aos-delay={item.delayAnim}
          key={item.id}
        >
          <div className="featureIcon -type-1 ">
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
