const instructions = document.getElementById('instructions')
const stimuli = document.getElementById('stimuli')
const left = document.getElementById('left')
const right = document.getElementById('right')
const lctx = left.getContext('2d')
const rctx = right.getContext('2d')

document.addEventListener('keydown', keyboardListener)

function keyboardListener(e){
    if(e.key===" " && instructions.hidden===false){
        instructions.hidden = true
        stimuli.hidden = false
    } else if(e.key==="ArrowLeft"){
        left.style.backgroundColor = 'blue'
        right.style.backgroundColor = 'black'
        document.removeEventListener('keydown', keyboardListener)
    } else if(e.key==="ArrowRight"){
        right.style.backgroundColor = 'blue'
        left.style.backgroundColor = 'black'
        document.removeEventListener('keydown', keyboardListener)
    }
    setTimeout(resetBackgroundColour, 1000)
}

function resetBackgroundColour(){
    right.style.backgroundColor = 'black'
    left.style.backgroundColor = 'black'
    setTimeout(drawStimuliRandomSide, 1000)
}

// DRAW DOTS STIMULUS FUNCTION
function shuffle(array) {
    //https://stackoverflow.com/a/12646864
    for (let i = array.length - 1; i > 0; i--) { // loop through array backwards
        const j = Math.floor(Math.random() * (i + 1)); // random number from 0 to the length of the array
        [array[i], array[j]] = [array[j], array[i]]; // swap the numbers at the current and random index
    }
}

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

const grid_size = 25
let intervalId;

function drawDots(ctx, n_dots){
    // stimuli parameters
    const cell_size = left.height/grid_size
    const offset = cell_size/2
    const dot_size = cell_size*.3
    ctx.fillStyle = 'white'

    const n_cells = grid_size**2
    //const n_dots = Math.ceil(n_cells/2)

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

    setTimeout(clearCanvas, 1000)
}

function drawStimuliRandomSide(){
    const half_full = Math.round((grid_size**2)/2)
    let target, distractor
    if(Math.random() >= 0.5){
        target = lctx
        distractor = rctx
    } else {
        target = rctx
        distractor = lctx
    }

    drawDots(target, half_full+70)
    drawDots(distractor, half_full)
}

function clearCanvas(){
    lctx.clearRect(0, 0, left.width, left.height)
    rctx.clearRect(0, 0, right.width, right.height)
    document.addEventListener('keydown', keyboardListener)
}


