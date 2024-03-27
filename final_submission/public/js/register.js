const User = function (name, email, password, username){
    this.name = name;
    this.email = email;
    this.password = password;
    this.username = username;
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
        const realName = formData.get('realname');

        //Make a validation email function
        //It basically gets the entered input in the email field then checks if it ends with '@<email-website>.com' 
        const email = formData.get('email');
        const password = formData.get('password');
        const username = formData.get('username');


        // Perform validation
        if (validateField(username) && validateField(email) && validateField(password) && validateField(realName)) {
            let u = new User(realName, email, password, username);


            let registerobject = {
                name: u.name,
                email: u.email,
                password: u.password,
                username: u.username
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
                })
                if (response.ok) {
                    console.log('success');
                }else if(response.status === 403) {
                    let e = document.createTextNode("Error: user already exists!");
                    document.querySelector("#errorm").append(e);
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
