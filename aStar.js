var goalState = new Array(16);
var currentState = new Array(16);
var check = 0;
var first = 0;
var goalState = [0, 1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15];
var childState = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var state = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
function getGoalState(initState) {  // no need to pass in global
  var i, j, total=0;
  var goalStateGanjil = [1, 2, 3, 8, 10, 14, 15, 0, 4, 7, 6, 5,9,11,12,13];
  var goalStateGenap = [0, 1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15];
  for (i=0; i<15; i++) {
    for (j=i+1; j<16; j++) {
      if(initState[j]<initState[i] && initState[j]!=0) {
        total += 1;
      }
    }
  }  // end for-loop i
  if (total%2 == 1) {
    for (i=0; i<16; i++) {
      goalState[i] = goalStateGanjil[i];
    }
  }
  else {
    for (i=0; i<16; i++) {
      goalState[i] = goalStateGenap[i];
    }
  }
}  // getGoalState
function printState(state) {  // modified
  console.log(check);
}  // printState
function copyState(from, to) {
  for (var i=0; i<16; i++) {
    to[i] = from[i];
  }
}  // copyState
function sameState(cState, gState) {
  for (var i=0; i<16; i++) {
    if (cState[i] != gState[i]) {
      return false;
      // no need a break - unreachable statement
    }
  }
  return true;
}  // sameState
function getKotakKosong(state) {
  var index = 0;
  for (var i=0; i<16; i++) {
    if (state[i]==0) {
      index = i;
    }
  }
  return index;
}  // getKotakKosong
function moveUp(state) {
  var index = getKotakKosong(state);
  if (index>3) {
    state[index] = state[index-4];
    // the line below will ALWAYS be 0, are you sure????
    // don't you want to save previous value first????
    state[index-4] = state[index-4] - state[index];
  }
}  // moveUp
function moveDown(state) {
  var index = getKotakKosong(state);
  if (index<12) {
    state[index] = state[index+4];
    // the line below will ALWAYS be 0, are you sure????
    // don't you want to save previous value first????
    state[index+4] = state[index+4] - state[index];
  }
} // moveDown
function moveLeft(state) {
  var index = getKotakKosong(state);
  if (index%4 > 0) {
    state[index] = state[index-1];
    // the line below will ALWAYS be 0, are you sure????
    // don't you want to save previous value first????
    state[index-1] = state[index-1] - state[index];
  }
} // moveLeft
function moveRight(state) {
  var index = getKotakKosong(state);
  if (index!=3 || index!=7 || index!=11 ||  index!=15) {
    state[index] = state[index+1];
    // the line below will ALWAYS be 0, are you sure????
    // don't you want to save previous value first????
    state[index+1] = state[index+1] - state[index];
  }
}  // moveRight
function matchTile(cState, gState) {
  var match = 0;
  for (var i=0; i<16; i++) {
    if (cState[i]!=0 && cState[i]==gState[i]) {
      match += 1;
    }
  }
  return match;
}  // matchTile
function matchTile(cState, gState) {
  var match = 0;
  for (var i=0; i<16; i++) {
    if (cState[i]!=0 && cState[i]==gState[i]) {
      match += 1;
    }
	
  }
  return match;
}  // matchTile
function getTheBestMove(h) {
  var index = 0;
  var max = h[0];
  for (var i=0; i<4; i++) {
    if (h[i]>max) {
      max = h[i];
      index = i;
    }
  }
  return index;
}  // getTheBestMove

function aStar(state) {
  var initialState =state.slice();
//  getGoalState(initialState);
  console.log("Init State\n--------");
  printState(initialState);
  console.log("Goal State\n--------");
  printState(goalState);
  console.log("Searching\n--------");
  copyState(initialState, currentState);
  var level = 0;
  var t = Date.now()
  while (!sameState(currentState, goalState) && level<1000) {
    printState(currentState);
    copyState(currentState, childState);
    var heuristic = [0, 0, 0, 0];
    level += 1;
    moveUp(childState);
    if (!sameState(childState, currentState)) {
      heuristic[0] = matchTile(childState, goalState) + level;
      moveDown(childState);
    }
    moveDown(childState);
    if (!sameState(childState, currentState)) {
      heuristic[1] = matchTile(childState, goalState) + level;
      moveUp(childState);
    }
    moveLeft(childState);
    if (!sameState(childState, currentState)) {
      heuristic[2] = matchTile(childState, goalState) + level;
      moveRight(childState);
    }
    moveRight(childState);
    if (!sameState(childState, currentState)) {
      heuristic[3] = matchTile(childState, goalState) + level;
      moveLeft(childState);
    }
    switch(getTheBestMove(heuristic)) {
      case 0 : moveUp(currentState); check = -4;break;
      case 1 : moveDown(currentState);check = 4; break;
      case 2 : moveLeft(currentState); check = -1;break;
      case 3 : moveRight(currentState);check = 1; break;
    }
	
	if(level == 1)
		first = check;
  }  // while(!sameState)
//  printState(currentState);
 // t = Date.now() - t;
 // console.log("Sovled with "+level+" steps, "+(t/1000)+" seconds...");
}  //

