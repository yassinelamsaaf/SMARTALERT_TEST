import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { activatePhone, resendPhoneActivationCode } from "@/apis/AuthApi";
import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";
import Footer2 from "@/components/footer/footer-2";
import CodeInput from "@/components/common/CodeInput";

const metadata = {
  title: "Activation Téléphone || SMARTALERT",
  description: "SMARTALERT",
};

const ActivatePhone = () => {
  const [searchParams] = useSearchParams();
  const [codeArr, setCodeArr] = useState(["", "", "", "", "", ""]);
  const code = codeArr.join("");
  const [status, setStatus] = useState("idle"); // idle | loading | error | success
  const [error, setError] = useState("");
  const [resendStatus, setResendStatus] = useState("idle"); // idle | loading | success
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const phone = searchParams.get("phone");

  useEffect(() => {
    // Auto-focus first input on load
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (codeArr.join("").length !== 6) {
      setError(t[lang].auth.codeIncomplete || "Veuillez entrer le code complet.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      await activatePhone(phone, codeArr.join(""));
      setStatus("success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setStatus("error");
      setError(t[lang].auth.activationError || "Code incorrect ou expiré.");
    }
  };

  const handleResendCode = async () => {
    setResendStatus("loading");
    try {
      await resendPhoneActivationCode(phone);
      setResendStatus("success");
      setTimeout(() => setResendStatus("idle"), 3000);
    } catch (err) {
      setResendStatus("idle");
      setError(
        err?.message ||
          t[lang].auth.resendError ||
          "Échec de renvoi du code."
      );
    }
  };

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
              <div style={{ textAlign: "center" }}>
                <h2 style={{ color: "black", fontWeight: 700, marginBottom: 12 }}>
                  {t[lang].auth.codeSentTitlePhone || "Le code a été envoyé par SMS!"}
                </h2>
                <p style={{ color: "#444", marginBottom: 24 }}>
                  {t[lang].auth.codeSentDescPhone || "Entrez le code envoyé à votre téléphone."}
                </p>
                <form onSubmit={handleSubmit}>
                  <CodeInput value={codeArr} onChange={setCodeArr} lang={lang} />
                  {error && (
                    <div className="warning-error" style={{ color: "#d32f2f", marginBottom: 12 }}>{error}</div>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="button mt-50 py-20 mc-to-w-btn"
                    style={{
                      width: "100%",
                      background: "var(--color-dark-3)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      fontWeight: 600,
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                    }}
                  >
                    {status === "loading"
                      ? t[lang].auth.verifying || "Vérification..."
                      : t[lang].auth.verifyBtn || "VÉRIFIER"}
                  </button>
                </form>
                {status === "success" && (
                  <div style={{ color: "#388e3c", marginTop: 16 }}>                    {t[lang].auth.activated ||
                      "Votre compte a été activé avec succès !"}
                  </div>
                )}
                <div style={{ marginTop: 20, textAlign: "center" }}>
                  <span style={{ color: "#666", fontSize: 14 }}>
                    {t[lang].auth.didntReceiveCodePhone || "Vous n'avez pas reçu le code ?"} {" "}
                  </span>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={resendStatus === "loading"}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#F15A29",
                      textDecoration: "underline",
                      cursor: resendStatus === "loading" ? "not-allowed" : "pointer",
                      fontSize: 14,
                      fontWeight: 600
                    }}
                  >
                    {resendStatus === "loading"
                      ? t[lang].auth.resending || "Renvoi..."
                      : resendStatus === "success"
                      ? t[lang].auth.resent || "Code renvoyé !"
                      : t[lang].auth.resendCodePhone || "Renvoyer le code"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer2 />
    </>
  );
};

export default ActivatePhone;
