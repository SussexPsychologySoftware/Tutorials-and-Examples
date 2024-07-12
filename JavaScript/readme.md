# Intro to programming experiments for the web with JavaScript
This document goes through the basics of programming a psychology experiment with just JavaScript, HTML, and CSS. Understanding these will also help you to understand how to better use any packages you are using like jsPsych and lab.js, as JavaScript can be used in conjunction with them. Throughout this document we'll create a simple reaction time experiment showing two different coloured boxes.

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

Thirdly, Googling the key skill of any programmer - and figuring out what to google to find out what you want to know is how you'll get better. It's tricky at first and there's a steep learning curve, but as long as you're always trying to figure out the best way to do something, you'll eventually get better. Best to get stuck in and play around until something clicks. There's a few key websites to look out for for information:
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

Let's start with an example by loading our HTML tags (technically, we should say we're loading the elements declared by those HTML tags), into JavaScript so we can do things with them.

```
const instructions = document.getElementById('instructions')
const stimuli = document.getElementById('stimuli')
```

The words `instrucions` and `stimuli` before the `=` sign are somthing called 'variables'. These are just like files in your computer - they have a name and they 'contain' something, but not necessarily a file and instead usually a number or some data, etc. A bit like how we might open a file, we can use the variable's name later to access that data, rather than writing out the full code that creates the variable every time. I could assign almost anything to a variable, `const abc = 5` will load the number 5 into the word 'abc', so that later I can go `abc+10` and this will equals 15. That's an arbitrary example but this idea will become more useful in future.

The `const` is something called a variable declaration - it tells the browser that the variable in question won't be changed in future. If you want to decalare a variable you can change in future, you can use `let` instead of `const`. `document.getElementById()` is code we can use to grab the HTML tag/element in any attached HTML files which have the associated id - just type your id between '' or " " into this function (we will deal with fuctions shortly). You can then interact with that HTML tag using the variable you assigned it to using the = sign (which can actually be called whatever you want but naming the HTML element and the JavaScript variable the same thing keeps it simple). So, writing `const instructions = document.getElementById('instructions')` means I can then later run do things to whichever HTML element is called 'instructions' (or, has that id) by using the `instructions` variable, which contains a reference the html element. For example, running `instructions.innerHTML` after this code in JavaScript will return whatever HTML is inside this element, which for us is a bit of text saying 'Welcome... etc'. We will use this to change this text programatically.

### Functions and listening for inputs
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
You should see the instructions disappear and the stimuli appear. `document.addEventListener()` is a function - it takes inputs and produces an output. In this case, we provide it with two instructions, called parameters, which tell it which event to listen to, in this case the pre-defined 'keydown' event, and what function to run on this 'event'. In this case, an 'event' is a variable which will be created when the described event type ('keydown') occurs - this variable then contains information on what happened and when. This 'event' is automatically passed to the function keyboardListener, which is something I have defined myself and can be called whatever you like.

Funcions are defined in JavaScript with the `function` keyword, then the name of the function, brackets, anything you want to pass into the function, and instructions on what to do to the data you've passed to it inside that function. Functions are how we split our code into self-contained chunks for easier understanding, isolation from the rest of the code, and reusablitiy. `function abc(){ instructions.innerHTML = 'abc' }` will change the instructions text to say "abc" if it was called. Add the `abc` function to your JavaScript file and change `document.addEventListener('keydown', keyboardListener)` to `document.addEventListener('keydown', abc)` and it will be called when you press a key, changing the text. One slightly tricky thing you might wonder is where the `keyboardListener` function got the `event` object - this would get complicated to explain fully right now, but basically the Event Listener functions automatically pass this event variable to whatever function it calls. I have made sure we have a reference to this object by adding `keyboardListener(event)`, although you could say `keyboardListener(defg)` all the same - we just need a name for it so we can reference it and check what the event was.

#### Conditional statements and Booleans
Inside the `keyboardListener` function we check if the HTML `hidden` attribute is set to `false` with `if(instructions.hidden===false)`. the `if(){}` here sections of some code to only run if what is contained in the brackets is evaluates to `true`. `true` and `false` are called Boolean values and are perhaps the most fundamental building blocks of programming - do something if.... Previously we added `hidden` to the HTML tag containing our stimuli, but not to our instructions, and so the stimuli are hidden but the instructions are not and so `instructions.hidden` is `false` by default and so `instructions.hidden===false` is true, they are not hidden - and we want them to be. The three `===` sign isn't worth going into but should generally be used in JavaScript to check two things are exactly equal. We also have `event.key === " "` which grabs the `event` object we defined and checks the `.key` 'property' it comes with as a `keydown` event, which should be the spacebar, here defined as a single whitespace `' '`. Both `instructions.hidden===false` and `event.key===" "` should evaluate to true when first loading the page and pressing spacebar, and if this is the case we set the instructions to hidden with `instructions.hidden = true` and show the stimuli with `stimuli.hidden = false`. We'll also do other things with conditional statements to check for other keys being pressed (the left and right arrows) soon.

#### Drawing on the canvas
We're going to draw 