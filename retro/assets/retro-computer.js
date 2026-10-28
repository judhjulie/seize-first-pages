import * as THREE from 'three';
import {CSS3DObject,CSS3DRenderer} from 'three/addons/renderers/CSS3DRenderer.js';
import {buildRetroRoom} from './retro-room.js';

const stage=document.getElementById('sceneStage');
const webglLayer=document.getElementById('webglLayer');
const cssLayer=document.getElementById('cssLayer');
const loadingState=document.getElementById('loadingState');
const experience=document.getElementById('experience');
const scene=new THREE.Scene();
scene.background=new THREE.Color(0x06090e);
const cssScene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(41,1,.1,100);
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.8));
renderer.setClearColor(0x06090e,1);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFShadowMap;
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.05;
webglLayer.appendChild(renderer.domElement);
const cssRenderer=new CSS3DRenderer();
cssRenderer.domElement.style.position='absolute';
cssRenderer.domElement.style.inset='0';
cssRenderer.domElement.style.pointerEvents='none';
cssLayer.appendChild(cssRenderer.domElement);

const plastic=new THREE.MeshStandardMaterial({color:0x9c9683,roughness:.84,metalness:.03});
const plasticLight=new THREE.MeshStandardMaterial({color:0xc2baa6,roughness:.77,metalness:.02});
const plasticEdge=new THREE.MeshStandardMaterial({color:0x777363,roughness:.89});
const seam=new THREE.MeshStandardMaterial({color:0x524f47,roughness:.95});
const dark=new THREE.MeshStandardMaterial({color:0x171a1a,roughness:.83});
const keyMat=new THREE.MeshStandardMaterial({color:0x272a2a,roughness:.77});
const keyTop=new THREE.MeshStandardMaterial({color:0x3d3f3c,roughness:.73});
const metal=new THREE.MeshStandardMaterial({color:0x8e8f8b,roughness:.5,metalness:.38});
const sticker=new THREE.MeshBasicMaterial({color:0xd0c4aa});
const blue=new THREE.MeshBasicMaterial({color:0x93b1b8});
const group=new THREE.Group();
scene.add(group);
buildRetroRoom(scene);

function box(w,h,d,material,x,y,z,parent=group){
 const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);
 mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}
function rounded(w,h,d,r,material,x,y,z,parent=group){
 const shape=new THREE.Shape();const a=-w/2,b=-h/2;
 shape.moveTo(a+r,b);shape.lineTo(a+w-r,b);shape.quadraticCurveTo(a+w,b,a+w,b+r);
 shape.lineTo(a+w,b+h-r);shape.quadraticCurveTo(a+w,b+h,a+w-r,b+h);
 shape.lineTo(a+r,b+h);shape.quadraticCurveTo(a,b+h,a,b+h-r);
 shape.lineTo(a,b+r);shape.quadraticCurveTo(a,b,a+r,b);
 const geo=new THREE.ExtrudeGeometry(shape,{depth:d,bevelEnabled:true,bevelThickness:.035,bevelSize:.035,bevelSegments:2,curveSegments:5});
 const mesh=new THREE.Mesh(geo,material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}
function line(points,radius,material,parent=group){
 const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));
 const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,Math.max(12,points.length*6),radius,7,false),material);
 mesh.castShadow=true;parent.add(mesh);return mesh;
}
function label(text,width,height,color=0x4b4941){
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=128;
 const ctx=canvas.getContext('2d');ctx.clearRect(0,0,512,128);
 ctx.fillStyle='#'+color.toString(16).padStart(6,'0');ctx.font='700 70px Arial, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,256,67);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
 const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,height),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));
 return mesh;
}

// Heavy CRT shell: rear housing, side moulding, inset glass and deep front rim.
rounded(6.18,4.84,1.68,.35,plastic,-.02,1.68,-1.25);
rounded(6.22,4.86,.16,.28,plasticEdge,0,1.68,.38);
rounded(6.12,4.76,.18,.27,plasticLight,0,1.68,.49);
rounded(5.45,4.13,.04,.2,plasticEdge,0,1.97,.68);
rounded(4.99,3.69,.025,.13,dark,0,2.04,.72);
rounded(4.78,3.52,.012,.08,new THREE.MeshBasicMaterial({color:0x061b29}),0,2.04,.755);
// Sculpted bezel strips frame the live website without covering it.
box(6.03,.32,.07,plastic,0,4.025,.68);
box(6.03,.65,.07,plastic,0,-.405,.68);
box(.52,3.66,.07,plastic,-2.75,2.02,.68);
box(.52,3.66,.07,plastic,2.75,2.02,.68);
box(4.92,.035,.06,seam,0,3.85,.734);
box(4.92,.035,.06,seam,0,.22,.734);
// Tiny scratches and mould seams give the object age without obscuring the monitor.
box(6.05,.025,.025,seam,0,-.12,.69);
for(let i=0;i<15;i++)box(.03,.26,.035,plasticEdge,2.98,-.23+i*.024,.69);
for(let i=0;i<10;i++)box(.03,.16,.035,plasticEdge,-2.99,-.3+i*.021,.69);
// Maker badge, power button, drive slot and signal light.
const maker=label('SEIZE',.92,.24,0x4d4a42);maker.position.set(-2.35,-.32,.747);group.add(maker);
box(1.22,.035,.025,seam,.5,-.29,.752);
box(1.22,.035,.025,plasticEdge,.5,-.365,.752);
const power=new THREE.Mesh(new THREE.CylinderGeometry(.095,.095,.05,24),metal);power.rotation.x=Math.PI/2;power.position.set(2.55,-.31,.79);group.add(power);
const led=new THREE.Mesh(new THREE.SphereGeometry(.025,8,8),new THREE.MeshBasicMaterial({color:0xb8ec95}));led.position.set(2.24,-.31,.78);group.add(led);
const ledLight=new THREE.PointLight(0xa7f394,.7,.7);ledLight.position.copy(led.position);group.add(ledLight);

// The website stays a real, interactive document inside the 3D monitor.
const screen=document.createElement('div');screen.className='crt-screen';
const frame=document.createElement('iframe');frame.src='desktop.html';frame.title='SEIZE 웹사이트 — 화면 속 아이콘을 두 번 클릭해 탐색하세요';frame.loading='eager';frame.allow='autoplay';
screen.appendChild(frame);
const screenNoise=document.createElement('div');screenNoise.className='crt-noise';screenNoise.setAttribute('aria-hidden','true');screen.appendChild(screenNoise);
const screenSweep=document.createElement('div');screenSweep.className='crt-sweep';screenSweep.setAttribute('aria-hidden','true');screen.appendChild(screenSweep);
const screenGlass=document.createElement('div');screenGlass.className='crt-glass';screenGlass.setAttribute('aria-hidden','true');screen.appendChild(screenGlass);
const screenCursor=document.createElement('div');screenCursor.className='crt-cursor';screenCursor.setAttribute('aria-hidden','true');screen.appendChild(screenCursor);
const screenEnter=document.createElement('button');screenEnter.type='button';screenEnter.className='crt-enter';screenEnter.setAttribute('aria-label','컴퓨터 화면 확대');screen.appendChild(screenEnter);
const screenObject=new CSS3DObject(screen);
screenObject.position.set(0,2.04,.84);
screenObject.scale.set(4.65/1000,3.43/740,1);
cssScene.add(screenObject);
let screenFocused=false;
function setScreenFocus(focused){
 screenFocused=focused;
 experience.classList.toggle('is-screen-focused',focused);
 screenEnter.hidden=focused;
}
screenEnter.addEventListener('click',()=>setScreenFocus(true));
stage.addEventListener('pointerdown',event=>{
 if(screenFocused&&!screen.contains(event.target))setScreenFocus(false);
});
frame.addEventListener('load',()=>{loadingState.hidden=true;wireFrameInput()});
setTimeout(()=>{loadingState.hidden=true},12000);

// Keep the cursor in the CRT overlay while the website inside the iframe remains clickable.
let mouseClickUntil=0;
let mouseTargetX=3.53;
let mouseTargetZ=2.5;
let lastFrameDocument=null;
function registerTyping(event){
 if(event.repeat||event.metaKey||event.ctrlKey||event.altKey||event.key==='Shift'||event.key==='Control'||event.key==='Alt')return;
 const key=event.key.toLowerCase();
 // A brief press makes the physical keyboard respond.
 const keyMesh=keycaps[(Math.abs(key.charCodeAt(0)||0)*7)%keycaps.length];
 if(keyMesh){keyMesh.userData.press=1;keyMesh.userData.lastPress=performance.now()}
}
function wireFrameInput(){
 let doc;
 try{doc=frame.contentDocument}catch{return}
 if(!doc||doc===lastFrameDocument)return;
 lastFrameDocument=doc;
 const cursorStyle=doc.createElement('style');
 cursorStyle.textContent='html,body,body *{cursor:none!important}';
 doc.head.appendChild(cursorStyle);
 doc.addEventListener('keydown',registerTyping);
 doc.addEventListener('pointermove',event=>{
  const rect=doc.documentElement.getBoundingClientRect();
  const x=THREE.MathUtils.clamp(event.clientX-rect.left,0,rect.width);
  const y=THREE.MathUtils.clamp(event.clientY-rect.top,0,rect.height);
  screenCursor.style.left=`${x/rect.width*100}%`;
  screenCursor.style.top=`${y/rect.height*100}%`;
  screenCursor.classList.add('is-visible');
  mouseTargetX=3.53+THREE.MathUtils.clamp((x/rect.width-.5)*.36,-.18,.18);
  mouseTargetZ=2.5+THREE.MathUtils.clamp((y/rect.height-.5)*.32,-.16,.16);
 },true);
 doc.addEventListener('pointerdown',()=>{mouseClickUntil=performance.now()+230;screenCursor.classList.add('is-clicking')},true);
 doc.addEventListener('pointerup',()=>screenCursor.classList.remove('is-clicking'),true);
 doc.addEventListener('pointerleave',()=>screenCursor.classList.remove('is-visible'),true);
}
screen.addEventListener('pointerleave',()=>screenCursor.classList.remove('is-visible'));
window.addEventListener('keydown',registerTyping);

// The stand and keyboard share the same desk plane. The keys face the camera.
rounded(1.3,.84,.68,.1,plasticEdge,0,-1.12,-.63);
rounded(3.45,.15,1.58,.11,plastic,0,-1.81,-.32);
const keyboard=new THREE.Group();keyboard.position.set(0,-1.85,2.06);keyboard.rotation.x=-.025;group.add(keyboard);
box(6.26,.19,1.62,plastic,0,0,0,keyboard);
box(6.04,.045,1.34,plasticEdge,0,.116,0,keyboard);
const keycaps=[];
const rows=[14,14,13,12];
rows.forEach((count,row)=>{
 const step=5.55/(count-1),z=-.51+row*.255;
 for(let col=0;col<count;col++){
  const x=-2.775+col*step+(row===3?.08:0);
  const key=box(.32,.105,.205,keyMat,x,.185,z,keyboard);keycaps.push(key);
  const top=box(.275,.012,.155,keyTop,0,.061,-.01,key);top.castShadow=false;
 }
});
const bottomKeys=[[-2.72,.34],[-2.25,.34],[-1.78,.34],[-.67,1.46],[.71,1.1],[1.72,.34],[2.18,.34],[2.64,.34]];
bottomKeys.forEach(([x,w])=>{const key=box(w,.105,.205,keyMat,x,.185,.53,keyboard);keycaps.push(key);const top=box(w-.045,.012,.155,keyTop,0,.061,-.01,key);top.castShadow=false});
for(let i=0;i<3;i++){const light=new THREE.Mesh(new THREE.SphereGeometry(.018,8,8),new THREE.MeshBasicMaterial({color:i===0?0xb9d995:0x5a7970}));light.position.set(2.65-i*.13,.21,-.69);keyboard.add(light)}
line([[2.91,-1.84,1.39],[3.5,-1.86,.8],[3.43,-1.43,-.02],[3.12,-.84,-.73]],.044,dark);

// The mouse remains a physical 3D object on the desk.
function oval(parent,w,h,d,material,x,y,z){
 const mesh=new THREE.Mesh(new THREE.SphereGeometry(1,20,14),material);
 mesh.scale.set(w,h,d);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;
}
const mouse=new THREE.Group();mouse.position.set(mouseTargetX,-1.68,mouseTargetZ);group.add(mouse);
oval(mouse,.28,.135,.41,plasticEdge,0,0,0);
oval(mouse,.258,.115,.36,plasticLight,0,.055,-.025);
box(.018,.012,.25,seam,0,.166,-.205,mouse);
const mouseWheel=new THREE.Mesh(new THREE.CylinderGeometry(.037,.037,.055,12),dark);
mouseWheel.rotation.z=Math.PI/2;mouseWheel.position.set(0,.17,-.14);mouse.add(mouseWheel);
line([[3.52,-1.69,2.15],[3.48,-1.78,1.55],[3.3,-1.82,1.34]],.02,dark);
// Shadow catcher blends the computer into the 3D desk surface.
const shadowPlane=new THREE.Mesh(new THREE.PlaneGeometry(22,14),new THREE.ShadowMaterial({opacity:.46}));
shadowPlane.rotation.x=-Math.PI/2;shadowPlane.position.y=-1.97;shadowPlane.receiveShadow=true;scene.add(shadowPlane);
// Only the CRT illuminates the room. The tiny ambient level keeps silhouettes legible.
scene.add(new THREE.HemisphereLight(0x6d8294,0x070a0f,.12));
const screenLight=new THREE.PointLight(0x9ccfe3,55,16,2);
screenLight.position.set(0,2.04,1.5);
screenLight.castShadow=true;
screenLight.shadow.mapSize.set(1024,1024);
screenLight.shadow.bias=-.0003;
scene.add(screenLight);

const target=new THREE.Vector3();
const widePosition=new THREE.Vector3();
const focusPosition=new THREE.Vector3();
const wideTarget=new THREE.Vector3(0,1.15,0);
const focusTarget=new THREE.Vector3(0,2.04,.84);
let focusAmount=0;
function resize(){
 const w=stage.clientWidth,h=stage.clientHeight;
 camera.aspect=w/h;
 camera.fov=w<740?47:41;
 camera.updateProjectionMatrix();
 renderer.setSize(w,h);cssRenderer.setSize(w,h);
}
window.addEventListener('resize',resize);resize();
const reduced=window.matchMedia('(prefers-reduced-motion:reduce)');
function animate(){
 requestAnimationFrame(animate);
 const now=performance.now();
 mouse.position.x=THREE.MathUtils.lerp(mouse.position.x,mouseTargetX,.18);
 mouse.position.z=THREE.MathUtils.lerp(mouse.position.z,mouseTargetZ,.18);
 mouse.rotation.x=THREE.MathUtils.lerp(mouse.rotation.x,now<mouseClickUntil?-.025:0,.22);
 for(const keyMesh of keycaps){
  const pressed=now-(keyMesh.userData.lastPress||0)<110;
  keyMesh.position.y=THREE.MathUtils.lerp(keyMesh.position.y,pressed?.14:.185,.34);
 }
 const narrow=stage.clientWidth<740;
 const aspect=stage.clientWidth/stage.clientHeight;
 let distance=narrow?Math.max(15.5,8.7/aspect):Math.max(14.5,8.4/aspect);
 if(stage.clientHeight<650&&!narrow)distance=Math.max(distance,15);
 const offsetY=narrow?1.12:1.15;
 wideTarget.y=offsetY;
 widePosition.set(0,offsetY+Math.sin(.12)*distance,distance);
 const halfFov=THREE.MathUtils.degToRad(camera.fov/2);
 const fitHeight=3.43/(2*Math.tan(halfFov));
 const fitWidth=4.65/(2*Math.tan(halfFov)*aspect);
 focusPosition.set(0,2.04,.84+Math.max(fitHeight,fitWidth)*1.065);
 focusAmount=THREE.MathUtils.lerp(focusAmount,screenFocused?1:0,reduced.matches?1:.12);
 if(Math.abs(focusAmount-(screenFocused?1:0))<.001)focusAmount=screenFocused?1:0;
 camera.position.copy(widePosition).lerp(focusPosition,focusAmount);
 target.copy(wideTarget).lerp(focusTarget,focusAmount);
 camera.lookAt(target);
 renderer.render(scene,camera);cssRenderer.render(cssScene,camera);
}
animate();
window.addEventListener('error',event=>{if(String(event.message||'').includes('WebGL')){loadingState.hidden=false;loadingState.textContent='3D 화면을 불러올 수 없습니다';}});
