$("#introPage").on('click', function() {
    $(".liverPage, .kidneyPage, .heartPage, .eyesPage, .intestinePage").hide();
    $(".introPage").fadeIn();
});

$("#liverPage").on('click', function() {
    $("#kidneyPage, #heartPage, #eyesPage, #intestinePage").css({'font-weight': 'normal', 'font-style': 'none'});
    $('#liverPage').css({'font-weight': 'bold', 'font-style': 'italic'});
    $(".introPage, .kidneyPage, .heartPage, .eyesPage, .intestinePage").hide();
    $(".liverPage").fadeIn();
});

$("#kidneyPage").on('click', function() {
    $("#liverPage, #heartPage, #eyesPage, #intestinePage").css({'font-weight': 'normal', 'font-style': 'none'});
    $('#kidneyPage').css({'font-weight': 'bold', 'font-style': 'italic'});
    $(".introPage, .liverPage, .heartPage, .eyesPage, .intestinePage").hide();
    $(".kidneyPage").fadeIn();
});

$("#heartPage").on('click', function() {
    $("#liverPage, #kidneyPage, #eyesPage, #intestinePage").css({'font-weight': 'normal', 'font-style': 'none'});
    $('#heartPage').css({'font-weight': 'bold', 'font-style': 'italic'});
    $(".introPage, .liverPage, .kidneyPage, .eyesPage, .intestinePage").hide();
    $(".heartPage").fadeIn();
});

$("#eyesPage").on('click', function() {
    $("#liverPage, #kidneyPage, #heartPage, #intestinePage").css({'font-weight': 'normal', 'font-style': 'none'});
    $('#eyesPage').css({'font-weight': 'bold', 'font-style': 'italic'});
    $(".introPage, .liverPage, .kidneyPage, .heartPage, .intestinePage").hide();
    $(".eyesPage").fadeIn();
});

$("#intestinePage").on('click', function() {
    $("#liverPage, #kidneyPage, #heartPage, #eyesPage").css({'font-weight': 'normal', 'font-style': 'none'});
    $('#intestinePage').css({'font-weight': 'bold', 'font-style': 'italic'});
    $(".introPage, .liverPage, .kidneyPage, .heartPage, .eyesPage").hide();
    $(".intestinePage").fadeIn();
});

// ----------register of donnation scripts============
function showLiverForm() {
    $("#liverSearch").hide();
    document.getElementById("liverForm").classList.toggle("show");
    var elem = document.getElementById("liverRegisterBtn");
    if (elem.innerHTML=="Register to donate Liver") elem.innerHTML = "Form is open. Fill Details";
    else elem.innerHTML = "Register to donate Liver";
    if( document.getElementById("liverRegisterBtn").className == "btn btn-xs btn-success")
        document.getElementById("liverRegisterBtn").className = "btn btn-xs btn-outline-success";
    else
        {
            document.getElementById("liverRegisterBtn").className = "btn btn-xs btn-success";
        }
};
function showKidneyForm() {
    document.getElementById("kidneyForm").classList.toggle("show");
    var elem = document.getElementById("kidneyRegisterBtn");
    if (elem.innerHTML=="Register to donate Kidney") elem.innerHTML = "Form is open. Fill Details";
    else elem.innerHTML = "Register to donate Kidney";
    if( document.getElementById("kidneyRegisterBtn").className == "btn btn-xs btn-success")
        document.getElementById("kidneyRegisterBtn").className = "btn btn-xs btn-outline-success";
    else
        {
            document.getElementById("kidneyRegisterBtn").className = "btn btn-xs btn-success";
        }
};
function showHeartForm() {
    document.getElementById("heartForm").classList.toggle("show");
    var elem = document.getElementById("heartRegisterBtn");
    if (elem.innerHTML=="Register to donate Heart") elem.innerHTML = "Form is open. Fill Details";
    else elem.innerHTML = "Register to donate Heart";
    if( document.getElementById("heartRegisterBtn").className == "btn btn-xs btn-success")
        document.getElementById("heartRegisterBtn").className = "btn btn-xs btn-outline-success";
    else
        {
            document.getElementById("heartRegisterBtn").className = "btn btn-xs btn-success";
        }
};
function showEyesForm() {
    document.getElementById("eyesForm").classList.toggle("show");
    var elem = document.getElementById("eyesRegisterBtn");
    if (elem.innerHTML=="Register to donate Eyes") elem.innerHTML = "Form is open. Fill Details";
    else elem.innerHTML = "Register to donate Eyes";
    if( document.getElementById("eyesRegisterBtn").className == "btn btn-xs btn-success")
        document.getElementById("eyesRegisterBtn").className = "btn btn-xs btn-outline-success";
    else
        {
            document.getElementById("eyesRegisterBtn").className = "btn btn-xs btn-success";
        }
};
function showIntestineForm() {
    document.getElementById("intestineForm").classList.toggle("show");
    var elem = document.getElementById("intestineRegisterBtn");
    if (elem.innerHTML=="Register to donate Intestines") elem.innerHTML = "Form is open. Fill Details";
    else elem.innerHTML = "Register to donate Intestines";
    if( document.getElementById("intestineRegisterBtn").className == "btn btn-xs btn-success")
        document.getElementById("intestineRegisterBtn").className = "btn btn-xs btn-outline-success";
    else
        {
            document.getElementById("intestineRegisterBtn").className = "btn btn-xs btn-success";
        }
};

// ------------------------------------------------

// ----------------search for donor scripts-----------------

$("#liverSearchBtn").on('click', function(){
    $("#liverSearch").toggle();
});
$("#kidneySearchBtn").on('click', function(){
    $("#kidneySearch").toggle();
});
$("#heartSearchBtn").on('click', function(){
    $("#heartSearch").toggle();
});
$("#eyesSearchBtn").on('click', function(){
    $("#eyesSearch").toggle();
});
$("#intestineSearchBtn").on('click', function(){
    $("#intestineSearch").toggle();
});