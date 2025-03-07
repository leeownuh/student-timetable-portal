let teacherCredentials = {};
let timetables = {};

// Load teacher credentials from credentials.json
async function loadCredentials() {
    try {
        const response = await fetch("credentials.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        teacherCredentials = await response.json();
        console.log("✅ Loaded Teacher Credentials:", teacherCredentials);
    } catch (error) {
        console.error("❌ Error loading credentials:", error);
    }
}

// Load timetables from timetables.json
async function loadTimetables() {
    try {
        const response = await fetch("timetables.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        timetables = await response.json();
        console.log("✅ Timetables Loaded:", timetables);
    } catch (error) {
        console.error("❌ Error loading timetables:", error);
    }
}

// Ensure both credentials and timetables load on page load
document.addEventListener("DOMContentLoaded", async () => {
    await loadCredentials();
    await loadTimetables();
});

// Function to hash input using SHA-256
async function hashInput(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
}

// Teacher login function
async function loginTeacher() {
    if (!teacherCredentials.username || !teacherCredentials.password) {
        console.error("❌ Teacher credentials are missing or not loaded.");
        document.getElementById("teacherTimetable").innerHTML = "<p class='error'>System error: Teacher credentials not found.</p>";
        return;
    }

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Hash the input
    const hashedInputUsername = await hashInput(username);
    const hashedInputPassword = await hashInput(password);

    console.log("🔹 Hashed Username:", hashedInputUsername);
    console.log("🔹 Hashed Password:", hashedInputPassword);
    console.log("🔹 Stored Teacher Username:", teacherCredentials.username);
    console.log("🔹 Stored Teacher Password:", teacherCredentials.password);

    // Check credentials
    if (hashedInputUsername === teacherCredentials.username && hashedInputPassword === teacherCredentials.password) {
        console.log("✅ Teacher login successful!");
        showAllTimetables();
    } else {
        document.getElementById("teacherTimetable").innerHTML = "<p class='error'>❌ Invalid login attempt.</p>";
    }
}


// Student codes and their respective timetables
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
            // For teacher timetable, use the original time without adjustment
            const teacherTime = time; // No adjustment here, leave it as is
            
            if (!scheduleMap[teacherTime]) {
                scheduleMap[teacherTime] = {};
            }
            if (!scheduleMap[teacherTime][day]) {
                scheduleMap[teacherTime][day] = [];
            }
            scheduleMap[teacherTime][day].push(`${subject} (${timetables[code].name})`);
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
