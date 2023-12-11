## Available Script

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Summary of the Task:

- the form is loading the fields dynamically, changes are allowed and the integer limits are respected
- I improved the design with using Emotion (compatible with the MUI version nr. 5)
- exception to the previous note: the MUI has an integer input in unstable condition (screenshot attached in my email), that is why I used the basic html input component
- I have implemented a reusable component: Entries.tsx; this way new fields can be added dynamically (and the field components are just written once)

Proposal for the next steps:

- step 1: adding a boolean field called "required" in the configuration file
- step 2: incorporating this boolean inside the DynamicForm.tsx (inject it to the fields)
- step 3: create a new error state
- step 4: when the onChange is called, set the error state if the field's value is empty (use the key from the entry, and set a vlue to it: "This field is required!")
- step 5: write a validation function (is there any value in the error state that is not empty string?)
- step 6: on the submit click, first thing to do is to check the result of validation
- step 7?: we could even do a live error handling -> disable the submit button until all required fieldsare filled (and adding a tooltip to help the user with a message)
