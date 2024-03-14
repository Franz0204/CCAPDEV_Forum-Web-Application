document.addEventListener("DOMContentLoaded", function () {
    console.log("Test")
    const saveButton = document.querySelector("#SaveBtn");
    const cancelButton = document.querySelector("#CancelBtn");

    saveButton?.addEventListener("click", async function (e) {
    e.preventDefault();
    console.log("test");
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const aboutMe = document.getElementById('about-me').value;

    if (validateField(username) && validateField(password) && validateField(aboutMe)) {
        let updatedUser = {
            username: username,
            password: password,
            bio: aboutMe
        };

        try {
            const response = await fetch('/update-profile', {
                method: 'PUT',
                body: JSON.stringify(updatedUser),
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
                console.log('Profile updated successfully');
                window.location.href = '/profile/' + username;

            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }
    });

    cancelButton?.addEventListener("click", function () {
    console.log("test");
    const username = document.getElementById('username').value; 
    window.location.href = '/home'; 
});
});
