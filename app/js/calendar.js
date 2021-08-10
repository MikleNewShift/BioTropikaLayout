let calendar = document.getElementsByClassName("calendar__dates")[0];
let calendarToday = document.getElementById("todayDate");

let months = {
  1: "Января",
  2: "Февраля",
  3: "Апреля",
  4: "Марта",
  5: "Июня",
  6: "Июля",
  7: "Августа",
  8: "Сентября",
  9: "Октября",
  10: "Ноября",
  11: "Декабря",
};

let today = new Date();
today.setHours(0, 0, 0, 0);

let activeData = today;

let currentDate = today;

function createCalendar(year, month) {
  let d = new Date(year, month);
  let p = new Date(year, month);

  let str = "<div class='string'>";

  n = getDay(d);
  p.setDate(p.getDate() - n);

  for (let i = 0; i < n; i++) {
    str +=
      '<div class="date date-secondary">' +
      "<p>" +
      p.getDate() +
      "</p>" +
      "</div>";

    p.setDate(p.getDate() + 1);
  }

  while (d.getMonth() == month) {
    if (d.getMonth() == today.getMonth() && d.getDate() == today.getDate()) {
      str +=
        '<div class="date current_date data_active">' +
        "<p>" +
        d.getDate() +
        "</p>" +
        "</div>";
    } else {
      str += '<div class="date">' + "<p>" + d.getDate() + "</p>" + "</div>";
    }

    if (getDay(d) % 7 == 6) {
      // вс, последний день - перевод строки
      str += "</div><div class='string'>";
    }

    d.setDate(d.getDate() + 1);
  }

  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      str +=
        '<div class="date date-secondary">' +
        "<p>" +
        d.getDate() +
        "</p>" +
        "</div>";
      d.setDate(d.getDate() + 1);
    }
  }
  return str;
}

function changeCalendar(shift) {
  currentDate.setMonth(currentDate.getMonth() + shift);
  calendar.innerHTML = createCalendar(2021, currentDate.getMonth());
  console.log("Calendar changed!");

  addEventsForDate()
}

function getDay(date) {
  // получить номер дня недели, от 0 (пн) до 6 (вс)
  let day = date.getDay();
  if (day == 0) day = 7; // сделать воскресенье (0) последним днем
  return day - 1;
}

function todayText(year, month, day) {
  return `<p>${day} ${months[month]} <span>${year}</span></p>`;
}

function changeChoosenText(year, month, day) {
  calendarToday.innerHTML = todayText(year, month, day);
}

function addEventsForDate() {
  const dateElements = document.querySelectorAll(".date");

  dateElements.forEach((element) => {
    element.addEventListener("click", () => {
      calendar
        .getElementsByClassName("data_active")[0]
        .classList.remove("data_active");

      element.classList.add("data_active");
    });
  });
}

changeChoosenText(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate()
);

calendar.innerHTML += createCalendar(
  currentDate.getFullYear(),
  currentDate.getMonth()
);

addEventsForDate()
