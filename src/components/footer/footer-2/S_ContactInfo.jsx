import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { useContext } from "react";

const ContactInfo = () => {
  const {lang} = useContext(LanguageContext)
  const contactContent = [
    {
      id: 1,
      title: t[lang].footer.contactInfo.clientService,
      action: "tel:+(212) 6 51 01 95 65",
      text: "+(212) 6 51 01 95 65",
    },
    {
      id: 2,
      title: t[lang].footer.contactInfo.supportService,
      action: "mailto:contact@b2blink.ma",
      text: "contact@b2blink.ma",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mt-30" key={item.id}>
          <div className={"text-14 mt-30"}>{item.title}</div>
          <a href={item.action} className="text-18 fw-500 text-white mt-5">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
