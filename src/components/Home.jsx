import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Home({ user }) {

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="home-container">

      <div className="home-card">

        <div className="logo">Vin</div>

        <h1>
          Welcome to Vin! 🎉
        </h1>

        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="Profile"
            className="profile-image"
          />
        )}

        <h2>
          {user.displayName}
        </h2>

        <p>
          {user.email}
        </p>

        <p className="login-message">
          You have successfully signed in.
        </p>

        <button
          className="signout-button"
          onClick={handleSignOut}
        >
          Sign Out
        </button>

      </div>

    </div>
  );
}

export default Home;