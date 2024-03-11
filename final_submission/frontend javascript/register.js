const User = function (id, username, email, password, handle){

    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.handle = handle 
}



const users = [];

document.addEventListener("DOMContentLoaded",function() {
    const userInput = document.querySelector("#registerBtn");
    


    userInput.addEventListener("click", function (e) {
        e.preventDefault();
        let username = document.querySelector("#username").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let handle = document.querySelector("#handle").value;
        if(validateField() && validateField() && validateField() & validateField()) {
            let u = new User();
            users.push(u);
        }
    })


    function validateField(value) {
        if (value === " "){
            return false;
        }
            return true;
    }
})