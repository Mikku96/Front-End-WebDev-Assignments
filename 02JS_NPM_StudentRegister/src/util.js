import fs from "fs";

//#######################################################################################################
//#######################################################################################################
//#######################################################################################################

// FUNCTIONS used by all/many of assignment functions:

function dataRead() {   // Read data from the file
    const data = fs.readFileSync("./register.json", "utf-8");
    return JSON.parse(JSON.parse(JSON.stringify(data)));
}

function dataWrite(array) { // Write to the file
    fs.writeFileSync("./register.json", JSON.stringify(array, null, 2), "utf-8"); // COULD send out error if something wrong!
    return;
}

function errorHandler(error) {  // A LOT of repetition, so one place for error messages... could be an object
    console.log(" ");
    let message = "";
    switch (error) {
        case ("No student name"):
            message = "ERROR! Student name not given.";
            break;
        case ("Name not in database"):
            message = `ERROR! This student does not exist in the database.\nUse a single pair of " ".`;
            break;
        case ("Student exists already"):
            message = `ERROR! This student already exists in the database.`;
            break;
        case ("Course add problem"):
            message = "ERROR in the input. Include: <name> <course-name> <course-credits> <course-grade>";
            break;
        case ("Course deletion problem"):
            message = "ERROR in the input. Include: <name> <course-name>";
            break;
        case ("Problem with student grade change"):
            message = "ERROR in the input. Include: <name> <course-name> <new-grade>";
            break;
        case ("Multiple course instances"):
            message = "ERROR! Can only adjust if there is one instance of the course.\nDelete duplicates or use 'add course' command to add as a new course with a custom name.";
            break;
        default:
            message = "There was an unexpected error";
    }
    console.log(message);
    console.log(" ");
}

// WITHIN this utility, we need the amount of CREDITS of a singular students... BUT WE DO NOT want to print their credits then
// Due to how the exported functions are called from index.js...
// And the REQUIREMENTS of the assignment... (index.js CAN ONLY CONTAIN ARGUMENT FUNCTIONALITY)
// We have to create a separate function

// I WOULD use the below function within the exported function studentCredits()... but then I am definitely not following the assignment requirements
// Simplest solution is just to create a copy and omit the console.log... I AM NOT HAPPY about this and COULD fix it easily if there was flexibility

function insiderStudentCredits(student) {   // Description of this function found at #8 exported function
    const arr = dataRead();

    if (student === undefined) {
        errorHandler("No student name");
        return;
    } else if (listAllStudents(true).includes(student) === false) {
        errorHandler("Name not in database");
        return;
    }

    let credits = arr.reduce((accumulator, value) => {
        if (value["name"] === student) {
            value["courses"].forEach(course => {
                    accumulator += course["credits"];
                })
                return accumulator;
        } else {
            return accumulator;
        }},0)

    return credits;
}

// WITHIN this utility, we also need the average GRADE of a singular students... BUT WE DO NOT want to print their grade average then!
// Due to how the exported functions are called from index.js...
// And the REQUIREMENTS of the assignment... (index.js CAN ONLY CONTAIN ARGUMENT FUNCTIONALITY)
// We have to create a separate function

// I WOULD use the below function within the exported StudentAverage() function... but then I am definitely not following the assignment requirements
// Simplest solution is just to create a copy and omit the console.log... I AM NOT HAPPY about this and COULD fix it easily if there was flexibility

function insiderStudentAverage(student) { // Description of this function found at #7 exported function
    const arr = dataRead();

    if (student === undefined) {
        errorHandler("No student name");
        return;
    } else if (listAllStudents(true).includes(student) === false) {
        errorHandler("Name not in database");
        return;
    }

    let gradeAverageArray = arr.reduce((accumulator, value) => {
        if (value["name"] === student) {
            value["courses"].forEach(course => {
                    accumulator.push(course["grade"]);
                })
                return accumulator;
        } else {
            return accumulator;
        }},[])

    if (gradeAverageArray.length === 0) {
        const gradeAverage = -1;
        return gradeAverage;
    }

    const gradeAverage = gradeAverageArray.reduce((accumulator, value) => accumulator += value,0)/gradeAverageArray.length; // NO printing
    return gradeAverage;
}


//#######################################################################################################
//#######################################################################################################
//#######################################################################################################

//#1 LISTING ALL THE STUDENTS - Used by some other functions, insider parameter tells us if we print.

export function listAllStudents(insider = false) {  
    const arr = dataRead();

    let names = arr.reduce((accumulator, value) => {    // Accumulate the names of students
        accumulator.push(value["name"]);
        return accumulator;
    },[]);

    if (insider === false) { // Insider parameter tells us, if this script was run inside utils.js
    console.log(`The names of all students: ${names}`);  // If run by the user straight on, then print
    }
    return names;   // Returns an array of student names
}

//#2 LISTING ALL AVAILABLE COURES - Not used in this form by any other function

export function listAllCourses() {
    const arr = dataRead();

    let courses = arr.reduce((accumulator, value) => {  // Accumulate names of courses
        value["courses"].forEach(course => {
            if (accumulator.includes(course["name"]) === false) {   // NO duplicates
                accumulator += course["name"] + ", ";
            }})
            return accumulator;
        },"")
    
    console.log(`Here are all the different courses: ${courses.slice(0,-2)}`);
    return courses; // Returns a string of courses.
}

//#3 Returns total credits off all students combined - also prints it

export function totalCredits() {
    const arr = dataRead();

    let totalCredits = arr.reduce((accumulator, student) =>{
        accumulator += insiderStudentCredits(student["name"]);   // See, that I use the insider function
        return accumulator;
    },0);
    console.log(`In total, all the students have obtained: ${totalCredits} credits.`);
    return totalCredits;
}

//#4 Total average of all students together

export function totalAverage() {
    const arr = dataRead();

    let reducer = 0;    // Variable that tells us, if there are any students with NO courses

    let totalAverage = arr.reduce((accumulator, student) =>{
        if (insiderStudentAverage(student["name"]) !== -1) {
            accumulator += insiderStudentAverage(student["name"]);  // Accumulate average
            return accumulator;
        } else {
            reducer += 1;   // Student does not have any courses, so do not include in below average calculation
            return accumulator;
        }
    },0);

    console.log(`The total average grade of all students is ${(totalAverage/(arr.length - reducer)).toFixed(2)}.`); // Calculate average of averages
    return totalAverage/(arr.length - reducer);
}

//#5 Adding a new student

export function addStudent(student) { 
    const arr = dataRead();

    if (student === undefined) {
        errorHandler("No student name");
        return;
    } else if (listAllStudents(true).includes(student) === true) {
        errorHandler("Student exists already");
        return;
    }

    arr.push({name: student, courses: []}); // Push in a new object "student"
    dataWrite(arr);
    console.log(`New student "${student}" added succesfully.`);
    return;
}

//#6 Adding a new course to an existing student

export function addCourseToStudent(student, newCourse, newCourseCredits, newCourseGrade) {
    const arr = dataRead();

    if (student === undefined || newCourse === undefined || (typeof(newCourseCredits) !== "number" || 
    isNaN(newCourseCredits) === true) || (typeof(newCourseGrade) !== "number" || isNaN(newCourseGrade) === true)) { // A lot of check ups for correct parameters
        errorHandler("Course add problem");
        return;
    } else if (listAllStudents(true).includes(student) === false) {
        errorHandler("Name not in database");
        return;
    }

    arr[listAllStudents(true).indexOf(student)].courses
    .push({name: newCourse, credits: newCourseCredits, grade: newCourseGrade}); // Push into a specific students course list

    dataWrite(arr);
    console.log(`New course "${newCourse}" and its results added for ${student}!`);
    return; // Nothing to return in any case
}

//#7 Returns a single students average grade - ALSO PRINTS!!! 

export function studentAverage(student) {
    const arr = dataRead();

    if (student === undefined) {
        errorHandler("No student name");
        return;
    } else if (listAllStudents(true).includes(student) === false) {
        errorHandler("Name not in database");
        return;
    }

    let gradeAverageArray = arr.reduce((accumulator, value) => {    // Take all students
        if (value["name"] === student) {    // Pick the one we are looking at
            value["courses"].forEach(course => {
                    accumulator.push(course["grade"]);  // Accumulate all the grades of courses
                })
                return accumulator;
        } else {
            return accumulator;
        }},[])
    if (gradeAverageArray.length === 0) {   // IF this student does not have any courses, return -1
        const gradeAverage = -1;
        return gradeAverage;
    }

    const gradeAverage = gradeAverageArray.reduce((accumulator, value) => accumulator += value,0)/gradeAverageArray.length; // Calculate average
    console.log(`${student} has an average grade of ${gradeAverage}.`);
    return gradeAverage;
}

//#8 Given students credits - PRINT the amount

export function studentCredits(student) {
    const arr = dataRead();

    if (student === undefined) {    // Errors in input
        errorHandler("No student name");
        return;
    } else if (listAllStudents(true).includes(student) === false) {
        errorHandler("Name not in database");
        return;
    }

    let credits = arr.reduce((accumulator, value) => {
        if (value["name"] === student) {
            value["courses"].forEach(course => {    // Go through every course of the given student and add course credits
                    accumulator += course["credits"];
                })
                return accumulator;
        } else {
            return accumulator;
        }},0)
        console.log(`${student} has obtained ${credits} credits.`); // This is the exported function, so this MUST be included
    return credits;
}

//#9 Change course grade of a student - THIS is silly! We may have two or more similarly named courses.. which one to update?

// It is rather open, what we are supposed to do... I decided that all instances MUST be first deleted so this can be done.
// Why(?) --> User must understand what they are doing

// Another version could ASK the user, which version to change... but then we would need "input" during runtime.
// I am not implementing that for this ""simple"" assingment

export function setStudentCourseGrade(student, courseToAdjust, newGrade) {  
    const arr = dataRead();
    if (student === undefined || courseToAdjust === undefined || newGrade === undefined || isNaN(newGrade)) {
        errorHandler("Problem with student grade change");
        return;
    } else if (listAllStudents(true).includes(student) === false) {
        errorHandler("Name not in database");
        return;
    } 

    let courseAmount = 0;
    for (let courseIndex in arr[listAllStudents(true).indexOf(student)].courses) {  // See how many cases of specific course the student has
        if (arr[listAllStudents(true).indexOf(student)].courses[courseIndex].name === courseToAdjust) {
            courseAmount += 1;
            arr[listAllStudents(true).indexOf(student)].courses[courseIndex].grade = newGrade;  // We change ALL grades of the type but ... (see below)
        }
    }
    if (courseAmount !== 1) {   // IF we changed multiple ones, then DO NOT save
        errorHandler("Multiple course instances");
        return;
    }

    dataWrite(arr);
    console.log(`"${courseToAdjust}" course grade of ${student} has been adjusted to ${newGrade}.`);
}

//#10 Deleting ALL instances of a course from a SPECIFIC student

export function delCourseOfStudent(student, removedCourse) {
    const arr = dataRead();

    if (student === undefined || removedCourse === undefined) {
        errorHandler("Course deletion problem");
        return;
    } else if (listAllStudents(true).includes(student) === false) {
        errorHandler("Name not in database");
        return;
    }

    arr[listAllStudents(true).indexOf(student)].courses = arr[listAllStudents(true).indexOf(student)].courses
    .filter(course => course.name !== removedCourse);   // Filtering all the courses without the specific name from a specific student

    dataWrite(arr);
    console.log(`All instances of course "${removedCourse}" removed from student ${student}!`);
    return; // Nothing to return in any case
}

//#11 Deleting a student

export function delStudent(student) {
    const arr = dataRead();

    if (student === undefined) {
        errorHandler("No student name");
        return;
    } else if (listAllStudents(true).includes(student) === false) {
        errorHandler("Name not in database");
        return;
    }

    let index = listAllStudents(true).indexOf(student);
    arr.splice(index,1);
    dataWrite(arr);
    console.log(`${student} has been cast to the shadow realm! Along with any data related to 'em.`);
    return;
}