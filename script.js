let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits(){
    localStorage.setItem("habits",JSON.stringify(habits));
}

function addHabit(){

    const input=document.getElementById("habitInput");

    const name=input.value.trim();

    if(name==="") return;

    habits.push({
        name:name,
        completedDays:[]
    });

    saveHabits();

    input.value="";

    render();
}

function deleteHabit(index){

    habits.splice(index,1);

    saveHabits();

    render();

}

function toggleDay(habitIndex,day){

    let completed=habits[habitIndex].completedDays;

    if(completed.includes(day)){

        completed.splice(completed.indexOf(day),1);

    }else{

        completed.push(day);

        completed.sort((a,b)=>a-b);

    }

    saveHabits();

    render();

}

function calculateStreak(days){

    if(days.length===0)
        return 0;

    days.sort((a,b)=>a-b);

    let streak=1;

    let max=1;

    for(let i=1;i<days.length;i++){

        if(days[i]===days[i-1]+1){

            streak++;

            max=Math.max(max,streak);

        }

        else{

            streak=1;

        }

    }

    return max;

}

function render(){

    const list=document.getElementById("habitList");

    list.innerHTML="";

    habits.forEach((habit,index)=>{

        const card=document.createElement("div");

        card.className="habit-card";

        let calendar="";

        for(let day=1;day<=30;day++){

            let active=habit.completedDays.includes(day)
            ? "completed"
            : "";

            calendar+=`
            <div class="day ${active}"
            onclick="toggleDay(${index},${day})">
            ${day}
            </div>
            `;

        }

        card.innerHTML=`

        <div class="habit-header">

            <h3>${habit.name}</h3>

            <button class="delete-btn"
            onclick="deleteHabit(${index})">
            Delete
            </button>

        </div>

        <div class="streak">
        🔥 Streak: ${calculateStreak(habit.completedDays)}
        </div>

        <div class="calendar">

        ${calendar}

        </div>

        `;

        list.appendChild(card);

    });

}

render();
