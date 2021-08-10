let todoList = document.querySelectorAll(".tasks__list");

let groups = document.querySelectorAll(".group");

function updateGroup() {
  groups.forEach((element) => {
    //получим список задач
    let tasks = document.getElementById("list-" + element.getAttribute("for"));

    let taskList = tasks.querySelectorAll(".task");

    let active = 0;

    taskList.forEach((task) => {
      input = task.querySelector("input");

      input.addEventListener("change", () => {
        updateGroup();
      });

      if (input.checked) {
        active++;
      }
    });

    //получим прогрессбар, в котором отображаются полоски задач
    let progress = element.querySelectorAll(".group__progress")[0];

    //добавим полоски в зависимости от кол-ва задач
    let str = "";
    for (let i = 0; i < taskList.length; i++) {
      str += "<div class='group__point'></div>";
    }
    progress.innerHTML = str;

    for (let i = 0; i < active; i++) {
      progress
        .querySelectorAll(".group__point")[i].classList.add("point_active");
    }

    //зададим полоскам задач длину в зависимости от их кол-ва
    let points = element.querySelectorAll(".group__point");
    points.forEach((point) => {
      point.style.width = progress.offsetWidth / points.length - 5 + "px";
    });

    element.querySelectorAll(".group__counter")[0].innerHTML =
      "<p>задачи ( <span>" + active + "/" + points.length + "</span>)</p>";
  });
}

updateGroup();

function showList(elem) {
  todoList.forEach((element) => {
    element.style.display = "none";
  });

  document.getElementById("list-" + elem.id).style.display = "flex";
}
