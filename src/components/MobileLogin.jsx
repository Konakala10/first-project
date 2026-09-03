import React, { useState, useEffect } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth";
import { auth } from "../firebase/firebase";

function MobileLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // Setup reCAPTCHA
  // =========================

  const setupRecaptcha = async () => {
    try {
      // Remove old reCAPTCHA if it exists
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",

          callback: () => {
            console.log("reCAPTCHA verified");
            setMessage("");
          },

          "expired-callback": () => {
            setMessage(
              "reCAPTCHA expired. Please verify again."
            );
          }
        }
      );

      await window.recaptchaVerifier.render();

      return window.recaptchaVerifier;
    } catch (error) {
      console.error("reCAPTCHA Error:", error);

      setMessage(
        `reCAPTCHA Error: ${
          error.code || "Unknown error"
        }`
      );

      return null;
    }
  };

  // =========================
  // Send OTP
  // =========================

  const sendOTP = async () => {
    if (!phone.trim()) {
      setMessage("Please enter your mobile number.");
      return;
    }

    // Require international format
    if (!phone.startsWith("+")) {
      setMessage(
        "Please enter the number with country code. Example: +16505553434"
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const appVerifier = await setupRecaptcha();

      if (!appVerifier) {
        setLoading(false);
        return;
      }

      const formattedPhone = phone.trim();

      console.log(
        "Sending OTP to:",
        formattedPhone
      );

      const result = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        appVerifier
      );

      setConfirmationResult(result);

      setMessage(
        "OTP sent successfully. Please enter the verification code."
      );

    } catch (error) {
      console.error(
        "FULL OTP ERROR:",
        error
      );

      console.error(
        "ERROR CODE:",
        error.code
      );

      console.error(
        "ERROR MESSAGE:",
        error.message
      );

      setMessage(
        `Failed to send OTP: ${
          error.code || "Unknown error"
        }`
      );

      // Clear reCAPTCHA after an error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Verify OTP
  // =========================

  const verifyOTP = async () => {
    if (!otp.trim()) {
      setMessage("Please enter the OTP.");
      return;
    }

    if (otp.length !== 6) {
      setMessage("OTP must contain 6 digits.");
      return;
    }

    if (!confirmationResult) {
      setMessage(
        "Please request an OTP first."
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const result =
        await confirmationResult.confirm(otp);

      console.log(
        "Phone login successful:",
        result.user
      );

      setMessage(
        "Mobile number verified successfully!"
      );

      console.log(
        "Logged-in user:",
        result.user
      );

    } catch (error) {
      console.error(
        "OTP verification error:",
        error
      );

      setMessage(
        `Incorrect OTP: ${
          error.code || "Unknown error"
        }`
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Cleanup
  // =========================

  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  // =========================
  // Page
  // =========================

  return (
    <div className="mobile-login">

      <h2>
        Verify your mobile number
      </h2>

      {!confirmationResult ? (
        <>
          <p>
            We'll send you a verification code.
          </p>

          <input
            type="tel"
            placeholder="+16505553434"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <button
            type="button"
            onClick={sendOTP}
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Continue"}
          </button>

          <div id="recaptcha-container"></div>
        </>
      ) : (
        <>
          <p>
            Enter the 6-digit verification code.
          </p>

          <input
            type="text"
            inputMode="numeric"
            placeholder="Enter OTP"
            maxLength="6"
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value.replace(
                  /\D/g,
                  ""
                )
              )
            }
          />

          <button
            type="button"
            onClick={verifyOTP}
            disabled={loading}
          >
            {loading
              ? "Verifying..."
              : "Verify"}
          </button>
        </>
      )}

      {message && (
        <p className="mobile-message">
          {message}
        </p>
      )}

    </div>
  );
}

export default MobileLogin;