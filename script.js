// Student codes and their respective timetables
const timetables = {
    "12345": { name: "Zoe", schedule: [
        ["Monday", "3:15 PM", "Maths"],
        ["Monday", "4:00 PM", "Physics"],
        ["Tuesday", "4:30 PM", "Maths"],
        ["Wednesday", "3:15 PM", "Maths"],
        ["Wednesday", "4:00 PM", "Biology"],
        ["Thursday", "3:15 PM", "Maths"],
        ["Thursday", "4:00 PM", "Biology"],
        ["Friday", "3:30 PM", "Maths"]
    ]},
    "23456": { name: "Bongani", schedule: [
        ["Monday", "4:45 PM", "Maths"],
        ["Monday", "5:30 PM", "Chemistry"],
        ["Wednesday", "4:45 PM", "Maths"],
        ["Thursday", "4:45 PM", "Maths"],
        ["Friday", "4:15 PM", "Maths"],
        ["Friday", "5:00 PM", "Physics"],
        ["Saturday", "3:15 PM", "Physics"],
        ["Saturday", "4:00 PM", "Chemistry"]
    ]},
    "34567": { name: "Blessing", schedule: [
        ["Tuesday", "5:15 PM", "Life Sciences"],
        ["Wednesday", "5:30 PM", "Life Sciences"],
        ["Thursday", "6:15 PM", "Life Sciences"]
    ]},
    "45678": { name: "Lily", schedule: [
        ["Wednesday", "6:15 PM", "Maths"]
    ]},
    "56789": { name: "Tsitsi", schedule: [
        ["Tuesday", "6:45 PM", "Maths"],
        ["Thursday", "5:30 PM", "Biology"],
        ["Friday", "5:45 PM", "Chemistry"]
    ]},
    "67890": { name: "Makomborero", schedule: [
        ["Monday", "6:15 PM", "Maths"],
        ["Tuesday", "7:30 PM", "Maths"],
        ["Wednesday", "7:00 PM", "Maths"],
        ["Thursday", "7:00 PM", "Maths"],
        ["Friday", "6:30 PM", "Maths"]
    ]},
    "78901": { name: "Lucindah", schedule: [
        ["Monday", "6:15 PM", "Maths"],
        ["Tuesday", "7:30 PM", "Maths"],
        ["Wednesday", "7:00 PM", "Maths"],
        ["Thursday", "7:00 PM", "Maths"],
        ["Friday", "6:30 PM", "Maths"]
    ]},
    "89012": { name: "Sino", schedule: [
        ["Monday", "6:15 PM", "Maths"],
        ["Tuesday", "7:30 PM", "Maths"],
        ["Wednesday", "7:00 PM", "Maths"],
        ["Thursday", "7:00 PM", "Maths"],
        ["Friday", "6:30 PM", "Maths"]
    ]}
};

function showTimetable() {
    const code = document.getElementById("studentCode").value.trim();
    const timetableDiv = document.getElementById("timetable");

    if (!code || code.length !== 5 || isNaN(code)) {
        timetableDiv.innerHTML = "<p class='error'>Please enter a valid 5-digit code.</p>";
        return;
    }

    const studentData = timetables[code];

    if (!studentData) {
        timetableDiv.innerHTML = "<p class='error'>Invalid code! Please try again.</p>";
        return;
    }

    let html = `<h2>Timetable for ${studentData.name}</h2>`;
    html += `<table><tr><th>Day</th><th>Time</th><th>Subject</th></tr>`;
    studentData.schedule.forEach(entry => {
        html += `<tr><td>${entry[0]}</td><td>${entry[1]}</td><td>${entry[2]}</td></tr>`;
    });
    html += "</table>";
    timetableDiv.innerHTML = html;
}

function showAllTimetables() {
    const timetableDiv = document.getElementById("timetable");
    let scheduleMap = {};
    
    for (const code in timetables) {
        timetables[code].schedule.forEach(([day, time, subject]) => {
            if (!scheduleMap[time]) {
                scheduleMap[time] = {};
            }
            if (!scheduleMap[time][day]) {
                scheduleMap[time][day] = [];
            }
            scheduleMap[time][day].push(`${subject} (${timetables[code].name})`);
        });
    }
    
    let html = "<h2>Teacher's Timetable</h2>";
    html += `<table><tr><th>Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th><th>Saturday</th></tr>`;
    
    Object.keys(scheduleMap).sort().forEach(time => {
        html += `<tr><td>${time}</td>`;
        ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].forEach(day => {
            html += `<td>${scheduleMap[time][day] ? scheduleMap[time][day].join("<br>") : ""}</td>`;
        });
        html += "</tr>";
    });
    
    html += "</table>";
    timetableDiv.innerHTML = html;
}
