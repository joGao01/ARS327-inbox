

function init(){
    loadHeader();
}

function loadHeader(){

    document.getElementById("email-header").innerHTML = 
        "<h1 id=\"logo\">EMAIL</h1>"
        + "<div class=\"search-container\">"
        + "<form action=\"index.html\">"
        + "<input type=\"text\" placeholder=\"Search..\" name=\"search\">"
        + "<button type=\"submit\">Search</button>"
        + "</form></div>";
}

//takes int x and opens corresponding email
function openEmail(x){
    //add error checking
    var modal = document.getElementById("myModal");
    
    var emailAddress = document.getElementById("email");
    var sender = document.getElementById("sender");
    var subject = document.getElementById("subject");
    var email = document.getElementById("body");

    emailAddress.innerHTML = emails[x].senderEmail;
    sender.innerHTML = emails[x].sender;
    subject.innerHTML = emails[x].subject;
    email.innerHTML = emails[x].text; 
    //display modal
    modal.style.display = "block";
   
}

function closeEmail(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

var emails = [];

emails[0] = {
    senderEmail: "sam.stanley@stonybrook.edu",
    sender: "Sam Stanley",
    subject: "Pasta or Beans",
    text:"Pasta or Beans bro?"
};