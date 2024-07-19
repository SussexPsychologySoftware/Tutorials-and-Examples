### Integrating jsPsych into Qualtrics
To replicate the 'Hello World' from https://www.jspsych.org/v8/tutorials/hello-world/#step-5-run-the-experiment, copy the `script` loading tags from the `<head>` and place it into the HTML in your question like so:
```
<head>
    <script src="https://unpkg.com/jspsych@8.0.0"></script>
    <script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@2.0.0"></script>
    <link href="https://unpkg.com/jspsych@8.0.0/css/jspsych.css" rel="stylesheet" type="text/css" />
</head>
<div id="blankBackground"></div>
<style>
    #blankBackground {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%; 
        margin: 0;
        z-index: 999;
    }
</style>
```
You could also take out the `<head>` tags and put this section in the Look and Feel -> General -> Custom Header section of Qualtrics. Note that Qualtrics can be annoying when you load up HTML that doesn't display anything by itself, as it keeps replacing your content with 'Click to write the question text' - if this happens just try again, shouldn't be an issue generally.

Here's the relevant JavaScript:

```
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
```

The only notable difference from the jsPsych example is that in `initJsPsych()` I have added `{display_element: 'blankBackground'}` to make sure jsPsych uses our new blank background element to display everything.

Save and refresh the page - you should see a blank page with 'Hello World!' written on it in the centre.


### Example jsPsych Experiment in Qualtrics

This example will use the Simple Reaction Time Task tutorial from jsPsych found at https://www.jspsych.org/v8/tutorials/rt-task, with some changes to show you how to use Qualtrics to counterbalance your conditions, load media (images) from Qualtrics, and save your data at the end.

Using the code in https://www.jspsych.org/v8/tutorials/rt-task/#the-final-code, paste the `<script>` and `<link>` tags into your own `<head>` tag of your Qualtrics HTML tag we made previously. Then, paste everything between the `<script>` tags into the `// Rest of code below --------------------------` section of your JavaScript Qualtrics file. 

As above, you will need to add the display background to your jsPsych:
```
var jsPsych = initJsPsych({
    display_element: 'blankBackground',
    on_finish: function() {
        jsPsych.data.displayData();
    }
});
```

This still won't work on it's own as we don't have the images they are using. 

I've got the images of circles from the jsPsych tutorial saved in the example_stim folder of this repo (), with red and green versions too for use later. You can upload images to Qualtrics by clicking on the 3 lines at the top left of Qualtrics -> Library -> + Create New Folder (I've called mine 'example experiment') -> New Resource -> Graphic -> and drop the images into this folder. Then, click on the three dots ... under 'Actions' next to each image and select 'View graphic' and click 'Copy link' to get a link to your image that can be used in your JavaScript. Or, you can just copy my links below:
- Blue: https://universityofsussex.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Fc9eck43a4Z7tJb
- Orange: https://universityofsussex.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_44Yck542aOrSSan
- Green: https://universityofsussex.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_pBjBQuTalj37goL
- Red: https://universityofsussex.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_SJCEJhH3zjVVp6c

You can now reference these images like so:
```
var preload = {
    type: jsPsychPreload,
    images: ['https://universityofsussex.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Fc9eck43a4Z7tJb', 'https://universityofsussex.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_44Yck542aOrSSan']
};
```
And
```
var test_stimuli = [
    { stimulus: "https://universityofsussex.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Fc9eck43a4Z7tJb",  correct_response: 'f'},
    { stimulus: "https://universityofsussex.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_44Yck542aOrSSan",  correct_response: 'j'}
];
```