import AppButton from "./AppButton";
import ContactInfo from "./S_ContactInfo";
import Copyright from "./S_Copyright";
import FooterContent from "./FooterContent";
import { LanguageContext } from "@/i18n/LanguageProvider";
import { useContext } from "react";
import t from "@/i18n/t";

const index = () => {
  const { lang } = useContext(LanguageContext);

  return (
    <footer className="footer -type-1 text-white bg-dark-2">
      <div className="container">
        <div className="pt-60 pb-60">
          <div className="row y-gap-40 justify-between xl:justify-start">
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-30 underline">{t[lang].footer.contactInfo.title}</h5>
              <ContactInfo />
            </div>
            {/* End col */}

            <FooterContent />
            {/* End footer menu content */}

            <div className="col-xl-3 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-30 underline">{t[lang].footer.mobile.title}</h5>
              <AppButton />
            </div>
          </div>
        </div>
        {/* End footer top */}

        <div className="py-20  border-top-white-15">
          <Copyright />
        </div>
        {/* End footer-copyright */}
      </div>
      {/* End container */}
    </footer>
  );
};

export default index;
