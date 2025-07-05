import CallToActions from "@/components/common/CallToActions";
import Footer2 from "@/components/footer/footer-2";
import WhyChoose from "@/components/block/S_BlockGuide";
import Block1 from "@/components/about/S_Block1";

import Counter from "@/components/counter/S_Counter";
import Testimonial from "@/components/testimonial/S_Testimonial";
import Counter2 from "@/components/counter/S_Counter2";

import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";
import t from "@/i18n/t";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";

const metadata = {
  title: "À Propos || SmartAlert",
  description: "SmartAlert - Voitures à vendre",
};

const About = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <>
      <MetaComponent meta={metadata} />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 />
      {/* End Header 1 */}
      
      <section className="layout-pt-lg layout-pb-md">
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">{t[lang].about.whyUs.title}</h2>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row y-gap-40 justify-between pt-50">
            <WhyChoose />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Why Choose Us section */}

      <section className="layout-pt-md">
        <div className="container">
          <div className="row y-gap-30 justify-between items-center">
            <Block1 />
          </div>
        </div>
      </section>
      {/* End about block section */}

      <section className="pt-60">
        <div className="container">
          <div className="border-bottom-light pb-40">
            <div className="row y-gap-30 justify-center text-center">
              <Counter />
            </div>
          </div>
        </div>
      </section>
      {/* End counter Section */}

      <section className="section-bg layout-pt-lg layout-pb-lg">
        <div className="section-bg__item -mx-20 bg-light-2" />
        <div className="container">
          <div className="row justify-center text-center">
            <div className="col-auto">
              <div className="sectionTitle -md">
                <h2 className="sectionTitle__title">
                  {t[lang].about.testimonial.title}
                </h2>
                <p className=" sectionTitle__text mt-5 sm:mt-0">
                  {t[lang].about.testimonial.sub}
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="overflow-hidden pt-80 js-section-slider">
            <div className="item_gap-x30">
              <Testimonial />
            </div>
          </div>
          {/* End .overflow-hidden */}

          <div className="row items-center pt-40 sm:pt-20">
            <div className="col-xl-8">
              <Counter2 />
            </div>
            {/* End .col */}

          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End testimonial section */}

      <Footer2 />
      {/* End Call To Actions Section */}
    </>
  );
};

export default About;
