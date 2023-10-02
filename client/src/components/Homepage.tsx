import React, { useEffect, useState } from "react";

export const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/account/isAuthenticated")
      .then((response) => response.json())
      .then((data) => {
        setIsAuthenticated(data.isAuthenticated);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Homepageeeeeeeee</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <button
          id="loginBtn"
          style={{ display: isAuthenticated ? "none" : "block" }}
        >
          Login
        </button>
        <button
          id="registerBtn"
          style={{ display: isAuthenticated ? "none" : "block" }}
        >
          Register
        </button>
      </div>
      <button
        id="accountBtn"
        style={{ display: isAuthenticated ? "block" : "none" }}
        onClick={() => {
          window.location.href = "/account/overview";
        }}
      >
        Account
      </button>
    </div>
  );
};
