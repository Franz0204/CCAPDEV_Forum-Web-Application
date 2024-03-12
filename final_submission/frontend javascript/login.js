

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
  
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Get input values
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      // Perform basic validation
      if (validateField(username) && validateField(password)) {
        // Send the credentials to the server for further validation
        sendCredentialsToServer(username, password);
      } else {
        alert("Please enter valid credentials.");
      }
    });

    function validateField(value) {
        return value.trim() !== "";
      }
    
      function sendCredentialsToServer(username, password) {
       
        fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
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