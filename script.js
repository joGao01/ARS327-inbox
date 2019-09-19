
function loadHeader(){

    document.getElementById("email-header").innerHTML = 
        "<h1>EMAIL</h1>"
        + "<div class=\"search-container\">"
        + "<form action=\"index.html\">"
        + "<input type=\"text\" placeholder=\"Search..\" name=\"search\">"
        + "<button type=\"submit\">Search</button>"
        + "</form></div>";
}