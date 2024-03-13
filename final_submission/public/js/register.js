const User = function (username, email, password, handle){
    this.username = username;
    this.email = email;
    this.password = password;
    this.handle = handle;
};



const users = [];

document.addEventListener("DOMContentLoaded", function () {
    console.log("Test")
    const userForm = document.querySelector("#register-form");
    const userInput = document.querySelector("#registerBtn");

    userInput?.addEventListener("click", async function (e) {
        e.preventDefault();

        const formData = new FormData(userForm);
        
        // Extract values from FormData object
        const username = formData.get('username');

        //Make a validation email function
        //It basically gets the entered input in the email field then checks if it ends with '@<email-website>.com' 
        const email = formData.get('email');
        const password = formData.get('password');
        const handle = formData.get('handle');


        // Perform validation
        if (validateField(username) && validateField(email) && validateField(password) && validateField(handle)) {
            let u = new User(username, email, password, handle);


            let registerobject = {
                username: u.username,
                email: u.email,
                password: u.password,
                handle: u.handle
            }

            

            let rgstring = JSON.stringify(registerobject);
            console.log(rgstring)
            try {
                const response = await fetch('/make-user', {
                    method: 'POST',
                    body: rgstring,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })/*.then((response) => response.json())
                .then((data) => {
              
                  console.log(data);
                 
                  if (data.success) {
                    window.location.href = "/login";
                  } else {
                    alert("Invalid. Credentials already exist. Please try again.");
                  }
                })
                .catch((error) => {
                  console.error("Error:", error);
                })*/

                //After, remove this v
                if (response.ok) {
                    console.log('success');
                    window.location.href = '/login'
                }
            } catch (err) {
                console.error(err);
            }
        }
    });

    function validateField(value) {
        return value.trim() !== "";
    }
});
