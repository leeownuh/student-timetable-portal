// Student codes and their respective timetables
const timetables = {
    "12345": { name: "Zoe", schedule: [
        ["Monday", "3:15 PM", "Maths"],
        ["Monday", "4:00 PM", "Physics"],
        ["Tuesday", "4:30 PM", "Maths"],
        ["Wednesday", "3:15 PM", "Maths"],
        ["Thursday", "3:15 PM", "Biology"],
        ["Thursday", "4:00 PM", "Maths"],
        ["Friday", "3:30 PM", "Maths"],
        ["Friday", "4:15 PM", "Physics"]
    ]},
    "23456": { name: "Bongani", schedule: [
        ["Monday", "3:15 PM", "Maths"],
        ["Monday", "4:00 PM", "Chemistry"],
        ["Wednesday", "3:15 PM", "Maths"],
        ["Thursday", "3:15 PM", "Maths"],
        ["Friday", "3:30 PM", "Maths"],
        ["Friday", "4:15 PM", "Physics"],
        ["Saturday", "10:00 AM", "Physics"],
        ["Saturday", "10:45 AM", "Chemistry"]
    ]},
    "34567": { name: "Blessing", schedule: [
        ["Tuesday", "4:30 PM", "Life Sciences"],
        ["Wednesday", "3:15 PM", "Life Sciences"],
        ["Thursday", "3:15 PM", "Life Sciences"]
    ]},
    "45678": { name: "Lily", schedule: [
        ["Monday", "3:15 PM", "Maths"],
        ["Tuesday", "4:30 PM", "Maths"],
        ["Wednesday", "3:15 PM", "Maths"],
        ["Thursday", "3:15 PM", "Maths"],
        ["Friday", "3:30 PM", "Maths"]
    ]},
    "56789": { name: "Tsitsi", schedule: [
        ["Monday", "3:15 PM", "Maths"],
        ["Tuesday", "4:30 PM", "Maths"],
        ["Wednesday", "3:15 PM", "Maths"],
        ["Thursday", "3:15 PM", "Biology"],
        ["Friday", "3:30 PM", "Maths"]
    ]},
    "67890": { name: "Makomborero", schedule: [
        ["Monday", "3:15 PM", "Maths"],
        ["Tuesday", "4:30 PM", "Maths"],
        ["Wednesday", "3:15 PM", "Maths"],
        ["Thursday", "3:15 PM", "Maths"],
        ["Friday", "3:30 PM", "Maths"]
    ]},
    "78901": { name: "Lucindah", schedule: [
        ["Monday", "3:15 PM", "Maths"],
        ["Tuesday", "4:30 PM", "Maths"],
        ["Wednesday", "3:15 PM", "Maths"],
        ["Thursday", "3:15 PM", "Maths"],
        ["Friday", "3:30 PM", "Maths"]
    ]},
    "89012": { name: "Sino", schedule: [
        ["Monday", "3:15 PM", "Maths"],
        ["Tuesday", "4:30 PM", "Maths"],
        ["Wednesday", "3:15 PM", "Maths"],
        ["Thursday", "3:15 PM", "Maths"],
        ["Friday", "3:30 PM", "Maths"]
    ]},
    "90123": { name: "Student", schedule: [
        ["Monday", "3:15 PM", "Maths"],
        ["Tuesday", "4:30 PM", "Maths"],
        ["Wednesday", "3:15 PM", "Maths"],
        ["Thursday", "3:15 PM", "Combined Science"],
        ["Friday", "3:30 PM", "Business Studies"]
    ]}
};

function showTimetable() {
    const code = document.getElementById("studentCode").value.trim();
    const timetableDiv = document.getElementById("timetable");

    // Input validation
    if (!code || code.length !== 5 || isNaN(code)) {
        timetableDiv.innerHTML = "<p class='error'>Please enter a valid 5-digit code.</p>";
        return;
    }

    const studentData = timetables[code];

    if (!studentData) {
        timetableDiv.innerHTML = "<p class='error'>Invalid code! Please try again.</p>";
        return;
    }

    // Display timetable
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

    let html = "<h2>All Students' Timetables</h2>";
    for (const code in timetables) {
        const studentData = timetables[code];
        html += `<h3>${studentData.name}'s Timetable</h3>`;
        html += `<table><tr><th>Day</th><th>Time</th><th>Subject</th></tr>`;
        studentData.schedule.forEach(entry => {
            html += `<tr><td>${entry[0]}</td><td>${entry[1]}</td><td>${entry[2]}</td></tr>`;
        });
        html += "</table>";
    }
    timetableDiv.innerHTML = html;
}
