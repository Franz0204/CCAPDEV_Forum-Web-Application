document.addEventListener("DOMContentLoaded", function () {
    console.log("Test");

    const saveButton = document.querySelector("#SaveBtn");
    const cancelButton = document.querySelector("#CancelBtn");
    const pfpInput = document.querySelector("#pfp-image-upload");
    const pfpEditLabel = document.querySelector("#icon-edit");

    pfpEditLabel.addEventListener("click", function (e) {
        pfpInput.value = null;
    });

    saveButton?.addEventListener("click", async function (e) {
        e.preventDefault();
        const updatedUser = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            name: document.getElementById('name').value,
            bio: document.getElementById('about-me').value
        };
        console.log(updatedUser);
        if (validateField(updatedUser.username) && validateField(updatedUser.password) && validateField(updatedUser.name) && validateField(updatedUser.bio)) {
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
                    window.location.href = '/profiles/' + updatedUser.username;
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
        window.location.href = '/profiles/{{this.username}}';
    });

    function validateField(value) {
        return value.trim() !== "";
    }
});
