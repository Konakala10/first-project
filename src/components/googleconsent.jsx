import React from "react";

function googleconsent({ onContinue, onCancel }) {
  return (
    <div className="overlay">

      <div className="consent-modal">

        <h2>Continue with Google</h2>

        <p>
          To create or access your Vin account,
          Vin will receive the following information
          from Google:
        </p>

        <div className="information">
          <p>✓ Name</p>
          <p>✓ Email address</p>
          <p>✓ Profile picture</p>
        </div>

        <h3>How Vin uses it</h3>

        <p>
          This information is used to create and
          maintain your Vin account, identify you
          when you sign in, and personalize your
          experience.
        </p>

        <p className="privacy">
          Vin does not receive your Google password.
        </p>

        <p className="small-text">
          By continuing, you agree to Vin's
          Terms of Service and Privacy Policy.
        </p>

        <div className="modal-buttons">

          <button
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="google-button"
            onClick={onContinue}
          >
            Continue with Google
          </button>

        </div>

      </div>

    </div>
  );
}

export default googleconsent.jsx;
