const User = function (id, username, email, password, handle){

    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.handle = handle 
};



const users = [];

document.addEventListener("DOMContentLoaded",function() {
    const userInput = document.querySelector("#registerBtn");
    


    userInput.addEventListener("click", async function (e) {
        e.preventDefault();
        let username = document.querySelector("#username").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let handle = document.querySelector("#handle").value;
        if (validateField(username) && validateField(email) && validateField(password) && validateField(handle)) {
            try {
                const response = await fetch('/make-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        handle
                    })
                });

                if (response.ok) {
                    alert('User registered successfully!');
                    document.querySelector("#username").value = "";
                    document.querySelector("#email").value = "";
                    document.querySelector("#password").value = "";
                    document.querySelector("#handle").value = "";
                } else {
                    console.error('Failed to register user');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });

    function validateField(value) {
        return value.trim() !== "";
    }
});