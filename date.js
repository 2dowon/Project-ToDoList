const dateContainer = document.querySelector(".js-date");
const dateTitle = dateContainer.querySelector("h1");

function getToday() {
    const today = new Date();
    const date = today.getDate();

    const arrMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = arrMonths[today.getMonth()];

    const arrDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = arrDays[today.getDay()];

    dateTitle.innerText = `${day}, ${date} ${month}`;
}

function init() {
    getToday();
}

init()