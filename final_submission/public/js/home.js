const Post = function(id,username,name,date,title,body) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.date = date;
    this.title = title;
    this.body = body;
}
const posts = [];

document.addEventListener("DOMContentLoaded",function() {
    const postInput = document.querySelector("#submit-post");
    const imageInput = document.querySelector("#post-image-upload");

    postInput.addEventListener("click",function(e) {
        e.preventDefault();
        let title = document.querySelector("#title-input").value;
        let body = document.querySelector("#post-body-textarea").value;
        if(validateField(title) && validateField(body)) {
            let today = new Date();
            let formatted = formatDate(today);
            let p = new Post("00001","baen","Baen Baen",formatted,title,body); //will fix placeholders later
            posts.push(p);
            makePost(p);
        }
    })

    function validateField(value) {
        if(value === "") {
            return false;
        }
        return true;
    }

    function makePost(post) {
        let postHTML = $("<div>" +
        "<div>" +
            "<div>" + "<img src='profile_assets/gojo_pfp.jpg'>" + "</div>" +
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
                "<span>" + "<img class='note-sprite' src='generic_assets/upvote.png'>" + "</span>" +
            "</div>" +
            "<div>" +
                "<span>" + "<img class='note-sprite' src='generic_assets/downvote.png'>" + "</span>" +
            "</div>" +
            "<div>" +
                "<span>" + "<img class='note-sprite' src='generic_assets/comment.png'>" + "</span>" +
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
        $(postHTML).find(".post-box-header-username").append(rn);
        $(postHTML).find(".post-box-header-handle").append(handle);
        $(postHTML).find(".post-box-header-date").append(d);
        $(postHTML).find(".post-box-title").append(t);
        $(postHTML).find(".post-box-text").append(b);
        $("div#post-side").append(postHTML);
    }

    function formatDate(date) {
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let formattedDate = months[date.getMonth()] + " " + date.getDate().toString().padStart(2,0) + ", " + date.getFullYear().toString();
        return formattedDate;
    }
})

