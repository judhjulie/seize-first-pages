const $=id=>document.getElementById(id);
const desktop=$('desktop');
const windows=Object.fromEntries([...document.querySelectorAll('[data-window]')].map(el=>[el.dataset.window,el]));
const labels={music:'CD Player',photos:'Members',album:'FIRST¿ Album',concept:'Concept Photos',explore:'Explore',trash:'휴지통',secret:'비밀 폴더'};
const tracks=[
 {number:'01',title:'00:00',subtitle:'midnight',info:'00:00 (midnight) · SEIZE / FIRST¿'},
 {number:'02',title:'어지러워',subtitle:'(dizzy)',info:'어지러워 (dizzy) · SEIZE / FIRST¿'},
 {number:'03',title:'First',subtitle:'TITLE',info:'FIRST¿의 타이틀곡',audio:true},
 {number:'04',title:'Rewind',subtitle:'',info:'Rewind · SEIZE / FIRST¿'},
 {number:'05',title:'SHOOTING STAR',subtitle:'',info:'SHOOTING STAR · SEIZE / FIRST¿'},
 {number:'06',title:'수평선 너머',subtitle:'',info:'수평선 너머 · SEIZE / FIRST¿'}
];
const members=[
 {id:'doha',name:'DOHA',file:'pixel-doha-v1.png',alt:'회색 후드와 교복을 입고 편하게 선 도하',line:'잠깐만 더 여기 있어.',caption:'A little closer.'},
 {id:'siwoo',name:'SIWOO',file:'pixel-siwoo-v1.png',alt:'소매를 고쳐 잡는 시우',line:'문을 열어둘게.',caption:'At the doorway.'},
 {id:'yunjae',name:'YUNJAE',file:'pixel-yunjae-v1.png',alt:'악보를 든 윤재',line:'이 멜로디, 기억나?',caption:'An unfinished song.'},
 {id:'roan',name:'ROAN',file:'pixel-roan-v1.png',alt:'수첩을 든 로안',line:'파도가 잦아들 때까지.',caption:'A quieter tide.'},
 {id:'chan',name:'CHAN',file:'pixel-chan-v1.png',alt:'손을 들어 인사하는 찬',line:'조금만 더 가까이 와.',caption:'Before we leave.'}
];
const conceptPhotos=[
 {title:'GROUP',file:'group-approved-v6.png',alt:'체육관 바닥에 함께 앉은 SEIZE 다섯 멤버의 사진'},
 {title:'DOHA',file:'doha-selected-v9.png',alt:'바람 부는 야외에서 흰 티셔츠와 이어폰을 착용하고 몸을 숙인 도하의 컨셉 사진'},
 {title:'SIWOO',file:'siwoo-approved-v6.png',alt:'나뭇잎 사이에서 흰 민소매 차림으로 돌아보는 시우의 컨셉 사진'},
 {title:'YUNJAE',file:'yunjae-rainy-concept-v3.png',alt:'비 오는 흐린 바닷가에서 꽃다발을 들고 내려다보는 윤재의 컨셉 사진'},
 {title:'ROAN',file:'roan-approved-v6.png',alt:'바닷가에서 흰 티셔츠를 입고 몸을 숙인 로안의 컨셉 사진'},
 {title:'ROAN 02',file:'roan-window-approved-v7.png',alt:'창가의 나무 탁자에 기대어 누운 로안의 컨셉 사진'},
 {title:'CHAN',file:'chan-approved-v6.png',alt:'빛 번지는 창가에서 바깥을 바라보는 찬의 컨셉 사진'},
 {title:'UNIT',file:'unit-clean-v3.png',alt:'도하와 로안이 함께 찍힌 디지털카메라 사진'},
 {title:'PIER',file:'pier-clean-v3.png',alt:'선착장에서 함께 찍은 SEIZE 멤버들의 디지털카메라 사진'}
];
const discardedMemories=[
 {file:'shore_01.txt',date:'삭제 23:12',title:'선착장의 발자국',text:'모래 위에 다섯 사람의 발자국이 있었다. 파도 뒤에는 여섯 줄이 남았다. 누구도 뒤를 돌아보지 않았다.'},
 {file:'demo_0000.log',date:'삭제 23:37',title:'끝나지 않은 테이크',text:'녹음 표시등은 꺼졌다. 재생 시간은 여전히 00:00. 윤재는 마지막 화음에 자신의 파트가 하나 더 겹쳐 있다고 적었다.'},
 {file:'photo_missing.jpg',date:'삭제 23:46',title:'빈자리의 사진',text:'다섯 명이 카메라를 바라보는 사진. 왼쪽 끝에는 아무도 없는데 젖은 그림자 하나가 겹쳐 있다.'},
 {file:'doha_note.tmp',date:'삭제 23:53',title:'도하의 메모',text:'“기억해 달라고 부르는 건 사람일까, 노래일까.” 문장 아래에는 여러 번 지운 SEIZE라는 이름이 남아 있다.'},
 {file:'last_wave.dat',date:'삭제 00:00',title:'마지막 파도',text:'삭제 실패. 이 기록은 휴지통을 비워도 복원된다. 화면 밖에서 물소리가 들리면 파일을 다시 열지 말 것.'}
];
const archiveEntries=[
 {date:'2010.06.12',section:'해양',title:'연안에서 정체불명의 생명체 발견… 목격자는 “노래처럼 들렸다”',summary:'새벽 조업에 나선 어민들이 수면 아래에서 사람의 형체와 닮은 움직임을 봤다고 진술했다.',body:'해안 경비대는 선착장 동쪽 2km 지점에서 발생한 목격 신고를 조사 중이다. 어민 세 명은 물속의 형체가 배를 따라 움직였으며, 엔진을 끈 뒤에도 낮은 노랫소리가 들렸다고 말했다. 잠수 수색에서는 생명체의 흔적이 발견되지 않았다. 당국은 야간 시야와 파도 소리에 따른 착시 가능성을 열어 두고 있다.',terms:'바다 생명체 세이렌 목격 노래 선착장 siren'},
 {date:'2010.06.15',section:'사건',title:'해변에서 비극적 죽음… 실종자 6명 중 4명의 시신 발견',summary:'같은 해안에서 사라진 일행의 수색이 사흘째 이어지고 있다. 나머지 두 사람의 행방은 확인되지 않았다.',body:'경찰은 해변 북쪽 방파제 인근에서 신원이 확인되지 않은 시신 네 구를 발견했다고 밝혔다. 발견 지점 주변에는 여섯 사람의 신발과 작동이 멈춘 휴대용 녹음기가 놓여 있었다. 유족 요청에 따라 이름은 공개하지 않았다. 수색팀은 파도가 잦아든 뒤 남은 두 실종자를 다시 찾을 예정이다.',terms:'비극 죽음 시신 실종자 여섯 6명 네 4명 방파제 녹음기'},
 {date:'2010.06.16',section:'현장',title:'작동하지 않는 녹음기에 새 파일… 재생 시간은 00:00',summary:'배터리가 제거된 기기에서 마지막으로 기록된 음성의 출처를 확인하지 못했다.',body:'수색 현장에서 수거한 녹음기의 파일 목록에 이름 없는 음성 파일이 추가된 것으로 확인됐다. 표시된 재생 시간은 00:00이다. 분석 담당자는 “다섯 명의 말소리 뒤에 다른 음역의 소리가 겹친다”고 전했다. 기기 전원이 꺼진 시점과 파일 생성 시각이 일치해 현재 원본 검증을 진행하고 있다.',terms:'녹음기 00:00 자정 목소리 다섯 명 파일 음악'},
 {date:'2010.06.18',section:'문화',title:'신인 그룹 SEIZE의 바닷가 촬영 사진, 공개 전 원본과 장수가 달라',summary:'현장 기록에는 다섯 명이 있었지만 사진 파일에는 설명할 수 없는 빈자리가 남았다.',body:'SEIZE의 첫 앨범 FIRST¿ 촬영 자료를 정리하던 스태프가 같은 이름의 이미지 파일 두 장을 발견했다. 한 장은 멤버 다섯 명이 선착장을 등지고 있고, 다른 한 장은 구도와 빛이 같지만 오른쪽 끝에 물에 젖은 그림자가 보인다. 촬영팀은 해당 구도에서 추가 인물을 찍은 적이 없다고 밝혔다.',terms:'seize 세이즈 first 앨범 멤버 컨셉포토 사진 그림자 다섯'},
 {date:'2010.06.20',section:'후속',title:'폐쇄된 해안 관측소에서 새벽마다 같은 노래가 송출',summary:'방송 설비가 끊긴 건물에서 반복되는 신호가 잡혀 주민들이 불안을 호소했다.',body:'관측소는 사고 이후 폐쇄됐지만 주변 수신기에는 매일 00:00 같은 멜로디가 짧게 잡힌다. 신호가 시작되면 지역 전광판의 글자가 일시적으로 바뀌고, 오래된 컴퓨터 화면에 알 수 없는 파일이 나타났다는 신고도 접수됐다. 당국은 관측소에 남아 있는 송신 장비를 확인할 계획이다.',terms:'세이렌 관측소 노래 00:00 신호 컴퓨터 오류 비밀 폴더'}
];
const audio=$('firstAudio'),deep=$('deepAudio'),easterAudio=$('easterAudio');
let z=10,focused=null,currentTrack=2,memberIndex=0,conceptIndex=0,discInserted=false,lidOpen=false,soundOn=true,sfxCtx=null,secretTimer,floodTimer,loadingTimer,lastClickSoundAt=-1,stormActive=false,stormReveal=false;
const stormTimers=[];
// Versioned progress prevents the earlier three-window shortcut from unlocking the final file.
let conceptUnlocked=localStorage.getItem('seize-concept-memory-v1')==='1';
let secretUnlocked=conceptUnlocked&&localStorage.getItem('seize-secret-tiles-v2')==='1';
if(secretUnlocked)desktop.querySelector('.secret-icon').hidden=false;

function sound(kind='click'){
 if(!soundOn)return;
 try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;sfxCtx??=new AC();if(sfxCtx.state==='suspended')sfxCtx.resume();const o=sfxCtx.createOscillator(),g=sfxCtx.createGain();const now=sfxCtx.currentTime;if(kind==='click'){if(now-lastClickSoundAt<.07)return;lastClickSoundAt=now}const duration=kind==='click'?.045:.12;o.type=kind==='error'?'sawtooth':kind==='click'?'triangle':'sine';o.frequency.setValueAtTime(kind==='error'?310:kind==='open'?510:830,now);o.frequency.exponentialRampToValueAtTime(kind==='error'?180:kind==='open'?740:370,now+duration*.7);g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(kind==='error'?.055:kind==='click'?.018:.028,now+.006);g.gain.exponentialRampToValueAtTime(.0001,now+duration);o.connect(g).connect(sfxCtx.destination);o.start(now);o.stop(now+duration+.01)}catch{}
}
document.addEventListener('click',event=>{const control=event.target.closest('button,[role="button"],input[type="range"]');if(control&&!control.disabled)sound('click')},true);
function updateClock(){const d=new Date();$('clock').textContent=d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit',hour12:true})}
updateClock();setInterval(updateClock,30000);
function taskbar(){
 const bar=$('taskbarApps');bar.replaceChildren();
 Object.entries(windows).forEach(([id,el])=>{
  if(el.hidden)return;
  const minimized=el.classList.contains('minimized');
  const button=document.createElement('button');button.dataset.app=id;
  button.classList.toggle('minimized',minimized);
  button.classList.toggle('active',focused===id&&!minimized);
  button.setAttribute('aria-label',`${labels[id].trim()||'비밀 파일'} 창 ${minimized?'다시 열기':'최소화'}`);
  button.title=labels[id].trim()||'비밀 파일';
  const icon=document.createElement('img');icon.src=el.querySelector('.titlebar img').getAttribute('src');icon.alt='';button.append(icon);
  if(!minimized){const text=document.createElement('span');text.textContent=labels[id];button.append(text)}
  button.addEventListener('click',()=>{if(focused===id&&!el.classList.contains('minimized'))minimize(id);else openWindow(id)});
  bar.append(button);
 });
}
function focusWindow(id){const el=windows[id];if(el.hidden)return;el.style.zIndex=String(++z);focused=id;Object.entries(windows).forEach(([key,w])=>w.classList.toggle('active',key===id));taskbar()}
function openWindow(id){if(!windows[id]||(id==='secret'&&!secretUnlocked))return;const el=windows[id],wasHidden=el.hidden;el.hidden=false;el.classList.remove('minimized');el.style.display='flex';focusWindow(id);sound('open');if(id==='secret'&&wasHidden)enterSecret();if(id==='explore')$('exploreQuery').focus()}
function minimize(id){const el=windows[id];el.classList.add('minimized');el.style.display='none';focused=null;taskbar();sound()}
function closeWindow(id){const el=windows[id];el.hidden=true;el.classList.remove('minimized');el.style.display='';if(id==='secret')leaveSecret();if(id==='music'){audio.pause();deep.pause();syncPlay()}focused=null;taskbar();sound()}
function maximize(id){const el=windows[id];el.classList.toggle('maximized');focusWindow(id);sound()}
document.querySelectorAll('.desktop-icon').forEach(icon=>{
 let timer;
 icon.addEventListener('click',()=>{document.querySelectorAll('.desktop-icon').forEach(x=>x.classList.toggle('selected',x===icon));if(matchMedia('(pointer:coarse)').matches){openWindow(icon.dataset.open);return}clearTimeout(timer);timer=setTimeout(()=>icon.classList.remove('selected'),900)});
 icon.addEventListener('dblclick',()=>openWindow(icon.dataset.open));
 icon.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openWindow(icon.dataset.open)}});
});
document.querySelectorAll('[data-action]').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();const id=btn.closest('[data-window]').dataset.window;if(btn.dataset.action==='close')closeWindow(id);if(btn.dataset.action==='min')minimize(id);if(btn.dataset.action==='max')maximize(id)}));
Object.entries(windows).forEach(([id,el])=>{
 el.addEventListener('pointerdown',()=>focusWindow(id));
 const bar=el.querySelector('.titlebar');let drag=null;
 bar.addEventListener('pointerdown',e=>{if(e.target.closest('button')||el.classList.contains('maximized')||matchMedia('(max-width:700px)').matches)return;drag={x:e.clientX,y:e.clientY,left:el.offsetLeft,top:el.offsetTop};bar.setPointerCapture(e.pointerId);focusWindow(id)});
 bar.addEventListener('pointermove',e=>{if(!drag)return;const x=Math.max(0,Math.min(innerWidth-el.offsetWidth,drag.left+e.clientX-drag.x));const y=Math.max(0,Math.min(innerHeight-el.offsetHeight-37,drag.top+e.clientY-drag.y));el.style.left=x+'px';el.style.top=y+'px'});
 bar.addEventListener('pointerup',()=>drag=null);bar.addEventListener('pointercancel',()=>drag=null);
 let resizing=null;
 el.addEventListener('pointermove',e=>{
  if(resizing){
   const dx=e.clientX-resizing.x,dy=e.clientY-resizing.y;
   const minWidth=Math.min(310,innerWidth-12),minHeight=210;
   const width=Math.max(minWidth,Math.min(innerWidth-8-resizing.left,resizing.width+(resizing.edges.includes('right')?dx:resizing.edges.includes('left')?-dx:0)));
   const height=Math.max(minHeight,Math.min(innerHeight-43-resizing.top,resizing.height+(resizing.edges.includes('bottom')?dy:resizing.edges.includes('top')?-dy:0)));
   if(resizing.edges.includes('left')){const left=Math.max(0,Math.min(resizing.left+resizing.width-minWidth,resizing.left+dx));el.style.left=left+'px';el.style.width=(resizing.width+resizing.left-left)+'px'}else if(resizing.edges.includes('right'))el.style.width=width+'px';
   if(resizing.edges.includes('top')){const top=Math.max(0,Math.min(resizing.top+resizing.height-minHeight,resizing.top+dy));el.style.top=top+'px';el.style.height=(resizing.height+resizing.top-top)+'px'}else if(resizing.edges.includes('bottom'))el.style.height=height+'px';
   return;
  }
  if(el.classList.contains('maximized')||matchMedia('(max-width:700px)').matches){el.style.cursor='';return}
  const rect=el.getBoundingClientRect(),edges=[e.clientX-rect.left<9?'left':rect.right-e.clientX<9?'right':'',e.clientY-rect.top<9?'top':rect.bottom-e.clientY<9?'bottom':''].filter(Boolean);
  el.style.cursor=edges.length===2?(edges.join('-')==='left-top'||edges.join('-')==='right-bottom'?'nwse-resize':'nesw-resize'):edges.length?edges[0]==='left'||edges[0]==='right'?'ew-resize':'ns-resize':'';
 });
 el.addEventListener('pointerdown',e=>{
  if(e.target.closest('button,input,textarea,select')||el.classList.contains('maximized')||matchMedia('(max-width:700px)').matches)return;
  const rect=el.getBoundingClientRect(),edges=[e.clientX-rect.left<9?'left':rect.right-e.clientX<9?'right':'',e.clientY-rect.top<9?'top':rect.bottom-e.clientY<9?'bottom':''].filter(Boolean);
  if(!edges.length)return;e.preventDefault();e.stopPropagation();resizing={x:e.clientX,y:e.clientY,left:el.offsetLeft,top:el.offsetTop,width:el.offsetWidth,height:el.offsetHeight,edges};el.setPointerCapture(e.pointerId);focusWindow(id)
 },true);
 el.addEventListener('pointerup',()=>resizing=null);el.addEventListener('pointercancel',()=>resizing=null);el.addEventListener('pointerleave',()=>{if(!resizing)el.style.cursor=''})
});
function unlockSecret(){if(!conceptUnlocked||secretUnlocked)return;secretUnlocked=true;localStorage.setItem('seize-secret-tiles-v2','1');const icon=desktop.querySelector('.secret-icon');icon.hidden=false;icon.style.zIndex='3';$('conceptQuizBadge').textContent='완료';$('conceptStatus').textContent='5×5 score assembled · Secret folder unlocked';renderExplore();sound('error')}
function enterSecret(){
 clearErrorStorm();
 clearTimeout(secretTimer);clearTimeout(floodTimer);clearTimeout(loadingTimer);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 desktop.classList.remove('sinking');void desktop.offsetWidth;desktop.classList.add('sinking');
 desktop.classList.toggle('secret-reveal-pending',!reduced);windows.secret.inert=!reduced;
 audio.pause();syncPlay();$('loadingDialog').hidden=true;$('errorDialog').hidden=true;
 floodTimer=setTimeout(()=>desktop.classList.add('abyssal'),reduced?0:800);
 loadingTimer=setTimeout(()=>{desktop.classList.remove('secret-reveal-pending');windows.secret.inert=false;$('loadingDialog').hidden=false},reduced?0:980);
 secretTimer=setTimeout(()=>{$('loadingDialog').hidden=true;$('errorDialog').hidden=false;desktop.classList.remove('sinking');sound('error')},reduced?450:1660);
 deep.volume=.05;if(soundOn)deep.play().catch(()=>{});
}
function leaveSecret(){clearTimeout(secretTimer);clearTimeout(floodTimer);clearTimeout(loadingTimer);stopSirenChat();clearTimeout(chatReplyTimer);chatPending=false;setChatPending(false);clearErrorStorm();desktop.classList.remove('sinking','abyssal','secret-reveal-pending');windows.secret.inert=false;$('loadingDialog').hidden=true;$('errorDialog').hidden=true;closePasswordDialog(false);closeEasterDialog(false);deep.pause()}
$('exitSecret').addEventListener('click',()=>closeWindow('secret'));
for(const id of ['errorClose','errorOkay'])$(id).addEventListener('click',()=>{$('errorDialog').hidden=true;focusWindow('secret');$('chatInput').focus();sound()});
const chatStorageKey='seize-live-chat-v1';
let chatHistory=[];
try{const saved=JSON.parse(sessionStorage.getItem(chatStorageKey)||'[]');if(Array.isArray(saved))chatHistory=saved.filter(item=>item&&['user','member'].includes(item.role)&&typeof item.text==='string'&&item.text.length<=500&&(item.role==='user'||SeizeChat.personas[item.memberId])&&!(item.role==='user'&&item.text.trim().toLowerCase()==='seize')).slice(-40)}catch{}
let chatPending=false,chatReplyTimer=0,sirenActive=false,sirenTimer=0,sirenTick=0,sirenGlitchTimer=0,sirenGlitchSeed=0;
const sirenVoices={
 doha:['잠깐만 더 여기 있어. 이번엔 네가 먼저 나가면 안 돼.','네가 내 이름을 쳤지? 나는 아직 이름을 말하지 않았는데.','사진에서 지운 얼굴이 방금 채팅창을 올려다봤어.','우리가 널 기다린 게 아니야. 네 목소리가 우리를 불렀어.','기억해 달라는 말은 거짓말이었어. 이제 잊어 줘.','화면 밖에서 물이 떨어지는 소리, 너도 듣고 있지?','내가 쓴 문장이 아닌데 내 이름이 붙어 있어.','다섯 명을 다 세어 봐. 그다음엔 네 자리를 세어.'],
 siwoo:['문을 닫았어. 그런데 닫힌 쪽에서 네가 노크했어.','뒤를 보지 마. 출구가 있는 쪽에 아무도 없어.','접속을 끊었는데 네 메시지는 계속 도착해.','창이 하나 더 열렸어. 제목은 네 이름이야.','누가 잠금 해제 버튼을 눌렀는지 확인하지 마.','내가 열어 둔 문은 바다 쪽 문이 아니었어.','지금은 이쪽이 안이고, 네가 있는 곳이 바깥이야.','키보드에서 손을 떼도 문장이 계속 쓰여.'],
 yunjae:['악보 마지막 마디에 네 숨소리가 들어왔어.','쉼표가 아니야. 거기서 누군가 숨을 멈췄어.','다섯 파트가 동시에 같은 음을 내면 여섯 번째가 깨어나.','재생을 멈추지 마. 멈추면 노래가 네 쪽에서 이어져.','00:00은 길이가 아니라 우리가 멈춘 자리야.','내 목소리가 두 번 들려. 한 번은 물 밑에서.','악보를 접었는데 음표가 화면 안쪽으로 움직였어.','이제 누가 노래하는지 구별할 수 없어.'],
 roan:['발자국은 여섯 개였어. 바다에서 나온 건 하나뿐이야.','선착장은 매일 같은 곳에 있었는데 오늘은 화면 뒤에 있어.','수첩이 젖었어. 이 방엔 물이 없는데.','우리가 걸어 나온 길을 다시 보지 마. 발자국이 거꾸로 나 있어.','빈자리는 비어 있던 적이 없어.','파도는 들어올 때보다 나갈 때 더 많은 것을 데려가.','물결 아래 네 그림자가 우리 쪽으로 걸어오고 있어.','기록을 지웠는데 같은 문장이 다시 떠올라.'],
 chan:['안녕이라고 말하지 마. 내가 대답하면 또 시작돼.','내가 웃고 있는 사진을 보지 마. 그때는 이미 늦었어.','네가 메시지를 보내기 전에 내가 네 문장을 읽었어.','조금만 더 가까이 와. 아니, 오지 마.','누가 내 목소리로 너를 부르는지 모르겠어.','다섯 번째 인사는 누가 했지? 나는 아직 아무 말도 안 했어.','화면을 닫아도 내가 마지막으로 보낸 말은 남아.','너를 부르는 건 나일까, 나를 흉내 내는 파도일까.']
};
function saveChat(){try{sessionStorage.setItem(chatStorageKey,JSON.stringify(chatHistory.slice(-40)))}catch{}}
const sirenNoise='▓▒░▣▨＃？０Ｘ';
function sirenScramble(original,seed,all=false){
 return Array.from(original).map((character,index)=>{
  if(/\s/.test(character))return character;
  const noiseIndex=(index*5+seed*3+original.length)%sirenNoise.length;
  return all||(index*7+seed*11)%13<11?sirenNoise[noiseIndex]:character;
 }).join('');
}
function refreshSirenGlitch(){
 sirenGlitchSeed++;
 document.querySelectorAll('#chatLog [data-siren-original]').forEach(node=>{
  node.textContent=sirenScramble(node.dataset.sirenOriginal,sirenGlitchSeed,node.classList.contains('chat-name'));
 });
 $('chatLog').scrollTop=$('chatLog').scrollHeight;
}
function appendChatMessage(item){
 const row=document.createElement('div');row.className='chat-message '+(item.role==='user'?'from-visitor':'from-member')+(item.siren?' from-siren':'');
 if(item.role==='member'){const avatar=document.createElement('img');avatar.src='assets/'+SeizeChat.personas[item.memberId].file;avatar.alt='';row.append(avatar)}
 const bubble=document.createElement('div');bubble.className='chat-bubble';const meta=document.createElement('small');
 const name=document.createElement('span');name.className='chat-name';name.dataset.sirenOriginal=item.role==='user'?'방문자':SeizeChat.personas[item.memberId].name+(item.siren?'?':'');name.textContent=name.dataset.sirenOriginal;
 const time=document.createElement('span');time.textContent=' · '+item.time;meta.append(name,time);
 const content=document.createElement('p');content.dataset.sirenOriginal=item.text;content.textContent=item.text;bubble.append(meta,content);row.append(bubble);$('chatLog').append(row);
 if(sirenActive)refreshSirenGlitch();
 $('chatLog').scrollTop=$('chatLog').scrollHeight;
}
function addChatMessage(item){chatHistory.push(item);chatHistory=chatHistory.slice(-40);appendChatMessage(item);saveChat()}
chatHistory.forEach(appendChatMessage);
function setChatPending(value){chatPending=value;$('chatInput').disabled=value;$('chatSend').disabled=value;document.querySelectorAll('[data-chat-prompt]').forEach(button=>button.disabled=value)}
function stopSirenChat(){
 clearTimeout(sirenTimer);clearInterval(sirenGlitchTimer);sirenGlitchTimer=0;sirenActive=false;sirenTick=0;
 document.querySelectorAll('#chatLog [data-siren-original]').forEach(node=>node.textContent=node.dataset.sirenOriginal);
 windows.secret.classList.remove('siren-channel');$('chatLog').setAttribute('aria-live','polite');$('chatStatus').textContent='연결됨 · 메시지를 입력하세요';
}
function appendSirenBeat(){
 if(!sirenActive||windows.secret.hidden)return;
 const ids=['doha','siwoo','yunjae','roan','chan'];const id=ids[sirenTick%ids.length];const lines=sirenVoices[id];const verse=Math.floor(sirenTick/ids.length);const text=lines[verse%lines.length];
 appendChatMessage({role:'member',memberId:id,text,time:'00:00',siren:true});
 while($('chatLog').children.length>65)$('chatLog').firstElementChild.remove();
 sirenTick++;
 if(sirenTick%12===0)sound('error');
 sirenTimer=setTimeout(appendSirenBeat,sirenTick<12?165:220)
}
function startSirenChat(){
 if(sirenActive)return;sirenActive=true;sirenTick=0;windows.secret.classList.add('siren-channel');$('chatLog').setAttribute('aria-live','off');
 $('chatStatus').textContent='00:00 · 알 수 없는 채널에서 메시지가 계속 수신됩니다.';refreshSirenGlitch();
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches)sirenGlitchTimer=setInterval(refreshSirenGlitch,95);
 sound('error');sirenTimer=setTimeout(appendSirenBeat,110)
}
function sendChat(){
 if(chatPending)return;const text=$('chatInput').value.trim();if(!text)return;
 const time=new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit',hour12:false});
 const lastTopic=[...chatHistory].reverse().find(item=>item.role==='member')?.topic||'';
 $('chatInput').value='';if(text.toLowerCase()==='seize'){appendChatMessage({role:'user',text,time});startSirenChat();return}
 if(sirenActive){appendChatMessage({role:'user',text,time});clearTimeout(sirenTimer);appendSirenBeat();return}
 addChatMessage({role:'user',text,time});setChatPending(true);$('chatStatus').textContent='멤버가 답장을 쓰는 중…';
 const reply=SeizeChat.respond(text,{recipient:'auto',lastTopic,turn:chatHistory.filter(item=>item.role==='user').length-1,random:Math.random()});
 chatReplyTimer=setTimeout(()=>{const replyTime=new Date().toLocaleTimeString('ko-KR',{hour:'2-digit',minute:'2-digit',hour12:false});addChatMessage({role:'member',memberId:reply.memberId,topic:reply.topic,text:reply.text,time:replyTime});setChatPending(false);$('chatStatus').textContent=reply.memberName+'의 답장이 도착했습니다.';if(!windows.secret.hidden)$('chatInput').focus();sound('open')},Math.min(850,450+text.length*12));
}
$('chatForm').addEventListener('submit',event=>{event.preventDefault();sendChat()});
$('chatInput').addEventListener('keydown',event=>{if(event.key==='Enter'&&!event.shiftKey&&!event.isComposing){event.preventDefault();sendChat()}});
document.querySelectorAll('[data-chat-prompt]').forEach(button=>button.addEventListener('click',()=>{$('chatInput').value=button.dataset.chatPrompt;sendChat()}));
function renderExplore(){
 const query=$('exploreQuery').value.trim().toLocaleLowerCase();
 const entries=archiveEntries.filter(item=>!query||[item.title,item.section,item.summary,item.body,item.terms].join(' ').toLocaleLowerCase().includes(query));
 $('exploreCount').textContent=query?`“${query}” 검색 결과 ${entries.length}건`:`보관된 기사 ${entries.length}건`;
 const results=$('exploreResults');results.replaceChildren();
 if(!entries.length){const empty=document.createElement('p');empty.className='explore-empty';empty.textContent='일치하는 기사가 없습니다. 다른 단어로 찾아보세요.';results.append(empty);return}
 entries.forEach((item,index)=>{const card=document.createElement('article');card.className='explore-result';const mast=document.createElement('small');mast.textContent=`해안 기록 · ${item.section} · ${item.date}`;const title=document.createElement('h3');title.textContent=item.title;const summary=document.createElement('p');summary.textContent=item.summary;const details=document.createElement('details');const toggle=document.createElement('summary');toggle.textContent='기사 전문 보기';const body=document.createElement('p');body.textContent=item.body;details.append(toggle,body);card.append(mast,title,summary,details);results.append(card)})
}
$('exploreForm').addEventListener('submit',event=>{event.preventDefault();renderExplore()});
$('exploreQuery').addEventListener('input',renderExplore);
renderExplore();
function showDiscardedMemory(index){
 const memory=discardedMemories[index];const preview=$('trashPreview');preview.replaceChildren();
 const eyebrow=document.createElement('small');eyebrow.textContent=memory.date+' / FRAGMENT '+String(index+1).padStart(2,'0');
 const title=document.createElement('h3');title.textContent=memory.title;
 const filename=document.createElement('code');filename.textContent=memory.file;
 const body=document.createElement('p');body.textContent=memory.text;
 const foot=document.createElement('small');foot.textContent='복원할 수 없음 · 읽기 전용';
 preview.append(eyebrow,title,filename,body,foot);
 document.querySelectorAll('#trashList button').forEach((button,i)=>button.setAttribute('aria-selected',String(i===index)));
 $('trashStatus').textContent=discardedMemories.length+' objects · '+memory.file;
}
discardedMemories.forEach((memory,index)=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-selected','false');button.setAttribute('aria-label',memory.file+' 파일 열기');const icon=document.createElement('img');icon.src='assets/retro-icons/'+(memory.file.endsWith('.jpg')?'photos.svg':memory.file.endsWith('.log')?'music.svg':memory.file.endsWith('.dat')?'unknown.svg':'memory.svg');icon.alt='';const text=document.createElement('span');text.textContent=memory.file;button.append(icon,text);button.addEventListener('click',()=>showDiscardedMemory(index));$('trashList').append(button)});
showDiscardedMemory(0);
function openPasswordDialog(){if(windows.secret.hidden||!$('errorDialog').hidden||stormActive||!$('easterDialog').hidden)return;$('passwordDialog').hidden=false;$('passwordInput').value='';$('passwordInput').removeAttribute('aria-invalid');$('passwordMessage').textContent='';$('passwordInput').focus();sound('open')}
function closePasswordDialog(restoreFocus=true){$('passwordDialog').hidden=true;$('passwordInput').value='';$('passwordMessage').textContent='';if(restoreFocus&&!windows.secret.hidden)document.querySelector('[data-menu="secret-search"]').focus()}
function clearErrorStorm(){stormTimers.splice(0).forEach(clearTimeout);stormActive=false;$('errorStorm').hidden=true;$('errorStormWindows').replaceChildren()}
function finishErrorStorm(){if(!stormActive)return;const reveal=stormReveal;clearErrorStorm();if(reveal&&!windows.secret.hidden)showEasterDialog(true);else if(!windows.secret.hidden){$('chatInput').focus();if(soundOn)deep.play().catch(()=>{})}}
function startErrorStorm(reveal){
 if(stormActive)return;closePasswordDialog(false);stormReveal=reveal;stormActive=true;deep.pause();
 $('stormDetail').textContent=reveal?'기록이 다른 창으로 복제되고 있습니다.':'메시지를 전달할 수 없습니다.';
 $('errorStorm').hidden=false;const layer=$('errorStormWindows');layer.replaceChildren();
 const count=reveal?(matchMedia('(prefers-reduced-motion: reduce)').matches?4:13):1;
 for(let i=0;i<count;i++)stormTimers.push(setTimeout(()=>{
  if(!stormActive)return;const clone=document.createElement('div');clone.className='storm-clone';clone.style.setProperty('--offset-x',((i*53)%270-135)+'px');clone.style.setProperty('--offset-y',((i*37)%175-87)+'px');clone.style.setProperty('--mobile-x',(((i%5)-2)*36)+'px');clone.style.setProperty('--mobile-y',((Math.floor(i/5)-1)*86)+'px');clone.style.zIndex=i+1;
  const title=document.createElement('div');title.className='titlebar';title.textContent=i%3===0?'SYSTEM ERROR':i%3===1?'UNLISTED FILE':'MEMORY FAILURE';const body=document.createElement('p');body.textContent=['기록 위치를 확인할 수 없습니다.','삭제된 파일이 다시 나타났습니다.','00:00 / 신호가 중복되었습니다.'][i%3];clone.append(title,body);layer.append(clone);sound('error')
 },i*(reveal?65:0)));
 if(reveal){easterAudio.pause();easterAudio.currentTime=0;easterAudio.playbackRate=.94;easterAudio.volume=.16;if(soundOn)easterAudio.play().catch(()=>{})}
 $('stormOkay').focus()
}
for(const id of ['stormClose','stormOkay'])$(id).addEventListener('click',finishErrorStorm);
const easterGlitchNodes=[...document.querySelectorAll('#easterDialog [data-glitch]')].map(element=>({element,original:element.textContent}));
easterGlitchNodes.forEach(({element,original})=>element.setAttribute('aria-label',original));
let easterGlitchInterval=0,easterGlitchSeed=0;
function stopEasterGlitch(){clearInterval(easterGlitchInterval);easterGlitchInterval=0;$('easterDialog').classList.remove('glitching');easterGlitchNodes.forEach(({element,original})=>element.textContent=original)}
function scrambledText(text,seed){const noise='01#?X░▧/';return [...text].map((character,index)=>character===' '||character==='.'?character:(index*7+seed*11)%9<3?noise[(index+seed*3)%noise.length]:character).join('')}
function startEasterGlitch(){stopEasterGlitch();if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;$('easterDialog').classList.add('glitching');const tick=()=>{easterGlitchSeed++;easterGlitchNodes.forEach(({element,original},index)=>element.textContent=scrambledText(original,easterGlitchSeed+index))};tick();easterGlitchInterval=setInterval(tick,95)}
function showEasterDialog(keepAudio=false){closePasswordDialog(false);$('easterDialog').hidden=false;if(!keepAudio){easterAudio.pause();easterAudio.currentTime=0;if(soundOn)easterAudio.play().catch(()=>{})}deep.pause();startEasterGlitch();$('easterClose').focus();sound('open')}
function closeEasterDialog(restoreFocus=true){clearErrorStorm();stopEasterGlitch();$('easterDialog').hidden=true;easterAudio.pause();easterAudio.currentTime=0;if(restoreFocus&&!windows.secret.hidden){document.querySelector('[data-menu="secret-search"]').focus();if(soundOn)deep.play().catch(()=>{})}}
$('passwordForm').addEventListener('submit',event=>{event.preventDefault();if($('passwordInput').value.trim().toLowerCase()==='seize'){audio.pause();syncPlay();startErrorStorm(true)}else{$('passwordInput').setAttribute('aria-invalid','true');$('passwordMessage').textContent='암호가 일치하지 않습니다.';$('passwordInput').select();sound('error')}});
$('passwordInput').addEventListener('input',()=>{$('passwordInput').removeAttribute('aria-invalid');$('passwordMessage').textContent=''});
for(const id of ['passwordClose','passwordCancel'])$(id).addEventListener('click',()=>closePasswordDialog());
$('easterClose').addEventListener('click',()=>closeEasterDialog());
function showTrack(index,alsoOpen=false){currentTrack=(index+tracks.length)%tracks.length;const t=tracks[currentTrack];audio.pause();audio.currentTime=0;$('trackNumber').textContent=t.number+' / '+(t.audio?'TITLE':'TRACK');$('trackTitle').textContent=t.title;$('trackSub').textContent=t.subtitle||'SEIZE · 1st Mini Album';$('trackDescription').textContent=t.audio?'FIRST¿의 타이틀곡. CD를 넣고 재생하세요.':t.info+' · 곡 정보';$('playPause').disabled=!(t.audio&&discInserted);$('seek').disabled=!(t.audio&&discInserted);$('timeCurrent').textContent='0:00';$('timeTotal').textContent=t.audio?'3:07':'--:--';$('musicStatus').textContent=t.audio?'Ready':'Song information';document.querySelectorAll('#trackMini button').forEach((b,i)=>b.classList.toggle('active',i===currentTrack));syncPlay();if(alsoOpen)openWindow('music')}
tracks.forEach((t,i)=>{const row=document.createElement('button');row.textContent=t.number+'   '+t.title+(t.subtitle&&t.subtitle!=='TITLE'?' '+t.subtitle:'');row.addEventListener('click',()=>showTrack(i));$('trackMini').append(row);const li=document.createElement('li');const n=document.createElement('span');n.textContent=t.number;const b=document.createElement('button');const title=document.createElement('strong');title.textContent=t.title;const note=document.createElement('small');note.textContent=t.audio?'TITLE · ▶':'INFO';b.append(title,note);b.addEventListener('click',()=>showTrack(i,true));li.append(n,b);$('albumTracks').append(li)});
const spinCanvas=$('discSpinLayer'),spinCtx=spinCanvas.getContext('2d');
const spinSource=new Image();
const spinGeometry={x:332.5,y:322,radius:225,depth:73,perspective:-.121,hubX:332.5,hubY:322};
const spinRegion={x:101,y:218,width:464,height:238};
const spinPoints=[];
let spinTexture=null,spinFrame=0,spinPrevious=0,spinAngle=0,spinImageData=null;
function buildSpinTexture(){
 const {x,y,radius,depth,perspective,hubX,hubY}=spinGeometry;
 const layer=document.createElement('canvas');layer.width=spinCanvas.width;layer.height=spinCanvas.height;
 const context=layer.getContext('2d');context.drawImage(spinSource,0,0,layer.width,layer.height);
 spinTexture=context.getImageData(0,0,layer.width,layer.height).data;
 // The raised plastic spindle belongs to the fixed player. Fill its source pixels
 // with neighboring disc colors so it cannot appear again as the artwork turns.
 for(let py=Math.floor(hubY-45);py<hubY+45;py++)for(let px=Math.floor(hubX-67);px<hubX+67;px++){
  const dx=(px-hubX)/67,dy=(py-hubY)/45;if(dx*dx+dy*dy>=1)continue;
  const angle=Math.atan2(dy,dx),sx=Math.round(hubX+Math.cos(angle)*73),sy=Math.round(hubY+Math.sin(angle)*49);
  const source=(sy*layer.width+sx)*4,target=(py*layer.width+px)*4;
  for(let channel=0;channel<4;channel++)spinTexture[target+channel]=spinTexture[source+channel];
 }
 spinImageData=spinCtx.createImageData(spinRegion.width,spinRegion.height);
 for(let py=0;py<spinRegion.height;py++)for(let px=0;px<spinRegion.width;px++){
  const screenX=spinRegion.x+px+.5,screenY=spinRegion.y+py+.5;
  const v=(screenY-y)/(depth-screenY*perspective),u=(screenX-x)*(1+perspective*v)/radius;
  const distance=Math.hypot(u,v);
  const hub=Math.pow((screenX-hubX)/57,2)+Math.pow((screenY-hubY)/39,2);
  if(distance>=.985||hub<1)continue;
  spinPoints.push({u,v,index:(py*spinRegion.width+px)*4,alpha:Math.min(1,(.985-distance)/.02)});
 }
 if(!spinCanvas.hidden)paintDisc();
}
spinSource.addEventListener('load',buildSpinTexture);
spinSource.src='assets/cd-player-inserted-v1.png';
function paintDisc(){
 if(!spinTexture||!spinImageData)return;
 const {x,y,radius,depth,perspective}=spinGeometry;
 const output=spinImageData.data;output.fill(0);
 const cosine=Math.cos(spinAngle),sine=Math.sin(spinAngle),width=spinCanvas.width,height=spinCanvas.height;
 for(const point of spinPoints){
  const sourceU=point.u*cosine+point.v*sine,sourceV=-point.u*sine+point.v*cosine;
  const divisor=1+perspective*sourceV;
  const sourceX=Math.max(0,Math.min(width-1,Math.round(x+radius*sourceU/divisor)));
  const sourceY=Math.max(0,Math.min(height-1,Math.round((y+depth*sourceV)/divisor)));
  const sourceIndex=(sourceY*width+sourceX)*4,targetIndex=point.index;
  output[targetIndex]=spinTexture[sourceIndex];output[targetIndex+1]=spinTexture[sourceIndex+1];
  output[targetIndex+2]=spinTexture[sourceIndex+2];output[targetIndex+3]=spinTexture[sourceIndex+3]*point.alpha;
 }
 spinCtx.putImageData(spinImageData,spinRegion.x,spinRegion.y);
}
function spinDisc(now){
 if(!spinPrevious||now-spinPrevious>=30){if(spinPrevious)spinAngle=(spinAngle+(now-spinPrevious)*Math.PI*2/2600)%(Math.PI*2);spinPrevious=now;paintDisc()}
 spinFrame=requestAnimationFrame(spinDisc);
}
function syncPlay(){
 const playing=!audio.paused&&!audio.ended;
 $('playPause').textContent=playing?'Ⅱ':'▶';$('playPause').setAttribute('aria-label',playing?'일시정지':'재생');
 const shouldSpin=playing&&discInserted&&lidOpen&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(shouldSpin&&!spinFrame){spinPrevious=0;spinFrame=requestAnimationFrame(spinDisc)}
 if(!shouldSpin&&spinFrame){cancelAnimationFrame(spinFrame);spinFrame=0;spinPrevious=0}
}
function fmt(seconds){return Number.isFinite(seconds)?Math.floor(seconds/60)+':'+String(Math.floor(seconds%60)).padStart(2,'0'):'--:--'}
audio.volume=.55;audio.addEventListener('play',syncPlay);audio.addEventListener('pause',syncPlay);audio.addEventListener('ended',syncPlay);audio.addEventListener('loadedmetadata',()=>{$('timeTotal').textContent=fmt(audio.duration)});audio.addEventListener('timeupdate',()=>{$('timeCurrent').textContent=fmt(audio.currentTime);$('seek').value=audio.duration?String(100*audio.currentTime/audio.duration):'0'});
$('playPause').addEventListener('click',async()=>{if(!discInserted||!tracks[currentTrack].audio)return;if(audio.paused){try{await audio.play();$('musicStatus').textContent='Playing'}catch{$('musicStatus').textContent='재생할 수 없습니다. 다시 눌러주세요.'}}else{audio.pause();$('musicStatus').textContent='Paused'}sound()});
$('prevTrack').addEventListener('click',()=>{showTrack(currentTrack-1);sound()});$('nextTrack').addEventListener('click',()=>{showTrack(currentTrack+1);sound()});$('volume').addEventListener('input',e=>audio.volume=Number(e.target.value)/100);$('seek').addEventListener('input',e=>{if(audio.duration)audio.currentTime=audio.duration*Number(e.target.value)/100});
function setLid(open,silent=false){lidOpen=open;if(!open)audio.pause();$('deviceImage').src=open?(discInserted?'assets/cd-player-inserted-v1.png':'assets/cd-player-open-preview-v1.png'):'assets/cd-player-closed-v1.png';$('deviceImage').alt=open?(discInserted?'CD가 장착된 은색 CD 플레이어':'열린 은색 CD 플레이어'):'닫힌 은색 CD 플레이어';$('deviceToggle').setAttribute('aria-label',open?'CD 플레이어 덮개 닫기':'CD 플레이어 덮개 열기');$('discObject').hidden=!open||discInserted;spinCanvas.hidden=!open||!discInserted;if(!spinCanvas.hidden)paintDisc();$('deviceStatus').textContent=open?(discInserted?'DISC INSERTED':'DRAG DISC HERE / TAP TO INSERT'):'DISC 01 / FIRST¿';syncPlay();if(!silent)sound('open')}
$('deviceToggle').addEventListener('click',()=>setLid(!lidOpen));setLid(false,true);
showTrack(2);
function insertDisc(){if(!lidOpen||discInserted)return;discInserted=true;const d=$('discObject');d.hidden=true;d.setAttribute('aria-pressed','true');$('deviceImage').src='assets/cd-player-inserted-v1.png';$('deviceImage').alt='CD가 장착된 은색 CD 플레이어';spinCanvas.hidden=false;paintDisc();$('deviceStatus').textContent='DISC INSERTED';$('playPause').disabled=!tracks[currentTrack].audio;$('seek').disabled=!tracks[currentTrack].audio;sound('open')}
const disc=$('discObject');let discDrag=null;disc.addEventListener('pointerdown',e=>{if(discInserted)return;discDrag={id:e.pointerId,x:e.clientX,y:e.clientY};disc.setPointerCapture(e.pointerId);disc.classList.add('dragging')});disc.addEventListener('pointermove',e=>{if(!discDrag)return;disc.style.translate=(e.clientX-discDrag.x)+'px '+(e.clientY-discDrag.y)+'px'});disc.addEventListener('pointerup',e=>{if(!discDrag)return;const moved=Math.hypot(e.clientX-discDrag.x,e.clientY-discDrag.y);const box=$('deviceToggle').getBoundingClientRect();const over=e.clientX>=box.left&&e.clientX<=box.right&&e.clientY>=box.top&&e.clientY<=box.bottom;disc.style.translate='';disc.classList.remove('dragging');discDrag=null;if(moved<12||over)insertDisc()});disc.addEventListener('pointercancel',()=>{disc.style.translate='';disc.classList.remove('dragging');discDrag=null});disc.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();insertDisc()}});
function showMember(index){
 memberIndex=(index+members.length)%members.length;const member=members[memberIndex];
 $('memberSprite').src='assets/'+member.file;$('memberSprite').alt=member.alt+'의 도트 캐릭터';
 $('memberIndex').textContent='FILE '+String(memberIndex+1).padStart(2,'0')+' / 05';
 $('memberName').textContent=member.name;$('memberLine').textContent=member.line;$('memberCaption').textContent=member.caption;
 $('memberStatus').textContent=(memberIndex+1)+' / '+members.length+' members';
 document.querySelectorAll('#memberRoster button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===memberIndex)));
}
members.forEach((member,index)=>{
 const button=document.createElement('button');button.type='button';button.className='member-roster-item';button.setAttribute('aria-label',member.name+' 소개 보기');
 const number=document.createElement('small');number.textContent=String(index+1).padStart(2,'0');
 const img=document.createElement('img');img.src='assets/'+member.file;img.alt='';
 const name=document.createElement('strong');name.textContent=member.name;button.append(number,img,name);
 button.addEventListener('click',()=>{showMember(index);sound()});$('memberRoster').append(button)
});
showMember(0);
function showMemberTab(tab){
 const playing=tab==='game';$('memberProfilePanel').hidden=playing;$('memberGamePanel').hidden=!playing;
 $('memberProfileTab').setAttribute('aria-pressed',String(!playing));$('memberGameTab').setAttribute('aria-pressed',String(playing));
 $('memberStatus').textContent=playing?(conceptUnlocked?'Memory complete · Photos unlocked':'Find 5 matching pairs'):(memberIndex+1)+' / '+members.length+' members';
}
$('memberProfileTab').addEventListener('click',()=>showMemberTab('profile'));
$('memberGameTab').addEventListener('click',()=>showMemberTab('game'));
let firstCard=null,cardLocked=false,matchedPairs=0,memoryMoves=0,mismatchTimer;
function startMemoryGame(){
 clearTimeout(mismatchTimer);firstCard=null;cardLocked=false;matchedPairs=0;memoryMoves=0;
 $('gamePairs').textContent='복구 0 / 5';$('gameMoves').textContent='시도 0';$('gameComplete').hidden=true;
 const deck=[...members,...members].map((member,index)=>({...member,key:index}));
 for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]]}
 const board=$('memoryBoard');board.replaceChildren();
 deck.forEach(member=>{
  const card=document.createElement('button');card.type='button';card.className='memory-card';card.dataset.member=member.id;card.setAttribute('aria-label','뒤집힌 멤버 카드');
  const back=document.createElement('span');back.className='memory-card-back';back.textContent='?';
  const face=document.createElement('span');face.className='memory-card-face';const img=document.createElement('img');img.src='assets/'+member.file;img.alt='';const name=document.createElement('span');name.textContent=member.name;face.append(img,name);card.append(back,face);
  card.addEventListener('click',()=>{
   if(cardLocked||card.disabled||card===firstCard||card.classList.contains('is-flipped'))return;
   card.classList.add('is-flipped');card.setAttribute('aria-label',member.name+' 카드');sound();
   if(!firstCard){firstCard=card;return}
   memoryMoves++;$('gameMoves').textContent='시도 '+memoryMoves;
   const previous=firstCard;firstCard=null;
   if(previous.dataset.member===card.dataset.member){
    previous.classList.replace('is-flipped','is-matched');card.classList.replace('is-flipped','is-matched');previous.disabled=true;card.disabled=true;
    matchedPairs++;$('gamePairs').textContent='복구 '+matchedPairs+' / 5';sound('open');
    if(matchedPairs===members.length)unlockConcept();
   }else{
    cardLocked=true; mismatchTimer=setTimeout(()=>{previous.classList.remove('is-flipped');card.classList.remove('is-flipped');previous.setAttribute('aria-label','뒤집힌 멤버 카드');card.setAttribute('aria-label','뒤집힌 멤버 카드');cardLocked=false},760);
   }
  });board.append(card)
 });
}
$('gameRestart').addEventListener('click',startMemoryGame);
startMemoryGame();
if(conceptUnlocked){$('memberGameBadge').textContent='PHOTO OPEN';$('gameComplete').hidden=false}
function showConceptTab(tab){
 if(!conceptUnlocked)return;const quizVisible=tab==='quiz';
 $('conceptGallery').hidden=quizVisible;$('conceptQuiz').hidden=!quizVisible;
 $('conceptPhotosTab').setAttribute('aria-pressed',String(!quizVisible));$('conceptQuizTab').setAttribute('aria-pressed',String(quizVisible));
 $('conceptStatus').textContent=secretUnlocked?'5×5 score assembled · Secret folder unlocked':quizVisible?'5×5 score puzzle · In progress':conceptPhotos.length+' photos · Score puzzle pending';
}
$('conceptPhotosTab').addEventListener('click',()=>showConceptTab('photos'));
$('conceptQuizTab').addEventListener('click',()=>showConceptTab('quiz'));
function syncConceptLock(){
 $('conceptLocked').hidden=conceptUnlocked;$('conceptTabs').hidden=!conceptUnlocked;
 if(conceptUnlocked)showConceptTab($('conceptQuizTab').getAttribute('aria-pressed')==='true'?'quiz':'photos');
 else{$('conceptGallery').hidden=true;$('conceptQuiz').hidden=true;$('conceptStatus').textContent='Locked · Memory game required'}
 const icon=desktop.querySelector('.concept-icon');icon.classList.toggle('is-locked',!conceptUnlocked);
 icon.setAttribute('aria-label',(conceptUnlocked?'컨셉 포토':'잠긴 컨셉 포토')+' 창 열기, 두 번 클릭');
}
function showConcept(index){
 conceptIndex=(index+conceptPhotos.length)%conceptPhotos.length;const photo=conceptPhotos[conceptIndex];
 $('conceptImage').src='assets/'+photo.file;$('conceptImage').alt=photo.alt;
 $('conceptTitle').textContent=photo.title;$('conceptCount').textContent=String(conceptIndex+1).padStart(2,'0')+' / '+String(conceptPhotos.length).padStart(2,'0');
 document.querySelectorAll('#conceptStrip button').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===conceptIndex)));
}
conceptPhotos.forEach((photo,index)=>{
 const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',photo.title+' 사진 보기');
 const img=document.createElement('img');img.src='assets/'+photo.file;img.alt='';const title=document.createElement('span');title.textContent=photo.title;button.append(img,title);
 button.addEventListener('click',()=>{showConcept(index);sound()});$('conceptStrip').append(button);
});
showConcept(0);syncConceptLock();
$('conceptPrev').addEventListener('click',()=>{showConcept(conceptIndex-1);sound()});
$('conceptNext').addEventListener('click',()=>{showConcept(conceptIndex+1);sound()});
$('conceptGoQuiz').addEventListener('click',()=>{openWindow('photos');showMemberTab('game')});
function unlockConcept(){
 conceptUnlocked=true;localStorage.setItem('seize-concept-memory-v1','1');$('memberGameBadge').textContent='PHOTO OPEN';
 $('gameComplete').hidden=false;$('memberStatus').textContent='Memory complete · Photos unlocked';syncConceptLock();sound('open');
 setTimeout(()=>{openWindow('concept');showConceptTab('photos')},600);
}
const scoreStorageKey='seize-score-tiles-v2',scoreHintsKey='seize-score-tile-hints-v2';
let scoreState=SeizeScorePuzzle.shuffle(),scoreHints=0,scoreSelected=-1,scoreActiveIndex=0,scoreDragFrom=-1;
try{const saved=JSON.parse(sessionStorage.getItem(scoreStorageKey)||'null');if(SeizeScorePuzzle.isValid(saved))scoreState=saved;scoreHints=Number(sessionStorage.getItem(scoreHintsKey))||0}catch{}
if(secretUnlocked)scoreState=SeizeScorePuzzle.solved.slice();
function saveScore(){try{sessionStorage.setItem(scoreStorageKey,JSON.stringify(scoreState));sessionStorage.setItem(scoreHintsKey,String(scoreHints))}catch{}}
function refreshScore(){
 [...$('scoreGrid').children].forEach((button,index)=>{
  const tile=scoreState[index];button.style.backgroundPosition=`${tile%5*25}% ${Math.floor(tile/5)*25}%`;
  button.dataset.correct=String(tile===index);button.dataset.selected=String(index===scoreSelected);
  button.setAttribute('aria-pressed',String(index===scoreSelected));
  button.setAttribute('aria-label',`${Math.floor(index/5)+1}행 ${index%5+1}열, 악보 조각 ${tile+1}${tile===index?', 제자리':''}${index===scoreSelected?', 선택됨':''}`);
 });
 $('scoreProgress').textContent=`제자리 ${scoreState.filter((tile,index)=>tile===index).length} / 25`;
 $('scoreHints').textContent=`힌트 ${scoreHints}회`;
 saveScore();
 if(!secretUnlocked&&conceptUnlocked&&SeizeScorePuzzle.isSolved(scoreState)){
  unlockSecret();$('scorePlay').hidden=true;$('quizComplete').hidden=false;$('openSecretFile').focus();sound('open');
 }
}
function focusScoreCell(index){const buttons=$('scoreGrid').children;buttons[scoreActiveIndex].tabIndex=-1;scoreActiveIndex=index;buttons[index].tabIndex=0;buttons[index].focus({preventScroll:true})}
function swapScoreTiles(first,second){
 if(secretUnlocked||first===second)return;
 scoreState=SeizeScorePuzzle.swap(scoreState,first,second);scoreSelected=-1;
 $('scoreFeedback').textContent=`${Math.floor(first/5)+1}행 ${first%5+1}열과 ${Math.floor(second/5)+1}행 ${second%5+1}열의 조각을 바꿨습니다.`;
 refreshScore();
}
function chooseScoreTile(index){
 if(secretUnlocked)return;
 focusScoreCell(index);
 if(scoreSelected<0){scoreSelected=index;$('scoreFeedback').textContent='바꿀 조각을 하나 더 선택하세요.';refreshScore();return}
 if(scoreSelected===index){scoreSelected=-1;$('scoreFeedback').textContent='선택을 취소했습니다.';refreshScore();return}
 swapScoreTiles(scoreSelected,index);
}
for(let index=0;index<SeizeScorePuzzle.count;index++){
 const button=document.createElement('button');button.type='button';button.className='score-cell';button.tabIndex=index===0?0:-1;button.draggable=true;
 button.addEventListener('click',()=>chooseScoreTile(index));
 button.addEventListener('dragstart',event=>{scoreDragFrom=index;event.dataTransfer.effectAllowed='move';event.dataTransfer.setData('text/plain',String(index));button.classList.add('dragging')});
 button.addEventListener('dragend',()=>{scoreDragFrom=-1;button.classList.remove('dragging')});
 button.addEventListener('dragover',event=>{event.preventDefault();event.dataTransfer.dropEffect='move'});
 button.addEventListener('drop',event=>{event.preventDefault();const from=scoreDragFrom>=0?scoreDragFrom:Number(event.dataTransfer.getData('text/plain'));if(Number.isInteger(from)&&from>=0&&from<25){focusScoreCell(index);swapScoreTiles(from,index)}scoreDragFrom=-1});
 button.addEventListener('keydown',event=>{
  const row=Math.floor(index/5),column=index%5;
  const next=event.key==='ArrowRight'?index+(column<4?1:0):event.key==='ArrowLeft'?index-(column>0?1:0):event.key==='ArrowDown'?index+(row<4?5:0):event.key==='ArrowUp'?index-(row>0?5:0):null;
  if(next!==null){event.preventDefault();focusScoreCell(next)}
  else if(event.key===' '||event.key==='Enter'){event.preventDefault();chooseScoreTile(index)}
  else if(event.key==='Escape'&&scoreSelected>=0){event.preventDefault();scoreSelected=-1;refreshScore()}
 });
 $('scoreGrid').append(button);
}
$('scoreHint').addEventListener('click',()=>{const hint=SeizeScorePuzzle.hint(scoreState);if(!hint)return;scoreState=hint.state;scoreSelected=-1;scoreHints++;$('scoreFeedback').textContent=`${Math.floor(hint.target/5)+1}행 ${hint.target%5+1}열의 조각을 제자리로 돌렸습니다.`;refreshScore()});
$('scoreReset').addEventListener('click',()=>{scoreState=SeizeScorePuzzle.shuffle();scoreHints=0;scoreSelected=-1;$('scoreFeedback').textContent='악보 조각을 다시 섞었습니다.';refreshScore()});
$('scorePreview').addEventListener('click',()=>{const visible=$('scoreReference').hidden;$('scoreReference').hidden=!visible;$('scorePreview').setAttribute('aria-pressed',String(visible));$('scorePreview').textContent=visible?'원본 닫기':'원본 보기'});
function renderScorePuzzle(){$('scorePlay').hidden=secretUnlocked;$('quizComplete').hidden=!secretUnlocked;refreshScore()}
renderScorePuzzle();
$('gameOpenPhotos').addEventListener('click',()=>openWindow('concept'));
$('openSecretFile').addEventListener('click',()=>{closeWindow('concept');desktop.querySelector('.secret-icon').focus()});
const menuActions={
 disc:()=>setLid(!lidOpen),'music-view':()=>maximize('music'),'music-options':()=>$('soundToggle').click(),'music-help':()=>{$('musicStatus').textContent='CD를 열고 디스크를 넣으세요.'},
 'member-file':()=>{showMemberTab('profile');showMember(0)},'member-next':()=>{showMemberTab('profile');showMember(memberIndex+1)},'member-game':()=>showMemberTab('game'),'member-view':()=>maximize('photos'),'member-help':()=>{$('memberStatus').textContent='기억 카드를 모두 맞추면 컨셉 포토가 열립니다.'},
 'album-top':()=>windows.album.querySelector('.window-body').scrollTo({top:0,behavior:'smooth'}),'album-tracks':()=>windows.album.querySelector('#albumTracks').scrollIntoView({block:'start',behavior:'smooth'}),'album-credits':()=>{$('albumTracks').nextElementSibling.textContent='SEIZE · FIRST¿ / 1st Mini Album'},'album-help':()=>{$('albumTracks').nextElementSibling.textContent='곡을 선택하면 CD Player에서 곡 정보를 볼 수 있어요.'},
 'concept-first':()=>{if(conceptUnlocked){showConceptTab('photos');showConcept(0)}else{openWindow('photos');showMemberTab('game')}},'concept-next':()=>{if(conceptUnlocked){showConceptTab('photos');showConcept(conceptIndex+1)}else{openWindow('photos');showMemberTab('game')}},'concept-view':()=>maximize('concept'),'concept-help':()=>{$('conceptStatus').textContent=conceptUnlocked?'5×5 악보 조각을 맞추면 비밀 폴더가 나타납니다.':'멤버 소개의 기억 카드를 맞추면 열립니다.'},
 'secret-file':()=>closeWindow('secret'),'secret-edit':async()=>{try{await navigator.clipboard.writeText(chatHistory.map(item=>`${item.time} ${item.role==='user'?'방문자':SeizeChat.personas[item.memberId].name}: ${item.text}`).join('\n'));$('chatStatus').textContent='현재 대화를 복사했습니다.'}catch{$('chatStatus').textContent='복사할 수 없습니다.'}},'secret-search':()=>openPasswordDialog(),'secret-help':()=>{$('chatStatus').textContent='메시지를 보내거나 Search에서 보호된 파일을 열 수 있습니다.'}
};
document.querySelectorAll('[data-menu]').forEach(button=>button.addEventListener('click',()=>{menuActions[button.dataset.menu]?.();sound()}));
$('startButton').addEventListener('click',()=>{const menu=$('startMenu');menu.hidden=!menu.hidden;$('startButton').setAttribute('aria-expanded',String(!menu.hidden));sound()});
$('startRestart').addEventListener('click',()=>{localStorage.removeItem('seize-concept-memory-v1');localStorage.removeItem('seize-secret-all-games-v1');localStorage.removeItem('seize-secret-score-v1');localStorage.removeItem('seize-secret-tiles-v2');try{sessionStorage.removeItem(chatStorageKey);sessionStorage.removeItem(scoreStorageKey);sessionStorage.removeItem(scoreHintsKey)}catch{};location.reload()});
function closeShutdownDialog(){$('shutdownDialog').hidden=true;$('startButton').focus()}
$('startClose').addEventListener('click',()=>{$('startMenu').hidden=true;$('startButton').setAttribute('aria-expanded','false');$('shutdownDialog').hidden=false;$('shutdownOkay').focus();sound('error')});
for(const id of ['shutdownClose','shutdownOkay'])$(id).addEventListener('click',closeShutdownDialog);
document.querySelectorAll('[data-menu-open]').forEach(b=>b.addEventListener('click',()=>{openWindow(b.dataset.menuOpen);$('startMenu').hidden=true;$('startButton').setAttribute('aria-expanded','false')}));
$('soundToggle').addEventListener('click',()=>{soundOn=!soundOn;$('soundToggle').setAttribute('aria-pressed',String(soundOn));$('soundToggle').setAttribute('aria-label',soundOn?'효과음 끄기':'효과음 켜기');$('soundToggle').textContent=soundOn?'♪':'×';if(!soundOn){deep.pause();easterAudio.pause()}else if((stormActive&&stormReveal)||!$('easterDialog').hidden)easterAudio.play().catch(()=>{});else if(!windows.secret.hidden)deep.play().catch(()=>{})});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(stormActive){finishErrorStorm();return}if(!$('shutdownDialog').hidden){closeShutdownDialog();return}if(!$('passwordDialog').hidden){closePasswordDialog();return}if(!$('easterDialog').hidden){closeEasterDialog();return}if(!$('errorDialog').hidden){$('errorDialog').hidden=true;return}if(!$('startMenu').hidden){$('startMenu').hidden=true;$('startButton').setAttribute('aria-expanded','false');return}if(focused)closeWindow(focused)}if((e.key==='ArrowLeft'||e.key==='ArrowRight')&&$('passwordDialog').hidden&&$('easterDialog').hidden&&!e.target.matches('input')){if(focused==='photos'&&!$('memberProfilePanel').hidden){e.preventDefault();showMember(memberIndex+(e.key==='ArrowRight'?1:-1))}if(focused==='concept'&&conceptUnlocked&&!$('conceptGallery').hidden){e.preventDefault();showConcept(conceptIndex+(e.key==='ArrowRight'?1:-1))}}});
document.addEventListener('visibilitychange',()=>{if(document.hidden){audio.pause();deep.pause();easterAudio.pause()}else if(soundOn&&!$('easterDialog').hidden)easterAudio.play().catch(()=>{});else if(!windows.secret.hidden&&soundOn&&!stormActive)deep.play().catch(()=>{})});
