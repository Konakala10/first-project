import React, { useState } from "react";
import MobileLogin from "./MobileLogin";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login({ onLogin }) {
  const [showConsent, setShowConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMobileLogin, setShowMobileLogin] = useState(false);

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);

      console.log("Google Sign-In successful!");
      console.log("User:", result.user);

      setShowConsent(false);

      onLogin(result.user);
    } catch (error) {
      console.error("Google Sign-In Error:", error);

      alert(
        "Google Sign-In Error:\n\n" +
          error.code +
          "\n\n" +
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Email Login
  const handleEmailLogin = () => {
    alert("Email login will be added here.");
  };

  return (
    <>
      {showMobileLogin ? (
        <MobileLogin />
      ) : (
        <div className="login-container">
          <div className="login-card">

            {/* Logo */}
            <div className="logo">
              Vin
            </div>

            {/* Heading */}
            <h1>Welcome to Vin</h1>

            <p>
              Sign in or create your account to continue.
            </p>

            {/* Login Options */}
            <div className="login-options">

              {/* Google Login */}
              <button
                type="button"
                className="login-option-button"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <span className="login-icon">G</span>

                <span>
                  {loading
                    ? "Connecting..."
                    : "Continue with Google"}
                </span>
              </button>

              {/* Mobile Login */}
              <button
                type="button"
                className="login-option-button"
                onClick={() => setShowMobileLogin(true)}
              >
                <span className="login-icon">☎</span>

                <span>
                  Continue with Mobile
                </span>
              </button>

              {/* Email Login */}
              <button
                type="button"
                className="login-option-button"
                onClick={handleEmailLogin}
              >
                <span className="login-icon">✉</span>

                <span>
                  Continue with Email
                </span>
              </button>

            </div>

            {/* Divider */}
            <div className="divider">
              <span>or</span>
            </div>

            {/* Terms */}
            <p className="terms">
              By continuing, you agree to Vin's
              <br />
              Terms of Service and Privacy Policy.
            </p>

          </div>
        </div>
      )}

      {/* Google Consent Modal */}
      {showConsent && (
        <div className="modal-overlay">

          <div className="consent-modal">

            <h2>Continue with Google</h2>

            <p>
              To create or access your Vin account,
              Vin will receive the following information
              from Google:
            </p>

            <h3>Information shared</h3>

            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Profile picture</li>
            </ul>

            <h3>How Vin uses it</h3>

            <p>
              This information is used to create and
              maintain your Vin account, identify you
              when you sign in, and personalize your
              experience.
            </p>

            <p>
              <strong>Privacy:</strong> Vin does not
              receive your Google password.
            </p>

            <p>
              By continuing, you agree to Vin's
              Terms of Service and Privacy Policy.
            </p>

            {/* Modal Buttons */}
            <div className="modal-buttons">

              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowConsent(false)}
                disabled={loading}
              >
                Cancel
              </button>

              <button
                type="button"
                className="continue-button"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                {loading
                  ? "Connecting..."
                  : "Continue with Google"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Login;