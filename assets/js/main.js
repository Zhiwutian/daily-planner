var daySection = document.getElementById("daySection");
var daySpan = document.getElementById("daySpan");
daySection.addEventListener("click", daySelect);

function daySelect(event) {
    if(event.target.className.includes("days-row")) {
        return;
    }
    daySpan.textContent = event.target.textContent;

}
