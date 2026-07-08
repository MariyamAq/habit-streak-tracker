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
