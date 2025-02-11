const timetables = {
    zoe: [
        ["Monday", "3:15 PM", "Maths"],
        ["Monday", "4:00 PM", "Physics"],
        ["Tuesday", "4:30 PM", "Maths"],
        ["Wednesday", "3:15 PM", "Maths"],
        ["Thursday", "3:15 PM", "Biology"],
        ["Thursday", "4:00 PM", "Maths"],
        ["Friday", "3:30 PM", "Maths"],
        ["Friday", "4:15 PM", "Physics"]
    ],
    bongani: [
        ["Monday", "3:15 PM", "Maths"],
        ["Monday", "4:00 PM", "Chemistry"],
        ["Wednesday", "3:15 PM", "Maths"],
        ["Thursday", "3:15 PM", "Maths"],
        ["Friday", "3:30 PM", "Maths"],
        ["Friday", "4:15 PM", "Physics"],
        ["Saturday", "10:00 AM", "Physics"],
        ["Saturday", "10:45 AM", "Chemistry"]
    ],
    // Add other students here...
};

function showTimetable() {
    const student = document.getElementById("student").value;
    const timetable = timetables[student] || [];
    let html = `<h2>Timetable for ${student.charAt(0).toUpperCase() + student.slice(1)}</h2>`;
    html += `<table><tr><th>Day</th><th>Time</th><th>Subject</th></tr>`;
    timetable.forEach(entry => {
        html += `<tr><td>${entry[0]}</td><td>${entry[1]}</td><td>${entry[2]}</td></tr>`;
    });
    html += "</table>";
    document.getElementById("timetable").innerHTML = html;
}
