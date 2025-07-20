import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/header/default-header";
import DefaultFooter from "@/components/footer/default";
import LoginWithSocial from "@/components/common/LoginWithSocial";
import SignUpForm from "@/components/common/SignUpForm";
import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";
import Footer2 from "@/components/footer/footer-2";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";

const metadata = {
  title: "Sign Up || SmartAlert",
};

const SignUp = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="header-margin"></div>
      <Header1 />
      <section className="layout-pt-md layout-pb-lg">
        <div
          className="container min-h-400 d-flex justify-center align-items-center"
          style={{ minHeight: 400 }}
        >
          <div className="col-xl-5 col-lg-6 col-md-8">
            <div className="px-40 py-40 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
              <SignUpForm />
              {/* End SignUP */}

              <div className="row y-gap-20 pt-30">
                <div className="col-12">
                  <div className="text-center">{t[lang].auth.or}</div>
                </div>
                <LoginWithSocial />
                <div className="col-12">
                </div>
              </div>
              {/* End .row */}
            </div>
          </div>
        </div>
      </section>
      <Footer2 />
    </>
  );
};

export default SignUp;
