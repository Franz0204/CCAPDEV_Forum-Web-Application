document.addEventListener("DOMContentLoaded", function() {
    searchInput = document.querySelector(".search-style");
    searchInput.addEventListener("click", async(e) => {
        e.preventDefault();
        searchText = document.querySelector("#search-field").value;
        if(searchText != "") {
            window.location.href = '/search/' + searchText;
        }
    })
});