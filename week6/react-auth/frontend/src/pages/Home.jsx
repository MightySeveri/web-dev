import React from "react";

function Home() {
  const user = JSON.parse(sessionStorage.getItem("user"));
// user.email

  return (
    <main>
      <h2>Welcome to Our Website</h2>
      <nav>
      Welcome, <span id="user-email">{user.email}</span>
      </nav>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo
        vel tortor varius fermentum id quis justo. Nullam ultrices dolor nec
        justo ultricies, at fermentum mauris tristique. Duis id efficitur
        libero.
      </p>
      <img
        src="https://placehold.co/400"
        alt="Placeholder"
      />
    </main>
  );
}

export default Home;
