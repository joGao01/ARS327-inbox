
function init(){
    loadHeader();
    if((window.location.href).toLowerCase().includes("index.html")){
        //reset sessionStorage
        sessionStorage.setItem("inbox", "");
        sessionStorage.setItem("starred", "");
        sessionStorage.setItem("sent", "");
        sessionStorage.setItem("draft", "");
        sessionStorage.setItem("archived", "");
        sessionStorage.setItem("spam", "");
        sessionStorage.setItem("trash", "");
        sessionStorage.setItem("emailsVisited", "0");
        sessionStorage.setItem("initialSpam", "6");
    }
    if(window.location.search.substr(1) != ""){
        loadEmailPrevs(window.location.search.substr(1), eval(window.location.search.substr(1)+"Emails"));
    } else {
        loadEmailPrevs('inbox', inboxEmails)
    }

    if(sessionStorage.getItem("emailsVisited") == "0"){
        var banner = document.getElementById("banner-notif");
        banner.style.display = "block";
    }
}

function loadHeader(){
    document.getElementById("email-header").innerHTML = 
        "<h1 id=\"logo\"><a href = \"inbox.html\">EMAIL</a></h1>"
        + "<div class=\"search-container\">"
        + "<form action=\"bug.html\">"
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
    
   // var emailAddress = document.getElementById("email");
    var sender = document.getElementById("sender");
    var subject = document.getElementById("subject");
    var email = document.getElementById("body");

   // emailAddress.innerHTML = list[x].senderEmail;
    console.log(list[x].sender);
    sender.innerHTML = list[x].sender + " (" + list[x].senderEmail + ")";
    subject.innerHTML = list[x].subject;
    email.innerHTML = list[x].text; 

    //cache stuff to sessionStorage
    var li = window.location.search.substr(1);
    if(li != ""){
        var vili = sessionStorage.getItem(li).split(",");
    } else {
        var vili = sessionStorage.inbox.split(",");
        li = "inbox";
    }
    if(!vili.includes(x+"")){
        vili.push(x);
        sessionStorage.setItem(li, vili.toString());
        var emailsVisited = parseInt(sessionStorage.getItem("emailsVisited"));
        sessionStorage.setItem("emailsVisited", emailsVisited+1);
    }
    console.log(sessionStorage);

    var row = document.getElementById("email-table").rows[x];
    row.classList.add("visited");
    //display modal
    modal.style.display = "block";
   
}

//generates the email of emailNum at certain rowNum in the table
function generateEmailPrev(list, emailNum, visited){
    var table = document.getElementById("email-table");

    var row = table.insertRow(emailNum);
    row.className = "email-prev";
    row.onclick= function() {openEmail(list, emailNum)};
    if (visited){
        row.classList.add("visited");
    }

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

function loadEmailPrevs(str, list){
    //clear original table
    console.log(sessionStorage);
    var tableParent = document.getElementById("email-table").parentElement;
    tableParent.removeChild(document.getElementById("email-table"));
    var newTable = document.createElement("table");
    newTable.id = "email-table";
    tableParent.append(newTable);

    var currActive = document.getElementsByClassName("active");
    if(currActive.length != 0){
        currActive[0].firstChild.style.color = "navy";
        currActive[0].classList.remove("active");
    }
    document.getElementById(str).firstChild.style.color = "white";
    document.getElementById(str).className = "active";

    if(window.location.search.substr(1) != ""){
        var thing = window.location.search.substr(1);
    } else {
        var thing = "inbox";
    } 
    var visited;
    for(var i = 0; i < list.length; i++){
        visited = hasVisited(thing, i+"");
        console.log(visited);
        generateEmailPrev(list, i, visited);
        
    }
}

//checks if email has been visited
function hasVisited(listName, num){
    var listString = sessionStorage.getItem(listName);
    var vilist = listString.split(",");
    if (vilist.includes(num+"")){
        return true;
    }
    return false;
}

function closeEmail(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

//Email structure: senderEmail, sender, subject, time, text
var inboxEmails = [];

inboxEmails.push({
    senderEmail: "auto-noreply@email.com",
    sender: "System Notification",
    subject: "[IMPORTANT] Notification of Inbox Termination",
    time: "8:43AM",
    text: `Gregor Samsa, <br> <br>
    This is an auto-generated notification email to let you know that 
    this inbox {gregor.samsa@amazoff.com} will be archived in 24 hours. It will no longer receive incoming
    emails or be able to send outgoing mail. It is being archived at the
    request of {Jefe Bezos} for the following reason:

    <br><br> Temination of Employment
    <br><br> Please take appropriate measures and proceed accordingly.
    If you think this was a mistake please contact {Jefe.Bezos@amazoff.com}.
    Upon archiving, the contents of the inbox will be handed over to 
    {greteSa@email.com}.
    `
});

inboxEmails.push({
    senderEmail: "brandonTheMan@email.com",
    sender: "Brandon TheMan",
    subject: "RE: Concerning your Graigslist Listing",
    time: "09/16/19",
    text: `Good morning Gregor, <br><br>
    Hey, this is a follow up email about your Graigslist listing. Could you 
    please consider my initial email and give me a response. I am in dire need
    of a mattress and a bedframe.
    <br><br> Brandon`
});

inboxEmails.push({
    senderEmail: "greteSa@email.com",
    sender: "Grete Samsa",
    subject: "RE:Furniture",
    time: "09/15/19",
    text: `We have to find a way to pay the bills too. We're
    just doing what's best for you.`
});

inboxEmails.push({
    senderEmail: "brandonTheMan@email.com",
    sender: "Brandon TheMan",
    subject: "Concerning your Graigslist Listing",
    time: "09/15/19",
    text: `Good morning Gregor, <br><br>
    I came across your listing for a bed frame and a mattress from this morning, and I'm contacting you to
    see if the prices can be negotiated. 
    <br><br> Brandon`
});

inboxEmails.push({
    senderEmail: "auto-noreply@email.com",
    sender: "System Announcement",
    subject: "[IMPORTANT] Termination of Inbox in Two Weeks",
    time: "09/13/19",
    text: `Hello Gregor, <br><br>
    This is an auto-generated notification email to notify you that 
    this inbox {gregor.samsa@amazoff.com} will be archived in 2 weeks time. 
    It will no longer receive incoming emails or be able to send outgoing 
    mail. It is being archived at the request of {Jefe Bezos} for the 
    following reason:

    <br><br> Temination of Employment
    <br><br> Please take appropriate measures and proceed accordingly.
    If you think this was a mistake please contact {Jefe.Bezos@amazoff.com}.
    `
});

inboxEmails.push({
    senderEmail: "jefe.bezos@amazoff.com",
    sender: "Jefe Bezos",
    subject: "RE:RE Extended Time Off",
    time: "09/13/19",
    text: `Gregor <br> <br>
    That is correct. You will not be paid for this period.
    <br><br>Best, <br> Jefe Bezos <br> CEO of Amazoff`
});

inboxEmails.push({
    senderEmail: "Jefe.Bezos@amazoff.com",
    sender: "Jefe Bezos",
    subject: "Extended Time Off",
    time: "09/13/19",
    text: `Hello Gregor, <br> <br>
    Unfortunately, your performance in the past two weeks has been subpar.
    While you retain the ability to write and compose emails, I've received 
    multiple complaints regarding your inability to communicate in person.  
    Given the progression of your condition, it would be best if you took 
    time off. 
    <br> Should your ailment show signs of easing up, you will be allowed to
    return to work.
    <br><br>Best, <br> Jefe Bezos <br> CEO of Amazoff
    `
});

inboxEmails.push({
    senderEmail: "Sal.Lami@eyebm.com",
    sender: "Sal Lami",
    subject: "RE:RE: About out Collaboration",
    time: "09/10/19",
    text: `Hi Gregor, <br> <br>
    I understand.

    <br><br> Sincerely, <br> Sam`
});

inboxEmails.push({
    senderEmail: "greteSa@email.com",
    sender: "Grete Samsa",
    subject: "RE: Forgot my lunch",
    time: "09/10/19",
    text: `
    Sorry Im busy
    `
});

inboxEmails.push({
    senderEmail: "Sal.Lami@eyebm.com",
    sender: "Sal Lami",
    subject: "About out Collaboration",
    time: "09/10/19",
    text: `Hi Gregor, <br> <br>
    My condolences for your unfortunate condition. I can't 
    imagine what it's like to be in your position right now. 
    I am inexperienced in such matters, but perhaps an entomologist 
    would be able to shed some light into what is happening. 
    Once again, best of luck regarding your health. 
    <br><br>If you need to take time off from our collaboration 
    to recooperate, I completely understand.

    <br><br> Sincerely, <br> Sam`
});

inboxEmails.push({
    senderEmail: "greteSa@email.com",
    sender: "Grete Samsa",
    subject: "RE:RE: I heard about last night",
    time: "09/07/19",
    text: `Hey, <br> <br>
    Let me know if it happens again. 

    <br><br>Love, <br> Grete 
    `
});

inboxEmails.push({
    senderEmail: "greteSa@email.com",
    sender: "Grete Samsa",
    subject: "I heard about last night",
    time: "09/07/19",
    text: `Hey, <br> <br>
    I heard that father threw things at you last night. I'm sorry that I couldn't
    be there to help you. I will have a talk with him when I get back from my trip.

    <br><br>Love, <br> Grete 
    `
});

inboxEmails.push({
    senderEmail: "employee-notification@amazoff.com",
    sender: "Amazoff Announcements",
    subject: "Announcement",
    time: "09/07/19",
    text: `Hello Amazoff Family, <br> <br>
    Following the incident report from one of our employees, we have 
    temporarily stopped the use of pesticides in our building. 
    If you notice any extra bugs (pun intended), please do not be alarmed. 
    <br> And as always, if you are in the technology dept, 
    please flag bugs in your code properly. I'm looking at you SEAN!
    <br><br>Best, <br> Amazoff
    `
});

inboxEmails.push({
    senderEmail: "Jefe.Bezos@amazoff.com",
    sender: "Jefe Bezos",
    subject: "Continued Employment",
    time: "09/05/19",
    text: `Hello Gregor, <br> <br>
    As per our meeting this morning, you will be allowed to continue working here
    under the condition that you are still able to complete tasks and
    communicate with team members. Should your condition worsen, your employment will be terminated promptly.
    <br><br>Best, <br> Jefe Bezos <br> CEO of Amazoff
    `
});

inboxEmails.push({
    senderEmail: "rosaline@email.edu", 
    sender: "Rosa Line",
    subject: "Concerning the news",
    time: "09/05/12",
    text: `Hi Gregor, <br> <br>
    I heard about your affliction through a mutual acquaintance. 
    I am very sorry to hear that you can no longer get up on your own 
    in the mornings. From what I hear, you have transformed quite a bit. 
    <br> I think I know someone who may be able to help. Let me know if you
    want to discuss this over coffee.
    <br><br> Best, <br> Rosa`
});

inboxEmails.push({
    senderEmail: "Devon.Russo@amazoff.com",
    sender: "Devon Russo",
    subject: "Hey man",
    time: "09/04/19",
    text: ` Hey man, <br><br>
    It's your marketing colleague, Devon. I know we've never talked even though
    we work in the same department, but
    I heard what happened to you, and I was checking in to see if you were
    alright. If you ever need anything, just let me know. 

    <br><br> Best, <br> your man Devon`
});

inboxEmails.push({
    senderEmail: "greteSa@email.com",
    sender: "Grete Samsa",
    subject: "Lunch",
    time: "09/04/19",
    text: `Hey Gregor, <br> <br>
    I know you can't use your phone anymore, but I wanted you to know that you
    forgot your lunch at home this morning. As your responsible younger sister,
    there's no way I could let you go hungry. I had your lunch sent to the office.
    I hope you don't mind me sending this to your work email. 

    <br><br>Love, <br> Grete 
    `
});

inboxEmails.push({
    senderEmail: "Jefe.Bezos@amazoff.com",
    sender: "Jefe Bezos",
    subject: "Emergency Meeting Tomorrow",
    time: "09/03/19",
    text: `Hello, <br> <br>
    We will be having a meeting in conference room B to discuss your special
    circumstances tomorrow. Please let me know if you can make it.
    <br><br>Best, <br> Jefe Bezos <br> CEO of Amazoff
    `
});

inboxEmails.push({
    senderEmail: "SamStanley@vector.com",
    sender: "Samuel Stanley",
    subject: "Reaching out about marketing",
    time: "09/01/19",
    text: `Hello Gregor, <br> <br>
    I hope this email finds you well. My name is Samuel Stanley, and I 
    am reaching out to you about selling our knives. I was introduced 
    to you by a friend, Steve Vector. Our knives are of good quality, 
    and my company would be willing to give a discount for bulk purchases. 
    Please let me know what you think of this offer. 
    <br><br>Best, <br> Samuel <br> 
    `
});

//Email structure: senderEmail, sender, subject, time, text
var starredEmails = [];

starredEmails.push({
    senderEmail: "Jefe.Bezos@amazoff.com",
    sender: "Jefe Bezos",
    subject: "Continued Employment",
    time: "09/05/19",
    text: `Hello Gregor, <br> <br>
    As per our meeting this morning, you will be allowed to continue working here
    under the condition that you are still able to complete tasks and
    communicate with team members. Should your condition worsen, your employment will be terminated promptly.
    <br><br>Best, <br> Jefe Bezos <br> CEO of Amazoff
    `
});


//Email structure: senderEmail, sender, subject, time, text
var draftEmails = [];

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "(unsent)",
    time: "09/25/19",
    text: `
    Hungry.
    <br> I would ask how you are doig
    but i dpnt care

    <br><br> Gregor
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "(unsent)",
    time: "09/24/19",
    text: `
    Time passes strangely. This is the only way i know what time it s.
    But i find that i dont caare antmoer

    <br><br> Gregor
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "(unsent)",
    time: "09/22/19",
    text: `
    I don't regret leaving though. 

    <br><br> Gregor
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "(unsent)",
    time: "09/22/19",
    text: `
    I miss having a home. and food. even though I don't eat. 

    <br><br> Gregor
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "Sorry (unsent)",
    time: "09/21/19",
    text: `
    

    <br><br> Gregor
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "Sorry (unsent)",
    time: "09/20/19",
    text: `Grete. <br> <br>
    I heard what you said about me last night. I dont want to be this way.
    But I know where I am unnwanted. I know what the neighbors say about us. 
    Im sorry.

    <br><br> Gregor
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Brandon TheMan",
    subject: "RE:RE: Concerning your Graigslist Listing (unsent)",
    time: "09/16/19",
    text: `
    Sure whatever`
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "Furniture (unsent)",
    time: "09/15/19",
    text: `Grete. <br> <br>
    Why'd you do it? Do you know what it feels like to return to an empty 
    room every night? Why didn't you just sell my bedframe and mattress at a 
    yard sale as well?
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "Furmuture (unsent)",
    time: "09/15/19",
    text: `Grete. <br> <br>
    Please don't sell my fucking stuff.
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "Furmuture (unsent)",
    time: "09/15/19",
    text: `Grete. <br> <br>
    Please don't sell my fucking stuff.
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "RE:RE:Forgot my lunch (unsent)",
    time: "09/10/19",
    text: `
    It's okay. I guess I don't really eat anyway.
    I wonder how long I can last like this.
    <br><br> Gregor`
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "RE: I heard about last night (unsent)",
    time: "09/07/19",
    text: `Grete <br> <br>
    im sorry 
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "RE: I heard about last night (unsent)",
    time: "09/07/19",
    text: `Grete <br> <br>
    why is he like this 

    <br><br> no <br> i know why
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Rosa Line",
    subject: "RE: Concerning the news (unsent)",
    time: "09/05/19",
    text: `Rosa, <br> <br>
    Please stop sending me emails
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Rosa Line",
    subject: "RE: Concerning the news (unsent)",
    time: "09/05/19",
    text: `Rosa, <br> <br>
    Thank you for the concern. Who told you?
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Jefe Bezos",
    subject: "RE: Emergency Meeting Tomorrow (unsent)",
    time: "02/04/19",
    text: `Mr. Bezos <br> <br>
    Who else will be at the meeting? 
    Does everyone already know?

    <br><br> Sinserely, <br> Gregor`
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Jefe Bezos",
    subject: "RE: Emergency Meeting Tomorrow (unsent)",
    time: "02/04/19",
    text: `Mr. Bezos <br> <br>
    Thank you for understanding. You took it well
    `
});

draftEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Jefe Bezos",
    subject: "Unable to go to Work (unsent)",
    time: "02/04/19",
    text: `Mr. Bezos <br> <br>
    How should I tell you that I am a large insect now?
    I cant even explain how it happened.
    I woke up, and looked in my mirror. 
    `
});

//Email structure: senderEmail, sender, subject, time, text
var sentEmails = [];

sentEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "goodbye",
    time: "09/20/19",
    text: `Grete <br> <br>
    Sorry but I cant live there anymore. Goodbye
    I have a laptop, Do not worry
    <br><br> Gregor
    `
});

sentEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "RE:RE:Furniture",
    time: "09/15/19",
    text: `Grete. <br> <br>
    Why'd you do it? Why'd you sell everything else?
    `
});

sentEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "Furniture",
    time: "09/15/19",
    text: `greta <br> <br>
    Graigslist. My furniture. Why?`
});

sentEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Jefe Bezos",
    subject: "RE: Extended Time Off",
    time: "09/13/19",
    text: `Mr. Bezos <br> <br>
    Understood. Am I to understand that I will not be paid during the extended time off?
    <br><br>Best, <br> Gregor`
});

sentEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "Forgot my lunch",
    time: "09/10/19",
    text: `
    can you bring it?
    <br><br> Gregor`
});

sentEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Sal Lami",
    subject: "RE: About our Collaboration",
    time: "09/10/19",
    text: `Hi Sal, <br> <br>
    I apologize for my appearance, and I suggest you reach out to one of 
    my colleagues and ask for them to appear in the commercial.
    <br><br> Gregor
    `
});

sentEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "RE: I heard about last night",
    time: "09/07/19",
    text: `Greta <br> <br>
    its ok 
    <br> I can take it.
    `
});

sentEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Rosa Line",
    subject: "RE: Concerning the news",
    time: "09/05/19",
    text: `Rosa, <br> <br>
    Thank you for the concern. 
    <br><br> Best, <br> Gregor`
});

sentEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Devon Ross",
    subject: "RE: Hey man",
    time: "09/04/19",
    text: `Devon, <br> <br>
    Thank you. They let me keep my job. I can still talk thru email. But 
    I admit typing as a roach is a bit difficult.
    <br><br> Best, <br> Gregor`
});

sentEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Grete Samsa",
    subject: "RE: Lunch",
    time: "09/04/19",
    text: `Grete, <br> <br>
    Thank you. Talking here is fine. After all, how else would I communicate?
    <br><br> Love, <br> Gregor`
});

sentEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Jefe Bezos",
    subject: "RE: Emergency Meeting Tomorrow",
    time: "09/03/19",
    text: `Mr. Bezos <br> <br>
    I will be there.

    <br><br> Best, <br> Gregpr`
});

sentEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Jefe Bezos",
    subject: "Unable to make it to work today",
    time: "09/03/19",
    text: `mr. Bezos <br> <br>
    Due to unforeseen circumstances, I was not able to go to work today.
    My sister Grete has sent an email with the details of my 
    problems. 

    <br><br> Best, <br> Gregor`
});

sentEmails.push({
    senderEmail: "From: gregor.samsa@amazoff.com",
    sender: "To: Samuel Stanley",
    subject: "RE: Reaching out about marketing",
    time: "09/02/19",
    text: `Mr. Stanley <br> <br>
    Thank you for reaching out to me. Unfortunately, I don't have sole power
    in making these decisions. Please direct all marketing inquiries to my employer.
    You can reach him at Jefe.Bezos@amazoff.com. Thank you for contacting Amazoff.

    <br><br> Best, <br> Gregor`
});

var archivedEmails = [];

archivedEmails.push({
    senderEmail: "jefe.bezos@email.com",
    sender: "Jefe Bezos",
    subject: "Fwd: Concerning Gregor's Unique Condition",
    time: "09/03/19",
    text: `
    ---original from greteSa@email.com---<br>
    Mr. Bezos, <br><br>
    Due to unforeseen, inexplicable circumstances, Gregor was unable to make
    it to work this morning. This is going to sound absurd, but bear with me.
    He woke up transformed into a large cockroach. He has been acclimating to 
    his new form and has been slowly regaining his ability to type.
    
    <br><br> Best, <br> Grete`
});

//Email structure: senderEmail, sender, subject, time, text
var spamEmails = [];

spamEmails.push({
    senderEmail: "no-reply@spam.com",
    sender: "Migraine Relief",
    subject: "Destroy your migraines once and for all!",
    time: "09/17/19",
    text: `
    Discover these delightfully simple Trillo 
    keyboard shortcuts and learn how new productivity highs 
    are just a puff of a joint away.
    If you have your eyes set on a new promotion or more 
    responsibility at work, learn how to manage up to keep your
    life from falling apart.
    `
});

spamEmails.push({
    senderEmail: "no-reply@trillo.com",
    sender: "Trillo",
    subject: "Get Trillo for Work!",
    time: "09/17/19",
    text: `
    Discover these delightfully simple Trillo 
    keyboard shortcuts and learn how new productivity highs 
    are just a puff of a joint away.
    If you have your eyes set on a new promotion or more 
    responsibility at work, learn how to manage up to keep your
    life from falling apart.
    `
});

spamEmails.push({
    senderEmail: "mail@mail.adabe.com",
    sender: "Adabe Creative Cloud",
    subject: "The power of the paintbrush",
    time: "09/15/19",
    text: `something something advertisement subscription model
    please buy our insanely expensive products because your company
    forces you to use it. And also only several of our products are actually good
    but you're forced to buy and use all of them anyway.`
});

spamEmails.push({
    senderEmail: "no-reply@trillo.com",
    sender: "Trillo",
    subject: "Get Trillo for Work!",
    time: "09/12/19",
    text: `
    Discover these delightfully simple Trillo 
    keyboard shortcuts and learn how new productivity highs 
    are just a puff of a joint away.
    If you have your eyes set on a new promotion or more 
    responsibility at work, learn how to manage up to keep your
    life from falling apart.
    `
});

spamEmails.push({
    senderEmail: "mail@mail.adabe.com",
    sender: "Adabe Creative Cloud",
    subject: "The power of the paintbrush",
    time: "09/09/19",
    text: `something something advertisement subscription model
    please buy our insanely expensive products because your company
    forces you to use it. And also only several of our products are actually good
    but you're forced to buy and use all of them anyway.`
});

spamEmails.push({
    senderEmail: "info@mail.trianhr.com",
    sender: "Dress Codes For the.",
    subject: "Piercings, Tattoos, and More!",
    time: "09/07/19",
    text: `something something This webinar on Workplace Dress Codes 
    will discuss your reasons and rights as an employer to establish a 
    dress code in your workplace and how to develop and adopt one that 
    complements your business. Don't get tattoos folks!`
});

spamEmails.push({
    senderEmail: "mail@mail.adabe.com",
    sender: "Adabe Creative Cloud",
    subject: "Save over 40% off on Creative Cloud",
    time: "09/04/19",
    text: `something something advertisement subscription model
    please buy our insanely expensive products because your company
    forces you to use it. And also only several of our products are actually good
    but you're forced to buy and use all of them anyway.`
});

spamEmails.push({
    senderEmail: "mail@imagine.com",
    sender: "Imaginacao",
    subject: "Get Inspired!",
    time: "09/03/19",
    text: `
        <a href="https://en.wikipedia.org/wiki/The_Metamorphosis" target="_blank">thing</a>
    `
});

var trashEmails = [];

trashEmails.push({
    senderEmail: "rosaline@email.com",
    sender: "Rosa Line",
    subject: "Therapy Information (Trash)",
    time: "09/05/19",
    text: `Gregor, <br><br>
    I have also been seeing a therapist. I could give you his contact
    information if you want.
    <br><br> Best, <br> Rosa`
});