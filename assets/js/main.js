var daySection = document.getElementById("daySection");
var daySpan = document.getElementById("daySpan");
var addEntryButton = document.getElementById("addEntry");
var formDay = document.getElementById("daySelect");
var formTime = document.getElementById("timeSelect");
var descriptionText = document.getElementById("descriptionText");
var timeAndDescription = document.getElementById("timeAndDescription");

var modalOverlay = document.getElementById("modalOverlay");
var formSubmit = document.getElementById("formSubmit");

var plannerEvents = {
    monday:[],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
}


daySection.addEventListener("click", daySelect);
addEntryButton.addEventListener("click", showModal);
formSubmit.addEventListener("click", formSubmitter);

function daySelect(event) {
    if(typeof event === "string") {
    daySpan.textContent = event;
    timeAndDescription.innerHTML = "";
    displayPlannerItems(event);
    return; 
    }
    if(event.target.className.includes("days-row")) {
        return;
    }
    daySpan.textContent = event.target.textContent;
    timeAndDescription.innerHTML = "";
    displayPlannerItems(event.target.textContent);
}

function displayPlannerItems(dayToDisplay) {
    dayToDisplay = dayToDisplay.toLowerCase();
    if(!plannerEvents[dayToDisplay]) {
        return;
    }

    for(var index = 0; index < plannerEvents[dayToDisplay].length; index++) {
        var tableRow = document.createElement("tr");

        var timeData = document.createElement("td");
        timeData.textContent = plannerEvents[dayToDisplay][index]["time"];

        var descriptionData = document.createElement("td");
        descriptionData.textContent = plannerEvents[dayToDisplay][index]["description"];

        tableRow.append(timeData, descriptionData);
        timeAndDescription.append(tableRow);

    }

}

function showModal(event) {
    modalOverlay.classList.remove("hidden");
}

function formSubmitter(event) {
    event.preventDefault();

    var plannerItem = {
        time: formTime.value,
        description: descriptionText.value
    }
    plannerEvents[formDay.value.toLowerCase()].push(plannerItem);




    modalOverlay.classList.add("hidden");
    daySelect(formDay.value)
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
