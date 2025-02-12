// Hashed credentials (username: "teacher", password: "password123")
const hashedUsername = "9f2b8a6b3c9a1e8f6d7c0b5a8f3e2d1c0a9b8c7d6e5f4a3b2c1d0e9f8a7b6"; // SHA-256 hash of "teacher"
const hashedPassword = "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"; // SHA-256 hash of "password123"
// Function to hash input
function hashInput(input) {
    return sha256(input);
}

// Teacher login function
function loginTeacher() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const timetableDiv = document.getElementById("timetable");

    // Hash the input
    const hashedInputUsername = hashInput(username);
    const hashedInputPassword = hashInput(password);

    // Check if credentials match
    if (hashedInputUsername === hashedUsername && hashedInputPassword === hashedPassword) {
        showAllTimetables(); // Show all timetables if login is successful
    } else {
        timetableDiv.innerHTML = "<p class='error'>Invalid username or password. Please try again.</p>";
    }
}
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
        ["Monday", "8:15 PM", "Maths"],
        ["Monday", "9:00 PM", "Chemistry"],
        ["Wednesday", "8:15 PM", "Maths"],
        ["Thursday", "8:15 PM", "Maths"],
        ["Friday", "8:00 PM", "Maths"],
        ["Friday", "8:45 PM", "Physics"],
        ["Saturday", "6:45 PM", "Physics"],
        ["Saturday", "7:30 PM", "Chemistry"]
    ]},
    "34567": { name: "Blessing", schedule: [
        ["Tuesday", "8:45 PM", "Life Sciences"],
        ["Wednesday", "9:00 PM", "Life Sciences"],
        ["Thursday", "9:45 PM", "Life Sciences"]
    ]},
    "45678": { name: "Lily", schedule: [
        ["Wednesday", "9:45 PM", "Maths"]
    ]},
    "56789": { name: "Tsitsi", schedule: [
        ["Tuesday", "10:15 PM", "Maths"],
        ["Thursday", "9:00 PM", "Biology"],
        ["Friday", "9:15 PM", "Chemistry"]
    ]},
    "67890": { name: "Makomborero", schedule: [
        ["Monday", "9:45 PM", "Maths"],
        ["Tuesday", "11:00 PM", "Maths"],
        ["Wednesday", "10:30 PM", "Maths"],
        ["Thursday", "10:30 PM", "Maths"],
        ["Friday", "10:00 PM", "Maths"]
    ]},
    "78901": { name: "Lucindah", schedule: [
        ["Monday", "9:45 PM", "Maths"],
        ["Tuesday", "11:00 PM", "Maths"],
        ["Wednesday", "10:30 PM", "Maths"],
        ["Thursday", "10:30 PM", "Maths"],
        ["Friday", "10:00 PM", "Maths"]
    ]},
    "89012": { name: "Sino", schedule: [
        ["Monday", "9:45 PM", "Maths"],
        ["Tuesday", "11:00 PM", "Maths"],
        ["Wednesday", "10:30 PM", "Maths"],
        ["Thursday", "10:30 PM", "Maths"],
        ["Friday", "10:00 PM", "Maths"]
    ]},
    "90124": { name: "Tashalesa", schedule: [
        ["Monday", "1:00 PM", "Maths"],
        ["Tuesday", "1:45 PM", "Maths"],
        ["Wednesday", "1:00 PM", "Maths"],
        ["Thursday", "1:45 PM", "Maths"],
        ["Friday", "1:00 PM", "Maths"],
        ["Monday", "2:30 PM", "Combined Science"],
        ["Wednesday", "2:30 PM", "Combined Science"],
        ["Friday", "2:30 PM", "Combined Science"]
    ]},
    "90125": { name: "Zanele", schedule: [
        ["Monday", "3:15 PM", "Maths"],
        ["Tuesday", "4:30 PM", "Maths"],
        ["Wednesday", "3:15 PM", "Maths"],
        ["Thursday", "3:15 PM", "Maths"],
        ["Friday", "3:30 PM", "Maths"],
        ["Tuesday", "8:45 PM", "Combined Science"],
        ["Thursday", "9:45 PM", "Combined Science"]
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
