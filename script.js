let habits = JSON.parse(localStorage.getItem('habits')) || [];

function addHabit() {
    const input = document.getElementById('habitInput');
    if (input.value) {
        habits.push({ name: input.value, streak: 0 });
        localStorage.setItem('habits', JSON.stringify(habits));
        render();
        input.value = '';
    }
}

function render() {
    const list = document.getElementById('habitList');
    list.innerHTML = '';
    habits.forEach((habit, index) => {
        list.innerHTML += `
            <li style="margin-top:10px;">
                ${habit.name} (Streak: ${habit.streak})
                <button onclick="deleteHabit(${index})">❌</button>
            </li>`;
    });
}
render();
function createCalendar() {
    const calendar = document.getElementById('calendar');
    for (let i = 1; i <= 30; i++) {
        const day = document.createElement('div');
        day.classList.add('day-box');
        day.innerText = i;
        day.onclick = () => day.style.background = '#6c63ff'; // Mark day as active
        calendar.appendChild(day);
    }
}
createCalendar();
