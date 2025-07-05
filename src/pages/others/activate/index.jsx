import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { activateAccount, resendActivationCode } from "@/apis/mockAPI/AuthApi";
import MetaComponent from "@/components/common/MetaComponent";
import Header1 from "@/components/header/header-1";
import Footer2 from "@/components/footer/footer-2";

const metadata = {
  title: "Activation || SMARTALERT",
  description: "SMARTALERT",
};

const ActivateAccount = () => {
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState("");  const [status, setStatus] = useState("idle"); // idle | loading | error | success
  const [error, setError] = useState("");
  const [resendStatus, setResendStatus] = useState("idle"); // idle | loading | success
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const email = searchParams.get("email");

  useEffect(() => {
    // Auto-focus first input on load
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError(t[lang].auth.codeIncomplete || "Veuillez entrer le code complet.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      await activateAccount(code);
      setStatus("success");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setStatus("error");
      setError(
        err?.message ||
          t[lang].auth.activationError ||
          "Code invalide ou expiré."
      );
    }
  };

  const handleResendCode = async () => {
    setResendStatus("loading");
    try {
      await resendActivationCode(email);
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
              {/* Activation form content */}
              <div style={{ textAlign: "center" }}>
                <h2 style={{ color: "#F15A29", fontWeight: 700, marginBottom: 12 }}>
                  {t[lang].auth.codeSentTitle || "Le code a été envoyé!"}
                </h2>
                <p style={{ color: "#444", marginBottom: 24 }}>
                  {t[lang].auth.codeSentDesc || "Entrez le code envoyé à votre email."}
                </p>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
                    {Array.from({ length: 6 }, (_, i) => (
                      <input
                        key={i}
                        type="text"
                        value={code[i] || ""}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          if (value.length <= 1) {
                            const newCode = code.split("");
                            newCode[i] = value;
                            setCode(newCode.join(""));
                            
                            // Auto-focus next input
                            if (value && i < 5) {
                              const nextInput = e.target.parentNode.children[i + 1];
                              nextInput?.focus();
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          // Handle backspace to focus previous input
                          if (e.key === "Backspace" && !code[i] && i > 0) {
                            const prevInput = e.target.parentNode.children[i - 1];
                            prevInput?.focus();
                          }
                        }}
                        style={{
                          width: 40,
                          height: 48,
                          fontSize: 20,
                          fontWeight: 600,
                          textAlign: "center",
                          border: "2px solid #eee",
                          borderRadius: 8,
                          outline: "none",
                          background: "#fafafa",
                          transition: "all 0.2s",
                          ...(code[i] ? { borderColor: "#F15A29", background: "#fff" } : {})
                        }}
                        maxLength={1}
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>
                  {error && (
                    <div style={{ color: "#d32f2f", marginBottom: 12 }}>{error}</div>
                  )}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="button py-20 -dark-1"
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
                
                {/* Resend code link */}
                <div style={{ marginTop: 20, textAlign: "center" }}>
                  <span style={{ color: "#666", fontSize: 14 }}>
                    {t[lang].auth.didntReceiveCode || "Vous n'avez pas reçu le code ?"}{" "}
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
                      : t[lang].auth.resendCode || "Renvoyer le code"}
                  </button>
                </div>
              </div>
              {/* End activation form */}
            </div>
          </div>
        </div>
      </section>
      {/* End activation section */}

      <Footer2 />
      {/* End Footer */}
    </>
  );
};

export default ActivateAccount;
