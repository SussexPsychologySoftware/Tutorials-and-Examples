Qualtrics.SurveyEngine.addOnload(function()
{
    // Qualtrics-specific code-section -------------
    // Create blank background for display
    const blankBackground = document.getElementById("blankBackground")
    document.body.insertBefore(blankBackground, document.body.firstChild)

    //hide next button
    const nextButton = document.getElementById('NextButton')
    nextButton.hidden = true

    // jsPsych Hello World -------------
    const jsPsych = initJsPsych({display_element: 'blankBackground'})

    const hello_trial = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: 'Hello world!'
    }

    jsPsych.run([hello_trial])
});

Qualtrics.SurveyEngine.addOnReady(function(){})
Qualtrics.SurveyEngine.addOnUnload(function(){})