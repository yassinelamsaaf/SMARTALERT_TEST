import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";
import Footer2 from "@/components/footer/footer-2";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import LoginForm from "@/components/common/LoginForm";
import LoginWithSocial from "@/components/common/LoginWithSocial";

const metadata = {
  title: "Login || SMARTALERT",
  description: "SMARTALERT",
};

const LogIn = () => {
  const { lang } = useContext(LanguageContext);

  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 />
      {/* End Header 1 */}

      <section className="layout-pt-md layout-pb-lg">
        <div
          className="container min-h-400 d-flex justify-center align-items-center"
          style={{ minHeight: 400 }}
        >
          <div className="col-xl-5 col-lg-6 col-md-8">
            <div className="px-40 py-40 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
              <LoginForm />
              {/* End .Login */}

              {/* Social login and terms */}
              <div className="row y-gap-20 pt-30">
                <div className="col-12">
                  <div className="text-center">{t[lang].auth.or}</div>
                </div>
                <LoginWithSocial />
                <div className="col-12">
                  <div className="text-center px-30">
                    {t[lang].auth.agree}
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
          </div>
        </div>
      </section>
      {/* End login section */}

      <Footer2 />
      {/* End Call To Actions Section */}
    </>
  );
};

export default LogIn;
