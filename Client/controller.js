//Starting point for JQuery init
let data = undefined;

$(document).ready(function () {
    $("#searchResult").hide();
    $("#btn_Search").click(function (e) {
       loaddata($("#seachfield").val());
    });

    $("#newAppointment").click(function (e) {
        createNewAppointment();
    });

    showOverview();
});

function loaddata(searchterm) {
    $.ajax({
        type: "GET",
        url: "../Server/serviceHandler.php",
        cache: false,
        data: {method: "queryAppointmentByTitle", param: searchterm},
        dataType: "json",
        success: function (response) {
            $("#noOfentries").val(response.length);
            $("#searchResult").show(1000).delay(1000).hide(1000);
            data = response;
        }
    });

}

   // load all Data 
function showOverview(){
}

// post new appointment to database 
function createNewAppointment(){
    console.log("create");
    let createContainer = $("<div class='createContainer'></div>");
    let titleLabel = $("<label for='title' id='create-titleLabel'>Title</label>");
    let titleInput = $("<input name='title' id='create-titleInput'>");
    let locationLabel = $("<label for='location' id='create-locationLabel'>Location</label>");
    let locationInput = $("<input name='location' id='create-locationInput'>");
    let dateLabel = $("<input type ='date' name='date' id='create-dateLabel'>Date</label>");
    let dateInput = $("<input name='date' id='create-dateInput'>");
    let expirationDateLabel = $("<input type ='date' name='expirationDate' id='create-expirationDateLabel'>Expiration Date</label>");
    let expirationDateInput = $("<input name='expirationDate' id='create-expirationDateInput'>");

    createContainer.append(titleLabel, titleInput, locationLabel, locationInput, dateLabel, dateInput, expirationDateLabel, expirationDateInput);
    $('#createAppointment').append(createContainer);
}

// load all options for one specific appointment 
function showSingleAppointment(){
}
