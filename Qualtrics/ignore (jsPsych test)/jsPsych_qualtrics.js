Qualtrics.SurveyEngine.addOnload(function()
{
    // Qualtrics-specific code-section -------------
    // add blankBackground as first element under body
    const blankBackground = document.getElementById("blankBackground") // Grab reference to our container div
    document.body.insertBefore(blankBackground, document.body.firstChild) // Insert it as the first element at the start of page's <body>

    //hide next button
    const nextButton = document.getElementById('NextButton') // Qualtrics gives the next button element the id 'NextButton'
    nextButton.hidden = true // Set the HTML hidden attribute, to be removed at the end of the study.

    // // Load script tags in this context
    // function loadScripts(){
    //     const scripts = ["https://unpkg.com/jspsych@7.3.4",
    //     "https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.3",
    //     "https://unpkg.com/@jspsych/plugin-image-keyboard-response@2.0.0",
    //     "https://unpkg.com/@jspsych/plugin-preload@2.0.0"]

    //     let script

    //     for(let i=0; i<scripts.length; i++){
    //         script = document.createElement('script')
    //         script.setAttribute('src',scripts[i])
    //         document.head.appendChild(script)
    //     }
    // }

    // loadScripts()

    // Rest of code below --------------------------
    // initialize jsPsych
    var jsPsych = initJsPsych({
        display_element: 'blankBackground',
        on_finish: function() {
            jsPsych.data.displayData();
        }
    });

    // create timeline
    var timeline = [];

    // preload images
    var preload = {
        type: jsPsychPreload,
        images: ['https://universityofsussex.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Fc9eck43a4Z7tJb', 'https://universityofsussex.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_44Yck542aOrSSan']
    };
    timeline.push(preload);

    // define welcome message trial
    var welcome = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: "Welcome to the experiment. Press any key to begin."
    };
    timeline.push(welcome);

    // define instructions trial
    var instructions = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `
            <p>In this experiment, a circle will appear in the center 
            of the screen.</p><p>If the circle is <strong>blue</strong>, 
            press the letter F on the keyboard as fast as you can.</p>
            <p>If the circle is <strong>orange</strong>, press the letter J 
            as fast as you can.</p>
            <div style='width: 700px;'>
            <div style='float: left;'><img src='img/blue.png'></img>
            <p class='small'><strong>Press the F key</strong></p></div>
            <div style='float: right;'><img src='img/orange.png'></img>
            <p class='small'><strong>Press the J key</strong></p></div>
            </div>
            <p>Press any key to begin.</p>
        `,
        post_trial_gap: 2000
    };
    timeline.push(instructions);

    // define trial stimuli array for timeline variables
    var test_stimuli = [
        { stimulus: "https://universityofsussex.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_Fc9eck43a4Z7tJb",  correct_response: 'f'},
        { stimulus: "https://universityofsussex.eu.qualtrics.com/ControlPanel/Graphic.php?IM=IM_44Yck542aOrSSan",  correct_response: 'j'}
    ];

    // define fixation and test trials
    var fixation = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div style="font-size:60px;">+</div>',
        choices: "NO_KEYS",
        trial_duration: function(){
            return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
        },
        data: {
            task: 'fixation'
        }
    };

    var test = {
        type: jsPsychImageKeyboardResponse,
        stimulus: jsPsych.timelineVariable('stimulus'),
        choices: ['f', 'j'],
        data: {
            task: 'response',
            correct_response: jsPsych.timelineVariable('correct_response')
        },
        on_finish: function(data){
            data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
        }
    };

    // define test procedure
    var test_procedure = {
        timeline: [fixation, test],
        timeline_variables: test_stimuli,
        repetitions: 5,
        randomize_order: true
    };
    timeline.push(test_procedure);

    // define debrief
    var debrief_block = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function() {
            var trials = jsPsych.data.get().filter({task: 'response'});
            var correct_trials = trials.filter({correct: true});
            var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
            var rt = Math.round(correct_trials.select('rt').mean());

            return `<p>You responded correctly on ${accuracy}% of the trials.</p>
            <p>Your average response time was ${rt}ms.</p>
            <p>Press any key to complete the experiment. Thank you!</p>`;
        }
    };
    timeline.push(debrief_block);

    // start the experiment
    jsPsych.run(timeline);
});

Qualtrics.SurveyEngine.addOnReady(function(){})
Qualtrics.SurveyEngine.addOnUnload(function(){})