const dateContainer = document.querySelector(".js-date");
const dateTitle = dateContainer.querySelector("h1");

function getToday() {
    const today = new Date();
    let month = today.getMonth();
    let day = today.getDay();
    const date = today.getDate();

    switch(month) {
        case 0:
            month = "Jan";
        case 1:
            month = "Feb";
        case 2:
            month = "Mar";
        case 3:
            month = "Apr";
        case 4:
            month = "May";
        case 5:
            month = "Jun";
        case 6:
            month = "Jul";
        case 7:
            month = "Aug";
        case 8:
            month = "Sep";
        case 9:
            month = "Oct";
        case 10:
            month = "Nov";
        case 11:
            month = "Dec";
    }

    switch (day) {
        case 0:
            day = "Monday";
        case 1:
            day = "Tuesday";
        case 2:
            day = "Wednesday";
        case 3:
            day = "Thursday";
        case 4:
            day = "Friday";
        case 5:
            day = "Saturday";
        case 6:
            day = "Sunday";
    }

    dateTitle.innerText = `${day}, ${date} ${month}`;
}

function init() {
    getToday();
}

init()