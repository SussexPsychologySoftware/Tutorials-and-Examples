# Running Studies in Qualtrics
Qualtrics is a surprisingly powerful platform for running studies online. Although primarily a survey creation tool, Qualtrics can also display JavaScript/jsPsych tasks, counterbalance multiple conditions between participants, and run longitudinal studies by connecting 'surveys' with emails and tracking responses, amongst other things. The only major downside is that we have to create single variables we want to add to our dataset by hand one-at-a-time - this means the data from any tasks created in e.g. jsPsych will need to be stored in this single variable and then extracted at analysis (which is easily done), but of course can also be sent over the internet to any place you might like to store it at the same time. We'll go through some of the useful features here.

## Creating conditions and other embedded data




## Integrating JavaScript/jsPsych etc with Qualtrics
Note the following section will use HTML/CSS/JavaScript but will not explain how they work - for an introduction to these languages see the tutorial in the JavaScript section of this repository or at: 

Qualtrics can host any custom HTML/CSS/JavaScript including jsPsych inside a 'Text/Graphic' question. On Qualtrics click 'Add new Question' -> 'Text/Graphic'. Click on the 'Click to write the question text' section and on the right of this box you can see 'HTML View' - this is where you can place your HTML and CSS. Click on the question and look at the navigation bar on the left of the screen, click on '</> JavaScript' - this is where you can place your JavaScript. You can also place JavaScript inside `<script>` tags in the same place as your HTML, but we're going to include it in the special JavaScript editor so we get access to a few more features.

It's actually recommended that you place anything you want to go in the `<head>` section of your HTML, and your CSS in the 'look and feel' section in the farmost left sidebar on Qualtrics. CSS can go in the 'Style' -> 'custom CSS' box, and the header can go in the 'General' -> 'Header' section. However, you won't need to put much in the header, and you can put your CSS between `<style>` tags in your HTML all the same, so how you organise that is up to you.

### The Qualtrics JavaScript editor
To write JavaScript in Qualtrics, we occasionally need to rely on their Application Programming Interface (API). You might see the word API thrown around a lot - it basically means an piece of software that allows two other pieces of software to communicate (i.e., an interface between two programming applications). Here, we'll be taking our code and talking with the Qualtrics 'back-end' servers where our data is stored and their website's other features. The Qualtrics community forum is very active and you can ask questions there, and their customer service is quite good too. Before we start, here are some useful links on Qualtrics and JavaScript (the bottom two are slightly outdated):
- Intro to JavaScript in Qualtrics: https://www.qualtrics.com/support/survey-platform/survey-module/question-options/add-javascript/
- API reference on interacting with Qualtrics questions with JavaScript: https://api.qualtrics.com/82bd4d5c331f1-qualtrics-java-script-question-api-class
- Intro to JvaScript integration from a developer at Qualtrics: https://medium.com/@mc_bloomfield/javascript-and-qualtrics-getting-started-34f113cbeaaa
- Tutorial on jsPsych integration with Qualtrics: https://kywch.github.io/jsPsych-in-Qualtrics/

You'll note that we have the following 'boilerplate' code inside the JavaScript section of our question:
```
Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});
```
You must keep this code in the question - but we'll basically place everything inside the curly brackets`{}` of the  `addOnload` function. Qualtric's code editor isn't great and there's a delay between writing code and deploying and accessing it. I would recommend writing your code iin your IDE (e.g., VSCode) first and running it in your browser. Then, this code can be adapted for qualtrics fairly easily - and it's best if you can section off some area of your code that is specific to running it in the browser and another section in the Qualtrics version that allows you to run it there, and then you can just copy and paste the bulk of it between the two with no issues.

### Integrating JavaScript into Qualtrics
The default Qualtrics page has a lot of stuff on it - we want a blank whole page to display our stimulus without any concerns as to what Qualtrics wants to display. To achieve this, we'll take all of your HTML from inside your `<body>` section and place it inside a `<div>` container instead. We'll then use CSS to display this in front of everything, taking up the entire page, and then we'll use JavaScript to place this as the first element in the `<body>`. Again, see our JavaScript tutorials for an explanation of how these languages work if you don't understand this code. I've left some comments, denoted by `<!--  -->` in HTML, `/*  */` in CSS, and `//` in JavaScript, to explain what is happening here - more comments can be found in the qualtrics.css files in thsi repo or at: 

It's often best if your HTML code is entirely inside in a container `<div></div>` section already, although is often not necessary.

```
<div id="blankBackground"> 
</div>
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

Again, you can include your CSS inside `<style>` tags, or in the Custom CSS section of the Look and Feel section, which is what they recommend, although for brevity I've done the former here.

We then need to place some code in the JavaScript to make sure this gets hoisted up to the top of the page. Paste this into your JavaScript editor on your Qualtrics question:

```
Qualtrics.SurveyEngine.addOnload(function()
{
    // Qualtrics-specific code-section -------------
    // add blankBackground as first element under body
    const blankBackground = document.getElementById("blankBackground") // Grab reference to our container div
    document.body.insertBefore(blankBackground, document.body.firstChild) // Insert it as the first element at the start of page's <body>

    // Rest of code below --------------------------

});

Qualtrics.SurveyEngine.addOnReady(function(){})
Qualtrics.SurveyEngine.addOnUnload(function(){})
```

Publish this experiment and you should see a largely blank page, except for the Next '->' button on your page. We won't want participants clicking this button untill the task is done, so we can hide it with the following code:

```
//hide next button
const nextButton = document.getElementById('NextButton') // Qualtrics gives the next button element the id 'NextButton'
nextButton.hidden = true // Set the HTML hidden attribute, to be removed at the end of the study.
```

Place this inside the `// Qualtrics-specific code-section -------------` in your JavaScript file, and you should see the next button disappear - we can then set `nextButton.hidden = false` at the end of the experiment to allow the participant to move forward, or even simulate this button click automatically.

### Some notes
- In JavaScript, you can place variables inside strings using template literals. However, in Qualtrics, `${}` is reserved for their functions, like access embedded data above, so you must use normal concatenation, like doing `'abc ' + var1 + ' def'`.
- 

### Getting and setting (embedded) data

You can get the value of some embedded data using the syntax "${e://Field/VARIABLE_NAME}", e.g. if you've stored your participant's condition in a piece of embedded data, you can retrieve it and store it in a JavaScript variable for later use like so: 

```
const condition = "${e://Field/condition}"
```

You can save things from JavaScript to Qualtrics by setting embedded data with `Qualtrics.SurveyEngine.setEmbeddedData('embedded_data_var_name', your_js_variable)`. To do this you will need to have created an Embedded Data variable. To do this, go to the 'Survey Flow' section on the left hand side of your Qualtrics survey -> 'Add New Element Here' -> 'Embedded Data' -> 'Create New Field or Choose from the Drop-Down...' and enter the name you would like for your variable. Don't set this value now as we will be setting it in JavaScript. You will need to move the variable above the question holding your JavaScript so that it is created beforehand and accessible in your script. For example, if you have a variable holding your data in JavaScript called `participant_data`, and you want to save this to Qualtrics using an embedded data variable you have previously created called 'task_data', the following code will do this:

```
Qualtrics.SurveyEngine.setEmbeddedData('task_data', participant_data)
```

### Hosting stim (images & audio) & accessing through code
You can upload images to Qualtrics by clicking on the 3 lines at the top left of Qualtrics -> Library -> + Create New Folder (I've called mine 'example experiment') -> New Resource -> Graphic -> and drop the images into this folder. Then, click on the three dots ... under 'Actions' next to each image and select 'View graphic' and click 'Copy link' to get a link to your image that can be used in your JavaScript.

See our code here: on preloading image assets for experiments.
