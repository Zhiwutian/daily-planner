var monday = document.getElementById("monday");
var tuesday = document.getElementById("tuesday");
var wednesday = document.getElementById("wednesday");
var thursday = document.getElementById("thursday");
var friday = document.getElementById("friday");
var saturday = document.getElementById("saturday");
var sunday = document.getElementById("sunday");
var daySpan = document.getElementById("daySpan");
var addEntryButton = document.getElementById("addEntry");
var formDay = document.getElementById("daySelect");
var formTime = document.getElementById("timeSelect");
var descriptionText = document.getElementById("descriptionText");
var timeAndDescription = document.getElementById("timeAndDescription");
var modalTitle = document.getElementById("modalTitle");
var modalOverlay = document.getElementById("modalOverlay");
var deleteModalOverlay = document.getElementById("deleteModalOverlay")
var yesButton = document.getElementById("yesButton");
var noButton = document.getElementById("noButton");
var formSubmit = document.getElementById("formSubmit");

var updateID = null;
var updateDay = null;
var deleteID = null;

var plannerEvents = {
    monday:[],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
}

monday.addEventListener("click", daySelect);
tuesday.addEventListener("click", daySelect);
wednesday.addEventListener("click", daySelect);
thursday.addEventListener("click", daySelect);
friday.addEventListener("click", daySelect);
saturday.addEventListener("click", daySelect);
sunday.addEventListener("click", daySelect);
addEntryButton.addEventListener("click", showModal);
formSubmit.addEventListener("click", formSubmitter);
yesButton.addEventListener("click", handleDelete);
noButton.addEventListener("click", handleDelete)

function handleDelete(event) {
    if(event.target.textContent === "Yes") {
        plannerEvents[daySpan.textContent.toLowerCase()].splice(deleteID, 1)
        deleteModalOverlay.classList.add("hidden");
        deleteID = null;
        displayPlannerItems(daySpan.textContent);
    } else {
        deleteModalOverlay.classList.add("hidden");
    }

}

function daySelect(event) {
    if(typeof event === "string") {
    daySpan.textContent = event;
    timeAndDescription.innerHTML = "";
    displayPlannerItems(event);
    return;
    }
    var day = event.currentTarget.getAttribute("data-day")
    daySpan.textContent = day;
    displayPlannerItems(day);
}

function displayPlannerItems(dayToDisplay) {
    dayToDisplay = dayToDisplay.toLowerCase();
    if(!plannerEvents[dayToDisplay]) {
        return;
    }
    timeAndDescription.innerHTML = "";

    for(var index = 0; index < plannerEvents[dayToDisplay].length; index++) {
        var tableRow = document.createElement("tr");

        var timeData = document.createElement("td");
        timeData.textContent = plannerEvents[dayToDisplay][index]["time"];

        var descriptionData = document.createElement("td");
        descriptionData.textContent = plannerEvents[dayToDisplay][index]["description"];

        var operations = document.createElement("td");
        var updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.setAttribute("data-index", index);
        updateButton.setAttribute("data-day", dayToDisplay)
        updateButton.addEventListener("click", function(event) {
            modalOverlay.classList.remove("hidden");
            updateID = parseInt(event.target.getAttribute("data-index"));
            updateDay = event.target.getAttribute("data-day")
            modalTitle.textContent = "Update Entry";
        })
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-index", index)
        deleteButton.addEventListener("click", function(event) {
            deleteModalOverlay.classList.remove("hidden");
            deleteID = parseInt(event.target.getAttribute("data-index"));
        })
        operations.append(updateButton, deleteButton);
        tableRow.append(timeData, descriptionData, operations);
        timeAndDescription.append(tableRow);
    }
    updatePlansPerDay();

}

function updatePlansPerDay() {
    for (var day in plannerEvents) {
        var id = day+"Plans"
        var dayAmounts = plannerEvents[day].length;
        document.getElementById(id).textContent = dayAmounts;
    }
}
updatePlansPerDay();

function showModal(event) {
    modalOverlay.classList.remove("hidden");
    modalTitle.textContent = "Add Entry"
}

function formSubmitter(event) {
    event.preventDefault();

    if(updateID !== null) {
        var plannerItem = {
            time: formTime.value,
            description: descriptionText.value
        }
        plannerEvents[formDay.value.toLowerCase()][updateID] = plannerItem;
        plannerEvents[updateDay.toLowerCase()].splice(updateID);
        updateDay = null;
        updateID = null;

    } else {
        var plannerItem = {
            time: formTime.value,
            description: descriptionText.value
        }
        plannerEvents[formDay.value.toLowerCase()].push(plannerItem);
    }

    modalOverlay.classList.add("hidden");
    daySelect(formDay.value)
    formTime.value = "default";
    formDay.value = "default";
    descriptionText.value = "";

}

function createFormOptions () {
    var dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for(var index = 0; index < dayArray.length; index++) {
        var option = document.createElement("option");
        option.textContent = dayArray[index];
        option.setAttribute("value", dayArray[index]);
        document.getElementById("daySelect").appendChild(option);
    }

    var timeArray = ["0000","0015","0030","0045","0100","0115","0130","0145","0200","0215","0230","0245","0300","0315","0330","0345","0400","0415","0430","0445","0500","0515","0530","0545","0600","0615","0630","0645","0700","0715","0730","0745","0800","0815","0830","0845","0900","0915","0930","0945","1000","1015","1030","1045","1100","1115","1130","1145","1200","1215","1230","1245","1300","1315","1330","1345","1400","1415","1430","1445","1500","1515","1530","1545","1600","1615","1630","1645","1700","1715","1730","1745","1800","1815","1830","1845","1900","1915","1930","1945","2000","2015","2030","2045","2100","2115","2130","2145","2200","2215","2230","2245","2300","2315","2330","2345"];
    for(var index = 0; index < timeArray.length; index++) {
        var option = document.createElement("option");
        option.textContent = timeArray[index];
        option.setAttribute("value", timeArray[index]);
        document.getElementById("timeSelect").appendChild(option);
    }
}
createFormOptions();
