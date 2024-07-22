// Lab.js ---------------- NOTE: run this whole script on 'run' event
const ds = this.options.datastore

//store data at end of test and reset back to normal styling

function saveLabJsData(){
    for(let i=0;i<data.length;i++){ // Assumes you've stored your data in 'data' and is array of objects
        ds.commit(data[i]) // Commit each field in data to a separate column in lab.js data file
    }
}

function resetLabJs(){
    document.querySelector('button[type="submit"][form="page-form"]').style.display = 'block'; //show next button if hidden
    document.getElementById('blankBackground').remove() //remove our main div
    return
}