import React, { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/i18n/LanguageProvider";
import { loginWithGoogle, loginWithFacebook } from "@/apis/AuthApi";

// You must add Google and Facebook SDKs to your index.html or load them dynamically for this to work.
// See the comments below for setup instructions.

import { useNavigate } from "react-router-dom";

const LoginWithSocial = () => {
  // --- GOOGLE LOGIN HANDLER ---
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleGoogleLogin = async () => {
    try {
      if (!window.google || !window.google.accounts) {
        alert("Google SDK not loaded");
        return;
      }
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: "profile email openid",
        callback: async (response) => {
          if (response && response.access_token) {
            try {
              // Optionally decode the ID token for user info:
              // const idToken = response.id_token;
              // You can decode it using jwt-decode or at jwt.io
              const data = await loginWithGoogle(response.access_token, lang);
              // console.log("Google login response:", data);
              if (data && data.id_token) {
                // Store JWT in the same key as normal login for consistency
                localStorage.setItem("jwt", data.id_token);
                // Mark as social user
                localStorage.setItem("isSocialUser", "true");
                // User info is always fetched from backend after login; no need to store here
                navigate("/");
              } else {
                alert("No token received from backend");
              }
            } catch (err) {
              alert("Google login failed: " + (err?.message || ""));
            }
          } else {
            alert("Google login failed: No access token");
          }
        },
      });
      client.requestAccessToken();
    } catch (err) {
      alert("Google login error: " + err.message);
    }
  };

  // --- FACEBOOK LOGIN HANDLER ---
  const [isFbReady, setIsFbReady] = useState(false);

  useEffect(() => {
    // Poll for FB SDK readiness
    const interval = setInterval(() => {
      if (window.FB && typeof window.FB.init === 'function') {
        setIsFbReady(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleFacebookLogin = () => {
    if (!window.FB || typeof window.FB.login !== 'function') {
      alert("Facebook SDK not loaded or not ready");
      return;
    }
    try {
      window.FB.login(function(response) {
        if (response && response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          // Call async logic in a separate function
          (async () => {
            try {
              const data = await loginWithFacebook(accessToken, lang);
              console.log("Facebook login response:", data);
              if (data && data.id_token) {
                // Store JWT in the same key as normal login for consistency
                localStorage.setItem("jwt", data.id_token);
                // Mark as social user
                localStorage.setItem("isSocialUser", "true");
                if (data.name) localStorage.setItem("userName", data.name);
                if (data.email) localStorage.setItem("userEmail", data.email);
                if (!data.name || !data.email) {
                  window.FB.api('/me', {fields: 'name,email'}, function(userInfo) {
                    if (userInfo?.name) localStorage.setItem('userName', userInfo.name);
                    if (userInfo?.email) localStorage.setItem('userEmail', userInfo.email);
                    navigate("/");
                  });
                } else {
                  navigate("/");
                }
              } else {
                alert("No token received from backend");
              }
            } catch (err) {
              alert("Facebook login failed: " + (err?.message || ""));
            }
          })();
        } else {
          alert("Facebook login cancelled or failed");
        }
      }, { scope: 'email,public_profile' });
    } catch (err) {
      alert("Facebook login error: " + (err?.message || ""));
    }
  };

  return (
    <>
      <div className="col-md-6 col-12">
        <button
          className="button col-12 -outline-blue-1 text-blue-1 py-15 rounded-8 facebook-btn"
          style={{ background: "var(--color-dark-3)", color: "#fff", borderColor: "var(--color-dark-3)" }}
          onClick={handleFacebookLogin}
          disabled={!isFbReady}
        >
          <i className="bi bi-facebook text-15 mr-10" />
          {isFbReady ? 'Facebook' : 'Facebook (loading...)'}
        </button>
      </div>

      <div className="col-md-6 col-12">
        <button
          className="button col-12 -outline-red-1 text-red-1 py-15 rounded-8 addalert-hover-switch"
          style={{ background: "#fff", color: "var(--color-dark-3)", borderColor: "var(--color-dark-3)" }}
          onClick={handleGoogleLogin}
        >
          <i className="bi bi-google text-15 mr-10" />
          Google
        </button>
      </div>
    </>
  );
};

export default LoginWithSocial;
