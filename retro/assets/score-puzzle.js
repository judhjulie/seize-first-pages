/* Two joined eighth notes, encoded as a uniquely solvable 15 × 15 nonogram. */
(function(root){
 const pattern=[
  '...............',
  '......########.',
  '......########.',
  '......#......#.',
  '......#......#.',
  '......#......#.',
  '......#......#.',
  '......#......#.',
  '......#......#.',
  '......#......#.',
  '...#####..#####',
  '..######.######',
  '..######.######',
  '...####...####.',
  '....##.....##..'
 ];
 const size=15;
 const solution=pattern.flatMap(row=>[...row].map(cell=>cell==='#'?1:0));
 function runs(values){let n=0;const clue=[];for(const value of [...values,0]){if(value)n++;else if(n){clue.push(n);n=0}}return clue.length?clue:[0]}
 const rowClues=pattern.map(row=>runs([...row].map(cell=>cell==='#'?1:0)));
 const columnClues=Array.from({length:size},(_,column)=>runs(pattern.map(row=>row[column]==='#'?1:0)));
 const filledCount=solution.reduce((sum,cell)=>sum+cell,0);
 function isSolved(state){return state.length===solution.length&&solution.every((cell,index)=>(state[index]===1?1:0)===cell)}
 function lineCorrect(state,index,axis){return Array.from({length:size},(_,n)=>axis==='row'?index*size+n:n*size+index).every(cell=>(state[cell]===1?1:0)===solution[cell])}
 function hintRow(state){for(let row=0;row<size;row++){if(!lineCorrect(state,row,'row')){const next=Array.from(state);for(let column=0;column<size;column++)next[row*size+column]=solution[row*size+column]?1:2;return {row,state:next}}}return null}
 const api={size,pattern,solution,rowClues,columnClues,filledCount,runs,isSolved,lineCorrect,hintRow};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 root.SeizeScorePuzzle=api;
})(typeof window!=='undefined'?window:globalThis);
