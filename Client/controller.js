//Starting point for JQuery init
let data = undefined;

$(document).ready(function () {
    $("#searchResult").hide();
    $("#btn_Search").click(function (e) {
       loaddata($("#seachfield").val());
    });

    $("#newAppointment").click(function (e) {
        showNewAppointmentForm();
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
    $.ajax({
        type: "GET",
        url: "../Server/serviceHandler.php",
        cache: false,
        data: {method: "queryAllAppointments"},
        dataType: "json",
        success: function (response) {
            //Todo Frontend: change where/how all appointments are being printed (currently printed at #appointmentList)
            var appointmentList = $('#appointmentList');
            $.each(response, function( index, appointment ) {
                var appointment = `

                <div class="row appointment">
                <h4 class="singleAppointment" onClick="showSingleAppointment(event)">${appointment[0].title}</h4>
                <ul>
                <li>Title: ${appointment[0].title}</li>
                <li>Created at: ${appointment[0].date}</li>
                <li>Location: ${appointment[0].location}</li>
                <li>Title ${appointment[0].expiration_date}</li>
                </ul>
                `;
                appointmentList.append(appointment);
            });

            $("#appointmentList").show(1000).delay(1000)
            data = response;
        }
    });
}


// post new appointment to database 
function showNewAppointmentForm(){
    console.log("create");

    let createContainer = $("<form id='createForm'></form>");
    let title = $("<div id='create-title'><label for='title' id='create-titleLabel'>Title</label><input name='title' id='create-titleInput'></div>")
    let location = $("<div id='create-location'><label for='location' id='create-locationLabel'>Location</label><input name='location' id='create-locationInput'></div>")
    let date = $("<div id='create-date'><label for='date' id='create-dateLabel'>Date</label><input type='date' name='date' id='create-dateInput'></div>")
    let expiration_date = $("<div id='create-expirationDate'><label for='expiration_date' id='create-expirationDateLabel'>Expiration Date</label><input type='date' name='expiration_date' id='create-expirationDateInput'></div>");
    let submitButton = $("<button type='submit'>Submit</button>");
    createContainer.append(title, location, date, expiration_date, submitButton);
    $('#createAppointment').append(createContainer);

    $("#createForm").on("submit", function (e) {
        e.preventDefault();
        submitNewAppointment(e)
    });
}


function submitNewAppointment(e){
    e.preventDefault();

    let formDataArray = $(e.target).serializeArray();

    let formDataObject = {};
    $.each(formDataArray, function(index, item) {
      formDataObject[item.name] = item.value;
    });

    $('#createForm').remove();
    console.log(formDataObject);

    // server endpoint to be done
    /*
    $.ajax({
      type: 'POST',
      url: 'your-server-endpoint.php', 
      data: formDataObject,
      success: function(response) {
        console.log(response);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('AJAX error: ', textStatus, ' : ', errorThrown);
      }
    }); 
  });
  */
}
 
function showSingleAppointment(event){
$("#fullPage").hide();
console.log($(event.target).text());

}

