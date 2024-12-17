# Assignment - MessageBoard

0. ```npm install``` and ```npm start```

**NOTE! Any reference to the actual API have been removed... therefore, this tool is not functional here.**

1. Terminal tool to manage a message database

2. Ask the user for an input:

    - Q ends the program

    - Invalid input leads to an error, but does not end the program

3. A -> Command to show all messages (GET)

4. U -> Single users all messages

    - Ask for a specific user

    - Return to main "screen"

    - No instructions, if error message should be shown

5. W -> Write a new message

    - Ask for the username, and for a message (POST)

    - Return to main screen

6. E -> Edit a message

    - Ask for a message ID, and content for the replacing message (PATCH)

7. D -> Deleting a message

    - Ask for a message ID (DELETE)

8. (Extra) Error management

    - If no valid ID is given, end the procedure