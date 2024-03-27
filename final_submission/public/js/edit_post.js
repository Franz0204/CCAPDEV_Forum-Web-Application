const Post = function(id,username,name,date,title,body) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.date = date;
    this.title = title;
    this.body = body;
}
const posts = [];

document.addEventListener("DOMContentLoaded", function() {
    const postInput = document.querySelector("#submit-post");
    const imageInput = document.querySelector("#post-image-upload");

    postInput?.addEventListener("click", async(e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        let title = document.querySelector("#title-input").value;
        let body = document.querySelector("#post-body-textarea").value;
        console.log("step 1");
        if(validateField(title) && validateField(body)) {
            let today = new Date();
            let formatted = formatDate(today);
            let tagstring = document.querySelector("#post-tags-input").value;
            let tagarray = tagstring.split(",");
            let haspic = false;
            let file = imageInput.files;
            let currentUser = document.querySelector("#userin").value;
            let curName = document.querySelector("#realnamein").value;
            let postid = document.querySelector("#postid").value;
            let p = new Post(postid,currentUser,curName,formatted,title,body,tagarray); //will fix placeholders later
            posts.push(p);
            console.log("step 2");
            let postobject = {
                postid: p.id,
                username: p.username,
                name: p.name,
                date: p.date,
                title: p.title,
                body: p.body,
                changedImage: false
            }

            if(tagstring != "") {
                postobject.tags = tagarray;
            }else if(tagstring === "") {
                postobject.tags = [];
            }

            if(file.length > 0) {
                postobject.changedImage = true;
            }

            let pjstring = JSON.stringify(postobject);
            try {
                const response = await fetch('/update-post', {
                    method: 'PUT',
                    body: pjstring,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    window.location.href = "/home";
                    console.log('success');
                }
            }catch(err) {
                console.error(err);
            }
            console.log("step 3");

            if(file.length > 0) {
                let imgname = p.id + ".jpg";
                const formData = new FormData();
                formData.append('filename',imgname);
                formData.append('file',file[0],imgname);
                console.log(formData);
                const fileresponse = await fetch('/upload-post-image', {
                    method: 'POST',
                    body: formData
                });
                if(fileresponse.status === 200) {
                    window.location.href = "/home";
                    console.log('success');
                }
            }
            console.log("step 4");
            clearPostFields();
        }

    });

    function validateField(value) {
        if(value === "") {
            return false;
        }
        return true;
    }

    function formatDate(date) {
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let formattedDate = months[date.getMonth()] + " " + date.getDate().toString().padStart(2,0) + ", " + date.getFullYear().toString();
        return formattedDate;
    }

    function clearPostFields() {
        document.querySelector("#title-input").value = "";
        document.querySelector("#post-body-textarea").value = "";
        document.querySelector("#post-tags-input").value = "";
        imageInput.value = null;
    }
})