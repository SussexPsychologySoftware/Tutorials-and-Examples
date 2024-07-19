Qualtrics.SurveyEngine.addOnload(function()
{
    // Qualtrics-specific code-section -------------
    // add blankBackground as first element under body
    const blankBackground = document.getElementById("blankBackground") // Grab reference to our container div
    document.body.insertBefore(blankBackground, document.body.firstChild) // Insert it as the first element at the start of page's <body>

    //hide next button
    const nextButton = document.getElementById('NextButton') // Qualtrics gives the next button element the id 'NextButton'
    nextButton.hidden = true // Set the HTML hidden attribute, to be removed at the end of the study.
    
    // Function to end experiment
    function endExperiment(){ // Call this function when your experiment is over
        // Save participant data: task_data must exist as embedded data, and participant_data must exist as a JS variable
        Qualtrics.SurveyEngine.setEmbeddedData('task_data', participant_data)
        // Remove the task from the DOM
        blankBackground.remove()
        // Note: remove any added event listeners and intervals/timeouts too before moving forward
        // Simulate click of next button
        nextButton.click()
    }

    // Rest of code below --------------------------

});

// Can largely ignore these:
Qualtrics.SurveyEngine.addOnReady(function(){})
// Note may need to remove any instantiated interval/timeout timers with cancelInterval() in addOnUnload()
Qualtrics.SurveyEngine.addOnUnload(function(){})