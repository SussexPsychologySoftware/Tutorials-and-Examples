# Running Studies in Qualtrics
Qualtrics is a surprisingly powerful platform for running studies online. Although primarily a survey creation tool, Qualtrics can also display JavaScript/jsPsych tasks, counterbalance multiple conditions between participants, and run longitudinal studies by connecting 'surveys' with emails and tracking responses, amongst other things. This page doesn't go through the basic functionality of Qualtrics, but is intended to highlight some useful features you might not be aware of that can help you run your studies.

If looking to run your interactive tasks (e.g. jsPsych) in Qualtrics, the only major downside is that we have to create single variables we want to add to our dataset by hand one-at-a-time - this means the data from any tasks created in e.g. jsPsych will probably need to be stored in this single variable and then extracted at analysis (which is easily done), but of course can also be sent over the internet to any place you might like to store it at the same time.

### Assigning conditions
We often want to assign conditions to participants, but we don't want to do this completely randomly for each participant, as we want to ensure even numbers of participants to end up in each group. Inside Qualtrics you can set variables to record and control things about your experiment. One way to use this is assigning participants to different experimental conditions in a random but balanced order. To do so we will need to go into our 'Survey Flow' and click 'add new element here'. This setup will assign partcipants to a random pre-sepcified group with equal numbers between participants:

<img src="Survey Setup/set_conditions.png" width="700"/>

If you have two different condition variables in your experiment and want balance across them, you can add them in a row like this:
<img src="Survey Setup/multiple_conditions.png" width="700"/>

You could then use a 'Branch' to show one group of participants certain stimuli, or use these variables later to present different materials to the participant depending on the value of their condition. 

You can also just move these embedded data variables under a 'Group' inside the randomiser, along with any other materials you only want to show that specific group of participants:

<img src="Survey Setup/groups.png" width="700"/>

### Longitudinal studies using workflows
To run longitudinal studies in Qualtrics you will want to use a 'Workflow' which sends an email inviting participants stored in a 'Contact List' to your next survey. To set this up we need:
1) Make sure you are collecting participant emails in your initial survey: https://www.qualtrics.com/support/survey-platform/survey-module/editing-questions/validation/#CustomValidationExample
2) Another survey project to send to participants (e.g. day 2 of your intervention or a post-test survey)
3) Create a contact list to save participant emails and send emails to them. We can do this in one contact list - although separate ones might be a better way to organise things for an actual study. Go to the 3 bar dropdown in the top left of Qualtrics -> Directories -> Create a List and give it a name.

#### Setup Survey Distribution Workflow
In Qualtrics click on the 'Workflows' tab -> '+ Create a Workflow' -> 'Survey Response' -> 'Finish'. On this page you can add a condition, for example, sending a specific survey out to a specific group of participants based on their responses or embedded data.

You might want to just send out an email, but we'll send out a link to another survey project we might've made in Qualtrics, perhaps the second day of an online intervention. Click '+' -> 'Add task' -> 'XM Directory' -> 'Distribute Survey'. In the Survey Distribution Task creation page (scroll down to see the rest of this page): 
- Choose 'Individual' for the Distribution Type and Link Type to allow the email to be carried through into the next survey.
- Schedule a time: note this is based on the timezone associated with your profile only - probably GMT
- Select the 'Save or update it as embedded data for your XM directory contacts' to save this data to a contact list and select the contact list we created earlier from the dropdown.
- If this is the first survey in your study, and you have collected an email in your survey, you can used Qualtrics' 'Piped text' in the 'Email Address' section to enter the participant's email (e.g. `${q://QID12/ChoiceTextEntryValue}`). Otherwise, you'll want to grab it from the contact list with `${m://Email}`, or can use the automatically embedded email with `${e://Field/RecipientEmail}`.
- Select the survey you want to link to in your study and write your email
- Include a reminder: Note this from the time the survey was taken.
    - You can only send one reminder email (you could use a Webservice update and a python script to get around this if needed) 

### Working with recruitment platforms
Many tools for online research have guides to help you integrate their plaforms with Qualtrics, e.g.:
- Prolific: https://researcher-help.prolific.com/hc/en-gb/articles/360009224113-Qualtrics-integration-guide
- Sona: https://www.sona-systems.com/help/qualtrics/
- Mturk: https://blog.mturk.com/getting-great-survey-results-from-mturk-and-qualtrics-be1704ff9786

This largely involves redirecting to other webpages, and keeping data stored in URLs ('Query strings', e.g. url.com?var1=value1&var2=val2). If you would like/need to do this in JavaScript, see below on using JS in Qualtrics. The following code is useful for extracting Query variables: https://css-tricks.com/snippets/javascript/get-url-variables/, and you can add query variables by hand or with the `searchParams` property funtions. Then, you can redirect back to the recruitment platform with 'window.location.assign()'.

### Hosting media & stimuli
You can upload images, audio, and videos to Qualtrics by clicking on the 3 lines at the top left of Qualtrics -> Library -> + Create New Folder (I've called mine 'example experiment') -> New Resource -> Graphic -> and drop the images into this folder. You can then insert graphics using the Rich Content editor. Or, inside the relevant folder in your Qualtrics Library, click on the three dots ... under 'Actions' next to each image and select 'View graphic' and click 'Copy link' to get a link to your image that can be used in another page, or in your jsPsych experiment.

### Other features to be aware of in Qualtrics
- Web Service: (for sending data to an external location) https://www.qualtrics.com/support/survey-platform/survey-module/survey-flow/advanced-elements/web-service/
- Loop & Merge: (for looping through a block of questions using an array of values) https://www.qualtrics.com/support/survey-platform/survey-module/block-options/loop-and-merge/

# HTML/CSS/JavaScript in Qualtrics
Note the following sections will use HTML/CSS/JavaScript but will not explain how they work - to understand this section you will likely need to first run through the tutorial in the JavaScript section of this repository (if viewing on GitHub) or at: As usual, see the code files in this repository for comments on what each line does.

Qualtrics can host any custom HTML/CSS/JavaScript inside a 'Text/Graphic' question. On Qualtrics click 'Add new Question' -> 'Text/Graphic'. Click on the 'Click to write the question text' section and on the right of this box you can see 'HTML View' - this is where you can place your HTML and CSS. It's actually recommended that you place anything you want to go in the `<head>` section of your HTML, and your CSS in the 'look and feel' section in the farmost left sidebar on Qualtrics. CSS can go in the 'Style' -> 'custom CSS' box, and the header can go in the 'General' -> 'Header' section. However, you won't need to put much in the header, and you can put your CSS between `<style>` tags in your HTML all the same, so how you organise that is up to you.

Click on this HTML question and look to the navigation bar on the left of the screen, click on '</> JavaScript' - this is where you can place your JavaScript. You can also place JavaScript inside `<script>` tags in the same place as your HTML. However, Qualtrics recomment only placing custom JavaScript inside their custom JavaScript editor and doing so gets you access to a few more features. I'll start with former approach for brevity, but will explain the custom JS Editor below.

### Qualtrics JavaScript API
To write JavaScript in Qualtrics, we occasionally need to rely on their Application Programming Interface (API). You might see the word API thrown around a lot - it basically means an piece of software that allows two other pieces of software to communicate (i.e., an interface between two programming applications). Here, we'll be taking our code and talking with the Qualtrics 'back-end' servers where our data is stored and their website's other features. In practice, we'll be just be using some JavaScript functions Qualtrics makes available to us inside their surveys. The Qualtrics community forum is very active and you can ask questions there, and their customer service is quite good too. Before we start, here are some useful links on Qualtrics and JavaScript (the bottom two are slightly outdated):
- Intro to JavaScript in Qualtrics: https://www.qualtrics.com/support/survey-platform/survey-module/question-options/add-javascript/
- API reference on interacting with Qualtrics questions with JavaScript: https://api.qualtrics.com/82bd4d5c331f1-qualtrics-java-script-question-api-class
- Intro to JvaScript integration from a developer at Qualtrics: https://medium.com/@mc_bloomfield/javascript-and-qualtrics-getting-started-34f113cbeaaa
- Tutorial on jsPsych integration with Qualtrics: https://kywch.github.io/jsPsych-in-Qualtrics/

### The Qualtrics JavaScript editor
If using the Custom JavaScript Editor built into Qualtrics, you'll note that we have the following 'boilerplate' code inside the JavaScript section of our question:
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

### Some notes
- In JavaScript, you can place variables inside strings using template literals. However, in Qualtrics, `${}` is reserved for their functions, like access embedded data above, so you must use normal concatenation, like doing `'abc ' + var1 + ' def'`.
- jQuery is a library designed to make JavaScript easier to write. jQuery is available in Qualtrics, although isn't accessed by the `$` as usual (`${}` is reserved), but using `jQuery()` instead.

### Getting and setting (embedded) data

You can get the value of some embedded data using the syntax "${e://Field/VARIABLE_NAME}", e.g. if you've stored your participant's condition in a piece of embedded data, you can retrieve it and store it in a JavaScript variable for later use like so: 

```
const condition = "${e://Field/condition}"
```

You can save things from JavaScript to Qualtrics by setting embedded data with `Qualtrics.SurveyEngine.setEmbeddedData('embedded_data_var_name', your_js_variable)`. To do this you will need to have created an Embedded Data variable. To do this, go to the 'Survey Flow' section on the left hand side of your Qualtrics survey -> 'Add New Element Here' -> 'Embedded Data' -> 'Create New Field or Choose from the Drop-Down...' and enter the name you would like for your variable. Don't set this value now as we will be setting it in JavaScript. You will need to move the variable above the question holding your JavaScript so that it is created beforehand and accessible in your script. For example, if you have a variable holding your data in JavaScript called `participant_data`, and you want to save this to Qualtrics using an embedded data variable you have previously created called 'task_data', the following code will do this:

```
Qualtrics.SurveyEngine.setEmbeddedData('task_data', participant_data)
```

## Tutorial on running jsPsych in Qualtrics
This section section should be relevant even if you are not using jsPsych or Qualtrics specifically. 

In this section I'll be using jsPsych's Simple Reaction Time Task demo, making some changes to the code to demonstrate how to use some of Qualtric's features to run experiments. You should be able to copy and paste the code found here directly and host it on your chosen platform: https://www.jspsych.org/v8/tutorials/rt-task/#the-final-code - the only thing you'll need to worry about is the location of the circle images used as stimulus. If you can't find a place to upload them, you can host your images directly in Qulatrics if you like (see above) and then can switch out the `img/blue.png` and `img/orange.png` in the jsPsych code with the URLs to your own images. My own hosted copy of the task can be found at: https://users.sussex.ac.uk/mel29/experiments/jsPsych_example/jsPsych_example.html.

### Loading an externally hosted website inside a Qualtrics survey
Unfortunately, the current version of jsPsych doesn't work in Qualtrics directly, so it needs to be hosted externally and displayed inside the Qualtrics survey. You can display one webpage in another using HTML's `<iframe>` tag like so:
```
<iframe src="https://users.sussex.ac.uk/mel29/experiments/jsPsych_example/jsPsych_example.html"></iframe>
```
replacing the `src` link with the URL of your own hosted jsPsych experiment. By default an `iframe` will display in a small box, so let's grab the CSS from this StackOverflow response: https://stackoverflow.com/questions/3982422/full-screen-iframe to make it full page:
```
<iframe src="https://users.sussex.ac.uk/mel29/experiments/jsPsych_example/jsPsych_example.html"></iframe>
<style>
    iframe {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        z-index: 999999;
    }
</style>
```
Add this to the HTML of your Text/Graphic question and click 'Publish' - it should now take up the whole page. You might notice the 'Welcome to the experiment...' text is displayed in your Qualtrics survey editor page. This isn't ideal, so let's add 3 things 1) an ID to the iframe so we can reference it in JavaScript, 2) a class to the CSS that can be added to our iframe later to make it fullscreen, and 3) JavaScript to attach that class to the iframe element when the page only when the page is actually loaded properly:

```
<iframe id="iframe" src="https://users.sussex.ac.uk/mel29/experiments/jsPsych_example/jsPsych_example.html"></iframe>
<style>
    .fullpage {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        border: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        z-index: 999999;
    }
</style>
<script>
    document.getElementById('iframe').classList.add("fullpage");
</script>
```

### Hide the Next button
You might have also noticed that the next button is still showing, and we don't want it to until our task is finished. Qualtrics have given their next button the ID `NextButton` so we can reference it and hide it with the following code inside the `<script>` tags:
```
const nextButton = document.getElementById('NextButton')
nextButton.hidden = true
```
We'll then unhide it later.

### Communication between your jsPscych page and Qualtrics
At the moment, nothing happens when the experiment is finished. To signal to Qualtrics that the experiment is finished we need to communicate from the iFramed website (your task) to Qualtrics. We can do this using a `postMessage`.

When this experiment ends in jsPsych we need to send our data to the Qualtrics page. We can get a copy of our participant's data as JSON with `jsPsych.data.get().json()`, and send it with `window.top.postMessage(DATA_TO_SEND, 'URL_TO_SEND_TO')` (`window.top` locates the top level window if multiple `iframe`s are used - a simple option for our purposes). Your `initJsPsych` `on_finish` property needs to look like this:

```
var jsPsych = initJsPsych({
    on_finish: function() {
        const participant_data = jsPsych.data.get().json()
        window.top.postMessage(participant_data, '*')
    }
});
```

And then we need something in our Qualtrics `<script>` to recieve this message and store it. Firstly, you'll need to set up an Embedded Data variable in the Survey Flow in Qualtrics to be created above where your task is being run - I'll be using one called 'task_data' to store the data from my task. In the following JavaScript you can see an example of an 'event handler' - see our JavaScript introduction for more info on what this is:

```
function handleMessage(e){
    // console.log(e.origin)
    if(e.origin === "https://users.sussex.ac.uk"){
        Qualtrics.SurveyEngine.setEmbeddedData('task_data', e.data)
        nextButton.hidden = false
        nextButton.click()
    }
}

window.onmessage = handleMessage
```

You'll need to replace `https://users.sussex.ac.uk` with the 'root domain' of your hosting website to get this to work. 

This code is a little tricky to explain so you only need to read the following if wanting to understand more. `window.onmessage` is a function that runs when your browser recieves a message like we are trying to send it. We will assign it our own function to run, which I've called `handleMessage`, which will automatically get passed an event variable, which I have intercepted and called `e` so I can get information on what the event was that caused this function to run. As Qualtrics fires lots of these messages itself, we'll need to check we've intercepted the right one with `if(e.origin === "your exp url"){}` (use `console.log(e.origin)` to check incoming origins). If we have a message from the right place we then use a function from the Qualtrics API (see below) to set our pre-made embedded data with `Qualtrics.SurveyEngine.setEmbeddedData('embedded_data_name', js_var_name)`, passing it the `data` property from the event variable I called `e`, which is where whatever we sent using `postMessage` was automatically stored. As this also signals the end of the task, we show the Next button and also simulate a click on it to move to the next page.

## Integrating a JavaScript task into Qualtrics
Note the following is not applicable to jsPsych code at present - it is for putting a 'vanilla' JavaScript task into Qualtrics.

The default Qualtrics survey page has a lot of stuff on it - we might want a blank whole page to display our stimulus without any concerns as to what Qualtrics wants to display. To achieve this, we'll take all of your HTML from inside your `<body>` section and place it inside a `<div>` container instead. We'll then use CSS to display this in front of everything, taking up the entire page, and then we'll use JavaScript to place this as the first element in the `<body>`. Again, see our JavaScript tutorials for an explanation of how these languages work if you don't understand this code. I've left some comments, denoted by `<!--  -->` in HTML, `/*  */` in CSS, and `//` in JavaScript, to explain what is happening here - more comments can be found in the qualtrics.css files in thsi repo or at: 

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

Publish this experiment and you should see a largely blank page.

### Hiding the next button
The Next '->' button will still be showing on your page. We won't want participants clicking this button untill the task is done, so we can hide it with the following code:

```
//hide next button
const nextButton = document.getElementById('NextButton') // Qualtrics gives the next button element the id 'NextButton'
nextButton.hidden = true // Set the HTML hidden attribute, to be removed at the end of the study.
```

Place this inside the `// Qualtrics-specific code-section -------------` in your JavaScript file, and you should see the next button disappear - we can then set `nextButton.hidden = false` at the end of the experiment to allow the participant to move forward, or even simulate this button click automatically.

### Ending the task
This is a function you can call to end your task in Qualtrics and reset the page, undoing what we have done previously to set the task up:
```
function endTask(){
    Qualtrics.SurveyEngine.setEmbeddedData('task_data', participant_data)
    blankBackground.remove()
    nextButton.hidden = false
    nextButton.click()
}
```

For this to run,  task_data must exist as an embedded data variable created before this task is run, and participant_data must exist as a JavaScript variable. `blankBackground.remove()` removes the task from the DOM (i.e. HTML) before moving forward, `nextButton.hidden = false` shows the Next button, and `nextButton.click()` clicks the next button, moving us to the next page. Note that you will also want to remove any added event listeners and intervals/timeouts too before moving forward
