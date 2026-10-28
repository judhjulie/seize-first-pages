import * as THREE from 'three';

// Every surface and object in the room is created in Three.js. The canvas maps
// below are generated at runtime for material grain; no room photograph is used.
export function buildRetroRoom(scene){
 const room=new THREE.Group();room.scale.x=.7;scene.add(room);
 let seed=2087;
 const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
 function texture(kind){
  const canvas=document.createElement('canvas');canvas.width=canvas.height=512;
  const c=canvas.getContext('2d');
  c.fillStyle=kind==='wood'?'#6f4932':kind==='wall'?'#655a52':'#263346';c.fillRect(0,0,512,512);
  if(kind==='wood'){
   for(let i=0;i<440;i++){
    const y=random()*512,alpha=.015+random()*.09;
    c.strokeStyle=random()>.5?`rgba(21,13,10,${alpha})`:`rgba(222,173,115,${alpha})`;
    c.lineWidth=.3+random()*2.5;c.beginPath();c.moveTo(0,y);
    c.bezierCurveTo(150,y+(random()-.5)*9,350,y+(random()-.5)*9,512,y+(random()-.5)*13);c.stroke();
   }
  }else{
   for(let i=0;i<17000;i++){
    const v=Math.floor(random()*255),a=(kind==='wall'?.025:.035)+random()*.055;
    c.fillStyle=`rgba(${v},${v},${v},${a})`;c.fillRect(random()*512,random()*512,1+random()*3,1+random()*3);
   }
  }
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;
  map.wrapS=map.wrapT=THREE.RepeatWrapping;map.anisotropy=4;
  return map;
 }
 const woodMap=texture('wood'),wallMap=texture('wall'),nightMap=texture('night');
 const wood=new THREE.MeshStandardMaterial({map:woodMap,color:0xbfa089,roughness:.86});
 const darkWood=new THREE.MeshStandardMaterial({color:0x312720,roughness:.95});
 const plaster=new THREE.MeshStandardMaterial({map:wallMap,color:0xbcb0a5,roughness:1});
 const blackMetal=new THREE.MeshStandardMaterial({color:0x222626,roughness:.43,metalness:.36});
 const paper=new THREE.MeshStandardMaterial({color:0xbeb5a4,roughness:1});
 const glass=new THREE.MeshStandardMaterial({map:nightMap,color:0x172432,roughness:.22,metalness:.12});
 function box(w,h,d,mat,x,y,z){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;room.add(m);return m}
 function cylinder(rt,rb,h,mat,x,y,z,segments=32){const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,segments),mat);m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;room.add(m);return m}
 function rod(a,b,r,mat){const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),dir=end.clone().sub(start);const m=new THREE.Mesh(new THREE.CylinderGeometry(r,r,dir.length(),12),mat);m.position.copy(start.add(end).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),dir.normalize());m.castShadow=true;room.add(m);return m}
 function plane(w,h,mat,x,y,z){const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat);m.position.set(x,y,z);m.receiveShadow=true;room.add(m);return m}

 // Enclose the camera in a real mesh room so every visible background edge is
 // rendered by Three.js rather than the page background.
 plane(27,13,plaster,0,1.65,-6.4);
 const leftWall=box(.24,12.7,25,plaster,-13.35,1.65,5.8);
 const rightWall=box(.24,12.7,25,plaster,13.35,1.65,5.8);
 const ceiling=box(27,.18,25,plaster,0,8.16,5.8);
 leftWall.castShadow=rightWall.castShadow=ceiling.castShadow=false;
 for(const x of [-13.16,13.16])box(.16,.34,24.7,darkWood,x,-3.35,5.8).castShadow=false;
 for(const x of [-11.9,-4.4,4.4,11.9])box(.11,12.1,.12,darkWood,x,1.65,-6.13).castShadow=false;
 box(26.8,.24,.18,darkWood,0,7.91,-6.12).castShadow=false;
 box(27,.13,.18,darkWood,0,-2.43,-6.15);
 box(18.5,.28,7.5,wood,0,-2.12,1.25);
 box(18.5,.12,.14,darkWood,0,-2.13,5.03);
 box(18.5,1.25,.24,darkWood,0,-2.91,4.86);
 for(const x of [-8.7,8.7])box(.4,1.1,5.9,darkWood,x,-2.95,1.1);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(28,20),new THREE.MeshStandardMaterial({map:woodMap,color:0x644532,roughness:.93}));
 floor.rotation.x=-Math.PI/2;floor.position.set(0,-3.53,1);floor.receiveShadow=true;room.add(floor);

 // Large nighttime window. Frames, curtains and distant pin lights have depth.
 const wx=7.55,wy=2.4,wz=-6.06;
 plane(4.85,4.65,new THREE.MeshBasicMaterial({color:0x0c1824}),wx,wy,wz-.025);
 plane(4.45,4.25,glass,wx,wy,wz+.015);
 for(const dx of [-2.4,0,2.4])box(.12,4.8,.18,blackMetal,wx+dx,wy,wz+.13);
 for(const dy of [-2.33,0,2.33])box(4.95,.12,.18,blackMetal,wx,wy+dy,wz+.13);
 for(let i=0;i<18;i++){
  const x=wx+(random()-.5)*4.2,y=wy+(random()-.5)*3.8;
  const star=new THREE.Mesh(new THREE.SphereGeometry(.009+random()*.015,6,6),new THREE.MeshBasicMaterial({color:0x243442}));
  star.position.set(x,y,wz+.045);room.add(star);
 }
 const curtainMat=new THREE.MeshStandardMaterial({color:0x898174,roughness:1,side:THREE.DoubleSide});
 for(const edge of [-1,1]){
  const verts=[],inds=[],steps=24,width=.95,height=5.15;
  for(let i=0;i<=steps;i++){
   const t=i/steps,x=wx+edge*2.43+edge*t*width,z=wz+.32+Math.sin(t*Math.PI*5)*.12;
   verts.push(x,wy+height/2,z,x,wy-height/2,z);
   if(i<steps){const q=i*2;inds.push(q,q+1,q+2,q+1,q+3,q+2)}
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));g.setIndex(inds);g.computeVertexNormals();
  const m=new THREE.Mesh(g,curtainMat);m.castShadow=true;room.add(m);
 }
 // The desk lamp is switched off; the monitor is the room's light source.
 const lx=-7.3;
 cylinder(.34,.43,.1,blackMetal,lx,-1.92,1.2);
 rod([lx,-1.87,1.2],[lx-.4,.25,.75],.065,blackMetal);
 rod([lx-.4,.25,.75],[-5.7,1.63,.7],.055,blackMetal);
 for(const p of [[lx-.4,.25,.75],[-5.7,1.63,.7]]){
  const joint=new THREE.Mesh(new THREE.SphereGeometry(.13,16,12),blackMetal);joint.position.set(...p);room.add(joint);
 }
 const shade=cylinder(.28,.71,.63,blackMetal,-5.4,1.39,.95);shade.rotation.z=-.16;
 const lightDisk=new THREE.Mesh(new THREE.CircleGeometry(.6,32),new THREE.MeshStandardMaterial({color:0x191c1e,side:THREE.DoubleSide}));
 lightDisk.rotation.x=Math.PI/2;lightDisk.position.set(-5.4,1.05,.95);room.add(lightDisk);

 // Bookshelf at far left, worn books on the desk, and small wall prints.
 for(const x of [-10.7,-8.75])box(.22,5.1,.72,darkWood,x,.45,-5.05);
 for(let shelf=0;shelf<4;shelf++){
  const y=-1.8+shelf*1.35;box(2.16,.12,.82,darkWood,-9.72,y,-5.03);
  for(let i=0;i<7;i++){
   const height=.58+random()*.48;
   const colors=[0x6b5545,0x34404a,0x76705d,0x453d3a,0x8b7455];
   const mat=new THREE.MeshStandardMaterial({color:colors[(i+shelf)%colors.length],roughness:.95});
   const book=box(.15+random()*.1,height,.48,mat,-10.47+i*.24,y+.07+height/2,-5.0);book.rotation.z=(random()-.5)*.07;
  }
 }
 for(let i=0;i<9;i++){
  const colors=[0x555949,0x635446,0x263c4b,0x866c4d,0x494135];
  const mat=new THREE.MeshStandardMaterial({color:colors[i%colors.length],roughness:.96});
  const height=.57+random()*.65;
  box(.16+random()*.12,height,.45,mat,-7.65+i*.26,-1.98+height/2,-.15);
 }
 function framedArt(x,y,w,h,variant){
  box(w+.14,h+.14,.12,darkWood,x,y,-6.04);
  const canvas=document.createElement('canvas');canvas.width=384;canvas.height=256;const c=canvas.getContext('2d');
  const grad=c.createLinearGradient(0,0,0,256);grad.addColorStop(0,variant==='sea'?'#304e67':'#3b4550');grad.addColorStop(.6,variant==='sea'?'#7a8d91':'#726c60');grad.addColorStop(1,'#252e32');c.fillStyle=grad;c.fillRect(0,0,384,256);
  if(variant==='sea'){
   for(let i=0;i<36;i++){c.strokeStyle=`rgba(206,225,227,${.02+random()*.09})`;c.beginPath();const yy=165+random()*80;c.moveTo(0,yy);c.quadraticCurveTo(180,yy-10,384,yy+3);c.stroke()}
  }else{
   for(let i=0;i<24;i++){const xx=random()*384,hh=50+random()*120;c.fillStyle=`rgba(13,28,31,${.18+random()*.34})`;c.beginPath();c.moveTo(xx,236);c.lineTo(xx-18,236-hh*.35);c.lineTo(xx,236-hh);c.lineTo(xx+18,236-hh*.35);c.fill()}
  }
  const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;
  plane(w,h,new THREE.MeshStandardMaterial({map,roughness:1}),x,y,-5.965);
 }
 framedArt(-5.92,3.15,3.7,2.05,'forest');
 framedArt(3.55,3.35,1.45,1.2,'sea');
 for(const [x,y] of [[-7.4,1.3],[-6.85,.85],[4.2,.5]]){
  box(.73,.93,.025,paper,x,y,-6.0);
  box(.62,.53,.028,new THREE.MeshStandardMaterial({color:0x45535d,roughness:1}),x,y+.08,-5.96);
  cylinder(.026,.026,.02,new THREE.MeshBasicMaterial({color:0x988071}),x,y+.43,-5.94);
 }

 // Pencil holder, cup, papers and stacked recordings sit in front of the wall.
 const ceramic=new THREE.MeshStandardMaterial({color:0x746b62,roughness:.65});
 cylinder(.2,.17,.44,ceramic,6.45,-1.74,.1);
 for(let i=0;i<7;i++){
  const x=6.45+(random()-.5)*.25,z=.1+(random()-.5)*.23;
  const pencil=rod([x,-1.61,z],[x+(random()-.5)*.15,-.85-random()*.25,z+(random()-.5)*.1],.014,i%3===0?paper:darkWood);pencil.castShadow=true;
 }
 cylinder(.26,.21,.17,ceramic,4.65,-1.89,1.2);
 for(let i=0;i<3;i++)box(.72,.08,.58,new THREE.MeshStandardMaterial({color:i===1?0x655b4c:0x352d28,roughness:.83}),-4.2,-1.91+i*.08,.3+i*.02);
 return room;
}
