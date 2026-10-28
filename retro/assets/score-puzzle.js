/* A five-by-five swap puzzle for the lost score. */
(function(root){
 const size=5;
 const count=size*size;
 const solved=Array.from({length:count},(_,index)=>index);
 function isValid(state){return Array.isArray(state)&&state.length===count&&state.every(value=>Number.isInteger(value)&&value>=0&&value<count)&&new Set(state).size===count}
 function isSolved(state){return isValid(state)&&state.every((value,index)=>value===index)}
 function swap(state,a,b){if(!isValid(state)||a<0||b<0||a>=count||b>=count)return state;const next=state.slice();[next[a],next[b]]=[next[b],next[a]];return next}
 function shuffle(random=Math.random){
  let state;
  for(let attempt=0;attempt<5;attempt++){
   state=solved.slice();
   for(let index=count-1;index>0;index--){const other=Math.floor(random()*(index+1));[state[index],state[other]]=[state[other],state[index]]}
   if(state.filter((tile,index)=>tile!==index).length>=15)return state;
  }
  return solved.map((_,index)=>(index+7)%count);
 }
 function hint(state){if(!isValid(state))return null;const target=state.findIndex((tile,index)=>tile!==index);if(target<0)return null;return {target,state:swap(state,target,state.indexOf(target))}}
 const api={size,count,solved,isValid,isSolved,swap,shuffle,hint};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;
 root.SeizeScorePuzzle=api;
})(typeof window!=='undefined'?window:globalThis);
