

function init(){
    loadHeader();
}

function loadHeader(){

    document.getElementById("email-header").innerHTML = 
        "<h1 id=\"logo\"><a href = \"inbox.html\">EMAIL</a></h1>"
        + "<div class=\"search-container\">"
        + "<form action=\"index.html\">"
        + "<input type=\"text\" placeholder=\"Search..\" name=\"search\">"
        + "<button type=\"submit\">Search</button>"
        + "</form></div>";
}

function gotIt(){
    var banner = document.getElementById("banner-notif");
    banner.style.display = "none";
}

//takes int x and opens corresponding email
function openEmail(list, x){
    //add error checking
    var modal = document.getElementById("myModal");
    
    var emailAddress = document.getElementById("email");
    var sender = document.getElementById("sender");
    var subject = document.getElementById("subject");
    var email = document.getElementById("body");

    emailAddress.innerHTML = list[x].senderEmail;
    sender.innerHTML = list[x].sender;
    subject.innerHTML = "Subject:" + list[x].subject;
    email.innerHTML = list[x].text; 
    //display modal
    modal.style.display = "block";
   
}

//generates the email of emailNum at certain rowNum in the table
function generateEmailPrev(list, emailNum){
    var table = document.getElementById("email-table");

    var row = table.insertRow(emailNum);
    row.className = "email-prev";
    row.onclick= function() {openEmail(list, emailNum)};

    var sender = row.insertCell(0);
    sender.className="from";
    var subject = row.insertCell(1);
    subject.className = "preview";
    var time = row.insertCell(2);
    time.className = "time";

    var emailObj = list[emailNum];
    sender.innerHTML = emailObj.sender;
    subject.innerHTML = emailObj.subject;
    time.innerHTML = emailObj.time;
}

function loadEmailPrevs(list){
    for(var i = 0; i < list.length; i++){
        generateEmailPrev(list, i);
    }
}

function closeEmail(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

//Email structure: senderEmail, sender, subject, time, text
var inboxEmails = [];

inboxEmails[0] = {
    senderEmail: "rosa.line@stonybrook.edu",
    sender: "Rosa Line",
    subject: "Concerning the news",
    time: "8:43",
    text: `Hi Gregor, <br> <br>
    I heard about your affliction through a mutual acquaintance. 
    I am very sorry to hear that you can no longer get up on your own 
    in the mornings. From what I hear, you have transformed quite a bit. 
    <br> I think I know someone who may be able to help. Let me know if you
    want to discuss this over coffee.
    <br><br> Best, <br> Rosa`
};

inboxEmails[1] = {
    senderEmail: "rosa.line@stonybrook.edu",
    sender: "Rosa Line",
    subject: "About out Collaboration",
    time: "8:43",
    text: `Hi Gregor, <br> <br>
    My condolences for your unfortunate condition. I can't 
    imagine what it's like to be in your position right now. 
    I am inexperienced in such matters, but perhaps an entomologist 
    would be able to shed some light into what is happening. 
    Once again, best of luck regarding your health. 
    <br><br>If you need to take time off from our collaboration 
    to recooperate, I completely understand.

    <br><br> Sincerely, <br> Sam`
};

//Email structure: senderEmail, sender, subject, time, text
var starredEmails = [];

//Email structure: senderEmail, sender, subject, time, text
var draftEmails = [];

//Email structure: senderEmail, sender, subject, time, text
var sentEmails = [];

//Email structure: senderEmail, sender, subject, time, text
var spamEmail = [];

spamEmail[0] = {
    senderEmail: "",
    sender: "",
    subject: "",
    time: "",
    text: ""
};