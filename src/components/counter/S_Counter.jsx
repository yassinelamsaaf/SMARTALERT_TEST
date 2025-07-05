import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";

const Counter = () => {
  const { lang } = useContext(LanguageContext);

  const blockContent = [
    {
      id: 1,
      number: "12,987",
      meta: t[lang].about.counter.bloc_1.meta,
      hasUnit: "",
      delayAnim: "100",
    },
    {
      id: 2,
      number: "142",
      meta: t[lang].about.counter.bloc_2.meta,
      hasUnit: "",
      delayAnim: "200",
    },
    {
      id: 3,
      number: "4.8",
      meta: t[lang].about.counter.bloc_3.meta,
      hasUnit: "",
      delayAnim: "300",
    },
    {
      id: 4,
      number: "129,000+",
      meta: t[lang].about.counter.bloc_4.meta,
      hasUnit: "",
      delayAnim: "400",
    },
  ];
  return (
    <>
      {blockContent.map((item) => (
        <div
          className="col-xl-3 col-6"
          key={item.id}
          data-aos="fade"
          data-aos-delay={item.delayAnim}
        >
          <div className="text-40 lg:text-30 lh-13 fw-600">
            {item.number}
            {item.hasUnit}
          </div>
          <div className="text-14 lh-14 text-light-1 mt-5">{item.meta}</div>
        </div>
      ))}
    </>
  );
};

export default Counter;
