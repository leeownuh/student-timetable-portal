function loginTeacher() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const teacherTimetableDiv = document.getElementById("teacherTimetable");

    // Hash the input
    const hashedInputUsername = hashInput(username);
    const hashedInputPassword = hashInput(password);

    // Check if credentials match
    if (hashedInputUsername === hashedUsername && hashedInputPassword === hashedPassword) {
        showAllTimetables(); // Show all timetables if login is successful
    } else {
        teacherTimetableDiv.innerHTML = "<p class='error'>Invalid username or password. Please try again.</p>";
    }
}
