var today = moment().format("dddd, MMMM Do");
var now = moment().format("H A");

// Creating the entries for every hour
var planWorkday = [
    { time: "9 AM", event: "" },
    { time: "10 AM", event: "" },
    { time: "11 AM", event: "" },
    { time: "12 PM", event: "" },
    { time: "1 PM", event: "" },
    { time: "2 PM", event: "" },
    { time: "3 PM", event: "" },
    { time: "4 PM", event: "" },
    { time: "5 PM", event: "" },
];

// Pulling information from local storage to populate rows with previous user input
var workEvents = JSON.parse(localStorage.getItem("workDay"));
if (workEvents) {
    planWorkday = workEvents;
}

// Setting the current day
$("#currentDay").text(today);

// Creating the rows for the scheduler
planWorkday.forEach(function (timeBlock, index) {
    var timeLabel = timeBlock.time;
    var blockColor = colorRow(timeLabel);
    var row =
        '<div class="time-block" id="' +
        index +
        '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
        timeLabel +
        '</div><textarea class="form-control ' +
        blockColor +
        '">' +
        timeBlock.event +
        '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

    //Adding the rows to the container div
    $(".container").append(row);
});

// Coloring rows based on current time with moment
function colorRow(time) {
    var planNow = moment(now, "H A");
    var planEntry = moment(time, "H A");
    if (planNow.isBefore(planEntry) === true) {
        return "future";
    } else if (planNow.isAfter(planEntry) === true) {
        return "past";
    } else {
        return "present";
    }
}

// Saving user input into local storage
$(".saveBtn").on("click", function () {
    var blockID = parseInt(
        $(this)
            .closest(".time-block")
            .attr("id")
    );
    var userEntry = $.trim(
        $(this)
            .parent()
            .siblings("textarea")
            .val()
    );
    planWorkday[blockID].event = userEntry;

    // Using JSON to stringify information into local storage
    localStorage.setItem("workDay", JSON.stringify(planWorkday));
});