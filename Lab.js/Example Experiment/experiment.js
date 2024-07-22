// Lab.js Code --------------------------
const ds = this.options.datastore

function saveLabJsData(){
    for(let i=0;i<data.length;i++){ // Data is array of objects
      ds.commit(data[i]) // Commit each field in data to a separate column in lab.js data file
  }
}

function resetLabJs(){
  // Call this in the endExperiment() function.
  document.getElementById('blankBackground').remove()
}

function endExperiment(){
    saveLabJsData()
    resetLabJs()
}

// -------------------------------------
// Below is same as original JavaScript version except no dataPipe sending, and see endExperiment() above....
// GLOBAL VARIABLES -----------------------------
const instructions = document.getElementById('instructions')
const stimuli = document.getElementById('stimuli')
const left = document.getElementById('left')
const right = document.getElementById('right')
let targetSide = []
let trialN = -1
let data = []
let trialStartTime

// USER INPUT -----------------------------
document.addEventListener('keydown', keyboardListener)

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


// STIMULI DEFINITION -----------------------------
function shuffle(array) {
    // Shuffle array
    //https://stackoverflow.com/a/12646864
    for (let i = array.length - 1; i > 0; i--) { // loop through array backwards
        const j = Math.floor(Math.random() * (i + 1)); // random number from 0 to the length of the array
        [array[i], array[j]] = [array[j], array[i]]; // swap the numbers at the current and random index
    }
}

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

stimArray()

// TRIAL DEFINITION -----------------------------
function runNextTrial(){
    trialN = trialN+1
    if(trialN<targetSide.length){
        changeStimuliColour()
        document.addEventListener('keydown', keyboardListener)
        trialStartTime = performance.now()
    } else {
        endExperiment()
    }
}

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

// SAVE DATA -----------------------------
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