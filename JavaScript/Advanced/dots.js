// Change the .js file in experiment.html to this one to run.

// GLOBAL VARIABLES -----------------------------
const instructions = document.getElementById('instructions')
const stimuli = document.getElementById('stimuli')
const left = document.getElementById('left')
const right = document.getElementById('right')
const lctx = left.getContext('2d')
const rctx = right.getContext('2d')

let targetSide = []
let trialN = -1
let data = []
let trialStartTime

const grid_size = 25

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

function dotArray(n_cells, n_dots){
    const on_off = []
    for(let d=0; d<n_cells; d++){
        if(d<=n_dots){
            on_off.push(1)
        } else {
            on_off.push(0)
        }
    }
    shuffle(on_off)
    return on_off
}

function drawDots(ctx, n_dots){
    // stimuli parameters
    const cell_size = left.height/grid_size
    const offset = cell_size/2
    const dot_size = cell_size*.3
    ctx.fillStyle = 'white'

    const n_cells = grid_size**2
    
    const on_off = dotArray(n_cells, n_dots)
    // drawDots
    let dot_n = 0;
    for(let x=0; x<left.height; x+=cell_size){
        for(let y=0; y<left.height; y+=cell_size){
            if(on_off[dot_n]){
                ctx.beginPath()
                ctx.arc(x+offset, y+offset, dot_size, 0, Math.PI*2)
                ctx.fill()
            }
            dot_n++
        }
    }
    setTimeout(clearDots, 500)
}

function clearDots(){
    lctx.clearRect(0, 0, left.width, left.height)
    rctx.clearRect(0, 0, right.width, right.height)
    document.addEventListener('keydown', keyboardListener)
}

// TRIAL DEFINITION -----------------------------
function runNextTrial(){
    trialN = trialN+1
    if(trialN<targetSide.length){
        makeBoxBackgroundsBlack()
        drawStimuli()
        trialStartTime = performance.now()
    } else {
        endExperiment()
    }
}

function makeBoxBackgroundsBlack(){
    left.style.backgroundColor = 'black'
    right.style.backgroundColor = 'black'
}

function drawStimuli(){
    const target = targetSide[trialN]
    let targetCtx, distractorCtx
    if(target === 'left'){
        targetCtx = lctx
        distractorCtx = rctx
    } else if(target === 'right'){
        targetCtx = rctx
        distractorCtx = lctx
    }
    const half_full = Math.round((grid_size**2)/2)
    drawDots(targetCtx, Math.round(half_full*1.25)) //1/4 more dots
    drawDots(distractorCtx, half_full) // half full
}



function endExperiment(){
    const jsonData = createDataPipeObject()
    sendData(jsonData)

    stimuli.hidden = true
    instructions.innerHTML = 'The experiment is now over'
    instructions.hidden = false
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

// SEND DATA -----------------------------
function makeRandomID(length){
    const characters = "abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomID = ''
    for (let i=0; i<length; i++) {
        randomID += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    
    return randomID;
}

function createDataPipeObject(){
    const randomID = makeRandomID(24);

    const dataPipe = {
        experimentID: "HHEGFC9Vw1tN",
        filename: randomID + ".json",
        data: JSON.stringify(data)
    }

    const jsonData = JSON.stringify(dataPipe)

    return jsonData
}


function sendData(jsonData){
    fetch("https://pipe.jspsych.org/api/data/", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: jsonData,
    })
}