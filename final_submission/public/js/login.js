document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.querySelector("#loginBtn");

  loginBtn.addEventListener("click", async function (e) {
      e.preventDefault();

      // Get input values
      const handle = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      // Perform basic validation
      if (validateField(handle) && validateField(password)) {
          // Send the credentials to the server for further validation
          sendCredentialsToServer(handle, password);
      } else {
          alert("Please enter valid credentials.");
      }
  });

  function validateField(value) {
      return value.trim() !== "";
  }

  function sendCredentialsToServer(handle, password) {
      fetch("/go-login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ handle, password }),
      })
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          if (data.success) {
              window.location.href = "/home";
          } else {
              alert("Invalid credentials. Please try again.");
          }
      })
      .catch((error) => {
          console.error("Error:", error);
      });
  }
});
