let quesQuan = 20;
let ListIndx = [];
for(let time = 0; time < quesQuan; time++) {
    let stateIndx = true;
    let indx = Math.ceil(Math.random()*200);

    ListIndx.forEach(element=>{
        if(indx == element) {
            stateIndx = false;
            time--;
        }
    })
    if(stateIndx) {
        ListIndx.push(indx);
    }
}

var ListQues = [];
ListIndx.forEach(element => {
    sqlReq.query(`
        SELECT a.context
    `)
})
console.log(`[${ListIndx.sort(function(a, b){return a - b})}]: ${ListIndx.length} elements`);