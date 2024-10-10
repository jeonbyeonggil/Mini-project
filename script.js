document.addEventListener("DOMContentLoaded", () => {
  const calendarBody = document.getElementById("calendar-body");
  const monthYear = document.getElementById("month-year");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const eventForm = document.getElementById("add-event-form");
  const eventDateInput = document.getElementById("event-date");
  const eventDescInput = document.getElementById("event-desc");

  let currentDate = new Date();
  let events = {};

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    monthYear.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;
    
    // 첫째 달, 마지막 달 구분 하는 코드
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    calendarBody.innerHTML = ""; // 이전에 그려진 날짜들 초기화
    
    let date = 1;
    for (let i = 0; i < 6; i++) { // 최대 6주 코드
      let row = document.createElement("tr");

      for (let j = 0; j < 7; j++) {
        let cell = document.createElement("td");

        if (i === 0 && j < firstDay) {
          cell.innerHTML = ""; // 첫 번째 주에서 이전 달의 빈 날짜 코드
        } else if (date > lastDate) {
          break; // 그 달의 마지막 날을 넘기면 break 작업이 들어감.
        } else {
          cell.innerHTML = date;
          let cellDate = `${year}-${(month + 1).toString().padStart(2, "0")}-${date.toString().padStart(2, "0")}`;
          
          // 저장된 이벤트가 있으면 표시
          if (events[cellDate]) {
            let eventDiv = document.createElement("div");
            eventDiv.textContent = events[cellDate];
            eventDiv.classList.add("event");
            cell.appendChild(eventDiv);
          }

          cell.addEventListener("click", () => {
            eventDateInput.value = cellDate;
          });
          
          date++;
        }

        row.appendChild(cell);
      }

      calendarBody.appendChild(row);
    }
  }

  prevButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  eventForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const eventDate = eventDateInput.value;
    const eventDesc = eventDescInput.value;
    if (eventDate && eventDesc) {
      events[eventDate] = eventDesc;
      renderCalendar();
      eventForm.reset();
    }
  });

  renderCalendar();
});
