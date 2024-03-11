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
    


    userInput.addEventListener("click", function (e) {
        e.preventDefault();
        let username = document.querySelector("#username").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let handle = document.querySelector("#handle").value;
        if(validateField(username) && validateField(email) && validateField(password) & validateField(handle)) {
            let userId = Date.now().toString();

            let newUser = new User(userId, username, email, pasword, handle);
            users.push(newUser);
 
            const usersJSON = JSON.stringify(users,null, 2);
            
           

            document.querySelector("#username").value = "";
            document.querySelector("#email").value = "";
            document.querySelector("#password").value = "";
            document.querySelector("#handle").value = "";
        

        alert('User registered successfully!');
        }
    });


    function validateField(value) {
       return value.trim() !== "";
    }

  
});