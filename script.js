// Hashed credentials (SHA-256)
const hashedUsername = "9f2b8a6b3c9a1e8f6d7c0b5a8f3e2d1c0a9b8c7d6e5f4a3b2c1d0e9f8a7b6"; // "teacher"
const hashedPassword = "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"; // "password123"

async function hashInput(input) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
    return Array.from(new Uint8Array(hashBuffer))
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

// Teacher login function
async function loginTeacher() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const timetableDiv = document.getElementById("teacherTimetable");

    // Hash the input
    const hashedInputUsername = await hashInput(username);
    const hashedInputPassword = await hashInput(password);

    // Debugging: Log hashed values
    console.log("Hashed Username:", hashedInputUsername);
    console.log("Hashed Password:", hashedInputPassword);

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
    ]}

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


function adjustTimeForStudents(time) {
    let [hour, minute, period] = time.match(/(\d+):(\d+) (\wM)/).slice(1);
    hour = parseInt(hour);
    minute = parseInt(minute);

    // Convert to 24-hour format
    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    // Subtract 3 hours 30 minutes
    minute -= 30;
    hour -= 3;
    if (minute < 0) {
        minute += 60;
        hour -= 1;
    }

    // Handle negative hours (wrap around midnight)
    if (hour < 0) {
        hour += 24;
    }

    // Convert back to 12-hour format
    period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    const adjustedTime = `${hour}:${minute.toString().padStart(2, "0")} ${period}`;

    return adjustedTime;
}

console.log("Entered Code:", document.getElementById("studentCode").value);
console.log("Timetables Object:", timetables);
console.log("Retrieved Student Data:", timetables[document.getElementById("studentCode").value]);

// Function to show student timetable
function showTimetable() {
    const code = document.getElementById("studentCode").value.trim();
    const studentTimetableDiv = document.getElementById("studentTimetable");

    if (!code || code.length !== 5 || isNaN(code)) {
        studentTimetableDiv.innerHTML = "<p class='error'>Please enter a valid 5-digit code.</p>";
        return;
    }

    const studentData = timetables[code];

    if (!studentData) {
        studentTimetableDiv.innerHTML = "<p class='error'>Invalid code! Please try again.</p>";
        return;
    }

   let html = `<h2>Timetable for ${studentData.name}</h2>`;
    html += `<table><tr><th>Day</th><th>Time</th><th>Subject</th></tr>`;
    studentData.schedule.forEach(entry => {
        const adjustedTime = adjustTimeForStudents(entry[1]);
        html += `<tr><td>${entry[0]}</td><td>${adjustedTime}</td><td>${entry[2]}</td></tr>`;
    });
    html += "</table>";
    studentTimetableDiv.innerHTML = html;
}

// Function to show the teacher's complete timetable
function showAllTimetables() {
    const teacherTimetableDiv = document.getElementById("teacherTimetable");
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
    teacherTimetableDiv.innerHTML = html;
}
