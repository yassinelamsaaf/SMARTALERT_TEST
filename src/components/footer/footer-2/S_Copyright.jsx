import { Link } from "react-router-dom";
import Social from "../../common/social/Social";
import t from "@/i18n/t";
import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";

const Copyright = () => {
  const { lang } = useContext(LanguageContext);
  return (
    <div className="row justify-between items-center y-gap-10">
      <div className="col-auto">
        <div className="row x-gap-30 y-gap-10">
          <div className="col-auto">
            <div className="d-flex items-center">
              © {new Date().getFullYear()}
              <a
                href="https://b2blink.ma"
                className="mx-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                B2BLink
              </a>
              {t[lang].footer.rights}
            </div>
          </div>
          {/* End .col */}

          <div className="col-auto">
            <div className="d-flex x-gap-15">
              <Link to={"/terms"}>{t[lang].header.terms}</Link>
            </div>
          </div>
          {/* End .col */}
        </div>
        {/* End .row */}
      </div>
      {/* End .col */}

      <div className="col-auto">
        <div className="row y-gap-10 items-center">
          <div className="col-auto">
            <div className="d-flex items-center">
              <button className="d-flex items-center text-14 fw-500 text-white mr-10">
                <i className="icon-globe text-16 mr-10" />
                <span className="underline">Maroc (MAR)</span>
              </button>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default Copyright;
