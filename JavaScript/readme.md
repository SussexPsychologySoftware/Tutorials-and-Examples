# Intro to programming experiments for the web with JavaScript
This document goes through the basics of programming a psychology experiment with just JavaScript, HTML, and CSS. This document aims to be accessible to everyone - no prior programming knowledge needed, although is best used in conjunction with other beginner materials if that is the case. Understanding these languages will also help you to understand how to better use any packages you are using like jsPsych and lab.js, as JavaScript can be used in conjunction with them. In this tutorial we'll create a simple pseudo-experimental task which asks participants to choose which of two different boxes is green. The next tutorial will exend this example to create a real task with all the bells and whistles you'd expect. You are encouraged to send me feedback about where you got stuck working through this document to m.lovell [at] sussex [dot] ac [dot] uk.

### Why 3 Languages?

In 1990 physicist Tim Berners-Lee created the Hyper-Text Markup Language (HTML) in order to allow researchers at CERN to more easily share documents.
HTML consists of tags which indicate which part of a document some text lives in, e.g. the `<head>`, `<body>`, or `<main>` section.
Other tags like `<p>` for paragraph and `<h1>` for the top-level header text describe how that document should be styled as well.
However, using just HTML it bacame tricky to lay out websites the way developers wanted, and lots of hacky solutions were being used that created other issues when guaranteeing a nice layout between devices.

In 1996, the World Wide Web Consortium, who were in charge of managing the development of HTML, invented the Cascading Style Sheets (CSS) language. CSS is used to control the styling and layout of HTML pages. Each HTML tag can be associated with an id, and several tags can be grouped into classes, and we can then can apply properties to them like `background-color: red` and the background colour of the associated tags will be turned red.

Still, HTML pages are static - it's difficult to have things move around, and interactivity is limited. Thus, two years later in 1998 Brendan Eich untook a gruelling 10 days to create the first version of JavaScript from scratch. JavaScript is a full programming language that allows you to manipulate HTML elements, full of many features that can take a lifetime to master.

Basically, (for our purposes right now) your web browser (e.g. Chrome, Firefox, Safari, Edge) is a program which downloads HTML, CSS, and JavaScript and displays the result. The main document is always the HTML - the other two interact with this document. Therefore, when you want to launch your experiment, all you need to do is open the HTML file we will create shortly, and it will open in your browser and display the website you have created.

### Some notes on programming
Before you start programming there's a few things to know that might make it easier to get started. Firstly, all programs are just bits of text that a program on your computer knows how to turn into 1's and 0's that your computer can understand. However, we wouldn't want to just write this text into a plain document when we have what's called an Integrated Development Environment which has lots of nice features to help you code like using different colours to highlight bits of text that do different things. Perhaps the most common IDE is VSCode - it's free and quite lightweight.

Secondly, you will want to use comments to describe to other people what each bit of your code does. You can add comments to your code by using a symbol which tells the computer to ignore the rest of that line of code. Unfortunately, these are different for each of the 3 languages we are using - either `<!--  -->` for HTML, `/*  */` for CSS, or `//` for JavaScript. With HTML and CSS you pust place your comment in the middle of the symbols, and for JavaScript it just ignores the rest of that one line. In VSCode, `CTRL + /` or `CMD + /` on mac will add a comment so you don't need to remember which tag to use.

Thirdly, computer code is has a heirarchical structure to it, and that's why different lines below are indented with the tab key to different amounts - this will make more sense as you learn the basics.

Finally, Googling the key skill of any programmer - and figuring out what to google to find out what you want to know is how you'll get better. It's tricky at first and there's a steep learning curve, but as long as you're always trying to figure out the best way to do something, you'll eventually get better. Best to get stuck in and play around until something clicks. There's a few key websites to look out for for information:
- This is the forum programmers use to answer eachother's questions, most problems you have have been solved here already: https://stackoverflow.com/
- Easy to understand examples: https://www.w3schools.com/html/default.asp
- In-depth documentation: https://developer.mozilla.org/en-US/docs/Web
- Loads of great YouTube tutorials and helpful people on the r/LearnJavaScript subreddit

Like all of these resources when they first came out, using chatbot AI such as ChatGPT is currently frowned upon - my advice would be to use it if it's useful, but remember that overreliance on such tools can hinder your progress, and by largely avoiding them you'll quickly surpass what they are currently capable of doing anyway.

## HTML
HTML uses `<>` tags to denote sections of a document like the title, main body of the document, and individual pragraphs. You will find these HTML tags referred to as 'objects' or 'elements' in other contexts. These tags are also nested within one another, so you end up with a heirarchical structure called the Document Object Model or DOM, often called the 'DOM Tree' to describe this nested brancing structure. HTML tags must often be both opened like `<html>` and closed with e.g. `</html>`, which allows us to nest tags within one another. The following is a basic HTML document you can run in your browser:

```
<!DOCTYPE html> 
<html>
    <head>
        <title>Psychology Experiment</title>
    </head>
    <body>
        Hello!
    </body>
</html>
```

`<!DOCTYPE html>` tells the computer this is an HTML document, and you'll wrap the HTML you write after this in `<html>` tags - these are actually the only non-negotiables in terms of creating an HTML document. The `<head>` tag contains meta-information about the page like it's title you'll see on the tab in your browser. The `<body>` tag is where most of your HTML will actually go. To run this document, save it to a file called, e.g. experiment.html.

Save this file, find it in the folder and double click to open - it should open in your web browser by default. The text "Hello!" should display on this page.

### Basic elements of an experiment in HTML
Let's go through some other tags you'll need. Most html documents can be split into `<div>` tags, 'dividers', which don't do much on their own but help you split your document up into sections. Actually, most HTML tags don't do all that much by themselves, beyond having a little bit of default styling applied, but using the correct tag in the correct place will help make it clear which bit does what. So, whilst you can display your text in most tags, using a `<p>` tag for a paragraph is recommended.

Some tags do infact have extra features. `<canvas>` creates a canvas which you can draw on with JavaScript - ideal for creating stimuli. `<input>` creates buttons and things like radio grid/likert items, sliders, and numerical inputs, etc - ideal for surveys, and are often nested in a `<form>` tag. `<img>` displays images.

Psychology experiments will generally just need to display instructions and perhaps different pairs of stimuli. We will swap out our instructions at different points using JavaScript later, so let's just create a single `<p>` paragraph to display text to the participant. We'll also have two canvases that we'll draw different stimuli on in each trial, and I'll wrap those in a `<div>` tag to keep them separate - we'll use this to lay them out using a grid shortly. Finally, let's wrap all of this in a `<div>` tag, so we can position both the instructions and stimuli together. We'll show and hide these different sections programatically later. Most of the HTML above will remain the same here so I'll just edit the `<body>` tag below.

```
<body>
    <div id="container">
        <p id="instructions">Welcome to the experiment! Press spacebar to begin</p>
        <div id="stimuli">
            <canvas class="stimulus" id="left"></canvas>
            <canvas class="stimulus" id="right"></canvas>
        </div>
    </div>
</body>
```

Note the id's and classes - we'll use these to select these individual elements (ids) and groups of elements (classes, i.e., these can be used on repeatedly multiple individual elements) in CSS and JavaScript so we can interact with and change them.

## CSS
Now we've got out basic HTML layout, the next step is to position and style these elements to create our basic layout. CSS is notoriously tricky as it's designed to be flexible enough to create any website. Coding forums are full of memes talking about how we all suck at CSS. Luckily, as there's often limited things we actually want to do in psychology experiments, we can rely on some general solutions. In your own experiment plenty of trial and error will be needed.

You can include CSS directly in your HTML file between `<style> </style>` tags - although it keeps things a little easier to read if we break them up into separate files. You can load a separate file CSS into your HTML file by using a `<link>` tag with certain parameters. If you create a file called `experiment.css` and it is contained in the same folder as your HTML file, the following change to the `<head>` section of your HTML file will allow this file to style your HTML:

```
<head>
    <title>Psychology Experiment</title>
    <link href="experiment.css" rel="stylesheet" type="text/css"/>
</head>
```
If this file is located elsewhere you'll need to use a file path to locate your file like so: `href="path/to/your/file.css"`

Inside your CSS file, you can select HTML elements and apply styles to them. As a first example, put this in your CSS file and refresh the page in your browser.

```
#instructions {
    color: blue;
    background-color: red;
}
```

You should see the instructions text is now blue, with a red box around it. The red box is larger than the text as the `<p>` paragraph tag takes up an entire line by default. Delete this code after you're done.

How this works is that we select tags, ids, and classes and apply different pre-made styling to them. Ids are selected using `#` (e.g. `#instructions` tells the computer to apply the following styles to the HTML tag `<p id="instructions">` in our example). Classes are groups of multiple tags and are selected with `.` (e.g., `.stimulus` in our own example above). HTML tags (e.g. `<body>`) can be styled by just typing the tag name (e.g. just `body` with no `#` or `.` selector before it). After your selected elements, the `{}` curly brackets tell the computer which styles to apply to the selected elements. Properties are then added in the format `name: value;` (semicolon is required), and you'll have to look up any properties you might want to use.

### Laying out our experiment in CSS
Positioning your elements in CSS can be particularly tricky, and it's worth looking into the 'position' argument and how to use it in future. For now, delete the previous code in the CSS file. The following code will put your container element in the center of the screen - note how everything wrapped in the `<div>` tag is also moved, as these are nested children of that `<div>` tag. I've also coloured it in blue for now so you can see where it is.

```
#container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: blue;
}
```
The size and shape of this container is determined by the size and shape of it's children - our instructions text contributes to this, and in the background our `<canvas>` tags have been given a size of 300x150 pixels by our web browser. You don't need to properly understand how this works for now, but for those interested I'll explain briefly. `position: absolute;` tells the document to ignore everything else on the page and position our element relative to the entire page. `top: 50%;` and `left: 50%;` move the container half-way from the top and left hand side of the page. However, this usually positions the top-left corner of the element, and so we need to then use `transform: translate(-50%, -50%);` to move the coordinate system of the container so that (0,0) is actually in the middle of our element (confusing!).

Now we've got everything centred, our experiment will position our stimulus side-by-side so let's do that. There's two really useful features that have been added to CSS in recent years that are really useful for laying out our stimuli: grid and flexbox (short for 'flexible boxes'). Both of these tell css to take all the immediaite children of an HTML tag - the first level of tags wrapped within an outer tag (like how our two canvases are wrapped in a div with the id 'stimuli'), and place them in a grid layout according to your instructions. These guides are great to getting to grips with both grid https://css-tricks.com/snippets/css/complete-guide-grid/ and flexbox https://css-tricks.com/snippets/css/a-guide-to-flexbox/. As we just want to place two stimuli in a row with a gap between them, flexbox is what we want.

Let's take the stimuli container and make it a flexbox, which will place each element side-by-side in a grid of squares. Add this code to a new line at the bottom of your CSS file:

```
#stimuli {
    display: flex;
    gap: 10px;
}
```
I've set the gap argument to make sure there is a 10 pixel gap between our canvases. The main container will change shape now they're side-by-side, but we can highlight where these canvases are by changing their colour. As we've assigned both to the 'stimulus' class, we can colour them both in at the same time using the `.stimulus` class selector.

```
.stimulus{
    background-color: black;
}
```
Refresh your page and both boxes should now be black, in the center of the screen, and separated by a gap.

### Hiding our stimuli
Before we continue, let's change the size of the canvases where we'll draw our stimulus so they are squares, and hide them until the participant has begun the experiment. In your HTML file edit the `stimuli` `<div>`:
```
<div id="stimuli" hidden>
    <canvas class="stimulus" id="left" height=400 width=400>></canvas>
    <canvas class="stimulus" id="right" height=400 width=400>></canvas>
</div>
```
Check what size these look on your screen and adjust accordingly, before adding the `hidden` variable to the `<div>`. `hidden` tells the browser not to display what is that tag or anything inside it. We will then display this when the participant has read the instructions using JavaScript. This actually won't work with flex-box (it probably should but oh well...), so we can tell our browser to listen to this tag by setting the attribute with `[]` in CSS (don't worry about this as you probably won't normally need to change HTML attributes in CSS normally, it's just convenient for now). Add this to your CSS file to allow the HTML hidden attribute to be used:

```
[hidden]{
    display: none !important;
}
```

### Wrapping up HTML and CSS
For now, your HTML file should look like this:
```
<!DOCTYPE html> 
<html>
    <head>
        <title>Psychology Experiment</title>
        <link href="experiment.css" rel="stylesheet" type="text/css"/>
    </head>
    <body>
        <div id="container">
            <p id="instructions">Welcome to the experiment! Press spacebar to begin</p>
            <div id="stimuli" hidden>
                <canvas class="stimulus" id="left" height=400 width=400></canvas>
                <canvas class="stimulus" id="right" height=400 width=400></canvas>
            </div>
        </div>
    </body>
</html>
```

and your CSS file should look like this, with the blue background colour removed:
```
#container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#stimuli {
    display: flex;
    gap: 10px;
}

.stimulus {
    background-color: black;
}

[hidden]{
    display: none !important;
}
```

## JavaScript
Now we can add some interactivity to our page with JavaScript. Create a file called 'experiment.js' in the same folder as your HTML file, and we'll tell your HTML where to find it by adding the following `<script>` tag to the `<body>` in your HTML file:

```
<body>
    <div id="container">
        <p id="instructions">Welcome to the experiment! Press spacebar to begin</p>
        <div id="stimuli" hidden>
            <canvas class="stimulus" id="left" height=400 width=400></canvas>
            <canvas class="stimulus" id="right" height=400 width=400></canvas>
        </div>
    </div>
    <script src="experiment.js"></script>
</body>
```
Why is this in the body of the HTML? well, technically it could go in other places in the HTML but putting it here ensures the rest of the document gets loaded first, incase your JavaScript started trying to interact with bits of the HTML that didn't exist yet.

### Variables and interacting with the DOM
If you are completely new to programming, some of these concepts will seem odd - we'll start with the very bascis but will move past them quite quickly - you might want to take a look online for other tutorials and then come back to this one if you are a complete begginner. We'll briefly touch on things like variables, functions, for-loops, and if-else statements (conditionals) below. Some good general introductions to JavaScript can be foud at https://www.w3schools.com/js/default.asp and https://developer.mozilla.org/en-US/docs/Learn/JavaScript. You don't need to understand how any of this works however, so long as you can figure out what to change to get the desired outcome.

Let's start with an example by loading our HTML tags (technically, we should say we're loading the elements or objects declared by those HTML tags), into JavaScript so we can do things with them.

```
const instructions = document.getElementById('instructions')
const stimuli = document.getElementById('stimuli')
```

The words `instrucions` and `stimuli` before the `=` sign are somthing called 'variables'. These are just like files in your computer - they have a name and they 'contain' something, but not necessarily a file and instead usually a number or some data, etc. A bit like how we might open a file, we can use the variable's name later to access that data, rather than writing out the full code that creates the variable every time. I could assign almost anything to a variable, `const abc = 5` will load the number 5 into the word 'abc', so that later I can go `abc+10` and this will equals 15. That's an arbitrary example but this idea will become more useful in future.

The `const` is something called a variable declaration - it tells the browser that the variable in question won't be changed in future. If you want to decalare a variable you can change in future, you can use `let` instead of `const` (older code you might see will use `var` instead, but this is now outdated). `document.getElementById()` is code we can use to grab the HTML tag/element in any attached HTML files which have the associated id - just type your id between ' ' or " " into this function (we will deal with fuctions shortly). You can then interact with that HTML tag using the variable you assigned it to using the = sign (which can actually be called whatever you want but naming the HTML element and the JavaScript variable the same thing keeps it simple). So, writing `const instructions = document.getElementById('instructions')` means I can then later run do things to whichever HTML element is called 'instructions' (or, has that id) by using the `instructions` variable, which contains a reference the html element. For example, running `instructions.innerHTML` after this code in JavaScript will return whatever HTML is inside this element, which for us is a bit of text saying 'Welcome... etc'. We will use this to change this text programatically.

### Interactivity: listening for inputs and functions
JavaScript also has some useful functions for listening for 'events' like the user pressing a key on the keyboard or clicking the mouse, etc. Add the code above and the following code to your JavaScript file, save it, refresh the HTML, and press the spacebar.

```
document.addEventListener('keydown', keyboardListener)

function keyboardListener(event){
    if(instructions.hidden===false && event.key===" "){
        instructions.hidden = true
        stimuli.hidden = false
    }
}
```
You should see the instructions disappear and the stimuli appear. `document.addEventListener()` is a function - it takes inputs and produces an output. In this case, we provide it with two instructions, called parameters, which tell it which event to listen to, in this case the pre-defined 'keydown' event, and what function to run on this 'event'. In this case, an 'event' is a variable which will be created when the described event type ('keydown') occurs - this variable then contains information on what happened and when. This 'event' is automatically passed to the function `keyboardListener`, which is something I have defined myself and can be called whatever you like.

Funcions are defined in JavaScript with the `function` keyword, then the name of the function, brackets, anything you want to pass into the function, and instructions inside {} curly backets which tell it what to do to the data you've passed to it. Functions are how we split our code into self-contained chunks for easier understanding, isolation from the rest of the code, and reusablitiy. `function abc(){ instructions.innerHTML = 'abc' }` will change the instructions text to say "abc" if it was called. Add the `abc` function to your JavaScript file and change `document.addEventListener('keydown', keyboardListener)` to `document.addEventListener('keydown', abc)` and it will be called when you press a key, changing the text. One slightly tricky thing you might wonder is where the `keyboardListener` function got the `event` object - this would get complicated to explain fully right now, but basically the Event Listener functions automatically pass this event variable to whatever function it calls. I have made sure we have a reference to this object by adding `keyboardListener(event)`, although you could say `keyboardListener(defg)` all the same - we just need a name for it so we can reference it and check what the event was.

#### Conditional statements and Booleans
Inside the `keyboardListener` function we check if the HTML `hidden` attribute is set to `false` with `if(instructions.hidden===false)`. The `if(){}` here sections off some code to only run if what is contained in the brackets is evaluates to `true`. `true` and `false` are called Boolean values and are perhaps the most fundamental building blocks of programming - do something if.... Previously we added `hidden` to the HTML tag containing our stimuli, but not to our instructions, and so the stimuli are hidden but the instructions are not and so `instructions.hidden` is `false` by default and so `instructions.hidden===false` is true; the instructions are not hidden - and we want them to be. The three `===` sign isn't worth going into but should generally be used in JavaScript to check two things are exactly equal (a single = assigns something to a variable so that is already taken). We also have `event.key === " "` which grabs the `event` object we defined and checks the `.key` 'property' it comes with as a `keydown` event, which should be the spacebar, here defined as a single whitespace `' '`. Both `instructions.hidden===false` and `event.key===" "` should evaluate to true when first loading the page and pressing spacebar, and we check if both are true with `&&` (a 'logical operator', see https://www.w3schools.com/js/js_comparisons.asp). If the instructions are hidde and the spacebar was pressed, we set the instructions to hidden with `instructions.hidden = true` (note, 1 `=` only to assign a value) and show the stimuli with `stimuli.hidden = false`, inside the curly brackets (`{}`) following the `if()`. We'll also do other things with conditional statements inside this `keydown` 'event listener' to check for other keys being pressed (the left and right arrows) soon.

### Changing the canvas colour
We'll hande defining an actual stimulus later, but for now we'll stick to just changing the canvas' colours based on user input, so we can give them some feedback based on what they choose. First, we'll want to access our two boxes to colour them in, so at the top of your script (they could also go inside the event listener function) let's grab those two elements:
```
const left = document.getElementById('left')
const right = document.getElementById('right')
```

and let's listen for left and right arrow presses:

```
function keyboardListener(e){
    if(e.key===" " && instructions.hidden===false){
        instructions.hidden = true
        stimuli.hidden = false
    } else if(e.key==="ArrowLeft"){
        left.style.backgroundColor = 'blue'
        right.style.backgroundColor = 'black'
    } else if(e.key==="ArrowRight"){
        right.style.backgroundColor = 'blue'
        left.style.backgroundColor = 'black'
    }
}
```
For brevity I've renamed the `event` variable `e`. `ArrowLeft` and `ArrowRight` are key codes which can be found here: https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values, and if you are just using a letter then the code will be that letter (e.g. e.key==="a", although this is case sensitive!). Inside this function I've set the selected box to `blue` and the other box to `black` with code in the format `element_variable.style.backgroundColor = 'colour'` e.g. `left.style.backgroundColor = 'blue'`. `.style` is actually how you change the CSS of an element directly in JavaScript, and any property e.g. `background-color` become written in 'camelCase' so `backgroundColor`. The colours are also predefined (https://www.w3schools.com/cssref/css_colors.php) but you can use other things here like hex or rgb values if you like.

Swap out the old `keyboardListener` function for the new one and you should see the boxes change to blue depending on which arrow key was pressed.

### Debugging: Using Developer Tools
Now we've got some interactivity, as a quick aside, you'll want to know how to check what your code is doing behind the scenes (without necessarily changing the page and printing something there). Your web browser's Developer Tools are a little window you can create which will show info about your website - the current state of the HTML DOM (see above) which we are changing with our code, and info about the functioning of your JavaScript script - things you've told it to print out, and any errors. If you're using Google Chrome you can use this to open your DevTools: https://developer.chrome.com/docs/devtools/open, or just right click and select 'inspect', or press F12 (for other browsers you might need to google how to open these). Inside the DevTools you can see the 'Elements' tab, which shows your HTML, and your 'Console' where you can print out things from JavaScript. The box with an arrow on it in the top left is also a useful tool for selecting an element on the page and going stright to where it is defined in the Elements tab. Let's print ('log') something to the console.

We 'log' something to the console with `console.log()` in JavaScript. Add `console.log(e.key)` inside the top of your `keyboardListener` function, save, refresh the page, and go to the 'Console' tab of your DevTools and you should see the key pressed being printed out.

This is a great tool to figure out why things aren't working (fixing bugs! fun fact: https://www.dbvis.com/thetable/why-are-they-called-bugs).

## The Plan: The basic building blocks of an experiment or task.
I'd like to take a second here to lay out what we'll need to make any experiment or interactive cognitive task. Generally I think the following components should rougly be what we need:

- Instructions
- What to change on each trial
- Blocks of trials
    - A single trial
        - Handle trial number: show break or end screens
        - A fixation cross
        - Define stimuli
        - Display stimuli
        - Get user input
        - Store data:
            - Current stimuli details
            - Reaction Times
            - Choices
- End experiment
    - Send data
    - Debrief

To accomplish the above we need the ability to show and hide different screens, and have delays between things. We'll handle creating most of the above in this lesson.

As a first step, the 'task' we will be creating will randomly make one stimulus green and the other red, and ask participants to choose the green one as quickly as possible.

### Counterbalancing trial order
I think it's best practice to define our trials - the properties we want the stimulus to have - ahead of time. Here we want one stimuli to be green and the other red. We want an equal amount of these trials over the experiment, but to present a random one in each trial.

Let's start by making an array containing 'left' and 'right'. An array holds multiple distinct values. Whilst a normal variable might hold one thing, e.g. `abc = 'left'` holds just the value `'left'`, an array can hold multiple values, and these are held together in a container of square brackets `[]` e.g. `abc = ['left', 'right']`. We can then select just one of these with square brackets again, using the 'index' or location of the value we want, e.g. `abc[0]` gets the first elemet, `'left'`, and `abc[1]` gets the second element, `'right'` (we start at 0 and not 1 in most programming languages). This will then be used to check which side should be green, the target side in each trial (and then we'll make the other side red).

We'll need to introduce two slightly trickier concepts to achieve this, scoping, and for loops. Basically, any variable created inside a function can only be used inside that function, and will disappear when the funciton stops running. Keeping track of which bit of your code knows what is pretty core to writing good code. As we'll use a function to create our array of the target (i.e., green) stimulus, left or right, we want this to be accessible throughout our experiment, and sepcifically outside of the function which creates this array of 'left' and 'right' target values. Placing a variable at the 'top level' of your script, outside of any functions, is called declaring a 'global variable' in the 'global scope'. Let's add a variable at the top of our script, just below where we grabbed the HTML elements - instructions, stimuli, left, and right - and assigned them to variables.

```
const instructions = document.getElementById('instructions')
const stimuli = document.getElementById('stimuli')
const left = document.getElementById('left')
const right = document.getElementById('right')
let targetSide = []
```

I've declared the `targetSide` varible using `let` instead of `const` as I'm going to change it soon, by first adding variables and then shuffling them around, so it isn't 'constant'. ` = []` tells JavaScript this will be an array, so we can push values into it in a row shortly. 

Let's declare a function which adds values to this array, and you can place it below the `keyboardListener()` function.

```
function stimArray(){
    const nTrials = 10

    for(let i=0; i<nTrials; i++){

        if(i<nTrials/2){
            targetSide.push('left')
        } else {
            targetSide.push('right')
        }

    }

    console.log(targetSide)
}

stimArray()
```
`n_trials` is the number of trials we want to run, so 10 trials here. `for(let i=0; i<n_trials; i++){}` is a 'for loop' - this syntax is a little tricky, but you just need to know this will run through the code that follows `nTrials` (i.e., 10) times. Specifically, `let i=0` declares a variable `i` to be 0, `i<nTrials` says 'whilst i is less than nTrials', and `i++` is a shorthand saying 'increase i by 1 on each trial'. Inside this loop I check if we are less than halfway through the loop with `if(i<nTrials/2)` (is the value of i less than the number of trials divided by `/` 2) and if so, we add the value `'left'` to the array. If that is not true (i.e. we are over half way through), then the `else` section will run, adding `'right'` to the array. The code then gets to the end of the `{}` and runs through the loop again, checking if `i<nTrials` and increasing by 1 if not. If `i` is greater `nTrials` (i.e. 10) then the loop is ended and the next line of code after the `for` loop is run, in this case `console.log(target_side)` prints out the whole array to your JavaScript DevTools console. This ensures we have an array that is 50/50 split between the values `'left'` and `'right'`.

The `stimArray` function is defined but we haven't 'called' it, i.e. told it to run. Below the functon, `stimArray()` tells your browser to run the function. Doing so you should see the `targetSide` array print to your Console in your browser.

We next want to shuffle this array around, so that a random stimulus can be presented on each trial. There's many clever functions out there to do this but I've grabbed a simple one from https://stackoverflow.com/a/12646864. I've left some comments in the code to detail how this works - it's using some clever JavaScript tricks so might be a little difficult to understand. Don't worry if you don't understand it - we just need it to work!

```
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) { // loop through array backwards
        const j = Math.floor(Math.random() * (i + 1)); // random number from 0 to the length of the array
        [array[i], array[j]] = [array[j], array[i]]; // swap the numbers at the current and random index
    }
}
```

Place this above your `stimArray()` function. We'll then call this inside our `stimArray()` function to shuffle the array around after it has been created. Slightly confusingly, this shuffle function will change the array 'in place', i.e. we don't need to save the output to a new variable or anything like that (this'll be something to get to grips with later!).

```
function stimArray(){
    const nTrials = 10
    
    for(let i=0; i<nTrials; i++){

        if(i<nTrials/2){
            targetSide.push('left')
        } else {
            targetSide.push('right')
        }

    }

    shuffle(targetSide)
    console.log(targetSide)
}
```

Save this and refresh the page - everytime you refresh the page you should see a new random array of 'left' and 'right' values being printed out into your Console.

### Showing stimuli on each trial
Let's now define what each trial should look like: show participants the stimuli on each trial. To do so let's declare another 'global variable' (see above) to keep track of the trial number at the top of the script, below the other global variables like targetSide and the references to our HTML elements.

```
let trialN = -1
```

We start this variable at `-1` because we will increase the trial number at the start of each trial, and then use that number to store the data on that trial - a little confusing but it makes the code easier to understand later. Below our other functions let's use the trial number to grab the target stimulus, left or right, that we want to be green for whatever trial we are on, and change the colour of the corresponding box.

```
function changeStimuliColour(){
    const target = targetSide[trialN]
    if(target === 'left'){
        left.style.backgroundColor = 'green'
        right.style.backgroundColor = 'red'
    } else if(target === 'right'){
        right.style.backgroundColor = 'green'
        left.style.backgroundColor = 'red'
    }
}
```

Here I create a variable called `target` each time the function is called (remember this is not accessible outside the function and is destroyed after the function has finished running). `target` stores the value, 'left' or 'right', from the `targetSide` array we created earlier, at the 'index' (or location) using the value stored in `trialN`, which for now is 0. `targetSide[trialN]` then basically gets the first element of the array `targetSide` (the array you can see printed out in your DevTools console). Running `changeStimuliColour()` underneath this function and refreshing the page will set the green box to whatever side is first in the `targetSide` array. Remove this call to `changeStimuliColour()` before proceeding, however. 

### Running through trials
Let's do a few things now to set up a trial. Firstly, let's set up something to call `changeStimuliColour()` and then increase the trial number.

```
function runNextTrial(){
    trialN = trialN+1
    changeStimuliColour()
    document.addEventListener('keydown', keyboardListener)
}
```

This is a function we can call when we want to run a new trial. Each call displays the stimulus, listens for a keyboard event, and the increases the trial number ahead of the next trial. 

The reason we start listening for user input here is that we don't always want to be recording keyboard storkes. Instead, we want to record one input, the choice made, and then stop recording inputs for that trial. Here, we make sure we start listening for inputs after the stimuli have been changed. We then need to add `document.removeEventListener('keydown', keyboardListener)` to the top of the `keyboardListener()` function so we stop listening for more inputs after an input has happened. Note the difference between running `addEventListener` which tells the page to listen to user inputs, and `removeEventListener` which 'deregisters' this listener - we'll then add it back when we want to gather input on the next trial.

### Delays - Inter Stimulus Intervals
We also want to have a break between trials (an 'Inter-Stimulus Interval, e.g. for a fixation cross), after which we call another trial. We can do this with the built-in `setTimeout` function, which will wait a certain number of milliseconds and run the function you pass to it after this. Add `setTimeout(runNextTrial, 1000)` to the bottom of each `if` or `else` section of the `keyboardListener()` function like so:

```
function keyboardListener(e){

    document.removeEventListener('keydown', keyboardListener)

    if(e.key===" " && instructions.hidden===false){
        instructions.hidden = true
        stimuli.hidden = false
        setTimeout(runNextTrial, 1000)

    } else if(e.key==="ArrowLeft"){
        left.style.backgroundColor = 'blue'
        right.style.backgroundColor = 'black'
        setTimeout(runNextTrial, 1000)

    } else if(e.key==="ArrowRight"){
        right.style.backgroundColor = 'blue'
        left.style.backgroundColor = 'black'
        setTimeout(runNextTrial, 1000)

    }
}
```

This means that after the participant presses one of the relevant arrow keys, or when they move from the instructions screen to the actual trials, we will wait 1000 milliseconds (i.e. 1 second) and then show the next trial (which might be the first trial, of course). This means you can't just spam buttons and can only make one response. The `keyboardListener()` function could be rearranged to be less repetetive if you like, but I'll leave it for now and move on.

One thing to note is that 'asyncronicity' and 'concurrency' issues are one of the trickiest things about JavaScript - things can run at different times. This isn't often an issue for the sort of things we do in psychology experiments (if you set things up in the right way), including in this example, but it's something to keep in mind for when things get more complicted as a potential source of issues in your own code. Here's a great talk on it for those interested in seeing some more advanced concepts: https://www.youtube.com/watch?v=8aGhZQkoFbQ.

### Ending the experiment
Right now, nothing happens when we reach our number of trials - we get stuck with black boxes which can be turned blue with arrow presses. Let's create a function that we can call when we are out of trials to run and want to show an end screen:

```
function endExperiment(){
    stimuli.hidden = true
    instructions.innerHTML = 'The experiment is now over'
    instructions.hidden = false
}
```
Similar to the first function we made to hide the instructions and show the stimuli, here we want to hide the stimuli and show some text telling the participant that the experiment is over. `stimuli.hidden = true` hides the HTML element stored in our `stimuli` variable we create at the top of the script. In the middle of these two I set the instructions text to say 'The experiment is now over'. Remember that the instructions are stored in an HTML `<p> </p>` tag, so we can just reuse that tag here, and change the `.innerHTML` property of that tag (the HTML that is inside it - i.e. just some text for us) to what we want the text to be.

Let's then change the `runNextTrial` function to only change the stimuli if we still have trials left in our array, and if not to call the `endExperiment` function and remove the stimuli.

```
function runNextTrial(){
    if(trialN<targetSide.length){
        trialN = trialN+1
        changeStimuliColour()
        document.addEventListener('keydown', keyboardListener)
    } else {
        endExperiment()

    }
}
```

I won't be defining breaks in the experiment in this tutorial, but you could do so yourself if you fancy a bit of homework to apply what you've learnt so far.

### Recording data
We also want to save our data on each trial. For this we'll use a JavaScript Object. Objects are like arrays in that they store multiple values, but this time each value can also have a name. They are defined using curly brackets, and we can enter data with has a 'key' and 'value' pairs, like this: `const myObject = {key1: value1, key2: value2}` e.g. `const trial = {trialNumber: 1, targetSide: 'left', reactionTime: 500}`. We'll create one for each trial and store them in an array. This will be turned into JSON, and the langauages and programs you use for statistical analysis will be able to turn this data into a CSV or other dataframe or table for you.

We also want to record the reaction time for each trial, and for this we'll need a global variable so the timer can be started by one function and ended when we capture a key press. Put this at the top of your script with the other global variables.

```
const data = []
let trialStartTime
```

This declares an array called data (you can always push to an array even if it is declared with `const`). We also decalre a variable called `trialStartTime`, and note that we don't have to give this a value right now, we'll do that next, but we do want it to exist in the global scope so we can do something with it in different functions.

JavaScript doesn't have a built in timer as such, but we can use the function `performance.now()` to get the current time to millisecond-accuracy (note we are calling the `.now()` function from the `performance` package/interface here). The time this returns us is confusingly the time since loading the web page (most of the time) in milliseconds. We store this time now so we can subtract it from the time of the keyboard press later, to get the difference in time i.e. elapsed time over the trial. Add `trialStartTime = performance.now()` to your `runNextTrial()` function like so:

```
function runNextTrial(){
    if(trialN<targetSide.length){
        trialN = trialN+1
        changeStimuliColour()
        trialStartTime = performance.now()
        document.addEventListener('keydown', keyboardListener)
    } else {
        endExperiment()
    }
}
```

Add this function to your script, which we will use to save the data from each trial:

```
function saveTrialData(e){
    const target = targetSide[trialN]
    const reactionTime = e.timeStamp - trialStartTime
    const correct = (e.key==='ArrowLeft' && target==='left') || (e.key==='ArrowRight' && target==='right')

    const trialObject = {
        'trial_n': trialN,
        'target_side': target,
        'response': e.key,
        'rt': reactionTime,
        'correct': correct
    }

    data.push(trialObject)
    console.log(data)
}
```

I'll explain what it does shortly. For now, let's call this function in the `keyboardListener` to save data after the user has pressed an arrow, and before we call the next trial:

```
function keyboardListener(e){

    document.removeEventListener('keydown', keyboardListener)

    if(e.key===" " && instructions.hidden===false){
        instructions.hidden = true
        stimuli.hidden = false
        setTimeout(runNextTrial, 1000)

    } else if(e.key==="ArrowLeft"){
        left.style.backgroundColor = 'blue'
        right.style.backgroundColor = 'black'
        saveTrialData(e)
        setTimeout(runNextTrial, 1000)

    } else if(e.key==="ArrowRight"){
        right.style.backgroundColor = 'blue'
        left.style.backgroundColor = 'black'
        saveTrialData(e)
        setTimeout(runNextTrial, 1000)
    }

}
```

Note that I have passed the `e` from `keyboardListener` straight to to the `saveTrialData()` function - this is a variable automatically created by the `document.addEventListener('keydown', ...)` function (I have called it `e` myself, could be called anything), which details what the event was, when it happened, etc. Inside the `saveTrialData` function, I get the current target stimulus (whichever side is green) by getting the value in the `targetSide` array at the location of our trial number, with `targetSide[trialN]`. The reaction time is calculated by getting the `timeStamp` property of the event object `e`, where the time the key was pressed is stored, and sutract from it the time the trial was started, which we calculated previously in our `runNextTrial` function. I think it's a good idea to store whether or not the trial was correct, so I have calculated this using boolean/logical operators - see if you can figure out how that works.

Next, we create a JavaScript Object which stores the trial number, target, response made (`e.key`, as previously), the reaction time, and correctness with key value pairs. `data.push(trialObject)` adds the `trialObject` variable as the last entry in the `data` array. I then log this to the console - click the arrow in your console to expand this variable and see how the data is being stored.

### Sending data
That esentially finishes the task we are creating in this session. The only thing left to do is store the data somewhere. If you wanted to send data to your university server space with a more by-hand method, I have an old, fairly rough descripton of how to do from an unfinished website here: https://users.sussex.ac.uk/mel29/online_experiments/saving.html. However, the easiest way to set up is sending data directly to OSF using DataPipe, which we'll do here. Follow the set-up instructions for DataPipe: https://pipe.jspsych.org/getting-started, including making an OSF key. Once that's done, on the page for your project on DataPipe, make sure 'Enable Data Collection' is selected, and turn off any Data Validation for now (or atleast remove values from 'Required Fields'). Don't follow the instructions on DataPipe generally, as they are for using jsPsych, but you will need to grab your experimentID.

DataPipe requires a slightly fiddly setup to use - we need to send them another JavaScript object, with our own array of data inside it, alongside a file name and your experiment ID. Don't worry about the details of this too much. The following function creates a random id of a given length with a random combination of letters and digits:

```
function makeRandomID(length){
    const characters = "abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomID = ''
    for (let i=0; i<length; i++) {
        randomID += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return randomID;
}
```

The return function means that it will spit out that value and we can assign this to a variable, e.g. `const randomID = makeRandomID(30)` means the `randomID` variable will be assigned with the output of `makeRandomID` for use inside the `createDataPipeObject` function below. Whilst there is another variable called `randomID` inside the `makeRandomID` function, this is only accessible from inside that function and not other functions, including `createDataPipeObject` - it is not in the same 'scope'. Here is that function (make sure you replace YOUR EXPERIMENT ID HERE with your own experiment ID from DataPipe):

```
function createDataPipeObject(){
    const randomID = makeRandomID(30)

    const dataPipe = {
        experimentID: "YOUR EXPERIMENT ID HERE",
        filename: randomID + ".json",
        data: JSON.stringify(data)
    }

    const jsonData = JSON.stringify(dataPipe)

    return jsonData
}
```

`JSON.stringify()` turns a JavaScript object into a singel string of digits - this is perhaps the most common way to send data around the internet, using JSON (JavaScript Object Notation) - a single string made out of a JavaScript Object. I call `JSON.stringify()` on both our data and the `dataPipe` data as DataPipe will un-stringify the `dataPipe` object when they recieve it, and our own `data` needs to survive this process as a JSON string itself... again, this isn't particularly important.

```
function sendData(jsonData){
    fetch("https://pipe.jspsych.org/api/data/", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: jsonData,
    })
}
```

Finally, this function will actually send the data over the web, to DataPipe (https://pipe.jspsych.org/api/data/), who will forward it on to OSF. Note, this is a slight misuse of JavaScript's Fetch API, but should work well enough for our purposes (and `async await` is a bit of a nightmare). For a proper example see: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch.

We want to send this data at the end of our experiment, so we'll call the function to create the string of data we want to send, and the one to actually send it, here:

```
function endExperiment(){
    const jsonData = createDataPipeObject()
    sendData(jsonData)
    stimuli.hidden = true
    instructions.innerHTML = 'The experiment is now over'
    instructions.hidden = false
}
```

Check your OSF repository and you should see the data in there. If you want to read your data in R, try the jsonlite or rjson packages.

### END
That's it for your first JavaScript experiment. Future tutorials will turn this into a real task, and cover creating your own stimuli, Qualtrics and Lab.js integration, surveys, and more. Check the files in this folder to see what the code should look like, if anything went wrong. As for launching the experiment, see our guide here: 