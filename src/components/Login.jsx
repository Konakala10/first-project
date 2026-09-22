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
    alert("Email login will be added in the next version.");
  };

  // Mobile Login
  if (showMobileLogin) {
    return (
      <div className="auth-page">
        <MobileLogin />
      </div>
    );
  }

  return (
    <div className="auth-page">

      {/* Left side - Vin branding */}
      <div className="brand-section">

        <div className="brand-content">

          <div className="brand-logo">
            Vin<span>.</span>
          </div>

          <h1>
            Your account.
            <br />
            <span>Your experience.</span>
          </h1>

          <p className="brand-description">
            One simple and secure place to access
            everything you need with Vin.
          </p>

          <div className="brand-features">

            <div className="feature">
              <div className="feature-icon">✓</div>
              <div>
                <strong>Simple</strong>
                <p>Sign in with the method you prefer.</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">✓</div>
              <div>
                <strong>Secure</strong>
                <p>Your account is protected by Firebase.</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">✓</div>
              <div>
                <strong>Connected</strong>
                <p>Access your Vin account from anywhere.</p>
              </div>
            </div>

          </div>

        </div>

        <div className="brand-footer">
          © 2026 Vin. All rights reserved.
        </div>

      </div>


      {/* Right side - Login */}
      <div className="auth-section">

        <div className="auth-card">

          <div className="mobile-logo">
            Vin<span>.</span>
          </div>

          <div className="auth-header">

            <h2>Welcome to Vin</h2>

            <p>
              Sign in or create an account to continue.
            </p>

          </div>


          {/* Google */}
          <button
            type="button"
            className="google-login-button"
            onClick={() => setShowConsent(true)}
            disabled={loading}
          >

            <span className="google-icon">G</span>

            <span>
              Continue with Google
            </span>

          </button>


          {/* Divider */}
          <div className="auth-divider">
            <span>or</span>
          </div>


          {/* Email */}
          <div className="input-group">

            <label htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
            />

          </div>


          <button
            type="button"
            className="primary-button"
            onClick={handleEmailLogin}
          >
            Continue
          </button>


          {/* Mobile */}
          <button
            type="button"
            className="secondary-button"
            onClick={() => setShowMobileLogin(true)}
          >
            <span>☎</span>
            Continue with mobile
          </button>


          {/* Existing user */}
          <p className="account-switch">
            Already have an account?
            <button
              type="button"
              onClick={handleEmailLogin}
            >
              Sign in
            </button>
          </p>


          {/* Terms */}
          <p className="terms-text">
            By continuing, you agree to Vin's{" "}
            <a href="#terms">Terms of Service</a>
            {" "}and{" "}
            <a href="#privacy">Privacy Policy</a>.
          </p>

        </div>

      </div>


      {/* Google Consent Modal */}
      {showConsent && (

        <div
          className="modal-overlay"
          onClick={() => !loading && setShowConsent(false)}
        >

          <div
            className="consent-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="modal-close"
              onClick={() => setShowConsent(false)}
              disabled={loading}
            >
              ×
            </button>


            <div className="modal-google-icon">
              G
            </div>

            <h2>Continue with Google</h2>

            <p className="modal-intro">
              Vin will use your Google account to
              create or sign you into your account.
            </p>


            <div className="information-box">

              <h3>Vin will receive</h3>

              <div className="information-row">
                <span>✓</span>
                <div>
                  <strong>Name</strong>
                  <p>Your Google account name</p>
                </div>
              </div>

              <div className="information-row">
                <span>✓</span>
                <div>
                  <strong>Email address</strong>
                  <p>Your Google account email</p>
                </div>
              </div>

              <div className="information-row">
                <span>✓</span>
                <div>
                  <strong>Profile picture</strong>
                  <p>Your Google profile picture</p>
                </div>
              </div>

            </div>


            <div className="privacy-note">

              <strong>Your Google password is not shared.</strong>

              <p>
                Vin only receives the information
                required to create and manage your account.
              </p>

            </div>


            <p className="modal-terms">
              By continuing, you agree to Vin's
              Terms of Service and Privacy Policy.
            </p>


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

    </div>
  );
}

export default Login;