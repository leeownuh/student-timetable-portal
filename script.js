// Hashed credentials (Generated using sha256("teacher") and sha256("password123"))
const hashedUsername = "4c3a907f1fd0144fa92d27f4d6233b4296a4c6d58aa299f3780ff7e5b1df3cc3"; // Correct SHA-256 hash of "teacher"
const hashedPassword = "ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f"; // Correct SHA-256 hash of "password123"

// Function to hash input
function hashInput(input) {
    return sha256(input); // Uses the external sha256 library
}

// Teacher login function
function loginTeacher() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const timetableDiv = document.getElementById("teacherTimetable");

    // Hash the input
    const hashedInputUsername = hashInput(username);
    const hashedInputPassword = hashInput(password);

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
        ["Monday", "11:45 AM", "Maths"],
        ["Monday", "12:30 PM", "Physics"],
        ["Tuesday", "1:00 PM", "Maths"],
        ["Wednesday", "11:45 AM", "Maths"],
        ["Wednesday", "12:30 PM", "Biology"],
        ["Thursday", "11:45 AM", "Maths"],
        ["Thursday", "12:30 PM", "Biology"],
        ["Friday", "11:45 AM", "Maths"]
    ]},
    "23456": { name: "Bongani", schedule: [
        ["Monday", "4:45 PM", "Maths"],
        ["Monday", "5:30 PM", "Chemistry"],
        ["Wednesday", "4:45 PM", "Maths"],
        ["Thursday", "4:45 PM", "Maths"],
        ["Friday", "4:30 PM", "Maths"],
        ["Friday", "5:15 PM", "Physics"],
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
        ["Thursday", "6:00 PM", "Biology"],
        ["Friday", "6:15 PM", "Chemistry"]
    ]},
    "67890": { name: "Makomborero", schedule: [
        ["Monday", "6:15 PM", "Maths"],
        ["Tuesday", "7:30 PM", "Maths"],
        ["Wednesday", "7:00 PM", "Maths"],
        ["Thursday", "7:00 PM", "Maths"],
        ["Friday", "6:30 PM", "Maths"]
    ]}
};

// Function to display a student's timetable
function showTimetable() {
    const code = document.getElementById("studentCode").value.trim();
    const timetableDiv = document.getElementById("studentTimetable");

    if (!/^\d{5}$/.test(code)) { // Ensures only 5-digit numeric codes
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

// Function to display the teacher's complete timetable
function showAllTimetables() {
    const timetableDiv = document.getElementById("teacherTimetable");
    let scheduleMap = {};

    for (const code in timetables) {
        timetables[code].schedule.forEach(([day, time, subject]) => {
            if (!scheduleMap[time]) {
                scheduleMap[time] = {};
            }
         
