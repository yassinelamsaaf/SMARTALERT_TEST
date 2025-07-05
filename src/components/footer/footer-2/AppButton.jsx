import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";

const AppButton = () => {
    const { lang } = useContext(LanguageContext);
  
  const appContent = [
    {
      id: 1,
      icon: "icon-apple",
      link: "https://apps.apple.com/us/app/smartalert/id6471924598",
      text: t[lang].footer.mobile.downloadOn,
      market: "Apple Store",
      colClass: "",
    },
    {
      id: 2,
      icon: "icon-play-market",
      link: "https://play.google.com/store/apps/details?id=smartalert.app.exponent",
      text: t[lang].footer.mobile.findOn,
      market: "Google Play",
      colClass: "mt-20",
    },
  ];

  return (
    <>
      {appContent.map((item) => (
        <div
          className={`d-flex items-center px-20 py-10 rounded-4 border-light  ${item.colClass}`}
          key={item.id}
        >
          <i className={`${item.icon} text-24 mx-2`} />
          <a href={item.link} className="ml-20 d-block">
            <div className="text-14 text-white">{item.text}</div>
            <div className="text-15 lh-1 fw-500">{item.market}</div>
          </a>
        </div>
      ))}
    </>
  );
};

export default AppButton;
