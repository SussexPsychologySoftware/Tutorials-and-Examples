Qualtrics.SurveyEngine.addOnload(function()
{
    // Qualtrics-specific code-section -------------
    // add blankBackground as first element under body
    const blankBackground = document.getElementById("blankBackground") // Grab reference to our container div
    document.body.insertBefore(blankBackground, document.body.firstChild) // Insert it as the first element at the start of page's <body>

    //hide next button
    const nextButton = document.getElementById('NextButton') // Qualtrics gives the next button element the id 'NextButton'
    nextButton.hidden = true // Set the HTML hidden attribute, to be removed at the end of the study.

    // Rest of code below --------------------------
});

// Can largely ignore these:
Qualtrics.SurveyEngine.addOnReady(function(){})
Qualtrics.SurveyEngine.addOnUnload(function(){})