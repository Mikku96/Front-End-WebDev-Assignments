# Assignment - JSON Student Register

0. NOTE! Running "npm run dev" leads to same results as:
```node ./src/index.js debug``` or ```npm run start debug```

    - Does everything, but does not change any files

    - ERRORS in purpose many times to show, how the program responds for invalid inputs

If you want to change files, run ```node "./src/index.js"```

1. Create ```register.json``` file with student data

2. Create a main program (index.js), which takes terminal parameters and does operations based on the sub-progam (util.js):

    - ```all students```: Print all students

    - ```all courses```: Print all UNIQUE courses

    - ```total credits```: Sum all credits obtained by all students

    - ```total average```: Total average of all grades of ALL students

    - ```add student <student-name>```: Adds a new student; cannot be left empty; also checks if this student (by name) is already in list

    - ```add course <student-name> <course name> <course credits> <course-grade>```: Add a new course to an existing student; must give all parameters; Multiple copies of a similarly named course can exist for one student

3. Every operation reads ```register.json```

4. Any changes will be written to ```register.json```

5. (Extra)

    - ```get average <student-name>```: Prints a single students average grade

    - ```get credits <student-name>```: Prints sum of single students credits

    - ```set grade <student-name> <course-name> <course-grade>```: Changes a specific courses grade for a student... for this to work, only single instance of a course for that student can exist

    - ```del course <student-name> <course-name>```: Removes all instances of a course from a single student

    - ```del student <student-name>```: Removes the student