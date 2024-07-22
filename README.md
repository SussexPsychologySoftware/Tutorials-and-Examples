# An Introduction to Running Online Psychology Experiments
This guide is intended to introduce researchers and students to all the avenues they might need for conducting online experiments, starting from scratch and assuming no prior knowledge. If need any help conducting your experiment, or come across any resources we might want to add to this page, don't hesitate to get in touch at m.lovell [at] sussex [dot] ac [dot] uk. Everything listed here is free to use unless otherwise stated.

## Surveys
All of the tools listed below can help you create surveys for your experiment too. However, if your experiment does not contain an interactive task, you will likely be able to handle most of your study through Qualtrics, which can handle assigning participants to conditions, follow-up surveys, email lists, and reminders too, amongst other things. The University of Sussex Psychology department has a subscription to this service. See Qualtrics' guide on their survey creation tool here: https://www.qualtrics.com/support/survey-platform/getting-started/survey-platform-overview/. Our own guide on using Qualtrics to run Psychology Experiments can be found in the Qualtrics folder of this repository: https://github.com/Sussex-Psychology-Software-Team/online-experiments/tree/main/Qualtrics. If the basic functionality of tools like Qualtrics is not enough, the rest of this guide lists resources to help you conduct your study online.

Other options:
- Online Surveys https://www.onlinesurveys.ac.uk/
- If you would like to program your surveys then you can use SurveyJS https://surveyjs.io/, which has been integrated into jsPsych recently as well.

## Creating interactive cognitive tasks
For our purposes, we can think of a web browser (e.g. Chrome, Safari, Edge) as a program that uses 3 interlinked programming languages (HTML, CSS, and JavaScript) to display websites. You do not have to learn any of these languages to conduct an online experiment thanks to several programs that allow you to make experiments visually with a graphical interface, which are then turned into code for you. However, you might find that you can't do exactly what you want in these graphical tools, and require more control over the experimental materials. In that case, you will need to start programming, but still there are lots of 'libraries' and 'frameworks' which provide lots of pre-written bits of code that are designed specifically for making psychology experiments easy to create. Here we will go through all the available options and point you to any learning resources.

**If you are not sure where to start, we recommend making your experiment in jsPsych, hosting on JATOS, and sending data to OSF using DataPipe.** If you find this difficult, GitHub Pages might be an easier option to host the jsPsych code, which you can then display in you Qualtrics survey, where you can manage and store your data as well (see the Qualtrics guide in this repository).

### No-code GUIs
The following websites and programs will allow you to build a psychology experiment with no code at all. Most of these programs will also allow you to use code as well to add extra functionality.
- Inquisit  - the Sussex Uni Psychology department has a subscription to this service
- PsychoPy
    - PsychoPy is primarily for building offline experiments that run on your computer directly, by they do have limited functionality to automatically turn experiments built with their GUI into something that can be run online. This involves transpiling to their PsychoJS library, and so will create valid JavaScript code you can host in a variety of locations (see below). These experiments can be launched directly on their online experiment hosting platform Pavlovia.
- Lab.js: https://lab.js.org/
    - Tutorial: https://labjs.readthedocs.io/en/latest/learn/builder/
    - Launching/Hosting Lab.js on other platforms: https://labjs.readthedocs.io/en/latest/learn/deploy/3-third-party.html#
- PsyToolKit: https://www.psytoolkit.org/
- Testable: https://www.testable.org/
- Gorilla: the Sussex Uni Psychology department does not have a subscription to this service.
- SynToolKit - In-house software, contains some pre-built screening tools for Synaesthesia research
- Tatool Java: https://www.tatool.ch/start.htm currently not maintained
- Meadows Research: https://meadows-research.com/

### Coding Packages, Libraries, and Frameworks
If you need or would like more accuracy or flexibility than is offered by the GUIs above, there are several packages that help in creating online experiments, and allow you to do so in a variety of languages you might be more familiar with:
- JSPsych: https://www.jspsych.org/7.0/tutorials/hello-world/index.html
    - This is perhaps the most popular option. Requires a fair bit of JavaScript, but is also a good intro to the language, with great tutorials and documentation.
    - Ask for help on the official GitHub forum: https://github.com/jspsych/jsPsych/discussions
- PsychoJS: JavaScript counterpart to PsychoPy
- PsychTestR: Write experiments in R with R-Shiny https://pmcharrison.github.io/psychTestR/
- MATLAB Web App Server: https://uk.mathworks.com/help/webappserver/
- OsWeb for OpenSesame experiments: https://osdoc.cogsci.nl/3.3/manual/osweb/osweb/
- PsyToolKit: https://www.psytoolkit.org/lessons/project.html#_step_4_code_the_experiment
- Tatool Web: https://www.tatool-web.com/#!/
- The Experiment Factory: https://www.expfactory.org/ contains pre-built experiments to get you started as well
- SoPHIE Labs: https://www.sophielabs.com/help/videotutorial/ similar to Lab.js, has some features to make coding easier

### JavaScript
You might want/need to code your experiments directly in JavaScript, which is likely what most of the options above are actually using under the hood (maybe WASM/WebGPU as well). Whilst achievable, this can be tricky, and note that jsPsych or PsychoJS are more than powerful and flexible enough for most experiments (although learning JS will help your skills with these libraries too). If you would like to learn JavaScript to make an online experiment, see our tutorial in the JavaScript folder of this repo: https://github.com/Sussex-Psychology-Software-Team/online-experiments/tree/main/JavaScript. For more general introductions consider https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps, or https://www.w3schools.com/js/default.asp.

## Hosting
Once your experiment has been created, you need to put it online - to 'host' it on a server (i.e. a computer) somewhere so people can access it in their web browser. All of the GUIs listed above will handle this for you - although with PsychoPy you will need to go through their Pavlovia system, which is detailed below.

If you have written code, most of the no-code GUIs also serve as places where you can host your experiment as well, with a little extra work. Follow the links to see more in-depth guides on how to host your code on the platforms listed. A good resource on this can be found here: https://kennysmithed.github.io/oels2022/oels_wk11.html. 

### Experiment Hosting Websites:
- JATOS: https://www.jatos.org/Whats-JATOS.html 
    - Free to use, and can manage participants too.
    - See: https://mindprobe.eu/
- Cognition.run: https://www.cognition.run/
    - Free and easy to use - just create a new task and upload your JavaScript to the source code section. It doesn’t accept HTML, so your CSS will need to be in a separate file.
- Lab.js
    - You can host your own JavaScript/JSPsych/PsychoJS code on lab.js as well, and save your data here too.
- Pavlovia
    - 20p per participant.
    - jsPsych integration: https://pavlovia.org/docs/experiments/create-jsPsych
- Gorilla:
    - 99p per participant.
    - jsPsych integration: https://app.gorilla.sc/support/articles/jspsych
- Qualtrics
    - Qualtrics can host JavaScript/HTML/CSS inside of a Text/Graphic question and save your data using JavaScript too. Current versions of jsPsych do not work in Qualtrics directly, but you can use 'redirects' or 'iFrames' to deal with this.
    - See our guide to running experiments in the Qualtrics folder of this repo, or here: https://github.com/Sussex-Psychology-Software-Team/online-experiments/tree/main/Qualtrics
        - jsPsych integration: https://github.com/Sussex-Psychology-Software-Team/online-experiments/tree/main/Qualtrics#tutorial-on-running-jspsych-in-qualtrics
- Testable: https://www.testable.org/
- Millisecond: https://www.millisecond.com/
- PsiTurk: https://psiturk.org/
- Pushkin: https://pushkin-consortium.github.io/pushkin/4.1/
- Finding Five: https://www.findingfive.com/
- Labvanced: https://www.labvanced.com/
- Concerto: https://concertoplatform.com/about
- Experimaker: https://experimaker.com/
- ExpFactory: https://expfactory.github.io/
- SoSci: https://www.soscisurvey.de/
- OpenLab: https://open-lab.online/ for Lab.js specifically

### Free Server Spaces
There are two main options that are server spaces you can use to deploy your studies as actual websites outside of an experiment hosting platform - although note you don't get the useful participant and data management features offered by experiment hosting websites. See section below.
- GitHub Pages
    - GitHub is a free-to-use code repository - a place to put your code online. They also offer a free place to deploy/host websites through GitHub pages, where you can put your coded experiments.
- University Server Spaces
    - Sussex: Setup your own server space: https://www.sussex.ac.uk/its/help/faq?faqid=145, and you can use an STFP software like FileZilla to drop files into your server space (with public read and execute 'permissions') to allow them to be accessed online.
        § A tutorial on setting up jsPsych with a web server can be found here: https://sites.psu.edu/korean/experiments/jspsych/
    - Edinburgh: https://www.ed.ac.uk/information-services/computing/audio-visual-multi-media/web-hosting/hosting-service-options

### Note on the Front and Back End
One thing to keep in mind about how all this works is the difference between something that happens on your participant's computer ('the front end') and things that you want to happen outside of this (on 'the back end'). If you want to counterbalance participants between conditions, keep track of responses over multiple days, send emails, or save participant data automatically, this all takes place outside of your experimental tasks and surveys. Most survey/experiment-specific hosting sites handle some of these issues, and Qualtrics is particularly good option, although again there are other options, including doing things by hand. If launching on GitHub pages or an actual Server Space, you may have to handle some of this yourself.

## Collecting data
Before you start collecting data, you need to send it over the web to be stored somewhere. Experiment hosting websites will handle this for you, although saving data from your own code requires a little extra work to tell it what to save and when. Most places you can store things (Box, DropBox, OSF, etc.) have JavaScript APIs (i.e. code to interact with them and their servers) you can use to send data directly to them, although these are likely to be tricky to use. DataPipe is the easiest option here, and allows you to send data directly to OSF using a small bit of JavaScript https://pipe.jspsych.org/getting-started. If you have access to a university server space you could also do this by hand in PHP, and this jsPsych tutorial is a good intro on how to do so: https://www.jspsych.org/v7/overview/data/#storing-data-permanently-as-a-file (see also https://kywch.github.io/jsPsych-in-Qualtrics/save-php/).

## Recruitment
You can recruit participants for your study at the following places:
- Prolific - https://www.prolific.com
    - Platform integration guides: https://researcher-help.prolific.com/hc/en-gb/articles/4408441191698-Survey-software-integration-guides
- Sona: Student study credits platform used by the University of Sussex
- Mturk - https://www.mturk.com
- Many of the experiment hosting sites listed above also provide recruitment opportunities
- Look for JISCMail psychology email lists that might let you advertise your study
- Social Media: topic-specific forums are often the most fruitful place to post (often best to ask permission first), but there are even pages and groups designed for advertising studies, such as reddit.com/r/SampleSize and various Twitter accounts.

## Other resources:
- https://kennysmithed.github.io/oels2022/oels_wk11.html
- Webcam-based Eye-tracking: https://www.realeye.io/use-cases
