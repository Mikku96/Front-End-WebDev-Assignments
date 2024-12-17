import {listAllStudents, listAllCourses, studentCredits, totalCredits,
    studentAverage, totalAverage, addStudent, delStudent, addCourseToStudent,
    delCourseOfStudent, setStudentCourseGrade} from "./util.js";
import fs from "fs";

const ourFunctions = {
    "all students": listAllStudents,    //
    "all courses": listAllCourses,      //
    "total credits": totalCredits,      //
    "total average": totalAverage,      //
    "get credits": studentCredits,      //
    "get average": studentAverage,      //
    "add student": addStudent,          //
    "del student": delStudent,          //
    "add course": addCourseToStudent,   //
    "del course": delCourseOfStudent,   //
    "set grade": setStudentCourseGrade  //
};

const operation_1 = process.argv[2];  // Always first and second
const operation_2 = process.argv[3];  // Always first and second
const fullOperation = operation_1 + " " + operation_2;  // With the two, we form our full operation

const inputName = process.argv[4];  // The student name is always the third one - user should
// never be blamed... but the user is silly if they input something else.
const inputCourse = process.argv[5]; //The course is always the fourth one
const inputExtra_1 = Number(process.argv[6]); // Either grade or credits. Both numbers... so USER should know
const inputExtra_2 = Number(process.argv[7]); // Either grade or credits

if (operation_1 === "debug") {
    deBuggin(); // TEST all the functions - saving occurs, but the end result is the original file.
    process.exit(1);    // Exit the program
} else if (Object.keys(ourFunctions).includes(fullOperation) === false) {   // IF the given full operation DOES NOT exist
    console.log("Not a valid operation!");  // Print an error message, and EXIT!
    console.log(`Here, use these:
##########################################################
all students <-- prints all students within the database
all courses <-- prints all courses within the database
total credits <-- prints the sum of all credits obtained by all of the students
total average <-- prints total average of all of the students 
get credits "student name" <-- prints one students summed credits. Takes 1 parameter (between " ")
get average "student name" <-- prints one students average grade. Takes 1 parameter
add student "student name" <-- adds new student into the database. Takes 1 parameter
del student "student name" <-- deletes one student from the database. Takes 1 parameter
add course "student name" "course name" <credits> <grade> <-- Add new course to a student. Needs 4 parameters (" ", " ", number and number)
del course "student name" "course name" <-- Deletes all instances of a course from a student. Needs 2 parameters (" " and " ")
set grade "student-name" "course-name" <grade> <-- Changes course's grade of a student to another grade. Needs 3 parameters (" ", " " and number)
##########################################################
!DO NOTE, THAT 'set grade' ONLY works, if the student has only one instance of the course.        
`);
process.exit(1);
}

ourFunctions[fullOperation](inputName, inputCourse, inputExtra_1, inputExtra_2); // And if we do not exit due to above options, we run the utility function
// We try to send all the parameters but of course, not every function needs them

// DEBUGGER FUNCTION BELOW ↓ 



function deBuggin() {   // The end result should be the original file but printing contains results related to the test student
    console.log("########################");
    console.log("RUNNING ALL FUNCTIONS:");
    console.log("########################");
    console.log(" ");

    console.log("add student - addStudent adds new student to the database. #1 No name, #2 Already existing one, #3 New");
    ourFunctions["add student"](undefined);
    ourFunctions["add student"]("Robbie Daniels");
    ourFunctions["add student"]("Test student");    // Student added to the file
    console.log(JSON.parse(JSON.parse(JSON.stringify(fs.readFileSync("./register.json", "utf-8")))));
    console.log(" ");

    console.log("add course - addCourseToStudent adds a course to a student in the database");
    console.log("#1 No student name,\n#2 No course name,\n#3 No credit,\n#4 Wrong credit type,\n#5 No course grade,\n#6 Wrong course grade,\n#7 Name not in database\n#8 WORKS")
    console.log(" ");
    ourFunctions["add course"](undefined, "Test course", 3, 2);
    ourFunctions["add course"]("Test student", undefined, 3, 2);
    ourFunctions["add course"]("Test student", "Test course", "", 2);
    ourFunctions["add course"]("Test student", "Test course", "agga", 2);
    ourFunctions["add course"]("Test student", "Test course", 3, "");
    ourFunctions["add course"]("Test student", "Test course", 3, "agga");
    ourFunctions["add course"]("I do not exist", "Test course", 3, 2);
    ourFunctions["add course"]("Test student", "Test course", 3, 2);    // SUCCESS, course added for student
    console.log(JSON.parse(JSON.parse(JSON.stringify(fs.readFileSync("./register.json", "utf-8")))));
    console.log(" ");

    console.log("set course - setStudentCourseGrade with test students test course.\n#1 No student name\n#2 No course name\n#3 No grade\n#4 No student in database\n#5 Success");
    console.log(" ");
    ourFunctions["set grade"](undefined, "Test course", 5);
    ourFunctions["set grade"]("Test student", undefined, 5);
    ourFunctions["set grade"]("Test student", "Test course", undefined);
    ourFunctions["set grade"]("I do not exist", "Test course", 5);
    ourFunctions["set grade"]("Test student", "Test course", 5);    // SUCCESS, Grade 2 -> 5 in "Test course"
    console.log(JSON.parse(JSON.parse(JSON.stringify(fs.readFileSync("./register.json", "utf-8")))));
    console.log(" ");
    console.log("Adding another course, and trying to change values - should fail")
    ourFunctions["add course"]("Test student", "Test course", 3, 2);    // Add another "test course" and trying to change it
    ourFunctions["set grade"]("Test student", "Test course", 5);
    console.log(JSON.parse(JSON.parse(JSON.stringify(fs.readFileSync("./register.json", "utf-8")))));
    console.log(" ");

    console.log("all students - listAllStudents lists all students");
    ourFunctions["all students"]();
    console.log(" ");

    console.log("all courses - listAllCourses without repetition - we should not see two 'Test course' courses");
    ourFunctions["all courses"]();
    console.log(" ");

    console.log("get credits - studentCredits with a test student. Expect 3+3 = 6.\n#1 No student name\n#2 Student not in database\n#3 Success");
    ourFunctions["get credits"](undefined);
    ourFunctions["get credits"]("I do not exist");
    ourFunctions["get credits"]("Test student");    // Expect 6
    console.log(" ");

    console.log("get average - studentAverage gives one students average. For 'Test student' expect 3.5.\n#1 No student name\#2 Student not in database\n#3 Success");
    ourFunctions["get average"](undefined);
    ourFunctions["get average"]("I do not exist");
    ourFunctions["get average"]("Test student");    // Expect 3.5
    console.log(" ");

    console.log("total credits - totalCredits prints summed credits of all students. Expect 44+6=50");
    ourFunctions["total credits"](); // Expect 50
    console.log(" ");

    console.log("total average - totalAverage prints the total average of all students. Expect 3.61");
    ourFunctions["total average"](); // Expect 3.61
    console.log(" ");

    console.log("del course - delCourseOfStudent deletes ALL instances of a course from a student.\n#1 No student name\n#2 No course name\n#3 No student in database\n#4 Success, no objects in courses");
    console.log(" ");
    ourFunctions["del course"](undefined,"Test course"); 
    ourFunctions["del course"]("Test student",undefined); 
    ourFunctions["del course"]("I do not exist","Test course"); 
    ourFunctions["del course"]("Test student","Test course"); // Removes both courses but student remains
    console.log(JSON.parse(JSON.parse(JSON.stringify(fs.readFileSync("./register.json", "utf-8")))));   // Notice, no objects in courses
    console.log(" ");

    console.log("del student - delStudent deletes the student with all the data.\n#1 No student name\n#2 No student in database\n#3 Success");
    ourFunctions["del student"](undefined);
    ourFunctions["del student"]("I do not exist");
    ourFunctions["del student"]("Test student");
    console.log(JSON.parse(JSON.parse(JSON.stringify(fs.readFileSync("./register.json", "utf-8")))));
    console.log(" ");
}