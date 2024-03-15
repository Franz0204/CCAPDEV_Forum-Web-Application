//const fd = require("form-data");
const Post = function(id,username,name,date,title,body) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.date = date;
    this.title = title;
    this.body = body;
}
const posts = [];
const currentUser = "MCruz03";

document.addEventListener("DOMContentLoaded",function() {
    const postInput = document.querySelector("#submit-post");
    const imageInput = document.querySelector("#post-image-upload");
    const postForm = document.querySelector("#post-entry-box");
    
    
    postInput?.addEventListener("click", async(e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        let title = document.querySelector("#title-input").value;
        let body = document.querySelector("#post-body-textarea").value;
        console.log("step 1");
        if(validateField(title) && validateField(body)) {
            let today = new Date();
            let formatted = formatDate(today);
            let postid = Date.now().toString() + currentUser;
            console.log(postid);
            let tagstring = document.querySelector("#post-tags-input").value;
            let tagarray = tagstring.split(",");
            let haspic = false;
            let file = imageInput.files;
            let p = new Post(postid,currentUser,"Maria Cruz",formatted,title,body,tagarray); //will fix placeholders later
            posts.push(p);
            console.log("step 2");
            let postobject = {
                postid: p.id,
                username: p.username,
                name: p.name,
                date: p.date,
                title: p.title,
                body: p.body
            }

            if(tagstring != "") {
                postobject.tags = tagarray;
            }

            if(file.length > 0) {
                postobject.hasImage = true;
                haspic = true;
            }

            let pjstring = JSON.stringify(postobject);
            try {
                const response = await fetch('/make-post', {
                    method: 'POST',
                    body: pjstring,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    if(!haspic) {
                        makePost(p,tagstring,haspic);
                    }
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
                    makePost(p,tagstring,haspic);
                    console.log('success');
                }
            }
            console.log("step 4");
        }

    });

    function validateField(value) {
        if(value === "") {
            return false;
        }
        return true;
    }

    function makePost(post,tagstring,haspic) {
        let postHTML = $("<div>" +
        "<div>" +
            "<div>" + "<img class='post-user-pic'>" + "</div>" +
            "<div>" + 
                "<div>" + "</div>" +
                "<div>" + "</div>" +
            "</div>" +
            "<div>" + "</div>" +
        "</div>" +
        "<div>" + "<div>" + "</div>" + "<hr class='title-divider'>" +
            "<div>" + "</div>" +
        "</div>" + 
        "<div>" + 
            "<div>" +
                "<span>" + "<img class='note-sprite' src='/static/generic_assets/upvote.png'>" + "</span>" +
            "</div>" +
            "<div>" +
                "<span>" + "<img class='note-sprite' src='/static/generic_assets/downvote.png'>" + "</span>" +
            "</div>" +
            "<div>" +
                "<span>" + "<img class='note-sprite' src='/static/generic_assets/comment.png'>" + "</span>" +
            "</div>" +
        "</div>" +
        "</div>")
        let classes = ["post-box-header","post-box-header-icon","post-box-header-data-container","post-box-header-username","post-box-header-handle","post-box-header-date", "post-box-body", "post-box-title", "post-box-text","post-box-footer","upvotes","downvotes","comments"];
        let handle = document.createTextNode(post.username);
        let rn = document.createTextNode(post.name);
        let d = document.createTextNode(post.date);
        let t = document.createTextNode(post.title);
        let b = document.createTextNode(post.body);
        $(postHTML).find("div").each(function(i) {
            if(i === 0) {
                $(this).parent().addClass("post-box");
            }
            $(this).addClass(classes[i]);
        })
        let iconpath = "/static/profile_assets/" + post.username + ".jpg";
        $(postHTML).find(".post-box-header-username").append(rn);
        $(postHTML).find(".post-box-header-handle").append(handle);
        $(postHTML).find(".post-box-header-date").append(d);
        $(postHTML).find(".post-box-title").append(t);
        $(postHTML).find(".post-box-text").append(b);
        if(tagstring != "") {
            let tagarray = tagstring.split(",");
            tagarray.forEach(function(item) {
                let tagPath = "/tagged/" + item;
                let tagSpan = $("<span class='tag'>" + "<a>" + " #" + item + "</a>" + "</span>");
                $(tagSpan).find("a").attr("href",tagPath);
                $(postHTML).find(".post-box-text").append(tagSpan);
            })
        }
        if(haspic) {
            let imgHTML = $("<div class='post-image'>" + "<img>" + "</div>");
            let imgPath = "/static/post_images/" + post.id + ".jpg";
            $(imgHTML).find("img").attr("src", imgPath);
            $(postHTML).find(".post-box-body").append(imgHTML);
        }
        $(postHTML).find(".post-user-pic").attr("src",iconpath);
        $("div#post-side").append(postHTML);
    }

    function formatDate(date) {
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let formattedDate = months[date.getMonth()] + " " + date.getDate().toString().padStart(2,0) + ", " + date.getFullYear().toString();
        return formattedDate;
    }

    function clearPostFields() {
        document.querySelector("#title-input").value = "";
        document.querySelector("#post-body-textarea").value = "";
    }
})


