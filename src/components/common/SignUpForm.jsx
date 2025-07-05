import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import t from "@/i18n/t";
import { register } from "@/apis/mockAPI/AuthApi";

const SignUpForm = () => {
  const { lang } = useContext(LanguageContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.agree) {
      setError(t[lang].auth.agreeError || "You must agree to the terms.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError(t[lang].auth.passwordMismatch || "Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await register({
        login: form.email,
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        langKey: lang,
      });
      navigate(`/activate?email=${encodeURIComponent(form.email)}`);
    } catch (err) {
      setError(err.message || t[lang].auth.signupError || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="row y-gap-20" onSubmit={handleSubmit}>
      <div className="col-12">
        <h1 className="text-22 fw-500">{t[lang].auth.signupTitle}</h1>
        <p className="mt-10">
          {t[lang].auth.signupSubtitle}{" "}
          <Link to="/login" className="text-blue-1"
          style={{ color: "var(--color-dark-3)" }}>
            {t[lang].auth.signupLink}
          </Link>
        </p>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.firstName}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.lastName}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="text" name="email" value={form.email} onChange={handleChange} required />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.email}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.password}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="form-input ">
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
          <label className="lh-1 text-14 text-light-1">
            {t[lang].auth.confirmPassword}
          </label>
        </div>
      </div>
      {/* End .col */}

      <div className="col-12">
        <div className="d-flex ">
          <div className="form-checkbox mt-5">
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} />
            <div className="form-checkbox__mark">
              <div className="form-checkbox__icon icon-check" />
            </div>
          </div>
          <div className="text-15 lh-15 text-light-1 ml-10">
            {t[lang].auth.agree}
          </div>
        </div>
      </div>
      {/* End .col */}

      {error && (
        <div className="alert alert-danger mt-10">{error}</div>
      )}
      <div className="col-12">
        <button
          type="submit"
          className="button py-20 -dark-1 facebook-btn"
          style={{
            background: "var(--color-dark-3)",
            color: "#fff",
            width: "100%",
            borderRadius: 6,
            fontWeight: 600,
          }}
          disabled={loading}
        >
          {loading ? t[lang].auth.signupLoading || "Inscription..." : t[lang].auth.signupBtn}
        </button>
      </div>
      {/* End .col */}
    </form>
  );
};

export default SignUpForm;
