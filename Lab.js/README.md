# Running Lab.js experiments
If you are looking to run Lab.js experiments online, they already have some useful guides here: https://labjs.readthedocs.io/en/latest/learn/deploy/index.html I'd recommend looking through. Below are some suggestions on extra things you can do with custom code in Lab.js if needed.


### JavaScript
Note: the following section assumes some knowledge of JavaScript. See our tutorial on JavaScript in this repository for more information.

Lab.js can take custom HTML/CSS/JavaScript. Note that some HTML and CSS can be added in a separate section locatied by clicking on the three lines/sliders settings icons at the top left of the page. The 'HTML' tab has the best place to put any additions to your header, and your CSS can go in the 'CSS' tab. To add your HTML and JavaScript for a specific page, create a new study if needed and click the '+' on the left hand survey flow bar, and create a 'Page: HTML'. Delete the default content and add a new one with the '+' and select 'Raw HTML'. Your HTML then goes here in the 'Content' tab. Click on the 'Scripts' tab on the top left to input your JavaScript. The dropdown menu on the top right of your script has options to run the script at different times - generally the 'run' option should work for most cases.

Take a look at the 'Example Experiment' folder for an example which takes the experiment made in our JavaScript tutorial and converts it to Lab.js ready code.

### Making a fullpage blank background
Lab.js has a lot of default styling you might not want. If not, you can wrap all your materials in the following HTML `<div>`

```
<div id="blankBackground">
    <!-- rest of your HTML here -->
</div>
```

and add this CSS to make sure that it takes up the full page and is on-top of everything else shown on the page:
```
#blankBackground {
    position: absolute;
    background-color: white;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
    z-index: 99999999;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```
which you can then remove when the task is over with:
```
document.getElementById('blankBackground').remove()
```
which allows the continue button to be seen again. Or, you could add and remove `blankBackground` as a class.

### Hiding the submit button
If needed, the following CSS will hide the submit button:
```
button[type="submit"][form="page-form"]{
    display: none;
}
```
or you could show and hide it with JavaScript:
```
document.querySelector('button[type="submit"][form="page-form"]').style.display = 'block';
```
where `.style.display = 'block'` or `'none'` will show or hide the button, respectively.

### Note on image/text distortions
If your text and images are appearing distorted in Lab.js, consider adding the following CSS:
```
:root{
    --line-height: 1 !important; 
}
```

### Saving data
To save data from JavaScript to Lab.js, you first need to save a reference to the datastore in a global variable:
```
const ds = this.options.datastore
```
and, presuming you have an array of data stored in a variable called `data`, you could save it at the end of your task by calling the following function:
```
function saveData(){
    for(let i=0; i<data.length; i++){
        ds.commit(data[i]) 
    }
}
```

Where data is an array of JavaScript objects and `ds.commit(data[i])` uses lab.js' own `commit` function to save each field in data to a separate column in the lab.js data file.

### Accessing form responses (and other previous data)
If you have set up a form response and wish to access it using JavaScript, there are several options to do so in Lab.js. For example, if we have the following form on one page:

```
<form>
    <legend>Are you colourblind?</legend>
    <input type="radio" id="colourblindYes" name="colourblind" value="yes" checked />
    <label for="yes">Yes</label>
    <input type="radio" id="colourblindNo" name="colourblind" value="no" />
    <label for="no">No</label>
    <button type="submit">Submit</button>
</form>
```

We can get the option they checked on the next page using the `name` of these HTML inputs. For example, so long as we have a reference to the datastore, i.e. `const ds = this.options.datastore` in the global scope (i.e. at the top of the script), then the following will work:

```
ds.get('colourblind')
ds.data[ds.data.length-1].colourblind
ds.extract('colourblind','colourblindQuestionnaire')
```
The last option also needs whatever you called the page with the form question on it in lab.js - by default this will be 'Form'.

This technique is also useful for retrieving other data from previous questions and your own JavaScript code.