const User = function (username, email, password, handle, body){
    this.username = username;
    this.email = email;
    this.password = password;
    this.handle = handle;
    this.body = body;
};



const users = [];

document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.querySelector("#register-form");

    const userInput = document.querySelector("#registerBtn");

    userInput?.addEventListener("click", async function (e) {
        e.preventDefault();

        const formData = new FormData(userForm);

        // Extract values from FormData object
        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const handle = formData.get('handle');
        const body = formData.get('body'); // Assuming 'body' field exists

        // Perform validation
        if (validateField(body)) {
            let u = new User("User1", username, email, password, handle, body);
            users.push(u);
            makeUser(u);

            let registerobject = {
                username: u.username,
                email: u.email,
                password: u.password,
                handle: u.handle,
                body: u.body
            }

            let rgstring = JSON.stringify(registerobject);
            try {
                const response = await fetch('/make-user', {
                    method: 'POST',
                    body: rgstring,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                if (response.ok) {
                    console.log('success');
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
