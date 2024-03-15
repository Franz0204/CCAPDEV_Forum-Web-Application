const Comment = function(original,id,username,name,date,body) {
    this.original = original;
    this.id = id;
    this.username = username;
    this.name = name;
    this.date = date;
    this.body = body;
}

const currentUser = "MCruz03";

document.addEventListener("DOMContentLoaded", function() {
    const commentInput = document.querySelector("#comment-submit");
    commentInput?.addEventListener("click", async(e) => {
        e.preventDefault();
        e.stopPropagation();
        const commenttext = document.querySelector("#comment-text").value;
        if(commenttext != "") {
            let today = new Date();
            let formatted = formatDate(today);
            let commentid = Date.now().toString() + currentUser;
            let newcomment = new Comment(document.querySelector("#postid").value, commentid, currentUser,"Maria Cruz",formatted,commenttext);
            let commentObject = {
                original_postid: newcomment.original,
                commentid: newcomment.id,
                username: newcomment.username,
                name: newcomment.name,
                date: newcomment.date,
                text: newcomment.body
            };
            console.log(newcomment.body);
            let cjstring = JSON.stringify(commentObject);
            try {
                const response = await fetch('/make-comment', {
                    method: 'POST',
                    body: cjstring,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (response.status === 200) {
                    console.log('success');
                    makeComment(newcomment);
                }
            }catch(err) {
                console.error(err);
            }
        }
    }, true);

    function makeComment(comment) {
        let commentHTML = $("<div>" +
        "<div>" +
            "<div>" + "<img class='comment-user-pic'>" + "</div>" +
            "<div>" + 
                "<div>" + "</div>" +
                "<div>" + "</div>" +
            "</div>" +
            "<div>" + "</div>" +
        "</div>" +
        "<div>" +
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

        let classes = ["comment-box-header","comment-box-header-icon","comment-box-header-data-container","comment-box-header-username","comment-box-header-handle",
        "comment-box-header-date","comment-box-body","comment-box-text","comment-box-footer","upvotes","downvotes","comments"];
        let usname = document.createTextNode(comment.username);
        let n = document.createTextNode(comment.name);
        let d = document.createTextNode(comment.date);
        let b = document.createTextNode(comment.body);

        $(commentHTML).find("div").each(function(i) {
            if(i === 0) {
                $(this).parent().addClass("comment-box");
            }
            $(this).addClass(classes[i]);
        })
        let iconpath = "/static/profile_assets/" + comment.username + ".jpg";
        $(commentHTML).find(".comment-box-header-username").append(n);
        $(commentHTML).find(".comment-box-header-handle").append(usname);
        $(commentHTML).find(".comment-box-header-date").append(d);
        $(commentHTML).find(".comment-box-text").append(b);
        $(commentHTML).find(".comment-user-pic").attr("src",iconpath);
        $("div#comment-container").prepend(commentHTML);
        
    }

    function formatDate(date) {
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        let formattedDate = months[date.getMonth()] + " " + date.getDate().toString().padStart(2,0) + ", " + date.getFullYear().toString();
        return formattedDate;
    }
})