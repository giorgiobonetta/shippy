(()=>{var Cd=0,ac=1,Rd=2;var Wa=1,Pd=2,Vr=3,Wr=0,Qt=1,Ri=2,qi=0,$a=1,qa=2,sc=3,oc=4,Id=5;var $r=100,Ld=101,Dd=102,Nd=103,Ud=104,Fd=200,Od=201,Bd=202,kd=203,zd=204,Gd=205,Hd=206,Vd=207,Wd=208,$d=209,qd=210,Xd=211,jd=212,Yd=213,Zd=214,lc=0,cc=1,uc=2,No=3,dc=4,hc=5,pc=6,mc=7,Jd=0,Kd=1,Qd=2,Fi=0,fc=1,gc=2,vc=3,Xa=4,yc=5,_c=6,xc=7;var bc=300,qr=301,ir=302,Uo=303,Fo=304,ja=306,Gs=1e3,Dn=1001,Hs=1002,Ai=1003,eh=1004;var Ya=1005;var Kt=1006,Oo=1007;var nr=1008;var _i=1009,Mc=1010,Sc=1011,Xr=1012,Bo=1013,mn=1014,Oi=1015,Xi=1016,ko=1017,zo=1018,jr=1020,Tc=35902,Ec=35899,th=1021,ih=1022,Bi=1023,Bn=1026,rr=1027,wc=1028,Go=1029,ar=1030,Ac=1031;var Cc=1033,Ho=33776,Vo=33777,Wo=33778,$o=33779,Rc=35840,Pc=35841,Ic=35842,Lc=35843,Dc=36196,Nc=37492,Uc=37496,Fc=37488,Oc=37489,qo=37490,Bc=37491,kc=37808,zc=37809,Gc=37810,Hc=37811,Vc=37812,Wc=37813,$c=37814,qc=37815,Xc=37816,jc=37817,Yc=37818,Zc=37819,Jc=37820,Kc=37821,Qc=36492,eu=36494,tu=36495,iu=36283,nu=36284,Xo=36285,ru=36286;var ga=2300,Vs=2301,Bs=2302,ql=2303,Xl=2400,jl=2401,Yl=2402;var au=0,nh=1,sr="",jt="srgb",va="srgb-linear",ya="linear",dt="srgb";var Zn=7680;var rh=512,ah=513,sh=514,jo=515,oh=516,lh=517,Yo=518,ch=519,Zl=35044;var su="300 es",cn=2e3,Rr=2001;function em(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Pr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function uh(){let r=Pr("canvas");return r.style.display="block",r}var Zu={},Ir=null;function ou(...r){let e="THREE."+r.shift();Ir?Ir("log",e,...r):console.log(e,...r)}function dh(r){let e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function ke(...r){let e="THREE."+(r=dh(r)).shift();if(Ir)Ir("warn",e,...r);else{let t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function Ge(...r){let e="THREE."+(r=dh(r)).shift();if(Ir)Ir("error",e,...r);else{let t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function Kn(...r){let e=r.join(" ");e in Zu||(Zu[e]=!0,ke(...r))}function hh(r,e,t){return new Promise(function(i,n){setTimeout(function a(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:n();break;case r.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:i()}},t)})}var ph={[lc]:1,[uc]:6,[dc]:7,[No]:5,[cc]:0,[pc]:2,[mc]:4,[hc]:3},$i=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i!==void 0&&i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let n=i[e];if(n!==void 0){let a=n.indexOf(t);a!==-1&&n.splice(a,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let n=i.slice(0);for(let a=0,s=n.length;a<s;a++)n[a].call(this,e);e.target=null}}},Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ks=Math.PI/180,Ws=180/Math.PI;function Yr(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,i=4294967295*Math.random()|0;return(Zt[255&r]+Zt[r>>8&255]+Zt[r>>16&255]+Zt[r>>24&255]+"-"+Zt[255&e]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[63&t|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[255&i]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]).toLowerCase()}function et(r,e,t){return Math.max(e,Math.min(t,r))}function tm(r,e){return(r%e+e)%e}function yl(r,e,t){return(1-t)*r+t*e}function la(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function li(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var pe=class r{static{r.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,n=e.elements;return this.x=n[0]*t+n[3]*i+n[6],this.y=n[1]*t+n[4]*i+n[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),n=Math.sin(t),a=this.x-e.x,s=this.y-e.y;return this.x=a*i-s*n+e.x,this.y=a*n+s*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ci=class{constructor(e=0,t=0,i=0,n=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=n}static slerpFlat(e,t,i,n,a,s,o){let u=i[n+0],c=i[n+1],d=i[n+2],g=i[n+3],f=a[s+0],p=a[s+1],b=a[s+2],y=a[s+3];if(g!==y||u!==f||c!==p||d!==b){let S=u*f+c*p+d*b+g*y;S<0&&(f=-f,p=-p,b=-b,y=-y,S=-S);let x=1-o;if(S<.9995){let M=Math.acos(S),E=Math.sin(M);x=Math.sin(x*M)/E,u=u*x+f*(o=Math.sin(o*M)/E),c=c*x+p*o,d=d*x+b*o,g=g*x+y*o}else{u=u*x+f*o,c=c*x+p*o,d=d*x+b*o,g=g*x+y*o;let M=1/Math.sqrt(u*u+c*c+d*d+g*g);u*=M,c*=M,d*=M,g*=M}}e[t]=u,e[t+1]=c,e[t+2]=d,e[t+3]=g}static multiplyQuaternionsFlat(e,t,i,n,a,s){let o=i[n],u=i[n+1],c=i[n+2],d=i[n+3],g=a[s],f=a[s+1],p=a[s+2],b=a[s+3];return e[t]=o*b+d*g+u*p-c*f,e[t+1]=u*b+d*f+c*g-o*p,e[t+2]=c*b+d*p+o*f-u*g,e[t+3]=d*b-o*g-u*f-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,n){return this._x=e,this._y=t,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,n=e._y,a=e._z,s=e._order,o=Math.cos,u=Math.sin,c=o(i/2),d=o(n/2),g=o(a/2),f=u(i/2),p=u(n/2),b=u(a/2);switch(s){case"XYZ":this._x=f*d*g+c*p*b,this._y=c*p*g-f*d*b,this._z=c*d*b+f*p*g,this._w=c*d*g-f*p*b;break;case"YXZ":this._x=f*d*g+c*p*b,this._y=c*p*g-f*d*b,this._z=c*d*b-f*p*g,this._w=c*d*g+f*p*b;break;case"ZXY":this._x=f*d*g-c*p*b,this._y=c*p*g+f*d*b,this._z=c*d*b+f*p*g,this._w=c*d*g-f*p*b;break;case"ZYX":this._x=f*d*g-c*p*b,this._y=c*p*g+f*d*b,this._z=c*d*b-f*p*g,this._w=c*d*g+f*p*b;break;case"YZX":this._x=f*d*g+c*p*b,this._y=c*p*g+f*d*b,this._z=c*d*b-f*p*g,this._w=c*d*g-f*p*b;break;case"XZY":this._x=f*d*g-c*p*b,this._y=c*p*g-f*d*b,this._z=c*d*b+f*p*g,this._w=c*d*g+f*p*b;break;default:ke("Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,n=Math.sin(i);return this._x=e.x*n,this._y=e.y*n,this._z=e.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],n=t[4],a=t[8],s=t[1],o=t[5],u=t[9],c=t[2],d=t[6],g=t[10],f=i+o+g;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(d-u)*p,this._y=(a-c)*p,this._z=(s-n)*p}else if(i>o&&i>g){let p=2*Math.sqrt(1+i-o-g);this._w=(d-u)/p,this._x=.25*p,this._y=(n+s)/p,this._z=(a+c)/p}else if(o>g){let p=2*Math.sqrt(1+o-i-g);this._w=(a-c)/p,this._x=(n+s)/p,this._y=.25*p,this._z=(u+d)/p}else{let p=2*Math.sqrt(1+g-i-o);this._w=(s-n)/p,this._x=(a+c)/p,this._y=(u+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(et(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let n=Math.min(1,t/i);return this.slerp(e,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,n=e._y,a=e._z,s=e._w,o=t._x,u=t._y,c=t._z,d=t._w;return this._x=i*d+s*o+n*c-a*u,this._y=n*d+s*u+a*o-i*c,this._z=a*d+s*c+i*u-n*o,this._w=s*d-i*o-n*u-a*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,n=e._y,a=e._z,s=e._w,o=this.dot(e);o<0&&(i=-i,n=-n,a=-a,s=-s,o=-o);let u=1-t;if(o<.9995){let c=Math.acos(o),d=Math.sin(c);u=Math.sin(u*c)/d,t=Math.sin(t*c)/d,this._x=this._x*u+i*t,this._y=this._y*u+n*t,this._z=this._z*u+a*t,this._w=this._w*u+s*t,this._onChangeCallback()}else this._x=this._x*u+i*t,this._y=this._y*u+n*t,this._z=this._z*u+a*t,this._w=this._w*u+s*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(n*Math.sin(e),n*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class r{static{r.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ju.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ju.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,n=this.z,a=e.elements;return this.x=a[0]*t+a[3]*i+a[6]*n,this.y=a[1]*t+a[4]*i+a[7]*n,this.z=a[2]*t+a[5]*i+a[8]*n,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,a=e.elements,s=1/(a[3]*t+a[7]*i+a[11]*n+a[15]);return this.x=(a[0]*t+a[4]*i+a[8]*n+a[12])*s,this.y=(a[1]*t+a[5]*i+a[9]*n+a[13])*s,this.z=(a[2]*t+a[6]*i+a[10]*n+a[14])*s,this}applyQuaternion(e){let t=this.x,i=this.y,n=this.z,a=e.x,s=e.y,o=e.z,u=e.w,c=2*(s*n-o*i),d=2*(o*t-a*n),g=2*(a*i-s*t);return this.x=t+u*c+s*g-o*d,this.y=i+u*d+o*c-a*g,this.z=n+u*g+a*d-s*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,n=this.z,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*n,this.y=a[1]*t+a[5]*i+a[9]*n,this.z=a[2]*t+a[6]*i+a[10]*n,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,n=e.y,a=e.z,s=t.x,o=t.y,u=t.z;return this.x=n*u-a*o,this.y=a*s-i*u,this.z=i*o-n*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return _l.copy(this).projectOnVector(e),this.sub(_l)}reflect(e){return this.sub(_l.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(et(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,n=this.z-e.z;return t*t+i*i+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let n=Math.sin(t)*e;return this.x=n*Math.sin(i),this.y=Math.cos(t)*e,this.z=n*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),n=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=n,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},_l=new U,Ju=new Ci,Xe=class r{static{r.prototype.isMatrix3=!0}constructor(e,t,i,n,a,s,o,u,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,n,a,s,o,u,c)}set(e,t,i,n,a,s,o,u,c){let d=this.elements;return d[0]=e,d[1]=n,d[2]=o,d[3]=t,d[4]=a,d[5]=u,d[6]=i,d[7]=s,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,a=this.elements,s=i[0],o=i[3],u=i[6],c=i[1],d=i[4],g=i[7],f=i[2],p=i[5],b=i[8],y=n[0],S=n[3],x=n[6],M=n[1],E=n[4],C=n[7],L=n[2],w=n[5],k=n[8];return a[0]=s*y+o*M+u*L,a[3]=s*S+o*E+u*w,a[6]=s*x+o*C+u*k,a[1]=c*y+d*M+g*L,a[4]=c*S+d*E+g*w,a[7]=c*x+d*C+g*k,a[2]=f*y+p*M+b*L,a[5]=f*S+p*E+b*w,a[8]=f*x+p*C+b*k,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],n=e[2],a=e[3],s=e[4],o=e[5],u=e[6],c=e[7],d=e[8];return t*s*d-t*o*c-i*a*d+i*o*u+n*a*c-n*s*u}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],a=e[3],s=e[4],o=e[5],u=e[6],c=e[7],d=e[8],g=d*s-o*c,f=o*u-d*a,p=c*a-s*u,b=t*g+i*f+n*p;if(b===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/b;return e[0]=g*y,e[1]=(n*c-d*i)*y,e[2]=(o*i-n*s)*y,e[3]=f*y,e[4]=(d*t-n*u)*y,e[5]=(n*a-o*t)*y,e[6]=p*y,e[7]=(i*u-c*t)*y,e[8]=(s*t-i*a)*y,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,n,a,s,o){let u=Math.cos(a),c=Math.sin(a);return this.set(i*u,i*c,-i*(u*s+c*o)+s+e,-n*c,n*u,-n*(-c*s+u*o)+o+t,0,0,1),this}scale(e,t){return Kn("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(xl.makeScale(e,t)),this}rotate(e){return Kn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(xl.makeRotation(-e)),this}translate(e,t){return Kn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(xl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<9;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},xl=new Xe,Ku=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Qu=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function im(){let r={enabled:!0,workingColorSpace:va,spaces:{},convert:function(n,a,s){return this.enabled!==!1&&a!==s&&a&&s&&(this.spaces[a].transfer===dt&&(n.r=ln(n.r),n.g=ln(n.g),n.b=ln(n.b)),this.spaces[a].primaries!==this.spaces[s].primaries&&(n.applyMatrix3(this.spaces[a].toXYZ),n.applyMatrix3(this.spaces[s].fromXYZ)),this.spaces[s].transfer===dt&&(n.r=Cr(n.r),n.g=Cr(n.g),n.b=Cr(n.b))),n},workingToColorSpace:function(n,a){return this.convert(n,this.workingColorSpace,a)},colorSpaceToWorking:function(n,a){return this.convert(n,a,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===""?ya:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,a=this.workingColorSpace){return n.fromArray(this.spaces[a].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,a,s){return n.copy(this.spaces[a].toXYZ).multiply(this.spaces[s].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,a){return Kn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(n,a)},toWorkingColorSpace:function(n,a){return Kn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(n,a)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return r.define({[va]:{primaries:e,whitePoint:i,transfer:ya,toXYZ:Ku,fromXYZ:Qu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:e,whitePoint:i,transfer:dt,toXYZ:Ku,fromXYZ:Qu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}}),r}var rt=im();function ln(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function Cr(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}var gr,$s=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{gr===void 0&&(gr=Pr("canvas")),gr.width=e.width,gr.height=e.height;let n=gr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),i=gr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Pr("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let n=i.getImageData(0,0,e.width,e.height),a=n.data;for(let s=0;s<a.length;s++)a[s]=255*ln(a[s]/255);return i.putImageData(n,0,0),t}if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(255*ln(t[i]/255)):t[i]=ln(t[i]);return{data:t,width:e.width,height:e.height}}return ke("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},nm=0,Lr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:nm++}),this.uuid=Yr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let a;if(Array.isArray(n)){a=[];for(let s=0,o=n.length;s<o;s++)n[s].isDataTexture?a.push(bl(n[s].image)):a.push(bl(n[s]))}else a=bl(n);i.url=a}return t||(e.images[this.uuid]=i),i}};function bl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?$s.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ke("Texture: Unable to serialize Texture."),{})}var rm=0,Ml=new U,ti=class r extends $i{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,i=1001,n=1001,a=1006,s=1008,o=1023,u=1009,c=r.DEFAULT_ANISOTROPY,d=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=Yr(),this.name="",this.source=new Lr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=a,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=u,this.offset=new pe(0,0),this.repeat=new pe(1,1),this.center=new pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ml).x}get height(){return this.source.getSize(Ml).y}get depth(){return this.source.getSize(Ml).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){ke(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let n=this[t];n!==void 0?n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[t]=i:ke(`Texture.setValues(): property '${t}' does not exist.`)}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Gs:e.x=e.x-Math.floor(e.x);break;case Dn:e.x=e.x<0?0:1;break;case Hs:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Gs:e.y=e.y-Math.floor(e.y);break;case Dn:e.y=e.y<0?0:1;break;case Hs:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};ti.DEFAULT_IMAGE=null,ti.DEFAULT_MAPPING=bc,ti.DEFAULT_ANISOTROPY=1;var pt=class r{static{r.prototype.isVector4=!0}constructor(e=0,t=0,i=0,n=1){this.x=e,this.y=t,this.z=i,this.w=n}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,n){return this.x=e,this.y=t,this.z=i,this.w=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,n=this.z,a=this.w,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*n+s[12]*a,this.y=s[1]*t+s[5]*i+s[9]*n+s[13]*a,this.z=s[2]*t+s[6]*i+s[10]*n+s[14]*a,this.w=s[3]*t+s[7]*i+s[11]*n+s[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,n,a,u=e.elements,c=u[0],d=u[4],g=u[8],f=u[1],p=u[5],b=u[9],y=u[2],S=u[6],x=u[10];if(Math.abs(d-f)<.01&&Math.abs(g-y)<.01&&Math.abs(b-S)<.01){if(Math.abs(d+f)<.1&&Math.abs(g+y)<.1&&Math.abs(b+S)<.1&&Math.abs(c+p+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let E=(c+1)/2,C=(p+1)/2,L=(x+1)/2,w=(d+f)/4,k=(g+y)/4,W=(b+S)/4;return E>C&&E>L?E<.01?(i=0,n=.707106781,a=.707106781):(i=Math.sqrt(E),n=w/i,a=k/i):C>L?C<.01?(i=.707106781,n=0,a=.707106781):(n=Math.sqrt(C),i=w/n,a=W/n):L<.01?(i=.707106781,n=.707106781,a=0):(a=Math.sqrt(L),i=k/a,n=W/a),this.set(i,n,a,t),this}let M=Math.sqrt((S-b)*(S-b)+(g-y)*(g-y)+(f-d)*(f-d));return Math.abs(M)<.001&&(M=1),this.x=(S-b)/M,this.y=(g-y)/M,this.z=(f-d)/M,this.w=Math.acos((c+p+x-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=et(this.x,e.x,t.x),this.y=et(this.y,e.y,t.y),this.z=et(this.z,e.z,t.z),this.w=et(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=et(this.x,e,t),this.y=et(this.y,e,t),this.z=et(this.z,e,t),this.w=et(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(et(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},qs=class extends $i{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new pt(0,0,e,t),this.scissorTest=!1,this.viewport=new pt(0,0,e,t),this.textures=[];let n={width:e,height:t,depth:i.depth},a=new ti(n),s=i.count;for(let o=0;o<s;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let n=0,a=this.textures.length;n<a;n++)this.textures[n].image.width=e,this.textures[n].image.height=t,this.textures[n].image.depth=i,this.textures[n].isData3DTexture!==!0&&(this.textures[n].isArrayTexture=this.textures[n].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Lr(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},vi=class extends qs{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},_a=class extends ti{constructor(e=null,t=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Ai,this.minFilter=Ai,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Xs=class extends ti{constructor(e=null,t=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:n},this.magFilter=Ai,this.minFilter=Ai,this.wrapR=Dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Je=class r{static{r.prototype.isMatrix4=!0}constructor(e,t,i,n,a,s,o,u,c,d,g,f,p,b,y,S){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,n,a,s,o,u,c,d,g,f,p,b,y,S)}set(e,t,i,n,a,s,o,u,c,d,g,f,p,b,y,S){let x=this.elements;return x[0]=e,x[4]=t,x[8]=i,x[12]=n,x[1]=a,x[5]=s,x[9]=o,x[13]=u,x[2]=c,x[6]=d,x[10]=g,x[14]=f,x[3]=p,x[7]=b,x[11]=y,x[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,n=1/vr.setFromMatrixColumn(e,0).length(),a=1/vr.setFromMatrixColumn(e,1).length(),s=1/vr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*n,t[1]=i[1]*n,t[2]=i[2]*n,t[3]=0,t[4]=i[4]*a,t[5]=i[5]*a,t[6]=i[6]*a,t[7]=0,t[8]=i[8]*s,t[9]=i[9]*s,t[10]=i[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,n=e.y,a=e.z,s=Math.cos(i),o=Math.sin(i),u=Math.cos(n),c=Math.sin(n),d=Math.cos(a),g=Math.sin(a);if(e.order==="XYZ"){let f=s*d,p=s*g,b=o*d,y=o*g;t[0]=u*d,t[4]=-u*g,t[8]=c,t[1]=p+b*c,t[5]=f-y*c,t[9]=-o*u,t[2]=y-f*c,t[6]=b+p*c,t[10]=s*u}else if(e.order==="YXZ"){let f=u*d,p=u*g,b=c*d,y=c*g;t[0]=f+y*o,t[4]=b*o-p,t[8]=s*c,t[1]=s*g,t[5]=s*d,t[9]=-o,t[2]=p*o-b,t[6]=y+f*o,t[10]=s*u}else if(e.order==="ZXY"){let f=u*d,p=u*g,b=c*d,y=c*g;t[0]=f-y*o,t[4]=-s*g,t[8]=b+p*o,t[1]=p+b*o,t[5]=s*d,t[9]=y-f*o,t[2]=-s*c,t[6]=o,t[10]=s*u}else if(e.order==="ZYX"){let f=s*d,p=s*g,b=o*d,y=o*g;t[0]=u*d,t[4]=b*c-p,t[8]=f*c+y,t[1]=u*g,t[5]=y*c+f,t[9]=p*c-b,t[2]=-c,t[6]=o*u,t[10]=s*u}else if(e.order==="YZX"){let f=s*u,p=s*c,b=o*u,y=o*c;t[0]=u*d,t[4]=y-f*g,t[8]=b*g+p,t[1]=g,t[5]=s*d,t[9]=-o*d,t[2]=-c*d,t[6]=p*g+b,t[10]=f-y*g}else if(e.order==="XZY"){let f=s*u,p=s*c,b=o*u,y=o*c;t[0]=u*d,t[4]=-g,t[8]=c*d,t[1]=f*g+y,t[5]=s*d,t[9]=p*g-b,t[2]=b*g-p,t[6]=o*d,t[10]=y*g+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(am,e,sm)}lookAt(e,t,i){let n=this.elements;return mi.subVectors(e,t),mi.lengthSq()===0&&(mi.z=1),mi.normalize(),En.crossVectors(i,mi),En.lengthSq()===0&&(Math.abs(i.z)===1?mi.x+=1e-4:mi.z+=1e-4,mi.normalize(),En.crossVectors(i,mi)),En.normalize(),ds.crossVectors(mi,En),n[0]=En.x,n[4]=ds.x,n[8]=mi.x,n[1]=En.y,n[5]=ds.y,n[9]=mi.y,n[2]=En.z,n[6]=ds.z,n[10]=mi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,n=t.elements,a=this.elements,s=i[0],o=i[4],u=i[8],c=i[12],d=i[1],g=i[5],f=i[9],p=i[13],b=i[2],y=i[6],S=i[10],x=i[14],M=i[3],E=i[7],C=i[11],L=i[15],w=n[0],k=n[4],W=n[8],G=n[12],H=n[1],K=n[5],q=n[9],se=n[13],ee=n[2],Z=n[6],v=n[10],$=n[14],ue=n[3],_e=n[7],Ne=n[11],Ae=n[15];return a[0]=s*w+o*H+u*ee+c*ue,a[4]=s*k+o*K+u*Z+c*_e,a[8]=s*W+o*q+u*v+c*Ne,a[12]=s*G+o*se+u*$+c*Ae,a[1]=d*w+g*H+f*ee+p*ue,a[5]=d*k+g*K+f*Z+p*_e,a[9]=d*W+g*q+f*v+p*Ne,a[13]=d*G+g*se+f*$+p*Ae,a[2]=b*w+y*H+S*ee+x*ue,a[6]=b*k+y*K+S*Z+x*_e,a[10]=b*W+y*q+S*v+x*Ne,a[14]=b*G+y*se+S*$+x*Ae,a[3]=M*w+E*H+C*ee+L*ue,a[7]=M*k+E*K+C*Z+L*_e,a[11]=M*W+E*q+C*v+L*Ne,a[15]=M*G+E*se+C*$+L*Ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],n=e[8],a=e[12],s=e[1],o=e[5],u=e[9],c=e[13],d=e[2],g=e[6],f=e[10],p=e[14],b=e[3],y=e[7],S=e[11],x=e[15],M=u*p-c*f,E=o*p-c*g,C=o*f-u*g,L=s*p-c*d,w=s*f-u*d,k=s*g-o*d;return t*(y*M-S*E+x*C)-i*(b*M-S*L+x*w)+n*(b*E-y*L+x*k)-a*(b*C-y*w+S*k)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],n=e[8],a=e[1],s=e[5],o=e[9],u=e[2],c=e[6],d=e[10];return t*(s*d-o*c)-i*(a*d-o*u)+n*(a*c-s*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let n=this.elements;return e.isVector3?(n[12]=e.x,n[13]=e.y,n[14]=e.z):(n[12]=e,n[13]=t,n[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],n=e[2],a=e[3],s=e[4],o=e[5],u=e[6],c=e[7],d=e[8],g=e[9],f=e[10],p=e[11],b=e[12],y=e[13],S=e[14],x=e[15],M=t*o-i*s,E=t*u-n*s,C=t*c-a*s,L=i*u-n*o,w=i*c-a*o,k=n*c-a*u,W=d*y-g*b,G=d*S-f*b,H=d*x-p*b,K=g*S-f*y,q=g*x-p*y,se=f*x-p*S,ee=M*se-E*q+C*K+L*H-w*G+k*W;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let Z=1/ee;return e[0]=(o*se-u*q+c*K)*Z,e[1]=(n*q-i*se-a*K)*Z,e[2]=(y*k-S*w+x*L)*Z,e[3]=(f*w-g*k-p*L)*Z,e[4]=(u*H-s*se-c*G)*Z,e[5]=(t*se-n*H+a*G)*Z,e[6]=(S*C-b*k-x*E)*Z,e[7]=(d*k-f*C+p*E)*Z,e[8]=(s*q-o*H+c*W)*Z,e[9]=(i*H-t*q-a*W)*Z,e[10]=(b*w-y*C+x*M)*Z,e[11]=(g*C-d*w-p*M)*Z,e[12]=(o*G-s*K-u*W)*Z,e[13]=(t*K-i*G+n*W)*Z,e[14]=(y*E-b*L-S*M)*Z,e[15]=(d*L-g*E+f*M)*Z,this}scale(e){let t=this.elements,i=e.x,n=e.y,a=e.z;return t[0]*=i,t[4]*=n,t[8]*=a,t[1]*=i,t[5]*=n,t[9]*=a,t[2]*=i,t[6]*=n,t[10]*=a,t[3]*=i,t[7]*=n,t[11]*=a,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],n=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,n))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),n=Math.sin(t),a=1-i,s=e.x,o=e.y,u=e.z,c=a*s,d=a*o;return this.set(c*s+i,c*o-n*u,c*u+n*o,0,c*o+n*u,d*o+i,d*u-n*s,0,c*u-n*o,d*u+n*s,a*u*u+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,n,a,s){return this.set(1,i,a,0,e,1,s,0,t,n,1,0,0,0,0,1),this}compose(e,t,i){let n=this.elements,a=t._x,s=t._y,o=t._z,u=t._w,c=a+a,d=s+s,g=o+o,f=a*c,p=a*d,b=a*g,y=s*d,S=s*g,x=o*g,M=u*c,E=u*d,C=u*g,L=i.x,w=i.y,k=i.z;return n[0]=(1-(y+x))*L,n[1]=(p+C)*L,n[2]=(b-E)*L,n[3]=0,n[4]=(p-C)*w,n[5]=(1-(f+x))*w,n[6]=(S+M)*w,n[7]=0,n[8]=(b+E)*k,n[9]=(S-M)*k,n[10]=(1-(f+y))*k,n[11]=0,n[12]=e.x,n[13]=e.y,n[14]=e.z,n[15]=1,this}decompose(e,t,i){let n=this.elements;e.x=n[12],e.y=n[13],e.z=n[14];let a=this.determinantAffine();if(a===0)return i.set(1,1,1),t.identity(),this;let s=vr.set(n[0],n[1],n[2]).length(),o=vr.set(n[4],n[5],n[6]).length(),u=vr.set(n[8],n[9],n[10]).length();a<0&&(s=-s),Ii.copy(this);let c=1/s,d=1/o,g=1/u;return Ii.elements[0]*=c,Ii.elements[1]*=c,Ii.elements[2]*=c,Ii.elements[4]*=d,Ii.elements[5]*=d,Ii.elements[6]*=d,Ii.elements[8]*=g,Ii.elements[9]*=g,Ii.elements[10]*=g,t.setFromRotationMatrix(Ii),i.x=s,i.y=o,i.z=u,this}makePerspective(e,t,i,n,a,s,o=2e3,u=!1){let c=this.elements,d=2*a/(t-e),g=2*a/(i-n),f=(t+e)/(t-e),p=(i+n)/(i-n),b,y;if(u)b=a/(s-a),y=s*a/(s-a);else if(o===cn)b=-(s+a)/(s-a),y=-2*s*a/(s-a);else{if(o!==Rr)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);b=-s/(s-a),y=-s*a/(s-a)}return c[0]=d,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=g,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=b,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,n,a,s,o=2e3,u=!1){let c=this.elements,d=2/(t-e),g=2/(i-n),f=-(t+e)/(t-e),p=-(i+n)/(i-n),b,y;if(u)b=1/(s-a),y=s/(s-a);else if(o===cn)b=-2/(s-a),y=-(s+a)/(s-a);else{if(o!==Rr)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);b=-1/(s-a),y=-a/(s-a)}return c[0]=d,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=g,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=b,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let n=0;n<16;n++)if(t[n]!==i[n])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},vr=new U,Ii=new Je,am=new U(0,0,0),sm=new U(1,1,1),En=new U,ds=new U,mi=new U,ed=new Je,td=new Ci,un=class r{constructor(e=0,t=0,i=0,n=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=n}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,n=this._order){return this._x=e,this._y=t,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let n=e.elements,a=n[0],s=n[4],o=n[8],u=n[1],c=n[5],d=n[9],g=n[2],f=n[6],p=n[10];switch(t){case"XYZ":this._y=Math.asin(et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-s,a)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-et(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(u,c)):(this._y=Math.atan2(-g,a),this._z=0);break;case"ZXY":this._x=Math.asin(et(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-g,p),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(u,a));break;case"ZYX":this._y=Math.asin(-et(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(u,a)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(et(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-g,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-et(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,p),this._y=0);break;default:ke("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return ed.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ed,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return td.setFromEuler(this),this.setFromQuaternion(td,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};un.DEFAULT_ORDER="XYZ";var xa=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},om=0,id=new U,yr=new Ci,tn=new Je,hs=new U,ca=new U,lm=new U,cm=new Ci,nd=new U(1,0,0),rd=new U(0,1,0),ad=new U(0,0,1),sd={type:"added"},um={type:"removed"},_r={type:"childadded",child:null},Sl={type:"childremoved",child:null},Yt=class r extends $i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:om++}),this.uuid=Yr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new U,t=new un,i=new Ci,n=new U(1,1,1);t._onChange(function(){i.setFromEuler(t,!1)}),i._onChange(function(){t.setFromQuaternion(i,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new Je},normalMatrix:{value:new Xe}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return yr.setFromAxisAngle(e,t),this.quaternion.multiply(yr),this}rotateOnWorldAxis(e,t){return yr.setFromAxisAngle(e,t),this.quaternion.premultiply(yr),this}rotateX(e){return this.rotateOnAxis(nd,e)}rotateY(e){return this.rotateOnAxis(rd,e)}rotateZ(e){return this.rotateOnAxis(ad,e)}translateOnAxis(e,t){return id.copy(e).applyQuaternion(this.quaternion),this.position.add(id.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(nd,e)}translateY(e){return this.translateOnAxis(rd,e)}translateZ(e){return this.translateOnAxis(ad,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(tn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?hs.copy(e):hs.set(e,t,i);let n=this.parent;this.updateWorldMatrix(!0,!1),ca.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?tn.lookAt(ca,hs,this.up):tn.lookAt(hs,ca,this.up),this.quaternion.setFromRotationMatrix(tn),n&&(tn.extractRotation(n.matrixWorld),yr.setFromRotationMatrix(tn),this.quaternion.premultiply(yr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ge("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sd),_r.child=e,this.dispatchEvent(_r),_r.child=null):Ge("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(um),Sl.child=e,this.dispatchEvent(Sl),Sl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(tn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sd),_r.child=e,this.dispatchEvent(_r),_r.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,n=this.children.length;i<n;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let n=this.children;for(let a=0,s=n.length;a<s;a++)n[a].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ca,e,lm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ca,cm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,n=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*i-a[8]*n,a[13]+=i-a[1]*t-a[5]*i-a[9]*n,a[14]+=n-a[2]*t-a[6]*i-a[10]*n}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,n=t.length;i<n;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let a=this.children;for(let s=0,o=a.length;s<o;s++)a[s].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let n={};function a(o,u){return o[u.uuid]===void 0&&(o[u.uuid]=u.toJSON(e)),u.uuid}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),this.static!==!1&&(n.static=this.static),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.pivot!==null&&(n.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(n.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(n.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(e),n.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON())),this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=a(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let u=o.shapes;if(Array.isArray(u))for(let c=0,d=u.length;c<d;c++){let g=u[c];a(e.shapes,g)}else a(e.shapes,u)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let u=0,c=this.material.length;u<c;u++)o.push(a(e.materials,this.material[u]));n.material=o}else n.material=a(e.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){let u=this.animations[o];n.animations.push(a(e.animations,u))}}if(t){let o=s(e.geometries),u=s(e.materials),c=s(e.textures),d=s(e.images),g=s(e.shapes),f=s(e.skeletons),p=s(e.animations),b=s(e.nodes);o.length>0&&(i.geometries=o),u.length>0&&(i.materials=u),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),g.length>0&&(i.shapes=g),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),b.length>0&&(i.nodes=b)}return i.object=n,i;function s(o){let u=[];for(let c in o){let d=o[c];delete d.metadata,u.push(d)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let n=e.children[i];this.add(n.clone())}return this}};Yt.DEFAULT_UP=new U(0,1,0),Yt.DEFAULT_MATRIX_AUTO_UPDATE=!0,Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Jn=class extends Yt{constructor(){super(),this.isGroup=!0,this.type="Group"}},dm={type:"move"},Dr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let n=null,a=null,s=null,o=this._targetRay,u=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){s=!0;for(let y of e.hand.values()){let S=t.getJointPose(y,i),x=this._getHandJoint(c,y);S!==null&&(x.matrix.fromArray(S.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=S.radius),x.visible=S!==null}let d=c.joints["index-finger-tip"],g=c.joints["thumb-tip"],f=d.position.distanceTo(g.position),p=.02,b=.005;c.inputState.pinching&&f>p+b?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=p-b&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,i),a!==null&&(u.matrix.fromArray(a.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,a.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(a.linearVelocity)):u.hasLinearVelocity=!1,a.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(a.angularVelocity)):u.hasAngularVelocity=!1,u.eventsEnabled&&u.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(n=t.getPose(e.targetRaySpace,i),n===null&&a!==null&&(n=a),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(dm)))}return o!==null&&(o.visible=n!==null),u!==null&&(u.visible=a!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Jn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},mh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wn={h:0,s:0,l:0},ps={h:0,s:0,l:0};function Tl(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}var $e=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let n=e;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,rt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,n=rt.workingColorSpace){return this.r=e,this.g=t,this.b=i,rt.colorSpaceToWorking(this,n),this}setHSL(e,t,i,n=rt.workingColorSpace){if(e=tm(e,1),t=et(t,0,1),i=et(i,0,1),t===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+t):i+t-i*t,s=2*i-a;this.r=Tl(s,a,e+1/3),this.g=Tl(s,a,e),this.b=Tl(s,a,e-1/3)}return rt.colorSpaceToWorking(this,n),this}setStyle(e,t=jt){function i(a){a!==void 0&&parseFloat(a)<1&&ke("Color: Alpha component of "+e+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(e)){let a,s=n[1],o=n[2];switch(s){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:ke("Color: Unknown color model "+e)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(e)){let a=n[1],s=a.length;if(s===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(s===6)return this.setHex(parseInt(a,16),t);ke("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){let i=mh[e.toLowerCase()];return i!==void 0?this.setHex(i,t):ke("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ln(e.r),this.g=ln(e.g),this.b=ln(e.b),this}copyLinearToSRGB(e){return this.r=Cr(e.r),this.g=Cr(e.g),this.b=Cr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return rt.workingToColorSpace(Jt.copy(this),e),65536*Math.round(et(255*Jt.r,0,255))+256*Math.round(et(255*Jt.g,0,255))+Math.round(et(255*Jt.b,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=rt.workingColorSpace){rt.workingToColorSpace(Jt.copy(this),t);let i=Jt.r,n=Jt.g,a=Jt.b,s=Math.max(i,n,a),o=Math.min(i,n,a),u,c,d=(o+s)/2;if(o===s)u=0,c=0;else{let g=s-o;switch(c=d<=.5?g/(s+o):g/(2-s-o),s){case i:u=(n-a)/g+(n<a?6:0);break;case n:u=(a-i)/g+2;break;case a:u=(i-n)/g+4}u/=6}return e.h=u,e.s=c,e.l=d,e}getRGB(e,t=rt.workingColorSpace){return rt.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=jt){rt.workingToColorSpace(Jt.copy(this),e);let t=Jt.r,i=Jt.g,n=Jt.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*i)},${Math.round(255*n)})`}offsetHSL(e,t,i){return this.getHSL(wn),this.setHSL(wn.h+e,wn.s+t,wn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(wn),e.getHSL(ps);let i=yl(wn.h,ps.h,t),n=yl(wn.s,ps.s,t),a=yl(wn.l,ps.l,t);return this.setHSL(i,n,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,n=this.b,a=e.elements;return this.r=a[0]*t+a[3]*i+a[6]*n,this.g=a[1]*t+a[4]*i+a[7]*n,this.b=a[2]*t+a[5]*i+a[8]*n,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Jt=new $e;$e.NAMES=mh;var ba=class r{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new $e(e),this.density=t}clone(){return new r(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Ma=class extends Yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new un,this.environmentIntensity=1,this.environmentRotation=new un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Li=new U,nn=new U,El=new U,rn=new U,xr=new U,br=new U,od=new U,wl=new U,Al=new U,Cl=new U,Rl=new pt,Pl=new pt,Il=new pt,on=class r{constructor(e=new U,t=new U,i=new U){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,n){n.subVectors(i,t),Li.subVectors(e,t),n.cross(Li);let a=n.lengthSq();return a>0?n.multiplyScalar(1/Math.sqrt(a)):n.set(0,0,0)}static getBarycoord(e,t,i,n,a){Li.subVectors(n,t),nn.subVectors(i,t),El.subVectors(e,t);let s=Li.dot(Li),o=Li.dot(nn),u=Li.dot(El),c=nn.dot(nn),d=nn.dot(El),g=s*c-o*o;if(g===0)return a.set(0,0,0),null;let f=1/g,p=(c*u-o*d)*f,b=(s*d-o*u)*f;return a.set(1-p-b,b,p)}static containsPoint(e,t,i,n){return this.getBarycoord(e,t,i,n,rn)!==null&&rn.x>=0&&rn.y>=0&&rn.x+rn.y<=1}static getInterpolation(e,t,i,n,a,s,o,u){return this.getBarycoord(e,t,i,n,rn)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(a,rn.x),u.addScaledVector(s,rn.y),u.addScaledVector(o,rn.z),u)}static getInterpolatedAttribute(e,t,i,n,a,s){return Rl.setScalar(0),Pl.setScalar(0),Il.setScalar(0),Rl.fromBufferAttribute(e,t),Pl.fromBufferAttribute(e,i),Il.fromBufferAttribute(e,n),s.setScalar(0),s.addScaledVector(Rl,a.x),s.addScaledVector(Pl,a.y),s.addScaledVector(Il,a.z),s}static isFrontFacing(e,t,i,n){return Li.subVectors(i,t),nn.subVectors(e,t),Li.cross(nn).dot(n)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,n){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[n]),this}setFromAttributeAndIndices(e,t,i,n){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Li.subVectors(this.c,this.b),nn.subVectors(this.a,this.b),.5*Li.cross(nn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,n,a){return r.getInterpolation(e,this.a,this.b,this.c,t,i,n,a)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,n=this.b,a=this.c,s,o;xr.subVectors(n,i),br.subVectors(a,i),wl.subVectors(e,i);let u=xr.dot(wl),c=br.dot(wl);if(u<=0&&c<=0)return t.copy(i);Al.subVectors(e,n);let d=xr.dot(Al),g=br.dot(Al);if(d>=0&&g<=d)return t.copy(n);let f=u*g-d*c;if(f<=0&&u>=0&&d<=0)return s=u/(u-d),t.copy(i).addScaledVector(xr,s);Cl.subVectors(e,a);let p=xr.dot(Cl),b=br.dot(Cl);if(b>=0&&p<=b)return t.copy(a);let y=p*c-u*b;if(y<=0&&c>=0&&b<=0)return o=c/(c-b),t.copy(i).addScaledVector(br,o);let S=d*b-p*g;if(S<=0&&g-d>=0&&p-b>=0)return od.subVectors(a,n),o=(g-d)/(g-d+(p-b)),t.copy(n).addScaledVector(od,o);let x=1/(S+y+f);return s=y*x,o=f*x,t.copy(i).addScaledVector(xr,s).addScaledVector(br,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Ni=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Di.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Di.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Di.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let a=i.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let s=0,o=a.count;s<o;s++)e.isMesh===!0?e.getVertexPosition(s,Di):Di.fromBufferAttribute(a,s),Di.applyMatrix4(e.matrixWorld),this.expandByPoint(Di);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ms.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ms.copy(i.boundingBox)),ms.applyMatrix4(e.matrixWorld),this.union(ms)}let n=e.children;for(let a=0,s=n.length;a<s;a++)this.expandByObject(n[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Di),Di.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ua),fs.subVectors(this.max,ua),Mr.subVectors(e.a,ua),Sr.subVectors(e.b,ua),Tr.subVectors(e.c,ua),An.subVectors(Sr,Mr),Cn.subVectors(Tr,Sr),qn.subVectors(Mr,Tr);let t=[0,-An.z,An.y,0,-Cn.z,Cn.y,0,-qn.z,qn.y,An.z,0,-An.x,Cn.z,0,-Cn.x,qn.z,0,-qn.x,-An.y,An.x,0,-Cn.y,Cn.x,0,-qn.y,qn.x,0];return!!Ll(t,Mr,Sr,Tr,fs)&&(t=[1,0,0,0,1,0,0,0,1],!!Ll(t,Mr,Sr,Tr,fs)&&(gs.crossVectors(An,Cn),t=[gs.x,gs.y,gs.z],Ll(t,Mr,Sr,Tr,fs)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Di).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Di).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(an[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),an[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),an[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),an[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),an[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),an[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),an[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),an[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(an)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},an=[new U,new U,new U,new U,new U,new U,new U,new U],Di=new U,ms=new Ni,Mr=new U,Sr=new U,Tr=new U,An=new U,Cn=new U,qn=new U,ua=new U,fs=new U,gs=new U,Xn=new U;function Ll(r,e,t,i,n){for(let a=0,s=r.length-3;a<=s;a+=3){Xn.fromArray(r,a);let o=n.x*Math.abs(Xn.x)+n.y*Math.abs(Xn.y)+n.z*Math.abs(Xn.z),u=e.dot(Xn),c=t.dot(Xn),d=i.dot(Xn);if(Math.max(-Math.max(u,c,d),Math.min(u,c,d))>o)return!1}return!0}var bg=hm();function hm(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),i=new Uint32Array(512),n=new Uint32Array(512);for(let u=0;u<256;++u){let c=u-127;c<-27?(i[u]=0,i[256|u]=32768,n[u]=24,n[256|u]=24):c<-14?(i[u]=1024>>-c-14,i[256|u]=1024>>-c-14|32768,n[u]=-c-1,n[256|u]=-c-1):c<=15?(i[u]=c+15<<10,i[256|u]=c+15<<10|32768,n[u]=13,n[256|u]=13):c<128?(i[u]=31744,i[256|u]=64512,n[u]=24,n[256|u]=24):(i[u]=31744,i[256|u]=64512,n[u]=13,n[256|u]=13)}let a=new Uint32Array(2048),s=new Uint32Array(64),o=new Uint32Array(64);for(let u=1;u<1024;++u){let c=u<<13,d=0;for(;!(8388608&c);)c<<=1,d-=8388608;c&=-8388609,d+=947912704,a[u]=c|d}for(let u=1024;u<2048;++u)a[u]=939524096+(u-1024<<13);for(let u=1;u<31;++u)s[u]=u<<23;s[31]=1199570944,s[32]=2147483648;for(let u=33;u<63;++u)s[u]=2147483648+(u-32<<23);s[63]=3347054592;for(let u=1;u<64;++u)u!==32&&(o[u]=1024);return{floatView:e,uint32View:t,baseTable:i,shiftTable:n,mantissaTable:a,exponentTable:s,offsetTable:o}}var Bt=new U,vs=new pe,pm=0,ii=class extends $i{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:pm++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Zl,this.updateRanges=[],this.gpuType=Oi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let n=0,a=this.itemSize;n<a;n++)this.array[e+n]=t.array[i+n];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)vs.fromBufferAttribute(this,t),vs.applyMatrix3(e),this.setXY(t,vs.x,vs.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=la(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=li(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=la(t,this.array)),t}setX(e,t){return this.normalized&&(t=li(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=la(t,this.array)),t}setY(e,t){return this.normalized&&(t=li(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=la(t,this.array)),t}setZ(e,t){return this.normalized&&(t=li(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=la(t,this.array)),t}setW(e,t){return this.normalized&&(t=li(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=li(t,this.array),i=li(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,n){return e*=this.itemSize,this.normalized&&(t=li(t,this.array),i=li(i,this.array),n=li(n,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this}setXYZW(e,t,i,n,a){return e*=this.itemSize,this.normalized&&(t=li(t,this.array),i=li(i,this.array),n=li(n,this.array),a=li(a,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=n,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zl&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}};var Sa=class extends ii{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Ta=class extends ii{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Ve=class extends ii{constructor(e,t,i){super(new Float32Array(e),t,i)}},mm=new Ni,da=new U,Dl=new U,Ui=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):mm.setFromPoints(e).getCenter(i);let n=0;for(let a=0,s=e.length;a<s;a++)n=Math.max(n,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(n),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;da.subVectors(e,this.center);let t=da.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),n=.5*(i-this.radius);this.center.addScaledVector(da,n/i),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Dl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(da.copy(e.center).add(Dl)),this.expandByPoint(da.copy(e.center).sub(Dl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},fm=0,wi=new Je,Nl=new Yt,Er=new U,fi=new Ni,ha=new Ni,Wt=new U,_t=class r extends $i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fm++}),this.uuid=Yr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new((function(t){for(let i=t.length-1;i>=0;--i)if(t[i]>=65535)return!0;return!1})(e)?Ta:Sa)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new Xe().getNormalMatrix(e);i.applyNormalMatrix(a),i.needsUpdate=!0}let n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return wi.makeRotationFromQuaternion(e),this.applyMatrix4(wi),this}rotateX(e){return wi.makeRotationX(e),this.applyMatrix4(wi),this}rotateY(e){return wi.makeRotationY(e),this.applyMatrix4(wi),this}rotateZ(e){return wi.makeRotationZ(e),this.applyMatrix4(wi),this}translate(e,t,i){return wi.makeTranslation(e,t,i),this.applyMatrix4(wi),this}scale(e,t,i){return wi.makeScale(e,t,i),this.applyMatrix4(wi),this}lookAt(e){return Nl.lookAt(e),Nl.updateMatrix(),this.applyMatrix4(Nl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Er).negate(),this.translate(Er.x,Er.y,Er.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let n=0,a=e.length;n<a;n++){let s=e[n];i.push(s.x,s.y,s.z||0)}this.setAttribute("position",new Ve(i,3))}else{let i=Math.min(e.length,t.count);for(let n=0;n<i;n++){let a=e[n];t.setXYZ(n,a.x,a.y,a.z||0)}e.length>t.count&&ke("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ni);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return Ge("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,n=t.length;i<n;i++){let a=t[i];fi.setFromBufferAttribute(a),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,fi.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,fi.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(fi.min),this.boundingBox.expandByPoint(fi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ge('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ui);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return Ge("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new U,1/0);if(e){let i=this.boundingSphere.center;if(fi.setFromBufferAttribute(e),t)for(let a=0,s=t.length;a<s;a++){let o=t[a];ha.setFromBufferAttribute(o),this.morphTargetsRelative?(Wt.addVectors(fi.min,ha.min),fi.expandByPoint(Wt),Wt.addVectors(fi.max,ha.max),fi.expandByPoint(Wt)):(fi.expandByPoint(ha.min),fi.expandByPoint(ha.max))}fi.getCenter(i);let n=0;for(let a=0,s=e.count;a<s;a++)Wt.fromBufferAttribute(e,a),n=Math.max(n,i.distanceToSquared(Wt));if(t)for(let a=0,s=t.length;a<s;a++){let o=t[a],u=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Wt.fromBufferAttribute(o,c),u&&(Er.fromBufferAttribute(e,c),Wt.add(Er)),n=Math.max(n,i.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&Ge('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void Ge("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let i=t.position,n=t.normal,a=t.uv,s=this.getAttribute("tangent");s!==void 0&&s.count===i.count||(s=new ii(new Float32Array(4*i.count),4),this.setAttribute("tangent",s));let o=[],u=[];for(let W=0;W<i.count;W++)o[W]=new U,u[W]=new U;let c=new U,d=new U,g=new U,f=new pe,p=new pe,b=new pe,y=new U,S=new U;function x(W,G,H){c.fromBufferAttribute(i,W),d.fromBufferAttribute(i,G),g.fromBufferAttribute(i,H),f.fromBufferAttribute(a,W),p.fromBufferAttribute(a,G),b.fromBufferAttribute(a,H),d.sub(c),g.sub(c),p.sub(f),b.sub(f);let K=1/(p.x*b.y-b.x*p.y);isFinite(K)&&(y.copy(d).multiplyScalar(b.y).addScaledVector(g,-p.y).multiplyScalar(K),S.copy(g).multiplyScalar(p.x).addScaledVector(d,-b.x).multiplyScalar(K),o[W].add(y),o[G].add(y),o[H].add(y),u[W].add(S),u[G].add(S),u[H].add(S))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let W=0,G=M.length;W<G;++W){let H=M[W],K=H.start;for(let q=K,se=K+H.count;q<se;q+=3)x(e.getX(q+0),e.getX(q+1),e.getX(q+2))}let E=new U,C=new U,L=new U,w=new U;function k(W){L.fromBufferAttribute(n,W),w.copy(L);let G=o[W];E.copy(G),E.sub(L.multiplyScalar(L.dot(G))).normalize(),C.crossVectors(w,G);let H=C.dot(u[W])<0?-1:1;s.setXYZW(W,E.x,E.y,E.z,H)}for(let W=0,G=M.length;W<G;++W){let H=M[W],K=H.start;for(let q=K,se=K+H.count;q<se;q+=3)k(e.getX(q+0)),k(e.getX(q+1)),k(e.getX(q+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new ii(new Float32Array(3*t.count),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);let n=new U,a=new U,s=new U,o=new U,u=new U,c=new U,d=new U,g=new U;if(e)for(let f=0,p=e.count;f<p;f+=3){let b=e.getX(f+0),y=e.getX(f+1),S=e.getX(f+2);n.fromBufferAttribute(t,b),a.fromBufferAttribute(t,y),s.fromBufferAttribute(t,S),d.subVectors(s,a),g.subVectors(n,a),d.cross(g),o.fromBufferAttribute(i,b),u.fromBufferAttribute(i,y),c.fromBufferAttribute(i,S),o.add(d),u.add(d),c.add(d),i.setXYZ(b,o.x,o.y,o.z),i.setXYZ(y,u.x,u.y,u.z),i.setXYZ(S,c.x,c.y,c.z)}else for(let f=0,p=t.count;f<p;f+=3)n.fromBufferAttribute(t,f+0),a.fromBufferAttribute(t,f+1),s.fromBufferAttribute(t,f+2),d.subVectors(s,a),g.subVectors(n,a),d.cross(g),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(o,u){let c=o.array,d=o.itemSize,g=o.normalized,f=new c.constructor(u.length*d),p=0,b=0;for(let y=0,S=u.length;y<S;y++){p=o.isInterleavedBufferAttribute?u[y]*o.data.stride+o.offset:u[y]*d;for(let x=0;x<d;x++)f[b++]=c[p++]}return new ii(f,d,g)}if(this.index===null)return ke("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,i=this.index.array,n=this.attributes;for(let o in n){let u=e(n[o],i);t.setAttribute(o,u)}let a=this.morphAttributes;for(let o in a){let u=[],c=a[o];for(let d=0,g=c.length;d<g;d++){let f=e(c[d],i);u.push(f)}t.morphAttributes[o]=u}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let o=0,u=s.length;o<u;o++){let c=s[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let u=this.parameters;for(let c in u)u[c]!==void 0&&(e[c]=u[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let u in i){let c=i[u];e.data.attributes[u]=c.toJSON(e.data)}let n={},a=!1;for(let u in this.morphAttributes){let c=this.morphAttributes[u],d=[];for(let g=0,f=c.length;g<f;g++){let p=c[g];d.push(p.toJSON(e.data))}d.length>0&&(n[u]=d,a=!0)}a&&(e.data.morphAttributes=n,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let n=e.attributes;for(let c in n){let d=n[c];this.setAttribute(c,d.clone(t))}let a=e.morphAttributes;for(let c in a){let d=[],g=a[c];for(let f=0,p=g.length;f<p;f++)d.push(g[f].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let c=0,d=s.length;c<d;c++){let g=s[c];this.addGroup(g.start,g.count,g.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var Mg=new U;var gm=0,dn=class extends $i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gm++}),this.uuid=Yr(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zn,this.stencilZFail=Zn,this.stencilZPass=Zn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){ke(`Material: parameter '${t}' has value of undefined.`);continue}let n=this[t];n!==void 0?n&&n.isColor?n.set(i):n&&n.isVector2&&i&&i.isVector2||n&&n.isEuler&&i&&i.isEuler||n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[t]=i:ke(`Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};function n(a){let s=[];for(let o in a){let u=a[o];delete u.metadata,s.push(u)}return s}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(i.blending=this.blending),this.side!==0&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==204&&(i.blendSrc=this.blendSrc),this.blendDst!==205&&(i.blendDst=this.blendDst),this.blendEquation!==100&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Zn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Zn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData),t){let a=n(e.textures),s=n(e.images);a.length>0&&(i.textures=a),s.length>0&&(i.images=s)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new $e().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new pe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new pe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let n=t.length;i=new Array(n);for(let a=0;a!==n;++a)i[a]=t[a].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var Sg=new U,Tg=new U,Eg=new U,wg=new pe,Ag=new pe,Cg=new Je,Rg=new U,Pg=new U,Ig=new U,Lg=new pe,Dg=new pe,Ng=new pe;var Ug=new U,Fg=new U;var sn=new U,Ul=new U,ys=new U,Rn=new U,Fl=new U,_s=new U,Ol=new U,Qn=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,sn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=sn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(sn.copy(this.origin).addScaledVector(this.direction,t),sn.distanceToSquared(e))}distanceSqToSegment(e,t,i,n){Ul.copy(e).add(t).multiplyScalar(.5),ys.copy(t).sub(e).normalize(),Rn.copy(this.origin).sub(Ul);let a=.5*e.distanceTo(t),s=-this.direction.dot(ys),o=Rn.dot(this.direction),u=-Rn.dot(ys),c=Rn.lengthSq(),d=Math.abs(1-s*s),g,f,p,b;if(d>0)if(g=s*u-o,f=s*o-u,b=a*d,g>=0)if(f>=-b)if(f<=b){let y=1/d;g*=y,f*=y,p=g*(g+s*f+2*o)+f*(s*g+f+2*u)+c}else f=a,g=Math.max(0,-(s*f+o)),p=-g*g+f*(f+2*u)+c;else f=-a,g=Math.max(0,-(s*f+o)),p=-g*g+f*(f+2*u)+c;else f<=-b?(g=Math.max(0,-(-s*a+o)),f=g>0?-a:Math.min(Math.max(-a,-u),a),p=-g*g+f*(f+2*u)+c):f<=b?(g=0,f=Math.min(Math.max(-a,-u),a),p=f*(f+2*u)+c):(g=Math.max(0,-(s*a+o)),f=g>0?a:Math.min(Math.max(-a,-u),a),p=-g*g+f*(f+2*u)+c);else f=s>0?-a:a,g=Math.max(0,-(s*f+o)),p=-g*g+f*(f+2*u)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,g),n&&n.copy(Ul).addScaledVector(ys,f),p}intersectSphere(e,t){sn.subVectors(e.center,this.origin);let i=sn.dot(this.direction),n=sn.dot(sn)-i*i,a=e.radius*e.radius;if(n>a)return null;let s=Math.sqrt(a-n),o=i-s,u=i+s;return u<0?null:o<0?this.at(u,t):this.at(o,t)}intersectsSphere(e){return!(e.radius<0)&&this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,n,a,s,o,u,c=1/this.direction.x,d=1/this.direction.y,g=1/this.direction.z,f=this.origin;return c>=0?(i=(e.min.x-f.x)*c,n=(e.max.x-f.x)*c):(i=(e.max.x-f.x)*c,n=(e.min.x-f.x)*c),d>=0?(a=(e.min.y-f.y)*d,s=(e.max.y-f.y)*d):(a=(e.max.y-f.y)*d,s=(e.min.y-f.y)*d),i>s||a>n?null:((a>i||isNaN(i))&&(i=a),(s<n||isNaN(n))&&(n=s),g>=0?(o=(e.min.z-f.z)*g,u=(e.max.z-f.z)*g):(o=(e.max.z-f.z)*g,u=(e.min.z-f.z)*g),i>u||o>n?null:((o>i||i!=i)&&(i=o),(u<n||n!=n)&&(n=u),n<0?null:this.at(i>=0?i:n,t)))}intersectsBox(e){return this.intersectBox(e,sn)!==null}intersectTriangle(e,t,i,n,a){Fl.subVectors(t,e),_s.subVectors(i,e),Ol.crossVectors(Fl,_s);let s,o=this.direction.dot(Ol);if(o>0){if(n)return null;s=1}else{if(!(o<0))return null;s=-1,o=-o}Rn.subVectors(this.origin,e);let u=s*this.direction.dot(_s.crossVectors(Rn,_s));if(u<0)return null;let c=s*this.direction.dot(Fl.cross(Rn));if(c<0||u+c>o)return null;let d=-s*Rn.dot(Ol);return d<0?null:this.at(d/o,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ea=class extends dn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ld=new Je,jn=new Qn,xs=new Ui,cd=new U,bs=new U,Ms=new U,Ss=new U,Bl=new U,Ts=new U,ud=new U,Es=new U,$t=class extends Yt{constructor(e=new _t,t=new Ea){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,a=i.length;n<a;n++){let s=i[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=n}}}}getVertexPosition(e,t){let i=this.geometry,n=i.attributes.position,a=i.morphAttributes.position,s=i.morphTargetsRelative;t.fromBufferAttribute(n,e);let o=this.morphTargetInfluences;if(a&&o){Ts.set(0,0,0);for(let u=0,c=a.length;u<c;u++){let d=o[u],g=a[u];d!==0&&(Bl.fromBufferAttribute(g,e),s?Ts.addScaledVector(Bl,d):Ts.addScaledVector(Bl.sub(t),d))}t.add(Ts)}return t}raycast(e,t){let i=this.geometry,n=this.material,a=this.matrixWorld;if(n!==void 0){if(i.boundingSphere===null&&i.computeBoundingSphere(),xs.copy(i.boundingSphere),xs.applyMatrix4(a),jn.copy(e.ray).recast(e.near),xs.containsPoint(jn.origin)===!1&&(jn.intersectSphere(xs,cd)===null||jn.origin.distanceToSquared(cd)>(e.far-e.near)**2))return;ld.copy(a).invert(),jn.copy(e.ray).applyMatrix4(ld),i.boundingBox!==null&&jn.intersectsBox(i.boundingBox)===!1||this._computeIntersections(e,t,jn)}}_computeIntersections(e,t,i){let n,a=this.geometry,s=this.material,o=a.index,u=a.attributes.position,c=a.attributes.uv,d=a.attributes.uv1,g=a.attributes.normal,f=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(s))for(let b=0,y=f.length;b<y;b++){let S=f[b],x=s[S.materialIndex];for(let M=Math.max(S.start,p.start),E=Math.min(o.count,Math.min(S.start+S.count,p.start+p.count));M<E;M+=3)n=ws(this,x,e,i,c,d,g,o.getX(M),o.getX(M+1),o.getX(M+2)),n&&(n.faceIndex=Math.floor(M/3),n.face.materialIndex=S.materialIndex,t.push(n))}else for(let b=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);b<y;b+=3)n=ws(this,s,e,i,c,d,g,o.getX(b),o.getX(b+1),o.getX(b+2)),n&&(n.faceIndex=Math.floor(b/3),t.push(n));else if(u!==void 0)if(Array.isArray(s))for(let b=0,y=f.length;b<y;b++){let S=f[b],x=s[S.materialIndex];for(let M=Math.max(S.start,p.start),E=Math.min(u.count,Math.min(S.start+S.count,p.start+p.count));M<E;M+=3)n=ws(this,x,e,i,c,d,g,M,M+1,M+2),n&&(n.faceIndex=Math.floor(M/3),n.face.materialIndex=S.materialIndex,t.push(n))}else for(let b=Math.max(0,p.start),y=Math.min(u.count,p.start+p.count);b<y;b+=3)n=ws(this,s,e,i,c,d,g,b,b+1,b+2),n&&(n.faceIndex=Math.floor(b/3),t.push(n))}};function ws(r,e,t,i,n,a,s,o,u,c){r.getVertexPosition(o,bs),r.getVertexPosition(u,Ms),r.getVertexPosition(c,Ss);let d=(function(g,f,p,b,y,S,x,M){let E;if(E=f.side===1?b.intersectTriangle(x,S,y,!0,M):b.intersectTriangle(y,S,x,f.side===0,M),E===null)return null;Es.copy(M),Es.applyMatrix4(g.matrixWorld);let C=p.ray.origin.distanceTo(Es);return C<p.near||C>p.far?null:{distance:C,point:Es.clone(),object:g}})(r,e,t,i,bs,Ms,Ss,ud);if(d){let g=new U;on.getBarycoord(ud,bs,Ms,Ss,g),n&&(d.uv=on.getInterpolatedAttribute(n,o,u,c,g,new pe)),a&&(d.uv1=on.getInterpolatedAttribute(a,o,u,c,g,new pe)),s&&(d.normal=on.getInterpolatedAttribute(s,o,u,c,g,new U),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));let f={a:o,b:u,c,normal:new U,materialIndex:0};on.getNormal(bs,Ms,Ss,f.normal),d.face=f,d.barycoord=g}return d}var Og=new pt,Bg=new pt,kg=new pt,zg=new pt,Gg=new Je,Hg=new U,Vg=new Ui,Wg=new Je,$g=new Qn;var js=class extends ti{constructor(e=null,t=1,i=1,n,a,s,o,u,c=1003,d=1003,g,f){super(null,s,o,u,c,d,n,a,g,f),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},qg=new Je,Xg=new Je;var jg=new Je,Yg=new Je;var Zg=new Ni,Jg=new Je,Kg=new $t,Qg=new Ui;var kl=new U,vm=new U,ym=new Xe,Vi=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,n){return this.normal.set(e,t,i),this.constant=n,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let n=kl.subVectors(i,t).cross(vm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(n,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let n=e.delta(kl),a=this.normal.dot(n);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/a;return i===!0&&(s<0||s>1)?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||ym.getNormalMatrix(e),n=this.coplanarPoint(kl).applyMatrix4(e),a=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Yn=new Ui,_m=new pe(.5,.5),As=new U,hn=class{constructor(e=new Vi,t=new Vi,i=new Vi,n=new Vi,a=new Vi,s=new Vi){this.planes=[e,t,i,n,a,s]}set(e,t,i,n,a,s){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(n),o[4].copy(a),o[5].copy(s),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=2e3,i=!1){let n=this.planes,a=e.elements,s=a[0],o=a[1],u=a[2],c=a[3],d=a[4],g=a[5],f=a[6],p=a[7],b=a[8],y=a[9],S=a[10],x=a[11],M=a[12],E=a[13],C=a[14],L=a[15];if(n[0].setComponents(c-s,p-d,x-b,L-M).normalize(),n[1].setComponents(c+s,p+d,x+b,L+M).normalize(),n[2].setComponents(c+o,p+g,x+y,L+E).normalize(),n[3].setComponents(c-o,p-g,x-y,L-E).normalize(),i)n[4].setComponents(u,f,S,C).normalize(),n[5].setComponents(c-u,p-f,x-S,L-C).normalize();else if(n[4].setComponents(c-u,p-f,x-S,L-C).normalize(),t===cn)n[5].setComponents(c+u,p+f,x+S,L+C).normalize();else{if(t!==Rr)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);n[5].setComponents(u,f,S,C).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Yn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Yn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Yn)}intersectsSprite(e){Yn.center.set(0,0,0);let t=_m.distanceTo(e.center);return Yn.radius=.7071067811865476+t,Yn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Yn)}intersectsSphere(e){let t=this.planes,i=e.center,n=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(i)<n)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let n=t[i];if(As.x=n.normal.x>0?e.max.x:e.min.x,As.y=n.normal.y>0?e.max.y:e.min.y,As.z=n.normal.z>0?e.max.z:e.min.z,n.distanceToPoint(As)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},dd=new Je,Ys=class r{constructor(){this.coordinateSystem=cn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,i=this._frustums;for(let n=0;n<t.length;n++){let a=t[n];dd.multiplyMatrices(a.projectionMatrix,a.matrixWorldInverse),i[n]===void 0&&(i[n]=new hn),i[n].setFromProjectionMatrix(dd,a.coordinateSystem,a.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,i=e._frustums;for(let n=0;n<e._count;n++)t[n]===void 0&&(t[n]=new hn),t[n].copy(i[n]);return this._count=e._count,this}clone(){return new r().copy(this)}};var Jl=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,i,n){let a=this.pool,s=this.list;this.index>=a.length&&a.push({start:-1,count:-1,z:-1,index:-1});let o=a[this.index];s.push(o),this.index++,o.start=e,o.count=t,o.z=i,o.index=n}reset(){this.list.length=0,this.index=0}},e0=new Je,t0=new $e(1,1,1),i0=new hn,n0=new Ys,r0=new Ni,a0=new Ui,s0=new U,o0=new U,l0=new U,c0=new Jl,u0=new $t;var d0=new U,h0=new U,p0=new Je,m0=new Qn,f0=new Ui,g0=new U,v0=new U;var y0=new U,_0=new U;var Nr=class extends dn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},hd=new Je,Kl=new Qn,Cs=new Ui,Rs=new U,wa=class extends Yt{constructor(e=new _t,t=new Nr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let i=this.geometry,n=this.matrixWorld,a=e.params.Points.threshold,s=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Cs.copy(i.boundingSphere),Cs.applyMatrix4(n),Cs.radius+=a,e.ray.intersectsSphere(Cs)===!1)return;hd.copy(n).invert(),Kl.copy(e.ray).applyMatrix4(hd);let o=a/((this.scale.x+this.scale.y+this.scale.z)/3),u=o*o,c=i.index,d=i.attributes.position;if(c!==null)for(let g=Math.max(0,s.start),f=Math.min(c.count,s.start+s.count);g<f;g++){let p=c.getX(g);Rs.fromBufferAttribute(d,p),pd(Rs,p,u,n,e,t,this)}else for(let g=Math.max(0,s.start),f=Math.min(d.count,s.start+s.count);g<f;g++)Rs.fromBufferAttribute(d,g),pd(Rs,g,u,n,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let i=e[t[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let n=0,a=i.length;n<a;n++){let s=i[n].name||String(n);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=n}}}}};function pd(r,e,t,i,n,a,s){let o=Kl.distanceSqToPoint(r);if(o<t){let u=new U;Kl.closestPointToPoint(r,u),u.applyMatrix4(i);let c=n.ray.origin.distanceTo(u);if(c<n.near||c>n.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:u,index:e,face:null,faceIndex:null,barycoord:null,object:s})}}var Aa=class extends ti{constructor(e=[],t=301,i,n,a,s,o,u,c,d){super(e,t,i,n,a,s,o,u,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var pn=class extends ti{constructor(e,t,i=1014,n,a,s,o=1003,u=1003,c,d=1026,g=1){if(d!==Bn&&d!==1027)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super({width:e,height:t,depth:g},n,a,s,o,u,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Lr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Zs=class extends pn{constructor(e,t=1014,i=301,n,a,s=1003,o=1003,u,c=1026){let d={width:e,height:e,depth:1},g=[d,d,d,d,d,d];super(e,e,t,i,n,a,s,o,u,c),this.image=g,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Ca=class extends ti{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},er=class r extends _t{constructor(e=1,t=1,i=1,n=1,a=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:n,heightSegments:a,depthSegments:s};let o=this;n=Math.floor(n),a=Math.floor(a),s=Math.floor(s);let u=[],c=[],d=[],g=[],f=0,p=0;function b(y,S,x,M,E,C,L,w,k,W,G){let H=C/k,K=L/W,q=C/2,se=L/2,ee=w/2,Z=k+1,v=W+1,$=0,ue=0,_e=new U;for(let Ne=0;Ne<v;Ne++){let Ae=Ne*K-se;for(let Pe=0;Pe<Z;Pe++){let he=Pe*H-q;_e[y]=he*M,_e[S]=Ae*E,_e[x]=ee,c.push(_e.x,_e.y,_e.z),_e[y]=0,_e[S]=0,_e[x]=w>0?1:-1,d.push(_e.x,_e.y,_e.z),g.push(Pe/k),g.push(1-Ne/W),$+=1}}for(let Ne=0;Ne<W;Ne++)for(let Ae=0;Ae<k;Ae++){let Pe=f+Ae+Z*Ne,he=f+Ae+Z*(Ne+1),Me=f+(Ae+1)+Z*(Ne+1),ye=f+(Ae+1)+Z*Ne;u.push(Pe,he,ye),u.push(he,Me,ye),ue+=6}o.addGroup(p,ue,G),p+=ue,f+=$}b("z","y","x",-1,-1,i,t,e,s,a,0),b("z","y","x",1,-1,i,t,-e,s,a,1),b("x","z","y",1,1,e,i,t,n,s,2),b("x","z","y",1,-1,e,i,-t,n,s,3),b("x","y","z",1,-1,e,t,i,n,a,4),b("x","y","z",-1,-1,e,t,-i,n,a,5),this.setIndex(u),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(d,3)),this.setAttribute("uv",new Ve(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Js=class r extends _t{constructor(e=1,t=1,i=4,n=8,a=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:i,radialSegments:n,heightSegments:a},t=Math.max(0,t),i=Math.max(1,Math.floor(i)),n=Math.max(3,Math.floor(n)),a=Math.max(1,Math.floor(a));let s=[],o=[],u=[],c=[],d=t/2,g=Math.PI/2*e,f=t,p=2*g+f,b=2*i+a,y=n+1,S=new U,x=new U;for(let M=0;M<=b;M++){let E=0,C=0,L=0,w=0;if(M<=i){let G=M/i,H=G*Math.PI/2;C=-d-e*Math.cos(H),L=e*Math.sin(H),w=-e*Math.cos(H),E=G*g}else if(M<=i+a){let G=(M-i)/a;C=G*t-d,L=e,w=0,E=g+G*f}else{let G=(M-i-a)/i,H=G*Math.PI/2;C=d+e*Math.sin(H),L=e*Math.cos(H),w=e*Math.sin(H),E=g+f+G*g}let k=Math.max(0,Math.min(1,E/p)),W=0;M===0?W=.5/n:M===b&&(W=-.5/n);for(let G=0;G<=n;G++){let H=G/n,K=H*Math.PI*2,q=Math.sin(K),se=Math.cos(K);x.x=-L*se,x.y=C,x.z=L*q,o.push(x.x,x.y,x.z),S.set(-L*se,w,L*q),S.normalize(),u.push(S.x,S.y,S.z),c.push(H+W,k)}if(M>0){let G=(M-1)*y;for(let H=0;H<n;H++){let K=G+H,q=G+H+1,se=M*y+H,ee=M*y+H+1;s.push(K,q,se),s.push(q,ee,se)}}}this.setIndex(s),this.setAttribute("position",new Ve(o,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Ks=class r extends _t{constructor(e=1,t=32,i=0,n=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:i,thetaLength:n},t=Math.max(3,t);let a=[],s=[],o=[],u=[],c=new U,d=new pe;s.push(0,0,0),o.push(0,0,1),u.push(.5,.5);for(let g=0,f=3;g<=t;g++,f+=3){let p=i+g/t*n;c.x=e*Math.cos(p),c.y=e*Math.sin(p),s.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(s[f]/e+1)/2,d.y=(s[f+1]/e+1)/2,u.push(d.x,d.y)}for(let g=1;g<=t;g++)a.push(g,g+1,0);this.setIndex(a),this.setAttribute("position",new Ve(s,3)),this.setAttribute("normal",new Ve(o,3)),this.setAttribute("uv",new Ve(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Ra=class r extends _t{constructor(e=1,t=1,i=1,n=32,a=1,s=!1,o=0,u=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:n,heightSegments:a,openEnded:s,thetaStart:o,thetaLength:u};let c=this;n=Math.floor(n),a=Math.floor(a);let d=[],g=[],f=[],p=[],b=0,y=[],S=i/2,x=0;function M(E){let C=b,L=new pe,w=new U,k=0,W=E===!0?e:t,G=E===!0?1:-1;for(let K=1;K<=n;K++)g.push(0,S*G,0),f.push(0,G,0),p.push(.5,.5),b++;let H=b;for(let K=0;K<=n;K++){let q=K/n*u+o,se=Math.cos(q),ee=Math.sin(q);w.x=W*ee,w.y=S*G,w.z=W*se,g.push(w.x,w.y,w.z),f.push(0,G,0),L.x=.5*se+.5,L.y=.5*ee*G+.5,p.push(L.x,L.y),b++}for(let K=0;K<n;K++){let q=C+K,se=H+K;E===!0?d.push(se,se+1,q):d.push(se+1,se,q),k+=3}c.addGroup(x,k,E===!0?1:2),x+=k}(function(){let E=new U,C=new U,L=0,w=(t-e)/i;for(let k=0;k<=a;k++){let W=[],G=k/a,H=G*(t-e)+e;for(let K=0;K<=n;K++){let q=K/n,se=q*u+o,ee=Math.sin(se),Z=Math.cos(se);C.x=H*ee,C.y=-G*i+S,C.z=H*Z,g.push(C.x,C.y,C.z),E.set(ee,w,Z).normalize(),f.push(E.x,E.y,E.z),p.push(q,1-G),W.push(b++)}y.push(W)}for(let k=0;k<n;k++)for(let W=0;W<a;W++){let G=y[W][k],H=y[W+1][k],K=y[W+1][k+1],q=y[W][k+1];(e>0||W!==0)&&(d.push(G,H,q),L+=3),(t>0||W!==a-1)&&(d.push(H,K,q),L+=3)}c.addGroup(x,L,0),x+=L})(),s===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(d),this.setAttribute("position",new Ve(g,3)),this.setAttribute("normal",new Ve(f,3)),this.setAttribute("uv",new Ve(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Qs=class r extends Ra{constructor(e=1,t=1,i=32,n=1,a=!1,s=0,o=2*Math.PI){super(0,e,t,i,n,a,s,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:n,openEnded:a,thetaStart:s,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Nn=class r extends _t{constructor(e=[],t=[],i=1,n=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:n};let a=[],s=[];function o(p,b,y,S){let x=S+1,M=[];for(let E=0;E<=x;E++){M[E]=[];let C=p.clone().lerp(y,E/x),L=b.clone().lerp(y,E/x),w=x-E;for(let k=0;k<=w;k++)M[E][k]=k===0&&E===x?C:C.clone().lerp(L,k/w)}for(let E=0;E<x;E++)for(let C=0;C<2*(x-E)-1;C++){let L=Math.floor(C/2);C%2==0?(u(M[E][L+1]),u(M[E+1][L]),u(M[E][L])):(u(M[E][L+1]),u(M[E+1][L+1]),u(M[E+1][L]))}}function u(p){a.push(p.x,p.y,p.z)}function c(p,b){let y=3*p;b.x=e[y+0],b.y=e[y+1],b.z=e[y+2]}function d(p,b,y,S){S<0&&p.x===1&&(s[b]=p.x-1),y.x===0&&y.z===0&&(s[b]=S/2/Math.PI+.5)}function g(p){return Math.atan2(p.z,-p.x)}function f(p){return Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))}(function(p){let b=new U,y=new U,S=new U;for(let x=0;x<t.length;x+=3)c(t[x+0],b),c(t[x+1],y),c(t[x+2],S),o(b,y,S,p)})(n),(function(p){let b=new U;for(let y=0;y<a.length;y+=3)b.x=a[y+0],b.y=a[y+1],b.z=a[y+2],b.normalize().multiplyScalar(p),a[y+0]=b.x,a[y+1]=b.y,a[y+2]=b.z})(i),(function(){let p=new U;for(let b=0;b<a.length;b+=3){p.x=a[b+0],p.y=a[b+1],p.z=a[b+2];let y=g(p)/2/Math.PI+.5,S=f(p)/Math.PI+.5;s.push(y,1-S)}(function(){let b=new U,y=new U,S=new U,x=new U,M=new pe,E=new pe,C=new pe;for(let L=0,w=0;L<a.length;L+=9,w+=6){b.set(a[L+0],a[L+1],a[L+2]),y.set(a[L+3],a[L+4],a[L+5]),S.set(a[L+6],a[L+7],a[L+8]),M.set(s[w+0],s[w+1]),E.set(s[w+2],s[w+3]),C.set(s[w+4],s[w+5]),x.copy(b).add(y).add(S).divideScalar(3);let k=g(x);d(M,w+0,b,k),d(E,w+2,y,k),d(C,w+4,S,k)}})(),(function(){for(let b=0;b<s.length;b+=6){let y=s[b+0],S=s[b+2],x=s[b+4],M=Math.max(y,S,x),E=Math.min(y,S,x);M>.9&&E<.1&&(y<.2&&(s[b+0]+=1),S<.2&&(s[b+2]+=1),x<.2&&(s[b+4]+=1))}})()})(),this.setAttribute("position",new Ve(a,3)),this.setAttribute("normal",new Ve(a.slice(),3)),this.setAttribute("uv",new Ve(s,2)),n===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.detail)}},eo=class r extends Nn{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2,n=1/i;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-n,-i,0,-n,i,0,n,-i,0,n,i,-n,-i,0,-n,i,0,n,-i,0,n,i,0,-i,0,-n,i,0,-n,-i,0,n,i,0,n],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Ps=new U,Is=new U,zl=new U,Ls=new on,to=class extends _t{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let n=Math.pow(10,4),a=Math.cos(ks*t),s=e.getIndex(),o=e.getAttribute("position"),u=s?s.count:o.count,c=[0,0,0],d=["a","b","c"],g=new Array(3),f={},p=[];for(let b=0;b<u;b+=3){s?(c[0]=s.getX(b),c[1]=s.getX(b+1),c[2]=s.getX(b+2)):(c[0]=b,c[1]=b+1,c[2]=b+2);let{a:y,b:S,c:x}=Ls;if(y.fromBufferAttribute(o,c[0]),S.fromBufferAttribute(o,c[1]),x.fromBufferAttribute(o,c[2]),Ls.getNormal(zl),g[0]=`${Math.round(y.x*n)},${Math.round(y.y*n)},${Math.round(y.z*n)}`,g[1]=`${Math.round(S.x*n)},${Math.round(S.y*n)},${Math.round(S.z*n)}`,g[2]=`${Math.round(x.x*n)},${Math.round(x.y*n)},${Math.round(x.z*n)}`,g[0]!==g[1]&&g[1]!==g[2]&&g[2]!==g[0])for(let M=0;M<3;M++){let E=(M+1)%3,C=g[M],L=g[E],w=Ls[d[M]],k=Ls[d[E]],W=`${C}_${L}`,G=`${L}_${C}`;G in f&&f[G]?(zl.dot(f[G].normal)<=a&&(p.push(w.x,w.y,w.z),p.push(k.x,k.y,k.z)),f[G]=null):W in f||(f[W]={index0:c[M],index1:c[E],normal:zl.clone()})}}for(let b in f)if(f[b]){let{index0:y,index1:S}=f[b];Ps.fromBufferAttribute(o,y),Is.fromBufferAttribute(o,S),p.push(Ps.x,Ps.y,Ps.z),p.push(Is.x,Is.y,Is.z)}this.setAttribute("position",new Ve(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},yi=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){ke("Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,n=this.getPoint(0),a=0;t.push(0);for(let s=1;s<=e;s++)i=this.getPoint(s/e),a+=i.distanceTo(n),t.push(a),n=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),n=0,a=i.length,s;s=t||e*i[a-1];let o,u=0,c=a-1;for(;u<=c;)if(n=Math.floor(u+(c-u)/2),o=i[n]-s,o<0)u=n+1;else{if(!(o>0)){c=n;break}c=n-1}if(n=c,i[n]===s)return n/(a-1);let d=i[n];return(n+(s-d)/(i[n+1]-d))/(a-1)}getTangent(e,t){let n=e-1e-4,a=e+1e-4;n<0&&(n=0),a>1&&(a=1);let s=this.getPoint(n),o=this.getPoint(a),u=t||(s.isVector2?new pe:new U);return u.copy(o).sub(s).normalize(),u}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new U,n=[],a=[],s=[],o=new U,u=new Je;for(let p=0;p<=e;p++){let b=p/e;n[p]=this.getTangentAt(b,new U)}a[0]=new U,s[0]=new U;let c=Number.MAX_VALUE,d=Math.abs(n[0].x),g=Math.abs(n[0].y),f=Math.abs(n[0].z);d<=c&&(c=d,i.set(1,0,0)),g<=c&&(c=g,i.set(0,1,0)),f<=c&&i.set(0,0,1),o.crossVectors(n[0],i).normalize(),a[0].crossVectors(n[0],o),s[0].crossVectors(n[0],a[0]);for(let p=1;p<=e;p++){if(a[p]=a[p-1].clone(),s[p]=s[p-1].clone(),o.crossVectors(n[p-1],n[p]),o.length()>Number.EPSILON){o.normalize();let b=Math.acos(et(n[p-1].dot(n[p]),-1,1));a[p].applyMatrix4(u.makeRotationAxis(o,b))}s[p].crossVectors(n[p],a[p])}if(t===!0){let p=Math.acos(et(a[0].dot(a[e]),-1,1));p/=e,n[0].dot(o.crossVectors(a[0],a[e]))>0&&(p=-p);for(let b=1;b<=e;b++)a[b].applyMatrix4(u.makeRotationAxis(n[b],p*b)),s[b].crossVectors(n[b],a[b])}return{tangents:n,normals:a,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ur=class extends yi{constructor(e=0,t=0,i=1,n=1,a=0,s=2*Math.PI,o=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=n,this.aStartAngle=a,this.aEndAngle=s,this.aClockwise=o,this.aRotation=u}getPoint(e,t=new pe){let i=t,n=2*Math.PI,a=this.aEndAngle-this.aStartAngle,s=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=n;for(;a>n;)a-=n;a<Number.EPSILON&&(a=s?0:n),this.aClockwise!==!0||s||(a===n?a=-n:a-=n);let o=this.aStartAngle+e*a,u=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let d=Math.cos(this.aRotation),g=Math.sin(this.aRotation),f=u-this.aX,p=c-this.aY;u=f*d-p*g+this.aX,c=f*g+p*d+this.aY}return i.set(u,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},io=class extends Ur{constructor(e,t,i,n,a,s){super(e,t,i,i,n,a,s),this.isArcCurve=!0,this.type="ArcCurve"}};function lu(){let r=0,e=0,t=0,i=0;function n(a,s,o,u){r=a,e=o,t=-3*a+3*s-2*o-u,i=2*a-2*s+o+u}return{initCatmullRom:function(a,s,o,u,c){n(s,o,c*(o-a),c*(u-s))},initNonuniformCatmullRom:function(a,s,o,u,c,d,g){let f=(s-a)/c-(o-a)/(c+d)+(o-s)/d,p=(o-s)/d-(u-s)/(d+g)+(u-o)/g;f*=d,p*=d,n(s,o,f,p)},calc:function(a){let s=a*a;return r+e*a+t*s+i*(s*a)}}}var md=new U,fd=new U,Gl=new lu,Hl=new lu,Vl=new lu,no=class extends yi{constructor(e=[],t=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=n}getPoint(e,t=new U){let i=t,n=this.points,a=n.length,s=(a-(this.closed?0:1))*e,o,u,c=Math.floor(s),d=s-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/a)+1)*a:d===0&&c===a-1&&(c=a-2,d=1),this.closed||c>0?o=n[(c-1)%a]:(fd.subVectors(n[0],n[1]).add(n[0]),o=fd);let g=n[c%a],f=n[(c+1)%a];if(this.closed||c+2<a?u=n[(c+2)%a]:(md.subVectors(n[a-1],n[a-2]).add(n[a-1]),u=md),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,b=Math.pow(o.distanceToSquared(g),p),y=Math.pow(g.distanceToSquared(f),p),S=Math.pow(f.distanceToSquared(u),p);y<1e-4&&(y=1),b<1e-4&&(b=y),S<1e-4&&(S=y),Gl.initNonuniformCatmullRom(o.x,g.x,f.x,u.x,b,y,S),Hl.initNonuniformCatmullRom(o.y,g.y,f.y,u.y,b,y,S),Vl.initNonuniformCatmullRom(o.z,g.z,f.z,u.z,b,y,S)}else this.curveType==="catmullrom"&&(Gl.initCatmullRom(o.x,g.x,f.x,u.x,this.tension),Hl.initCatmullRom(o.y,g.y,f.y,u.y,this.tension),Vl.initCatmullRom(o.z,g.z,f.z,u.z,this.tension));return i.set(Gl.calc(d),Hl.calc(d),Vl.calc(d)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(new U().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function gd(r,e,t,i,n){let a=.5*(i-e),s=.5*(n-t),o=r*r;return(2*t-2*i+a+s)*(r*o)+(-3*t+3*i-2*a-s)*o+a*r+t}function ma(r,e,t,i){return(function(n,a){let s=1-n;return s*s*a})(r,e)+(function(n,a){return 2*(1-n)*n*a})(r,t)+(function(n,a){return n*n*a})(r,i)}function fa(r,e,t,i,n){return(function(a,s){let o=1-a;return o*o*o*s})(r,e)+(function(a,s){let o=1-a;return 3*o*o*a*s})(r,t)+(function(a,s){return 3*(1-a)*a*a*s})(r,i)+(function(a,s){return a*a*a*s})(r,n)}var Pa=class extends yi{constructor(e=new pe,t=new pe,i=new pe,n=new pe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new pe){let i=t,n=this.v0,a=this.v1,s=this.v2,o=this.v3;return i.set(fa(e,n.x,a.x,s.x,o.x),fa(e,n.y,a.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ro=class extends yi{constructor(e=new U,t=new U,i=new U,n=new U){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=n}getPoint(e,t=new U){let i=t,n=this.v0,a=this.v1,s=this.v2,o=this.v3;return i.set(fa(e,n.x,a.x,s.x,o.x),fa(e,n.y,a.y,s.y,o.y),fa(e,n.z,a.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ia=class extends yi{constructor(e=new pe,t=new pe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new pe){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new pe){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ao=class extends yi{constructor(e=new U,t=new U){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new U){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new U){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},La=class extends yi{constructor(e=new pe,t=new pe,i=new pe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new pe){let i=t,n=this.v0,a=this.v1,s=this.v2;return i.set(ma(e,n.x,a.x,s.x),ma(e,n.y,a.y,s.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Da=class extends yi{constructor(e=new U,t=new U,i=new U){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new U){let i=t,n=this.v0,a=this.v1,s=this.v2;return i.set(ma(e,n.x,a.x,s.x),ma(e,n.y,a.y,s.y),ma(e,n.z,a.z,s.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Na=class extends yi{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new pe){let i=t,n=this.points,a=(n.length-1)*e,s=Math.floor(a),o=a-s,u=n[s===0?s:s-1],c=n[s],d=n[s>n.length-2?n.length-1:s+1],g=n[s>n.length-3?n.length-1:s+2];return i.set(gd(o,u.x,c.x,d.x,g.x),gd(o,u.y,c.y,d.y,g.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let n=e.points[t];this.points.push(new pe().fromArray(n))}return this}},so=Object.freeze({__proto__:null,ArcCurve:io,CatmullRomCurve3:no,CubicBezierCurve:Pa,CubicBezierCurve3:ro,EllipseCurve:Ur,LineCurve:Ia,LineCurve3:ao,QuadraticBezierCurve:La,QuadraticBezierCurve3:Da,SplineCurve:Na}),oo=class extends yi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new so[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),n=this.getCurveLengths(),a=0;for(;a<n.length;){if(n[a]>=i){let s=n[a]-i,o=this.curves[a],u=o.getLength(),c=u===0?0:1-s/u;return o.getPointAt(c,t)}a++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,n=this.curves.length;i<n;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let n=0,a=this.curves;n<a.length;n++){let s=a[n],o=s.isEllipseCurve?2*e:s.isLineCurve||s.isLineCurve3?1:s.isSplineCurve?e*s.points.length:e,u=s.getPoints(o);for(let c=0;c<u.length;c++){let d=u[c];i&&i.equals(d)||(t.push(d),i=d)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let n=e.curves[t];this.curves.push(new so[n.type]().fromJSON(n))}return this}},Ua=class extends oo{constructor(e){super(),this.type="Path",this.currentPoint=new pe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new Ia(this.currentPoint.clone(),new pe(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,n){let a=new La(this.currentPoint.clone(),new pe(e,t),new pe(i,n));return this.curves.push(a),this.currentPoint.set(i,n),this}bezierCurveTo(e,t,i,n,a,s){let o=new Pa(this.currentPoint.clone(),new pe(e,t),new pe(i,n),new pe(a,s));return this.curves.push(o),this.currentPoint.set(a,s),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new Na(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,n,a,s){let o=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(e+o,t+u,i,n,a,s),this}absarc(e,t,i,n,a,s){return this.absellipse(e,t,i,i,n,a,s),this}ellipse(e,t,i,n,a,s,o,u){let c=this.currentPoint.x,d=this.currentPoint.y;return this.absellipse(e+c,t+d,i,n,a,s,o,u),this}absellipse(e,t,i,n,a,s,o,u){let c=new Ur(e,t,i,n,a,s,o,u);if(this.curves.length>0){let g=c.getPoint(0);g.equals(this.currentPoint)||this.lineTo(g.x,g.y)}this.curves.push(c);let d=c.getPoint(1);return this.currentPoint.copy(d),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Fa=class extends Ua{constructor(e){super(e),this.uuid=Yr(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,n=this.holes.length;i<n;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let n=e.holes[t];this.holes.push(new Ua().fromJSON(n))}return this}};function xm(r,e,t=2){let i=e&&e.length,n=i?e[0]*t:r.length,a=vd(r,0,n,t,!0),s=[];if(!a||a.next===a.prev)return s;let o,u,c;if(i&&(a=(function(d,g,f,p){let b=[];for(let y=0,S=g.length;y<S;y++){let x=vd(d,g[y]*p,y<S-1?g[y+1]*p:d.length,p,!1);x===x.next&&(x.steiner=!0),b.push(Cm(x))}b.sort(Em);for(let y=0;y<b.length;y++)f=wm(b[y],f);return f})(r,e,a,t)),r.length>80*t){o=r[0],u=r[1];let d=o,g=u;for(let f=t;f<n;f+=t){let p=r[f],b=r[f+1];p<o&&(o=p),b<u&&(u=b),p>d&&(d=p),b>g&&(g=b)}c=Math.max(d-o,g-u),c=c!==0?32767/c:0}return Oa(a,s,t,o,u,c,0),s}function vd(r,e,t,i,n){let a;if(n===(function(s,o,u,c){let d=0;for(let g=o,f=u-c;g<u;g+=c)d+=(s[f]-s[g])*(s[g+1]+s[f+1]),f=g;return d})(r,e,t,i)>0)for(let s=e;s<t;s+=i)a=yd(s/i|0,r[s],r[s+1],a);else for(let s=t-i;s>=e;s-=i)a=yd(s/i|0,r[s],r[s+1],a);return a&&Fr(a,a.next)&&(ka(a),a=a.next),a}function tr(r,e){if(!r)return r;e||(e=r);let t,i=r;do if(t=!1,i.steiner||!Fr(i,i.next)&&Ct(i.prev,i,i.next)!==0)i=i.next;else{if(ka(i),i=e=i.prev,i===i.next)break;t=!0}while(t||i!==e);return e}function Oa(r,e,t,i,n,a,s){if(!r)return;!s&&a&&(function(u,c,d,g){let f=u;do f.z===0&&(f.z=Ql(f.x,f.y,c,d,g)),f.prevZ=f.prev,f.nextZ=f.next,f=f.next;while(f!==u);f.prevZ.nextZ=null,f.prevZ=null,(function(p){let b,y=1;do{let S,x=p;p=null;let M=null;for(b=0;x;){b++;let E=x,C=0;for(let w=0;w<y&&(C++,E=E.nextZ,E);w++);let L=y;for(;C>0||L>0&&E;)C!==0&&(L===0||!E||x.z<=E.z)?(S=x,x=x.nextZ,C--):(S=E,E=E.nextZ,L--),M?M.nextZ=S:p=S,S.prevZ=M,M=S;x=E}M.nextZ=null,y*=2}while(b>1)})(f)})(r,i,n,a);let o=r;for(;r.prev!==r.next;){let u=r.prev,c=r.next;if(a?Mm(r,i,n,a):bm(r))e.push(u.i,r.i,c.i),ka(r),r=c.next,o=c.next;else if((r=c)===o){s?s===1?Oa(r=Sm(tr(r),e),e,t,i,n,a,2):s===2&&Tm(r,e,t,i,n,a):Oa(tr(r),e,t,i,n,a,1);break}}}function bm(r){let e=r.prev,t=r,i=r.next;if(Ct(e,t,i)>=0)return!1;let n=e.x,a=t.x,s=i.x,o=e.y,u=t.y,c=i.y,d=Math.min(n,a,s),g=Math.min(o,u,c),f=Math.max(n,a,s),p=Math.max(o,u,c),b=i.next;for(;b!==e;){if(b.x>=d&&b.x<=f&&b.y>=g&&b.y<=p&&pa(n,o,a,u,s,c,b.x,b.y)&&Ct(b.prev,b,b.next)>=0)return!1;b=b.next}return!0}function Mm(r,e,t,i){let n=r.prev,a=r,s=r.next;if(Ct(n,a,s)>=0)return!1;let o=n.x,u=a.x,c=s.x,d=n.y,g=a.y,f=s.y,p=Math.min(o,u,c),b=Math.min(d,g,f),y=Math.max(o,u,c),S=Math.max(d,g,f),x=Ql(p,b,e,t,i),M=Ql(y,S,e,t,i),E=r.prevZ,C=r.nextZ;for(;E&&E.z>=x&&C&&C.z<=M;){if(E.x>=p&&E.x<=y&&E.y>=b&&E.y<=S&&E!==n&&E!==s&&pa(o,d,u,g,c,f,E.x,E.y)&&Ct(E.prev,E,E.next)>=0||(E=E.prevZ,C.x>=p&&C.x<=y&&C.y>=b&&C.y<=S&&C!==n&&C!==s&&pa(o,d,u,g,c,f,C.x,C.y)&&Ct(C.prev,C,C.next)>=0))return!1;C=C.nextZ}for(;E&&E.z>=x;){if(E.x>=p&&E.x<=y&&E.y>=b&&E.y<=S&&E!==n&&E!==s&&pa(o,d,u,g,c,f,E.x,E.y)&&Ct(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;C&&C.z<=M;){if(C.x>=p&&C.x<=y&&C.y>=b&&C.y<=S&&C!==n&&C!==s&&pa(o,d,u,g,c,f,C.x,C.y)&&Ct(C.prev,C,C.next)>=0)return!1;C=C.nextZ}return!0}function Sm(r,e){let t=r;do{let i=t.prev,n=t.next.next;!Fr(i,n)&&gh(i,t,t.next,n)&&Ba(i,n)&&Ba(n,i)&&(e.push(i.i,t.i,n.i),ka(t),ka(t.next),t=r=n),t=t.next}while(t!==r);return tr(t)}function Tm(r,e,t,i,n,a){let s=r;do{let o=s.next.next;for(;o!==s.prev;){if(s.i!==o.i&&Rm(s,o)){let u=vh(s,o);return s=tr(s,s.next),u=tr(u,u.next),Oa(s,e,t,i,n,a,0),void Oa(u,e,t,i,n,a,0)}o=o.next}s=s.next}while(s!==r)}function Em(r,e){let t=r.x-e.x;return t===0&&(t=r.y-e.y,t===0)&&(t=(r.next.y-r.y)/(r.next.x-r.x)-(e.next.y-e.y)/(e.next.x-e.x)),t}function wm(r,e){let t=(function(n,a){let s=a,o=n.x,u=n.y,c,d=-1/0;if(Fr(n,s))return s;do{if(Fr(n,s.next))return s.next;if(u<=s.y&&u>=s.next.y&&s.next.y!==s.y){let y=s.x+(u-s.y)*(s.next.x-s.x)/(s.next.y-s.y);if(y<=o&&y>d&&(d=y,c=s.x<s.next.x?s:s.next,y===o))return c}s=s.next}while(s!==a);if(!c)return null;let g=c,f=c.x,p=c.y,b=1/0;s=c;do{if(o>=s.x&&s.x>=f&&o!==s.x&&fh(u<p?o:d,u,f,p,u<p?d:o,u,s.x,s.y)){let y=Math.abs(u-s.y)/(o-s.x);Ba(s,n)&&(y<b||y===b&&(s.x>c.x||s.x===c.x&&Am(c,s)))&&(c=s,b=y)}s=s.next}while(s!==g);return c})(r,e);if(!t)return e;let i=vh(t,r);return tr(i,i.next),tr(t,t.next)}function Am(r,e){return Ct(r.prev,r,e.prev)<0&&Ct(e.next,r,r.next)<0}function Ql(r,e,t,i,n){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*n|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-i)*n|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function Cm(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function fh(r,e,t,i,n,a,s,o){return(n-s)*(e-o)>=(r-s)*(a-o)&&(r-s)*(i-o)>=(t-s)*(e-o)&&(t-s)*(a-o)>=(n-s)*(i-o)}function pa(r,e,t,i,n,a,s,o){return!(r===s&&e===o)&&fh(r,e,t,i,n,a,s,o)}function Rm(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!(function(t,i){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==i.i&&n.next.i!==i.i&&gh(n,n.next,t,i))return!0;n=n.next}while(n!==t);return!1})(r,e)&&(Ba(r,e)&&Ba(e,r)&&(function(t,i){let n=t,a=!1,s=(t.x+i.x)/2,o=(t.y+i.y)/2;do n.y>o!=n.next.y>o&&n.next.y!==n.y&&s<(n.next.x-n.x)*(o-n.y)/(n.next.y-n.y)+n.x&&(a=!a),n=n.next;while(n!==t);return a})(r,e)&&(Ct(r.prev,r,e.prev)||Ct(r,e.prev,e))||Fr(r,e)&&Ct(r.prev,r,r.next)>0&&Ct(e.prev,e,e.next)>0)}function Ct(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Fr(r,e){return r.x===e.x&&r.y===e.y}function gh(r,e,t,i){let n=Ns(Ct(r,e,t)),a=Ns(Ct(r,e,i)),s=Ns(Ct(t,i,r)),o=Ns(Ct(t,i,e));return n!==a&&s!==o||!(n!==0||!Ds(r,t,e))||!(a!==0||!Ds(r,i,e))||!(s!==0||!Ds(t,r,i))||!(o!==0||!Ds(t,e,i))}function Ds(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function Ns(r){return r>0?1:r<0?-1:0}function Ba(r,e){return Ct(r.prev,r,r.next)<0?Ct(r,e,r.next)>=0&&Ct(r,r.prev,e)>=0:Ct(r,e,r.prev)<0||Ct(r,r.next,e)<0}function vh(r,e){let t=ec(r.i,r.x,r.y),i=ec(e.i,e.x,e.y),n=r.next,a=e.prev;return r.next=e,e.prev=r,t.next=n,n.prev=t,i.next=t,t.prev=i,a.next=i,i.prev=a,i}function yd(r,e,t,i){let n=ec(r,e,t);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function ka(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function ec(r,e,t){return{i:r,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}var tc=class{static triangulate(e,t,i=2){return xm(e,t,i)}},Wi=class r{static area(e){let t=e.length,i=0;for(let n=t-1,a=0;a<t;n=a++)i+=e[n].x*e[a].y-e[a].x*e[n].y;return .5*i}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let i=[],n=[],a=[];_d(e),xd(i,e);let s=e.length;t.forEach(_d);for(let u=0;u<t.length;u++)n.push(s),s+=t[u].length,xd(i,t[u]);let o=tc.triangulate(i,n);for(let u=0;u<o.length;u+=3)a.push(o.slice(u,u+3));return a}};function _d(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function xd(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}var lo=class r extends _t{constructor(e=new Fa([new pe(.5,.5),new pe(-.5,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,n=[],a=[];for(let o=0,u=e.length;o<u;o++)s(e[o]);function s(o){let u=[],c=t.curveSegments!==void 0?t.curveSegments:12,d=t.steps!==void 0?t.steps:1,g=t.depth!==void 0?t.depth:1,f=t.bevelEnabled===void 0||t.bevelEnabled,p=t.bevelThickness!==void 0?t.bevelThickness:.2,b=t.bevelSize!==void 0?t.bevelSize:p-.1,y=t.bevelOffset!==void 0?t.bevelOffset:0,S=t.bevelSegments!==void 0?t.bevelSegments:3,x=t.extrudePath,M=t.UVGenerator!==void 0?t.UVGenerator:Pm,E,C,L,w,k,W=!1;if(x){E=x.getSpacedPoints(d),W=!0,f=!1;let N=!!x.isCatmullRomCurve3&&x.closed;C=x.computeFrenetFrames(d,N),L=new U,w=new U,k=new U}f||(S=0,p=0,b=0,y=0);let G=o.extractPoints(c),H=G.shape,K=G.holes;if(!Wi.isClockWise(H)){H=H.reverse();for(let N=0,V=K.length;N<V;N++){let _=K[N];Wi.isClockWise(_)&&(K[N]=_.reverse())}}function q(N){let V=10000000000000001e-36,_=N[0];for(let z=1;z<=N.length;z++){let O=z%N.length,I=N[O],j=I.x-_.x,J=I.y-_.y,re=j*j+J*J,me=Math.max(Math.abs(I.x),Math.abs(I.y),Math.abs(_.x),Math.abs(_.y));re<=V*me*me?(N.splice(O,1),z--):_=I}}q(H),K.forEach(q);let se=K.length,ee=H;for(let N=0;N<se;N++){let V=K[N];H=H.concat(V)}function Z(N,V,_){return V||Ge("ExtrudeGeometry: vec does not exist"),N.clone().addScaledVector(V,_)}let v=H.length;function $(N,V,_){let z,O,I,j=N.x-V.x,J=N.y-V.y,re=_.x-N.x,me=_.y-N.y,Ie=j*j+J*J,Re=j*me-J*re;if(Math.abs(Re)>Number.EPSILON){let xe=Math.sqrt(Ie),He=Math.sqrt(re*re+me*me),de=V.x-J/xe,ve=V.y+j/xe,fe=((_.x-me/He-de)*me-(_.y+re/He-ve)*re)/(j*me-J*re);z=de+j*fe-N.x,O=ve+J*fe-N.y;let Ee=z*z+O*O;if(Ee<=2)return new pe(z,O);I=Math.sqrt(Ee/2)}else{let xe=!1;j>Number.EPSILON?re>Number.EPSILON&&(xe=!0):j<-Number.EPSILON?re<-Number.EPSILON&&(xe=!0):Math.sign(J)===Math.sign(me)&&(xe=!0),xe?(z=-J,O=j,I=Math.sqrt(Ie)):(z=j,O=J,I=Math.sqrt(Ie/2))}return new pe(z/I,O/I)}let ue=[];for(let N=0,V=ee.length,_=V-1,z=N+1;N<V;N++,_++,z++)_===V&&(_=0),z===V&&(z=0),ue[N]=$(ee[N],ee[_],ee[z]);let _e=[],Ne,Ae,Pe=ue.concat();for(let N=0,V=se;N<V;N++){let _=K[N];Ne=[];for(let z=0,O=_.length,I=O-1,j=z+1;z<O;z++,I++,j++)I===O&&(I=0),j===O&&(j=0),Ne[z]=$(_[z],_[I],_[j]);_e.push(Ne),Pe=Pe.concat(Ne)}if(S===0)Ae=Wi.triangulateShape(ee,K);else{let N=[],V=[];for(let _=0;_<S;_++){let z=_/S,O=p*Math.cos(z*Math.PI/2),I=b*Math.sin(z*Math.PI/2)+y;for(let j=0,J=ee.length;j<J;j++){let re=Z(ee[j],ue[j],I);Te(re.x,re.y,-O),z===0&&N.push(re)}for(let j=0,J=se;j<J;j++){let re=K[j];Ne=_e[j];let me=[];for(let Ie=0,Re=re.length;Ie<Re;Ie++){let xe=Z(re[Ie],Ne[Ie],I);Te(xe.x,xe.y,-O),z===0&&me.push(xe)}z===0&&V.push(me)}}Ae=Wi.triangulateShape(N,V)}let he=Ae.length,Me=b+y;for(let N=0;N<v;N++){let V=f?Z(H[N],Pe[N],Me):H[N];W?(w.copy(C.normals[0]).multiplyScalar(V.x),L.copy(C.binormals[0]).multiplyScalar(V.y),k.copy(E[0]).add(w).add(L),Te(k.x,k.y,k.z)):Te(V.x,V.y,0)}for(let N=1;N<=d;N++)for(let V=0;V<v;V++){let _=f?Z(H[V],Pe[V],Me):H[V];W?(w.copy(C.normals[N]).multiplyScalar(_.x),L.copy(C.binormals[N]).multiplyScalar(_.y),k.copy(E[N]).add(w).add(L),Te(k.x,k.y,k.z)):Te(_.x,_.y,g/d*N)}for(let N=S-1;N>=0;N--){let V=N/S,_=p*Math.cos(V*Math.PI/2),z=b*Math.sin(V*Math.PI/2)+y;for(let O=0,I=ee.length;O<I;O++){let j=Z(ee[O],ue[O],z);Te(j.x,j.y,g+_)}for(let O=0,I=K.length;O<I;O++){let j=K[O];Ne=_e[O];for(let J=0,re=j.length;J<re;J++){let me=Z(j[J],Ne[J],z);W?Te(me.x,me.y+E[d-1].y,E[d-1].x+_):Te(me.x,me.y,g+_)}}}function ye(N,V){let _=N.length;for(;--_>=0;){let z=_,O=_-1;O<0&&(O=N.length-1);for(let I=0,j=d+2*S;I<j;I++){let J=v*I,re=v*(I+1);oe(V+z+J,V+O+J,V+O+re,V+z+re)}}}function Te(N,V,_){u.push(N),u.push(V),u.push(_)}function Ue(N,V,_){F(N),F(V),F(_);let z=n.length/3,O=M.generateTopUV(i,n,z-3,z-2,z-1);A(O[0]),A(O[1]),A(O[2])}function oe(N,V,_,z){F(N),F(V),F(z),F(V),F(_),F(z);let O=n.length/3,I=M.generateSideWallUV(i,n,O-6,O-3,O-2,O-1);A(I[0]),A(I[1]),A(I[3]),A(I[1]),A(I[2]),A(I[3])}function F(N){n.push(u[3*N+0]),n.push(u[3*N+1]),n.push(u[3*N+2])}function A(N){a.push(N.x),a.push(N.y)}(function(){let N=n.length/3;if(f){let V=0,_=v*V;for(let z=0;z<he;z++){let O=Ae[z];Ue(O[2]+_,O[1]+_,O[0]+_)}V=d+2*S,_=v*V;for(let z=0;z<he;z++){let O=Ae[z];Ue(O[0]+_,O[1]+_,O[2]+_)}}else{for(let V=0;V<he;V++){let _=Ae[V];Ue(_[2],_[1],_[0])}for(let V=0;V<he;V++){let _=Ae[V];Ue(_[0]+v*d,_[1]+v*d,_[2]+v*d)}}i.addGroup(N,n.length/3-N,0)})(),(function(){let N=n.length/3,V=0;ye(ee,V),V+=ee.length;for(let _=0,z=K.length;_<z;_++){let O=K[_];ye(O,V),V+=O.length}i.addGroup(N,n.length/3-N,1)})()}this.setAttribute("position",new Ve(n,3)),this.setAttribute("uv",new Ve(a,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,i,n){if(n.shapes=[],Array.isArray(t))for(let a=0,s=t.length;a<s;a++){let o=t[a];n.shapes.push(o.uuid)}else n.shapes.push(t.uuid);return n.options=Object.assign({},i),i.extrudePath!==void 0&&(n.options.extrudePath=i.extrudePath.toJSON()),n})(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let i=[];for(let a=0,s=e.shapes.length;a<s;a++){let o=t[e.shapes[a]];i.push(o)}let n=e.options.extrudePath;return n!==void 0&&(e.options.extrudePath=new so[n.type]().fromJSON(n)),new r(i,e.options)}},Pm={generateTopUV:function(r,e,t,i,n){let a=e[3*t],s=e[3*t+1],o=e[3*i],u=e[3*i+1],c=e[3*n],d=e[3*n+1];return[new pe(a,s),new pe(o,u),new pe(c,d)]},generateSideWallUV:function(r,e,t,i,n,a){let s=e[3*t],o=e[3*t+1],u=e[3*t+2],c=e[3*i],d=e[3*i+1],g=e[3*i+2],f=e[3*n],p=e[3*n+1],b=e[3*n+2],y=e[3*a],S=e[3*a+1],x=e[3*a+2];return Math.abs(o-d)<Math.abs(s-c)?[new pe(s,1-u),new pe(c,1-g),new pe(f,1-b),new pe(y,1-x)]:[new pe(o,1-u),new pe(d,1-g),new pe(p,1-b),new pe(S,1-x)]}},co=class r extends Nn{constructor(e=1,t=0){let i=(1+Math.sqrt(5))/2;super([-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},uo=class r extends _t{constructor(e=[new pe(0,-.5),new pe(.5,0),new pe(0,.5)],t=12,i=0,n=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:i,phiLength:n},t=Math.floor(t),n=et(n,0,2*Math.PI);let a=[],s=[],o=[],u=[],c=[],d=1/t,g=new U,f=new pe,p=new U,b=new U,y=new U,S=0,x=0;for(let M=0;M<=e.length-1;M++)switch(M){case 0:S=e[M+1].x-e[M].x,x=e[M+1].y-e[M].y,p.x=1*x,p.y=-S,p.z=0*x,y.copy(p),p.normalize(),u.push(p.x,p.y,p.z);break;case e.length-1:u.push(y.x,y.y,y.z);break;default:S=e[M+1].x-e[M].x,x=e[M+1].y-e[M].y,p.x=1*x,p.y=-S,p.z=0*x,b.copy(p),p.x+=y.x,p.y+=y.y,p.z+=y.z,p.normalize(),u.push(p.x,p.y,p.z),y.copy(b)}for(let M=0;M<=t;M++){let E=i+M*d*n,C=Math.sin(E),L=Math.cos(E);for(let w=0;w<=e.length-1;w++){g.x=e[w].x*C,g.y=e[w].y,g.z=e[w].x*L,s.push(g.x,g.y,g.z),f.x=M/t,f.y=w/(e.length-1),o.push(f.x,f.y);let k=u[3*w+0]*C,W=u[3*w+1],G=u[3*w+0]*L;c.push(k,W,G)}}for(let M=0;M<t;M++)for(let E=0;E<e.length-1;E++){let C=E+M*e.length,L=C,w=C+e.length,k=C+e.length+1,W=C+1;a.push(L,w,W),a.push(k,W,w)}this.setIndex(a),this.setAttribute("position",new Ve(s,3)),this.setAttribute("uv",new Ve(o,2)),this.setAttribute("normal",new Ve(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},ho=class r extends Nn{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Or=class r extends _t{constructor(e=1,t=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:n};let a=e/2,s=t/2,o=Math.floor(i),u=Math.floor(n),c=o+1,d=u+1,g=e/o,f=t/u,p=[],b=[],y=[],S=[];for(let x=0;x<d;x++){let M=x*f-s;for(let E=0;E<c;E++){let C=E*g-a;b.push(C,-M,0),y.push(0,0,1),S.push(E/o),S.push(1-x/u)}}for(let x=0;x<u;x++)for(let M=0;M<o;M++){let E=M+c*x,C=M+c*(x+1),L=M+1+c*(x+1),w=M+1+c*x;p.push(E,C,w),p.push(C,L,w)}this.setIndex(p),this.setAttribute("position",new Ve(b,3)),this.setAttribute("normal",new Ve(y,3)),this.setAttribute("uv",new Ve(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},po=class r extends _t{constructor(e=.5,t=1,i=32,n=1,a=0,s=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:n,thetaStart:a,thetaLength:s},i=Math.max(3,i);let o=[],u=[],c=[],d=[],g=e,f=(t-e)/(n=Math.max(1,n)),p=new U,b=new pe;for(let y=0;y<=n;y++){for(let S=0;S<=i;S++){let x=a+S/i*s;p.x=g*Math.cos(x),p.y=g*Math.sin(x),u.push(p.x,p.y,p.z),c.push(0,0,1),b.x=(p.x/t+1)/2,b.y=(p.y/t+1)/2,d.push(b.x,b.y)}g+=f}for(let y=0;y<n;y++){let S=y*(i+1);for(let x=0;x<i;x++){let M=x+S,E=M,C=M+i+1,L=M+i+2,w=M+1;o.push(E,C,w),o.push(C,L,w)}}this.setIndex(o),this.setAttribute("position",new Ve(u,3)),this.setAttribute("normal",new Ve(c,3)),this.setAttribute("uv",new Ve(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},mo=class r extends _t{constructor(e=new Fa([new pe(0,.5),new pe(-.5,-.5),new pe(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let i=[],n=[],a=[],s=[],o=0,u=0;if(Array.isArray(e)===!1)c(e);else for(let d=0;d<e.length;d++)c(e[d]),this.addGroup(o,u,d),o+=u,u=0;function c(d){let g=n.length/3,f=d.extractPoints(t),p=f.shape,b=f.holes;Wi.isClockWise(p)===!1&&(p=p.reverse());for(let S=0,x=b.length;S<x;S++){let M=b[S];Wi.isClockWise(M)===!0&&(b[S]=M.reverse())}let y=Wi.triangulateShape(p,b);for(let S=0,x=b.length;S<x;S++){let M=b[S];p=p.concat(M)}for(let S=0,x=p.length;S<x;S++){let M=p[S];n.push(M.x,M.y,0),a.push(0,0,1),s.push(M.x,M.y)}for(let S=0,x=y.length;S<x;S++){let M=y[S],E=M[0]+g,C=M[1]+g,L=M[2]+g;i.push(E,C,L),u+=3}}this.setIndex(i),this.setAttribute("position",new Ve(n,3)),this.setAttribute("normal",new Ve(a,3)),this.setAttribute("uv",new Ve(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return(function(t,i){if(i.shapes=[],Array.isArray(t))for(let n=0,a=t.length;n<a;n++){let s=t[n];i.shapes.push(s.uuid)}else i.shapes.push(t.uuid);return i})(this.parameters.shapes,e)}static fromJSON(e,t){let i=[];for(let n=0,a=e.shapes.length;n<a;n++){let s=t[e.shapes[n]];i.push(s)}return new r(i,e.curveSegments)}},Un=class r extends _t{constructor(e=1,t=32,i=16,n=0,a=2*Math.PI,s=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:n,phiLength:a,thetaStart:s,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let u=Math.min(s+o,Math.PI),c=0,d=[],g=new U,f=new U,p=[],b=[],y=[],S=[];for(let x=0;x<=i;x++){let M=[],E=x/i,C=s+E*o,L=e*Math.cos(C),w=Math.sqrt(e*e-L*L),k=0;x===0&&s===0?k=.5/t:x===i&&u===Math.PI&&(k=-.5/t);for(let W=0;W<=t;W++){let G=W/t,H=n+G*a;g.x=-w*Math.cos(H),g.y=L,g.z=w*Math.sin(H),b.push(g.x,g.y,g.z),f.copy(g).normalize(),y.push(f.x,f.y,f.z),S.push(G+k,1-E),M.push(c++)}d.push(M)}for(let x=0;x<i;x++)for(let M=0;M<t;M++){let E=d[x][M+1],C=d[x][M],L=d[x+1][M],w=d[x+1][M+1];(x!==0||s>0)&&p.push(E,C,w),(x!==i-1||u<Math.PI)&&p.push(C,L,w)}this.setIndex(p),this.setAttribute("position",new Ve(b,3)),this.setAttribute("normal",new Ve(y,3)),this.setAttribute("uv",new Ve(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},fo=class r extends Nn{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},go=class r extends _t{constructor(e=1,t=.4,i=12,n=48,a=2*Math.PI,s=0,o=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:n,arc:a,thetaStart:s,thetaLength:o},i=Math.floor(i),n=Math.floor(n);let u=[],c=[],d=[],g=[],f=new U,p=new U,b=new U;for(let y=0;y<=i;y++){let S=s+y/i*o;for(let x=0;x<=n;x++){let M=x/n*a;p.x=(e+t*Math.cos(S))*Math.cos(M),p.y=(e+t*Math.cos(S))*Math.sin(M),p.z=t*Math.sin(S),c.push(p.x,p.y,p.z),f.x=e*Math.cos(M),f.y=e*Math.sin(M),b.subVectors(p,f).normalize(),d.push(b.x,b.y,b.z),g.push(x/n),g.push(y/i)}}for(let y=1;y<=i;y++)for(let S=1;S<=n;S++){let x=(n+1)*y+S-1,M=(n+1)*(y-1)+S-1,E=(n+1)*(y-1)+S,C=(n+1)*y+S;u.push(x,M,C),u.push(M,E,C)}this.setIndex(u),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(d,3)),this.setAttribute("uv",new Ve(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},vo=class r extends _t{constructor(e=1,t=.4,i=64,n=8,a=2,s=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:i,radialSegments:n,p:a,q:s},i=Math.floor(i),n=Math.floor(n);let o=[],u=[],c=[],d=[],g=new U,f=new U,p=new U,b=new U,y=new U,S=new U,x=new U;for(let E=0;E<=i;++E){let C=E/i*a*Math.PI*2;M(C,a,s,e,p),M(C+.01,a,s,e,b),S.subVectors(b,p),x.addVectors(b,p),y.crossVectors(S,x),x.crossVectors(y,S),y.normalize(),x.normalize();for(let L=0;L<=n;++L){let w=L/n*Math.PI*2,k=-t*Math.cos(w),W=t*Math.sin(w);g.x=p.x+(k*x.x+W*y.x),g.y=p.y+(k*x.y+W*y.y),g.z=p.z+(k*x.z+W*y.z),u.push(g.x,g.y,g.z),f.subVectors(g,p).normalize(),c.push(f.x,f.y,f.z),d.push(E/i),d.push(L/n)}}for(let E=1;E<=i;E++)for(let C=1;C<=n;C++){let L=(n+1)*(E-1)+(C-1),w=(n+1)*E+(C-1),k=(n+1)*E+C,W=(n+1)*(E-1)+C;o.push(L,w,W),o.push(w,k,W)}function M(E,C,L,w,k){let W=Math.cos(E),G=Math.sin(E),H=L/C*E,K=Math.cos(H);k.x=w*(2+K)*.5*W,k.y=w*(2+K)*G*.5,k.z=w*Math.sin(H)*.5}this.setIndex(o),this.setAttribute("position",new Ve(u,3)),this.setAttribute("normal",new Ve(c,3)),this.setAttribute("uv",new Ve(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},yo=class r extends _t{constructor(e=new Da(new U(-1,-1,0),new U(-1,1,0),new U(1,1,0)),t=64,i=1,n=8,a=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:n,closed:a};let s=e.computeFrenetFrames(t,a);this.tangents=s.tangents,this.normals=s.normals,this.binormals=s.binormals;let o=new U,u=new U,c=new pe,d=new U,g=[],f=[],p=[],b=[];function y(S){d=e.getPointAt(S/t,d);let x=s.normals[S],M=s.binormals[S];for(let E=0;E<=n;E++){let C=E/n*Math.PI*2,L=Math.sin(C),w=-Math.cos(C);u.x=w*x.x+L*M.x,u.y=w*x.y+L*M.y,u.z=w*x.z+L*M.z,u.normalize(),f.push(u.x,u.y,u.z),o.x=d.x+i*u.x,o.y=d.y+i*u.y,o.z=d.z+i*u.z,g.push(o.x,o.y,o.z)}}(function(){for(let S=0;S<t;S++)y(S);y(a===!1?t:0),(function(){for(let S=0;S<=t;S++)for(let x=0;x<=n;x++)c.x=S/t,c.y=x/n,p.push(c.x,c.y)})(),(function(){for(let S=1;S<=t;S++)for(let x=1;x<=n;x++){let M=(n+1)*(S-1)+(x-1),E=(n+1)*S+(x-1),C=(n+1)*S+x,L=(n+1)*(S-1)+x;b.push(M,E,L),b.push(E,C,L)}})()})(),this.setIndex(b),this.setAttribute("position",new Ve(g,3)),this.setAttribute("normal",new Ve(f,3)),this.setAttribute("uv",new Ve(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new so[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},_o=class extends _t{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],i=new Set,n=new U,a=new U;if(e.index!==null){let s=e.attributes.position,o=e.index,u=e.groups;u.length===0&&(u=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,d=u.length;c<d;++c){let g=u[c],f=g.start;for(let p=f,b=f+g.count;p<b;p+=3)for(let y=0;y<3;y++){let S=o.getX(p+y),x=o.getX(p+(y+1)%3);n.fromBufferAttribute(s,S),a.fromBufferAttribute(s,x),bd(n,a,i)===!0&&(t.push(n.x,n.y,n.z),t.push(a.x,a.y,a.z))}}}else{let s=e.attributes.position;for(let o=0,u=s.count/3;o<u;o++)for(let c=0;c<3;c++){let d=3*o+c,g=3*o+(c+1)%3;n.fromBufferAttribute(s,d),a.fromBufferAttribute(s,g),bd(n,a,i)===!0&&(t.push(n.x,n.y,n.z),t.push(a.x,a.y,a.z))}}this.setAttribute("position",new Ve(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function bd(r,e,t){let i=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,n=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(i)!==!0&&t.has(n)!==!0&&(t.add(i),t.add(n),!0)}var x0=Object.freeze({__proto__:null,BoxGeometry:er,CapsuleGeometry:Js,CircleGeometry:Ks,ConeGeometry:Qs,CylinderGeometry:Ra,DodecahedronGeometry:eo,EdgesGeometry:to,ExtrudeGeometry:lo,IcosahedronGeometry:co,LatheGeometry:uo,OctahedronGeometry:ho,PlaneGeometry:Or,PolyhedronGeometry:Nn,RingGeometry:po,ShapeGeometry:mo,SphereGeometry:Un,TetrahedronGeometry:fo,TorusGeometry:go,TorusKnotGeometry:vo,TubeGeometry:yo,WireframeGeometry:_o});function or(r){let e={};for(let t in r){e[t]={};for(let i in r[t]){let n=r[t][i];if(Md(n))n.isRenderTargetTexture?(ke("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=n.clone();else if(Array.isArray(n))if(Md(n[0])){let a=[];for(let s=0,o=n.length;s<o;s++)a[s]=n[s].clone();e[t][i]=a}else e[t][i]=n.slice();else e[t][i]=n}}return e}function ei(r){let e={};for(let t=0;t<r.length;t++){let i=or(r[t]);for(let n in i)e[n]=i[n]}return e}function Md(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function cu(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:rt.workingColorSpace}var yh={clone:or,merge:ei},ni=class extends dn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=or(e.uniforms),this.uniformsGroups=(function(t){let i=[];for(let n=0;n<t.length;n++)i.push(t[n].clone());return i})(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let a=this.uniforms[n].value;a&&a.isTexture?t.uniforms[n]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[n]={type:"m4",value:a.toArray()}:t.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let n=e.uniforms[i];switch(this.uniforms[i]={},n.type){case"t":this.uniforms[i].value=t[n.value]||null;break;case"c":this.uniforms[i].value=new $e().setHex(n.value);break;case"v2":this.uniforms[i].value=new pe().fromArray(n.value);break;case"v3":this.uniforms[i].value=new U().fromArray(n.value);break;case"v4":this.uniforms[i].value=new pt().fromArray(n.value);break;case"m3":this.uniforms[i].value=new Xe().fromArray(n.value);break;case"m4":this.uniforms[i].value=new Je().fromArray(n.value);break;default:this.uniforms[i].value=n.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},xo=class extends ni{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Br=class extends dn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new $e(16777215),this.specular=new $e(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new un,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var bo=class extends dn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Mo=class extends dn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Us(r,e){return r&&r.constructor!==e?typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r):r}var Fn=class{constructor(e,t,i,n){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=n!==void 0?n:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,n=t[i],a=t[i-1];i:{e:{let s;t:{n:if(!(e<n)){for(let o=i+2;;){if(n===void 0){if(e<a)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=n,n=t[++i],e<n)break e}s=t.length;break t}if(!(e>=a)){let o=t[1];e<o&&(i=2,a=o);for(let u=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===u)break;if(n=a,a=t[--i-1],e>=a)break e}s=i,i=0;break t}break i}for(;i<s;){let o=i+s>>>1;e<t[o]?s=o:i=o+1}if(n=t[i],a=t[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,n)}return this.interpolate_(i,a,e,n)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,n=this.valueSize,a=e*n;for(let s=0;s!==n;++s)t[s]=i[a+s];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},So=class extends Fn{constructor(e,t,i,n){super(e,t,i,n),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xl,endingEnd:Xl}}intervalChanged_(e,t,i){let n=this.parameterPositions,a=e-2,s=e+1,o=n[a],u=n[s];if(o===void 0)switch(this.getSettings_().endingStart){case jl:a=e,o=2*t-i;break;case Yl:a=n.length-2,o=t+n[a]-n[a+1];break;default:a=e,o=i}if(u===void 0)switch(this.getSettings_().endingEnd){case jl:s=e,u=2*i-t;break;case Yl:s=1,u=i+n[1]-n[0];break;default:s=e-1,u=t}let c=.5*(i-t),d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(u-i),this._offsetPrev=a*d,this._offsetNext=s*d}interpolate_(e,t,i,n){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,u=e*o,c=u-o,d=this._offsetPrev,g=this._offsetNext,f=this._weightPrev,p=this._weightNext,b=(i-t)/(n-t),y=b*b,S=y*b,x=-f*S+2*f*y-f*b,M=(1+f)*S+(-1.5-2*f)*y+(-.5+f)*b+1,E=(-1-p)*S+(1.5+p)*y+.5*b,C=p*S-p*y;for(let L=0;L!==o;++L)a[L]=x*s[d+L]+M*s[c+L]+E*s[u+L]+C*s[g+L];return a}},To=class extends Fn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,u=e*o,c=u-o,d=(i-t)/(n-t),g=1-d;for(let f=0;f!==o;++f)a[f]=s[c+f]*g+s[u+f]*d;return a}},Eo=class extends Fn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e){return this.copySampleValue_(e-1)}},wo=class extends Fn{interpolate_(e,t,i,n){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,u=e*o,c=u-o,d=this.inTangents,g=this.outTangents;if(!d||!g){let b=(i-t)/(n-t),y=1-b;for(let S=0;S!==o;++S)a[S]=s[c+S]*y+s[u+S]*b;return a}let f=2*o,p=e-1;for(let b=0;b!==o;++b){let y=s[c+b],S=s[u+b],x=p*f+2*b,M=g[x],E=g[x+1],C=e*f+2*b,L=d[C],w=d[C+1],k,W,G,H,K,q=(i-t)/(n-t);for(let se=0;se<8;se++){k=q*q,W=k*q,G=1-q,H=G*G,K=H*G;let ee=K*t+3*H*q*M+3*G*k*L+W*n-i;if(Math.abs(ee)<1e-10)break;let Z=3*H*(M-t)+6*G*q*(L-M)+3*k*(n-L);if(Math.abs(Z)<1e-10)break;q-=ee/Z,q=Math.max(0,Math.min(1,q))}a[b]=K*y+3*H*q*E+3*G*k*w+W*S}return a}},gi=class{constructor(e,t,i,n){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Us(t,this.TimeBufferType),this.values=Us(i,this.ValueBufferType),this.setInterpolation(n||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Us(e.times,Array),values:Us(e.values,Array)};let n=e.getInterpolation();n!==e.DefaultInterpolation&&(i.interpolation=n)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Eo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new To(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new So(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new wo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ga:t=this.InterpolantFactoryMethodDiscrete;break;case Vs:t=this.InterpolantFactoryMethodLinear;break;case Bs:t=this.InterpolantFactoryMethodSmooth;break;case ql:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(i);this.setInterpolation(this.DefaultInterpolation)}return ke("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ga;case this.InterpolantFactoryMethodLinear:return Vs;case this.InterpolantFactoryMethodSmooth:return Bs;case this.InterpolantFactoryMethodBezier:return ql}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,n=t.length;i!==n;++i)t[i]*=e}return this}trim(e,t){let i=this.times,n=i.length,a=0,s=n-1;for(;a!==n&&i[a]<e;)++a;for(;s!==-1&&i[s]>t;)--s;if(++s,a!==0||s!==n){a>=s&&(s=Math.max(s,1),a=s-1);let o=this.getValueSize();this.times=i.slice(a,s),this.values=this.values.slice(a*o,s*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ge("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,n=this.values,a=i.length;a===0&&(Ge("KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let o=0;o!==a;o++){let u=i[o];if(typeof u=="number"&&isNaN(u)){Ge("KeyframeTrack: Time is not a valid number.",this,o,u),e=!1;break}if(s!==null&&s>u){Ge("KeyframeTrack: Out of order keys.",this,o,u,s),e=!1;break}s=u}if(n!==void 0&&em(n))for(let o=0,u=n.length;o!==u;++o){let c=n[o];if(isNaN(c)){Ge("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),n=this.getInterpolation()===Bs,a=e.length-1,s=1;for(let o=1;o<a;++o){let u=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(n)u=!0;else{let d=o*i,g=d-i,f=d+i;for(let p=0;p!==i;++p){let b=t[d+p];if(b!==t[g+p]||b!==t[f+p]){u=!0;break}}}if(u){if(o!==s){e[s]=e[o];let d=o*i,g=s*i;for(let f=0;f!==i;++f)t[g+f]=t[d+f]}++s}}if(a>0){e[s]=e[a];for(let o=a*i,u=s*i,c=0;c!==i;++c)t[u+c]=t[o+c];++s}return s!==e.length?(this.times=e.slice(0,s),this.values=t.slice(0,s*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=new this.constructor(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};gi.prototype.ValueTypeName="",gi.prototype.TimeBufferType=Float32Array,gi.prototype.ValueBufferType=Float32Array,gi.prototype.DefaultInterpolation=Vs;var In=class extends gi{constructor(e,t,i){super(e,t,i)}};In.prototype.ValueTypeName="bool",In.prototype.ValueBufferType=Array,In.prototype.DefaultInterpolation=ga,In.prototype.InterpolantFactoryMethodLinear=void 0,In.prototype.InterpolantFactoryMethodSmooth=void 0;var Ao=class extends gi{constructor(e,t,i,n){super(e,t,i,n)}};Ao.prototype.ValueTypeName="color";var Co=class extends gi{constructor(e,t,i,n){super(e,t,i,n)}};Co.prototype.ValueTypeName="number";var Ro=class extends Fn{constructor(e,t,i,n){super(e,t,i,n)}interpolate_(e,t,i,n){let a=this.resultBuffer,s=this.sampleValues,o=this.valueSize,u=(i-t)/(n-t),c=e*o;for(let d=c+o;c!==d;c+=4)Ci.slerpFlat(a,0,s,c-o,s,c,u);return a}},za=class extends gi{constructor(e,t,i,n){super(e,t,i,n)}InterpolantFactoryMethodLinear(e){return new Ro(this.times,this.values,this.getValueSize(),e)}};za.prototype.ValueTypeName="quaternion",za.prototype.InterpolantFactoryMethodSmooth=void 0;var Ln=class extends gi{constructor(e,t,i){super(e,t,i)}};Ln.prototype.ValueTypeName="string",Ln.prototype.ValueBufferType=Array,Ln.prototype.DefaultInterpolation=ga,Ln.prototype.InterpolantFactoryMethodLinear=void 0,Ln.prototype.InterpolantFactoryMethodSmooth=void 0;var Po=class extends gi{constructor(e,t,i,n){super(e,t,i,n)}};Po.prototype.ValueTypeName="vector";var zs={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(Sd(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!Sd(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function Sd(r){try{let e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var kr=class{constructor(e,t,i){let n=this,a,s=!1,o=0,u=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(d){u++,s===!1&&n.onStart!==void 0&&n.onStart(d,o,u),s=!0},this.itemEnd=function(d){o++,n.onProgress!==void 0&&n.onProgress(d,o,u),o===u&&(s=!1,n.onLoad!==void 0&&n.onLoad())},this.itemError=function(d){n.onError!==void 0&&n.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),a?a(d):d},this.setURLModifier=function(d){return a=d,this},this.addHandler=function(d,g){return c.push(d,g),this},this.removeHandler=function(d){let g=c.indexOf(d);return g!==-1&&c.splice(g,2),this},this.getHandler=function(d){for(let g=0,f=c.length;g<f;g+=2){let p=c[g],b=c[g+1];if(p.global&&(p.lastIndex=0),p.test(d))return b}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},_h=new kr,zr=class{constructor(e){this.manager=e!==void 0?e:_h,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(n,a){i.load(e,n,t,a)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};zr.DEFAULT_MATERIAL_NAME="__DEFAULT";var wr=new WeakMap,Io=class extends zr{constructor(e){super(e)}load(e,t,i,n){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let a=this,s=zs.get(`image:${e}`);if(s!==void 0){if(s.complete===!0)a.manager.itemStart(e),setTimeout(function(){t&&t(s),a.manager.itemEnd(e)},0);else{let g=wr.get(s);g===void 0&&(g=[],wr.set(s,g)),g.push({onLoad:t,onError:n})}return s}let o=Pr("img");function u(){d(),t&&t(this);let g=wr.get(this)||[];for(let f=0;f<g.length;f++){let p=g[f];p.onLoad&&p.onLoad(this)}wr.delete(this),a.manager.itemEnd(e)}function c(g){d(),n&&n(g),zs.remove(`image:${e}`);let f=wr.get(this)||[];for(let p=0;p<f.length;p++){let b=f[p];b.onError&&b.onError(g)}wr.delete(this),a.manager.itemError(e),a.manager.itemEnd(e)}function d(){o.removeEventListener("load",u,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",u,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),zs.add(`image:${e}`,o),a.manager.itemStart(e),o.src=e,o}};var Ga=class extends zr{constructor(e){super(e)}load(e,t,i,n){let a=new ti,s=new Io(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(o){a.image=o,a.needsUpdate=!0,t!==void 0&&t(a)},i,n),a}},Ha=class extends Yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Va=class extends Ha{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new $e(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Wl=new Je,Td=new U,Ed=new U,ic=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new pe(512,512),this.mapType=_i,this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hn,this._frameExtents=new pe(1,1),this._viewportCount=1,this._viewports=[new pt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;Td.setFromMatrixPosition(e.matrixWorld),t.position.copy(Td),Ed.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ed),t.updateMatrixWorld(),Wl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Rr||t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Wl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Fs=new U,Os=new Ci,Hi=new U,Gr=class extends Yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=cn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Fs,Os,Hi),Hi.x===1&&Hi.y===1&&Hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fs,Os,Hi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Fs,Os,Hi),Hi.x===1&&Hi.y===1&&Hi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fs,Os,Hi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Pn=new U,wd=new pe,Ad=new pe,ci=class extends Gr{constructor(e=50,t=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*Ws*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*ks*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*Ws*Math.atan(Math.tan(.5*ks*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Pn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Pn.x,Pn.y).multiplyScalar(-e/Pn.z),Pn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Pn.x,Pn.y).multiplyScalar(-e/Pn.z)}getViewSize(e,t){return this.getViewBounds(e,wd,Ad),t.subVectors(Ad,wd)}setViewOffset(e,t,i,n,a,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*ks*this.fov)/this.zoom,i=2*t,n=this.aspect*i,a=-.5*n,s=this.view;if(this.view!==null&&this.view.enabled){let u=s.fullWidth,c=s.fullHeight;a+=s.offsetX*n/u,t-=s.offsetY*i/c,n*=s.width/u,i*=s.height/c}let o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+n,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var On=class extends Gr{constructor(e=-1,t=1,i=1,n=-1,a=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=n,this.near=a,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,n,a,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=n,this.view.width=a,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2,a=i-e,s=i+e,o=n+t,u=n-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,s=a+c*this.view.width,o-=d*this.view.offsetY,u=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,s,o,u,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},nc=class extends ic{constructor(){super(new On(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Hr=class extends Ha{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.shadow=new nc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}};var b0=new Je,M0=new Je,S0=new Je;var Ar=-90,Lo=class extends Yt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let n=new ci(Ar,1,e,t);n.layers=this.layers,this.add(n);let a=new ci(Ar,1,e,t);a.layers=this.layers,this.add(a);let s=new ci(Ar,1,e,t);s.layers=this.layers,this.add(s);let o=new ci(Ar,1,e,t);o.layers=this.layers,this.add(o);let u=new ci(Ar,1,e,t);u.layers=this.layers,this.add(u);let c=new ci(Ar,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,n,a,s,o,u]=t;for(let c of t)this.remove(c);if(e===cn)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else{if(e!==Rr)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[a,s,o,u,c,d]=this.children,g=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),b=e.xr.enabled;e.xr.enabled=!1;let y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let S=!1;S=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(i,0,n),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,1,n),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,2,n),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,n),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(i,4,n),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=y,e.setRenderTarget(i,5,n),S&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(g,f,p),e.xr.enabled=b,i.texture.needsPMREMUpdate=!0}},Do=class extends ci{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var T0=new U,E0=new Ci,w0=new U,A0=new U,C0=new U;var R0=new U,P0=new Ci,I0=new U,L0=new U;var uu="\\[\\]\\.:\\/",Im=new RegExp("["+uu+"]","g"),$l="[^"+uu+"]",Lm="[^"+uu.replace("\\.","")+"]",Dm=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",$l)+/(WCOD+)?/.source.replace("WCOD",Lm)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$l)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$l)+"$"),Nm=["material","materials","bones","map"],Tt=class r{constructor(e,t,i){this.path=t,this.parsedPath=i||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,i):new r(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Im,"")}static parseTrackName(e){let t=Dm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},n=i.nodeName&&i.nodeName.lastIndexOf(".");if(n!==void 0&&n!==-1){let a=i.nodeName.substring(n+1);Nm.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,n),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(a){for(let s=0;s<a.length;s++){let o=a[s];if(o.name===t||o.uuid===t)return o;let u=i(o.children);if(u)return u}return null},n=i(e.children);if(n)return n}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let n=0,a=i.length;n!==a;++n)e[t++]=i[n]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let n=0,a=i.length;n!==a;++n)i[n]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let n=0,a=i.length;n!==a;++n)i[n]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let n=0,a=i.length;n!==a;++n)i[n]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,n=t.propertyName,a=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void ke("PropertyBinding: No target node found for track: "+this.path+".");if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material)return void Ge("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void Ge("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void Ge("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void Ge("PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void Ge("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[i]===void 0)return void Ge("PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[i]}if(c!==void 0){if(e[c]===void 0)return void Ge("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let s=e[n];if(s===void 0)return void Ge("PropertyBinding: Trying to update property for track: "+t.nodeName+"."+n+" but it wasn't found.",e);let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let u=this.BindingType.Direct;if(a!==void 0){if(n==="morphTargetInfluences"){if(!e.geometry)return void Ge("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void Ge("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[a]!==void 0&&(a=e.morphTargetDictionary[a])}u=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=a}else s.fromArray!==void 0&&s.toArray!==void 0?(u=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(u=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=n;this.getValue=this.GetterByBindingType[u],this.setValue=this.SetterByBindingTypeAndVersioning[u][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Tt.Composite=class{constructor(r,e,t){let i=t||Tt.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,i)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,i=this._bindings[t];i!==void 0&&i.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let i=this._targetGroup.nCachedObjects_,n=t.length;i!==n;++i)t[i].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},Tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Tt.prototype.GetterByBindingType=[Tt.prototype._getValue_direct,Tt.prototype._getValue_array,Tt.prototype._getValue_arrayElement,Tt.prototype._getValue_toArray],Tt.prototype.SetterByBindingTypeAndVersioning=[[Tt.prototype._setValue_direct,Tt.prototype._setValue_direct_setNeedsUpdate,Tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_array,Tt.prototype._setValue_array_setNeedsUpdate,Tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_arrayElement,Tt.prototype._setValue_arrayElement_setNeedsUpdate,Tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_fromArray,Tt.prototype._setValue_fromArray_setNeedsUpdate,Tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var D0=new Float32Array(1);var N0=new Je;var rc=class r{static{r.prototype.isMatrix2=!0}constructor(e,t,i,n){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,n)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,n){let a=this.elements;return a[0]=e,a[2]=t,a[1]=i,a[3]=n,this}},U0=new pe;var F0=new U,O0=new U,B0=new U,k0=new U,z0=new U,G0=new U,H0=new U;var V0=new U;var W0=new U,$0=new Je,q0=new Je;var X0=new U,j0=new $e,Y0=new $e;var Z0=new U,J0=new U,K0=new U;var Q0=new U,ev=new Gr;var tv=new Ni;var iv=new U;function du(r,e,t,i){let n=(function(a){switch(a){case _i:case Mc:return{byteLength:1,components:1};case Xr:case Sc:case Xi:return{byteLength:2,components:1};case ko:case zo:return{byteLength:2,components:4};case mn:case Bo:case Oi:return{byteLength:4,components:1};case Tc:case Ec:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${a}.`)})(i);switch(t){case 1021:return r*e;case wc:case Go:return r*e/n.components*n.byteLength;case 1030:case 1031:return r*e*2/n.components*n.byteLength;case 1022:return r*e*3/n.components*n.byteLength;case Bi:case 1033:return r*e*4/n.components*n.byteLength;case 33776:case 33777:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 33778:case 33779:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 35841:case 35843:return Math.max(r,16)*Math.max(e,8)/4;case 35840:case 35842:return Math.max(r,8)*Math.max(e,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case 37496:case 37490:case 37491:case 37808:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case 37809:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case 37810:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case 37811:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case 37812:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case 37813:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case 37814:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case 37815:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case 37816:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case 37817:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case 37818:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case 37819:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case 37820:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case 37821:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(r/4)*Math.ceil(e/4)*16;case 36283:case 36284:return Math.ceil(r/4)*Math.ceil(e/4)*8;case 36285:case 36286:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}})),typeof window<"u"&&(window.__THREE__?ke("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="185");function Hh(){let r=null,e=!1,t=null,i=null;function n(a,s){t(a,s),i=r.requestAnimationFrame(n)}return{start:function(){e!==!0&&t!==null&&r!==null&&(i=r.requestAnimationFrame(n),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){r=a}}}function Fm(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let i=e.get(t);i&&(r.deleteBuffer(i.buffer),e.delete(t))},update:function(t,i){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let a=e.get(t);return void((!a||a.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let n=e.get(t);if(n===void 0)e.set(t,(function(a,s){let o=a.array,u=a.usage,c=o.byteLength,d=r.createBuffer(),g;if(r.bindBuffer(s,d),r.bufferData(s,o,u),a.onUploadCallback(),o instanceof Float32Array)g=r.FLOAT;else if(typeof Float16Array<"u"&&o instanceof Float16Array)g=r.HALF_FLOAT;else if(o instanceof Uint16Array)g=a.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)g=r.SHORT;else if(o instanceof Uint32Array)g=r.UNSIGNED_INT;else if(o instanceof Int32Array)g=r.INT;else if(o instanceof Int8Array)g=r.BYTE;else if(o instanceof Uint8Array)g=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);g=r.UNSIGNED_BYTE}return{buffer:d,type:g,bytesPerElement:o.BYTES_PER_ELEMENT,version:a.version,size:c}})(t,i));else if(n.version<t.version){if(n.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(a,s,o){let u=s.array,c=s.updateRanges;if(r.bindBuffer(o,a),c.length===0)r.bufferSubData(o,0,u);else{c.sort((g,f)=>g.start-f.start);let d=0;for(let g=1;g<c.length;g++){let f=c[d],p=c[g];p.start<=f.start+f.count+1?f.count=Math.max(f.count,p.start+p.count-f.start):(++d,c[d]=p)}c.length=d+1;for(let g=0,f=c.length;g<f;g++){let p=c[g];r.bufferSubData(o,p.start*u.BYTES_PER_ELEMENT,u,p.start,p.count)}s.clearUpdateRanges()}s.onUploadCallback()})(n.buffer,t,i),n.version=t.version}}}}var Ke={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Se={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},Yi={basic:{uniforms:ei([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:ei([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new $e(0)},envMapIntensity:{value:1}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:ei([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:ei([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:ei([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new $e(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:ei([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:ei([Se.points,Se.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:ei([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:ei([Se.common,Se.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:ei([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:ei([Se.sprite,Se.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distance:{uniforms:ei([Se.common,Se.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distance_vert,fragmentShader:Ke.distance_frag},shadow:{uniforms:ei([Se.lights,Se.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};Yi.physical={uniforms:ei([Yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};var Zo={r:0,b:0,g:0},Om=new Je,Vh=new Xe;function Bm(r,e,t,i,n,a){let s=new $e(0),o,u,c=n===!0?0:1,d=null,g=0,f=null;function p(y){let S=y.isScene===!0?y.background:null;if(S&&S.isTexture){let x=y.backgroundBlurriness>0;S=e.get(S,x)}return S}function b(y,S){y.getRGB(Zo,cu(r)),t.buffers.color.setClear(Zo.r,Zo.g,Zo.b,S,a)}return{getClearColor:function(){return s},setClearColor:function(y,S=1){s.set(y),c=S,b(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,b(s,c)},render:function(y){let S=!1,x=p(y);x===null?b(s,c):x&&x.isColor&&(b(x,1),S=!0);let M=r.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(r.autoClear||S)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(y,S){let x=p(S);x&&(x.isCubeTexture||x.mapping===ja)?(u===void 0&&(u=new $t(new er(1,1,1),new ni({name:"BackgroundCubeMaterial",uniforms:or(Yi.backgroundCube.uniforms),vertexShader:Yi.backgroundCube.vertexShader,fragmentShader:Yi.backgroundCube.fragmentShader,side:Qt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,E,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=x,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Om.makeRotationFromEuler(S.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(Vh),u.material.toneMapped=rt.getTransfer(x.colorSpace)!==dt,d===x&&g===x.version&&f===r.toneMapping||(u.material.needsUpdate=!0,d=x,g=x.version,f=r.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(o===void 0&&(o=new $t(new Or(2,2),new ni({name:"BackgroundMaterial",uniforms:or(Yi.background.uniforms),vertexShader:Yi.background.vertexShader,fragmentShader:Yi.background.fragmentShader,side:Wr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(o)),o.material.uniforms.t2D.value=x,o.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,o.material.toneMapped=rt.getTransfer(x.colorSpace)!==dt,x.matrixAutoUpdate===!0&&x.updateMatrix(),o.material.uniforms.uvTransform.value.copy(x.matrix),d===x&&g===x.version&&f===r.toneMapping||(o.material.needsUpdate=!0,d=x,g=x.version,f=r.toneMapping),o.layers.enableAll(),y.unshift(o,o.geometry,o.material,0,0,null))},dispose:function(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}}}function km(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),i={},n=c(null),a=n,s=!1;function o(x){return r.bindVertexArray(x)}function u(x){return r.deleteVertexArray(x)}function c(x){let M=[],E=[],C=[];for(let L=0;L<t;L++)M[L]=0,E[L]=0,C[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:E,attributeDivisors:C,object:x,attributes:{},index:null}}function d(){let x=a.newAttributes;for(let M=0,E=x.length;M<E;M++)x[M]=0}function g(x){f(x,0)}function f(x,M){let E=a.newAttributes,C=a.enabledAttributes,L=a.attributeDivisors;E[x]=1,C[x]===0&&(r.enableVertexAttribArray(x),C[x]=1),L[x]!==M&&(r.vertexAttribDivisor(x,M),L[x]=M)}function p(){let x=a.newAttributes,M=a.enabledAttributes;for(let E=0,C=M.length;E<C;E++)M[E]!==x[E]&&(r.disableVertexAttribArray(E),M[E]=0)}function b(x,M,E,C,L,w,k){k===!0?r.vertexAttribIPointer(x,M,E,L,w):r.vertexAttribPointer(x,M,E,C,L,w)}function y(){S(),s=!0,a!==n&&(a=n,o(a.object))}function S(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:function(x,M,E,C,L){let w=!1,k=(function(W,G,H,K){let q=K.wireframe===!0,se=i[G.id];se===void 0&&(se={},i[G.id]=se);let ee=W.isInstancedMesh===!0?W.id:0,Z=se[ee];Z===void 0&&(Z={},se[ee]=Z);let v=Z[H.id];v===void 0&&(v={},Z[H.id]=v);let $=v[q];return $===void 0&&($=c(r.createVertexArray()),v[q]=$),$})(x,C,E,M);a!==k&&(a=k,o(a.object)),w=(function(W,G,H,K){let q=a.attributes,se=G.attributes,ee=0,Z=H.getAttributes();for(let v in Z)if(Z[v].location>=0){let $=q[v],ue=se[v];if(ue===void 0&&(v==="instanceMatrix"&&W.instanceMatrix&&(ue=W.instanceMatrix),v==="instanceColor"&&W.instanceColor&&(ue=W.instanceColor)),$===void 0||$.attribute!==ue||ue&&$.data!==ue.data)return!0;ee++}return a.attributesNum!==ee||a.index!==K})(x,C,E,L),w&&(function(W,G,H,K){let q={},se=G.attributes,ee=0,Z=H.getAttributes();for(let v in Z)if(Z[v].location>=0){let $=se[v];$===void 0&&(v==="instanceMatrix"&&W.instanceMatrix&&($=W.instanceMatrix),v==="instanceColor"&&W.instanceColor&&($=W.instanceColor));let ue={};ue.attribute=$,$&&$.data&&(ue.data=$.data),q[v]=ue,ee++}a.attributes=q,a.attributesNum=ee,a.index=K})(x,C,E,L),L!==null&&e.update(L,r.ELEMENT_ARRAY_BUFFER),(w||s)&&(s=!1,(function(W,G,H,K){d();let q=K.attributes,se=H.getAttributes(),ee=G.defaultAttributeValues;for(let Z in se){let v=se[Z];if(v.location>=0){let $=q[Z];if($===void 0&&(Z==="instanceMatrix"&&W.instanceMatrix&&($=W.instanceMatrix),Z==="instanceColor"&&W.instanceColor&&($=W.instanceColor)),$!==void 0){let ue=$.normalized,_e=$.itemSize,Ne=e.get($);if(Ne===void 0)continue;let Ae=Ne.buffer,Pe=Ne.type,he=Ne.bytesPerElement,Me=Pe===r.INT||Pe===r.UNSIGNED_INT||$.gpuType===Bo;if($.isInterleavedBufferAttribute){let ye=$.data,Te=ye.stride,Ue=$.offset;if(ye.isInstancedInterleavedBuffer){for(let oe=0;oe<v.locationSize;oe++)f(v.location+oe,ye.meshPerAttribute);W.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let oe=0;oe<v.locationSize;oe++)g(v.location+oe);r.bindBuffer(r.ARRAY_BUFFER,Ae);for(let oe=0;oe<v.locationSize;oe++)b(v.location+oe,_e/v.locationSize,Pe,ue,Te*he,(Ue+_e/v.locationSize*oe)*he,Me)}else{if($.isInstancedBufferAttribute){for(let ye=0;ye<v.locationSize;ye++)f(v.location+ye,$.meshPerAttribute);W.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ye=0;ye<v.locationSize;ye++)g(v.location+ye);r.bindBuffer(r.ARRAY_BUFFER,Ae);for(let ye=0;ye<v.locationSize;ye++)b(v.location+ye,_e/v.locationSize,Pe,ue,_e*he,_e/v.locationSize*ye*he,Me)}}else if(ee!==void 0){let ue=ee[Z];if(ue!==void 0)switch(ue.length){case 2:r.vertexAttrib2fv(v.location,ue);break;case 3:r.vertexAttrib3fv(v.location,ue);break;case 4:r.vertexAttrib4fv(v.location,ue);break;default:r.vertexAttrib1fv(v.location,ue)}}}}p()})(x,M,E,C),L!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(L).buffer))},reset:y,resetDefaultState:S,dispose:function(){y();for(let x in i){let M=i[x];for(let E in M){let C=M[E];for(let L in C){let w=C[L];for(let k in w)u(w[k].object),delete w[k];delete C[L]}}delete i[x]}},releaseStatesOfGeometry:function(x){if(i[x.id]===void 0)return;let M=i[x.id];for(let E in M){let C=M[E];for(let L in C){let w=C[L];for(let k in w)u(w[k].object),delete w[k];delete C[L]}}delete i[x.id]},releaseStatesOfObject:function(x){for(let M in i){let E=i[M],C=x.isInstancedMesh===!0?x.id:0,L=E[C];if(L!==void 0){for(let w in L){let k=L[w];for(let W in k)u(k[W].object),delete k[W];delete L[w]}delete E[C],Object.keys(E).length===0&&delete i[M]}}},releaseStatesOfProgram:function(x){for(let M in i){let E=i[M];for(let C in E){let L=E[C];if(L[x.id]===void 0)continue;let w=L[x.id];for(let k in w)u(w[k].object),delete w[k];delete L[x.id]}}},initAttributes:d,enableAttribute:g,disableUnusedAttributes:p}}function zm(r,e,t){let i;this.setMode=function(n){i=n},this.render=function(n,a){r.drawArrays(i,n,a),t.update(a,i,1)},this.renderInstances=function(n,a,s){s!==0&&(r.drawArraysInstanced(i,n,a,s),t.update(a,i,s))},this.renderMultiDraw=function(n,a,s){if(s===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,n,0,a,0,s);let o=0;for(let u=0;u<s;u++)o+=a[u];t.update(o,i,1)}}function Gm(r,e,t,i){let n;function a(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let s=t.precision!==void 0?t.precision:"highp",o=a(s);o!==s&&(ke("WebGLRenderer:",s,"not supported, using",o,"instead."),s=o);let u=t.logarithmicDepthBuffer===!0,c=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");return t.reversedDepthBuffer===!0&&c===!1&&ke("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),{isWebGL2:!0,getMaxAnisotropy:function(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n},getMaxPrecision:a,textureFormatReadable:function(d){return d===Bi||i.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let g=d===Xi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==_i&&i.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==Oi&&!g)},precision:s,logarithmicDepthBuffer:u,reversedDepthBuffer:c,maxTextures:r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),maxVertexTextures:r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),maxSamples:r.getParameter(r.MAX_SAMPLES),samples:r.getParameter(r.SAMPLES)}}function Hm(r){let e=this,t=null,i=0,n=!1,a=!1,s=new Vi,o=new Xe,u={value:null,needsUpdate:!1};function c(d,g,f,p){let b=d!==null?d.length:0,y=null;if(b!==0){if(y=u.value,p!==!0||y===null){let S=f+4*b,x=g.matrixWorldInverse;o.getNormalMatrix(x),(y===null||y.length<S)&&(y=new Float32Array(S));for(let M=0,E=f;M!==b;++M,E+=4)s.copy(d[M]).applyMatrix4(x,o),s.normal.toArray(y,E),y[E+3]=s.constant}u.value=y,u.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,y}this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(d,g){let f=d.length!==0||g||i!==0||n;return n=g,i=d.length,f},this.beginShadows=function(){a=!0,c(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,g){t=c(d,g,0)},this.setState=function(d,g,f){let p=d.clippingPlanes,b=d.clipIntersection,y=d.clipShadows,S=r.get(d);if(!n||p===null||p.length===0||a&&!y)a?c(null):(function(){u.value!==t&&(u.value=t,u.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0})();else{let x=a?0:i,M=4*x,E=S.clippingState||null;u.value=E,E=c(p,g,M,f);for(let C=0;C!==M;++C)E[C]=t[C];S.clippingState=E,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=x}}}Vh.set(-1,0,0,0,1,0,0,0,1);var xh=[.125,.215,.35,.446,.526,.582],Za=20,Ja=new On,bh=new $e,hu=null,pu=0,mu=0,fu=!1,Vm=new U,Ko=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,n=100,a={}){let{size:s=256,position:o=Vm}=a;hu=this._renderer.getRenderTarget(),pu=this._renderer.getActiveCubeFace(),mu=this._renderer.getActiveMipmapLevel(),fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(s);let u=this._allocateTargets();return u.depthBuffer=!0,this._sceneToCubeUV(e,i,n,u,o),t>0&&this._blur(u,0,0,t),this._applyPMREM(u),this._cleanup(u),u}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Th(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(hu,pu,mu),this._renderer.xr.enabled=fu,e.scissorTest=!1,Zr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qr||e.mapping===ir?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),hu=this._renderer.getRenderTarget(),pu=this._renderer.getActiveCubeFace(),mu=this._renderer.getActiveMipmapLevel(),fu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:Xi,format:Bi,colorSpace:va,depthBuffer:!1},n=Mh(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mh(e,t,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=(function(s){let o=[],u=[],c=[],d=s,g=s-4+1+xh.length;for(let f=0;f<g;f++){let p=Math.pow(2,d);o.push(p);let b=1/p;f>s-4?b=xh[f-s+4-1]:f===0&&(b=0),u.push(b);let y=1/(p-2),S=-y,x=1+y,M=[S,S,x,S,x,x,S,S,x,x,S,x],E=6,C=6,L=3,w=2,k=1,W=new Float32Array(L*C*E),G=new Float32Array(w*C*E),H=new Float32Array(k*C*E);for(let q=0;q<E;q++){let se=q%3*2/3-1,ee=q>2?0:-1,Z=[se,ee,0,se+2/3,ee,0,se+2/3,ee+1,0,se,ee,0,se+2/3,ee+1,0,se,ee+1,0];W.set(Z,L*C*q),G.set(M,w*C*q);let v=[q,q,q,q,q,q];H.set(v,k*C*q)}let K=new _t;K.setAttribute("position",new ii(W,L)),K.setAttribute("uv",new ii(G,w)),K.setAttribute("faceIndex",new ii(H,k)),c.push(new $t(K,null)),d>4&&d--}return{lodMeshes:c,sizeLods:o,sigmas:u}})(a)),this._blurMaterial=(function(s,o,u){let c=new Float32Array(Za),d=new U(0,1,0);return new ni({name:"SphericalGaussianBlur",defines:{n:Za,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/u,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:d}},vertexShader:Qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:qi,depthTest:!1,depthWrite:!1})})(a,e,t),this._ggxMaterial=(function(s,o,u){return new ni({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:256,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/u,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Qo(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:qi,depthTest:!1,depthWrite:!1})})(a,e,t)}return n}_compileMaterial(e){let t=new $t(new _t,e);this._renderer.compile(t,Ja)}_sceneToCubeUV(e,t,i,n,a){let s=new ci(90,1,t,i),o=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],c=this._renderer,d=c.autoClear,g=c.toneMapping;c.getClearColor(bh),c.toneMapping=Fi,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(n),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new $t(new er,new Ea({name:"PMREM.Background",side:Qt,depthWrite:!1,depthTest:!1})));let f=this._backgroundBox,p=f.material,b=!1,y=e.background;y?y.isColor&&(p.color.copy(y),e.background=null,b=!0):(p.color.copy(bh),b=!0);for(let S=0;S<6;S++){let x=S%3;x===0?(s.up.set(0,o[S],0),s.position.set(a.x,a.y,a.z),s.lookAt(a.x+u[S],a.y,a.z)):x===1?(s.up.set(0,0,o[S]),s.position.set(a.x,a.y,a.z),s.lookAt(a.x,a.y+u[S],a.z)):(s.up.set(0,o[S],0),s.position.set(a.x,a.y,a.z),s.lookAt(a.x,a.y,a.z+u[S]));let M=this._cubeSize;Zr(n,x*M,S>2?M:0,M,M),c.setRenderTarget(n),b&&c.render(f,s),c.render(e,s)}c.toneMapping=g,c.autoClear=d,e.background=y}_textureToCubeUV(e,t){let i=this._renderer,n=e.mapping===qr||e.mapping===ir;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=Th()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sh());let a=n?this._cubemapMaterial:this._equirectMaterial,s=this._lodMeshes[0];s.material=a,a.uniforms.envMap.value=e;let o=this._cubeSize;Zr(t,0,0,3*o,2*o),i.setRenderTarget(t),i.render(s,Ja)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let n=this._lodMeshes.length;for(let a=1;a<n;a++)this._applyGGXFilter(e,a-1,a);t.autoClear=i}_applyGGXFilter(e,t,i){let n=this._renderer,a=this._pingPongRenderTarget,s=this._ggxMaterial,o=this._lodMeshes[i];o.material=s;let u=s.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),g=Math.sqrt(c*c-d*d)*(0+1.25*c),{_lodMax:f}=this,p=this._sizeLods[i],b=3*p*(i>f-4?i-f+4:0),y=4*(this._cubeSize-p);u.envMap.value=e.texture,u.roughness.value=g,u.mipInt.value=f-t,Zr(a,b,y,3*p,2*p),n.setRenderTarget(a),n.render(o,Ja),u.envMap.value=a.texture,u.roughness.value=0,u.mipInt.value=f-i,Zr(e,b,y,3*p,2*p),n.setRenderTarget(e),n.render(o,Ja)}_blur(e,t,i,n,a){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,i,n,"latitudinal",a),this._halfBlur(s,e,i,i,n,"longitudinal",a)}_halfBlur(e,t,i,n,a,s,o){let u=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&Ge("blur direction must be either latitudinal or longitudinal!");let d=this._lodMeshes[n];d.material=c;let g=c.uniforms,f=this._sizeLods[i]-1,p=isFinite(a)?Math.PI/(2*f):2*Math.PI/39,b=a/p,y=isFinite(a)?1+Math.floor(3*b):Za;y>Za&&ke(`sigmaRadians, ${a}, is too large and will clip, as it requested ${y} samples when the maximum is set to 20`);let S=[],x=0;for(let C=0;C<Za;++C){let L=C/b,w=Math.exp(-L*L/2);S.push(w),C===0?x+=w:C<y&&(x+=2*w)}for(let C=0;C<S.length;C++)S[C]=S[C]/x;g.envMap.value=e.texture,g.samples.value=y,g.weights.value=S,g.latitudinal.value=s==="latitudinal",o&&(g.poleAxis.value=o);let{_lodMax:M}=this;g.dTheta.value=p,g.mipInt.value=M-i;let E=this._sizeLods[n];Zr(t,3*E*(n>M-4?n-M+4:0),4*(this._cubeSize-E),3*E,2*E),u.setRenderTarget(t),u.render(d,Ja)}};function Mh(r,e,t){let i=new vi(r,e,t);return i.texture.mapping=ja,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Zr(r,e,t,i,n){r.viewport.set(e,t,i,n),r.scissor.set(e,t,i,n)}function Sh(){return new ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:qi,depthTest:!1,depthWrite:!1})}function Th(){return new ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Qo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qi,depthTest:!1,depthWrite:!1})}function Qo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var el=class extends vi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},n=[i,i,i,i,i,i];this.texture=new Aa(n),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new er(5,5,5),a=new ni({name:"CubemapFromEquirect",uniforms:or(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Qt,blending:qi});a.uniforms.tEquirect.value=t;let s=new $t(n,a),o=t.minFilter;return t.minFilter===nr&&(t.minFilter=Kt),new Lo(1,10,this).update(e,s),t.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(e,t=!0,i=!0,n=!0){let a=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,i,n);e.setRenderTarget(a)}};function Wm(r){let e=new WeakMap,t=new WeakMap,i=null;function n(o,u){return u===Uo?o.mapping=qr:u===Fo&&(o.mapping=ir),o}function a(o){let u=o.target;u.removeEventListener("dispose",a);let c=e.get(u);c!==void 0&&(e.delete(u),c.dispose())}function s(o){let u=o.target;u.removeEventListener("dispose",s);let c=t.get(u);c!==void 0&&(t.delete(u),c.dispose())}return{get:function(o,u=!1){return o==null?null:u?(function(c){if(c&&c.isTexture){let d=c.mapping,g=d===Uo||d===Fo,f=d===qr||d===ir;if(g||f){let p=t.get(c),b=p!==void 0?p.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==b)return i===null&&(i=new Ko(r)),p=g?i.fromEquirectangular(c,p):i.fromCubemap(c,p),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),p.texture;if(p!==void 0)return p.texture;{let y=c.image;return g&&y&&y.height>0||f&&y&&(function(S){let x=0,M=6;for(let E=0;E<M;E++)S[E]!==void 0&&x++;return x===M})(y)?(i===null&&(i=new Ko(r)),p=g?i.fromEquirectangular(c):i.fromCubemap(c),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),c.addEventListener("dispose",s),p.texture):null}}}return c})(o):(function(c){if(c&&c.isTexture){let d=c.mapping;if(d===Uo||d===Fo){if(e.has(c))return n(e.get(c).texture,c.mapping);{let g=c.image;if(g&&g.height>0){let f=new el(g.height);return f.fromEquirectangularTexture(r,c),e.set(c,f),c.addEventListener("dispose",a),n(f.texture,c.mapping)}return null}}}return c})(o)},dispose:function(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}}}function $m(r){let e={};function t(i){if(e[i]!==void 0)return e[i];let n=r.getExtension(i);return e[i]=n,n}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let n=t(i);return n===null&&Kn("WebGLRenderer: "+i+" extension not supported."),n}}}function qm(r,e,t,i){let n={},a=new WeakMap;function s(u){let c=u.target;c.index!==null&&e.remove(c.index);for(let g in c.attributes)e.remove(c.attributes[g]);c.removeEventListener("dispose",s),delete n[c.id];let d=a.get(c);d&&(e.remove(d),a.delete(c)),i.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(u){let c=[],d=u.index,g=u.attributes.position,f=0;if(g===void 0)return;if(d!==null){let y=d.array;f=d.version;for(let S=0,x=y.length;S<x;S+=3){let M=y[S+0],E=y[S+1],C=y[S+2];c.push(M,E,E,C,C,M)}}else{let y=g.array;f=g.version;for(let S=0,x=y.length/3-1;S<x;S+=3){let M=S+0,E=S+1,C=S+2;c.push(M,E,E,C,C,M)}}let p=new(g.count>=65535?Ta:Sa)(c,1);p.version=f;let b=a.get(u);b&&e.remove(b),a.set(u,p)}return{get:function(u,c){return n[c.id]===!0||(c.addEventListener("dispose",s),n[c.id]=!0,t.memory.geometries++),c},update:function(u){let c=u.attributes;for(let d in c)e.update(c[d],r.ARRAY_BUFFER)},getWireframeAttribute:function(u){let c=a.get(u);if(c){let d=u.index;d!==null&&c.version<d.version&&o(u)}else o(u);return a.get(u)}}}function Xm(r,e,t){let i,n,a;this.setMode=function(s){i=s},this.setIndex=function(s){n=s.type,a=s.bytesPerElement},this.render=function(s,o){r.drawElements(i,o,n,s*a),t.update(o,i,1)},this.renderInstances=function(s,o,u){u!==0&&(r.drawElementsInstanced(i,o,n,s*a,u),t.update(o,i,u))},this.renderMultiDraw=function(s,o,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,o,0,n,s,0,u);let c=0;for(let d=0;d<u;d++)c+=o[d];t.update(c,i,1)}}function jm(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,i,n){switch(e.calls++,i){case r.TRIANGLES:e.triangles+=n*(t/3);break;case r.LINES:e.lines+=n*(t/2);break;case r.LINE_STRIP:e.lines+=n*(t-1);break;case r.LINE_LOOP:e.lines+=n*t;break;case r.POINTS:e.points+=n*t;break;default:Ge("WebGLInfo: Unknown draw mode:",i)}}}}function Ym(r,e,t){let i=new WeakMap,n=new pt;return{update:function(a,s,o){let u=a.morphTargetInfluences,c=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,d=c!==void 0?c.length:0,g=i.get(s);if(g===void 0||g.count!==d){let W=function(){w.dispose(),i.delete(s),s.removeEventListener("dispose",W)};g!==void 0&&g.texture.dispose();let f=s.morphAttributes.position!==void 0,p=s.morphAttributes.normal!==void 0,b=s.morphAttributes.color!==void 0,y=s.morphAttributes.position||[],S=s.morphAttributes.normal||[],x=s.morphAttributes.color||[],M=0;f===!0&&(M=1),p===!0&&(M=2),b===!0&&(M=3);let E=s.attributes.position.count*M,C=1;E>e.maxTextureSize&&(C=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);let L=new Float32Array(E*C*4*d),w=new _a(L,E,C,d);w.type=Oi,w.needsUpdate=!0;let k=4*M;for(let G=0;G<d;G++){let H=y[G],K=S[G],q=x[G],se=E*C*4*G;for(let ee=0;ee<H.count;ee++){let Z=ee*k;f===!0&&(n.fromBufferAttribute(H,ee),L[se+Z+0]=n.x,L[se+Z+1]=n.y,L[se+Z+2]=n.z,L[se+Z+3]=0),p===!0&&(n.fromBufferAttribute(K,ee),L[se+Z+4]=n.x,L[se+Z+5]=n.y,L[se+Z+6]=n.z,L[se+Z+7]=0),b===!0&&(n.fromBufferAttribute(q,ee),L[se+Z+8]=n.x,L[se+Z+9]=n.y,L[se+Z+10]=n.z,L[se+Z+11]=q.itemSize===4?n.w:1)}}g={count:d,texture:w,size:new pe(E,C)},i.set(s,g),s.addEventListener("dispose",W)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let f=0;for(let b=0;b<u.length;b++)f+=u[b];let p=s.morphTargetsRelative?1:1-f;o.getUniforms().setValue(r,"morphTargetBaseInfluence",p),o.getUniforms().setValue(r,"morphTargetInfluences",u)}o.getUniforms().setValue(r,"morphTargetsTexture",g.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",g.size)}}}function Zm(r,e,t,i,n){let a=new WeakMap;function s(o){let u=o.target;u.removeEventListener("dispose",s),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:function(o){let u=n.render.frame,c=o.geometry,d=e.get(o,c);if(a.get(d)!==u&&(e.update(d),a.set(d,u)),o.isInstancedMesh&&(o.hasEventListener("dispose",s)===!1&&o.addEventListener("dispose",s),a.get(o)!==u&&(t.update(o.instanceMatrix,r.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,r.ARRAY_BUFFER),a.set(o,u))),o.isSkinnedMesh){let g=o.skeleton;a.get(g)!==u&&(g.update(),a.set(g,u))}return d},dispose:function(){a=new WeakMap}}}var Jm={[fc]:"LINEAR_TONE_MAPPING",[gc]:"REINHARD_TONE_MAPPING",[vc]:"CINEON_TONE_MAPPING",[Xa]:"ACES_FILMIC_TONE_MAPPING",[_c]:"AGX_TONE_MAPPING",[xc]:"NEUTRAL_TONE_MAPPING",[yc]:"CUSTOM_TONE_MAPPING"};function Km(r,e,t,i,n,a){let s=new vi(e,t,{type:r,depthBuffer:n,stencilBuffer:a,samples:i?4:0,depthTexture:n?new pn(e,t):void 0}),o=new vi(e,t,{type:Xi,depthBuffer:!1,stencilBuffer:!1}),u=new _t;u.setAttribute("position",new Ve([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new Ve([0,2,0,0,2,0],2));let c=new xo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new $t(u,c),g=new On(-1,1,1,-1,0,1),f,p=null,b=null,y=!1,S=null,x=[],M=!1;this.setSize=function(E,C){s.setSize(E,C),o.setSize(E,C);for(let L=0;L<x.length;L++){let w=x[L];w.setSize&&w.setSize(E,C)}},this.setEffects=function(E){x=E,M=x.length>0&&x[0].isRenderPass===!0;let C=s.width,L=s.height;for(let w=0;w<x.length;w++){let k=x[w];k.setSize&&k.setSize(C,L)}},this.begin=function(E,C){if(y||E.toneMapping===Fi&&x.length===0)return!1;if(S=C,C!==null){let L=C.width,w=C.height;s.width===L&&s.height===w||this.setSize(L,w)}return M===!1&&E.setRenderTarget(s),f=E.toneMapping,E.toneMapping=Fi,!0},this.hasRenderPass=function(){return M},this.end=function(E,C){E.toneMapping=f,y=!0;let L=s,w=o;for(let k=0;k<x.length;k++){let W=x[k];if(W.enabled!==!1&&(W.render(E,w,L,C),W.needsSwap!==!1)){let G=L;L=w,w=G}}if(p!==E.outputColorSpace||b!==E.toneMapping){p=E.outputColorSpace,b=E.toneMapping,c.defines={},rt.getTransfer(p)===dt&&(c.defines.SRGB_TRANSFER="");let k=Jm[b];k&&(c.defines[k]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=L.texture,E.setRenderTarget(S),E.render(d,g),S=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){s.depthTexture&&s.depthTexture.dispose(),s.dispose(),o.dispose(),u.dispose(),c.dispose()}}var Wh=new ti,yu=new pn(1,1),$h=new _a,qh=new Xs,Xh=new Aa,Eh=[],wh=[],Ah=new Float32Array(16),Ch=new Float32Array(9),Rh=new Float32Array(4);function Kr(r,e,t){let i=r[0];if(i<=0||i>0)return r;let n=e*t,a=Eh[n];if(a===void 0&&(a=new Float32Array(n),Eh[n]=a),e!==0){i.toArray(a,0);for(let s=1,o=0;s!==e;++s)o+=t,r[s].toArray(a,o)}return a}function Gt(r,e){if(r.length!==e.length)return!1;for(let t=0,i=r.length;t<i;t++)if(r[t]!==e[t])return!1;return!0}function Ht(r,e){for(let t=0,i=e.length;t<i;t++)r[t]=e[t]}function il(r,e){let t=wh[e];t===void 0&&(t=new Int32Array(e),wh[e]=t);for(let i=0;i!==e;++i)t[i]=r.allocateTextureUnit();return t}function Qm(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function ef(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;r.uniform2fv(this.addr,e),Ht(t,e)}}function tf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Gt(t,e))return;r.uniform3fv(this.addr,e),Ht(t,e)}}function nf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;r.uniform4fv(this.addr,e),Ht(t,e)}}function rf(r,e){let t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Ht(t,e)}else{if(Gt(t,i))return;Rh.set(i),r.uniformMatrix2fv(this.addr,!1,Rh),Ht(t,i)}}function af(r,e){let t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Ht(t,e)}else{if(Gt(t,i))return;Ch.set(i),r.uniformMatrix3fv(this.addr,!1,Ch),Ht(t,i)}}function sf(r,e){let t=this.cache,i=e.elements;if(i===void 0){if(Gt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Ht(t,e)}else{if(Gt(t,i))return;Ah.set(i),r.uniformMatrix4fv(this.addr,!1,Ah),Ht(t,i)}}function of(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function lf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;r.uniform2iv(this.addr,e),Ht(t,e)}}function cf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;r.uniform3iv(this.addr,e),Ht(t,e)}}function uf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;r.uniform4iv(this.addr,e),Ht(t,e)}}function df(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function hf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Gt(t,e))return;r.uniform2uiv(this.addr,e),Ht(t,e)}}function pf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Gt(t,e))return;r.uniform3uiv(this.addr,e),Ht(t,e)}}function mf(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Gt(t,e))return;r.uniform4uiv(this.addr,e),Ht(t,e)}}function ff(r,e,t){let i=this.cache,n=t.allocateTextureUnit(),a;i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),this.type===r.SAMPLER_2D_SHADOW?(yu.compareFunction=t.isReversedDepthBuffer()?Yo:jo,a=yu):a=Wh,t.setTexture2D(e||a,n)}function gf(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture3D(e||qh,n)}function vf(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTextureCube(e||Xh,n)}function yf(r,e,t){let i=this.cache,n=t.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),t.setTexture2DArray(e||$h,n)}function _f(r,e){r.uniform1fv(this.addr,e)}function xf(r,e){let t=Kr(e,this.size,2);r.uniform2fv(this.addr,t)}function bf(r,e){let t=Kr(e,this.size,3);r.uniform3fv(this.addr,t)}function Mf(r,e){let t=Kr(e,this.size,4);r.uniform4fv(this.addr,t)}function Sf(r,e){let t=Kr(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function Tf(r,e){let t=Kr(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function Ef(r,e){let t=Kr(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function wf(r,e){r.uniform1iv(this.addr,e)}function Af(r,e){r.uniform2iv(this.addr,e)}function Cf(r,e){r.uniform3iv(this.addr,e)}function Rf(r,e){r.uniform4iv(this.addr,e)}function Pf(r,e){r.uniform1uiv(this.addr,e)}function If(r,e){r.uniform2uiv(this.addr,e)}function Lf(r,e){r.uniform3uiv(this.addr,e)}function Df(r,e){r.uniform4uiv(this.addr,e)}function Nf(r,e,t){let i=this.cache,n=e.length,a=il(t,n),s;Gt(i,a)||(r.uniform1iv(this.addr,a),Ht(i,a)),s=this.type===r.SAMPLER_2D_SHADOW?yu:Wh;for(let o=0;o!==n;++o)t.setTexture2D(e[o]||s,a[o])}function Uf(r,e,t){let i=this.cache,n=e.length,a=il(t,n);Gt(i,a)||(r.uniform1iv(this.addr,a),Ht(i,a));for(let s=0;s!==n;++s)t.setTexture3D(e[s]||qh,a[s])}function Ff(r,e,t){let i=this.cache,n=e.length,a=il(t,n);Gt(i,a)||(r.uniform1iv(this.addr,a),Ht(i,a));for(let s=0;s!==n;++s)t.setTextureCube(e[s]||Xh,a[s])}function Of(r,e,t){let i=this.cache,n=e.length,a=il(t,n);Gt(i,a)||(r.uniform1iv(this.addr,a),Ht(i,a));for(let s=0;s!==n;++s)t.setTexture2DArray(e[s]||$h,a[s])}var _u=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=(function(n){switch(n){case 5126:return Qm;case 35664:return ef;case 35665:return tf;case 35666:return nf;case 35674:return rf;case 35675:return af;case 35676:return sf;case 5124:case 35670:return of;case 35667:case 35671:return lf;case 35668:case 35672:return cf;case 35669:case 35673:return uf;case 5125:return df;case 36294:return hf;case 36295:return pf;case 36296:return mf;case 35678:case 36198:case 36298:case 36306:case 35682:return ff;case 35679:case 36299:case 36307:return gf;case 35680:case 36300:case 36308:case 36293:return vf;case 36289:case 36303:case 36311:case 36292:return yf}})(t.type)}},xu=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=(function(n){switch(n){case 5126:return _f;case 35664:return xf;case 35665:return bf;case 35666:return Mf;case 35674:return Sf;case 35675:return Tf;case 35676:return Ef;case 5124:case 35670:return wf;case 35667:case 35671:return Af;case 35668:case 35672:return Cf;case 35669:case 35673:return Rf;case 5125:return Pf;case 36294:return If;case 36295:return Lf;case 36296:return Df;case 35678:case 36198:case 36298:case 36306:case 35682:return Nf;case 35679:case 36299:case 36307:return Uf;case 35680:case 36300:case 36308:case 36293:return Ff;case 36289:case 36303:case 36311:case 36292:return Of}})(t.type)}},bu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let n=this.seq;for(let a=0,s=n.length;a!==s;++a){let o=n[a];o.setValue(e,t[o.id],i)}}},gu=/(\w+)(\])?(\[|\.)?/g;function Ph(r,e){r.seq.push(e),r.map[e.id]=e}function Bf(r,e,t){let i=r.name,n=i.length;for(gu.lastIndex=0;;){let a=gu.exec(i),s=gu.lastIndex,o=a[1],u=a[2]==="]",c=a[3];if(u&&(o|=0),c===void 0||c==="["&&s+2===n){Ph(t,c===void 0?new _u(o,r,e):new xu(o,r,e));break}{let d=t.map[o];d===void 0&&(d=new bu(o),Ph(t,d)),t=d}}}var Jr=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let o=e.getActiveUniform(t,s);Bf(o,e.getUniformLocation(t,o.name),this)}let n=[],a=[];for(let s of this.seq)s.type===e.SAMPLER_2D_SHADOW||s.type===e.SAMPLER_CUBE_SHADOW||s.type===e.SAMPLER_2D_ARRAY_SHADOW?n.push(s):a.push(s);n.length>0&&(this.seq=n.concat(a))}setValue(e,t,i,n){let a=this.map[t];a!==void 0&&a.setValue(e,i,n)}setOptional(e,t,i){let n=t[i];n!==void 0&&this.setValue(e,i,n)}static upload(e,t,i,n){for(let a=0,s=t.length;a!==s;++a){let o=t[a],u=i[o.id];u.needsUpdate!==!1&&o.setValue(e,u.value,n)}}static seqWithValue(e,t){let i=[];for(let n=0,a=e.length;n!==a;++n){let s=e[n];s.id in t&&i.push(s)}return i}};function Ih(r,e,t){let i=r.createShader(e);return r.shaderSource(i,t),r.compileShader(i),i}var kf=0,Lh=new Xe;function Dh(r,e,t){let i=r.getShaderParameter(e,r.COMPILE_STATUS),n=(r.getShaderInfoLog(e)||"").trim();if(i&&n==="")return"";let a=/ERROR: 0:(\d+)/.exec(n);if(a){let s=parseInt(a[1]);return t.toUpperCase()+`

`+n+`

`+(function(o,u){let c=o.split(`
`),d=[],g=Math.max(u-6,0),f=Math.min(u+6,c.length);for(let p=g;p<f;p++){let b=p+1;d.push(`${b===u?">":" "} ${b}: ${c[p]}`)}return d.join(`
`)})(r.getShaderSource(e),s)}return n}function zf(r,e){let t=(function(i){rt._getMatrix(Lh,rt.workingColorSpace,i);let n=`mat3( ${Lh.elements.map(a=>a.toFixed(4))} )`;switch(rt.getTransfer(i)){case ya:return[n,"LinearTransferOETF"];case dt:return[n,"sRGBTransferOETF"];default:return ke("WebGLProgram: Unsupported color space: ",i),[n,"LinearTransferOETF"]}})(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Gf={[fc]:"Linear",[gc]:"Reinhard",[vc]:"Cineon",[Xa]:"ACESFilmic",[_c]:"AgX",[xc]:"Neutral",[yc]:"Custom"};function Hf(r,e){let t=Gf[e];return t===void 0?(ke("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Jo=new U;function Vf(){return rt.getLuminanceCoefficients(Jo),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${Jo.x.toFixed(4)}, ${Jo.y.toFixed(4)}, ${Jo.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Ka(r){return r!==""}function Nh(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Uh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Wf=/^[ \t]*#include +<([\w\d./]+)>/gm;function Mu(r){return r.replace(Wf,qf)}var $f=new Map;function qf(r,e){let t=Ke[e];if(t===void 0){let i=$f.get(e);if(i===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");t=Ke[i],ke('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i)}return Mu(t)}var Xf=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fh(r){return r.replace(Xf,jf)}function jf(r,e,t,i){let n="";for(let a=parseInt(e);a<parseInt(t);a++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return n}function Oh(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Yf={[Wa]:"SHADOWMAP_TYPE_PCF",[Vr]:"SHADOWMAP_TYPE_VSM"},Zf={[qr]:"ENVMAP_TYPE_CUBE",[ir]:"ENVMAP_TYPE_CUBE",[ja]:"ENVMAP_TYPE_CUBE_UV"},Jf={[ir]:"ENVMAP_MODE_REFRACTION"},Kf={[Jd]:"ENVMAP_BLENDING_MULTIPLY",[Kd]:"ENVMAP_BLENDING_MIX",[Qd]:"ENVMAP_BLENDING_ADD"};function Qf(r,e,t,i){let n=r.getContext(),a=t.defines,s=t.vertexShader,o=t.fragmentShader,u=(function(K){return Yf[K.shadowMapType]||"SHADOWMAP_TYPE_BASIC"})(t),c=(function(K){return K.envMap===!1?"ENVMAP_TYPE_CUBE":Zf[K.envMapMode]||"ENVMAP_TYPE_CUBE"})(t),d=(function(K){return K.envMap===!1?"ENVMAP_MODE_REFLECTION":Jf[K.envMapMode]||"ENVMAP_MODE_REFLECTION"})(t),g=(function(K){return K.envMap===!1?"ENVMAP_BLENDING_NONE":Kf[K.combine]||"ENVMAP_BLENDING_NONE"})(t),f=(function(K){let q=K.envMapCubeUVHeight;if(q===null)return null;let se=Math.log2(q)-2,ee=1/q;return{texelWidth:1/(3*Math.max(Math.pow(2,se),112)),texelHeight:ee,maxMip:se}})(t),p=(function(K){return[K.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",K.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ka).join(`
`)})(t),b=(function(K){let q=[];for(let se in K){let ee=K[se];ee!==!1&&q.push("#define "+se+" "+ee)}return q.join(`
`)})(a),y=n.createProgram(),S,x,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(S=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Ka).join(`
`),S.length>0&&(S+=`
`),x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b].filter(Ka).join(`
`),x.length>0&&(x+=`
`)):(S=[Oh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ka).join(`
`),x=[Oh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,b,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+g:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Fi?"#define TONE_MAPPING":"",t.toneMapping!==Fi?Ke.tonemapping_pars_fragment:"",t.toneMapping!==Fi?Hf("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,zf("linearToOutputTexel",t.outputColorSpace),Vf(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ka).join(`
`)),s=Mu(s),s=Nh(s,t),s=Uh(s,t),o=Mu(o),o=Nh(o,t),o=Uh(o,t),s=Fh(s),o=Fh(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,S=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,x=["#define varying in",t.glslVersion===su?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===su?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);let E=M+S+s,C=M+x+o,L=Ih(n,n.VERTEX_SHADER,E),w=Ih(n,n.FRAGMENT_SHADER,C);function k(K){if(r.debug.checkShaderErrors){let q=n.getProgramInfoLog(y)||"",se=n.getShaderInfoLog(L)||"",ee=n.getShaderInfoLog(w)||"",Z=q.trim(),v=se.trim(),$=ee.trim(),ue=!0,_e=!0;if(n.getProgramParameter(y,n.LINK_STATUS)===!1)if(ue=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(n,y,L,w);else{let Ne=Dh(n,L,"vertex"),Ae=Dh(n,w,"fragment");Ge("WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(y,n.VALIDATE_STATUS)+`

Material Name: `+K.name+`
Material Type: `+K.type+`

Program Info Log: `+Z+`
`+Ne+`
`+Ae)}else Z!==""?ke("WebGLProgram: Program Info Log:",Z):v!==""&&$!==""||(_e=!1);_e&&(K.diagnostics={runnable:ue,programLog:Z,vertexShader:{log:v,prefix:S},fragmentShader:{log:$,prefix:x}})}n.deleteShader(L),n.deleteShader(w),W=new Jr(n,y),G=(function(q,se){let ee={},Z=q.getProgramParameter(se,q.ACTIVE_ATTRIBUTES);for(let v=0;v<Z;v++){let $=q.getActiveAttrib(se,v),ue=$.name,_e=1;$.type===q.FLOAT_MAT2&&(_e=2),$.type===q.FLOAT_MAT3&&(_e=3),$.type===q.FLOAT_MAT4&&(_e=4),ee[ue]={type:$.type,location:q.getAttribLocation(se,ue),locationSize:_e}}return ee})(n,y)}let W,G;n.attachShader(y,L),n.attachShader(y,w),t.index0AttributeName!==void 0?n.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&n.bindAttribLocation(y,0,"position"),n.linkProgram(y),this.getUniforms=function(){return W===void 0&&k(this),W},this.getAttributes=function(){return G===void 0&&k(this),G};let H=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=n.getProgramParameter(y,37297)),H},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=kf++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=L,this.fragmentShader=w,this}var eg=0,Su=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let n=this._getShaderCacheForMaterial(e);return n.has(t)===!1&&(n.add(t),t.usedTimes++),n.has(i)===!1&&(n.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Tu(e),t.set(e,i)),i}},Tu=class{constructor(e){this.id=eg++,this.code=e,this.usedTimes=0}};function tg(r,e,t,i,n,a){let s=new xa,o=new Su,u=new Set,c=[],d=new Map,g=i.logarithmicDepthBuffer,f=i.precision,p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function b(y){return u.add(y),y===0?"uv":`uv${y}`}return{getParameters:function(y,S,x,M,E,C){let L=M.fog,w=E.geometry,k=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?M.environment:null,W=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,G=e.get(y.envMap||k,W),H=G&&G.mapping===ja?G.image.height:null,K=p[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&ke("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));let q=w.morphAttributes.position||w.morphAttributes.normal||w.morphAttributes.color,se=q!==void 0?q.length:0,ee,Z,v,$,ue=0;if(w.morphAttributes.position!==void 0&&(ue=1),w.morphAttributes.normal!==void 0&&(ue=2),w.morphAttributes.color!==void 0&&(ue=3),K){let mt=Yi[K];ee=mt.vertexShader,Z=mt.fragmentShader}else{ee=y.vertexShader,Z=y.fragmentShader;let mt=o.getVertexShaderStage(y),ui=o.getFragmentShaderStage(y);o.update(y,mt,ui),v=mt.id,$=ui.id}let _e=r.getRenderTarget(),Ne=r.state.buffers.depth.getReversed(),Ae=E.isInstancedMesh===!0,Pe=E.isBatchedMesh===!0,he=!!y.map,Me=!!y.matcap,ye=!!G,Te=!!y.aoMap,Ue=!!y.lightMap,oe=!!y.bumpMap&&y.wireframe===!1,F=!!y.normalMap,A=!!y.displacementMap,N=!!y.emissiveMap,V=!!y.metalnessMap,_=!!y.roughnessMap,z=y.anisotropy>0,O=y.clearcoat>0,I=y.dispersion>0,j=y.iridescence>0,J=y.sheen>0,re=y.transmission>0,me=z&&!!y.anisotropyMap,Ie=O&&!!y.clearcoatMap,Re=O&&!!y.clearcoatNormalMap,xe=O&&!!y.clearcoatRoughnessMap,He=j&&!!y.iridescenceMap,de=j&&!!y.iridescenceThicknessMap,ve=J&&!!y.sheenColorMap,fe=J&&!!y.sheenRoughnessMap,Ee=!!y.specularMap,ht=!!y.specularColorMap,lt=!!y.specularIntensityMap,wt=re&&!!y.transmissionMap,kt=re&&!!y.thicknessMap,De=!!y.gradientMap,at=!!y.alphaMap,Ye=y.alphaTest>0,Ut=!!y.alphaHash,ut=!!y.extensions,Et=Fi;y.toneMapped&&(_e!==null&&_e.isXRRenderTarget!==!0||(Et=r.toneMapping));let xt={shaderID:K,shaderType:y.type,shaderName:y.name,vertexShader:ee,fragmentShader:Z,defines:y.defines,customVertexShaderID:v,customFragmentShaderID:$,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Pe,batchingColor:Pe&&E._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&E.instanceColor!==null,instancingMorph:Ae&&E.morphTexture!==null,outputColorSpace:_e===null?r.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:rt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:he,matcap:Me,envMap:ye,envMapMode:ye&&G.mapping,envMapCubeUVHeight:H,aoMap:Te,lightMap:Ue,bumpMap:oe,normalMap:F,displacementMap:A,emissiveMap:N,normalMapObjectSpace:F&&y.normalMapType===nh,normalMapTangentSpace:F&&y.normalMapType===au,packedNormalMap:F&&y.normalMapType===au&&(qt=y.normalMap.format,qt===ar||qt===qo||qt===Xo),metalnessMap:V,roughnessMap:_,anisotropy:z,anisotropyMap:me,clearcoat:O,clearcoatMap:Ie,clearcoatNormalMap:Re,clearcoatRoughnessMap:xe,dispersion:I,iridescence:j,iridescenceMap:He,iridescenceThicknessMap:de,sheen:J,sheenColorMap:ve,sheenRoughnessMap:fe,specularMap:Ee,specularColorMap:ht,specularIntensityMap:lt,transmission:re,transmissionMap:wt,thicknessMap:kt,gradientMap:De,opaque:y.transparent===!1&&y.blending===$a&&y.alphaToCoverage===!1,alphaMap:at,alphaTest:Ye,alphaHash:Ut,combine:y.combine,mapUv:he&&b(y.map.channel),aoMapUv:Te&&b(y.aoMap.channel),lightMapUv:Ue&&b(y.lightMap.channel),bumpMapUv:oe&&b(y.bumpMap.channel),normalMapUv:F&&b(y.normalMap.channel),displacementMapUv:A&&b(y.displacementMap.channel),emissiveMapUv:N&&b(y.emissiveMap.channel),metalnessMapUv:V&&b(y.metalnessMap.channel),roughnessMapUv:_&&b(y.roughnessMap.channel),anisotropyMapUv:me&&b(y.anisotropyMap.channel),clearcoatMapUv:Ie&&b(y.clearcoatMap.channel),clearcoatNormalMapUv:Re&&b(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xe&&b(y.clearcoatRoughnessMap.channel),iridescenceMapUv:He&&b(y.iridescenceMap.channel),iridescenceThicknessMapUv:de&&b(y.iridescenceThicknessMap.channel),sheenColorMapUv:ve&&b(y.sheenColorMap.channel),sheenRoughnessMapUv:fe&&b(y.sheenRoughnessMap.channel),specularMapUv:Ee&&b(y.specularMap.channel),specularColorMapUv:ht&&b(y.specularColorMap.channel),specularIntensityMapUv:lt&&b(y.specularIntensityMap.channel),transmissionMapUv:wt&&b(y.transmissionMap.channel),thicknessMapUv:kt&&b(y.thicknessMap.channel),alphaMapUv:at&&b(y.alphaMap.channel),vertexTangents:!!w.attributes.tangent&&(F||z),vertexNormals:!!w.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!w.attributes.color&&w.attributes.color.itemSize===4,pointsUvs:E.isPoints===!0&&!!w.attributes.uv&&(he||at),fog:!!L,useFog:y.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||w.attributes.normal===void 0&&F===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:g,reversedDepthBuffer:Ne,skinning:E.isSkinnedMesh===!0,hasPositionAttribute:w.attributes.position!==void 0,morphTargets:w.morphAttributes.position!==void 0,morphNormals:w.morphAttributes.normal!==void 0,morphColors:w.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:ue,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:C.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&x.length>0,shadowMapType:r.shadowMap.type,toneMapping:Et,decodeVideoTexture:he&&y.map.isVideoTexture===!0&&rt.getTransfer(y.map.colorSpace)===dt,decodeVideoTextureEmissive:N&&y.emissiveMap.isVideoTexture===!0&&rt.getTransfer(y.emissiveMap.colorSpace)===dt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ri,flipSided:y.side===Qt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ut&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ut&&y.extensions.multiDraw===!0||Pe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};var qt;return xt.vertexUv1s=u.has(1),xt.vertexUv2s=u.has(2),xt.vertexUv3s=u.has(3),u.clear(),xt},getProgramCacheKey:function(y){let S=[];if(y.shaderID?S.push(y.shaderID):(S.push(y.customVertexShaderID),S.push(y.customFragmentShaderID)),y.defines!==void 0)for(let x in y.defines)S.push(x),S.push(y.defines[x]);return y.isRawShaderMaterial===!1&&((function(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)})(S,y),(function(x,M){s.disableAll(),M.instancing&&s.enable(0),M.instancingColor&&s.enable(1),M.instancingMorph&&s.enable(2),M.matcap&&s.enable(3),M.envMap&&s.enable(4),M.normalMapObjectSpace&&s.enable(5),M.normalMapTangentSpace&&s.enable(6),M.clearcoat&&s.enable(7),M.iridescence&&s.enable(8),M.alphaTest&&s.enable(9),M.vertexColors&&s.enable(10),M.vertexAlphas&&s.enable(11),M.vertexUv1s&&s.enable(12),M.vertexUv2s&&s.enable(13),M.vertexUv3s&&s.enable(14),M.vertexTangents&&s.enable(15),M.anisotropy&&s.enable(16),M.alphaHash&&s.enable(17),M.batching&&s.enable(18),M.dispersion&&s.enable(19),M.batchingColor&&s.enable(20),M.gradientMap&&s.enable(21),M.packedNormalMap&&s.enable(22),M.vertexNormals&&s.enable(23),x.push(s.mask),s.disableAll(),M.fog&&s.enable(0),M.useFog&&s.enable(1),M.flatShading&&s.enable(2),M.logarithmicDepthBuffer&&s.enable(3),M.reversedDepthBuffer&&s.enable(4),M.skinning&&s.enable(5),M.morphTargets&&s.enable(6),M.morphNormals&&s.enable(7),M.morphColors&&s.enable(8),M.premultipliedAlpha&&s.enable(9),M.shadowMapEnabled&&s.enable(10),M.doubleSided&&s.enable(11),M.flipSided&&s.enable(12),M.useDepthPacking&&s.enable(13),M.dithering&&s.enable(14),M.transmission&&s.enable(15),M.sheen&&s.enable(16),M.opaque&&s.enable(17),M.pointsUvs&&s.enable(18),M.decodeVideoTexture&&s.enable(19),M.decodeVideoTextureEmissive&&s.enable(20),M.alphaToCoverage&&s.enable(21),M.numLightProbeGrids>0&&s.enable(22),M.hasPositionAttribute&&s.enable(23),x.push(s.mask)})(S,y),S.push(r.outputColorSpace)),S.push(y.customProgramCacheKey),S.join()},getUniforms:function(y){let S=p[y.type],x;if(S){let M=Yi[S];x=yh.clone(M.uniforms)}else x=y.uniforms;return x},acquireProgram:function(y,S){let x=d.get(S);return x!==void 0?++x.usedTimes:(x=new Qf(r,S,y,n),c.push(x),d.set(S,x)),x},releaseProgram:function(y){if(--y.usedTimes===0){let S=c.indexOf(y);c[S]=c[c.length-1],c.pop(),d.delete(y.cacheKey),y.destroy()}},releaseShaderCache:function(y){o.remove(y)},programs:c,dispose:function(){o.dispose()}}}function ig(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,i){r.get(e)[t]=i},dispose:function(){r=new WeakMap}}}function ng(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Bh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function kh(){let r=[],e=0,t=[],i=[],n=[];function a(o){let u=0;return o.isInstancedMesh&&(u+=2),o.isSkinnedMesh&&(u+=1),u}function s(o,u,c,d,g,f){let p=r[e];return p===void 0?(p={id:o.id,object:o,geometry:u,material:c,materialVariant:a(o),groupOrder:d,renderOrder:o.renderOrder,z:g,group:f},r[e]=p):(p.id=o.id,p.object=o,p.geometry=u,p.material=c,p.materialVariant=a(o),p.groupOrder=d,p.renderOrder=o.renderOrder,p.z=g,p.group=f),e++,p}return{opaque:t,transmissive:i,transparent:n,init:function(){e=0,t.length=0,i.length=0,n.length=0},push:function(o,u,c,d,g,f){let p=s(o,u,c,d,g,f);c.transmission>0?i.push(p):c.transparent===!0?n.push(p):t.push(p)},unshift:function(o,u,c,d,g,f){let p=s(o,u,c,d,g,f);c.transmission>0?i.unshift(p):c.transparent===!0?n.unshift(p):t.unshift(p)},finish:function(){for(let o=e,u=r.length;o<u;o++){let c=r[o];if(c.id===null)break;c.id=null,c.object=null,c.geometry=null,c.material=null,c.group=null}},sort:function(o,u,c){t.length>1&&t.sort(o||ng),i.length>1&&i.sort(u||Bh),n.length>1&&n.sort(u||Bh),c&&(t.reverse(),i.reverse(),n.reverse())}}}function rg(){let r=new WeakMap;return{get:function(e,t){let i=r.get(e),n;return i===void 0?(n=new kh,r.set(e,[n])):t>=i.length?(n=new kh,i.push(n)):n=i[t],n},dispose:function(){r=new WeakMap}}}function ag(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new $e};break;case"SpotLight":t={position:new U,direction:new U,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new U,halfWidth:new U,halfHeight:new U}}return r[e.id]=t,t}}}var sg=0;function og(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function lg(r){let e=new ag,t=(function(){let o={};return{get:function(u){if(o[u.id]!==void 0)return o[u.id];let c;switch(u.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new pe,shadowCameraNear:1,shadowCameraFar:1e3}}return o[u.id]=c,c}}})(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)i.probe.push(new U);let n=new U,a=new Je,s=new Je;return{setup:function(o){let u=0,c=0,d=0;for(let k=0;k<9;k++)i.probe[k].set(0,0,0);let g=0,f=0,p=0,b=0,y=0,S=0,x=0,M=0,E=0,C=0,L=0;o.sort(og);for(let k=0,W=o.length;k<W;k++){let G=o[k],H=G.color,K=G.intensity,q=G.distance,se=null;if(G.shadow&&G.shadow.map&&(se=G.shadow.map.texture.format===ar?G.shadow.map.texture:G.shadow.map.depthTexture||G.shadow.map.texture),G.isAmbientLight)u+=H.r*K,c+=H.g*K,d+=H.b*K;else if(G.isLightProbe){for(let ee=0;ee<9;ee++)i.probe[ee].addScaledVector(G.sh.coefficients[ee],K);L++}else if(G.isDirectionalLight){let ee=e.get(G);if(ee.color.copy(G.color).multiplyScalar(G.intensity),G.castShadow){let Z=G.shadow,v=t.get(G);v.shadowIntensity=Z.intensity,v.shadowBias=Z.bias,v.shadowNormalBias=Z.normalBias,v.shadowRadius=Z.radius,v.shadowMapSize=Z.mapSize,i.directionalShadow[g]=v,i.directionalShadowMap[g]=se,i.directionalShadowMatrix[g]=G.shadow.matrix,S++}i.directional[g]=ee,g++}else if(G.isSpotLight){let ee=e.get(G);ee.position.setFromMatrixPosition(G.matrixWorld),ee.color.copy(H).multiplyScalar(K),ee.distance=q,ee.coneCos=Math.cos(G.angle),ee.penumbraCos=Math.cos(G.angle*(1-G.penumbra)),ee.decay=G.decay,i.spot[p]=ee;let Z=G.shadow;if(G.map&&(i.spotLightMap[E]=G.map,E++,Z.updateMatrices(G),G.castShadow&&C++),i.spotLightMatrix[p]=Z.matrix,G.castShadow){let v=t.get(G);v.shadowIntensity=Z.intensity,v.shadowBias=Z.bias,v.shadowNormalBias=Z.normalBias,v.shadowRadius=Z.radius,v.shadowMapSize=Z.mapSize,i.spotShadow[p]=v,i.spotShadowMap[p]=se,M++}p++}else if(G.isRectAreaLight){let ee=e.get(G);ee.color.copy(H).multiplyScalar(K),ee.halfWidth.set(.5*G.width,0,0),ee.halfHeight.set(0,.5*G.height,0),i.rectArea[b]=ee,b++}else if(G.isPointLight){let ee=e.get(G);if(ee.color.copy(G.color).multiplyScalar(G.intensity),ee.distance=G.distance,ee.decay=G.decay,G.castShadow){let Z=G.shadow,v=t.get(G);v.shadowIntensity=Z.intensity,v.shadowBias=Z.bias,v.shadowNormalBias=Z.normalBias,v.shadowRadius=Z.radius,v.shadowMapSize=Z.mapSize,v.shadowCameraNear=Z.camera.near,v.shadowCameraFar=Z.camera.far,i.pointShadow[f]=v,i.pointShadowMap[f]=se,i.pointShadowMatrix[f]=G.shadow.matrix,x++}i.point[f]=ee,f++}else if(G.isHemisphereLight){let ee=e.get(G);ee.skyColor.copy(G.color).multiplyScalar(K),ee.groundColor.copy(G.groundColor).multiplyScalar(K),i.hemi[y]=ee,y++}}b>0&&(r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Se.LTC_FLOAT_1,i.rectAreaLTC2=Se.LTC_FLOAT_2):(i.rectAreaLTC1=Se.LTC_HALF_1,i.rectAreaLTC2=Se.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=c,i.ambient[2]=d;let w=i.hash;w.directionalLength===g&&w.pointLength===f&&w.spotLength===p&&w.rectAreaLength===b&&w.hemiLength===y&&w.numDirectionalShadows===S&&w.numPointShadows===x&&w.numSpotShadows===M&&w.numSpotMaps===E&&w.numLightProbes===L||(i.directional.length=g,i.spot.length=p,i.rectArea.length=b,i.point.length=f,i.hemi.length=y,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=x,i.pointShadowMap.length=x,i.spotShadow.length=M,i.spotShadowMap.length=M,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=x,i.spotLightMatrix.length=M+E-C,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=L,w.directionalLength=g,w.pointLength=f,w.spotLength=p,w.rectAreaLength=b,w.hemiLength=y,w.numDirectionalShadows=S,w.numPointShadows=x,w.numSpotShadows=M,w.numSpotMaps=E,w.numLightProbes=L,i.version=sg++)},setupView:function(o,u){let c=0,d=0,g=0,f=0,p=0,b=u.matrixWorldInverse;for(let y=0,S=o.length;y<S;y++){let x=o[y];if(x.isDirectionalLight){let M=i.directional[c];M.direction.setFromMatrixPosition(x.matrixWorld),n.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(n),M.direction.transformDirection(b),c++}else if(x.isSpotLight){let M=i.spot[g];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(b),M.direction.setFromMatrixPosition(x.matrixWorld),n.setFromMatrixPosition(x.target.matrixWorld),M.direction.sub(n),M.direction.transformDirection(b),g++}else if(x.isRectAreaLight){let M=i.rectArea[f];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(b),s.identity(),a.copy(x.matrixWorld),a.premultiply(b),s.extractRotation(a),M.halfWidth.set(.5*x.width,0,0),M.halfHeight.set(0,.5*x.height,0),M.halfWidth.applyMatrix4(s),M.halfHeight.applyMatrix4(s),f++}else if(x.isPointLight){let M=i.point[d];M.position.setFromMatrixPosition(x.matrixWorld),M.position.applyMatrix4(b),d++}else if(x.isHemisphereLight){let M=i.hemi[p];M.direction.setFromMatrixPosition(x.matrixWorld),M.direction.transformDirection(b),p++}}},state:i}}function zh(r){let e=new lg(r),t=[],i=[],n=[],a={lightsArray:t,shadowsArray:i,lightProbeGridArray:n,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:function(s){a.camera=s,t.length=0,i.length=0,n.length=0},state:a,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){i.push(s)},pushLightProbeGrid:function(s){n.push(s)}}}function cg(r){let e=new WeakMap;return{get:function(t,i=0){let n=e.get(t),a;return n===void 0?(a=new zh(r),e.set(t,[a])):i>=n.length?(a=new zh(r),n.push(a)):a=n[i],a},dispose:function(){e=new WeakMap}}}var ug=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],dg=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Gh=new Je,Qa=new U,vu=new U;function hg(r,e,t){let i=new hn,n=new pe,a=new pe,s=new pt,o=new bo,u=new Mo,c={},d=t.maxTextureSize,g={[Wr]:Qt,[Qt]:Wr,[Ri]:Ri},f=new ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new pe},radius:{value:4}},vertexShader:`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragmentShader:`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let b=new _t;b.setAttribute("position",new ii(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new $t(b,f),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Wa;let x=this.type;function M(w,k){let W=e.update(y);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new vi(n.x,n.y,{format:ar,type:Xi})),f.uniforms.shadow_pass.value=w.map.depthTexture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(k,null,W,f,y,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(k,null,W,p,y,null)}function E(w,k,W,G){let H=null,K=W.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(K!==void 0)H=K;else if(H=W.isPointLight===!0?u:o,r.localClippingEnabled&&k.clipShadows===!0&&Array.isArray(k.clippingPlanes)&&k.clippingPlanes.length!==0||k.displacementMap&&k.displacementScale!==0||k.alphaMap&&k.alphaTest>0||k.map&&k.alphaTest>0||k.alphaToCoverage===!0){let q=H.uuid,se=k.uuid,ee=c[q];ee===void 0&&(ee={},c[q]=ee);let Z=ee[se];Z===void 0&&(Z=H.clone(),ee[se]=Z,k.addEventListener("dispose",L)),H=Z}return H.visible=k.visible,H.wireframe=k.wireframe,H.side=G===Vr?k.shadowSide!==null?k.shadowSide:k.side:k.shadowSide!==null?k.shadowSide:g[k.side],H.alphaMap=k.alphaMap,H.alphaTest=k.alphaToCoverage===!0?.5:k.alphaTest,H.map=k.map,H.clipShadows=k.clipShadows,H.clippingPlanes=k.clippingPlanes,H.clipIntersection=k.clipIntersection,H.displacementMap=k.displacementMap,H.displacementScale=k.displacementScale,H.displacementBias=k.displacementBias,H.wireframeLinewidth=k.wireframeLinewidth,H.linewidth=k.linewidth,W.isPointLight===!0&&H.isMeshDistanceMaterial===!0&&(r.properties.get(H).light=W),H}function C(w,k,W,G,H){if(w.visible===!1)return;if(w.layers.test(k.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&H===Vr)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,w.matrixWorld);let q=e.update(w),se=w.material;if(Array.isArray(se)){let ee=q.groups;for(let Z=0,v=ee.length;Z<v;Z++){let $=ee[Z],ue=se[$.materialIndex];if(ue&&ue.visible){let _e=E(w,ue,G,H);w.onBeforeShadow(r,w,k,W,q,_e,$),r.renderBufferDirect(W,null,q,_e,w,$),w.onAfterShadow(r,w,k,W,q,_e,$)}}}else if(se.visible){let ee=E(w,se,G,H);w.onBeforeShadow(r,w,k,W,q,ee,null),r.renderBufferDirect(W,null,q,ee,w,null),w.onAfterShadow(r,w,k,W,q,ee,null)}}let K=w.children;for(let q=0,se=K.length;q<se;q++)C(K[q],k,W,G,H)}function L(w){w.target.removeEventListener("dispose",L);for(let k in c){let W=c[k],G=w.target.uuid;G in W&&(W[G].dispose(),delete W[G])}}this.render=function(w,k,W){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||w.length===0)return;this.type===Pd&&(ke("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Wa);let G=r.getRenderTarget(),H=r.getActiveCubeFace(),K=r.getActiveMipmapLevel(),q=r.state;q.setBlending(qi),q.buffers.depth.getReversed()===!0?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);let se=x!==this.type;se&&k.traverse(function(ee){ee.material&&(Array.isArray(ee.material)?ee.material.forEach(Z=>Z.needsUpdate=!0):ee.material.needsUpdate=!0)});for(let ee=0,Z=w.length;ee<Z;ee++){let v=w[ee],$=v.shadow;if($===void 0){ke("WebGLShadowMap:",v,"has no shadow.");continue}if($.autoUpdate===!1&&$.needsUpdate===!1)continue;n.copy($.mapSize);let ue=$.getFrameExtents();n.multiply(ue),a.copy($.mapSize),(n.x>d||n.y>d)&&(n.x>d&&(a.x=Math.floor(d/ue.x),n.x=a.x*ue.x,$.mapSize.x=a.x),n.y>d&&(a.y=Math.floor(d/ue.y),n.y=a.y*ue.y,$.mapSize.y=a.y));let _e=r.state.buffers.depth.getReversed();if($.camera._reversedDepth=_e,$.map===null||se===!0){if($.map!==null&&($.map.depthTexture!==null&&($.map.depthTexture.dispose(),$.map.depthTexture=null),$.map.dispose()),this.type===Vr){if(v.isPointLight){ke("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}$.map=new vi(n.x,n.y,{format:ar,type:Xi,minFilter:Kt,magFilter:Kt,generateMipmaps:!1}),$.map.texture.name=v.name+".shadowMap",$.map.depthTexture=new pn(n.x,n.y,Oi),$.map.depthTexture.name=v.name+".shadowMapDepth",$.map.depthTexture.format=Bn,$.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Ai,$.map.depthTexture.magFilter=Ai}else v.isPointLight?($.map=new el(n.x),$.map.depthTexture=new Zs(n.x,mn)):($.map=new vi(n.x,n.y),$.map.depthTexture=new pn(n.x,n.y,mn)),$.map.depthTexture.name=v.name+".shadowMap",$.map.depthTexture.format=Bn,this.type===Wa?($.map.depthTexture.compareFunction=_e?Yo:jo,$.map.depthTexture.minFilter=Kt,$.map.depthTexture.magFilter=Kt):($.map.depthTexture.compareFunction=null,$.map.depthTexture.minFilter=Ai,$.map.depthTexture.magFilter=Ai);$.camera.updateProjectionMatrix()}let Ne=$.map.isWebGLCubeRenderTarget?6:1;for(let Ae=0;Ae<Ne;Ae++){if($.map.isWebGLCubeRenderTarget)r.setRenderTarget($.map,Ae),r.clear();else{Ae===0&&(r.setRenderTarget($.map),r.clear());let Pe=$.getViewport(Ae);s.set(a.x*Pe.x,a.y*Pe.y,a.x*Pe.z,a.y*Pe.w),q.viewport(s)}if(v.isPointLight){let Pe=$.camera,he=$.matrix,Me=v.distance||Pe.far;Me!==Pe.far&&(Pe.far=Me,Pe.updateProjectionMatrix()),Qa.setFromMatrixPosition(v.matrixWorld),Pe.position.copy(Qa),vu.copy(Pe.position),vu.add(ug[Ae]),Pe.up.copy(dg[Ae]),Pe.lookAt(vu),Pe.updateMatrixWorld(),he.makeTranslation(-Qa.x,-Qa.y,-Qa.z),Gh.multiplyMatrices(Pe.projectionMatrix,Pe.matrixWorldInverse),$._frustum.setFromProjectionMatrix(Gh,Pe.coordinateSystem,Pe.reversedDepth)}else $.updateMatrices(v);i=$.getFrustum(),C(k,W,$.camera,v,this.type)}$.isPointLightShadow!==!0&&this.type===Vr&&M($,W),$.needsUpdate=!1}x=this.type,S.needsUpdate=!1,r.setRenderTarget(G,H,K)}}function pg(r,e){let t=new function(){let _=!1,z=new pt,O=null,I=new pt(0,0,0,0);return{setMask:function(j){O===j||_||(r.colorMask(j,j,j,j),O=j)},setLocked:function(j){_=j},setClear:function(j,J,re,me,Ie){Ie===!0&&(j*=me,J*=me,re*=me),z.set(j,J,re,me),I.equals(z)===!1&&(r.clearColor(j,J,re,me),I.copy(z))},reset:function(){_=!1,O=null,I.set(-1,0,0,0)}}},i=new function(){let _=!1,z=!1,O=null,I=null,j=null;return{setReversed:function(J){if(z!==J){let re=e.get("EXT_clip_control");J?re.clipControlEXT(re.LOWER_LEFT_EXT,re.ZERO_TO_ONE_EXT):re.clipControlEXT(re.LOWER_LEFT_EXT,re.NEGATIVE_ONE_TO_ONE_EXT),z=J;let me=j;j=null,this.setClear(me)}},getReversed:function(){return z},setTest:function(J){J?ye(r.DEPTH_TEST):Te(r.DEPTH_TEST)},setMask:function(J){O===J||_||(r.depthMask(J),O=J)},setFunc:function(J){if(z&&(J=ph[J]),I!==J){switch(J){case lc:r.depthFunc(r.NEVER);break;case cc:r.depthFunc(r.ALWAYS);break;case uc:r.depthFunc(r.LESS);break;case No:r.depthFunc(r.LEQUAL);break;case dc:r.depthFunc(r.EQUAL);break;case hc:r.depthFunc(r.GEQUAL);break;case pc:r.depthFunc(r.GREATER);break;case mc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}I=J}},setLocked:function(J){_=J},setClear:function(J){j!==J&&(j=J,z&&(J=1-J),r.clearDepth(J))},reset:function(){_=!1,O=null,I=null,j=null,z=!1}}},n=new function(){let _=!1,z=null,O=null,I=null,j=null,J=null,re=null,me=null,Ie=null;return{setTest:function(Re){_||(Re?ye(r.STENCIL_TEST):Te(r.STENCIL_TEST))},setMask:function(Re){z===Re||_||(r.stencilMask(Re),z=Re)},setFunc:function(Re,xe,He){O===Re&&I===xe&&j===He||(r.stencilFunc(Re,xe,He),O=Re,I=xe,j=He)},setOp:function(Re,xe,He){J===Re&&re===xe&&me===He||(r.stencilOp(Re,xe,He),J=Re,re=xe,me=He)},setLocked:function(Re){_=Re},setClear:function(Re){Ie!==Re&&(r.clearStencil(Re),Ie=Re)},reset:function(){_=!1,z=null,O=null,I=null,j=null,J=null,re=null,me=null,Ie=null}}},a=new WeakMap,s=new WeakMap,o={},u={},c={},d=new WeakMap,g=[],f=null,p=!1,b=null,y=null,S=null,x=null,M=null,E=null,C=null,L=new $e(0,0,0),w=0,k=!1,W=null,G=null,H=null,K=null,q=null,se=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ee=!1,Z=0,v=r.getParameter(r.VERSION);v.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(v)[1]),ee=Z>=1):v.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(v)[1]),ee=Z>=2);let $=null,ue={},_e=r.getParameter(r.SCISSOR_BOX),Ne=r.getParameter(r.VIEWPORT),Ae=new pt().fromArray(_e),Pe=new pt().fromArray(Ne);function he(_,z,O,I){let j=new Uint8Array(4),J=r.createTexture();r.bindTexture(_,J),r.texParameteri(_,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(_,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let re=0;re<O;re++)_===r.TEXTURE_3D||_===r.TEXTURE_2D_ARRAY?r.texImage3D(z,0,r.RGBA,1,1,I,0,r.RGBA,r.UNSIGNED_BYTE,j):r.texImage2D(z+re,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,j);return J}let Me={};function ye(_){o[_]!==!0&&(r.enable(_),o[_]=!0)}function Te(_){o[_]!==!1&&(r.disable(_),o[_]=!1)}Me[r.TEXTURE_2D]=he(r.TEXTURE_2D,r.TEXTURE_2D,1),Me[r.TEXTURE_CUBE_MAP]=he(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[r.TEXTURE_2D_ARRAY]=he(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Me[r.TEXTURE_3D]=he(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),i.setClear(1),n.setClear(0),ye(r.DEPTH_TEST),i.setFunc(No),A(!1),N(ac),ye(r.CULL_FACE),F(qi);let Ue={[$r]:r.FUNC_ADD,[Ld]:r.FUNC_SUBTRACT,[Dd]:r.FUNC_REVERSE_SUBTRACT};Ue[Nd]=r.MIN,Ue[Ud]=r.MAX;let oe={[Fd]:r.ZERO,[Od]:r.ONE,[Bd]:r.SRC_COLOR,[zd]:r.SRC_ALPHA,[qd]:r.SRC_ALPHA_SATURATE,[Wd]:r.DST_COLOR,[Hd]:r.DST_ALPHA,[kd]:r.ONE_MINUS_SRC_COLOR,[Gd]:r.ONE_MINUS_SRC_ALPHA,[$d]:r.ONE_MINUS_DST_COLOR,[Vd]:r.ONE_MINUS_DST_ALPHA,[Xd]:r.CONSTANT_COLOR,[jd]:r.ONE_MINUS_CONSTANT_COLOR,[Yd]:r.CONSTANT_ALPHA,[Zd]:r.ONE_MINUS_CONSTANT_ALPHA};function F(_,z,O,I,j,J,re,me,Ie,Re){if(_!==qi){if(p===!1&&(ye(r.BLEND),p=!0),_===Id)j=j||z,J=J||O,re=re||I,z===y&&j===M||(r.blendEquationSeparate(Ue[z],Ue[j]),y=z,M=j),O===S&&I===x&&J===E&&re===C||(r.blendFuncSeparate(oe[O],oe[I],oe[J],oe[re]),S=O,x=I,E=J,C=re),me.equals(L)!==!1&&Ie===w||(r.blendColor(me.r,me.g,me.b,Ie),L.copy(me),w=Ie),b=_,k=!1;else if(_!==b||Re!==k){if(y===$r&&M===$r||(r.blendEquation(r.FUNC_ADD),y=$r,M=$r),Re)switch(_){case $a:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case qa:r.blendFunc(r.ONE,r.ONE);break;case sc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case oc:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Ge("WebGLState: Invalid blending: ",_)}else switch(_){case $a:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case qa:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case sc:Ge("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case oc:Ge("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ge("WebGLState: Invalid blending: ",_)}S=null,x=null,E=null,C=null,L.set(0,0,0),w=0,b=_,k=Re}}else p===!0&&(Te(r.BLEND),p=!1)}function A(_){W!==_&&(_?r.frontFace(r.CW):r.frontFace(r.CCW),W=_)}function N(_){_!==Cd?(ye(r.CULL_FACE),_!==G&&(_===ac?r.cullFace(r.BACK):_===Rd?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Te(r.CULL_FACE),G=_}function V(_,z,O){_?(ye(r.POLYGON_OFFSET_FILL),K===z&&q===O||(K=z,q=O,i.getReversed()&&(z=-z),r.polygonOffset(z,O))):Te(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:i,stencil:n},enable:ye,disable:Te,bindFramebuffer:function(_,z){return c[_]!==z&&(r.bindFramebuffer(_,z),c[_]=z,_===r.DRAW_FRAMEBUFFER&&(c[r.FRAMEBUFFER]=z),_===r.FRAMEBUFFER&&(c[r.DRAW_FRAMEBUFFER]=z),!0)},drawBuffers:function(_,z){let O=g,I=!1;if(_){O=d.get(z),O===void 0&&(O=[],d.set(z,O));let j=_.textures;if(O.length!==j.length||O[0]!==r.COLOR_ATTACHMENT0){for(let J=0,re=j.length;J<re;J++)O[J]=r.COLOR_ATTACHMENT0+J;O.length=j.length,I=!0}}else O[0]!==r.BACK&&(O[0]=r.BACK,I=!0);I&&r.drawBuffers(O)},useProgram:function(_){return f!==_&&(r.useProgram(_),f=_,!0)},setBlending:F,setMaterial:function(_,z){_.side===Ri?Te(r.CULL_FACE):ye(r.CULL_FACE);let O=_.side===Qt;z&&(O=!O),A(O),_.blending===$a&&_.transparent===!1?F(qi):F(_.blending,_.blendEquation,_.blendSrc,_.blendDst,_.blendEquationAlpha,_.blendSrcAlpha,_.blendDstAlpha,_.blendColor,_.blendAlpha,_.premultipliedAlpha),i.setFunc(_.depthFunc),i.setTest(_.depthTest),i.setMask(_.depthWrite),t.setMask(_.colorWrite);let I=_.stencilWrite;n.setTest(I),I&&(n.setMask(_.stencilWriteMask),n.setFunc(_.stencilFunc,_.stencilRef,_.stencilFuncMask),n.setOp(_.stencilFail,_.stencilZFail,_.stencilZPass)),V(_.polygonOffset,_.polygonOffsetFactor,_.polygonOffsetUnits),_.alphaToCoverage===!0?ye(r.SAMPLE_ALPHA_TO_COVERAGE):Te(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:A,setCullFace:N,setLineWidth:function(_){_!==H&&(ee&&r.lineWidth(_),H=_)},setPolygonOffset:V,setScissorTest:function(_){_?ye(r.SCISSOR_TEST):Te(r.SCISSOR_TEST)},activeTexture:function(_){_===void 0&&(_=r.TEXTURE0+se-1),$!==_&&(r.activeTexture(_),$=_)},bindTexture:function(_,z,O){O===void 0&&(O=$===null?r.TEXTURE0+se-1:$);let I=ue[O];I===void 0&&(I={type:void 0,texture:void 0},ue[O]=I),I.type===_&&I.texture===z||($!==O&&(r.activeTexture(O),$=O),r.bindTexture(_,z||Me[_]),I.type=_,I.texture=z)},unbindTexture:function(){let _=ue[$];_!==void 0&&_.type!==void 0&&(r.bindTexture(_.type,null),_.type=void 0,_.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D(...arguments)}catch(_){Ge("WebGLState:",_)}},compressedTexImage3D:function(){try{r.compressedTexImage3D(...arguments)}catch(_){Ge("WebGLState:",_)}},texImage2D:function(){try{r.texImage2D(...arguments)}catch(_){Ge("WebGLState:",_)}},texImage3D:function(){try{r.texImage3D(...arguments)}catch(_){Ge("WebGLState:",_)}},pixelStorei:function(_,z){u[_]!==z&&(r.pixelStorei(_,z),u[_]=z)},getParameter:function(_){return u[_]!==void 0?u[_]:r.getParameter(_)},updateUBOMapping:function(_,z){let O=s.get(z);O===void 0&&(O=new WeakMap,s.set(z,O));let I=O.get(_);I===void 0&&(I=r.getUniformBlockIndex(z,_.name),O.set(_,I))},uniformBlockBinding:function(_,z){let O=s.get(z).get(_);a.get(z)!==O&&(r.uniformBlockBinding(z,O,_.__bindingPointIndex),a.set(z,O))},texStorage2D:function(){try{r.texStorage2D(...arguments)}catch(_){Ge("WebGLState:",_)}},texStorage3D:function(){try{r.texStorage3D(...arguments)}catch(_){Ge("WebGLState:",_)}},texSubImage2D:function(){try{r.texSubImage2D(...arguments)}catch(_){Ge("WebGLState:",_)}},texSubImage3D:function(){try{r.texSubImage3D(...arguments)}catch(_){Ge("WebGLState:",_)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D(...arguments)}catch(_){Ge("WebGLState:",_)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D(...arguments)}catch(_){Ge("WebGLState:",_)}},scissor:function(_){Ae.equals(_)===!1&&(r.scissor(_.x,_.y,_.z,_.w),Ae.copy(_))},viewport:function(_){Pe.equals(_)===!1&&(r.viewport(_.x,_.y,_.z,_.w),Pe.copy(_))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),i.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),o={},u={},$=null,ue={},c={},d=new WeakMap,g=[],f=null,p=!1,b=null,y=null,S=null,x=null,M=null,E=null,C=null,L=new $e(0,0,0),w=0,k=!1,W=null,G=null,H=null,K=null,q=null,Ae.set(0,0,r.canvas.width,r.canvas.height),Pe.set(0,0,r.canvas.width,r.canvas.height),t.reset(),i.reset(),n.reset()}}}function mg(r,e,t,i,n,a,s){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new pe,d=new WeakMap,g=new Set,f,p=new WeakMap,b=!1;try{b=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(F,A){return b?new OffscreenCanvas(F,A):Pr("canvas")}function S(F,A,N){let V=1,_=oe(F);if((_.width>N||_.height>N)&&(V=N/Math.max(_.width,_.height)),V<1){if(typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&F instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&F instanceof ImageBitmap||typeof VideoFrame<"u"&&F instanceof VideoFrame){let z=Math.floor(V*_.width),O=Math.floor(V*_.height);f===void 0&&(f=y(z,O));let I=A?y(z,O):f;return I.width=z,I.height=O,I.getContext("2d").drawImage(F,0,0,z,O),ke("WebGLRenderer: Texture has been resized from ("+_.width+"x"+_.height+") to ("+z+"x"+O+")."),I}return"data"in F&&ke("WebGLRenderer: Image in DataTexture is too big ("+_.width+"x"+_.height+")."),F}return F}function x(F){return F.generateMipmaps}function M(F){r.generateMipmap(F)}function E(F){return F.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:F.isWebGL3DRenderTarget?r.TEXTURE_3D:F.isWebGLArrayRenderTarget||F.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function C(F,A,N,V,_,z=!1){if(F!==null){if(r[F]!==void 0)return r[F];ke("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+F+"'")}let O;V&&(O=e.get("EXT_texture_norm16"),O||ke("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let I=A;if(A===r.RED&&(N===r.FLOAT&&(I=r.R32F),N===r.HALF_FLOAT&&(I=r.R16F),N===r.UNSIGNED_BYTE&&(I=r.R8),N===r.UNSIGNED_SHORT&&O&&(I=O.R16_EXT),N===r.SHORT&&O&&(I=O.R16_SNORM_EXT)),A===r.RED_INTEGER&&(N===r.UNSIGNED_BYTE&&(I=r.R8UI),N===r.UNSIGNED_SHORT&&(I=r.R16UI),N===r.UNSIGNED_INT&&(I=r.R32UI),N===r.BYTE&&(I=r.R8I),N===r.SHORT&&(I=r.R16I),N===r.INT&&(I=r.R32I)),A===r.RG&&(N===r.FLOAT&&(I=r.RG32F),N===r.HALF_FLOAT&&(I=r.RG16F),N===r.UNSIGNED_BYTE&&(I=r.RG8),N===r.UNSIGNED_SHORT&&O&&(I=O.RG16_EXT),N===r.SHORT&&O&&(I=O.RG16_SNORM_EXT)),A===r.RG_INTEGER&&(N===r.UNSIGNED_BYTE&&(I=r.RG8UI),N===r.UNSIGNED_SHORT&&(I=r.RG16UI),N===r.UNSIGNED_INT&&(I=r.RG32UI),N===r.BYTE&&(I=r.RG8I),N===r.SHORT&&(I=r.RG16I),N===r.INT&&(I=r.RG32I)),A===r.RGB_INTEGER&&(N===r.UNSIGNED_BYTE&&(I=r.RGB8UI),N===r.UNSIGNED_SHORT&&(I=r.RGB16UI),N===r.UNSIGNED_INT&&(I=r.RGB32UI),N===r.BYTE&&(I=r.RGB8I),N===r.SHORT&&(I=r.RGB16I),N===r.INT&&(I=r.RGB32I)),A===r.RGBA_INTEGER&&(N===r.UNSIGNED_BYTE&&(I=r.RGBA8UI),N===r.UNSIGNED_SHORT&&(I=r.RGBA16UI),N===r.UNSIGNED_INT&&(I=r.RGBA32UI),N===r.BYTE&&(I=r.RGBA8I),N===r.SHORT&&(I=r.RGBA16I),N===r.INT&&(I=r.RGBA32I)),A===r.RGB&&(N===r.UNSIGNED_SHORT&&O&&(I=O.RGB16_EXT),N===r.SHORT&&O&&(I=O.RGB16_SNORM_EXT),N===r.UNSIGNED_INT_5_9_9_9_REV&&(I=r.RGB9_E5),N===r.UNSIGNED_INT_10F_11F_11F_REV&&(I=r.R11F_G11F_B10F)),A===r.RGBA){let j=z?ya:rt.getTransfer(_);N===r.FLOAT&&(I=r.RGBA32F),N===r.HALF_FLOAT&&(I=r.RGBA16F),N===r.UNSIGNED_BYTE&&(I=j===dt?r.SRGB8_ALPHA8:r.RGBA8),N===r.UNSIGNED_SHORT&&O&&(I=O.RGBA16_EXT),N===r.SHORT&&O&&(I=O.RGBA16_SNORM_EXT),N===r.UNSIGNED_SHORT_4_4_4_4&&(I=r.RGBA4),N===r.UNSIGNED_SHORT_5_5_5_1&&(I=r.RGB5_A1)}return I!==r.R16F&&I!==r.R32F&&I!==r.RG16F&&I!==r.RG32F&&I!==r.RGBA16F&&I!==r.RGBA32F||e.get("EXT_color_buffer_float"),I}function L(F,A){let N;return F?A===null||A===mn||A===jr?N=r.DEPTH24_STENCIL8:A===Oi?N=r.DEPTH32F_STENCIL8:A===Xr&&(N=r.DEPTH24_STENCIL8,ke("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===mn||A===jr?N=r.DEPTH_COMPONENT24:A===Oi?N=r.DEPTH_COMPONENT32F:A===Xr&&(N=r.DEPTH_COMPONENT16),N}function w(F,A){return x(F)===!0||F.isFramebufferTexture&&F.minFilter!==Ai&&F.minFilter!==Kt?Math.log2(Math.max(A.width,A.height))+1:F.mipmaps!==void 0&&F.mipmaps.length>0?F.mipmaps.length:F.isCompressedTexture&&Array.isArray(F.image)?A.mipmaps.length:1}function k(F){let A=F.target;A.removeEventListener("dispose",k),(function(N){let V=i.get(N);if(V.__webglInit===void 0)return;let _=N.source,z=p.get(_);if(z){let O=z[V.__cacheKey];O.usedTimes--,O.usedTimes===0&&G(N),Object.keys(z).length===0&&p.delete(_)}i.remove(N)})(A),A.isVideoTexture&&d.delete(A),A.isHTMLTexture&&g.delete(A)}function W(F){let A=F.target;A.removeEventListener("dispose",W),(function(N){let V=i.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),i.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(V.__webglFramebuffer[z]))for(let O=0;O<V.__webglFramebuffer[z].length;O++)r.deleteFramebuffer(V.__webglFramebuffer[z][O]);else r.deleteFramebuffer(V.__webglFramebuffer[z]);V.__webglDepthbuffer&&r.deleteRenderbuffer(V.__webglDepthbuffer[z])}else{if(Array.isArray(V.__webglFramebuffer))for(let z=0;z<V.__webglFramebuffer.length;z++)r.deleteFramebuffer(V.__webglFramebuffer[z]);else r.deleteFramebuffer(V.__webglFramebuffer);if(V.__webglDepthbuffer&&r.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&r.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let z=0;z<V.__webglColorRenderbuffer.length;z++)V.__webglColorRenderbuffer[z]&&r.deleteRenderbuffer(V.__webglColorRenderbuffer[z]);V.__webglDepthRenderbuffer&&r.deleteRenderbuffer(V.__webglDepthRenderbuffer)}let _=N.textures;for(let z=0,O=_.length;z<O;z++){let I=i.get(_[z]);I.__webglTexture&&(r.deleteTexture(I.__webglTexture),s.memory.textures--),i.remove(_[z])}i.remove(N)})(A)}function G(F){let A=i.get(F);r.deleteTexture(A.__webglTexture);let N=F.source;delete p.get(N)[A.__cacheKey],s.memory.textures--}let H=0;function K(F,A){let N=i.get(F);if(F.isVideoTexture&&(function(V){let _=s.render.frame;d.get(V)!==_&&(d.set(V,_),V.update())})(F),F.isRenderTargetTexture===!1&&F.isExternalTexture!==!0&&F.version>0&&N.__version!==F.version){let V=F.image;if(V===null)ke("WebGLRenderer: Texture marked for update but no image data found.");else{if(V.complete!==!1)return void ue(N,F,A);ke("WebGLRenderer: Texture marked for update but image is incomplete")}}else F.isExternalTexture&&(N.__webglTexture=F.sourceTexture?F.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,N.__webglTexture,r.TEXTURE0+A)}let q={[Gs]:r.REPEAT,[Dn]:r.CLAMP_TO_EDGE,[Hs]:r.MIRRORED_REPEAT},se={[Ai]:r.NEAREST,[eh]:r.NEAREST_MIPMAP_NEAREST,[Ya]:r.NEAREST_MIPMAP_LINEAR,[Kt]:r.LINEAR,[Oo]:r.LINEAR_MIPMAP_NEAREST,[nr]:r.LINEAR_MIPMAP_LINEAR},ee={[rh]:r.NEVER,[ch]:r.ALWAYS,[ah]:r.LESS,[jo]:r.LEQUAL,[sh]:r.EQUAL,[Yo]:r.GEQUAL,[oh]:r.GREATER,[lh]:r.NOTEQUAL};function Z(F,A){if(A.type!==Oi||e.has("OES_texture_float_linear")!==!1||A.magFilter!==Kt&&A.magFilter!==Oo&&A.magFilter!==Ya&&A.magFilter!==nr&&A.minFilter!==Kt&&A.minFilter!==Oo&&A.minFilter!==Ya&&A.minFilter!==nr||ke("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(F,r.TEXTURE_WRAP_S,q[A.wrapS]),r.texParameteri(F,r.TEXTURE_WRAP_T,q[A.wrapT]),F!==r.TEXTURE_3D&&F!==r.TEXTURE_2D_ARRAY||r.texParameteri(F,r.TEXTURE_WRAP_R,q[A.wrapR]),r.texParameteri(F,r.TEXTURE_MAG_FILTER,se[A.magFilter]),r.texParameteri(F,r.TEXTURE_MIN_FILTER,se[A.minFilter]),A.compareFunction&&(r.texParameteri(F,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(F,r.TEXTURE_COMPARE_FUNC,ee[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Ai||A.minFilter!==Ya&&A.minFilter!==nr||A.type===Oi&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||i.get(A).__currentAnisotropy){let N=e.get("EXT_texture_filter_anisotropic");r.texParameterf(F,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,n.getMaxAnisotropy())),i.get(A).__currentAnisotropy=A.anisotropy}}}function v(F,A){let N=!1;F.__webglInit===void 0&&(F.__webglInit=!0,A.addEventListener("dispose",k));let V=A.source,_=p.get(V);_===void 0&&(_={},p.set(V,_));let z=(function(O){let I=[];return I.push(O.wrapS),I.push(O.wrapT),I.push(O.wrapR||0),I.push(O.magFilter),I.push(O.minFilter),I.push(O.anisotropy),I.push(O.internalFormat),I.push(O.format),I.push(O.type),I.push(O.generateMipmaps),I.push(O.premultiplyAlpha),I.push(O.flipY),I.push(O.unpackAlignment),I.push(O.colorSpace),I.join()})(A);if(z!==F.__cacheKey){_[z]===void 0&&(_[z]={texture:r.createTexture(),usedTimes:0},s.memory.textures++,N=!0),_[z].usedTimes++;let O=_[F.__cacheKey];O!==void 0&&(_[F.__cacheKey].usedTimes--,O.usedTimes===0&&G(A)),F.__cacheKey=z,F.__webglTexture=_[z].texture}return N}function $(F,A,N){return Math.floor(Math.floor(F/N)/A)}function ue(F,A,N){let V=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(V=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(V=r.TEXTURE_3D);let _=v(F,A),z=A.source;t.bindTexture(V,F.__webglTexture,r.TEXTURE0+N);let O=i.get(z);if(z.version!==O.__version||_===!0){if(t.activeTexture(r.TEXTURE0+N),!(typeof ImageBitmap<"u"&&A.image instanceof ImageBitmap)){let ve=rt.getPrimaries(rt.workingColorSpace),fe=A.colorSpace===sr?null:rt.getPrimaries(A.colorSpace),Ee=A.colorSpace===sr||ve===fe?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment);let I=S(A.image,!1,n.maxTextureSize);I=Ue(A,I);let j=a.convert(A.format,A.colorSpace),J=a.convert(A.type),re,me=C(A.internalFormat,j,J,A.normalized,A.colorSpace,A.isVideoTexture);Z(V,A);let Ie=A.mipmaps,Re=A.isVideoTexture!==!0,xe=O.__version===void 0||_===!0,He=z.dataReady,de=w(A,I);if(A.isDepthTexture)me=L(A.format===rr,A.type),xe&&(Re?t.texStorage2D(r.TEXTURE_2D,1,me,I.width,I.height):t.texImage2D(r.TEXTURE_2D,0,me,I.width,I.height,0,j,J,null));else if(A.isDataTexture)if(Ie.length>0){Re&&xe&&t.texStorage2D(r.TEXTURE_2D,de,me,Ie[0].width,Ie[0].height);for(let ve=0,fe=Ie.length;ve<fe;ve++)re=Ie[ve],Re?He&&t.texSubImage2D(r.TEXTURE_2D,ve,0,0,re.width,re.height,j,J,re.data):t.texImage2D(r.TEXTURE_2D,ve,me,re.width,re.height,0,j,J,re.data);A.generateMipmaps=!1}else Re?(xe&&t.texStorage2D(r.TEXTURE_2D,de,me,I.width,I.height),He&&(function(ve,fe,Ee,ht){let lt=ve.updateRanges;if(lt.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,fe.width,fe.height,Ee,ht,fe.data);else{lt.sort((Ye,Ut)=>Ye.start-Ut.start);let wt=0;for(let Ye=1;Ye<lt.length;Ye++){let Ut=lt[wt],ut=lt[Ye],Et=Ut.start+Ut.count,xt=$(ut.start,fe.width,4),qt=$(Ut.start,fe.width,4);ut.start<=Et+1&&xt===qt&&$(ut.start+ut.count-1,fe.width,4)===xt?Ut.count=Math.max(Ut.count,ut.start+ut.count-Ut.start):(++wt,lt[wt]=ut)}lt.length=wt+1;let kt=t.getParameter(r.UNPACK_ROW_LENGTH),De=t.getParameter(r.UNPACK_SKIP_PIXELS),at=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,fe.width);for(let Ye=0,Ut=lt.length;Ye<Ut;Ye++){let ut=lt[Ye],Et=Math.floor(ut.start/4),xt=Math.ceil(ut.count/4),qt=Et%fe.width,mt=Math.floor(Et/fe.width),ui=xt;t.pixelStorei(r.UNPACK_SKIP_PIXELS,qt),t.pixelStorei(r.UNPACK_SKIP_ROWS,mt),t.texSubImage2D(r.TEXTURE_2D,0,qt,mt,ui,1,Ee,ht,fe.data)}ve.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,kt),t.pixelStorei(r.UNPACK_SKIP_PIXELS,De),t.pixelStorei(r.UNPACK_SKIP_ROWS,at)}})(A,I,j,J)):t.texImage2D(r.TEXTURE_2D,0,me,I.width,I.height,0,j,J,I.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Re&&xe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,de,me,Ie[0].width,Ie[0].height,I.depth);for(let ve=0,fe=Ie.length;ve<fe;ve++)if(re=Ie[ve],A.format!==Bi)if(j!==null)if(Re){if(He)if(A.layerUpdates.size>0){let Ee=du(re.width,re.height,A.format,A.type);for(let ht of A.layerUpdates){let lt=re.data.subarray(ht*Ee/re.data.BYTES_PER_ELEMENT,(ht+1)*Ee/re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ve,0,0,ht,re.width,re.height,1,j,lt)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ve,0,0,0,re.width,re.height,I.depth,j,re.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ve,me,re.width,re.height,I.depth,0,re.data,0,0);else ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Re?He&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ve,0,0,0,re.width,re.height,I.depth,j,J,re.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ve,me,re.width,re.height,I.depth,0,j,J,re.data)}else{Re&&xe&&t.texStorage2D(r.TEXTURE_2D,de,me,Ie[0].width,Ie[0].height);for(let ve=0,fe=Ie.length;ve<fe;ve++)re=Ie[ve],A.format!==Bi?j!==null?Re?He&&t.compressedTexSubImage2D(r.TEXTURE_2D,ve,0,0,re.width,re.height,j,re.data):t.compressedTexImage2D(r.TEXTURE_2D,ve,me,re.width,re.height,0,re.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Re?He&&t.texSubImage2D(r.TEXTURE_2D,ve,0,0,re.width,re.height,j,J,re.data):t.texImage2D(r.TEXTURE_2D,ve,me,re.width,re.height,0,j,J,re.data)}else if(A.isDataArrayTexture)if(Re){if(xe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,de,me,I.width,I.height,I.depth),He)if(A.layerUpdates.size>0){let ve=du(I.width,I.height,A.format,A.type);for(let fe of A.layerUpdates){let Ee=I.data.subarray(fe*ve/I.data.BYTES_PER_ELEMENT,(fe+1)*ve/I.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,fe,I.width,I.height,1,j,J,Ee)}A.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,I.width,I.height,I.depth,j,J,I.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,me,I.width,I.height,I.depth,0,j,J,I.data);else if(A.isData3DTexture)Re?(xe&&t.texStorage3D(r.TEXTURE_3D,de,me,I.width,I.height,I.depth),He&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,I.width,I.height,I.depth,j,J,I.data)):t.texImage3D(r.TEXTURE_3D,0,me,I.width,I.height,I.depth,0,j,J,I.data);else if(A.isFramebufferTexture){if(xe)if(Re)t.texStorage2D(r.TEXTURE_2D,de,me,I.width,I.height);else{let ve=I.width,fe=I.height;for(let Ee=0;Ee<de;Ee++)t.texImage2D(r.TEXTURE_2D,Ee,me,ve,fe,0,j,J,null),ve>>=1,fe>>=1}}else if(A.isHTMLTexture){if("texElementImage2D"in r){let ve=r.canvas;if(ve.hasAttribute("layoutsubtree")||ve.setAttribute("layoutsubtree","true"),I.parentNode!==ve)return ve.appendChild(I),g.add(A),ve.onpaint=fe=>{let Ee=fe.changedElements;for(let ht of g)Ee.includes(ht.image)&&(ht.needsUpdate=!0)},void ve.requestPaint();if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,I);else{let Ee=r.RGBA,ht=r.RGBA,lt=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,Ee,ht,lt,I)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Ie.length>0){if(Re&&xe){let ve=oe(Ie[0]);t.texStorage2D(r.TEXTURE_2D,de,me,ve.width,ve.height)}for(let ve=0,fe=Ie.length;ve<fe;ve++)re=Ie[ve],Re?He&&t.texSubImage2D(r.TEXTURE_2D,ve,0,0,j,J,re):t.texImage2D(r.TEXTURE_2D,ve,me,j,J,re);A.generateMipmaps=!1}else if(Re){if(xe){let ve=oe(I);t.texStorage2D(r.TEXTURE_2D,de,me,ve.width,ve.height)}He&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,j,J,I)}else t.texImage2D(r.TEXTURE_2D,0,me,j,J,I);x(A)&&M(V),O.__version=z.version,A.onUpdate&&A.onUpdate(A)}F.__version=A.version}function _e(F,A,N,V,_,z){let O=a.convert(N.format,N.colorSpace),I=a.convert(N.type),j=C(N.internalFormat,O,I,N.normalized,N.colorSpace),J=i.get(A),re=i.get(N);if(re.__renderTarget=A,!J.__hasExternalTextures){let me=Math.max(1,A.width>>z),Ie=Math.max(1,A.height>>z);_===r.TEXTURE_3D||_===r.TEXTURE_2D_ARRAY?t.texImage3D(_,z,j,me,Ie,A.depth,0,O,I,null):t.texImage2D(_,z,j,me,Ie,0,O,I,null)}t.bindFramebuffer(r.FRAMEBUFFER,F),Te(A)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,V,_,re.__webglTexture,0,ye(A)):(_===r.TEXTURE_2D||_>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&_<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,V,_,re.__webglTexture,z),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ne(F,A,N){if(r.bindRenderbuffer(r.RENDERBUFFER,F),A.depthBuffer){let V=A.depthTexture,_=V&&V.isDepthTexture?V.type:null,z=L(A.stencilBuffer,_),O=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Te(A)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ye(A),z,A.width,A.height):N?r.renderbufferStorageMultisample(r.RENDERBUFFER,ye(A),z,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,z,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,O,r.RENDERBUFFER,F)}else{let V=A.textures;for(let _=0;_<V.length;_++){let z=V[_],O=a.convert(z.format,z.colorSpace),I=a.convert(z.type),j=C(z.internalFormat,O,I,z.normalized,z.colorSpace);Te(A)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ye(A),j,A.width,A.height):N?r.renderbufferStorageMultisample(r.RENDERBUFFER,ye(A),j,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,j,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ae(F,A,N){let V=A.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,F),!A.depthTexture||!A.depthTexture.isDepthTexture)throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let _=i.get(A.depthTexture);if(_.__renderTarget=A,_.__webglTexture&&A.depthTexture.image.width===A.width&&A.depthTexture.image.height===A.height||(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),V){if(_.__webglInit===void 0&&(_.__webglInit=!0,A.depthTexture.addEventListener("dispose",k)),_.__webglTexture===void 0){_.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,_.__webglTexture),Z(r.TEXTURE_CUBE_MAP,A.depthTexture);let J=a.convert(A.depthTexture.format),re=a.convert(A.depthTexture.type),me;A.depthTexture.format===Bn?me=r.DEPTH_COMPONENT24:A.depthTexture.format===rr&&(me=r.DEPTH24_STENCIL8);for(let Ie=0;Ie<6;Ie++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,me,A.width,A.height,0,J,re,null)}}else K(A.depthTexture,0);let z=_.__webglTexture,O=ye(A),I=V?r.TEXTURE_CUBE_MAP_POSITIVE_X+N:r.TEXTURE_2D,j=A.depthTexture.format===rr?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(A.depthTexture.format===Bn)Te(A)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,j,I,z,0,O):r.framebufferTexture2D(r.FRAMEBUFFER,j,I,z,0);else{if(A.depthTexture.format!==rr)throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");Te(A)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,j,I,z,0,O):r.framebufferTexture2D(r.FRAMEBUFFER,j,I,z,0)}}function Pe(F){let A=i.get(F),N=F.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==F.depthTexture){let V=F.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),V){let _=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,V.removeEventListener("dispose",_)};V.addEventListener("dispose",_),A.__depthDisposeCallback=_}A.__boundDepthTexture=V}if(F.depthTexture&&!A.__autoAllocateDepthBuffer)if(N)for(let V=0;V<6;V++)Ae(A.__webglFramebuffer[V],F,V);else{let V=F.texture.mipmaps;V&&V.length>0?Ae(A.__webglFramebuffer[0],F,0):Ae(A.__webglFramebuffer,F,0)}else if(N){A.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[V]),A.__webglDepthbuffer[V]===void 0)A.__webglDepthbuffer[V]=r.createRenderbuffer(),Ne(A.__webglDepthbuffer[V],F,!1);else{let _=F.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,z=A.__webglDepthbuffer[V];r.bindRenderbuffer(r.RENDERBUFFER,z),r.framebufferRenderbuffer(r.FRAMEBUFFER,_,r.RENDERBUFFER,z)}}else{let V=F.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),Ne(A.__webglDepthbuffer,F,!1);else{let _=F.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,z=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,z),r.framebufferRenderbuffer(r.FRAMEBUFFER,_,r.RENDERBUFFER,z)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}let he=[],Me=[];function ye(F){return Math.min(n.maxSamples,F.samples)}function Te(F){let A=i.get(F);return F.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Ue(F,A){let N=F.colorSpace,V=F.format,_=F.type;return F.isCompressedTexture===!0||F.isVideoTexture===!0||N!==va&&N!==sr&&(rt.getTransfer(N)===dt?V===Bi&&_===_i||ke("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ge("WebGLTextures: Unsupported texture color space:",N)),A}function oe(F){return typeof HTMLImageElement<"u"&&F instanceof HTMLImageElement?(c.width=F.naturalWidth||F.width,c.height=F.naturalHeight||F.height):typeof VideoFrame<"u"&&F instanceof VideoFrame?(c.width=F.displayWidth,c.height=F.displayHeight):(c.width=F.width,c.height=F.height),c}this.allocateTextureUnit=function(){let F=H;return F>=n.maxTextures&&ke("WebGLTextures: Trying to use "+F+" texture units while this GPU supports only "+n.maxTextures),H+=1,F},this.resetTextureUnits=function(){H=0},this.getTextureUnits=function(){return H},this.setTextureUnits=function(F){H=F},this.setTexture2D=K,this.setTexture2DArray=function(F,A){let N=i.get(F);F.isRenderTargetTexture===!1&&F.version>0&&N.__version!==F.version?ue(N,F,A):(F.isExternalTexture&&(N.__webglTexture=F.sourceTexture?F.sourceTexture:null),t.bindTexture(r.TEXTURE_2D_ARRAY,N.__webglTexture,r.TEXTURE0+A))},this.setTexture3D=function(F,A){let N=i.get(F);F.isRenderTargetTexture===!1&&F.version>0&&N.__version!==F.version?ue(N,F,A):t.bindTexture(r.TEXTURE_3D,N.__webglTexture,r.TEXTURE0+A)},this.setTextureCube=function(F,A){let N=i.get(F);F.isCubeDepthTexture!==!0&&F.version>0&&N.__version!==F.version?(function(V,_,z){if(_.image.length!==6)return;let O=v(V,_),I=_.source;t.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture,r.TEXTURE0+z);let j=i.get(I);if(I.version!==j.__version||O===!0){t.activeTexture(r.TEXTURE0+z);let J=rt.getPrimaries(rt.workingColorSpace),re=_.colorSpace===sr?null:rt.getPrimaries(_.colorSpace),me=_.colorSpace===sr||J===re?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let Ie=_.isCompressedTexture||_.image[0].isCompressedTexture,Re=_.image[0]&&_.image[0].isDataTexture,xe=[];for(let De=0;De<6;De++)xe[De]=Ie||Re?Re?_.image[De].image:_.image[De]:S(_.image[De],!0,n.maxCubemapSize),xe[De]=Ue(_,xe[De]);let He=xe[0],de=a.convert(_.format,_.colorSpace),ve=a.convert(_.type),fe=C(_.internalFormat,de,ve,_.normalized,_.colorSpace),Ee=_.isVideoTexture!==!0,ht=j.__version===void 0||O===!0,lt=I.dataReady,wt,kt=w(_,He);if(Z(r.TEXTURE_CUBE_MAP,_),Ie){Ee&&ht&&t.texStorage2D(r.TEXTURE_CUBE_MAP,kt,fe,He.width,He.height);for(let De=0;De<6;De++){wt=xe[De].mipmaps;for(let at=0;at<wt.length;at++){let Ye=wt[at];_.format!==Bi?de!==null?Ee?lt&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+De,at,0,0,Ye.width,Ye.height,de,Ye.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+De,at,fe,Ye.width,Ye.height,0,Ye.data):ke("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ee?lt&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+De,at,0,0,Ye.width,Ye.height,de,ve,Ye.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+De,at,fe,Ye.width,Ye.height,0,de,ve,Ye.data)}}}else{if(wt=_.mipmaps,Ee&&ht){wt.length>0&&kt++;let De=oe(xe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,kt,fe,De.width,De.height)}for(let De=0;De<6;De++)if(Re){Ee?lt&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,0,0,xe[De].width,xe[De].height,de,ve,xe[De].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,fe,xe[De].width,xe[De].height,0,de,ve,xe[De].data);for(let at=0;at<wt.length;at++){let Ye=wt[at].image[De].image;Ee?lt&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+De,at+1,0,0,Ye.width,Ye.height,de,ve,Ye.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+De,at+1,fe,Ye.width,Ye.height,0,de,ve,Ye.data)}}else{Ee?lt&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,0,0,de,ve,xe[De]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,fe,de,ve,xe[De]);for(let at=0;at<wt.length;at++){let Ye=wt[at];Ee?lt&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+De,at+1,0,0,de,ve,Ye.image[De]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+De,at+1,fe,de,ve,Ye.image[De])}}}x(_)&&M(r.TEXTURE_CUBE_MAP),j.__version=I.version,_.onUpdate&&_.onUpdate(_)}V.__version=_.version})(N,F,A):t.bindTexture(r.TEXTURE_CUBE_MAP,N.__webglTexture,r.TEXTURE0+A)},this.rebindTextures=function(F,A,N){let V=i.get(F);A!==void 0&&_e(V.__webglFramebuffer,F,F.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),N!==void 0&&Pe(F)},this.setupRenderTarget=function(F){let A=F.texture,N=i.get(F),V=i.get(A);F.addEventListener("dispose",W);let _=F.textures,z=F.isWebGLCubeRenderTarget===!0,O=_.length>1;if(O||(V.__webglTexture===void 0&&(V.__webglTexture=r.createTexture()),V.__version=A.version,s.memory.textures++),z){N.__webglFramebuffer=[];for(let I=0;I<6;I++)if(A.mipmaps&&A.mipmaps.length>0){N.__webglFramebuffer[I]=[];for(let j=0;j<A.mipmaps.length;j++)N.__webglFramebuffer[I][j]=r.createFramebuffer()}else N.__webglFramebuffer[I]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){N.__webglFramebuffer=[];for(let I=0;I<A.mipmaps.length;I++)N.__webglFramebuffer[I]=r.createFramebuffer()}else N.__webglFramebuffer=r.createFramebuffer();if(O)for(let I=0,j=_.length;I<j;I++){let J=i.get(_[I]);J.__webglTexture===void 0&&(J.__webglTexture=r.createTexture(),s.memory.textures++)}if(F.samples>0&&Te(F)===!1){N.__webglMultisampledFramebuffer=r.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let I=0;I<_.length;I++){let j=_[I];N.__webglColorRenderbuffer[I]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,N.__webglColorRenderbuffer[I]);let J=a.convert(j.format,j.colorSpace),re=a.convert(j.type),me=C(j.internalFormat,J,re,j.normalized,j.colorSpace,F.isXRRenderTarget===!0),Ie=ye(F);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ie,me,F.width,F.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+I,r.RENDERBUFFER,N.__webglColorRenderbuffer[I])}r.bindRenderbuffer(r.RENDERBUFFER,null),F.depthBuffer&&(N.__webglDepthRenderbuffer=r.createRenderbuffer(),Ne(N.__webglDepthRenderbuffer,F,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(z){t.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture),Z(r.TEXTURE_CUBE_MAP,A);for(let I=0;I<6;I++)if(A.mipmaps&&A.mipmaps.length>0)for(let j=0;j<A.mipmaps.length;j++)_e(N.__webglFramebuffer[I][j],F,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+I,j);else _e(N.__webglFramebuffer[I],F,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+I,0);x(A)&&M(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(O){for(let I=0,j=_.length;I<j;I++){let J=_[I],re=i.get(J),me=r.TEXTURE_2D;(F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(me=F.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(me,re.__webglTexture),Z(me,J),_e(N.__webglFramebuffer,F,J,r.COLOR_ATTACHMENT0+I,me,0),x(J)&&M(me)}t.unbindTexture()}else{let I=r.TEXTURE_2D;if((F.isWebGL3DRenderTarget||F.isWebGLArrayRenderTarget)&&(I=F.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(I,V.__webglTexture),Z(I,A),A.mipmaps&&A.mipmaps.length>0)for(let j=0;j<A.mipmaps.length;j++)_e(N.__webglFramebuffer[j],F,A,r.COLOR_ATTACHMENT0,I,j);else _e(N.__webglFramebuffer,F,A,r.COLOR_ATTACHMENT0,I,0);x(A)&&M(I),t.unbindTexture()}F.depthBuffer&&Pe(F)},this.updateRenderTargetMipmap=function(F){let A=F.textures;for(let N=0,V=A.length;N<V;N++){let _=A[N];if(x(_)){let z=E(F),O=i.get(_).__webglTexture;t.bindTexture(z,O),M(z),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(F){if(F.samples>0){if(Te(F)===!1){let A=F.textures,N=F.width,V=F.height,_=r.COLOR_BUFFER_BIT,z=F.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,O=i.get(F),I=A.length>1;if(I)for(let J=0;J<A.length;J++)t.bindFramebuffer(r.FRAMEBUFFER,O.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+J,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,O.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+J,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,O.__webglMultisampledFramebuffer);let j=F.texture.mipmaps;j&&j.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,O.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,O.__webglFramebuffer);for(let J=0;J<A.length;J++){if(F.resolveDepthBuffer&&(F.depthBuffer&&(_|=r.DEPTH_BUFFER_BIT),F.stencilBuffer&&F.resolveStencilBuffer&&(_|=r.STENCIL_BUFFER_BIT)),I){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,O.__webglColorRenderbuffer[J]);let re=i.get(A[J]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,re,0)}r.blitFramebuffer(0,0,N,V,0,0,N,V,_,r.NEAREST),u===!0&&(he.length=0,Me.length=0,he.push(r.COLOR_ATTACHMENT0+J),F.depthBuffer&&F.resolveDepthBuffer===!1&&(he.push(z),Me.push(z),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Me)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,he))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),I)for(let J=0;J<A.length;J++){t.bindFramebuffer(r.FRAMEBUFFER,O.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+J,r.RENDERBUFFER,O.__webglColorRenderbuffer[J]);let re=i.get(A[J]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,O.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+J,r.TEXTURE_2D,re,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,O.__webglMultisampledFramebuffer)}else if(F.depthBuffer&&F.resolveDepthBuffer===!1&&u){let A=F.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}},this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=Te,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function fg(r,e){return{convert:function(t,i=sr){let n,a=rt.getTransfer(i);if(t===_i)return r.UNSIGNED_BYTE;if(t===ko)return r.UNSIGNED_SHORT_4_4_4_4;if(t===zo)return r.UNSIGNED_SHORT_5_5_5_1;if(t===Tc)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===Ec)return r.UNSIGNED_INT_10F_11F_11F_REV;if(t===Mc)return r.BYTE;if(t===Sc)return r.SHORT;if(t===Xr)return r.UNSIGNED_SHORT;if(t===Bo)return r.INT;if(t===mn)return r.UNSIGNED_INT;if(t===Oi)return r.FLOAT;if(t===Xi)return r.HALF_FLOAT;if(t===th)return r.ALPHA;if(t===ih)return r.RGB;if(t===Bi)return r.RGBA;if(t===Bn)return r.DEPTH_COMPONENT;if(t===rr)return r.DEPTH_STENCIL;if(t===wc)return r.RED;if(t===Go)return r.RED_INTEGER;if(t===ar)return r.RG;if(t===Ac)return r.RG_INTEGER;if(t===Cc)return r.RGBA_INTEGER;if(t===Ho||t===Vo||t===Wo||t===$o)if(a===dt){if(n=e.get("WEBGL_compressed_texture_s3tc_srgb"),n===null)return null;if(t===Ho)return n.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Vo)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Wo)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===$o)return n.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(n=e.get("WEBGL_compressed_texture_s3tc"),n===null)return null;if(t===Ho)return n.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Vo)return n.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Wo)return n.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===$o)return n.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Rc||t===Pc||t===Ic||t===Lc){if(n=e.get("WEBGL_compressed_texture_pvrtc"),n===null)return null;if(t===Rc)return n.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Pc)return n.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Ic)return n.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Lc)return n.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===Dc||t===Nc||t===Uc||t===Fc||t===Oc||t===qo||t===Bc){if(n=e.get("WEBGL_compressed_texture_etc"),n===null)return null;if(t===Dc||t===Nc)return a===dt?n.COMPRESSED_SRGB8_ETC2:n.COMPRESSED_RGB8_ETC2;if(t===Uc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:n.COMPRESSED_RGBA8_ETC2_EAC;if(t===Fc)return n.COMPRESSED_R11_EAC;if(t===Oc)return n.COMPRESSED_SIGNED_R11_EAC;if(t===qo)return n.COMPRESSED_RG11_EAC;if(t===Bc)return n.COMPRESSED_SIGNED_RG11_EAC}if(t===kc||t===zc||t===Gc||t===Hc||t===Vc||t===Wc||t===$c||t===qc||t===Xc||t===jc||t===Yc||t===Zc||t===Jc||t===Kc){if(n=e.get("WEBGL_compressed_texture_astc"),n===null)return null;if(t===kc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:n.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===zc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:n.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Gc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:n.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Hc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:n.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Vc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:n.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Wc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:n.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===$c)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:n.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===qc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:n.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Xc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:n.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===jc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:n.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===Yc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:n.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Zc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:n.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Jc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:n.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Kc)return a===dt?n.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:n.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Qc||t===eu||t===tu){if(n=e.get("EXT_texture_compression_bptc"),n===null)return null;if(t===Qc)return a===dt?n.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:n.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===eu)return n.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===tu)return n.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===iu||t===nu||t===Xo||t===ru){if(n=e.get("EXT_texture_compression_rgtc"),n===null)return null;if(t===iu)return n.COMPRESSED_RED_RGTC1_EXT;if(t===nu)return n.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Xo)return n.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===ru)return n.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===jr?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}var Eu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Ca(e.texture);e.depthNear===t.depthNear&&e.depthFar===t.depthFar||(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new ni({vertexShader:`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fragmentShader:`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $t(new Or(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},wu=class extends $i{constructor(e,t){super();let i=this,n=null,a=1,s=null,o="local-floor",u=1,c=null,d=null,g=null,f=null,p=null,b=null,y=typeof XRWebGLBinding<"u",S=new Eu,x={},M=t.getContextAttributes(),E=null,C=null,L=[],w=[],k=new pe,W=null,G=new ci;G.viewport=new pt;let H=new ci;H.viewport=new pt;let K=[G,H],q=new Do,se=null,ee=null;function Z(he){let Me=w.indexOf(he.inputSource);if(Me===-1)return;let ye=L[Me];ye!==void 0&&(ye.update(he.inputSource,he.frame,c||s),ye.dispatchEvent({type:he.type,data:he.inputSource}))}function v(){n.removeEventListener("select",Z),n.removeEventListener("selectstart",Z),n.removeEventListener("selectend",Z),n.removeEventListener("squeeze",Z),n.removeEventListener("squeezestart",Z),n.removeEventListener("squeezeend",Z),n.removeEventListener("end",v),n.removeEventListener("inputsourceschange",$);for(let he=0;he<L.length;he++){let Me=w[he];Me!==null&&(w[he]=null,L[he].disconnect(Me))}se=null,ee=null,S.reset();for(let he in x)delete x[he];e.setRenderTarget(E),p=null,f=null,g=null,n=null,C=null,Pe.stop(),i.isPresenting=!1,e.setPixelRatio(W),e.setSize(k.width,k.height,!1),i.dispatchEvent({type:"sessionend"})}function $(he){for(let Me=0;Me<he.removed.length;Me++){let ye=he.removed[Me],Te=w.indexOf(ye);Te>=0&&(w[Te]=null,L[Te].disconnect(ye))}for(let Me=0;Me<he.added.length;Me++){let ye=he.added[Me],Te=w.indexOf(ye);if(Te===-1){for(let oe=0;oe<L.length;oe++){if(oe>=w.length){w.push(ye),Te=oe;break}if(w[oe]===null){w[oe]=ye,Te=oe;break}}if(Te===-1)break}let Ue=L[Te];Ue&&Ue.connect(ye)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(he){let Me=L[he];return Me===void 0&&(Me=new Dr,L[he]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(he){let Me=L[he];return Me===void 0&&(Me=new Dr,L[he]=Me),Me.getGripSpace()},this.getHand=function(he){let Me=L[he];return Me===void 0&&(Me=new Dr,L[he]=Me),Me.getHandSpace()},this.setFramebufferScaleFactor=function(he){a=he,i.isPresenting===!0&&ke("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(he){o=he,i.isPresenting===!0&&ke("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(he){c=he},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return g===null&&y&&(g=new XRWebGLBinding(n,t)),g},this.getFrame=function(){return b},this.getSession=function(){return n},this.setSession=async function(he){if(n=he,n!==null){if(E=e.getRenderTarget(),n.addEventListener("select",Z),n.addEventListener("selectstart",Z),n.addEventListener("selectend",Z),n.addEventListener("squeeze",Z),n.addEventListener("squeezestart",Z),n.addEventListener("squeezeend",Z),n.addEventListener("end",v),n.addEventListener("inputsourceschange",$),M.xrCompatible!==!0&&await t.makeXRCompatible(),W=e.getPixelRatio(),e.getSize(k),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,ye=null,Te=null;M.depth&&(Te=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=M.stencil?rr:Bn,ye=M.stencil?jr:mn);let Ue={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:a};g=this.getBinding(),f=g.createProjectionLayer(Ue),n.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),C=new vi(f.textureWidth,f.textureHeight,{format:Bi,type:_i,depthTexture:new pn(f.textureWidth,f.textureHeight,ye,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let Me={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(n,t,Me),n.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),C=new vi(p.framebufferWidth,p.framebufferHeight,{format:Bi,type:_i,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(u),c=null,s=await n.requestReferenceSpace(o),Pe.setContext(n),Pe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};let ue=new U,_e=new U;function Ne(he,Me){Me===null?he.matrixWorld.copy(he.matrix):he.matrixWorld.multiplyMatrices(Me.matrixWorld,he.matrix),he.matrixWorldInverse.copy(he.matrixWorld).invert()}this.updateCamera=function(he){if(n===null)return;let Me=he.near,ye=he.far;S.texture!==null&&(S.depthNear>0&&(Me=S.depthNear),S.depthFar>0&&(ye=S.depthFar)),q.near=H.near=G.near=Me,q.far=H.far=G.far=ye,se===q.near&&ee===q.far||(n.updateRenderState({depthNear:q.near,depthFar:q.far}),se=q.near,ee=q.far),q.layers.mask=6|he.layers.mask,G.layers.mask=-5&q.layers.mask,H.layers.mask=-3&q.layers.mask;let Te=he.parent,Ue=q.cameras;Ne(q,Te);for(let oe=0;oe<Ue.length;oe++)Ne(Ue[oe],Te);Ue.length===2?(function(oe,F,A){ue.setFromMatrixPosition(F.matrixWorld),_e.setFromMatrixPosition(A.matrixWorld);let N=ue.distanceTo(_e),V=F.projectionMatrix.elements,_=A.projectionMatrix.elements,z=V[14]/(V[10]-1),O=V[14]/(V[10]+1),I=(V[9]+1)/V[5],j=(V[9]-1)/V[5],J=(V[8]-1)/V[0],re=(_[8]+1)/_[0],me=z*J,Ie=z*re,Re=N/(-J+re),xe=Re*-J;if(F.matrixWorld.decompose(oe.position,oe.quaternion,oe.scale),oe.translateX(xe),oe.translateZ(Re),oe.matrixWorld.compose(oe.position,oe.quaternion,oe.scale),oe.matrixWorldInverse.copy(oe.matrixWorld).invert(),V[10]===-1)oe.projectionMatrix.copy(F.projectionMatrix),oe.projectionMatrixInverse.copy(F.projectionMatrixInverse);else{let He=z+Re,de=O+Re,ve=me-xe,fe=Ie+(N-xe),Ee=I*O/de*He,ht=j*O/de*He;oe.projectionMatrix.makePerspective(ve,fe,Ee,ht,He,de),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert()}})(q,G,H):q.projectionMatrix.copy(G.projectionMatrix),(function(oe,F,A){A===null?oe.matrix.copy(F.matrixWorld):(oe.matrix.copy(A.matrixWorld),oe.matrix.invert(),oe.matrix.multiply(F.matrixWorld)),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.updateMatrixWorld(!0),oe.projectionMatrix.copy(F.projectionMatrix),oe.projectionMatrixInverse.copy(F.projectionMatrixInverse),oe.isPerspectiveCamera&&(oe.fov=2*Ws*Math.atan(1/oe.projectionMatrix.elements[5]),oe.zoom=1)})(he,q,Te)},this.getCamera=function(){return q},this.getFoveation=function(){if(f!==null||p!==null)return u},this.setFoveation=function(he){u=he,f!==null&&(f.fixedFoveation=he),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=he)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(q)},this.getCameraTexture=function(he){return x[he]};let Ae=null,Pe=new Hh;Pe.setAnimationLoop(function(he,Me){if(d=Me.getViewerPose(c||s),b=Me,d!==null){let ye=d.views;p!==null&&(e.setRenderTargetFramebuffer(C,p.framebuffer),e.setRenderTarget(C));let Te=!1;ye.length!==q.cameras.length&&(q.cameras.length=0,Te=!0);for(let oe=0;oe<ye.length;oe++){let F=ye[oe],A=null;if(p!==null)A=p.getViewport(F);else{let V=g.getViewSubImage(f,F);A=V.viewport,oe===0&&(e.setRenderTargetTextures(C,V.colorTexture,V.depthStencilTexture),e.setRenderTarget(C))}let N=K[oe];N===void 0&&(N=new ci,N.layers.enable(oe),N.viewport=new pt,K[oe]=N),N.matrix.fromArray(F.transform.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale),N.projectionMatrix.fromArray(F.projectionMatrix),N.projectionMatrixInverse.copy(N.projectionMatrix).invert(),N.viewport.set(A.x,A.y,A.width,A.height),oe===0&&(q.matrix.copy(N.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),Te===!0&&q.cameras.push(N)}let Ue=n.enabledFeatures;if(Ue&&Ue.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&y){g=i.getBinding();let oe=g.getDepthInformation(ye[0]);oe&&oe.isValid&&oe.texture&&S.init(oe,n.renderState)}if(Ue&&Ue.includes("camera-access")&&y){e.state.unbindTexture(),g=i.getBinding();for(let oe=0;oe<ye.length;oe++){let F=ye[oe].camera;if(F){let A=x[F];A||(A=new Ca,x[F]=A);let N=g.getCameraImage(F);A.sourceTexture=N}}}}for(let ye=0;ye<L.length;ye++){let Te=w[ye],Ue=L[ye];Te!==null&&Ue!==void 0&&Ue.update(Te,Me,c||s)}Ae&&Ae(he,Me),Me.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Me}),b=null}),this.setAnimationLoop=function(he){Ae=he},this.dispose=function(){}}},gg=new Je,jh=new Xe;function vg(r,e){function t(n,a){n.matrixAutoUpdate===!0&&n.updateMatrix(),a.value.copy(n.matrix)}function i(n,a){n.opacity.value=a.opacity,a.color&&n.diffuse.value.copy(a.color),a.emissive&&n.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity),a.map&&(n.map.value=a.map,t(a.map,n.mapTransform)),a.alphaMap&&(n.alphaMap.value=a.alphaMap,t(a.alphaMap,n.alphaMapTransform)),a.bumpMap&&(n.bumpMap.value=a.bumpMap,t(a.bumpMap,n.bumpMapTransform),n.bumpScale.value=a.bumpScale,a.side===Qt&&(n.bumpScale.value*=-1)),a.normalMap&&(n.normalMap.value=a.normalMap,t(a.normalMap,n.normalMapTransform),n.normalScale.value.copy(a.normalScale),a.side===Qt&&n.normalScale.value.negate()),a.displacementMap&&(n.displacementMap.value=a.displacementMap,t(a.displacementMap,n.displacementMapTransform),n.displacementScale.value=a.displacementScale,n.displacementBias.value=a.displacementBias),a.emissiveMap&&(n.emissiveMap.value=a.emissiveMap,t(a.emissiveMap,n.emissiveMapTransform)),a.specularMap&&(n.specularMap.value=a.specularMap,t(a.specularMap,n.specularMapTransform)),a.alphaTest>0&&(n.alphaTest.value=a.alphaTest);let s=e.get(a),o=s.envMap,u=s.envMapRotation;o&&(n.envMap.value=o,n.envMapRotation.value.setFromMatrix4(gg.makeRotationFromEuler(u)).transpose(),o.isCubeTexture&&o.isRenderTargetTexture===!1&&n.envMapRotation.value.premultiply(jh),n.reflectivity.value=a.reflectivity,n.ior.value=a.ior,n.refractionRatio.value=a.refractionRatio),a.lightMap&&(n.lightMap.value=a.lightMap,n.lightMapIntensity.value=a.lightMapIntensity,t(a.lightMap,n.lightMapTransform)),a.aoMap&&(n.aoMap.value=a.aoMap,n.aoMapIntensity.value=a.aoMapIntensity,t(a.aoMap,n.aoMapTransform))}return{refreshFogUniforms:function(n,a){a.color.getRGB(n.fogColor.value,cu(r)),a.isFog?(n.fogNear.value=a.near,n.fogFar.value=a.far):a.isFogExp2&&(n.fogDensity.value=a.density)},refreshMaterialUniforms:function(n,a,s,o,u){a.isNodeMaterial?a.uniformsNeedUpdate=!1:a.isMeshBasicMaterial?i(n,a):a.isMeshLambertMaterial?(i(n,a),a.envMap&&(n.envMapIntensity.value=a.envMapIntensity)):a.isMeshToonMaterial?(i(n,a),(function(c,d){d.gradientMap&&(c.gradientMap.value=d.gradientMap)})(n,a)):a.isMeshPhongMaterial?(i(n,a),(function(c,d){c.specular.value.copy(d.specular),c.shininess.value=Math.max(d.shininess,1e-4)})(n,a),a.envMap&&(n.envMapIntensity.value=a.envMapIntensity)):a.isMeshStandardMaterial?(i(n,a),(function(c,d){c.metalness.value=d.metalness,d.metalnessMap&&(c.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,c.metalnessMapTransform)),c.roughness.value=d.roughness,d.roughnessMap&&(c.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,c.roughnessMapTransform)),d.envMap&&(c.envMapIntensity.value=d.envMapIntensity)})(n,a),a.isMeshPhysicalMaterial&&(function(c,d,g){c.ior.value=d.ior,d.sheen>0&&(c.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),c.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(c.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,c.sheenColorMapTransform)),d.sheenRoughnessMap&&(c.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,c.sheenRoughnessMapTransform))),d.clearcoat>0&&(c.clearcoat.value=d.clearcoat,c.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(c.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,c.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(c.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Qt&&c.clearcoatNormalScale.value.negate())),d.dispersion>0&&(c.dispersion.value=d.dispersion),d.iridescence>0&&(c.iridescence.value=d.iridescence,c.iridescenceIOR.value=d.iridescenceIOR,c.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(c.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,c.iridescenceMapTransform)),d.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),d.transmission>0&&(c.transmission.value=d.transmission,c.transmissionSamplerMap.value=g.texture,c.transmissionSamplerSize.value.set(g.width,g.height),d.transmissionMap&&(c.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,c.transmissionMapTransform)),c.thickness.value=d.thickness,d.thicknessMap&&(c.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=d.attenuationDistance,c.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(c.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(c.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=d.specularIntensity,c.specularColor.value.copy(d.specularColor),d.specularColorMap&&(c.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,c.specularColorMapTransform)),d.specularIntensityMap&&(c.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,c.specularIntensityMapTransform))})(n,a,u)):a.isMeshMatcapMaterial?(i(n,a),(function(c,d){d.matcap&&(c.matcap.value=d.matcap)})(n,a)):a.isMeshDepthMaterial?i(n,a):a.isMeshDistanceMaterial?(i(n,a),(function(c,d){let g=e.get(d).light;c.referencePosition.value.setFromMatrixPosition(g.matrixWorld),c.nearDistance.value=g.shadow.camera.near,c.farDistance.value=g.shadow.camera.far})(n,a)):a.isMeshNormalMaterial?i(n,a):a.isLineBasicMaterial?((function(c,d){c.diffuse.value.copy(d.color),c.opacity.value=d.opacity,d.map&&(c.map.value=d.map,t(d.map,c.mapTransform))})(n,a),a.isLineDashedMaterial&&(function(c,d){c.dashSize.value=d.dashSize,c.totalSize.value=d.dashSize+d.gapSize,c.scale.value=d.scale})(n,a)):a.isPointsMaterial?(function(c,d,g,f){c.diffuse.value.copy(d.color),c.opacity.value=d.opacity,c.size.value=d.size*g,c.scale.value=.5*f,d.map&&(c.map.value=d.map,t(d.map,c.uvTransform)),d.alphaMap&&(c.alphaMap.value=d.alphaMap,t(d.alphaMap,c.alphaMapTransform)),d.alphaTest>0&&(c.alphaTest.value=d.alphaTest)})(n,a,s,o):a.isSpriteMaterial?(function(c,d){c.diffuse.value.copy(d.color),c.opacity.value=d.opacity,c.rotation.value=d.rotation,d.map&&(c.map.value=d.map,t(d.map,c.mapTransform)),d.alphaMap&&(c.alphaMap.value=d.alphaMap,t(d.alphaMap,c.alphaMapTransform)),d.alphaTest>0&&(c.alphaTest.value=d.alphaTest)})(n,a):a.isShadowMaterial?(n.color.value.copy(a.color),n.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}}}function yg(r,e,t,i){let n={},a={},s=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function u(f,p,b,y){if((function(S,x,M,E){let C=S.value,L=x+"_"+M;if(E[L]===void 0)return typeof C=="number"||typeof C=="boolean"?E[L]=C:ArrayBuffer.isView(C)?E[L]=C.slice():E[L]=C.clone(),!0;{let w=E[L];if(typeof C=="number"||typeof C=="boolean"){if(w!==C)return E[L]=C,!0}else{if(ArrayBuffer.isView(C))return!0;if(w.equals(C)===!1)return w.copy(C),!0}}return!1})(f,p,b,y)===!0){let S=f.__offset,x=f.value;if(Array.isArray(x)){let M=0;for(let E=0;E<x.length;E++){let C=x[E],L=d(C);c(C,f.__data,M),typeof C=="number"||typeof C=="boolean"||C.isMatrix3||ArrayBuffer.isView(C)||(M+=L.storage/Float32Array.BYTES_PER_ELEMENT)}}else c(x,f.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,S,f.__data)}}function c(f,p,b){typeof f=="number"||typeof f=="boolean"?p[0]=f:f.isMatrix3?(p[0]=f.elements[0],p[1]=f.elements[1],p[2]=f.elements[2],p[3]=0,p[4]=f.elements[3],p[5]=f.elements[4],p[6]=f.elements[5],p[7]=0,p[8]=f.elements[6],p[9]=f.elements[7],p[10]=f.elements[8],p[11]=0):ArrayBuffer.isView(f)?p.set(new f.constructor(f.buffer,f.byteOffset,p.length)):f.toArray(p,b)}function d(f){let p={boundary:0,storage:0};return typeof f=="number"||typeof f=="boolean"?(p.boundary=4,p.storage=4):f.isVector2?(p.boundary=8,p.storage=8):f.isVector3||f.isColor?(p.boundary=16,p.storage=12):f.isVector4?(p.boundary=16,p.storage=16):f.isMatrix3?(p.boundary=48,p.storage=48):f.isMatrix4?(p.boundary=64,p.storage=64):f.isTexture?ke("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(f)?(p.boundary=16,p.storage=f.byteLength):ke("WebGLRenderer: Unsupported uniform value type.",f),p}function g(f){let p=f.target;p.removeEventListener("dispose",g);let b=s.indexOf(p.__bindingPointIndex);s.splice(b,1),r.deleteBuffer(n[p.id]),delete n[p.id],delete a[p.id]}return{bind:function(f,p){let b=p.program;i.uniformBlockBinding(f,b)},update:function(f,p){let b=n[f.id];b===void 0&&((function(x){let M=x.uniforms,E=0,C=16;for(let w=0,k=M.length;w<k;w++){let W=Array.isArray(M[w])?M[w]:[M[w]];for(let G=0,H=W.length;G<H;G++){let K=W[G],q=Array.isArray(K.value)?K.value:[K.value];for(let se=0,ee=q.length;se<ee;se++){let Z=d(q[se]),v=E%C,$=v%Z.boundary,ue=v+$;E+=$,ue!==0&&C-ue<Z.storage&&(E+=C-ue),K.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),K.__offset=E,E+=Z.storage}}}let L=E%C;L>0&&(E+=C-L),x.__size=E,x.__cache={}})(f),b=(function(x){let M=(function(){for(let w=0;w<o;w++)if(s.indexOf(w)===-1)return s.push(w),w;return Ge("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0})();x.__bindingPointIndex=M;let E=r.createBuffer(),C=x.__size,L=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,E),r.bufferData(r.UNIFORM_BUFFER,C,L),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,E),E})(f),n[f.id]=b,f.addEventListener("dispose",g));let y=p.program;i.updateUBOMapping(f,y);let S=e.render.frame;a[f.id]!==S&&((function(x){let M=n[x.id],E=x.uniforms,C=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let L=0,w=E.length;L<w;L++){let k=E[L];if(Array.isArray(k))for(let W=0,G=k.length;W<G;W++)u(k[W],L,W,C);else u(k,L,0,C)}r.bindBuffer(r.UNIFORM_BUFFER,null)})(f),a[f.id]=S)},dispose:function(){for(let f in n)r.deleteBuffer(n[f]);s=[],n={},a={}}}}jh.set(-1,0,0,0,1,0,0,0,1);var _g=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ji=null,tl=class{constructor(e={}){let{canvas:t=uh(),context:i=null,depth:n=!0,stencil:a=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:g=!1,reversedDepthBuffer:f=!1,outputBufferType:p=_i}=e,b;if(this.isWebGLRenderer=!0,i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");b=i.getContextAttributes().alpha}else b=s;let y=p,S=new Set([Cc,Ac,Go]),x=new Set([_i,mn,Xr,jr,ko,zo]),M=new Uint32Array(4),E=new Int32Array(4),C=new U,L=null,w=null,k=[],W=[],G=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Fi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let H=this,K=!1,q=null,se=null,ee=null,Z=null;this._outputColorSpace=jt;let v=0,$=0,ue=null,_e=-1,Ne=null,Ae=new pt,Pe=new pt,he=null,Me=new $e(0),ye=0,Te=t.width,Ue=t.height,oe=1,F=null,A=null,N=new pt(0,0,Te,Ue),V=new pt(0,0,Te,Ue),_=!1,z=new hn,O=!1,I=!1,j=new Je,J=new U,re=new pt,me={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ie=!1;function Re(){return ue===null?oe:1}let xe,He,de,ve,fe,Ee,ht,lt,wt,kt,De,at,Ye,Ut,ut,Et,xt,qt,mt,ui,di,ot,Xt,X=i;function es(R,Y){return t.getContext(R,Y)}try{let R={alpha:!0,depth:n,stencil:a,antialias:o,premultipliedAlpha:u,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:g};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"185"}`),t.addEventListener("webglcontextlost",ea,!1),t.addEventListener("webglcontextrestored",kn,!1),t.addEventListener("webglcontextcreationerror",ki,!1),X===null){let Y="webgl2";if(X=es(Y,R),X===null)throw es(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(R){throw Ge("WebGLRenderer: "+R.message),R}function Qr(){xe=new $m(X),xe.init(),di=new fg(X,xe),He=new Gm(X,xe,e,di),de=new pg(X,xe),He.reversedDepthBuffer&&f&&de.buffers.depth.setReversed(!0),se=X.createFramebuffer(),ee=X.createFramebuffer(),Z=X.createFramebuffer(),ve=new jm(X),fe=new ig,Ee=new mg(X,xe,de,fe,He,di,ve),ht=new Wm(H),lt=new Fm(X),ot=new km(X,lt),wt=new qm(X,lt,ve,ot),kt=new Zm(X,wt,lt,ot,ve),qt=new Ym(X,He,Ee),ut=new Hm(fe),De=new tg(H,ht,xe,He,ot,ut),at=new vg(H,fe),Ye=new rg,Ut=new cg(xe),xt=new Bm(H,ht,de,kt,b,u),Et=new hg(H,kt,He),Xt=new yg(X,ve,He,de),mt=new zm(X,xe,ve),ui=new Xm(X,xe,ve),ve.programs=De.programs,H.capabilities=He,H.extensions=xe,H.properties=fe,H.renderLists=Ye,H.shadowMap=Et,H.state=de,H.info=ve}Qr(),y!==_i&&(G=new Km(y,t.width,t.height,o,n,a));let At=new wu(H,X);function ea(R){R.preventDefault(),ou("WebGLRenderer: Context Lost."),K=!0}function kn(){ou("WebGLRenderer: Context Restored."),K=!1;let R=ve.autoReset,Y=Et.enabled,ie=Et.autoUpdate,ce=Et.needsUpdate,ae=Et.type;Qr(),ve.autoReset=R,Et.enabled=Y,Et.autoUpdate=ie,Et.needsUpdate=ce,Et.type=ae}function ki(R){Ge("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function zi(R){let Y=R.target;Y.removeEventListener("dispose",zi),(function(ie){(function(ce){let ae=fe.get(ce).programs;ae!==void 0&&(ae.forEach(function(ge){De.releaseProgram(ge)}),ce.isShaderMaterial&&De.releaseShaderCache(ce))})(ie),fe.remove(ie)})(Y)}function lr(R,Y,ie){R.transparent===!0&&R.side===Ri&&R.forceSinglePass===!1?(R.side=Qt,R.needsUpdate=!0,Gn(R,Y,ie),R.side=Wr,R.needsUpdate=!0,Gn(R,Y,ie),R.side=Ri):Gn(R,Y,ie)}this.xr=At,this.getContext=function(){return X},this.getContextAttributes=function(){return X.getContextAttributes()},this.forceContextLoss=function(){let R=xe.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){let R=xe.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(R){R!==void 0&&(oe=R,this.setSize(Te,Ue,!1))},this.getSize=function(R){return R.set(Te,Ue)},this.setSize=function(R,Y,ie=!0){At.isPresenting?ke("WebGLRenderer: Can't change size while VR device is presenting."):(Te=R,Ue=Y,t.width=Math.floor(R*oe),t.height=Math.floor(Y*oe),ie===!0&&(t.style.width=R+"px",t.style.height=Y+"px"),G!==null&&G.setSize(t.width,t.height),this.setViewport(0,0,R,Y))},this.getDrawingBufferSize=function(R){return R.set(Te*oe,Ue*oe).floor()},this.setDrawingBufferSize=function(R,Y,ie){Te=R,Ue=Y,oe=ie,t.width=Math.floor(R*ie),t.height=Math.floor(Y*ie),this.setViewport(0,0,R,Y)},this.setEffects=function(R){if(y!==_i){if(R){for(let Y=0;Y<R.length;Y++)if(R[Y].isOutputPass===!0){ke("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}G.setEffects(R||[])}else Ge("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.")},this.getCurrentViewport=function(R){return R.copy(Ae)},this.getViewport=function(R){return R.copy(N)},this.setViewport=function(R,Y,ie,ce){R.isVector4?N.set(R.x,R.y,R.z,R.w):N.set(R,Y,ie,ce),de.viewport(Ae.copy(N).multiplyScalar(oe).round())},this.getScissor=function(R){return R.copy(V)},this.setScissor=function(R,Y,ie,ce){R.isVector4?V.set(R.x,R.y,R.z,R.w):V.set(R,Y,ie,ce),de.scissor(Pe.copy(V).multiplyScalar(oe).round())},this.getScissorTest=function(){return _},this.setScissorTest=function(R){de.setScissorTest(_=R)},this.setOpaqueSort=function(R){F=R},this.setTransparentSort=function(R){A=R},this.getClearColor=function(R){return R.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor(...arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha(...arguments)},this.clear=function(R=!0,Y=!0,ie=!0){let ce=0;if(R){let ae=!1;if(ue!==null){let ge=ue.texture.format;ae=S.has(ge)}if(ae){let ge=ue.texture.type,be=x.has(ge),Ce=xt.getClearColor(),we=xt.getClearAlpha(),ze=Ce.r,Qe=Ce.g,nt=Ce.b;be?(M[0]=ze,M[1]=Qe,M[2]=nt,M[3]=we,X.clearBufferuiv(X.COLOR,0,M)):(E[0]=ze,E[1]=Qe,E[2]=nt,E[3]=we,X.clearBufferiv(X.COLOR,0,E))}else ce|=X.COLOR_BUFFER_BIT}Y&&(ce|=X.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ie&&(ce|=X.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ce!==0&&X.clear(ce)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),q=R},this.dispose=function(){t.removeEventListener("webglcontextlost",ea,!1),t.removeEventListener("webglcontextrestored",kn,!1),t.removeEventListener("webglcontextcreationerror",ki,!1),xt.dispose(),Ye.dispose(),Ut.dispose(),fe.dispose(),ht.dispose(),kt.dispose(),ot.dispose(),Xt.dispose(),De.dispose(),At.dispose(),At.removeEventListener("sessionstart",gn),At.removeEventListener("sessionend",cr),xi.stop()},this.renderBufferDirect=function(R,Y,ie,ce,ae,ge){Y===null&&(Y=me);let be=ae.isMesh&&ae.matrixWorld.determinantAffine()<0,Ce=(function(Ze,Mt,Ft,We,Oe){Mt.isScene!==!0&&(Mt=me),Ee.resetTextureUnits();let bi=Mt.fog,ns=We.isMeshStandardMaterial||We.isMeshLambertMaterial||We.isMeshPhongMaterial?Mt.environment:null,Hn=ue===null?H.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:rt.workingColorSpace,Vn=We.isMeshStandardMaterial||We.isMeshLambertMaterial&&!We.envMap||We.isMeshPhongMaterial&&!We.envMap,Mi=ht.get(We.envMap||ns,Vn),vn=We.vertexColors===!0&&!!Ft.attributes.color&&Ft.attributes.color.itemSize===4,ri=!!Ft.attributes.tangent&&(!!We.normalMap||We.anisotropy>0),It=!!Ft.morphAttributes.position,qe=!!Ft.morphAttributes.normal,st=!!Ft.morphAttributes.color,ai=Fi;We.toneMapped&&(ue!==null&&ue.isXRRenderTarget!==!0||(ai=H.toneMapping));let ra=Ft.morphAttributes.position||Ft.morphAttributes.normal||Ft.morphAttributes.color,Au=ra!==void 0?ra.length:0,Fe=fe.get(We),si=w.state.lights;if(O===!0&&(I===!0||Ze!==Ne)){let Dt=Ze===Ne&&We.id===_e;ut.setState(We,Ze,Dt)}let Lt=!1;We.version===Fe.__version?Fe.needsLights&&Fe.lightsStateVersion!==si.state.version||Fe.outputColorSpace!==Hn||Oe.isBatchedMesh&&Fe.batching===!1?Lt=!0:Oe.isBatchedMesh||Fe.batching!==!0?Oe.isBatchedMesh&&Fe.batchingColor===!0&&Oe.colorTexture===null||Oe.isBatchedMesh&&Fe.batchingColor===!1&&Oe.colorTexture!==null||Oe.isInstancedMesh&&Fe.instancing===!1?Lt=!0:Oe.isInstancedMesh||Fe.instancing!==!0?Oe.isSkinnedMesh&&Fe.skinning===!1?Lt=!0:Oe.isSkinnedMesh||Fe.skinning!==!0?Oe.isInstancedMesh&&Fe.instancingColor===!0&&Oe.instanceColor===null||Oe.isInstancedMesh&&Fe.instancingColor===!1&&Oe.instanceColor!==null||Oe.isInstancedMesh&&Fe.instancingMorph===!0&&Oe.morphTexture===null||Oe.isInstancedMesh&&Fe.instancingMorph===!1&&Oe.morphTexture!==null||Fe.envMap!==Mi||We.fog===!0&&Fe.fog!==bi?Lt=!0:Fe.numClippingPlanes===void 0||Fe.numClippingPlanes===ut.numPlanes&&Fe.numIntersection===ut.numIntersection?(Fe.vertexAlphas!==vn||Fe.vertexTangents!==ri||Fe.morphTargets!==It||Fe.morphNormals!==qe||Fe.morphColors!==st||Fe.toneMapping!==ai||Fe.morphTargetsCount!==Au||!!Fe.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Lt=!0):Lt=!0:Lt=!0:Lt=!0:Lt=!0:(Lt=!0,Fe.__version=We.version);let Pi=Fe.currentProgram;Lt===!0&&(Pi=Gn(We,Mt,Oe),q&&We.isNodeMaterial&&q.onUpdateProgram(We,Pi,Fe));let rs=!1,Ji=!1,ur=!1,gt=Pi.getUniforms(),Ot=Fe.uniforms;if(de.useProgram(Pi.program)&&(rs=!0,Ji=!0,ur=!0),We.id!==_e&&(_e=We.id,Ji=!0),Fe.needsLights){let Dt=(function(Ti,aa){if(Ti.length===0)return null;if(Ti.length===1)return Ti[0].texture!==null?Ti[0]:null;C.setFromMatrixPosition(aa.matrixWorld);for(let yn=0,nl=Ti.length;yn<nl;yn++){let dr=Ti[yn];if(dr.texture!==null&&dr.boundingBox.containsPoint(C))return dr}return null})(w.state.lightProbeGridArray,Oe);Fe.lightProbeGrid!==Dt&&(Fe.lightProbeGrid=Dt,Ji=!0)}if(rs||Ne!==Ze){de.buffers.depth.getReversed()&&Ze.reversedDepth!==!0&&(Ze._reversedDepth=!0,Ze.updateProjectionMatrix()),gt.setValue(X,"projectionMatrix",Ze.projectionMatrix),gt.setValue(X,"viewMatrix",Ze.matrixWorldInverse);let Dt=gt.map.cameraPosition;Dt!==void 0&&Dt.setValue(X,J.setFromMatrixPosition(Ze.matrixWorld)),He.logarithmicDepthBuffer&&gt.setValue(X,"logDepthBufFC",2/(Math.log(Ze.far+1)/Math.LN2)),(We.isMeshPhongMaterial||We.isMeshToonMaterial||We.isMeshLambertMaterial||We.isMeshBasicMaterial||We.isMeshStandardMaterial||We.isShaderMaterial)&&gt.setValue(X,"isOrthographic",Ze.isOrthographicCamera===!0),Ne!==Ze&&(Ne=Ze,Ji=!0,ur=!0)}if(Fe.needsLights&&(si.state.directionalShadowMap.length>0&&gt.setValue(X,"directionalShadowMap",si.state.directionalShadowMap,Ee),si.state.spotShadowMap.length>0&&gt.setValue(X,"spotShadowMap",si.state.spotShadowMap,Ee),si.state.pointShadowMap.length>0&&gt.setValue(X,"pointShadowMap",si.state.pointShadowMap,Ee)),Oe.isSkinnedMesh){gt.setOptional(X,Oe,"bindMatrix"),gt.setOptional(X,Oe,"bindMatrixInverse");let Dt=Oe.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),gt.setValue(X,"boneTexture",Dt.boneTexture,Ee))}Oe.isBatchedMesh&&(gt.setOptional(X,Oe,"batchingTexture"),gt.setValue(X,"batchingTexture",Oe._matricesTexture,Ee),gt.setOptional(X,Oe,"batchingIdTexture"),gt.setValue(X,"batchingIdTexture",Oe._indirectTexture,Ee),gt.setOptional(X,Oe,"batchingColorTexture"),Oe._colorsTexture!==null&&gt.setValue(X,"batchingColorTexture",Oe._colorsTexture,Ee));let Ki=Ft.morphAttributes;if(Ki.position===void 0&&Ki.normal===void 0&&Ki.color===void 0||qt.update(Oe,Ft,Pi),(Ji||Fe.receiveShadow!==Oe.receiveShadow)&&(Fe.receiveShadow=Oe.receiveShadow,gt.setValue(X,"receiveShadow",Oe.receiveShadow)),(We.isMeshStandardMaterial||We.isMeshLambertMaterial||We.isMeshPhongMaterial)&&We.envMap===null&&Mt.environment!==null&&(Ot.envMapIntensity.value=Mt.environmentIntensity),Ot.dfgLUT!==void 0&&(Ot.dfgLUT.value=(ji===null&&(ji=new js(_g,16,16,ar,Xi),ji.name="DFG_LUT",ji.minFilter=Kt,ji.magFilter=Kt,ji.wrapS=Dn,ji.wrapT=Dn,ji.generateMipmaps=!1,ji.needsUpdate=!0),ji)),Ji){if(gt.setValue(X,"toneMappingExposure",H.toneMappingExposure),Fe.needsLights&&(hi=ur,(Si=Ot).ambientLightColor.needsUpdate=hi,Si.lightProbe.needsUpdate=hi,Si.directionalLights.needsUpdate=hi,Si.directionalLightShadows.needsUpdate=hi,Si.pointLights.needsUpdate=hi,Si.pointLightShadows.needsUpdate=hi,Si.spotLights.needsUpdate=hi,Si.spotLightShadows.needsUpdate=hi,Si.rectAreaLights.needsUpdate=hi,Si.hemisphereLights.needsUpdate=hi),bi&&We.fog===!0&&at.refreshFogUniforms(Ot,bi),at.refreshMaterialUniforms(Ot,We,oe,Ue,w.state.transmissionRenderTarget[Ze.id]),Fe.needsLights&&Fe.lightProbeGrid){let Dt=Fe.lightProbeGrid;Ot.probesSH.value=Dt.texture,Ot.probesMin.value.copy(Dt.boundingBox.min),Ot.probesMax.value.copy(Dt.boundingBox.max),Ot.probesResolution.value.copy(Dt.resolution)}Jr.upload(X,is(Fe),Ot,Ee)}var Si,hi;if(We.isShaderMaterial&&We.uniformsNeedUpdate===!0&&(Jr.upload(X,is(Fe),Ot,Ee),We.uniformsNeedUpdate=!1),We.isSpriteMaterial&&gt.setValue(X,"center",Oe.center),gt.setValue(X,"modelViewMatrix",Oe.modelViewMatrix),gt.setValue(X,"normalMatrix",Oe.normalMatrix),gt.setValue(X,"modelMatrix",Oe.matrixWorld),We.uniformsGroups!==void 0){let Dt=We.uniformsGroups;for(let Ti=0,aa=Dt.length;Ti<aa;Ti++){let yn=Dt[Ti];Xt.update(yn,Pi),Xt.bind(yn,Pi)}}return Pi})(R,Y,ie,ce,ae);de.setMaterial(ce,be);let we=ie.index,ze=1;if(ce.wireframe===!0){if(we=wt.getWireframeAttribute(ie),we===void 0)return;ze=2}let Qe=ie.drawRange,nt=ie.attributes.position,Be=Qe.start*ze,tt=(Qe.start+Qe.count)*ze;ge!==null&&(Be=Math.max(Be,ge.start*ze),tt=Math.min(tt,(ge.start+ge.count)*ze)),we!==null?(Be=Math.max(Be,0),tt=Math.min(tt,we.count)):nt!=null&&(Be=Math.max(Be,0),tt=Math.min(tt,nt.count));let Rt=tt-Be;if(Rt<0||Rt===1/0)return;let Pt;ot.setup(ae,ce,Ce,ie,we);let ft=mt;if(we!==null&&(Pt=lt.get(we),ft=ui,ft.setIndex(Pt)),ae.isMesh)ce.wireframe===!0?(de.setLineWidth(ce.wireframeLinewidth*Re()),ft.setMode(X.LINES)):ft.setMode(X.TRIANGLES);else if(ae.isLine){let Ze=ce.linewidth;Ze===void 0&&(Ze=1),de.setLineWidth(Ze*Re()),ae.isLineSegments?ft.setMode(X.LINES):ae.isLineLoop?ft.setMode(X.LINE_LOOP):ft.setMode(X.LINE_STRIP)}else ae.isPoints?ft.setMode(X.POINTS):ae.isSprite&&ft.setMode(X.TRIANGLES);if(ae.isBatchedMesh)if(xe.get("WEBGL_multi_draw"))ft.renderMultiDraw(ae._multiDrawStarts,ae._multiDrawCounts,ae._multiDrawCount);else{let Ze=ae._multiDrawStarts,Mt=ae._multiDrawCounts,Ft=ae._multiDrawCount,We=we?lt.get(we).bytesPerElement:1,Oe=fe.get(ce).currentProgram.getUniforms();for(let bi=0;bi<Ft;bi++)Oe.setValue(X,"_gl_DrawID",bi),ft.render(Ze[bi]/We,Mt[bi])}else if(ae.isInstancedMesh)ft.renderInstances(Be,Rt,ae.count);else if(ie.isInstancedBufferGeometry){let Ze=ie._maxInstanceCount!==void 0?ie._maxInstanceCount:1/0,Mt=Math.min(ie.instanceCount,Ze);ft.renderInstances(Be,Rt,Mt)}else ft.render(Be,Rt)},this.compile=function(R,Y,ie=null){ie===null&&(ie=R),w=Ut.get(ie),w.init(Y),W.push(w),ie.traverseVisible(function(ae){ae.isLight&&ae.layers.test(Y.layers)&&(w.pushLight(ae),ae.castShadow&&w.pushShadow(ae))}),R!==ie&&R.traverseVisible(function(ae){ae.isLight&&ae.layers.test(Y.layers)&&(w.pushLight(ae),ae.castShadow&&w.pushShadow(ae))}),w.setupLights();let ce=new Set;return R.traverse(function(ae){if(!(ae.isMesh||ae.isPoints||ae.isLine||ae.isSprite))return;let ge=ae.material;if(ge)if(Array.isArray(ge))for(let be=0;be<ge.length;be++){let Ce=ge[be];lr(Ce,ie,ae),ce.add(Ce)}else lr(ge,ie,ae),ce.add(ge)}),w=W.pop(),ce},this.compileAsync=function(R,Y,ie=null){let ce=this.compile(R,Y,ie);return new Promise(ae=>{function ge(){ce.forEach(function(be){fe.get(be).currentProgram.isReady()&&ce.delete(be)}),ce.size!==0?setTimeout(ge,10):ae(R)}xe.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let fn=null;function gn(){xi.stop()}function cr(){xi.start()}let xi=new Hh;function zn(R,Y,ie,ce){if(R.visible===!1)return;if(R.layers.test(Y.layers)){if(R.isGroup)ie=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(Y);else if(R.isLightProbeGrid)w.pushLightProbeGrid(R);else if(R.isLight)w.pushLight(R),R.castShadow&&w.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||z.intersectsSprite(R)){ce&&re.setFromMatrixPosition(R.matrixWorld).applyMatrix4(j);let ge=kt.update(R),be=R.material;be.visible&&L.push(R,ge,be,ie,re.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||z.intersectsObject(R))){let ge=kt.update(R),be=R.material;if(ce&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),re.copy(R.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),re.copy(ge.boundingSphere.center)),re.applyMatrix4(R.matrixWorld).applyMatrix4(j)),Array.isArray(be)){let Ce=ge.groups;for(let we=0,ze=Ce.length;we<ze;we++){let Qe=Ce[we],nt=be[Qe.materialIndex];nt&&nt.visible&&L.push(R,ge,nt,ie,re.z,Qe)}}else be.visible&&L.push(R,ge,be,ie,re.z,null)}}let ae=R.children;for(let ge=0,be=ae.length;ge<be;ge++)zn(ae[ge],Y,ie,ce)}function ts(R,Y,ie,ce){let{opaque:ae,transmissive:ge,transparent:be}=R;w.setupLightsView(ie),O===!0&&ut.setGlobalState(H.clippingPlanes,ie),ce&&de.viewport(Ae.copy(ce)),ae.length>0&&Zi(ae,Y,ie),ge.length>0&&Zi(ge,Y,ie),be.length>0&&Zi(be,Y,ie),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function ta(R,Y,ie,ce){if((ie.isScene===!0?ie.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[ce.id]===void 0){let nt=xe.has("EXT_color_buffer_half_float")||xe.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[ce.id]=new vi(1,1,{generateMipmaps:!0,type:nt?Xi:_i,minFilter:nr,samples:Math.max(4,He.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:rt.workingColorSpace})}let ae=w.state.transmissionRenderTarget[ce.id],ge=ce.viewport||Ae;ae.setSize(ge.z*H.transmissionResolutionScale,ge.w*H.transmissionResolutionScale);let be=H.getRenderTarget(),Ce=H.getActiveCubeFace(),we=H.getActiveMipmapLevel();H.setRenderTarget(ae),H.getClearColor(Me),ye=H.getClearAlpha(),ye<1&&H.setClearColor(16777215,.5),H.clear(),Ie&&xt.render(ie);let ze=H.toneMapping;H.toneMapping=Fi;let Qe=ce.viewport;if(ce.viewport!==void 0&&(ce.viewport=void 0),w.setupLightsView(ce),O===!0&&ut.setGlobalState(H.clippingPlanes,ce),Zi(R,ie,ce),Ee.updateMultisampleRenderTarget(ae),Ee.updateRenderTargetMipmap(ae),xe.has("WEBGL_multisampled_render_to_texture")===!1){let nt=!1;for(let Be=0,tt=Y.length;Be<tt;Be++){let Rt=Y[Be],{object:Pt,geometry:ft,material:Ze,group:Mt}=Rt;if(Ze.side===Ri&&Pt.layers.test(ce.layers)){let Ft=Ze.side;Ze.side=Qt,Ze.needsUpdate=!0,ia(Pt,ie,ce,ft,Ze,Mt),Ze.side=Ft,Ze.needsUpdate=!0,nt=!0}}nt===!0&&(Ee.updateMultisampleRenderTarget(ae),Ee.updateRenderTargetMipmap(ae))}H.setRenderTarget(be,Ce,we),H.setClearColor(Me,ye),Qe!==void 0&&(ce.viewport=Qe),H.toneMapping=ze}function Zi(R,Y,ie){let ce=Y.isScene===!0?Y.overrideMaterial:null;for(let ae=0,ge=R.length;ae<ge;ae++){let be=R[ae],{object:Ce,geometry:we,group:ze}=be,Qe=be.material;Qe.allowOverride===!0&&ce!==null&&(Qe=ce),Ce.layers.test(ie.layers)&&ia(Ce,Y,ie,we,Qe,ze)}}function ia(R,Y,ie,ce,ae,ge){R.onBeforeRender(H,Y,ie,ce,ae,ge),R.modelViewMatrix.multiplyMatrices(ie.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ae.onBeforeRender(H,Y,ie,ce,R,ge),ae.transparent===!0&&ae.side===Ri&&ae.forceSinglePass===!1?(ae.side=Qt,ae.needsUpdate=!0,H.renderBufferDirect(ie,Y,ce,ae,R,ge),ae.side=Wr,ae.needsUpdate=!0,H.renderBufferDirect(ie,Y,ce,ae,R,ge),ae.side=Ri):H.renderBufferDirect(ie,Y,ce,ae,R,ge),R.onAfterRender(H,Y,ie,ce,ae,ge)}function Gn(R,Y,ie){Y.isScene!==!0&&(Y=me);let ce=fe.get(R),ae=w.state.lights,ge=w.state.shadowsArray,be=ae.state.version,Ce=De.getParameters(R,ae.state,ge,Y,ie,w.state.lightProbeGridArray),we=De.getProgramCacheKey(Ce),ze=ce.programs;ce.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?Y.environment:null,ce.fog=Y.fog;let Qe=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;ce.envMap=ht.get(R.envMap||ce.environment,Qe),ce.envMapRotation=ce.environment!==null&&R.envMap===null?Y.environmentRotation:R.envMapRotation,ze===void 0&&(R.addEventListener("dispose",zi),ze=new Map,ce.programs=ze);let nt=ze.get(we);if(nt!==void 0){if(ce.currentProgram===nt&&ce.lightsStateVersion===be)return na(R,Ce),nt}else Ce.uniforms=De.getUniforms(R),q!==null&&R.isNodeMaterial&&q.build(R,ie,Ce),R.onBeforeCompile(Ce,H),nt=De.acquireProgram(Ce,we),ze.set(we,nt),ce.uniforms=Ce.uniforms;let Be=ce.uniforms;return(R.isShaderMaterial||R.isRawShaderMaterial)&&R.clipping!==!0||(Be.clippingPlanes=ut.uniform),na(R,Ce),ce.needsLights=(function(tt){return tt.isMeshLambertMaterial||tt.isMeshToonMaterial||tt.isMeshPhongMaterial||tt.isMeshStandardMaterial||tt.isShadowMaterial||tt.isShaderMaterial&&tt.lights===!0})(R),ce.lightsStateVersion=be,ce.needsLights&&(Be.ambientLightColor.value=ae.state.ambient,Be.lightProbe.value=ae.state.probe,Be.directionalLights.value=ae.state.directional,Be.directionalLightShadows.value=ae.state.directionalShadow,Be.spotLights.value=ae.state.spot,Be.spotLightShadows.value=ae.state.spotShadow,Be.rectAreaLights.value=ae.state.rectArea,Be.ltc_1.value=ae.state.rectAreaLTC1,Be.ltc_2.value=ae.state.rectAreaLTC2,Be.pointLights.value=ae.state.point,Be.pointLightShadows.value=ae.state.pointShadow,Be.hemisphereLights.value=ae.state.hemi,Be.directionalShadowMatrix.value=ae.state.directionalShadowMatrix,Be.spotLightMatrix.value=ae.state.spotLightMatrix,Be.spotLightMap.value=ae.state.spotLightMap,Be.pointShadowMatrix.value=ae.state.pointShadowMatrix),ce.lightProbeGrid=w.state.lightProbeGridArray.length>0,ce.currentProgram=nt,ce.uniformsList=null,nt}function is(R){if(R.uniformsList===null){let Y=R.currentProgram.getUniforms();R.uniformsList=Jr.seqWithValue(Y.seq,R.uniforms)}return R.uniformsList}function na(R,Y){let ie=fe.get(R);ie.outputColorSpace=Y.outputColorSpace,ie.batching=Y.batching,ie.batchingColor=Y.batchingColor,ie.instancing=Y.instancing,ie.instancingColor=Y.instancingColor,ie.instancingMorph=Y.instancingMorph,ie.skinning=Y.skinning,ie.morphTargets=Y.morphTargets,ie.morphNormals=Y.morphNormals,ie.morphColors=Y.morphColors,ie.morphTargetsCount=Y.morphTargetsCount,ie.numClippingPlanes=Y.numClippingPlanes,ie.numIntersection=Y.numClipIntersection,ie.vertexAlphas=Y.vertexAlphas,ie.vertexTangents=Y.vertexTangents,ie.toneMapping=Y.toneMapping}xi.setAnimationLoop(function(R){fn&&fn(R)}),typeof self<"u"&&xi.setContext(self),this.setAnimationLoop=function(R){fn=R,At.setAnimationLoop(R),R===null?xi.stop():xi.start()},At.addEventListener("sessionstart",gn),At.addEventListener("sessionend",cr),this.render=function(R,Y){if(Y!==void 0&&Y.isCamera!==!0)return void Ge("WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(K===!0)return;q!==null&&q.renderStart(R,Y);let ie=At.enabled===!0&&At.isPresenting===!0,ce=G!==null&&(ue===null||ie)&&G.begin(H,ue);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),At.enabled!==!0||At.isPresenting!==!0||G!==null&&G.isCompositing()!==!1||(At.cameraAutoUpdate===!0&&At.updateCamera(Y),Y=At.getCamera()),R.isScene===!0&&R.onBeforeRender(H,R,Y,ue),w=Ut.get(R,W.length),w.init(Y),w.state.textureUnits=Ee.getTextureUnits(),W.push(w),j.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),z.setFromProjectionMatrix(j,cn,Y.reversedDepth),I=this.localClippingEnabled,O=ut.init(this.clippingPlanes,I),L=Ye.get(R,k.length),L.init(),k.push(L),At.enabled===!0&&At.isPresenting===!0){let ge=H.xr.getDepthSensingMesh();ge!==null&&zn(ge,Y,-1/0,H.sortObjects)}zn(R,Y,0,H.sortObjects),L.finish(),H.sortObjects===!0&&L.sort(F,A,Y.reversedDepth),Ie=At.enabled===!1||At.isPresenting===!1||At.hasDepthSensing()===!1,Ie&&xt.addToRenderList(L,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),O===!0&&ut.beginShadows();let ae=w.state.shadowsArray;if(Et.render(ae,R,Y),O===!0&&ut.endShadows(),(ce&&G.hasRenderPass())===!1){let ge=L.opaque,be=L.transmissive;if(w.setupLights(),Y.isArrayCamera){let Ce=Y.cameras;if(be.length>0)for(let we=0,ze=Ce.length;we<ze;we++)ta(ge,be,R,Ce[we]);Ie&&xt.render(R);for(let we=0,ze=Ce.length;we<ze;we++){let Qe=Ce[we];ts(L,R,Qe,Qe.viewport)}}else be.length>0&&ta(ge,be,R,Y),Ie&&xt.render(R),ts(L,R,Y)}ue!==null&&$===0&&(Ee.updateMultisampleRenderTarget(ue),Ee.updateRenderTargetMipmap(ue)),ce&&G.end(H),R.isScene===!0&&R.onAfterRender(H,R,Y),ot.resetDefaultState(),_e=-1,Ne=null,W.pop(),W.length>0?(w=W[W.length-1],Ee.setTextureUnits(w.state.textureUnits),O===!0&&ut.setGlobalState(H.clippingPlanes,w.state.camera)):w=null,k.pop(),L=k.length>0?k[k.length-1]:null,q!==null&&q.renderEnd()},this.getActiveCubeFace=function(){return v},this.getActiveMipmapLevel=function(){return $},this.getRenderTarget=function(){return ue},this.setRenderTargetTextures=function(R,Y,ie){let ce=fe.get(R);ce.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ce.__autoAllocateDepthBuffer===!1&&(ce.__useRenderToTexture=!1),fe.get(R.texture).__webglTexture=Y,fe.get(R.depthTexture).__webglTexture=ce.__autoAllocateDepthBuffer?void 0:ie,ce.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,Y){let ie=fe.get(R);ie.__webglFramebuffer=Y,ie.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(R,Y=0,ie=0){ue=R,v=Y,$=ie;let ce=null,ae=!1,ge=!1;if(R){let be=fe.get(R);if(be.__useDefaultFramebuffer!==void 0)return de.bindFramebuffer(X.FRAMEBUFFER,be.__webglFramebuffer),Ae.copy(R.viewport),Pe.copy(R.scissor),he=R.scissorTest,de.viewport(Ae),de.scissor(Pe),de.setScissorTest(he),void(_e=-1);if(be.__webglFramebuffer===void 0)Ee.setupRenderTarget(R);else if(be.__hasExternalTextures)Ee.rebindTextures(R,fe.get(R.texture).__webglTexture,fe.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){let ze=R.depthTexture;if(be.__boundDepthTexture!==ze){if(ze!==null&&fe.has(ze)&&(R.width!==ze.image.width||R.height!==ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ee.setupDepthRenderbuffer(R)}}let Ce=R.texture;(Ce.isData3DTexture||Ce.isDataArrayTexture||Ce.isCompressedArrayTexture)&&(ge=!0);let we=fe.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(ce=Array.isArray(we[Y])?we[Y][ie]:we[Y],ae=!0):ce=R.samples>0&&Ee.useMultisampledRTT(R)===!1?fe.get(R).__webglMultisampledFramebuffer:Array.isArray(we)?we[ie]:we,Ae.copy(R.viewport),Pe.copy(R.scissor),he=R.scissorTest}else Ae.copy(N).multiplyScalar(oe).floor(),Pe.copy(V).multiplyScalar(oe).floor(),he=_;if(ie!==0&&(ce=se),de.bindFramebuffer(X.FRAMEBUFFER,ce)&&de.drawBuffers(R,ce),de.viewport(Ae),de.scissor(Pe),de.setScissorTest(he),ae){let be=fe.get(R.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_CUBE_MAP_POSITIVE_X+Y,be.__webglTexture,ie)}else if(ge){let be=Y;for(let Ce=0;Ce<R.textures.length;Ce++){let we=fe.get(R.textures[Ce]);X.framebufferTextureLayer(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0+Ce,we.__webglTexture,ie,be)}}else if(R!==null&&ie!==0){let be=fe.get(R.texture);X.framebufferTexture2D(X.FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,be.__webglTexture,ie)}_e=-1},this.readRenderTargetPixels=function(R,Y,ie,ce,ae,ge,be,Ce=0){if(!R||!R.isWebGLRenderTarget)return void Ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=fe.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&be!==void 0&&(we=we[be]),we){de.bindFramebuffer(X.FRAMEBUFFER,we);try{let ze=R.textures[Ce],Qe=ze.format,nt=ze.type;if(R.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+Ce),!He.textureFormatReadable(Qe))return void Ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(nt))return void Ge("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");Y>=0&&Y<=R.width-ce&&ie>=0&&ie<=R.height-ae&&X.readPixels(Y,ie,ce,ae,di.convert(Qe),di.convert(nt),ge)}finally{let ze=ue!==null?fe.get(ue).__webglFramebuffer:null;de.bindFramebuffer(X.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(R,Y,ie,ce,ae,ge,be,Ce=0){if(!R||!R.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=fe.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&be!==void 0&&(we=we[be]),we){if(Y>=0&&Y<=R.width-ce&&ie>=0&&ie<=R.height-ae){de.bindFramebuffer(X.FRAMEBUFFER,we);let ze=R.textures[Ce],Qe=ze.format,nt=ze.type;if(R.textures.length>1&&X.readBuffer(X.COLOR_ATTACHMENT0+Ce),!He.textureFormatReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Be=X.createBuffer();X.bindBuffer(X.PIXEL_PACK_BUFFER,Be),X.bufferData(X.PIXEL_PACK_BUFFER,ge.byteLength,X.STREAM_READ),X.readPixels(Y,ie,ce,ae,di.convert(Qe),di.convert(nt),0);let tt=ue!==null?fe.get(ue).__webglFramebuffer:null;de.bindFramebuffer(X.FRAMEBUFFER,tt);let Rt=X.fenceSync(X.SYNC_GPU_COMMANDS_COMPLETE,0);return X.flush(),await hh(X,Rt,4),X.bindBuffer(X.PIXEL_PACK_BUFFER,Be),X.getBufferSubData(X.PIXEL_PACK_BUFFER,0,ge),X.deleteBuffer(Be),X.deleteSync(Rt),ge}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(R,Y=null,ie=0){let ce=Math.pow(2,-ie),ae=Math.floor(R.image.width*ce),ge=Math.floor(R.image.height*ce),be=Y!==null?Y.x:0,Ce=Y!==null?Y.y:0;Ee.setTexture2D(R,0),X.copyTexSubImage2D(X.TEXTURE_2D,ie,0,0,be,Ce,ae,ge),de.unbindTexture()},this.copyTextureToTexture=function(R,Y,ie=null,ce=null,ae=0,ge=0){let be,Ce,we,ze,Qe,nt,Be,tt,Rt,Pt=R.isCompressedTexture?R.mipmaps[ge]:R.image;if(ie!==null)be=ie.max.x-ie.min.x,Ce=ie.max.y-ie.min.y,we=ie.isBox3?ie.max.z-ie.min.z:1,ze=ie.min.x,Qe=ie.min.y,nt=ie.isBox3?ie.min.z:0;else{let Mi=Math.pow(2,-ae);be=Math.floor(Pt.width*Mi),Ce=Math.floor(Pt.height*Mi),we=R.isDataArrayTexture?Pt.depth:R.isData3DTexture?Math.floor(Pt.depth*Mi):1,ze=0,Qe=0,nt=0}ce!==null?(Be=ce.x,tt=ce.y,Rt=ce.z):(Be=0,tt=0,Rt=0);let ft=di.convert(Y.format),Ze=di.convert(Y.type),Mt;Y.isData3DTexture?(Ee.setTexture3D(Y,0),Mt=X.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(Ee.setTexture2DArray(Y,0),Mt=X.TEXTURE_2D_ARRAY):(Ee.setTexture2D(Y,0),Mt=X.TEXTURE_2D),de.activeTexture(X.TEXTURE0),de.pixelStorei(X.UNPACK_FLIP_Y_WEBGL,Y.flipY),de.pixelStorei(X.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),de.pixelStorei(X.UNPACK_ALIGNMENT,Y.unpackAlignment);let Ft=de.getParameter(X.UNPACK_ROW_LENGTH),We=de.getParameter(X.UNPACK_IMAGE_HEIGHT),Oe=de.getParameter(X.UNPACK_SKIP_PIXELS),bi=de.getParameter(X.UNPACK_SKIP_ROWS),ns=de.getParameter(X.UNPACK_SKIP_IMAGES);de.pixelStorei(X.UNPACK_ROW_LENGTH,Pt.width),de.pixelStorei(X.UNPACK_IMAGE_HEIGHT,Pt.height),de.pixelStorei(X.UNPACK_SKIP_PIXELS,ze),de.pixelStorei(X.UNPACK_SKIP_ROWS,Qe),de.pixelStorei(X.UNPACK_SKIP_IMAGES,nt);let Hn=R.isDataArrayTexture||R.isData3DTexture,Vn=Y.isDataArrayTexture||Y.isData3DTexture;if(R.isDepthTexture){let Mi=fe.get(R),vn=fe.get(Y),ri=fe.get(Mi.__renderTarget),It=fe.get(vn.__renderTarget);de.bindFramebuffer(X.READ_FRAMEBUFFER,ri.__webglFramebuffer),de.bindFramebuffer(X.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let qe=0;qe<we;qe++)Hn&&(X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,fe.get(R).__webglTexture,ae,nt+qe),X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,fe.get(Y).__webglTexture,ge,Rt+qe)),X.blitFramebuffer(ze,Qe,be,Ce,Be,tt,be,Ce,X.DEPTH_BUFFER_BIT,X.NEAREST);de.bindFramebuffer(X.READ_FRAMEBUFFER,null),de.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else if(ae!==0||R.isRenderTargetTexture||fe.has(R)){let Mi=fe.get(R),vn=fe.get(Y);de.bindFramebuffer(X.READ_FRAMEBUFFER,ee),de.bindFramebuffer(X.DRAW_FRAMEBUFFER,Z);for(let ri=0;ri<we;ri++)Hn?X.framebufferTextureLayer(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,Mi.__webglTexture,ae,nt+ri):X.framebufferTexture2D(X.READ_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,Mi.__webglTexture,ae),Vn?X.framebufferTextureLayer(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,vn.__webglTexture,ge,Rt+ri):X.framebufferTexture2D(X.DRAW_FRAMEBUFFER,X.COLOR_ATTACHMENT0,X.TEXTURE_2D,vn.__webglTexture,ge),ae!==0?X.blitFramebuffer(ze,Qe,be,Ce,Be,tt,be,Ce,X.COLOR_BUFFER_BIT,X.NEAREST):Vn?X.copyTexSubImage3D(Mt,ge,Be,tt,Rt+ri,ze,Qe,be,Ce):X.copyTexSubImage2D(Mt,ge,Be,tt,ze,Qe,be,Ce);de.bindFramebuffer(X.READ_FRAMEBUFFER,null),de.bindFramebuffer(X.DRAW_FRAMEBUFFER,null)}else Vn?R.isDataTexture||R.isData3DTexture?X.texSubImage3D(Mt,ge,Be,tt,Rt,be,Ce,we,ft,Ze,Pt.data):Y.isCompressedArrayTexture?X.compressedTexSubImage3D(Mt,ge,Be,tt,Rt,be,Ce,we,ft,Pt.data):X.texSubImage3D(Mt,ge,Be,tt,Rt,be,Ce,we,ft,Ze,Pt):R.isDataTexture?X.texSubImage2D(X.TEXTURE_2D,ge,Be,tt,be,Ce,ft,Ze,Pt.data):R.isCompressedTexture?X.compressedTexSubImage2D(X.TEXTURE_2D,ge,Be,tt,Pt.width,Pt.height,ft,Pt.data):X.texSubImage2D(X.TEXTURE_2D,ge,Be,tt,be,Ce,ft,Ze,Pt);de.pixelStorei(X.UNPACK_ROW_LENGTH,Ft),de.pixelStorei(X.UNPACK_IMAGE_HEIGHT,We),de.pixelStorei(X.UNPACK_SKIP_PIXELS,Oe),de.pixelStorei(X.UNPACK_SKIP_ROWS,bi),de.pixelStorei(X.UNPACK_SKIP_IMAGES,ns),ge===0&&Y.generateMipmaps&&X.generateMipmap(Mt),de.unbindTexture()},this.initRenderTarget=function(R){fe.get(R).__webglFramebuffer===void 0&&Ee.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Ee.setTextureCube(R,0):R.isData3DTexture?Ee.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Ee.setTexture2DArray(R,0):Ee.setTexture2D(R,0),de.unbindTexture()},this.resetState=function(){v=0,$=0,ue=null,de.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=rt._getDrawingBufferColorSpace(e),t.unpackColorSpace=rt._getUnpackColorSpace()}};(()=>{"use strict";let r=(l,h=document)=>h.querySelector(l),e=(l,h=document)=>[...h.querySelectorAll(l)],t=(l,h,m)=>Math.max(h,Math.min(m,l)),i=(l,h,m)=>l+(h-l)*m,n=Math.PI/180,a="shippy-v11",s=["shippy-v10","shippy-v9","shippy-v8","shippy-v7","shippy-v6","shippy-v5","global-commodity-trader-v3"],o=(l,h=!1)=>{let m=l<0?"-":"",T=Math.abs(l);return h&&T>=1e6?`${m}$${(T/1e6).toFixed(2)}M`:h&&T>=1e3?`${m}$${Math.round(T/1e3)}K`:`${m}$${Math.round(T).toLocaleString("en-US")}`},u=l=>new Intl.DateTimeFormat("it-IT",{day:"2-digit",month:"long",year:"numeric"}).format(l),c=[{id:"geneva",name:"Ginevra",country:"Svizzera",type:"hq",lat:46.2044,lon:6.1432,subtitle:"Northstar Commodities SA",description:"La sede centrale coordina capitale, rischio, compliance e relazioni bancarie del desk.",commodities:["Base metals","Energy","Risk management"],risk:"Basso"},{id:"brescia",name:"Brescia",country:"Italia",type:"customer",lat:45.5416,lon:10.2118,subtitle:"Lombardia Cables S.p.A.",description:"Distretto industriale con domanda di rame raffinato e requisiti qualitativi elevati.",commodities:["Copper cathodes","Aluminium","Scrap"],risk:"Basso"},{id:"genova",name:"Genova",country:"Italia",type:"port",lat:44.4056,lon:8.9463,subtitle:"Port of Genoa",description:"Porta d\u2019ingresso marittima per le consegne dirette al Nord Italia.",commodities:["Containers","Bulk cargo","Warehousing"],risk:"Medio"},{id:"tallinn",name:"Tallinn",country:"Estonia",type:"supplier",lat:59.437,lon:24.7536,subtitle:"Baltic Metals OU",description:"Fornitore europeo rapido e finanziariamente leggero, con documentazione qualitativa da verificare.",commodities:["Copper cathodes","Recycled metals"],risk:"Basso"},{id:"santiago",name:"Santiago",country:"Cile",type:"supplier",lat:-33.4489,lon:-70.6693,subtitle:"Andean Copper Ltd.",description:"Accesso competitivo alla produzione cilena, con transit time lungo e maggiore capitale immobilizzato.",commodities:["Copper cathodes","Copper concentrate","Molybdenum"],risk:"Medio"},{id:"dubai",name:"Dubai",country:"EAU",type:"supplier",lat:25.2048,lon:55.2708,subtitle:"Meridian Resources DMCC",description:"Premium aggressivi, ma maggiore rischio di controparte e compliance.",commodities:["Base metals","Oil products","Trade finance"],risk:"Alto"},{id:"casablanca",name:"Casablanca",country:"Marocco",type:"supplier",lat:33.5731,lon:-7.5898,subtitle:"Atlas Fertilizers SA",description:"Hub nordafricano per fertilizzanti con transit time breve verso il Mediterraneo.",commodities:["Urea","Phosphates","Fertilizers"],risk:"Medio",locked:!0},{id:"rotterdam",name:"Rotterdam",country:"Paesi Bassi",type:"port",lat:51.9244,lon:4.4777,subtitle:"European Logistics Hub",description:"Hub logistico sbloccabile con storage, blending e accesso a pi\xF9 clienti europei.",commodities:["Metals","Energy","Storage"],risk:"Basso",locked:!0},{id:"singapore",name:"Singapore",country:"Singapore",type:"port",lat:1.3521,lon:103.8198,subtitle:"Asia Trading Hub",description:"Mercato avanzato che si sblocca aumentando reputazione e capitale.",commodities:["Metals","Oil","Freight"],risk:"Medio",locked:!0},{id:"houston",name:"Houston",country:"USA",type:"supplier",lat:29.7604,lon:-95.3698,subtitle:"Gulf Coast Energy Hub",description:"Raffinerie, terminal e trading di prodotti energetici con elevata intensit\xE0 di capitale.",commodities:["Crude oil","Diesel","Naphtha"],risk:"Medio",locked:!0},{id:"santos",name:"Santos",country:"Brasile",type:"supplier",lat:-23.9608,lon:-46.3336,subtitle:"Santos Export Terminal",description:"Principale porta d\u2019uscita per coffee e soft commodities brasiliane.",commodities:["Coffee","Sugar","Soybeans"],risk:"Medio",locked:!0},{id:"rosario",name:"Rosario",country:"Argentina",type:"supplier",lat:-32.9442,lon:-60.6505,subtitle:"Paran\xE1 Grain Corridor",description:"Origination agricola, elevata stagionalit\xE0 e rischio di qualit\xE0 e livello del fiume.",commodities:["Wheat","Corn","Soymeal"],risk:"Medio",locked:!0},{id:"port-hedland",name:"Port Hedland",country:"Australia",type:"supplier",lat:-20.3107,lon:118.6011,subtitle:"Pilbara Bulk Export Hub",description:"Mega-cargo dry bulk di iron ore con forte dipendenza da freight e port scheduling.",commodities:["Iron ore","Manganese","Dry bulk"],risk:"Basso",locked:!0},{id:"shanghai",name:"Shanghai",country:"Cina",type:"customer",lat:31.2304,lon:121.4737,subtitle:"Yangtze Industrial Market",description:"Domanda siderurgica e industriale su larga scala, con disciplina su qualit\xE0 e laycan.",commodities:["Iron ore","Copper","Energy"],risk:"Medio",locked:!0}],d=[{id:"baltic-copper",origin:"tallinn",destination:"brescia",via:[],commodity:"Copper",quantity:500,capital:165e4,equity:24e4,basePnl:38e3,duration:28,risk:"Basso",riskClass:"low",priceKey:"copper",recommendedHedge:100,transportMode:"Rail / Truck",title:"Baltic Express",description:"Rotta terrestre breve, minore impiego di capitale e rischio documentale gestibile.",unlock:()=>!0,event:{dayRatio:.43,title:"Certificato qualitativo incompleto",text:"Il certificato ricevuto non riporta una specifica richiesta dal cliente. La merce \xE8 gi\xE0 in transito.",choices:[{id:"inspect",label:"Ordina ispezione indipendente",hint:"Costo $7.500 \xB7 protegge reputazione e riduce il claim",pnl:-7500,days:1,reputation:1,result:"L\u2019ispezione conferma la conformit\xE0 e il cliente accetta i documenti."},{id:"accept",label:"Accetta il rischio documentale",hint:"Nessun costo immediato \xB7 possibile claim a consegna",random:!0,good:{pnl:0,reputation:0,result:"Il cliente accetta la documentazione senza contestazioni."},bad:{pnl:-24e3,reputation:-4,result:"Il cliente applica uno sconto per documentazione incompleta."}}]}},{id:"andean-copper",origin:"santiago",destination:"brescia",via:["genova"],commodity:"Copper",quantity:500,capital:36e5,equity:6e5,basePnl:76e3,duration:65,risk:"Medio",riskClass:"medium",priceKey:"copper",recommendedHedge:80,transportMode:"Ocean / Truck",title:"Andean Atlantic",description:"Margine superiore, origine produttiva forte e rotta marittima lunga via Genova.",unlock:()=>!0,event:{dayRatio:.52,title:"Tempesta sull\u2019Atlantico",text:"La nave perde velocit\xE0 e rischia di mancare la finestra di consegna a Brescia.",choices:[{id:"wait",label:"Mantieni la rotta verso Genova",hint:"Costo $15.000 \xB7 ritardo stimato 8 giorni",pnl:-15e3,days:8,reputation:-1,result:"La nave arriva in ritardo, ma il cliente accetta la nuova finestra."},{id:"reroute",label:"Devia verso Rotterdam",hint:"Costo $32.000 \xB7 riduce il ritardo a 4 giorni",pnl:-32e3,days:4,reputation:2,result:"La deviazione protegge il cliente, ma comprime il margine."}]}},{id:"meridian-copper",origin:"dubai",destination:"brescia",via:["genova"],commodity:"Copper",quantity:500,capital:32e5,equity:48e4,basePnl:104e3,duration:48,risk:"Alto",riskClass:"high",priceKey:"copper",recommendedHedge:60,transportMode:"Ocean / Truck",title:"Meridian Premium",description:"Premium molto interessante, ma compliance e qualit\xE0 richiedono controlli pi\xF9 profondi.",unlock:()=>!0,event:{dayRatio:.31,title:"Compliance alert sulla controparte",text:"La banca segnala una struttura proprietaria poco trasparente prima di processare la lettera di credito.",choices:[{id:"kyc",label:"Avvia Enhanced KYC",hint:"Costo $12.000 \xB7 5 giorni \xB7 riduce il rischio",pnl:-12e3,days:5,reputation:3,result:"Il controllo rafforzato chiarisce la struttura e la banca procede."},{id:"proceed",label:"Procedi senza ulteriori verifiche",hint:"Mantieni il margine \xB7 rischio di blocco e sanzioni",random:!0,good:{pnl:0,reputation:-1,result:"La banca processa il pagamento, ma il risk desk segnala la scelta."},bad:{pnl:-9e4,reputation:-12,result:"La banca blocca il pagamento e il deal viene chiuso con una perdita significativa."}},{id:"cancel",label:"Cancella il deal",hint:"Perdita certa di $35.000 \xB7 preserva compliance",pnl:-139e3,days:0,reputation:1,result:"Il deal viene chiuso anticipatamente e il capitale residuo viene liberato.",forceComplete:!0}]}},{id:"rotterdam-alloy",origin:"rotterdam",destination:"brescia",via:[],commodity:"Aluminium",quantity:350,capital:21e5,equity:33e4,basePnl:59e3,duration:24,risk:"Basso",riskClass:"low",priceKey:"aluminium",recommendedHedge:100,transportMode:"Barge / Rail",title:"Rhine\u2013Alps Alloy",description:"Corridoio europeo ad alta rotazione, accessibile dopo l\u2019apertura del desk di Rotterdam.",unlock:l=>ot("rotterdam")},{id:"maghreb-urea",origin:"casablanca",destination:"brescia",via:["genova"],commodity:"Urea",quantity:900,capital:18e5,equity:28e4,basePnl:64e3,duration:21,risk:"Medio",riskClass:"medium",priceKey:"urea",recommendedHedge:70,transportMode:"Coaster / Truck",title:"Maghreb Nutrients",description:"Parcel di urea dal Nord Africa al mercato agricolo italiano. Margine rapido, ma qualit\xE0 e congestione portuale richiedono execution.",unlock:l=>ot("genova")&&l.completedDeals>=2,event:{dayRatio:.48,title:"Congestione al terminal fertilizzanti",text:"Il terminal di Genova comunica un ritardo nello scarico. Il carico rischia storage aggiuntivo e mancata consegna.",choices:[{id:"priority-berth",label:"Acquista priorit\xE0 di attracco",hint:"Costo $11.000 \xB7 preserva ETA e cliente",pnl:-11e3,days:1,reputation:2,result:"Lo slot prioritario consente di scaricare quasi in linea con il programma."},{id:"wait-urea",label:"Attendi lo slot ordinario",hint:"Nessun costo iniziale \xB7 4 giorni e rischio di claim",random:!0,good:{pnl:-6e3,days:4,reputation:0,result:"Il ritardo resta gestibile e il cliente accetta la nuova ETA."},bad:{pnl:-28e3,days:6,reputation:-3,result:"Il cliente applica un claim e il terminal addebita storage extra."}}]}},{id:"asia-aluminium",origin:"dubai",destination:"singapore",via:[],commodity:"Aluminium",quantity:600,capital:28e5,equity:43e4,basePnl:96e3,duration:25,risk:"Medio",riskClass:"medium",priceKey:"aluminium",recommendedHedge:100,transportMode:"Multipurpose vessel",title:"Gulf\u2013Asia Aluminium",description:"Arbitraggio regionale verso Singapore con elevata rotazione e forte disciplina documentale.",unlock:l=>ot("singapore"),event:{dayRatio:.36,title:"Discrepancy nella lettera di credito",text:"La banca ricevente identifica una differenza tra descrizione merce e packing list.",choices:[{id:"amend-lc",label:"Richiedi amendment immediato",hint:"Costo $8.500 \xB7 2 giorni \xB7 protegge settlement",pnl:-8500,days:2,reputation:2,result:"La modifica viene accettata e i documenti tornano conformi."},{id:"waiver",label:"Chiedi waiver al buyer",hint:"Costo basso \xB7 dipende dalla relazione commerciale",random:!0,good:{pnl:-2e3,days:1,reputation:1,result:"Il buyer concede il waiver e la banca processa i documenti."},bad:{pnl:-35e3,days:5,reputation:-4,result:"Il buyer rifiuta il waiver e il pagamento viene ritardato."}}]}},{id:"atlantic-diesel",origin:"houston",destination:"rotterdam",via:[],commodity:"Diesel",quantity:18e3,capital:86e5,equity:125e4,basePnl:21e4,duration:27,risk:"Medio",riskClass:"medium",priceKey:"crude",recommendedHedge:90,transportMode:"Product tanker",title:"Gulf\u2013ARA Distillates",description:"Cargo energetico dal Gulf Coast al mercato ARA. Forte working capital, crack/basis risk e rigorosa gestione della qualit\xE0.",unlock:l=>ot("rotterdam")&&l.completedDeals>=3&&l.reputation>=62,event:{dayRatio:.46,title:"Off-spec sulfur test",text:"Il laboratorio al discharge segnala sulfur content vicino al limite contrattuale.",choices:[{id:"retest-fuel",label:"Nomina un inspector indipendente",hint:"Costo $18.000 \xB7 protegge la posizione documentale",pnl:-18e3,days:2,reputation:2,result:"Il retest conferma la conformit\xE0 e il buyer accetta il cargo."},{id:"blend-fuel",label:"Organizza blending al terminal",hint:"Costo $42.000 \xB7 riduce rischio claim e ritardo",pnl:-42e3,days:3,reputation:3,result:"Il blending porta il prodotto pienamente in specifica."},{id:"waive-fuel",label:"Negozia uno sconto col buyer",hint:"Rapido \xB7 possibile forte riduzione del margine",random:!0,good:{pnl:-26e3,days:0,reputation:0,result:"Il buyer accetta un piccolo allowance."},bad:{pnl:-105e3,days:2,reputation:-5,result:"Il buyer applica un claim significativo per qualit\xE0."}}]}},{id:"brazil-coffee",origin:"santos",destination:"brescia",via:["genova"],commodity:"Coffee",quantity:600,capital:315e4,equity:47e4,basePnl:102e3,duration:38,risk:"Medio",riskClass:"medium",priceKey:"coffee",recommendedHedge:80,transportMode:"Container / Truck",title:"Santos Coffee Flow",description:"Origination di arabica brasiliana verso un buyer europeo. Quality differentials, FX e documenti phytosanitary sono centrali.",unlock:l=>ot("genova")&&l.completedDeals>=3&&l.reputation>=58,event:{dayRatio:.58,title:"Moisture deviation",text:"Il controllo rileva umidit\xE0 superiore al livello atteso su parte dei bag.",choices:[{id:"dry-coffee",label:"Recondition e asciugatura",hint:"Costo $21.000 \xB7 3 giorni \xB7 preserva qualit\xE0",pnl:-21e3,days:3,reputation:2,result:"Il lotto viene ricondizionato e consegnato in specifica."},{id:"discount-coffee",label:"Concedi quality allowance",hint:"Nessun ritardo \xB7 perdita commerciale incerta",random:!0,good:{pnl:-16e3,days:0,reputation:1,result:"Il buyer accetta un allowance limitato."},bad:{pnl:-54e3,days:0,reputation:-2,result:"Il buyer impone un forte differenziale qualitativo."}}]}},{id:"argentina-wheat",origin:"rosario",destination:"brescia",via:["genova"],commodity:"Wheat",quantity:5e3,capital:235e4,equity:35e4,basePnl:88e3,duration:31,risk:"Medio",riskClass:"medium",priceKey:"wheat",recommendedHedge:75,transportMode:"Handysize / Truck",title:"Paran\xE1 Wheat Parcel",description:"Grain origination dal Paran\xE1 verso il Nord Italia. Basis, protein content e river logistics determinano il risultato.",unlock:l=>ot("genova")&&l.completedDeals>=4&&l.reputation>=60,event:{dayRatio:.28,title:"Low river level",text:"Il livello del Paran\xE1 riduce il pescaggio disponibile e la quantit\xE0 caricabile.",choices:[{id:"lighten-wheat",label:"Riduci il parcel e acquista replacement",hint:"Costo $24.000 \xB7 protegge delivery quantity",pnl:-24e3,days:2,reputation:2,result:"La quantit\xE0 mancante viene coperta con un acquisto sostitutivo."},{id:"wait-river",label:"Attendi il miglioramento del fiume",hint:"5 giorni \xB7 possibile penale di laycan",random:!0,good:{pnl:-9e3,days:5,reputation:0,result:"Il livello risale e il carico parte completo."},bad:{pnl:-48e3,days:8,reputation:-3,result:"L\u2019attesa genera deadfreight e una consegna tardiva."}}]}},{id:"pilbara-iron",origin:"port-hedland",destination:"shanghai",via:[],commodity:"Iron ore",quantity:55e3,capital:74e5,equity:115e4,basePnl:245e3,duration:34,risk:"Alto",riskClass:"high",priceKey:"ironore",recommendedHedge:70,transportMode:"Panamax bulk carrier",title:"Pilbara\u2013Yangtze Ore",description:"Mega-cargo dry bulk verso la Cina. Freight, Fe grade, moisture e port congestion dominano il P&L.",unlock:l=>ot("singapore")&&l.completedDeals>=6&&l.reputation>=70,event:{dayRatio:.64,title:"Shanghai anchorage congestion",text:"La nave entra in coda e il laytime rischia di essere superato.",choices:[{id:"priority-ore",label:"Acquista discharge priority",hint:"Costo $36.000 \xB7 limita demurrage",pnl:-36e3,days:1,reputation:2,result:"Il terminal assegna una finestra prioritaria."},{id:"queue-ore",label:"Rimani in coda",hint:"Nessun costo iniziale \xB7 demurrage incerto",random:!0,good:{pnl:-18e3,days:3,reputation:0,result:"La coda si smaltisce pi\xF9 rapidamente del previsto."},bad:{pnl:-92e3,days:7,reputation:-4,result:"Il ritardo genera demurrage e claim del buyer."}}]}}],g={"baltic-copper":{supplierId:"baltic-metals",buyerId:"lombardia-cables"},"andean-copper":{supplierId:"andean-copper",buyerId:"lombardia-cables"},"meridian-copper":{supplierId:"meridian-resources",buyerId:"lombardia-cables"},"rotterdam-alloy":{supplierId:"northsea-alloys",buyerId:"lombardia-cables"},"maghreb-urea":{supplierId:"atlas-fertilizers",buyerId:"po-valley-agri"},"asia-aluminium":{supplierId:"meridian-resources",buyerId:"straits-fabrication"},"atlantic-diesel":{supplierId:"gulf-refining",buyerId:"ara-fuels"},"brazil-coffee":{supplierId:"santos-coffee",buyerId:"italia-roasters"},"argentina-wheat":{supplierId:"pampa-grains",buyerId:"po-valley-agri"},"pilbara-iron":{supplierId:"pilbara-mining",buyerId:"yangtze-steel"}},f=[{id:"lombardia-cables",name:"Lombardia Cables S.p.A.",type:"Buyer",country:"Italia",credit:84,reliability:89,kyc:"Approved",description:"Produttore industriale con domanda ricorrente di metalli e disciplina qualitativa elevata."},{id:"po-valley-agri",name:"Po Valley Agri Coop",type:"Buyer",country:"Italia",credit:72,reliability:80,kyc:"Approved",description:"Consorzio agricolo sensibile a puntualit\xE0, moisture analysis e stagionalit\xE0."},{id:"straits-fabrication",name:"Straits Fabrication Pte.",type:"Buyer",country:"Singapore",credit:88,reliability:86,kyc:"Approved",description:"Buyer asiatico investment-grade con forte disciplina documentale e pagamenti via LC."},{id:"baltic-metals",name:"Baltic Metals OU",type:"Supplier",country:"Estonia",credit:76,reliability:78,kyc:"Approved",description:"Fornitore rapido e flessibile, con qualit\xE0 documentale da monitorare."},{id:"andean-copper",name:"Andean Copper Ltd.",type:"Supplier",country:"Cile",credit:86,reliability:91,kyc:"Approved",description:"Produttore solido con accesso competitivo al rame cileno e transit time lungo."},{id:"meridian-resources",name:"Meridian Resources DMCC",type:"Supplier",country:"EAU",credit:61,reliability:67,kyc:"Enhanced review",description:"Trading counterparty aggressiva sul prezzo, ma con rischio compliance e struttura societaria complessa."},{id:"northsea-alloys",name:"NorthSea Alloys BV",type:"Supplier",country:"Paesi Bassi",credit:82,reliability:88,kyc:"Approved",description:"Warehouse operator e merchant europeo con accesso a LME stocks e barges."},{id:"atlas-fertilizers",name:"Atlas Fertilizers SA",type:"Supplier",country:"Marocco",credit:74,reliability:81,kyc:"Approved",description:"Produttore regionale di fertilizzanti con buona accessibilit\xE0 mediterranea."},{id:"gulf-refining",name:"Gulf Refining & Trading LLC",type:"Supplier",country:"USA",credit:87,reliability:89,kyc:"Approved",description:"Raffineria Gulf Coast con cargo program regolare e specifiche rigorose."},{id:"ara-fuels",name:"ARA Fuels BV",type:"Buyer",country:"Paesi Bassi",credit:90,reliability:91,kyc:"Approved",description:"Distributore europeo investment-grade attivo nel mercato dei distillati."},{id:"santos-coffee",name:"Santos Coffee Export SA",type:"Supplier",country:"Brasile",credit:78,reliability:83,kyc:"Approved",description:"Exporter brasiliano con network di cooperative e quality labs."},{id:"italia-roasters",name:"Italia Roasters Group",type:"Buyer",country:"Italia",credit:81,reliability:86,kyc:"Approved",description:"Torrefattore europeo sensibile a cup profile, moisture e tracciabilit\xE0."},{id:"pampa-grains",name:"Pampa Grains SA",type:"Supplier",country:"Argentina",credit:70,reliability:79,kyc:"Approved",description:"Origination house agricola sul corridoio del Paran\xE1."},{id:"pilbara-mining",name:"Pilbara Mining Ltd.",type:"Supplier",country:"Australia",credit:92,reliability:94,kyc:"Approved",description:"Produttore minerario di grandi volumi con loading discipline elevata."},{id:"yangtze-steel",name:"Yangtze Steel Group",type:"Buyer",country:"Cina",credit:85,reliability:84,kyc:"Approved",description:"Gruppo siderurgico con domanda di iron ore su scala Panamax."}],p={commercial:{competitive:{label:"Competitive quote",pnl:-14e3,acceptance:18},market:{label:"Market quote",pnl:0,acceptance:0},premium:{label:"Premium quote",pnl:22e3,acceptance:-24}},payment:{thirty:{label:"30 days after delivery",equityFactor:1.12,acceptance:9},delivery:{label:"Payment at delivery",equityFactor:1,acceptance:0},prepay:{label:"20% advance",equityFactor:.8,acceptance:-16}},delivery:{priority:{label:"Priority window",duration:-3,pnl:-9e3,acceptance:10},standard:{label:"Standard window",duration:0,pnl:0,acceptance:0},flexible:{label:"Flexible window",duration:4,pnl:7e3,acceptance:-9}}},b={revolver:{label:"Revolving credit facility",equityFactor:1,pnl:0,rate:.075,acceptance:0,description:"Flessibile, ma assorbe credit line e genera interessi giornalieri."},lc:{label:"LC-backed trade finance",equityFactor:.82,pnl:-6e3,rate:.064,acceptance:4,description:"Riduce equity e rischio di pagamento attraverso documenti conformi."},inventory:{label:"Borrowing-base / inventory finance",equityFactor:.66,pnl:-13e3,rate:.082,acceptance:1,requiresStaff:"trade-finance-manager",description:"Funding efficiente garantito dal cargo e dai receivables."},balance:{label:"Own balance sheet",equityFactor:1.85,pnl:8e3,rate:.025,acceptance:0,description:"Pi\xF9 equity, meno dipendenza bancaria e maggiore flessibilit\xE0."}},y={basic:{label:"Basic cargo cover",pnl:-2500,lossFactor:1,description:"Copertura minima su perdita fisica e general average."},allrisk:{label:"All-risk + delay cover",pnl:-9e3,lossFactor:.55,description:"Protezione pi\xF9 ampia su danni, ritardi e deviazioni."},self:{label:"Self-insured retention",pnl:3e3,lossFactor:1.35,description:"Margine maggiore, ma il desk trattiene pi\xF9 rischio."}},S={none:{label:"Supplier certificates only",pnl:3500,readiness:-8,lossFactor:1.25,description:"Costo minimo, forte dipendenza dai documenti del supplier."},standard:{label:"Standard load-port inspection",pnl:-4e3,readiness:2,lossFactor:.9,description:"Controllo quantit\xE0 e qualit\xE0 al porto di carico."},independent:{label:"Independent load & discharge survey",pnl:-12e3,readiness:9,lossFactor:.62,description:"Doppio controllo indipendente e migliore posizione nei claims."}},x=[{id:"alpine-bank",name:"Alpine Trade Bank",type:"Revolver",limitShare:.55,rate:.075,relationship:68,description:"Banca principale per working capital e hedge liquidity."},{id:"mercantile",name:"Mercantile Commodity Finance",type:"LC / borrowing base",limitShare:.3,rate:.066,relationship:58,description:"Specialista in documentary trade e inventory finance."},{id:"oceanic",name:"Oceanic Bank Asia",type:"Regional LC",limitShare:.15,rate:.071,relationship:50,description:"Capacit\xE0 regionale disponibile dopo l\u2019apertura di Singapore."}],M=[{id:"deal-anatomy",title:"Anatomia di un physical deal",concept:"Un deal collega acquisto, vendita, funding, hedge, logistica e settlement. Il margine commerciale non \xE8 il P&L finale.",question:"Quale costo pu\xF2 trasformare un buon gross margin in una perdita?",options:["Solo il prezzo spot","Freight, finance, claims e demurrage","Nessuno se il buyer ha accettato"],correct:1},{id:"hedge-margin",title:"Hedging e margin calls",concept:"L\u2019hedge riduce il flat-price risk, ma un future short pu\xF2 richiedere liquidit\xE0 quando il prezzo sale.",question:"Un cargo perfettamente hedged pu\xF2 comunque creare una crisi di liquidit\xE0?",options:["S\xEC, per variation margin","No, l\u2019hedge elimina ogni rischio","Solo con Incoterm DDP"],correct:0},{id:"trade-finance",title:"Trade finance",concept:"LC, revolving facilities e borrowing base modificano equity, costo e rischio di pagamento.",question:"Cosa paga una banca sotto una LC documentaria?",options:["La qualit\xE0 economica del deal","Documenti conformi ai termini della LC","La reputazione del trader"],correct:1},{id:"incoterms",title:"Incoterms e transfer of risk",concept:"Gli Incoterms allocano costi, responsabilit\xE0 e passaggio del rischio logistico; non determinano automaticamente il titolo di propriet\xE0.",question:"Con FOB, chi normalmente organizza il main ocean freight?",options:["Il buyer","Il seller fino alla destinazione finale","La banca"],correct:0},{id:"shipping",title:"Laytime e demurrage",concept:"Laytime \xE8 il tempo contrattualmente concesso per operazioni portuali; il demurrage \xE8 il costo per il tempo eccedente.",question:"Quando nasce tipicamente il demurrage?",options:["Quando il prezzo scende","Quando il laytime utilizzato supera quello consentito","Quando manca un futures hedge"],correct:1},{id:"quality-docs",title:"Qualit\xE0, documenti e claims",concept:"Certificates, survey e corretta descrizione documentale proteggono settlement e capacit\xE0 di contestare claims.",question:"Quale scelta rafforza maggiormente la posizione in un claim qualitativo?",options:["Nessuna ispezione","Survey indipendente a load e discharge port","Aumentare il credit limit"],correct:1}],E=[["Basis risk","Rischio che prezzo fisico e strumento di hedge non si muovano perfettamente insieme."],["Bill of Lading","Documento di trasporto marittimo, ricevuta del cargo e spesso documento rappresentativo della merce."],["Borrowing base","Linea calcolata sul valore eleggibile di inventory e receivables."],["Demurrage","Importo dovuto quando le operazioni superano il laytime contrattuale."],["Flat-price risk","Esposizione alla variazione assoluta del prezzo della commodity."],["Laycan","Finestra entro cui la nave deve presentarsi pronta al carico."],["Letter of Credit","Impegno bancario a pagare contro presentazione di documenti conformi."],["Premium","Differenziale del prezzo fisico rispetto a benchmark/future."],["Quality allowance","Sconto negoziato per merce fuori specifica o con qualit\xE0 inferiore."],["Variation margin","Flusso giornaliero di liquidit\xE0 dovuto alla variazione del valore dei futures."]],C=[{id:"suez-disruption",title:"Suez transit disruption",region:"Middle East / Mediterranean",severity:"high",duration:8,description:"Transit restrictions increase voyage time and freight for Gulf-origin ocean cargoes.",freightShock:9,affects:l=>l.origin==="dubai"&&Lt(l)==="ocean",dealDays:4,dealPnl:-14e3},{id:"genoa-strike",title:"Genoa terminal strike",region:"Northern Italy",severity:"medium",duration:6,description:"Reduced shifts create congestion, storage pressure and uncertain discharge windows.",freightShock:3,affects:l=>(l.via||[]).includes("genova"),dealDays:3,dealPnl:-9e3},{id:"copper-rally",title:"Copper supply squeeze",region:"Global metals",severity:"high",duration:7,description:"A supply shock pushes copper higher and increases variation-margin pressure.",commodity:"copper",dailyDrift:42,affects:l=>l.priceKey==="copper",dealDays:0,dealPnl:0},{id:"bank-tightening",title:"Trade-finance tightening",region:"Global banking",severity:"medium",duration:9,description:"Banks temporarily reduce unsecured capacity and demand more equity on new transactions.",creditPenalty:75e4,equityFactor:1.12,affects:()=>!0,dealDays:0,dealPnl:0},{id:"med-weather",title:"Severe Mediterranean weather",region:"Mediterranean",severity:"medium",duration:5,description:"Port rotations slow and short-sea freight becomes more expensive.",freightShock:6,affects:l=>Lt(l)==="ocean"&&((l.via||[]).includes("genova")||l.origin==="casablanca"),dealDays:2,dealPnl:-6e3},{id:"atlantic-hurricane",title:"Atlantic hurricane risk",region:"Atlantic basin",severity:"high",duration:7,description:"Weather reroutes tankers and container vessels, lifting freight and insurance.",freightShock:11,affects:l=>["houston","santos"].includes(l.origin),dealDays:4,dealPnl:-18e3},{id:"grain-drought",title:"South American grain drought",region:"South America",severity:"high",duration:8,description:"Crop expectations deteriorate, increasing wheat and coffee volatility.",commodity:"wheat",dailyDrift:3.2,affects:l=>["wheat","coffee"].includes(l.priceKey),dealDays:1,dealPnl:-5e3},{id:"china-steel-surge",title:"Chinese steel restocking",region:"North Asia",severity:"medium",duration:7,description:"Steel mills accelerate purchases, lifting iron ore and dry-bulk demand.",commodity:"ironore",dailyDrift:1.7,freightShock:5,affects:l=>l.priceKey==="ironore",dealDays:2,dealPnl:8e3}],L={"baltic-copper":{carrier:"Baltic Rail 7",mode:"Intermodal rail / truck",booking:"Confirmed",warehouse:"Brescia Cross-Dock",warehouseHub:"brescia",storageDays:2,purchaseTerms:"DAP Brescia \xB7 LME M+1 + premium",salesTerms:"DDP Brescia \xB7 30 days",documentSet:["Commercial invoice","Packing list","Quality certificate","Certificate of origin","CMR / rail note","Insurance certificate","Customs release"]},"andean-copper":{carrier:"MV Aurora Star",mode:"Supramax / truck",booking:"Firm charter",warehouse:"Genoa Metal Terminal",warehouseHub:"genova",storageDays:5,purchaseTerms:"FOB San Antonio \xB7 LME 3M + premium",salesTerms:"DDP Brescia \xB7 30 days",documentSet:["Commercial invoice","Packing list","Quality certificate","Certificate of origin","Bill of lading","Insurance certificate","Customs release"]},"meridian-copper":{carrier:"MV Meridian Ace",mode:"Handysize / truck",booking:"Subject to LC",warehouse:"Genoa Bonded Warehouse",warehouseHub:"genova",storageDays:7,purchaseTerms:"CIF Genoa \xB7 LC at sight",salesTerms:"DDP Brescia \xB7 30 days",documentSet:["Commercial invoice","Packing list","Quality certificate","Certificate of origin","Bill of lading","Insurance certificate","Customs release","LC compliance"]},"rotterdam-alloy":{carrier:"Rhine Barge 22",mode:"Barge / rail",booking:"Confirmed",warehouse:"Rotterdam LME Warehouse",warehouseHub:"rotterdam",storageDays:4,purchaseTerms:"FCA Rotterdam \xB7 LME cash + premium",salesTerms:"DAP Brescia \xB7 15 days",documentSet:["Commercial invoice","Packing list","Quality certificate","Warehouse release","CMR / rail note","Insurance certificate","Customs release"]},"maghreb-urea":{carrier:"MV Atlas Coast",mode:"Coaster / truck",booking:"Firm booking",warehouse:"Genoa Fertilizer Terminal",warehouseHub:"genova",storageDays:4,purchaseTerms:"FOB Jorf Lasfar \xB7 Fertilizer index + premium",salesTerms:"DAP Brescia \xB7 payment at delivery",documentSet:["Commercial invoice","Packing list","Quality certificate","Certificate of origin","Bill of lading","Insurance certificate","Customs release","Moisture analysis"]},"asia-aluminium":{carrier:"MV Eastern Bridge",mode:"Multipurpose vessel",booking:"Subject to clean LC",warehouse:"Singapore Metal Terminal",warehouseHub:"singapore",storageDays:3,purchaseTerms:"FCA Jebel Ali \xB7 LME 3M + premium",salesTerms:"CIF Singapore \xB7 LC at sight",documentSet:["Commercial invoice","Packing list","Quality certificate","Certificate of origin","Bill of lading","Insurance certificate","LC compliance","Terminal release"]},"atlantic-diesel":{carrier:"MT Gulf Horizon",mode:"MR product tanker",booking:"Subjects lifted",warehouse:"Rotterdam Independent Tank Terminal",warehouseHub:"rotterdam",storageDays:5,purchaseTerms:"FOB Houston \xB7 Platts-linked",salesTerms:"CIF Rotterdam \xB7 10 days",documentSet:["Commercial invoice","Certificate of quality","Certificate of quantity","Certificate of origin","Bill of lading","Cargo manifest","Insurance certificate","Customs release"]},"brazil-coffee":{carrier:"Atlantic Container Line",mode:"Container / truck",booking:"Confirmed",warehouse:"Genoa Food Grade Warehouse",warehouseHub:"genova",storageDays:6,purchaseTerms:"FOB Santos \xB7 ICE differential",salesTerms:"DAP Brescia \xB7 20 days",documentSet:["Commercial invoice","Packing list","Quality certificate","Phytosanitary certificate","Certificate of origin","Bill of lading","Insurance certificate","Customs release"]},"argentina-wheat":{carrier:"MV Paran\xE1 Trader",mode:"Handysize bulk carrier",booking:"Firm booking",warehouse:"Genoa Grain Terminal",warehouseHub:"genova",storageDays:4,purchaseTerms:"FOB Upriver \xB7 MATIF basis",salesTerms:"DAP Brescia \xB7 payment at delivery",documentSet:["Commercial invoice","Weight certificate","Protein certificate","Phytosanitary certificate","Certificate of origin","Bill of lading","Insurance certificate","Customs release"]},"pilbara-iron":{carrier:"MV Southern Cape",mode:"Panamax bulk carrier",booking:"Firm charter",warehouse:"Shanghai Bulk Terminal",warehouseHub:"shanghai",storageDays:2,purchaseTerms:"FOB Port Hedland \xB7 index-linked",salesTerms:"CFR Shanghai \xB7 LC at sight",documentSet:["Commercial invoice","Draft survey","Fe assay certificate","Moisture certificate","Certificate of origin","Bill of lading","Insurance certificate","LC compliance"]}},w=[{id:"ocean-pioneer",name:"MV Ocean Pioneer",vesselClass:"Handysize",capacity:32e3,transportClass:"ocean",homeHub:"santiago",charterDays:75,charterCost:95e3,bonusPnl:22e3,durationBonus:4,minReputation:50,minDeals:0,description:"Handysize versatile per rotte transatlantiche. Riduce dipendenza dal mercato spot e accelera l\u2019execution."},{id:"gulf-navigator",name:"MV Gulf Navigator",vesselClass:"Multipurpose",capacity:18e3,transportClass:"ocean",homeHub:"dubai",charterDays:60,charterCost:75e3,bonusPnl:18e3,durationBonus:3,minReputation:52,minDeals:1,description:"Multipurpose vessel posizionata nel Golfo, adatta a parcel cargo e rotte verso il Mediterraneo."},{id:"rhine-link",name:"Rhine Link 22",vesselClass:"River barge",capacity:2200,transportClass:"barge",homeHub:"rotterdam",charterDays:45,charterCost:38e3,bonusPnl:12e3,durationBonus:2,minReputation:58,minDeals:2,requiresOffice:"rotterdam",description:"Chiatta fluviale per corridoi Reno\u2013Alpi. Ideale per metalli e warehouse release da Rotterdam."},{id:"atlas-coaster",name:"MV Atlas Coaster",vesselClass:"Coaster",capacity:8500,transportClass:"ocean",homeHub:"casablanca",charterDays:40,charterCost:46e3,bonusPnl:13e3,durationBonus:2,minReputation:56,minDeals:2,requiresOffice:"genova",description:"Coaster mediterranea per parcel di fertilizzanti e metalli tra Nord Africa e Sud Europa."},{id:"eastern-merchant",name:"MV Eastern Merchant",vesselClass:"Multipurpose",capacity:22e3,transportClass:"ocean",homeHub:"dubai",charterDays:55,charterCost:86e3,bonusPnl:2e4,durationBonus:3,minReputation:68,minDeals:5,requiresOffice:"singapore",description:"Asset regionale per il corridoio Golfo\u2013Asia, con flessibilit\xE0 su parcel cargo e port rotations."},{id:"gulf-product-tanker",name:"MT Shippy Horizon",vesselClass:"MR product tanker",capacity:47e3,transportClass:"ocean",homeHub:"houston",charterDays:55,charterCost:165e3,bonusPnl:46e3,durationBonus:3,minReputation:64,minDeals:3,requiresOffice:"rotterdam",description:"Tanker dedicata ai distillati Gulf Coast\u2013ARA, con tank segregation e vetting completo."},{id:"parana-handy",name:"MV River Plata",vesselClass:"Handysize bulker",capacity:33e3,transportClass:"ocean",homeHub:"rosario",charterDays:48,charterCost:92e3,bonusPnl:26e3,durationBonus:2,minReputation:61,minDeals:4,requiresOffice:"genova",description:"Handysize per grain parcels e porti con limiti di pescaggio."},{id:"pilbara-panamax",name:"MV Iron Meridian",vesselClass:"Panamax bulker",capacity:76e3,transportClass:"ocean",homeHub:"port-hedland",charterDays:52,charterCost:21e4,bonusPnl:62e3,durationBonus:3,minReputation:72,minDeals:6,requiresOffice:"singapore",description:"Panamax dedicata a dry-bulk trades Australia\u2013North Asia."}],k=[{id:"geneva",name:"Geneva HQ",hub:"geneva",cost:0,dailyCost:900,minReputation:0,minDeals:0,description:"Capitale, risk management, compliance e relazioni bancarie del gruppo.",benefit:"Centro decisionale della trading house."},{id:"genova",name:"Genoa Operations Desk",hub:"genova",cost:12e4,dailyCost:650,minReputation:54,minDeals:1,description:"Team locale per port calls, customs, storage e last-mile verso il Nord Italia.",benefit:"Sblocca fertilizer trading e riduce di 2 giorni le rotte marittime via Genova."},{id:"rotterdam",name:"Rotterdam Metals Desk",hub:"rotterdam",cost:24e4,dailyCost:1e3,minReputation:58,minDeals:2,description:"Accesso diretto a warehouse, barges e clienti industriali del Nord Europa.",benefit:"Sblocca Rhine\u2013Alps Alloy e riduce i costi charter del 5%."},{id:"singapore",name:"Singapore Asia Desk",hub:"singapore",cost:48e4,dailyCost:1800,minReputation:68,minDeals:5,description:"Piattaforma asiatica per metalli, freight, trade finance e client coverage regionale.",benefit:"Sblocca il mercato asiatico e Gulf\u2013Asia Aluminium."}],W=[{id:"operations-coordinator",role:"Operations Coordinator",hireCost:45e3,dailySalary:250,minReputation:50,description:"Coordina documenti, terminal, customs e delivery windows.",benefit:"Expedite documents costa il 40% in meno e +5 punti di readiness."},{id:"risk-analyst",role:"Risk Analyst",hireCost:6e4,dailySalary:320,minReputation:54,description:"Controlla hedge, concentrazione, liquidity buffer e limiti del desk.",benefit:"Riduce il risk score e i costi di re-hedging del 35%."},{id:"freight-charterer",role:"Freight Charterer",hireCost:55e3,dailySalary:300,minReputation:56,description:"Negozia time charter, laycan, demurrage e alternative di rotta.",benefit:"Riduce del 15% l\u2019upfront hire delle navi."},{id:"trade-finance-manager",role:"Trade Finance Manager",hireCost:75e3,dailySalary:420,minReputation:60,description:"Struttura LC, borrowing base e working-capital facilities.",benefit:"Aumenta la linea di credito di $1M e riduce del 10% l\u2019equity richiesta."}],G=[{id:"atacama-copper",chain:"upstream",name:"Atacama Copper Mine",hub:"santiago",icon:"\u26CF",commodity:"Copper",maxLevel:3,baseCost:26e4,buildDays:7,dailyIncome:1800,pnlBonus:9500,equityReduction:.025,minReputation:50,minDeals:0,description:"Offtake minerario e quota di produzione. Riduce il costo di sourcing del rame e garantisce flussi fisici prioritari."},{id:"atlas-urea-plant",chain:"upstream",name:"Atlas Urea Production",hub:"casablanca",icon:"\u25C6",commodity:"Urea",maxLevel:3,baseCost:34e4,buildDays:9,dailyIncome:2300,pnlBonus:12e3,equityReduction:.02,minReputation:55,minDeals:1,description:"Partecipazione industriale nella produzione di urea, con accesso preferenziale a volumi mediterranei."},{id:"santos-estate",chain:"upstream",name:"Santos Coffee Estate",hub:"santos",icon:"\u2668",commodity:"Coffee",maxLevel:3,baseCost:39e4,buildDays:10,dailyIncome:2800,pnlBonus:14500,equityReduction:.02,minReputation:61,minDeals:3,description:"Origination captive, quality control e tracciabilit\xE0 sulla filiera del caff\xE8 brasiliano."},{id:"permian-production",chain:"upstream",name:"Permian Production Interest",hub:"houston",icon:"\u25C9",commodity:"Diesel",priceKey:"crude",maxLevel:3,baseCost:62e4,buildDays:14,dailyIncome:4500,pnlBonus:22e3,equityReduction:.018,minReputation:66,minDeals:4,description:"Working interest energetico che migliora feedstock access e margine sui prodotti raffinati."},{id:"genoa-terminal",chain:"midstream",name:"Genoa Multipurpose Terminal",hub:"genova",icon:"\u25A4",routeHub:"genova",maxLevel:3,baseCost:22e4,buildDays:6,dailyIncome:1600,pnlBonus:6e3,durationBonus:1,minReputation:52,minDeals:1,description:"Berth priority, customs handling e storage dedicato per i cargo diretti al Nord Italia."},{id:"rotterdam-tanks",chain:"midstream",name:"Rotterdam Storage & Blending",hub:"rotterdam",icon:"\u25A5",routeHub:"rotterdam",maxLevel:3,baseCost:47e4,buildDays:11,dailyIncome:3400,pnlBonus:11e3,durationBonus:1,minReputation:60,minDeals:2,description:"Tankage, warehouse receipts e blending optionality nel principale hub europeo."},{id:"ocean-logistics-pool",chain:"midstream",name:"Ocean Logistics Pool",hub:"geneva",icon:"\u25C8",ocean:!0,maxLevel:3,baseCost:36e4,buildDays:8,dailyIncome:2100,pnlBonus:7500,durationBonus:1,minReputation:57,minDeals:2,description:"Pool di capacit\xE0 marittima e contratti COA che riduce freight volatility e transit time."},{id:"brescia-cable-mill",chain:"downstream",name:"Brescia Cable Mill",hub:"brescia",icon:"\u2301",commodities:["Copper","Aluminium"],destination:"brescia",maxLevel:3,baseCost:31e4,buildDays:8,dailyIncome:2600,pnlBonus:13500,acceptanceBonus:3,minReputation:54,minDeals:1,description:"Domanda captive e conversion margin su rame e alluminio. Stabilizza le vendite e aumenta il valore per tonnellata."},{id:"po-valley-distribution",chain:"downstream",name:"Po Valley Fertilizer Network",hub:"brescia",icon:"\u2726",commodity:"Urea",destination:"brescia",maxLevel:3,baseCost:28e4,buildDays:7,dailyIncome:2200,pnlBonus:10500,acceptanceBonus:4,minReputation:58,minDeals:2,description:"Rete distributiva agricola con magazzini locali e domanda stagionale proprietaria."},{id:"ara-fuel-blending",chain:"downstream",name:"ARA Fuel Blending Plant",hub:"rotterdam",icon:"\u25EB",commodity:"Diesel",priceKey:"crude",destination:"rotterdam",maxLevel:3,baseCost:54e4,buildDays:12,dailyIncome:4100,pnlBonus:20500,acceptanceBonus:3,minReputation:65,minDeals:4,description:"Blending e specification management trasformano feedstock in prodotti vendibili ad alto margine."},{id:"italian-roastery",chain:"downstream",name:"Italian Roastery Group",hub:"brescia",icon:"\u2615",commodity:"Coffee",destination:"brescia",maxLevel:3,baseCost:43e4,buildDays:10,dailyIncome:3300,pnlBonus:17e3,acceptanceBonus:3,minReputation:64,minDeals:4,description:"Capacit\xE0 di torrefazione e branded distribution per catturare margine downstream sulla filiera coffee."},{id:"yangtze-steel-interest",chain:"downstream",name:"Yangtze Steel Mill Interest",hub:"shanghai",icon:"\u25B0",commodity:"Iron ore",destination:"shanghai",maxLevel:3,baseCost:78e4,buildDays:16,dailyIncome:5900,pnlBonus:3e4,acceptanceBonus:2,minReputation:72,minDeals:6,description:"Quota industriale siderurgica che crea domanda captive per grandi cargo di iron ore."}],H=[{id:"first-cargo",title:"First Cargo",description:"Completa il primo physical deal.",target:1,progress:l=>l.completedDeals,achieved:l=>l.completedDeals>=1,cash:4e4,reputation:2},{id:"risk-discipline",title:"Risk Discipline",description:"Chiudi un deal profittevole con hedge almeno all\u201980%.",target:1,progress:l=>l.history.filter(h=>h.pnl>0&&(h.hedgeRatio||0)>=80).length,achieved:l=>l.history.some(h=>h.pnl>0&&(h.hedgeRatio||0)>=80),cash:55e3,reputation:2},{id:"fleet-operator",title:"Fleet Operator",description:"Completa un deal utilizzando una nave in time charter.",target:1,progress:l=>l.history.filter(h=>h.shippingStrategy==="internal-fleet").length,achieved:l=>l.history.some(h=>h.shippingStrategy==="internal-fleet"),cash:75e3,reputation:3},{id:"european-network",title:"European Network",description:"Apri i desk di Genova e Rotterdam.",target:2,progress:l=>["genova","rotterdam"].filter(h=>ot(h)).length,achieved:l=>ot("genova")&&ot("rotterdam"),cash:1e5,credit:5e5,reputation:3},{id:"relationship-builder",title:"Relationship Builder",description:"Completa almeno tre deal e porta una relazione commerciale sopra 60.",target:4,progress:l=>Math.min(3,l.completedDeals)+(Object.values(l.counterparties||{}).some(h=>h.relationship>=60)?1:0),achieved:l=>l.completedDeals>=3&&Object.values(l.counterparties||{}).some(h=>h.relationship>=60),cash:85e3,reputation:3},{id:"crisis-tested",title:"Crisis Tested",description:"Completa un deal colpito da una dislocazione globale.",target:1,progress:l=>l.history.filter(h=>(h.globalEventImpacts||[]).length).length,achieved:l=>l.history.some(h=>(h.globalEventImpacts||[]).length),cash:9e4,reputation:3},{id:"academy-graduate",title:"Academy Graduate",description:"Completa tutte le lezioni della SHIPPY Academy.",target:M.length,progress:l=>Object.values(l.academyProgress||{}).filter(h=>h.completed).length,achieved:l=>Object.values(l.academyProgress||{}).filter(h=>h.completed).length>=M.length,cash:12e4,reputation:4},{id:"multi-commodity",title:"Multi-Commodity Merchant",description:"Chiudi deal in almeno tre commodity differenti.",target:3,progress:l=>new Set((l.history||[]).map(h=>h.commodity)).size,achieved:l=>new Set((l.history||[]).map(h=>h.commodity)).size>=3,cash:14e4,reputation:4},{id:"liquidity-professional",title:"Liquidity Professional",description:"Chiudi in profitto un deal che ha richiesto almeno una margin call.",target:1,progress:l=>(l.history||[]).filter(h=>h.pnl>0&&(h.marginCalls||0)>0).length,achieved:l=>(l.history||[]).some(h=>h.pnl>0&&(h.marginCalls||0)>0),cash:11e4,credit:35e4,reputation:3},{id:"top-ten-merchant",title:"Top 10 Merchant",description:"Entra nella top 10 della Career League dopo almeno tre deal chiusi.",target:10,progress:l=>l.completedDeals<3?0:Math.max(0,11-ol("overall")),achieved:l=>l.completedDeals>=3&&ol("overall")<=10,cash:15e4,reputation:4},{id:"vertical-pioneer",title:"Vertical Pioneer",description:"Costruisci almeno un asset upstream, uno midstream e uno downstream.",target:3,progress:l=>["upstream","midstream","downstream"].filter(h=>G.some(m=>m.chain===h&&zi(m.id)>0)).length,achieved:l=>["upstream","midstream","downstream"].every(h=>G.some(m=>m.chain===h&&zi(m.id)>0)),cash:18e4,reputation:5},{id:"industrial-empire",title:"Industrial Empire",description:"Raggiungi complessivamente 10 livelli di asset industriali.",target:10,progress:l=>lr(),achieved:l=>lr()>=10,cash:3e5,credit:5e5,reputation:6},{id:"global-desk",title:"Global Desk",description:"Apri Singapore e completa almeno cinque deal.",target:6,progress:l=>Math.min(5,l.completedDeals)+(ot("singapore")?1:0),achieved:l=>ot("singapore")&&l.completedDeals>=5,cash:2e5,reputation:5}],q=[[[-168,72],[-140,70],[-125,55],[-123,40],[-112,30],[-97,18],[-83,10],[-76,18],[-81,27],[-72,42],[-60,49],[-54,57],[-72,65],[-100,72],[-130,72]],[[-82,12],[-72,8],[-62,-4],[-52,-12],[-47,-25],[-55,-40],[-68,-55],[-76,-46],[-76,-30],[-81,-12]],[[-18,36],[-7,36],[5,32],[16,32],[31,31],[42,13],[51,11],[48,-8],[39,-22],[29,-35],[17,-35],[8,-27],[-2,-5],[-17,14]],[[-11,36],[2,44],[15,49],[28,48],[42,54],[62,55],[80,60],[100,56],[118,49],[136,54],[153,48],[170,58],[178,50],[160,35],[142,24],[122,16],[105,5],[92,9],[80,22],[64,28],[52,35],[39,38],[28,35],[18,42],[5,43]],[[110,-10],[126,-11],[141,-18],[151,-30],[145,-41],[129,-43],[115,-35],[111,-23]],[[-52,83],[-28,81],[-18,70],[-30,59],[-48,60],[-63,70]],[[-180,-70],[-140,-73],[-100,-72],[-60,-75],[-20,-71],[20,-74],[60,-72],[100,-75],[140,-72],[180,-70],[180,-90],[-180,-90]]].map(l=>op(l)),se=new Map;function ee(){return{version:11,profileName:"Giorgio Bonetta",companyName:"SHIPPY Trading",leaderboardSnapshots:[],investments:{},constructionQueue:[],assetIncome:0,date:"2026-09-01T00:00:00.000Z",cash:1e6,creditLimit:6e6,reputation:50,realizedPnl:0,completedDeals:0,activeDeals:[],fleetAssets:[],offices:["geneva"],staff:[],completedMissions:[],overheadPaid:0,history:[],navHistory:[1e6,1e6,1e6],copperPrice:9500,copperPrev:9500,aluminiumPrice:2450,aluminiumPrev:2450,ureaPrice:360,ureaPrev:360,eurusd:1.1,eurusdPrev:1.1,freightIndex:100,freightPrev:100,crudePrice:78.5,crudePrev:78.5,wheatPrice:245,wheatPrev:245,ironorePrice:108,ironorePrev:108,coffeePrice:4200,coffeePrev:4200,sequence:1,dayIndex:0,marketCycle:1,marketCycleDay:0,negotiations:{},counterparties:{},activeGlobalEvents:[],worldEventFeed:[],nextGlobalEventDay:6,difficulty:"standard",onboardingComplete:!1,academyProgress:{},academyScore:0,marginCalls:0,emergencyFundingCost:0,totalInterestPaid:0}}function Z(){try{let l=localStorage.getItem(a);if(!l){for(let T of s)if(l=localStorage.getItem(T),l)break}if(!l)return ee();let h=JSON.parse(l);if(![3,4,5,6,7,8,9,10,11].includes(h.version))return ee();let m={...ee(),...h,version:11};return m.offices=[...new Set(["geneva",...m.offices||[]])],m.staff=m.staff||[],m.completedMissions=m.completedMissions||[],m.negotiations=m.negotiations||{},m.counterparties=m.counterparties||{},m.activeGlobalEvents=m.activeGlobalEvents||[],m.worldEventFeed=m.worldEventFeed||[],m.dayIndex=m.dayIndex||0,m.marketCycle=m.marketCycle||1,m.marketCycleDay=m.marketCycleDay||0,m.nextGlobalEventDay=m.nextGlobalEventDay||6,m.academyProgress=m.academyProgress||{},m.academyScore=m.academyScore||0,m.marginCalls=m.marginCalls||0,m.emergencyFundingCost=m.emergencyFundingCost||0,m.totalInterestPaid=m.totalInterestPaid||0,m.profileName=m.profileName||"Giorgio Bonetta",m.companyName=m.companyName||"SHIPPY Trading",m.leaderboardSnapshots=m.leaderboardSnapshots||[],m.investments=m.investments||{},m.constructionQueue=m.constructionQueue||[],m.assetIncome=m.assetIncome||0,m.difficulty=m.difficulty||"standard",h.version<8&&(m.onboardingComplete=!0),m.activeDeals=(m.activeDeals||[]).map(T=>gt(T)),m.fleetAssets=(m.fleetAssets||[]).filter(T=>w.some(P=>P.id===T.catalogId)),m}catch{return ee()}}let v=Z();na(),v.activeDeals=v.activeDeals.map(gt);let $={type:"hub",id:"geneva"},ue="portfolio",_e="overall",Ne=Object.fromEntries(d.map(l=>[l.id,l.recommendedHedge||100])),Ae=Object.fromEntries(d.map(l=>[l.id,"spot"])),Pe=Object.fromEntries(d.map(l=>[l.id,"revolver"])),he=Object.fromEntries(d.map(l=>[l.id,"basic"])),Me=Object.fromEntries(d.map(l=>[l.id,"standard"])),ye=Object.fromEntries(d.map(l=>[l.id,["geneva","brescia","genova","rotterdam"].includes(l.destination)?80:100])),Te=Object.fromEntries(d.map(l=>[l.id,null])),Ue={opportunities:!0,portfolio:!0,risk:!1,logistics:!0},oe=0,F=null,A=null,N=r("#globeCanvas"),V=r("#earthCanvas"),_=N.getContext("2d"),z=Math.min(window.devicePixelRatio||1,2),O={lon:6,lat:18,zoom:1,targetLon:null,targetLat:null},I=null,j=null,J=null,re=null,me=null,Ie=null,Re=null,xe=null,He=!1,de=new U,ve=new U;function fe(l,h,m=1){let T=h*n,P=l*n;return new U(m*Math.cos(T)*Math.cos(P),m*Math.sin(T),-m*Math.cos(T)*Math.sin(P))}function Ee(){let h=new Float32Array(5400);for(let P=0;P<1800;P+=1){let D=5+Math.random()*11,B=Math.random()*Math.PI*2,ne=Math.random()*2-1,Q=Math.sqrt(1-ne*ne);h[P*3]=D*Q*Math.cos(B),h[P*3+1]=D*ne,h[P*3+2]=D*Q*Math.sin(B)}let m=new _t;m.setAttribute("position",new ii(h,3));let T=new Nr({color:13164020,size:.018,transparent:!0,opacity:.72,depthWrite:!1,sizeAttenuation:!0});return new wa(m,T)}function ht(){try{I=new tl({canvas:V,antialias:!0,alpha:!0,powerPreference:"high-performance"}),I.setPixelRatio(z),I.outputColorSpace=jt,I.toneMapping=Xa,I.toneMappingExposure=1.02,I.setClearColor(132362,0),j=new Ma,j.fog=new ba(132362,.018),J=new On(-1,1,1,-1,.1,50);let l=new kr;l.onLoad=()=>{He=!0,r("#earthLoading")?.classList.add("loaded")},l.onError=()=>{r("#earthLoading strong").textContent="Earth texture fallback"};let h=new Ga(l),m=h.load("assets/earth_atmos_2048.jpg"),T=h.load("assets/earth_normal_2048.jpg"),P=h.load("assets/earth_specular_2048.jpg"),D=h.load("assets/earth_clouds_1024.png"),B=h.load("assets/earth_lights_2048.png");m.colorSpace=jt,B.colorSpace=jt,[m,T,P,D,B].forEach(ct=>{ct.anisotropy=Math.min(8,I.capabilities.getMaxAnisotropy())});let ne=new Un(1,128,96),Q=new Br({map:m,normalMap:T,normalScale:new pe(.58,.58),specularMap:P,specular:new $e(3365490),shininess:18,emissive:new $e(16777215),emissiveMap:B,emissiveIntensity:.16});re=new $t(ne,Q),j.add(re);let te=new Br({map:D,alphaMap:D,color:16777215,transparent:!0,opacity:.28,depthWrite:!1,side:Ri});me=new $t(new Un(1.009,128,96),te),j.add(me);let le=new ni({transparent:!0,side:Qt,blending:qa,depthWrite:!1,uniforms:{glowColor:{value:new $e(4962559)}},vertexShader:`
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform vec3 glowColor;
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          void main() {
            vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
            float fresnel = pow(max(0.0, 0.64 - dot(vNormal, viewDirection)), 3.4);
            gl_FragColor = vec4(glowColor, fresnel * 0.34);
          }
        `});Ie=new $t(new Un(1.038,128,96),le),j.add(Ie),j.add(new Va(10406896,463133,.78)),xe=new Hr(16777215,2.35),xe.position.set(4.5,2.4,5.2),j.add(xe);let Le=new Hr(4099327,.65);Le.position.set(-4,1.2,-3),j.add(Le),Re=Ee(),j.add(Re)}catch(l){console.warn("WebGL Earth fallback",l),document.body.classList.add("webgl-fallback"),r("#earthLoading")?.classList.add("loaded")}}function lt(){if(!J||!mt)return;let l=Math.max(1,mt.width),h=Math.max(1,mt.height),T=Math.min(l,h)*.365*O.zoom,P=h/(2*T),D=l/(2*T);J.left=-D,J.right=D,J.top=P,J.bottom=-P,J.updateProjectionMatrix(),ve.copy(fe(O.lon,O.lat,3.25)),J.position.copy(ve),J.up.set(0,1,0),J.lookAt(0,0,0),J.updateMatrixWorld()}function wt(l=0){if(!(!I||!j||!J||!mt)){if(lt(),me&&(me.rotation.y=l*6e-6),Re&&(Re.rotation.y=l*15e-7),xe){let h=(v.dayIndex||0)*.0025;xe.position.set(4.5*Math.cos(h),2.2,4.5*Math.sin(h))}I.render(j,J)}}let kt=!1,De=!1,at=null,Ye=[],Ut=[],ut=[],Et=[],xt=performance.now(),qt="all",mt=null,ui=0,di=0;function ot(l){return(v?.offices||[]).includes(l)}function Xt(l){return(v?.staff||[]).includes(l)}function X(l){return k.find(h=>h.id===l)}function es(l){return W.find(h=>h.id===l)}function Qr(l){return v.reputation>=l.minReputation&&v.completedDeals>=l.minDeals}function At(l){return v.reputation>=l.minReputation}function ea(){let l=k.filter(m=>ot(m.id)).reduce((m,T)=>m+T.dailyCost,0),h=W.filter(m=>Xt(m.id)).reduce((m,T)=>m+T.dailySalary,0);return l+h}function kn(l){return G.find(h=>h.id===l)}function ki(l){return v.investments=v.investments||{},v.investments[l]||{level:0,buildingTo:null,daysRemaining:0,totalSpent:0}}function zi(l){return ki(l).level||0}function lr(){return G.reduce((l,h)=>l+zi(h.id),0)}function fn(){return Object.values(v.investments||{}).filter(l=>l.buildingTo&&l.daysRemaining>0).length}function gn(){return 1+(ot("rotterdam")?1:0)+(ot("singapore")?1:0)}function cr(l,h=zi(l.id)+1){return Math.round(l.baseCost*Math.pow(1.72,h-1))}function xi(l,h=zi(l.id)+1){return Math.round(l.buildDays*Math.pow(1.38,h-1))}function zn(l){return v.reputation>=l.minReputation&&v.completedDeals>=l.minDeals}function ts(l,h){let m=l.commodity?l.commodity===h.commodity:l.commodities?l.commodities.includes(h.commodity):l.priceKey?l.priceKey===h.priceKey:!0,T=l.routeHub?[h.origin,h.destination,...h.via||[]].includes(l.routeHub):l.destination?h.destination===l.destination:l.ocean?Lt(h)==="ocean":!0;return m&&T}function ta(l){return G.reduce((h,m)=>{let T=zi(m.id);return!T||!ts(m,l)||(h.pnlBonus+=(m.pnlBonus||0)*T,h.durationBonus+=(m.durationBonus||0)*T,h.acceptanceBonus+=(m.acceptanceBonus||0)*T,h.equityFactor*=Math.max(.72,1-(m.equityReduction||0)*T),h.sources.push(`${m.name} L${T}`)),h},{pnlBonus:0,durationBonus:0,acceptanceBonus:0,equityFactor:1,sources:[]})}function Zi(){return G.reduce((l,h)=>l+(h.dailyIncome||0)*zi(h.id),0)}function ia(){return Object.values(v.investments||{}).reduce((l,h)=>l+(h.totalSpent||0)*.88,0)}function Gn(l){let h=kn(l);if(!h)return;let m=ki(l);if(m.buildingTo)return je("Questo asset \xE8 gi\xE0 in costruzione.");if(m.level>=h.maxLevel)return je("Asset gi\xE0 al livello massimo.");if(!zn(h))return je(`Servono reputazione ${h.minReputation} e ${h.minDeals} deal completati.`);if(fn()>=gn())return je("Tutti i project team sono occupati. Attendi il completamento di un upgrade.");let T=m.level+1,P=cr(h,T),D=xi(h,T);if(v.cash<P)return je("Liquidit\xE0 insufficiente per questo investimento.");v.cash-=P,v.investments[l]={...m,buildingTo:T,daysRemaining:D,totalSpent:(m.totalSpent||0)+P},v.constructionQueue=v.constructionQueue||[],v.constructionQueue.includes(l)||v.constructionQueue.push(l),ue="empire",$={type:"investment",id:l},Mn(h.hub),It(),zt(),je(`${h.name}: costruzione livello ${T} avviata (${D} giorni).`)}function is(){let l=Zi();l>0&&(v.cash+=l,v.assetIncome=(v.assetIncome||0)+l),Object.entries(v.investments||{}).forEach(([h,m])=>{if(!(!m.buildingTo||m.daysRemaining<=0)&&(m.daysRemaining-=1,m.daysRemaining<=0)){m.level=m.buildingTo,m.buildingTo=null,m.daysRemaining=0,v.constructionQueue=(v.constructionQueue||[]).filter(P=>P!==h);let T=kn(h);v.reputation=t(v.reputation+1,0,100),v.worldEventFeed.unshift({type:"investment",title:`${T.name} upgraded`,date:v.date,description:`Asset operativo al livello ${m.level}. Nuovi vantaggi industriali attivi.`})}})}function na(){v.counterparties=v.counterparties||{},f.forEach(l=>{v.counterparties[l.id]={relationship:50,deals:0,disputes:0,...v.counterparties[l.id]}})}function R(l){return f.find(h=>h.id===l)}function Y(l){return v.counterparties[l]||{relationship:50,deals:0,disputes:0}}function ie(l){return g[l.id]||{}}function ce(l){return C.find(h=>h.id===l.id)}function ae(){return(v.activeGlobalEvents||[]).map(l=>({...ce(l),...l})).filter(Boolean)}function ge(){let l=ae().reduce((h,m)=>h+(m.creditPenalty||0),0);return Math.max(1e6,v.creditLimit-l)}function be(){return v.difficulty==="guided"?{acceptance:7,marginRate:.04,eventLoss:.82,emergencyRate:.009,riskPenalty:-6}:v.difficulty==="expert"?{acceptance:-6,marginRate:.075,eventLoss:1.22,emergencyRate:.025,riskPenalty:8}:{acceptance:0,marginRate:.055,eventLoss:1,emergencyRate:.016,riskPenalty:0}}function Ce(l){return l?.priceKey==="crude"?7.45:1}function we(l,h=null,m=null){let T=h??ft(l).quantity??l.quantity,P=hr(l)*T*Ce(l);return Math.max(P,(m||0)*.92)}function ze(l){return["brescia","genova","rotterdam"].includes(l.destination)&&!["tallinn","rotterdam"].includes(l.origin)?.16:l.destination==="singapore"||l.destination==="shanghai"?.04:.08}function Qe(l){return Pe[l.id]||"revolver"}function nt(l){return he[l.id]||"basic"}function Be(l){return Me[l.id]||"standard"}function tt(l){let h=b[l];return!!(h&&(!h.requiresStaff||Xt(h.requiresStaff)))}function Rt(l,h,m,T=null){return Math.round(we(l,m,T)*t(h/100,0,1.1)*be().marginRate)}function Pt(l){let h=Qe(l),m=b[h]||b.revolver,T=nt(l),P=y[T]||y.basic,D=Be(l),B=S[D]||S.standard,ne=Number(ye[l.id]??80);return{financingId:h,financing:m,insuranceId:T,insurance:P,inspectionId:D,inspection:B,fxHedgeRatio:ne}}function ft(l){let h=v.marketCycle||1,m=Vt(`${l.id}-${h}-quantity`),T=Vt(`${l.id}-${h}-pnl`),P=Vt(`${l.id}-${h}-capital`),D=Vt(`${l.id}-${h}-duration`),B=Math.max(100,Math.round(l.quantity*(.88+m*.26)/25)*25),ne=B/l.quantity;return{quantity:B,basePnl:Math.round(l.basePnl*(.82+T*.38)*ne),capital:Math.round(l.capital*ne*(.96+P*.08)),equity:Math.round(l.equity*ne*(.96+P*.08)),duration:Math.max(12,l.duration+Math.round((D-.5)*8)),expiresIn:Math.max(0,7-(v.marketCycleDay||0)),cycle:h}}function Ze(l){let h=v.negotiations?.[l];if(h&&h.cycle===v.marketCycle)return h;let m=Te[l];if(m&&m.cycle===v.marketCycle)return m;let T={cycle:v.marketCycle,status:"draft",commercial:"market",payment:"delivery",delivery:"standard",attempts:0};return Te[l]=T,T}function Mt(l,h,m){let T={...Ze(l),status:"draft",[h]:m};Te[l]=T,v.negotiations[l]=T,It()}function Ft(l,h=Ze(l.id)){let m=ie(l),T=R(m.buyerId),P=Y(m.buyerId).relationship,D=p.commercial[h.commercial],B=p.payment[h.payment],ne=p.delivery[h.delivery],Q=b[Qe(l)]||b.revolver,te=ta(l);return t(54+v.reputation*.18+(P-50)*.45+(T?.credit||70)*.08+D.acceptance+B.acceptance+ne.acceptance+(Q.acceptance||0)+te.acceptanceBonus+be().acceptance,5,97)}function We(l){return ae().filter(h=>h.affects?.(l)).reduce((h,m)=>(h.duration+=m.dealDays||0,h.pnl+=m.dealPnl||0,h.equityFactor*=m.equityFactor||1,h.labels.push(m.title),h),{duration:0,pnl:0,equityFactor:1,labels:[]})}function Oe(l,h=Ze(l.id)){let m=ft(l),T=p.commercial[h.commercial]||p.commercial.market,P=p.payment[h.payment]||p.payment.delivery,D=p.delivery[h.delivery]||p.delivery.standard,B=Vn(l),ne=We(l),Q=ta(l),te=Pt(l),le=Xt("trade-finance-manager")?.9:1,Le=Math.min(m.capital,Math.round(m.equity*P.equityFactor*le*ne.equityFactor*te.financing.equityFactor*Q.equityFactor)),ct=Math.max(0,m.capital-Le),it=m.basePnl+T.pnl+D.pnl+B.pnlBonus+ne.pnl+te.financing.pnl+te.insurance.pnl+te.inspection.pnl+Q.pnlBonus,vt=ct*te.financing.rate*Math.max(10,m.duration+D.duration-B.durationBonus-Q.durationBonus+ne.duration)/360,Nt=it-vt;return{...m,quantity:m.quantity,capital:m.capital,equity:Le,borrowed:ct,basePnl:it,estimatedInterest:vt,expectedPnl:Nt,duration:Math.max(10,m.duration+D.duration-B.durationBonus-Q.durationBonus+ne.duration),acceptance:Ft(l,h),crisisLabels:ne.labels,verticalSources:Q.sources,structure:te,initialMargin:Rt(l,Number(Ne[l.id]??l.recommendedHedge??100),m.quantity,m.capital),terms:{commercial:h.commercial,payment:h.payment,delivery:h.delivery}}}function bi(l){return Oe(l).equity}function ns(l){return Oe(l).borrowed}function Hn(l){let h=Xt("freight-charterer")?.85:1;return ot("rotterdam")&&(h*=.95),Math.round(l.charterCost*h)}function Vn(l){let h=0,m=0;return ot("genova")&&(l.via||[]).includes("genova")&&(h+=2,m+=4e3),ot("singapore")&&(l.origin==="singapore"||l.destination==="singapore")&&(h+=2,m+=8e3),{durationBonus:h,pnlBonus:m}}function Mi(l){let h=X(l);if(!(!h||ot(l))){if(!Qr(h))return je(`Servono reputazione ${h.minReputation} e ${h.minDeals} deal completati.`);if(v.cash<h.cost)return je("Liquidit\xE0 insufficiente per aprire questo desk.");v.cash-=h.cost,v.offices.push(l),v.reputation=t(v.reputation+1,0,100),ri(),It(),zt(),Mn(h.hub),je(`${h.name} aperto. Nuove opportunit\xE0 disponibili.`)}}function vn(l){let h=es(l);if(!(!h||Xt(l))){if(!At(h))return je(`Serve reputazione ${h.minReputation} per assumere questo profilo.`);if(v.cash<h.hireCost)return je("Liquidit\xE0 insufficiente per l\u2019assunzione.");v.cash-=h.hireCost,v.staff.push(l),l==="trade-finance-manager"&&(v.creditLimit+=1e6),v.reputation=t(v.reputation+1,0,100),ri(),It(),zt(),je(`${h.role} assunto nel team SHIPPY.`)}}function ri(){let l=[];H.forEach(h=>{v.completedMissions.includes(h.id)||!h.achieved(v)||(v.completedMissions.push(h.id),v.cash+=h.cash||0,v.creditLimit+=h.credit||0,v.reputation=t(v.reputation+(h.reputation||0),0,100),l.push(h.title))}),l.length&&setTimeout(()=>je(`Missione completata: ${l.join(", ")}.`),80)}function It(){try{localStorage.setItem(a,JSON.stringify(v))}catch{}}function qe(l){return d.find(h=>h.id===l)}function st(l){return c.find(h=>h.id===l)}function ai(l){return v.activeDeals.find(h=>h.id===l)}function ra(l){return v.history.find(h=>h.id===l)}function Au(){return $.type==="deal"?ai($.id):null}function Fe(l){return w.find(h=>h.id===l)}function si(l){return v.fleetAssets.find(h=>h.id===l)}function Lt(l){let h=String(l.transportMode||"").toLowerCase();return h.includes("ocean")||h.includes("coaster")||h.includes("vessel")||h.includes("ship")||h.includes("tanker")||h.includes("carrier")||h.includes("container")||h.includes("bulk")?"ocean":h.includes("barge")?"barge":"land"}function Pi(l,h){let m=Fe(l.catalogId);return!!(m&&l.status==="available"&&l.positionHub===h.origin&&m.transportClass===Lt(h))}function rs(l){return v.fleetAssets.filter(h=>Pi(h,l))}function Ji(l){return v.reputation>=l.minReputation&&v.completedDeals>=l.minDeals&&(!l.requiresOffice||ot(l.requiresOffice))}function ur(l,h,m=null){let T=L[l.id]||{carrier:"Northstar Contract Carrier",mode:l.transportMode,booking:"Confirmed",warehouse:`${st(l.destination).name} Transit Depot`,warehouseHub:l.destination,storageDays:2,purchaseTerms:"Indexed purchase contract",salesTerms:"Indexed sales contract",documentSet:["Commercial invoice","Packing list","Quality certificate","Transport document","Insurance certificate","Customs release"]},P=m?Fe(m.catalogId):null,D=Lt(l)==="ocean"?9500:Lt(l)==="barge"?3800:1800;return{contractId:`SHP-${String(h).slice(-6).toUpperCase()}`,purchaseContract:{status:"Signed",terms:T.purchaseTerms},salesContract:{status:"Signed",terms:T.salesTerms},transport:{carrier:P?.name||T.carrier,mode:P?`${P.vesselClass} \xB7 internal charter`:T.mode,booking:P?"Fleet allocated":T.booking,status:"Booked",upgraded:!1,charterType:P?"Time-charter allocation":"Spot / voyage booking",fleetAssetId:m?.id||null,laycan:"D+3 / D+7",laytimeAllowed:Lt(l)==="land"?1:2,laytimeUsed:0,demurrageRate:P?Math.round(D*.8):D,demurrageAccrued:0,freightIndexAtBooking:v.freightIndex},storage:{name:T.warehouse,hubId:T.warehouseHub,reserved:!0,active:!1,days:T.storageDays,emergency:!1},documents:T.documentSet.map((B,ne)=>({name:B,status:ne===5?"ready":"pending"})),expedited:!1}}function gt(l){let h=qe(l.opportunityId);if(!h)return l;let m=ie(h);if(l.quantity=l.quantity||h.quantity,l.capital=l.capital||h.capital,l.supplierId=l.supplierId||m.supplierId,l.buyerId=l.buyerId||m.buyerId,l.globalEventImpacts=l.globalEventImpacts||[],!l.operations)return{...l,operations:ur(h,l.id||`legacy-${Date.now()}`)};let T=l.operations.transport||{};return l.operations.transport={charterType:"Spot / voyage booking",fleetAssetId:l.fleetAssetId||null,laycan:"D+3 / D+7",laytimeAllowed:Lt(h)==="land"?1:2,laytimeUsed:0,demurrageRate:Lt(h)==="ocean"?9500:2500,demurrageAccrued:0,freightIndexAtBooking:100,...T},l}function Ot(l){l=gt(l);let h=Qi(l),m=l.operations;m.transport.status=h<.12?"Booked":h<.2?"Loading":h<.78?"In transit":h<.93?"At terminal":"Final delivery",m.storage.active=h>=.78&&h<.93;let T=[.08,.1,.2,.24,.28,.04,.79,.22];m.documents.forEach((D,B)=>{D.status!=="blocked"&&(h>=(T[B]??.25)?D.status="ready":D.status!=="ready"&&(D.status="pending"))});let P=qe(l.opportunityId);if(P.id==="baltic-copper"&&l.pendingDecision){let D=m.documents.find(B=>B.name==="Quality certificate");D&&(D.status="blocked")}if((P.id==="meridian-copper"||P.id==="asia-aluminium")&&l.pendingDecision){let D=m.documents.find(B=>B.name==="LC compliance");D&&(D.status="blocked")}return l}function Ki(l){Ot(l);let h=l.operations.documents,m=h.filter(ne=>ne.status==="ready").length,T=h.length?m/h.length:1,P=l.operations.purchaseContract.status==="Signed"&&l.operations.salesContract.status==="Signed"?1:.5,D=l.operations.transport.status==="Booked"?.7:1,B=S[l.inspectionStrategy||"standard"]?.readiness||0;return t((T*.58+P*.22+D*.2)*100+(Xt("operations-coordinator")?5:0)+B,0,100)}function Si(l){let h=ai(l);if(!h||h.operations?.expedited)return;let m=Xt("operations-coordinator")?2700:4500;h.pnlAdjustments-=m,h.operations.expedited=!0,h.operations.documents.forEach(T=>{T.status!=="blocked"&&(T.status="ready")}),It(),zt(),je(`Documenti accelerati. Costo operativo ${o(m)}.`)}function hi(l){let h=ai(l);if(!h||h.operations?.transport?.upgraded||Qi(h)>.7)return;let m=14e3;h.pnlAdjustments-=m,h.duration=Math.max(h.elapsed+2,h.duration-4),h.operations.transport.upgraded=!0,h.operations.transport.booking="Priority confirmed",It(),zt(),je("Trasporto prioritario confermato. ETA ridotta di 4 giorni.")}function Dt(l){let h=ai(l);if(!h||h.operations?.storage?.emergency)return;let m=8e3;h.pnlAdjustments-=m,h.operations.storage.emergency=!0,h.operations.storage.reserved=!0,h.operations.storage.days+=5,It(),zt(),je(`Storage di emergenza prenotato per ${o(m)}.`)}function Ti(l){let h=Fe(l);if(!h||!Ji(h))return je("Questo asset non \xE8 ancora disponibile per il tuo desk.");if(v.fleetAssets.some(P=>P.catalogId===l))return je("Hai gi\xE0 questo asset in charter.");let m=Hn(h);if(v.cash<m)return je("Liquidit\xE0 insufficiente per il charter.");let T={id:`vessel-${l}-${v.sequence++}`,catalogId:l,name:h.name,status:"available",assignedDealId:null,positionHub:h.homeHub,daysRemaining:h.charterDays,charterDays:h.charterDays,charterCost:m,acquired:v.date};v.cash-=m,v.fleetAssets.push(T),It(),ue="fleet",dl(T.id),zt(),je(`${h.name} noleggiata per ${h.charterDays} giorni.`)}function aa(l){let h=si(l);if(!h||h.status==="assigned")return je("Non puoi chiudere un charter mentre la nave \xE8 assegnata a un deal.");let m=Math.round(h.charterCost*(h.daysRemaining/h.charterDays)*.2);v.cash+=m,v.fleetAssets=v.fleetAssets.filter(T=>T.id!==l),$={type:"hub",id:"geneva"},It(),zt(),je(`Charter chiuso. Recuperati ${o(m)}.`)}function yn(){let l=[];v.fleetAssets.forEach(h=>{if(h.daysRemaining=Math.max(0,h.daysRemaining-1),h.daysRemaining===0&&h.status==="assigned"){let m=Fe(h.catalogId),T=ai(h.assignedDealId),P=Math.round(m.charterCost/m.charterDays*1.35);T&&(T.pnlAdjustments-=P),h.extensionCost=(h.extensionCost||0)+P}h.daysRemaining===0&&h.status!=="assigned"&&l.push(h.id)}),l.length&&(v.fleetAssets=v.fleetAssets.filter(h=>!l.includes(h.id)))}function nl(l){Ot(l);let h=l.operations.transport;l.operations.storage.active&&(h.laytimeUsed+=1,h.laytimeUsed>h.laytimeAllowed&&(h.demurrageAccrued+=h.demurrageRate,l.pnlAdjustments-=h.demurrageRate))}function dr(){return new Date(v.date)}function Vt(l){let h=2166136261;for(let m=0;m<l.length;m++)h^=l.charCodeAt(m),h=Math.imul(h,16777619);return(h>>>0)%1e4/1e4}function Yh(){v.marketCycle=(v.marketCycle||1)+1,v.marketCycleDay=0,v.negotiations={},d.forEach(l=>{Te[l.id]=null}),v.worldEventFeed.unshift({type:"market",title:"Opportunity book refreshed",date:v.date,description:"Nuove quantit\xE0, margini e finestre di consegna sono ora disponibili sul mercato."}),v.worldEventFeed=v.worldEventFeed.slice(0,14),je("Il mercato delle opportunit\xE0 \xE8 stato aggiornato.")}function Zh(){let l=new Set((v.activeGlobalEvents||[]).map(D=>D.id)),h=C.filter(D=>!l.has(D.id));if(!h.length)return;let m=Math.floor(Vt(`${v.date}-world-${v.marketCycle}`)*h.length),T=h[m],P={id:T.id,started:v.date,remaining:T.duration};v.activeGlobalEvents.push(P),v.worldEventFeed.unshift({type:"crisis",id:T.id,title:T.title,date:v.date,severity:T.severity,description:T.description}),v.worldEventFeed=v.worldEventFeed.slice(0,14),T.freightShock&&(v.freightIndex=t(v.freightIndex+T.freightShock,76,155)),v.activeDeals.forEach(D=>{let B=qe(D.opportunityId);T.affects?.(B)&&(D.globalEventImpacts=D.globalEventImpacts||[],!D.globalEventImpacts.includes(T.id)&&(D.globalEventImpacts.push(T.id),D.duration+=T.dealDays||0,D.pnlAdjustments+=T.dealPnl||0,D.eventResult=`${T.title}: impatto incorporato nella rotta e nel P&L.`))}),je(`Global event: ${T.title}`)}function Jh(){v.dayIndex=(v.dayIndex||0)+1,v.marketCycleDay=(v.marketCycleDay||0)+1;let l=[];v.activeGlobalEvents.forEach(h=>{h.remaining=Math.max(0,h.remaining-1),h.remaining===0&&l.push(h.id)}),l.length&&(l.forEach(h=>{let m=C.find(T=>T.id===h);v.worldEventFeed.unshift({type:"resolved",id:h,title:`${m?.title||h} resolved`,date:v.date,description:"Le condizioni operative tornano gradualmente alla normalit\xE0."})}),v.activeGlobalEvents=v.activeGlobalEvents.filter(h=>!l.includes(h.id))),v.marketCycleDay>=7&&Yh(),v.dayIndex>=(v.nextGlobalEventDay||6)&&(Zh(),v.nextGlobalEventDay=v.dayIndex+8+Math.floor(Vt(`${v.date}-next-world`)*6))}function Qi(l){return t(l.elapsed/l.duration,0,1)}function hr(l){return l.priceKey==="aluminium"?v.aluminiumPrice:l.priceKey==="urea"?v.ureaPrice:l.priceKey==="crude"?v.crudePrice:l.priceKey==="wheat"?v.wheatPrice:l.priceKey==="ironore"?v.ironorePrice:l.priceKey==="coffee"?v.coffeePrice:v.copperPrice}function as(l){let h=qe(l.opportunityId),m=hr(h),T=l.entryMarketPrice||m,P=t(1-(l.hedgeRatio||0)/100,-.1,1);return-(m-T)*(l.quantity||h.quantity)*Ce(h)*P}function rl(l){let h=qe(l.opportunityId),m=l.entryFx||v.eurusd,T=Math.max(0,1-(l.fxHedgeRatio||0)/100),P=we(h,l.quantity||h.quantity,l.capital)*ze(h)*T;return m?(v.eurusd-m)/m*P:0}function ss(l){let h=qe(l.opportunityId),m=Rt(h,l.hedgeRatio||0,l.quantity||h.quantity,l.capital),P=Math.max(0,hr(h)-(l.entryMarketPrice||hr(h)))*(l.quantity||h.quantity)*Ce(h)*t((l.hedgeRatio||0)/100,0,1.1);return Math.round(m+P)}function Cu(l){let h=ss(l),m=l.marginCollateral||0,T=h-m;if(Math.abs(T)<1)return;if(T<0){let te=Math.min(m,-T);l.marginCollateral-=te,v.cash+=te;return}let P=Math.min(Math.max(0,v.cash),T);v.cash-=P,l.marginCollateral+=P;let D=T-P;if(D<=0)return;let B=Math.max(0,ge()-_n().creditUsed),ne=Math.min(D,B);if(ne>0){let te=Math.max(2500,Math.round(ne*be().emergencyRate));l.borrowed+=ne,l.marginCollateral+=ne,l.pnlAdjustments-=te,l.marginCalls=(l.marginCalls||0)+1,v.marginCalls=(v.marginCalls||0)+1,v.emergencyFundingCost=(v.emergencyFundingCost||0)+te,v.worldEventFeed.unshift({type:"margin",title:"Emergency margin funding",date:v.date,description:`${qe(l.opportunityId).title}: ${o(ne)} bridge liquidity, fee ${o(te)}.`}),v.worldEventFeed=v.worldEventFeed.slice(0,14)}let Q=D-ne;if(Q>0){let te=qe(l.opportunityId),le=we(te,l.quantity||te.quantity,l.capital),Le=Math.ceil(Q/Math.max(1,le*be().marginRate)*100);l.hedgeRatio=t((l.hedgeRatio||0)-Le,0,100),l.reputationAdjustments-=2,l.eventResult=`Margin shortfall: hedge ridotto al ${l.hedgeRatio}% per liberare collateral.`}}function Kh(l){let h=l.financingRate??b[l.financingStrategy||"revolver"]?.rate??.075,m=(l.borrowed||0)*h/360;l.financingAccrued=(l.financingAccrued||0)+m,v.totalInterestPaid=(v.totalInterestPaid||0)+m}function os(l){let h=Qi(l);if(h<.15)return{key:"booked",label:"Booked",location:st(qe(l.opportunityId).origin).name};if(h<.78)return{key:"transit",label:"In transit",location:"In transito"};if(h<.93){let m=qe(l.opportunityId);return{key:"port",label:"Port / Warehouse",location:m.via?.length?st(m.via.at(-1)).name:st(m.destination).name}}return{key:"delivery",label:"Final delivery",location:st(qe(l.opportunityId).destination).name}}function al(l){let h=Qi(l);return(l.basePnl+l.pnlAdjustments-(l.financingAccrued||0))*Math.min(1,h*.86)+as(l)+rl(l)}function Ru(){let l=_n(),h={},m=0,T=0,P=0,D=0;v.activeDeals.forEach(it=>{let vt=qe(it.opportunityId),Nt=we(vt,it.quantity||vt.quantity,it.capital);h[vt.commodity]=(h[vt.commodity]||0)+Nt,m+=Nt*Math.max(0,1-(it.hedgeRatio||0)/100),T+=Nt*ze(vt)*Math.max(0,1-(it.fxHedgeRatio||0)/100),P+=it.capital||vt.capital,D=Math.max(D,it.capital||vt.capital)});let B=ge()?l.creditUsed/ge():0,ne=P?D/P:0,Q=v.activeDeals.reduce((it,vt)=>it+ss(vt),0),te=Math.max(15e4,m*.08+T*.06+l.creditUsed*.035+Q*.12),le=te?v.cash/te:10,Le=t(B*30+ne*20+Math.min(1,m/15e5)*26+Math.min(1,T/8e5)*12+(le<1?18:le<1.5?8:0),0,100)-(Xt("risk-analyst")?8:0)+be().riskPenalty,ct=m*.08+T*.05+l.creditUsed*.012;return{...l,grossByCommodity:h,netFlatExposure:m,netFxExposure:T,marginRequirement:Q,stressLoss:ct,creditUtilization:B,concentration:ne,liquidityReserve:te,liquidityCoverage:le,riskScore:t(Le,0,100)}}function _n(){let l=v.activeDeals.reduce((B,ne)=>B+ne.equity,0),h=v.activeDeals.reduce((B,ne)=>B+(ne.marginCollateral||0),0),m=v.activeDeals.reduce((B,ne)=>B+al(ne),0),T=v.activeDeals.reduce((B,ne)=>B+ne.borrowed,0),P=ia(),D=v.cash+l+h+m+P;return{invested:l,marginCollateral:h,activePnl:m,creditUsed:T,creditAvailable:ge()-T,assetValue:P,nav:D}}function xn(l){return l.unlock(v)}function sl(){return ot("singapore")&&v.reputation>=82&&v.completedDeals>=8?"Global Desk Head":v.reputation>=80&&v.completedDeals>=8?"Desk Head":v.reputation>=68&&v.completedDeals>=4?"Senior Trader":v.reputation>=58&&v.completedDeals>=2?"Trader":"Junior Trader"}let Pu=[["helios","Helios Commodities","Zurich","CH",5750,98e4,95,93],["atlas","Atlas Merchant Group","London","GB",5240,86e4,92,90],["meridian-desk","Meridian Global Desk","Dubai","AE",4810,74e4,87,82],["northsea","NorthSea Trading","Rotterdam","NL",4460,69e4,94,91],["pacific","Pacific Bulk Partners","Singapore","SG",4120,61e4,88,89],["andean","Andean Resources","Santiago","CL",3860,54e4,91,84],["rhine","Rhine Metals Desk","Geneva","CH",3520,47e4,89,94],["stratus","Stratus Energy","Houston","US",3240,43e4,83,78],["baltic","Baltic Merchant","Tallinn","EE",3010,365e3,93,92],["orion","Orion Agri Trade","Geneva","CH",2760,32e4,86,88],["cobalt","Cobalt Bridge","Lugano","CH",2520,275e3,90,86],["saffron","Saffron Commodities","Dubai","AE",2310,23e4,78,81],["harbor","Harborline Trading","Genoa","IT",2120,205e3,91,89],["delta","Delta Physical Markets","Amsterdam","NL",1940,17e4,84,87],["forge","Forge Materials","Milan","IT",1780,145e3,88,90],["vertex","Vertex Commodity Desk","Paris","FR",1630,118e3,82,85],["mariner","Mariner Trade House","Hamburg","DE",1490,97e3,87,83],["alpine","Alpine Flow Trading","Geneva","CH",1360,78e3,90,91],["redwood","Redwood Merchant","Chicago","US",1240,61e3,80,79],["bluewater","Bluewater Commodities","Athens","GR",1120,43e3,85,82],["nova","Nova Materials Desk","Vienna","AT",1010,27e3,86,88],["frontier","Frontier Trade Co.","Madrid","ES",910,12e3,79,84],["oak","Oakline Physical","Dublin","IE",820,-4e3,83,86],["ember","Ember Trading Desk","Prague","CZ",730,-18e3,76,80]].map(([l,h,m,T,P,D,B,ne])=>({id:l,name:h,city:m,country:T,overall:P,pnl:D,operations:B,risk:ne}));function Iu(){return v.history.length?v.history.reduce((l,h)=>l+(h.operationalReadiness??75),0)/v.history.length:76}function Lu(){let l=v.history||[],h=l.length?l.reduce((P,D)=>P+(D.hedgeRatio||0),0)/l.length:72,m=l.length?l.filter(P=>P.pnl>=0).length/l.length:.5,T=Ru();return t(42+h*.34+m*18-(v.marginCalls||0)*4-Math.max(0,T.riskScore-55)*.35,0,100)}function Wn(){let m=500+(_n().nav-1e6)/3e3+v.reputation*7+v.completedDeals*55+Iu()*2+Lu()*1.5+(v.academyScore||0)*.15+(v.completedMissions?.length||0)*20+Math.max(0,(v.offices?.length||1)-1)*35-(v.marginCalls||0)*45-(v.emergencyFundingCost||0)/5e3;return Math.max(0,Math.round(m))}function Du(l=Wn()){return l>=6e3?{name:"Master Merchant",className:"master",next:null}:l>=4500?{name:"Elite",className:"elite",next:6e3}:l>=3400?{name:"Platinum",className:"platinum",next:4500}:l>=2500?{name:"Gold",className:"gold",next:3400}:l>=1800?{name:"Silver",className:"silver",next:2500}:l>=1200?{name:"Bronze",className:"bronze",next:1800}:{name:"Rookie",className:"rookie",next:1200}}function ls(l=v.dayIndex||0){return Math.floor(l/90)+1}function Qh(l=v.dayIndex||0){return l%90+1}function ep(l="overall"){let h=ls();return Pu.map((m,T)=>{let P=Vt(`${m.id}-${h}-${v.marketCycle}`)-.5,D=Math.min(1.35,1+(v.dayIndex||0)*.0014);return{...m,isPlayer:!1,overall:Math.round(m.overall*D+P*240+(h-1)*90),pnl:Math.round(m.pnl*D+P*9e4+(h-1)*35e3),operations:t(m.operations+P*5,55,99.5),risk:t(m.risk+P*6,50,99.5)}})}function tp(){return{id:"player",name:v.companyName||"SHIPPY Trading",trader:v.profileName||"Giorgio Bonetta",city:"Geneva",country:"YOU",isPlayer:!0,overall:Wn(),pnl:Math.round(v.realizedPnl||0),operations:Iu(),risk:Lu()}}function Nu(l="overall"){return[...ep(l),tp()].sort((h,m)=>m[l]-h[l]).map((h,m)=>({...h,position:m+1}))}function ol(l="overall"){return Nu(l).find(h=>h.isPlayer)?.position||Pu.length+1}function Uu(l,h){return h==="pnl"?o(l.pnl,!0):h==="operations"||h==="risk"?`${l[h].toFixed(1)}%`:Math.round(l.overall).toLocaleString("en-US")}function ip(l){let h=ls(l);ls(v.dayIndex||0)!==h&&(v.leaderboardSnapshots=v.leaderboardSnapshots||[],v.leaderboardSnapshots.unshift({season:h,score:Wn(),position:ol("overall"),league:Du().name,pnl:v.realizedPnl||0,completedDeals:v.completedDeals||0,closedAt:v.date}),v.leaderboardSnapshots=v.leaderboardSnapshots.slice(0,8))}function ll(){mt=N.getBoundingClientRect(),z=Math.min(window.devicePixelRatio||1,2),N.width=Math.max(1,Math.round(mt.width*z)),N.height=Math.max(1,Math.round(mt.height*z)),_.setTransform(z,0,0,z,0,0),I&&(I.setPixelRatio(z),I.setSize(Math.max(1,mt.width),Math.max(1,mt.height),!1),lt())}let Fu=(l,h)=>{let m=h*n,T=l*n;return[Math.cos(m)*Math.cos(T),Math.cos(m)*Math.sin(T),Math.sin(m)]};function np(l){let[h,m,T]=l;return{lon:Math.atan2(m,h)/n,lat:Math.asin(t(T,-1,1))/n}}function rp(l,h,m){let T=t(l[0]*h[0]+l[1]*h[1]+l[2]*h[2],-1,1),P=Math.acos(T);if(P<1e-5)return l;let D=Math.sin(P),B=Math.sin((1-m)*P)/D,ne=Math.sin(m*P)/D;return[l[0]*B+h[0]*ne,l[1]*B+h[1]*ne,l[2]*B+h[2]*ne]}function bn(l,h,m=0){if(!mt)return null;let T=mt.width,P=mt.height,D=Math.min(T,P)*.365*O.zoom,B=T*.5,ne=P*.5;if(J){let yt=fe(l,h,1+m),oi=yt.clone().normalize().dot(J.position.clone().normalize());return de.copy(yt).project(J),{x:(de.x*.5+.5)*T,y:(-de.y*.5+.5)*P,z:oi,radius:D,cx:B,cy:ne}}let Q=h*n,te=l*n,le=O.lat*n,Le=O.lon*n,ct=te-Le,it=Math.cos(Q)*Math.sin(ct),vt=Math.cos(le)*Math.sin(Q)-Math.sin(le)*Math.cos(Q)*Math.cos(ct),Nt=Math.sin(le)*Math.sin(Q)+Math.cos(le)*Math.cos(Q)*Math.cos(ct);return{x:B+D*it*(1+m),y:ne-D*vt*(1+m),z:Nt,radius:D,cx:B,cy:ne}}function ap(){if(!mt)return;let l=mt.width,h=mt.height;_.clearRect(0,0,l,h),Ye=[],Ut=[],ut=[],Et=[];let m=Math.min(l,h)*.365*O.zoom,T=l*.5,P=h*.5;if(!I){let B=_.createRadialGradient(T-m*.28,P-m*.34,m*.05,T,P,m);B.addColorStop(0,"#1d5068"),B.addColorStop(.55,"#0b2637"),B.addColorStop(1,"#04111c"),_.fillStyle=B,_.beginPath(),_.arc(T,P,m,0,Math.PI*2),_.fill(),_.save(),_.beginPath(),_.arc(T,P,m,0,Math.PI*2),_.clip(),sp(),lp(),_.restore()}_.save(),_.beginPath(),_.arc(T,P,m*1.045,0,Math.PI*2),_.clip(),cp(),hp(),pp(),vp(),yp(),_.restore(),_.save();let D=_.createRadialGradient(T,P,m*.91,T,P,m*1.13);D.addColorStop(0,"rgba(71,177,255,0)"),D.addColorStop(.76,"rgba(71,177,255,.06)"),D.addColorStop(1,"rgba(71,177,255,0)"),_.fillStyle=D,_.beginPath(),_.arc(T,P,m*1.14,0,Math.PI*2),_.fill(),_.strokeStyle="rgba(111, 191, 255, .15)",_.lineWidth=.8,_.beginPath(),_.arc(T,P,m*1.02,0,Math.PI*2),_.stroke(),_.restore()}function sp(){_.save(),_.strokeStyle="rgba(145, 221, 240, .075)",_.lineWidth=.65;for(let l=-60;l<=60;l+=30)Ou(Array.from({length:121},(h,m)=>[-180+m*3,l]));for(let l=-180;l<180;l+=30)Ou(Array.from({length:61},(h,m)=>[l,-90+m*3]));_.restore()}function Ou(l){let h=!1;_.beginPath();for(let[m,T]of l){let P=bn(m,T);P.z>0?h?_.lineTo(P.x,P.y):(_.moveTo(P.x,P.y),h=!0):h=!1}_.stroke()}function op(l,h=2.5){let m=[];for(let T=0;T<l.length;T++){let P=l[T],D=l[(T+1)%l.length],B=D[0]-P[0];B>180&&(B-=360),B<-180&&(B+=360);let ne=D[1]-P[1],Q=Math.max(2,Math.ceil(Math.max(Math.abs(B),Math.abs(ne))/h));for(let te=0;te<Q;te++)m.push([P[0]+B*te/Q,P[1]+ne*te/Q])}return m}function lp(){_.save(),_.fillStyle="rgba(57, 110, 104, .48)",_.strokeStyle="rgba(116, 218, 190, .23)",_.lineWidth=.8;for(let l of q){let h=l.map(([m,T])=>({...bn(m,T),lon:m,lat:T})).filter(m=>m.z>-.02);if(!(h.length<3)){_.beginPath(),_.moveTo(h[0].x,h[0].y);for(let m=1;m<h.length;m++)_.lineTo(h[m].x,h[m].y);_.closePath(),_.fill(),_.stroke()}}_.restore()}function cl(l,h=48){let m=`${l.id}-${h}`;if(se.has(m))return se.get(m);let T=[l.origin,...l.via||[],l.destination],P=[];for(let D=0;D<T.length-1;D++){let B=st(T[D]),ne=st(T[D+1]),Q=Fu(B.lon,B.lat),te=Fu(ne.lon,ne.lat);for(let le=0;le<=h;le++){let Le=le/h,ct=np(rp(Q,te,Le));P.push({...ct,globalT:(D+Le)/(T.length-1)})}}return se.set(m,P),P}function Bu(l,h){_.save(),_.strokeStyle=h.color,_.lineWidth=h.width,_.globalAlpha=h.alpha??1,h.dash&&_.setLineDash(h.dash),_.beginPath();let m=!1;for(let T of l){let P=h.lift?Math.sin(T.globalT*Math.PI)*h.lift:0,D=bn(T.lon,T.lat,P);D.z>-.01?m?_.lineTo(D.x,D.y):(_.moveTo(D.x,D.y),m=!0):m=!1}_.stroke(),_.restore()}function cp(){Ue.opportunities&&d.forEach(l=>{if(!xn(l))return;let h=$.type==="opportunity"&&$.id===l.id,m=cl(l,36);Bu(m,{color:h?"rgba(87,230,255,.82)":"rgba(87,230,255,.20)",width:h?1.8:.9,dash:h?[]:[3,5],lift:.045,alpha:1})}),Ue.portfolio&&v.activeDeals.forEach(l=>{let h=qe(l.opportunityId),m=$.type==="deal"&&$.id===l.id,T=l.hedgeRatio||0,P=T>=90?"rgba(97,242,166,.9)":T>=60?"rgba(255,180,94,.9)":"rgba(255,100,121,.95)";Bu(cl(h,46),{color:Ue.risk?P:m?"rgba(97,242,166,1)":"rgba(97,242,166,.58)",width:m?2.4:Ue.risk?2:1.45,lift:.055})})}function up(l){return l.locked&&!d.some(h=>(h.origin===l.id||h.destination===l.id||h.via?.includes(l.id))&&xn(h))?!1:Ue.portfolio&&v.activeDeals.some(h=>{let m=qe(h.opportunityId);return[m.origin,m.destination,...m.via||[]].includes(l.id)})||Ue.opportunities&&d.some(h=>xn(h)&&[h.origin,h.destination,...h.via||[]].includes(l.id))?!0:l.type==="hq"}function dp(l){return{hq:"#ffffff",supplier:"#ffb45e",customer:"#57e6ff",port:"#6d91ff"}[l.type]||"#ad8cff"}function hp(){c.forEach(l=>{if(!up(l))return;let h=bn(l.lon,l.lat,.012);if(h.z<=0)return;let m=$.type==="hub"&&$.id===l.id,T=dp(l),P=1+Math.sin(ui*.003+l.lon)*.12;_.save(),_.globalAlpha=t(h.z*1.7,.25,1),_.fillStyle=T,_.shadowColor=T,_.shadowBlur=m?18:9,_.beginPath(),_.arc(h.x,h.y,(m?5:3.4)*P,0,Math.PI*2),_.fill(),_.shadowBlur=0,m&&(_.strokeStyle=T,_.globalAlpha=.45,_.lineWidth=1,_.beginPath(),_.arc(h.x,h.y,10+Math.sin(ui*.004)*2,0,Math.PI*2),_.stroke()),(O.zoom>.87||m)&&(_.globalAlpha=t(h.z*1.5,.2,1),_.font=`${m?700:600} ${m?10:8}px Inter, sans-serif`,_.textAlign="center",_.fillStyle=m?"#f4fbff":"rgba(218,233,241,.78)",_.fillText(l.name.toUpperCase(),h.x,h.y-(m?14:10))),_.restore(),Ye.push({id:l.id,x:h.x,y:h.y,r:m?15:11,z:h.z})})}function pp(){Et=[],G.forEach(l=>{let h=ki(l.id);if(!h.level&&!h.buildingTo)return;let m=st(l.hub);if(!m)return;let T=bn(m.lon,m.lat,.025);if(T.z<=0)return;let P={upstream:"#ffb45e",midstream:"#57e6ff",downstream:"#ad8cff"}[l.chain],D=$.type==="investment"&&$.id===l.id,B=1+Math.sin(ui*.004+m.lon)*.08;_.save(),_.globalAlpha=t(T.z*1.5,.3,1),_.translate(T.x+13,T.y-9),_.fillStyle="rgba(4,15,25,.9)",_.strokeStyle=P,_.lineWidth=D?2:1,_.beginPath(),_.arc(0,0,(D?8:6)*B,0,Math.PI*2),_.fill(),_.stroke(),_.fillStyle=P,_.font="700 8px Inter,sans-serif",_.textAlign="center",_.textBaseline="middle",_.fillText(h.buildingTo?"\u231B":String(h.level),0,.5),_.restore(),Et.push({id:l.id,x:T.x+13,y:T.y-9,r:12,z:T.z})})}function cs(l,h){let m=cl(l,70),T=t(Math.floor(h*(m.length-1)),0,m.length-1);return m[T]}function mp(l){let h=oe===5?430:1800,m=oe>0?t((ui-xt)/h,0,.98):0;return t((l.elapsed+m)/l.duration,0,1)}function fp(l,h){let m=qe(l.opportunityId),T=(m.transportMode||"").toLowerCase();return(m.via||[]).length&&h>.84?T.includes("rail")?"train":"truck":T.includes("tanker")?"tanker":T.includes("bulk")||T.includes("panamax")?"bulk":T.includes("ocean")||T.includes("container")?"ship":T.includes("barge")?"barge":T.includes("rail")?"train":"truck"}function gp(l,h,m=!1){if(_.shadowColor=h,_.shadowBlur=m?20:12,_.fillStyle=h,_.strokeStyle="rgba(225,247,255,.9)",_.lineWidth=.8,["ship","tanker","bulk","barge"].includes(l)){let T=l==="bulk"?18:l==="tanker"?17:l==="barge"?14:16;_.beginPath(),_.moveTo(T*.62,0),_.lineTo(T*.35,-4),_.lineTo(-T*.48,-4),_.lineTo(-T*.62,0),_.lineTo(-T*.45,4),_.lineTo(T*.35,4),_.closePath(),_.fill(),_.stroke(),_.fillStyle="rgba(5,18,29,.88)",_.fillRect(-4,-6,7,4),l==="tanker"&&(_.fillStyle="rgba(225,247,255,.45)",[-5,1,7].forEach(P=>{_.beginPath(),_.arc(P,0,1.8,0,Math.PI*2),_.fill()})),l==="bulk"&&(_.fillStyle="rgba(225,247,255,.35)",[-6,0,6].forEach(P=>_.fillRect(P-2,-2,4,4)))}else l==="train"?(_.fillRect(-9,-4,14,8),_.beginPath(),_.moveTo(5,-4),_.lineTo(10,0),_.lineTo(5,4),_.closePath(),_.fill(),_.stroke(),_.fillStyle="rgba(5,18,29,.9)",_.fillRect(-6,-2,4,3),_.fillRect(0,-2,3,3)):(_.fillRect(-8,-4,10,8),_.beginPath(),_.moveTo(2,-4),_.lineTo(8,-2),_.lineTo(8,4),_.lineTo(2,4),_.closePath(),_.fill(),_.stroke(),_.fillStyle="rgba(5,18,29,.9)",_.fillRect(3,-2,3,3))}function vp(){!Ue.logistics||!Ue.portfolio||v.activeDeals.forEach(l=>{let h=qe(l.opportunityId),m=mp(l),T=cs(h,m),P=cs(h,Math.min(.999,m+.008)),D=bn(T.lon,T.lat,.061*Math.sin(m*Math.PI)),B=bn(P.lon,P.lat,.061*Math.sin(Math.min(.999,m+.008)*Math.PI));if(D.z<=-.02)return;let ne=$.type==="deal"&&$.id===l.id,Q=l.pendingDecision?"#ff6479":"#61f2a6",te=Math.atan2(B.y-D.y,B.x-D.x),le=fp(l,m);_.save(),_.globalAlpha=t((D.z+.15)*1.3,.25,1),_.translate(D.x,D.y),_.rotate(te),["ship","tanker","bulk","barge"].includes(le)?(_.strokeStyle="rgba(102,225,255,.34)",_.lineWidth=1.2,_.setLineDash([2,3]),_.beginPath(),_.moveTo(-12,-3),_.lineTo(-25,-6),_.moveTo(-12,3),_.lineTo(-25,6),_.stroke(),_.setLineDash([])):(_.strokeStyle="rgba(97,242,166,.28)",_.lineWidth=1,_.beginPath(),_.moveTo(-10,0),_.lineTo(-24,0),_.stroke()),gp(le,Q,ne),_.restore(),(ne||O.zoom>1.12)&&(_.save(),_.font="700 8px Inter,sans-serif",_.textAlign="center",_.fillStyle="rgba(235,249,255,.9)",_.fillText(`${le.toUpperCase()} \xB7 ${Math.round(m*100)}%`,D.x,D.y-14),_.restore()),Ut.push({id:l.id,x:D.x,y:D.y,r:16,z:D.z})})}function yp(){Ue.logistics&&v.fleetAssets.filter(l=>l.status==="available").forEach(l=>{let h=st(l.positionHub);if(!h)return;let m=bn(h.lon,h.lat,.045);if(m.z<=0)return;let T=$.type==="vessel"&&$.id===l.id;_.save(),_.globalAlpha=t(m.z*1.6,.3,1),_.translate(m.x+10,m.y+8),_.fillStyle="#ad8cff",_.shadowColor="#ad8cff",_.shadowBlur=T?18:9,_.beginPath(),_.moveTo(0,-6),_.lineTo(6,0),_.lineTo(0,6),_.lineTo(-6,0),_.closePath(),_.fill(),_.restore(),ut.push({id:l.id,x:m.x+10,y:m.y+8,r:13,z:m.z})})}function ku(l){if(ui=l,l-di>=32){if(di=l,O.targetLon!==null){let h=(O.targetLon-O.lon+540)%360-180,m=O.targetLat-O.lat;O.lon+=h*.12,O.lat+=m*.12,Math.abs(h)<.08&&Math.abs(m)<.08&&(O.lon=O.targetLon,O.lat=O.targetLat,O.targetLon=null,O.targetLat=null)}wt(l),ap()}requestAnimationFrame(ku)}function Mn(l){let h=st(l);h&&(O.targetLon=h.lon,O.targetLat=t(h.lat*.72,-52,58))}function _p(l){let h=qe(l),m=st(h.origin),T=st(h.destination),P=m.lon,D=T.lon;Math.abs(P-D)>180&&(P<D?P+=360:D+=360);let B=(P+D)/2;B>180&&(B-=360),O.targetLon=B,O.targetLat=t((m.lat+T.lat)/2*.65,-42,50),O.zoom=.88}function ul(l){let h=ai(l);if(!h)return;let m=qe(h.opportunityId),T=cs(m,Qi(h));O.targetLon=T.lon,O.targetLat=t(T.lat*.75,-50,55),O.zoom=1.05}function je(l){let h=r("#toast");clearTimeout(A),h.textContent=l,h.classList.remove("hidden"),requestAnimationFrame(()=>h.classList.add("visible")),A=setTimeout(()=>{h.classList.remove("visible"),setTimeout(()=>h.classList.add("hidden"),260)},2600)}function $n(l,h=!0){$={type:"hub",id:l},h&&Mn(l),Ei(),Xu()}function zu(l,h=!0){let m=qe(l);if(!xn(m))return je("Questa opportunit\xE0 non \xE8 ancora sbloccata.");if(!pr(m))return je("Questa opportunit\xE0 \xE8 gi\xE0 stata allocata nel ciclo corrente.");$={type:"opportunity",id:l},h&&_p(l),Ei(),mr()}function Gi(l,h=!0){$={type:"deal",id:l},h&&ul(l),Ei(),Vu()}function xp(l){ra(l)&&($={type:"history",id:l},ue="portfolio",Sn(),Ei(),Wu())}function dl(l,h=!0){let m=si(l);m&&($={type:"vessel",id:l},ue="fleet",h&&Mn(m.positionHub),Sn(),Ei(),$u())}function pr(l){let h=v.negotiations?.[l.id];return!(h&&h.cycle===v.marketCycle&&h.status==="consumed")}function bp(l){let h=qe(l);if(!h||!xn(h)||!pr(h))return;let m={...Ze(l)},T=(m.attempts||0)+1,P=Ft(h,m),B=Vt(`${h.id}-${v.marketCycle}-${T}-${m.commercial}-${m.payment}-${m.delivery}`)*100<=P,ne=ie(h),Q=Y(ne.buyerId),te={...m,attempts:T,probability:P,status:B?"accepted":"rejected",submittedAt:v.date};v.negotiations[l]=te,Te[l]=te,B?(Q.relationship=t(Q.relationship+1,0,100),je(`Offerta accettata. Il deal pu\xF2 essere aperto entro ${ft(h).expiresIn} giorni.`)):(Q.relationship=t(Q.relationship-1,0,100),je("Offerta rifiutata. Modifica prezzo, pagamento o delivery window e riprova.")),It(),zt()}function Gu(l){let h=_n(),m=Oe(l,Ze(l.id)),T=v.negotiations?.[l.id],P=m.structure;return pr(l)&&T?.cycle===v.marketCycle&&T.status==="accepted"&&tt(P.financingId)&&v.cash>=m.equity+m.initialMargin&&h.creditAvailable>=m.borrowed}function Mp(l){let h=qe(l);if(!h||!xn(h)||!pr(h))return;let m=v.negotiations?.[h.id];if(!m||m.cycle!==v.marketCycle||m.status!=="accepted"){je("Negozia e fai accettare l\u2019offerta prima di aprire il deal.");return}if(!Gu(h)){je("Capitale o linea di credito insufficienti per questo deal.");return}let T=Ae[h.id]||"spot",P=T.startsWith("fleet:")?si(T.slice(6)):null;if(P&&!Pi(P,h))return Ae[h.id]="spot",je("La nave selezionata non \xE8 pi\xF9 disponibile o non si trova nel porto di origine.");let D=P?Fe(P.catalogId):null,B=Oe(h,m),ne=B.equity,Q=B.borrowed,te=ie(h),le={id:`deal-${Date.now()}-${v.sequence++}`,opportunityId:h.id,started:v.date,elapsed:0,duration:Math.max(10,B.duration-(D?.durationBonus||0)),equity:ne,borrowed:Q,capital:B.capital,quantity:B.quantity,supplierId:te.supplierId,buyerId:te.buyerId,commercialTerms:{...B.terms},financingStrategy:B.structure.financingId,financingRate:B.structure.financing.rate,insuranceStrategy:B.structure.insuranceId,inspectionStrategy:B.structure.inspectionId,fxHedgeRatio:B.structure.fxHedgeRatio,entryFx:v.eurusd,initialMargin:B.initialMargin,marginCollateral:B.initialMargin,marginCalls:0,financingAccrued:0,marketCycle:v.marketCycle,globalEventsAtBooking:B.crisisLabels,verticalSources:B.verticalSources||[],basePnl:B.basePnl+(D?.bonusPnl||0)+(P&&Xt("freight-charterer")?5e3:0),fleetAssetId:P?.id||null,shippingStrategy:P?"internal-fleet":"spot-carrier",pnlAdjustments:0,hedgeRatio:Number(Ne[h.id]??h.recommendedHedge??100),entryMarketPrice:hr(h),hedgeTransactions:1,reputationAdjustments:0,eventTriggered:!1,eventResolved:!1,pendingDecision:!1,forcedCompletion:!1,eventResult:null};le.operations=ur(h,le.id,P);let Le=p.commercial[m.commercial]?.label||"Market quote",ct=p.payment[m.payment]?.label||"Payment at delivery",it=p.delivery[m.delivery]?.label||"Standard window";if(le.operations.salesContract.terms=`${le.operations.salesContract.terms} \xB7 ${Le} \xB7 ${ct} \xB7 ${it}`,le.operations.purchaseContract.terms=`${le.operations.purchaseContract.terms} \xB7 ${B.structure.inspection.label}`,le.operations.finance={facility:B.structure.financing.label,rate:B.structure.financing.rate,insurance:B.structure.insurance.label,fxHedgeRatio:B.structure.fxHedgeRatio},B.structure.inspectionId==="independent"){let vt=le.operations.documents.find(Nt=>/quality|assay|protein|moisture/i.test(Nt.name));vt&&(vt.status="ready")}P&&(P.status="assigned",P.assignedDealId=le.id),Ae[h.id]="spot",v.cash-=le.equity+le.marginCollateral,v.activeDeals.push(le),v.negotiations[h.id]={...m,status:"consumed"},It(),Gi(le.id),ue="portfolio",Sn(),zt(),je(`${h.title} avviato: capitale allocato e spedizione aperta.`)}function Sp(l){let h=qe(l.opportunityId);return!h.event||l.eventTriggered?!1:Qi(l)>=h.event.dayRatio?(l.eventTriggered=!0,l.pendingDecision=!0,Ot(l),oe=0,sa(),$={type:"deal",id:l.id},ul(l.id),je(`Decisione richiesta: ${h.event.title}`),!0):!1}function Tp(l,h){let m=ai(l);if(!m)return;let P=qe(m.opportunityId).event.choices.find(le=>le.id===h);if(!P)return;let D=P;P.random&&(D=Vt(`${m.id}-${P.id}-${v.date}`)<.55?P.good:P.bad);let B=y[m.insuranceStrategy||"basic"]?.lossFactor||1,ne=S[m.inspectionStrategy||"standard"]?.lossFactor||1,Q=D.pnl||0,te=Q<0?Math.round(Q*B*ne*be().eventLoss):Q;if(m.pnlAdjustments+=te,m.duration+=D.days||0,m.reputationAdjustments+=D.reputation||0,m.eventResult=D.result,m.eventResolved=!0,m.pendingDecision=!1,Ot(m),h==="inspect"){let le=m.operations.documents.find(Le=>Le.name==="Quality certificate");le&&(le.status="ready")}if(["kyc","amend-lc","waiver"].includes(h)){let le=m.operations.documents.find(Le=>Le.name==="LC compliance");le&&(le.status="ready")}P.forceComplete&&(m.forcedCompletion=!0,m.elapsed=m.duration,Hu(m)),It(),zt(),je(D.result)}function Ep(l){let h=ai(l);if(!h||h.hedgeRatio>=100)return;let m=qe(h.opportunityId),T=as(h),P=Math.round((2e3+(h.quantity||m.quantity)*2)*(Xt("risk-analyst")?.65:1));h.pnlAdjustments+=T-P,h.entryMarketPrice=hr(m),h.hedgeRatio=100,h.hedgeTransactions=(h.hedgeTransactions||1)+1,Cu(h),It(),zt(),je(`Hedge portato al 100%. Costo operativo ${o(P)}.`)}function Hu(l){let h=qe(l.opportunityId),m=as(l),T=rl(l),P=l.financingAccrued||0,D=l.basePnl+l.pnlAdjustments-P+m+T;v.cash+=l.equity+(l.marginCollateral||0)+D,v.realizedPnl+=D,v.completedDeals+=1;let B=Ki(l),ne=B>=92?2:B<70?-2:0,Q=D>=0?2:-3;if(v.reputation=t(v.reputation+Q+ne+l.reputationAdjustments,0,100),[l.supplierId,l.buyerId].filter(Boolean).forEach(te=>{let le=Y(te);le.deals=(le.deals||0)+1;let Le=B>=90&&D>=0?3:B<70||D<0?-2:1;le.relationship=t(le.relationship+Le,0,100),(B<70||(l.eventResult||"").toLowerCase().includes("claim"))&&(le.disputes=(le.disputes||0)+1)}),l.fleetAssetId){let te=si(l.fleetAssetId);te&&(te.status="available",te.assignedDealId=null,te.positionHub=h.destination)}v.history.unshift({id:l.id,opportunityId:h.id,completed:v.date,pnl:D,days:l.elapsed,eventResult:l.eventResult,operationalReadiness:B,carrier:l.operations?.transport?.carrier||"N/A",charterType:l.operations?.transport?.charterType||"N/A",demurrage:l.operations?.transport?.demurrageAccrued||0,hedgeRatio:l.hedgeRatio||0,shippingStrategy:l.shippingStrategy||"spot-carrier",commodity:h.commodity,quantity:l.quantity||h.quantity,supplierId:l.supplierId,buyerId:l.buyerId,commercialTerms:l.commercialTerms,financingStrategy:l.financingStrategy,insuranceStrategy:l.insuranceStrategy,inspectionStrategy:l.inspectionStrategy,fxHedgeRatio:l.fxHedgeRatio||0,marginCalls:l.marginCalls||0,pnlBreakdown:{commercial:l.basePnl,operations:l.pnlAdjustments,financing:-P,market:m,fx:T,demurrage:-(l.operations?.transport?.demurrageAccrued||0)},globalEventImpacts:l.globalEventImpacts||[],verticalSources:l.verticalSources||[]}),v.history=v.history.slice(0,8),v.activeDeals=v.activeDeals.filter(te=>te.id!==l.id),ri(),$={type:"hub",id:"geneva"},Mn("geneva"),je(`${h.title} chiuso con ${o(D)} di P&L.`)}function hl({silent:l=!1,deferRender:h=!1}={}){if(v.activeDeals.some(bt=>bt.pendingDecision)){let bt=v.activeDeals.find(Tn=>Tn.pendingDecision);return Gi(bt.id),l||je("Risolvi prima la decisione operativa aperta."),!1}xt=performance.now();let m=v.dayIndex||0,T=dr();T.setUTCDate(T.getUTCDate()+1),v.date=T.toISOString(),Jh(),ip(m),v.copperPrev=v.copperPrice,v.aluminiumPrev=v.aluminiumPrice,v.ureaPrev=v.ureaPrice,v.eurusdPrev=v.eurusd,v.freightPrev=v.freightIndex,v.crudePrev=v.crudePrice,v.wheatPrev=v.wheatPrice,v.ironorePrev=v.ironorePrice,v.coffeePrev=v.coffeePrice;let P=Vt(v.date),D=bt=>ae().filter(Tn=>Tn.commodity===bt).reduce((Tn,fr)=>Tn+(fr.dailyDrift||0),0),B=Math.sin(T.getUTCDate()*.71+T.getUTCMonth())*18+(P-.5)*34+D("copper"),ne=Math.cos(T.getUTCDate()*.53+T.getUTCMonth()*.7)*7+(Vt(v.date+"-al")-.5)*15+D("aluminium"),Q=Math.sin(T.getUTCDate()*.27+T.getUTCMonth()*.9)*1.6+(Vt(v.date+"-ur")-.5)*4.5+D("urea"),te=Math.sin(T.getUTCDate()*.43)*.45+(Vt(v.date+"-cr")-.5)*1.45+D("crude"),le=Math.cos(T.getUTCDate()*.37)*1.3+(Vt(v.date+"-wh")-.5)*4.2+D("wheat"),Le=Math.sin(T.getUTCDate()*.32)*.55+(Vt(v.date+"-io")-.5)*1.8+D("ironore"),ct=Math.cos(T.getUTCDate()*.25)*18+(Vt(v.date+"-co")-.5)*46+D("coffee"),it=Math.sin(T.getUTCDate()*.39)*.0011+(Vt(v.date+"-fx")-.5)*.0025,vt=Math.cos(T.getUTCDate()*.31)*.65+(Vt(v.date+"-fr")-.5)*1.4+ae().length*.08;v.copperPrice=t(v.copperPrice+B,8200,11600),v.aluminiumPrice=t(v.aluminiumPrice+ne,1950,3100),v.ureaPrice=t(v.ureaPrice+Q,250,580),v.crudePrice=t(v.crudePrice+te,52,116),v.wheatPrice=t(v.wheatPrice+le,175,365),v.ironorePrice=t(v.ironorePrice+Le,72,168),v.coffeePrice=t(v.coffeePrice+ct,2900,6100),v.eurusd=t(v.eurusd+it,.94,1.24),v.freightIndex=t(v.freightIndex+vt,68,165),yn();let Nt=ea();v.cash-=Nt,v.overheadPaid=(v.overheadPaid||0)+Nt,is();let yt=!1;for(let bt of[...v.activeDeals]){if(bt.elapsed+=1,Ot(bt),Kh(bt),Cu(bt),nl(bt),!bt.eventTriggered&&Sp(bt)){yt=!0;break}bt.elapsed>=bt.duration&&Hu(bt)}let oi=_n();return v.navHistory.push(oi.nav),v.navHistory.length>50&&v.navHistory.shift(),It(),h||zt(),!yt}function wp(){if(v.activeDeals.some(T=>T.pendingDecision))return Gi(v.activeDeals.find(T=>T.pendingDecision).id);let l=0,h=v.worldEventFeed.length,m=v.marketCycle;for(;l<120;){l++;let T=v.activeDeals.length;if(!hl({silent:!0,deferRender:!0})||v.activeDeals.length<T||v.worldEventFeed.length>h||v.marketCycle!==m)break}zt()}function sa(){e(".time-button").forEach(h=>h.classList.remove("active"));let l=r("#clockDot");oe===0?(r("#pauseButton").classList.add("active"),r("#clockStatus").textContent="In pausa",l.classList.remove("running")):(r(`.time-button[data-speed="${oe}"]`)?.classList.add("active"),r("#clockStatus").textContent=`${oe}\xD7 attivo`,l.classList.add("running")),clearInterval(F),xt=performance.now(),oe>0&&(F=setInterval(()=>hl(),oe===1?1800:430))}function Ap(){let l=_n(),m=(l.nav/1e6-1)*100;r("#navMetric").textContent=o(l.nav,!0),r("#navDelta").textContent=`${m>=0?"+":""}${m.toFixed(1)}% all time`,r("#cashMetric").textContent=o(v.cash,!0),r("#cashDelta").textContent=Zi()?`${o(Zi())}/day assets`:v.cash<25e4?"Liquidit\xE0 bassa":"Disponibile",r("#creditMetric").textContent=o(l.creditUsed,!0),r("#creditSub").textContent=`di ${o(ge(),!0)}`,r("#repMetric").textContent=Math.round(v.reputation),r("#rankMetric").textContent=sl(),r("#portfolioValue").textContent=o(l.nav),r("#portfolioReturn").textContent=`${m>=0?"+":""}${m.toFixed(1)}% dalla partenza`,r("#portfolioReturn").style.color=m>=0?"var(--green)":"var(--red)",r("#investedMetric").textContent=o(l.invested,!0),r("#activePnlMetric").textContent=o(l.activePnl,!0),r("#activePnlMetric").style.color=l.activePnl>=0?"var(--green)":"var(--red)",r("#completedMetric").textContent=v.completedDeals,r("#creditAvailableMetric").textContent=o(l.creditAvailable,!0),r("#activeCount").textContent=v.activeDeals.length,r("#gameDate").textContent=u(dr());let T=(v.profileName||"GB").split(/\s+/).map(D=>D[0]).slice(0,2).join("").toUpperCase();r(".profile-button")&&(r(".profile-button").textContent=T),[["copper",v.copperPrice,v.copperPrev,`${o(v.copperPrice)}/t`,2],["aluminium",v.aluminiumPrice,v.aluminiumPrev,`${o(v.aluminiumPrice)}/t`,2],["urea",v.ureaPrice,v.ureaPrev,`${o(v.ureaPrice)}/t`,2],["crude",v.crudePrice,v.crudePrev,`$${v.crudePrice.toFixed(2)}/bbl`,2],["wheat",v.wheatPrice,v.wheatPrev,`${o(v.wheatPrice)}/t`,2],["ironore",v.ironorePrice,v.ironorePrev,`${o(v.ironorePrice)}/t`,2],["eurusd",v.eurusd,v.eurusdPrev,v.eurusd.toFixed(4),2],["freight",v.freightIndex,v.freightPrev,v.freightIndex.toFixed(1),2]].forEach(([D,B,ne,Q,te])=>{let le=ne?(B/ne-1)*100:0;r(`#${D}Price`).textContent=Q;let Le=r(`#${D}Move`);Le.textContent=`${le>=0?"+":""}${le.toFixed(te)}%`,Le.style.color=le>=0?"var(--green)":"var(--red)"})}function Cp(){let l=v.navHistory.length>=2?v.navHistory:[1e6,1e6],h=Math.min(...l)*.995,T=Math.max(...l)*1.005-h||1,P=l.map((B,ne)=>{let Q=ne/(l.length-1)*260,te=67-(B-h)/T*58;return[Q,te]});r("#equityLine").setAttribute("points",P.map(B=>B.join(",")).join(" "));let D=`M ${P[0][0]} 72 L ${P.map(B=>B.join(" ")).join(" L ")} L ${P.at(-1)[0]} 72 Z`;r("#equityArea").setAttribute("d",D),r("#equityArea").setAttribute("fill","rgba(87,230,255,.18)")}function Sn(){e(".panel-tab").forEach(l=>l.classList.toggle("active",l.dataset.leftTab===ue)),e(".left-section").forEach(l=>l.classList.toggle("active",l.id===`left-${ue}`))}function Vu(){let l=r("#activeDealsList");if(!v.activeDeals.length){l.innerHTML='<div class="empty-card">Nessuna operazione aperta.<br>Apri la scheda Opportunit\xE0 e scegli una rotta sul globo.</div>';return}l.innerHTML=v.activeDeals.map(h=>{let m=qe(h.opportunityId),T=Qi(h),P=al(h);return`<button class="deal-card ${$.type==="deal"&&$.id===h.id?"selected":""}" data-deal-id="${h.id}">
        <div class="deal-card-head"><span class="route-name">${st(m.origin).name} <span class="route-arrow">\u2192</span> ${st(m.destination).name}</span><span class="status-pill ${h.pendingDecision?"high":""}">${h.pendingDecision?"Decisione":Math.round(T*100)+"%"}</span></div>
        <div class="deal-card-meta"><div><span>Unrealized P&amp;L</span><strong style="color:${P>=0?"var(--green)":"var(--red)"}">${o(P)}</strong></div><div><span>ETA</span><strong>${Math.max(0,h.duration-h.elapsed)} giorni</strong></div><div><span>Hedge</span><strong>${h.hedgeRatio||0}%</strong></div><div><span>Ops ready</span><strong>${Math.round(Ki(h))}%</strong></div></div>
        <div class="progress-track"><span style="width:${T*100}%"></span></div>
      </button>`}).join(""),e("[data-deal-id]",l).forEach(h=>h.addEventListener("click",()=>Gi(h.dataset.dealId)))}function Wu(){let l=r("#historyList");if(!v.history.length){l.innerHTML='<div class="empty-card">Il track record comparir\xE0 dopo il primo deal chiuso.</div>';return}l.innerHTML=v.history.map(h=>{let m=qe(h.opportunityId);return`<button class="history-card ${$.type==="history"&&$.id===h.id?"selected":""}" data-history-id="${h.id}"><div class="history-card-head"><span class="route-name">${m.title}</span><strong class="history-pnl ${h.pnl>=0?"positive":"negative"}">${o(h.pnl)}</strong></div><div class="deal-card-meta"><div><span>Durata</span><strong>${h.days} giorni</strong></div><div><span>Ops score</span><strong>${Math.round(h.operationalReadiness??100)}%</strong></div><div><span>Margin calls</span><strong>${h.marginCalls||0}</strong></div><div><span>FX hedge</span><strong>${h.fxHedgeRatio||0}%</strong></div></div></button>`}).join(""),e("[data-history-id]",l).forEach(h=>h.addEventListener("click",()=>xp(h.dataset.historyId)))}function Rp(){let l=r("#inventorySummary"),h=r("#inventoryList"),m=v.activeDeals.reduce((B,ne)=>B+(ne.quantity||qe(ne.opportunityId).quantity),0),T=v.activeDeals.reduce((B,ne)=>{let Q=qe(ne.opportunityId);return B+we(Q,ne.quantity||Q.quantity,ne.capital)},0),P=v.activeDeals.filter(B=>os(B).key==="transit").length,D=v.activeDeals.filter(B=>os(B).key==="port").length;if(l.innerHTML=`
      <div><span>Physical tonnes</span><strong>${m.toLocaleString("en-US")} t</strong></div>
      <div><span>Marked value</span><strong>${o(T,!0)}</strong></div>
      <div><span>In transit</span><strong>${P} cargo</strong></div>
      <div><span>At port</span><strong>${D} cargo</strong></div>`,!v.activeDeals.length){h.innerHTML='<div class="empty-card">Nessun inventario fisico. Avvia un deal dal Market per aprire il primo cargo.</div>';return}h.innerHTML=v.activeDeals.map(B=>{let ne=qe(B.opportunityId),Q=os(B),te=B.quantity||ne.quantity,le=we(ne,te,B.capital),Le=Qi(B);return`<button class="inventory-card" data-inventory-deal="${B.id}">
        <div class="inventory-head"><strong>${te} t ${ne.commodity}</strong><span class="phase-chip ${Q.key}">${Q.label}</span></div>
        <div class="inventory-grid">
          <div><span>Location</span><strong>${Q.location}</strong></div>
          <div><span>Market value</span><strong>${o(le,!0)}</strong></div>
          <div><span>Transport</span><strong>${ne.transportMode}</strong></div>
          <div><span>Insured</span><strong>110% cargo value</strong></div>
        </div>
        <div class="progress-track"><span style="width:${Le*100}%"></span></div>
      </button>`}).join(""),e("[data-inventory-deal]",h).forEach(B=>B.addEventListener("click",()=>Gi(B.dataset.inventoryDeal)))}function Pp(){let l=r("#operationsSummary"),h=r("#operationsList");if(!l||!h)return;let m=v.activeDeals.map(Ot),T=m.flatMap(Q=>Q.operations.documents),P=T.filter(Q=>Q.status==="ready").length,D=T.filter(Q=>Q.status==="blocked").length,B=m.filter(Q=>Q.operations.storage.active).length,ne=m.length?m.reduce((Q,te)=>Q+Ki(te),0)/m.length:0;if(l.innerHTML=`
      <div><span>Open contracts</span><strong>${m.length*2}</strong></div>
      <div><span>Document readiness</span><strong>${T.length?Math.round(P/T.length*100):0}%</strong></div>
      <div><span>Blocked documents</span><strong style="color:${D?"var(--red)":"var(--green)"}">${D}</strong></div>
      <div><span>Active storage</span><strong>${B}</strong></div>`,!m.length){h.innerHTML='<div class="empty-card">Nessuna catena operativa aperta. Avvia un deal per generare contratti, booking e documenti.</div>';return}h.innerHTML=m.map(Q=>{let te=qe(Q.opportunityId),le=Q.operations,Le=Ki(Q),ct=le.documents.filter(it=>it.status==="blocked").length;return`<button class="operations-card" data-operations-deal="${Q.id}">
        <div class="operations-head"><div><span>${le.contractId}</span><strong>${te.title}</strong></div><div class="readiness-ring" style="--value:${Le}"><strong>${Math.round(Le)}%</strong></div></div>
        <div class="operations-grid">
          <div><span>Carrier</span><strong>${le.transport.carrier}</strong></div>
          <div><span>Transport status</span><strong>${le.transport.status}</strong></div>
          <div><span>Storage</span><strong>${le.storage.active?"Active":le.storage.reserved?"Reserved":"Not booked"}</strong></div>
          <div><span>Exceptions</span><strong style="color:${ct?"var(--red)":"var(--green)"}">${ct?ct+" blocked":"None"}</strong></div>
        </div>
        <div class="document-strip">${le.documents.map(it=>`<i class="document-dot ${it.status}"></i>`).join("")}</div>
      </button>`}).join(""),e("[data-operations-deal]",h).forEach(Q=>Q.addEventListener("click",()=>Gi(Q.dataset.operationsDeal)))}function $u(){let l=r("#fleetSummary"),h=r("#fleetList"),m=r("#charterMarketList");if(!l||!h||!m)return;let T=v.fleetAssets.filter(B=>B.status==="assigned").length,P=v.fleetAssets.filter(B=>B.status==="available").length,D=v.fleetAssets.reduce((B,ne)=>B+(Fe(ne.catalogId)?.capacity||0),0);l.innerHTML=`
      <div><span>Chartered assets</span><strong>${v.fleetAssets.length}</strong></div>
      <div><span>Available</span><strong>${P}</strong></div>
      <div><span>Assigned</span><strong>${T}</strong></div>
      <div><span>Total capacity</span><strong>${D.toLocaleString("en-US")} t</strong></div>`,v.fleetAssets.length?(h.innerHTML=v.fleetAssets.map(B=>{let ne=Fe(B.catalogId),Q=B.assignedDealId?ai(B.assignedDealId):null;return`<button class="fleet-card ${$.type==="vessel"&&$.id===B.id?"selected":""}" data-fleet-asset="${B.id}">
          <div class="fleet-card-head"><div><span>${ne.vesselClass}</span><strong>${ne.name}</strong></div><span class="status-pill ${B.status==="assigned"?"medium":"low"}">${B.status}</span></div>
          <div class="fleet-grid">
            <div><span>Position</span><strong>${st(B.positionHub)?.name||"At sea"}</strong></div>
            <div><span>Capacity</span><strong>${ne.capacity.toLocaleString("en-US")} t</strong></div>
            <div><span>Charter remaining</span><strong>${B.daysRemaining} days</strong></div>
            <div><span>Allocation</span><strong>${Q?qe(Q.opportunityId).title:"Open"}</strong></div>
          </div>
          <div class="charter-life"><span style="width:${B.daysRemaining/B.charterDays*100}%"></span></div>
        </button>`}).join(""),e("[data-fleet-asset]",h).forEach(B=>B.addEventListener("click",()=>dl(B.dataset.fleetAsset)))):h.innerHTML='<div class="empty-card">Nessuna nave sotto controllo. Noleggia il primo asset dal charter market.</div>',m.innerHTML=w.map(B=>{let ne=Ji(B),Q=v.fleetAssets.some(Le=>Le.catalogId===B.id),te=Hn(B),le=v.cash>=te;return`<div class="charter-card ${ne?"":"locked"}">
        <div class="fleet-card-head"><div><span>${B.vesselClass}</span><strong>${B.name}</strong></div><span class="status-pill ${ne?"low":"high"}">${ne?"Available":"Locked"}</span></div>
        <p>${B.description}</p>
        <div class="fleet-grid">
          <div><span>Capacity</span><strong>${B.capacity.toLocaleString("en-US")} t</strong></div>
          <div><span>Position</span><strong>${st(B.homeHub).name}</strong></div>
          <div><span>Charter block</span><strong>${B.charterDays} days</strong></div>
          <div><span>Upfront hire</span><strong>${o(te)}</strong></div>
        </div>
        <button class="button secondary charter-button" data-charter-vessel="${B.id}" ${!ne||Q||!le?"disabled":""}>${Q?"Already chartered":ne?"Start time charter":B.requiresOffice&&!ot(B.requiresOffice)?`Requires ${X(B.requiresOffice).name}`:`Requires rep ${B.minReputation}`}</button>
      </div>`}).join(""),e("[data-charter-vessel]",m).forEach(B=>B.addEventListener("click",()=>Ti(B.dataset.charterVessel)))}function Ip(){let l=r("#riskDashboard"),h=Ru(),m=h.riskScore<35?"low":h.riskScore<68?"medium":"high",T=Object.entries(h.grossByCommodity).sort((D,B)=>B[1]-D[1])[0],P=[];h.creditUtilization>.75&&P.push("La linea di credito \xE8 utilizzata oltre il 75%."),h.concentration>.65&&v.activeDeals.length>1&&P.push("Il portafoglio \xE8 concentrato su un singolo deal."),h.liquidityCoverage<1.25&&P.push("La liquidit\xE0 potrebbe non coprire margin call e costi imprevisti."),h.netFlatExposure>1e6&&P.push("L\u2019esposizione flat-price non coperta supera $1 milione."),h.netFxExposure>5e5&&P.push("L\u2019esposizione valutaria residua \xE8 significativa."),h.marginRequirement>v.cash*1.5&&P.push("Il collateral futures \xE8 elevato rispetto alla liquidit\xE0 disponibile."),l.innerHTML=`
      <div class="risk-card">
        <div class="risk-headline"><span>Desk risk score</span><strong>${m.toUpperCase()}</strong></div>
        <div class="risk-score">${Math.round(h.riskScore)}<small style="font-size:11px;color:var(--muted)"> / 100</small></div>
        <div class="risk-meter"><span style="width:${h.riskScore}%"></span></div>
      </div>
      <div class="risk-card">
        <div class="risk-headline"><strong>Core metrics</strong><span>Live</span></div>
        <div class="risk-row"><span>Net flat-price exposure</span><strong>${o(h.netFlatExposure,!0)}</strong></div>
        <div class="risk-row"><span>Net FX exposure</span><strong>${o(h.netFxExposure,!0)}</strong></div>
        <div class="risk-row"><span>Futures margin requirement</span><strong>${o(h.marginRequirement,!0)}</strong></div>
        <div class="risk-row"><span>Stress loss estimate</span><strong>${o(h.stressLoss,!0)}</strong></div>
        <div class="risk-row"><span>Credit utilization</span><strong>${(h.creditUtilization*100).toFixed(1)}%</strong></div>
        <div class="risk-row"><span>Largest deal concentration</span><strong>${(h.concentration*100).toFixed(1)}%</strong></div>
        <div class="risk-row"><span>Liquidity coverage</span><strong>${h.liquidityCoverage.toFixed(1)}\xD7</strong></div>
        <div class="risk-row"><span>Margin reserve estimate</span><strong>${o(h.liquidityReserve,!0)}</strong></div>
      </div>
      <div class="risk-card">
        <div class="risk-headline"><strong>Risk allocation</strong><span>${T?T[0]:"No positions"}</span></div>
        <div class="risk-bars">
          <div class="risk-bar-row"><div><span>Credit</span><strong>${(h.creditUtilization*100).toFixed(0)}%</strong></div><div class="capital-bar"><span class="${h.creditUtilization<.5?"low":h.creditUtilization<.8?"medium":"high"}" style="width:${t(h.creditUtilization*100,0,100)}%"></span></div></div>
          <div class="risk-bar-row"><div><span>Concentration</span><strong>${(h.concentration*100).toFixed(0)}%</strong></div><div class="capital-bar"><span class="${h.concentration<.5?"low":h.concentration<.75?"medium":"high"}" style="width:${t(h.concentration*100,0,100)}%"></span></div></div>
          <div class="risk-bar-row"><div><span>Liquidity stress</span><strong>${h.liquidityCoverage.toFixed(1)}\xD7</strong></div><div class="capital-bar"><span class="${h.liquidityCoverage>2?"low":h.liquidityCoverage>1?"medium":"high"}" style="width:${t(100/h.liquidityCoverage,8,100)}%"></span></div></div>
        </div>
      </div>
      ${P.length?P.map(D=>`<div class="risk-alert">${D}</div>`).join(""):'<div class="success-box">Il portafoglio \xE8 entro i limiti operativi del desk.</div>'}`}function mr(){let l=r("#opportunityList"),h=r("#marketCycleSummary");if(h){let m=Object.values(v.negotiations||{}).filter(T=>T.cycle===v.marketCycle&&T.status==="accepted").length;h.innerHTML=`
        <div><span>Market cycle</span><strong>#${v.marketCycle}</strong></div>
        <div><span>Refresh in</span><strong>${Math.max(0,7-v.marketCycleDay)} days</strong></div>
        <div><span>Accepted bids</span><strong>${m}</strong></div>
        <div><span>Active crises</span><strong>${v.activeGlobalEvents.length}</strong></div>`}l.innerHTML=d.map(m=>{let T=xn(m),P=pr(m),D=st(m.origin),B=st(m.destination),ne=$.type==="opportunity"&&$.id===m.id?"selected":"",Q=Oe(m),te=v.negotiations?.[m.id],le=T?P?te?.status==="accepted"?"Bid accepted":te?.status==="rejected"?"Revise bid":`${Q.expiresIn}d left`:"Taken":"Locked",Le=!T||!P?"high":te?.status==="accepted"?"low":te?.status==="rejected"?"medium":m.riskClass;return`<button class="opportunity-card ${ne} ${T&&P?"":"locked"}" data-opportunity-id="${m.id}" ${T&&P?"":"disabled"}>
        <div class="opportunity-card-head"><span class="route-name">${D.name} <span class="route-arrow">\u2192</span> ${B.name}</span><span class="status-pill ${Le}">${le}</span></div>
        <div class="offer-line"><strong>${Q.quantity.toLocaleString("en-US")} t ${m.commodity}</strong><span>Cycle ${v.marketCycle}</span></div>
        <div class="deal-card-meta"><div><span>Expected P&amp;L</span><strong>${o(Q.expectedPnl)}</strong></div><div><span>Equity richiesta</span><strong>${o(Q.equity,!0)}</strong></div></div>
        <div class="opportunity-card-meta"><div><span>Durata</span><strong>${Q.duration} giorni</strong></div><div><span>Acceptance</span><strong>${Math.round(Q.acceptance)}%</strong></div></div>
        ${Q.crisisLabels.length?`<div class="crisis-tag">Impacted \xB7 ${Q.crisisLabels.join(", ")}</div>`:""}
      </button>`}).join(""),e("[data-opportunity-id]",l).forEach(m=>m.addEventListener("click",()=>zu(m.dataset.opportunityId)))}function Lp(){let l=r("#counterpartySummary"),h=r("#counterpartyList");if(!l||!h)return;let m={};v.activeDeals.forEach(P=>{[P.supplierId,P.buyerId].filter(Boolean).forEach(D=>{m[D]=(m[D]||0)+(P.capital||0)})});let T=f.reduce((P,D)=>P+Y(D.id).relationship,0)/f.length;l.innerHTML=`
      <div><span>Approved KYC</span><strong>${f.filter(P=>P.kyc==="Approved").length}/${f.length}</strong></div>
      <div><span>Avg relationship</span><strong>${Math.round(T)}/100</strong></div>
      <div><span>Active exposure</span><strong>${o(Object.values(m).reduce((P,D)=>P+D,0),!0)}</strong></div>
      <div><span>Disputes</span><strong>${f.reduce((P,D)=>P+(Y(D.id).disputes||0),0)}</strong></div>`,h.innerHTML=f.map(P=>{let D=Y(P.id),B=m[P.id]||0,ne=D.relationship>=65?"low":D.relationship>=45?"medium":"high";return`<div class="counterparty-card">
        <div class="counterparty-head"><div><span>${P.type} \xB7 ${P.country}</span><strong>${P.name}</strong></div><span class="status-pill ${P.kyc==="Approved"?"low":"medium"}">${P.kyc}</span></div>
        <p>${P.description}</p>
        <div class="counterparty-grid"><div><span>Credit score</span><strong>${P.credit}/100</strong></div><div><span>Reliability</span><strong>${P.reliability}/100</strong></div><div><span>Relationship</span><strong>${D.relationship}/100</strong></div><div><span>Exposure</span><strong>${o(B,!0)}</strong></div></div>
        <div class="relationship-bar"><span class="${ne}" style="width:${D.relationship}%"></span></div>
        <div class="counterparty-foot"><span>${D.deals||0} completed deals</span><span>${D.disputes||0} disputes</span></div>
      </div>`}).join("")}function Dp(){let l=r("#worldSummary"),h=r("#worldEventList");if(!l||!h)return;let m=ae();l.innerHTML=`
      <div><span>Active disruptions</span><strong>${m.length}</strong></div>
      <div><span>Freight index</span><strong>${v.freightIndex.toFixed(1)}</strong></div>
      <div><span>Effective credit</span><strong>${o(ge(),!0)}</strong></div>
      <div><span>Next risk window</span><strong>${Math.max(0,(v.nextGlobalEventDay||0)-v.dayIndex)}d</strong></div>`;let T=m.length?m.map(D=>`<div class="world-event-card active ${D.severity}">
      <div class="world-event-head"><div><span>${D.region}</span><strong>${D.title}</strong></div><span class="status-pill ${D.severity}">${D.remaining}d</span></div>
      <p>${D.description}</p>
      <div class="world-impact">${D.creditPenalty?`${o(D.creditPenalty,!0)} temporary credit reduction`:D.freightShock?`Freight shock +${D.freightShock} points`:D.commodity?`${D.commodity} price pressure`:"Operational disruption"}</div>
    </div>`).join(""):'<div class="success-box">Nessuna crisi globale attiva. Le rotte operano in condizioni normali.</div>',P=(v.worldEventFeed||[]).map(D=>`<div class="intelligence-item ${D.type}"><span>${u(new Date(D.date))}</span><strong>${D.title}</strong><p>${D.description}</p></div>`).join("");h.innerHTML=`${T}<div class="section-head history-head"><div><span class="eyebrow">Intelligence feed</span><h2>Ultimi sviluppi</h2></div></div>${P||'<div class="empty-card">La global intelligence feed si aggiorner\xE0 con il tempo.</div>'}`}function Np(){let l=r("#financeSummary"),h=r("#financeDealList"),m=r("#bankingList");if(!l||!h||!m)return;let T=_n(),P=T.marginCollateral||0,D=v.activeDeals.reduce((B,ne)=>B+(ne.financingAccrued||0),0);l.innerHTML=`
      <div><span>Credit used</span><strong>${o(T.creditUsed,!0)}</strong></div>
      <div><span>Credit available</span><strong>${o(T.creditAvailable,!0)}</strong></div>
      <div><span>Futures collateral</span><strong>${o(P,!0)}</strong></div>
      <div><span>Interest accrued</span><strong>${o(D)}</strong></div>
      <div><span>Margin calls</span><strong>${v.marginCalls||0}</strong></div>
      <div><span>Emergency fees</span><strong>${o(v.emergencyFundingCost||0)}</strong></div>`,h.innerHTML=v.activeDeals.length?v.activeDeals.map(B=>{let ne=qe(B.opportunityId),Q=ss(B),te=Q?(B.marginCollateral||0)/Q:1;return`<button class="finance-card" data-finance-deal="${B.id}">
        <div class="finance-card-head"><div><span>${ne.commodity} \xB7 ${ne.title}</span><strong>${b[B.financingStrategy||"revolver"]?.label}</strong></div><span class="status-pill ${te>=1?"low":"high"}">${Math.round(te*100)}% margin</span></div>
        <div class="finance-grid"><div><span>Debt</span><strong>${o(B.borrowed,!0)}</strong></div><div><span>Rate</span><strong>${((B.financingRate||0)*100).toFixed(1)}%</strong></div><div><span>Collateral</span><strong>${o(B.marginCollateral||0,!0)}</strong></div><div><span>Interest</span><strong>${o(B.financingAccrued||0)}</strong></div></div>
        <div class="capital-bar margin"><span style="width:${t(te*100,0,100)}%"></span></div>
      </button>`}).join(""):'<div class="empty-card">Nessun funding attivo. Apri un deal per utilizzare linee, LC e futures collateral.</div>',m.innerHTML=x.map(B=>{let ne=B.id!=="oceanic"||ot("singapore"),Q=ge()*B.limitShare,te=T.creditUsed*B.limitShare;return`<div class="bank-card ${ne?"":"locked"}"><div class="finance-card-head"><div><span>${B.type}</span><strong>${B.name}</strong></div><span class="status-pill ${ne?"low":"high"}">${ne?"Active":"Locked"}</span></div><p>${B.description}</p><div class="finance-grid"><div><span>Capacity</span><strong>${o(Q,!0)}</strong></div><div><span>Indicative rate</span><strong>${(B.rate*100).toFixed(1)}%</strong></div><div><span>Relationship</span><strong>${B.relationship}/100</strong></div><div><span>Allocated</span><strong>${o(te,!0)}</strong></div></div></div>`}).join(""),e("[data-finance-deal]",h).forEach(B=>B.addEventListener("click",()=>Gi(B.dataset.financeDeal)))}function Up(l,h){let m=M.find(P=>P.id===l);if(!m)return;v.academyProgress=v.academyProgress||{};let T=v.academyProgress[l]||{attempts:0,completed:!1};T.attempts+=1,Number(h)===m.correct?T.completed||(T.completed=!0,T.completedAt=v.date,v.academyScore=(v.academyScore||0)+100,v.cash+=12e3,v.reputation=t(v.reputation+1,0,100),je(`Lezione completata: ${m.title}. Reward ${o(12e3)}.`)):(T.lastWrong=Number(h),je("Risposta non corretta. Rileggi il concetto e riprova.")),v.academyProgress[l]=T,ri(),It(),zt()}function Fp(){let l=r("#academySummary"),h=r("#academyLessonList"),m=r("#glossaryList");if(!l||!h||!m)return;let T=M.filter(D=>v.academyProgress?.[D.id]?.completed).length,P=v.completedDeals+v.activeDeals.length;l.innerHTML=`<div><span>Lessons complete</span><strong>${T}/${M.length}</strong></div><div><span>Academy score</span><strong>${v.academyScore||0}</strong></div><div><span>Field experience</span><strong>${P} cargo</strong></div><div><span>Difficulty</span><strong>${v.difficulty}</strong></div>`,h.innerHTML=M.map((D,B)=>{let ne=v.academyProgress?.[D.id]||{},Q=B===0||M.slice(0,B).every(te=>v.academyProgress?.[te.id]?.completed)||v.difficulty==="guided";return`<div class="academy-card ${ne.completed?"completed":Q?"":"locked"}"><div class="academy-head"><div><span>Module ${B+1}</span><strong>${D.title}</strong></div><span class="status-pill ${ne.completed?"low":Q?"medium":"high"}">${ne.completed?"Complete":Q?"Open":"Locked"}</span></div><p>${D.concept}</p>${Q&&!ne.completed?`<div class="academy-question"><strong>${D.question}</strong>${D.options.map((te,le)=>`<button data-academy-answer="${D.id}" data-answer-index="${le}">${te}</button>`).join("")}</div>`:ne.completed?'<div class="success-box">Conoscenza verificata e applicabile nei deal.</div>':'<div class="warning-box">Completa il modulo precedente per sbloccare questa lezione.</div>'}</div>`}).join(""),m.innerHTML=E.map(([D,B])=>`<details class="glossary-item"><summary>${D}</summary><p>${B}</p></details>`).join(""),e("[data-academy-answer]",h).forEach(D=>D.addEventListener("click",()=>Up(D.dataset.academyAnswer,D.dataset.answerIndex)))}function pl(){let l=r("#investmentSummary"),h=r("#builderQueue"),m=r("#investmentList");if(!l||!h||!m)return;let T=lr(),P=Zi(),D=ia(),B=fn();l.innerHTML=`<div><span>Industrial levels</span><strong>${T}</strong></div><div><span>Asset book value</span><strong>${o(D,!0)}</strong></div><div><span>Daily asset income</span><strong>${o(P)}</strong></div><div><span>Project teams</span><strong>${B}/${gn()}</strong></div>`;let ne=G.filter(te=>ki(te.id).buildingTo);h.innerHTML=ne.length?ne.map(te=>{let le=ki(te.id),Le=xi(te,le.buildingTo),ct=(1-le.daysRemaining/Le)*100;return`<div class="builder-card"><div><span>${te.chain} construction</span><strong>${te.name} \xB7 L${le.buildingTo}</strong><small>${le.daysRemaining} giorni rimanenti</small></div><div class="progress-track"><span style="width:${ct}%"></span></div></div>`}).join(""):`<div class="empty-card compact">Nessun progetto in costruzione. Hai ${gn()} project team disponibili.</div>`;let Q=G.filter(te=>qt==="all"||te.chain===qt);m.innerHTML=Q.map(te=>{let le=ki(te.id),Le=le.level||0,ct=Le+1,it=Le>=te.maxLevel,vt=zn(te),Nt=!!le.buildingTo,yt=it?0:cr(te,ct),oi=it?0:xi(te,ct),bt=[te.dailyIncome?`${o(te.dailyIncome*Le)}/day`:null,te.pnlBonus?`+${o(te.pnlBonus*Le)} deal edge`:null,te.durationBonus&&Le?`-${te.durationBonus*Le} days`:null].filter(Boolean).join(" \xB7 ");return`<article class="investment-card chain-${te.chain} ${Nt?"building":""} ${vt?"":"locked"}" data-investment-card="${te.id}"><div class="investment-card-top"><div class="asset-icon">${te.icon}</div><div><span>${te.chain}</span><strong>${te.name}</strong><small>${st(te.hub)?.name||""}</small></div><b>L${Le}/${te.maxLevel}</b></div><p>${te.description}</p><div class="asset-level-track">${Array.from({length:te.maxLevel},(Tn,fr)=>`<i class="${fr<Le?"filled":""} ${le.buildingTo===fr+1?"building":""}"></i>`).join("")}</div><div class="investment-benefit">${Le?bt:"Nessun beneficio attivo \u2014 costruisci il livello 1"}</div><div class="investment-economics"><div><span>Upgrade cost</span><strong>${it?"MAX":o(yt)}</strong></div><div><span>Build time</span><strong>${it?"\u2014":`${oi} days`}</strong></div></div><button class="button ${Nt?"secondary":"primary"} investment-action" data-build-investment="${te.id}" ${it||Nt||!vt||v.cash<yt||fn()>=gn()?"disabled":""}>${Nt?`Building L${le.buildingTo} \xB7 ${le.daysRemaining}d`:it?"Maximum level":vt?`Build level ${ct}`:`Requires rep ${te.minReputation} \xB7 ${te.minDeals} deals`}</button></article>`}).join(""),e("[data-empire-chain]").forEach(te=>te.classList.toggle("active",te.dataset.empireChain===qt)),e("[data-empire-chain]").forEach(te=>te.onclick=()=>{qt=te.dataset.empireChain,pl()}),e("[data-build-investment]",m).forEach(te=>te.onclick=()=>Gn(te.dataset.buildInvestment)),e("[data-investment-card]",m).forEach(te=>te.addEventListener("click",le=>{le.target.closest("button")||ju(te.dataset.investmentCard)}))}function Op(){let l=r("#hqSummary"),h=r("#officeList"),m=r("#staffList");!l||!h||!m||(l.innerHTML=`
      <div><span>Regional desks</span><strong>${v.offices.length}/${k.length}</strong></div>
      <div><span>Team members</span><strong>${v.staff.length}/${W.length}</strong></div>
      <div><span>Daily overhead</span><strong>${o(ea())}</strong></div>
      <div><span>Total overhead paid</span><strong>${o(v.overheadPaid||0,!0)}</strong></div>`,h.innerHTML=k.map(T=>{let P=ot(T.id),D=Qr(T);return`<div class="management-card ${P?"owned":D?"":"locked"}">
        <div class="management-head"><div><span>Regional office</span><strong>${T.name}</strong></div><span class="status-pill ${P?"low":D?"medium":"high"}">${P?"Active":D?"Available":"Locked"}</span></div>
        <p>${T.description}</p><div class="management-benefit">${T.benefit}</div>
        <div class="management-grid"><div><span>Opening cost</span><strong>${T.cost?o(T.cost):"Included"}</strong></div><div><span>Daily cost</span><strong>${o(T.dailyCost)}</strong></div></div>
        ${T.id==="geneva"?"":`<button class="button secondary management-action" data-open-office="${T.id}" ${P||!D||v.cash<T.cost?"disabled":""}>${P?"Desk active":D?"Open regional desk":`Requires rep ${T.minReputation}`}</button>`}
      </div>`}).join(""),m.innerHTML=W.map(T=>{let P=Xt(T.id),D=At(T);return`<div class="management-card ${P?"owned":D?"":"locked"}">
        <div class="management-head"><div><span>Specialist</span><strong>${T.role}</strong></div><span class="status-pill ${P?"low":D?"medium":"high"}">${P?"Hired":D?"Available":"Locked"}</span></div>
        <p>${T.description}</p><div class="management-benefit">${T.benefit}</div>
        <div class="management-grid"><div><span>Hiring cost</span><strong>${o(T.hireCost)}</strong></div><div><span>Daily salary</span><strong>${o(T.dailySalary)}</strong></div></div>
        <button class="button secondary management-action" data-hire-staff="${T.id}" ${P||!D||v.cash<T.hireCost?"disabled":""}>${P?"In team":D?"Hire specialist":`Requires rep ${T.minReputation}`}</button>
      </div>`}).join(""),e("[data-open-office]",h).forEach(T=>T.addEventListener("click",()=>Mi(T.dataset.openOffice))),e("[data-hire-staff]",m).forEach(T=>T.addEventListener("click",()=>vn(T.dataset.hireStaff))))}function Bp(){let l=r("#careerSummary"),h=r("#missionList");if(!l||!h)return;let m=v.completedMissions.length;l.innerHTML=`
      <div><span>Rank</span><strong>${sl()}</strong></div>
      <div><span>Missions</span><strong>${m}/${H.length}</strong></div>
      <div><span>Completed deals</span><strong>${v.completedDeals}</strong></div>
      <div><span>Reputation</span><strong>${Math.round(v.reputation)}/100</strong></div>`,h.innerHTML=H.map(T=>{let P=v.completedMissions.includes(T.id),D=Math.min(T.target,T.progress(v)),B=T.target?D/T.target*100:100,ne=[T.cash?o(T.cash):null,T.credit?`${o(T.credit)} credit`:null,T.reputation?`+${T.reputation} rep`:null].filter(Boolean).join(" \xB7 ");return`<div class="mission-card ${P?"completed":""}">
        <div class="mission-head"><div><span>Career mission</span><strong>${T.title}</strong></div><span class="status-pill ${P?"low":"medium"}">${P?"Complete":`${D}/${T.target}`}</span></div>
        <p>${T.description}</p><div class="mission-reward">Reward \xB7 ${ne}</div>
        <div class="progress-track"><span style="width:${B}%"></span></div>
      </div>`}).join("")}function qu(){let l=r("#leaderboardSummary"),h=r("#leaderboardTable"),m=r("#leaderboardProfile"),T=r("#seasonHistory");if(!l||!h||!m||!T)return;let P=Nu(_e),D=P.find(Q=>Q.isPlayer),B=Du(),ne=B.next?t(Wn()/B.next*100,0,100):100;l.innerHTML=`
      <div><span>Career League</span><strong>#${D.position} / ${P.length}</strong></div>
      <div><span>League</span><strong class="league-name ${B.className}">${B.name}</strong></div>
      <div><span>Rating</span><strong>${Wn().toLocaleString("en-US")}</strong></div>
      <div><span>Season</span><strong>S${ls()} \xB7 day ${Qh()}/90</strong></div>`,m.innerHTML=`
      <div class="leaderboard-profile-card">
        <div class="leaderboard-avatar">${(v.profileName||"GB").split(/\s+/).map(Q=>Q[0]).slice(0,2).join("").toUpperCase()}</div>
        <div class="leaderboard-profile-copy"><span>Player identity</span><strong>${v.profileName}</strong><small>${v.companyName} \xB7 ${sl()}</small></div>
      </div>
      <div class="leaderboard-edit-grid"><label>Trader name<input id="leaderboardTraderName" maxlength="40" value="${String(v.profileName||"").replace(/"/g,"&quot;")}"></label><label>Trading house<input id="leaderboardCompanyName" maxlength="40" value="${String(v.companyName||"").replace(/"/g,"&quot;")}"></label></div>
      <button class="button secondary leaderboard-save" id="saveLeaderboardProfile">Save identity</button>
      <div class="league-progress"><div><span>${B.name}</span><strong>${B.next?`${Math.max(0,B.next-Wn()).toLocaleString("en-US")} points to next league`:"Highest league reached"}</strong></div><div class="progress-track"><span style="width:${ne}%"></span></div></div>`,h.innerHTML=`
      <div class="leaderboard-mode-tabs">${[["overall","Overall"],["pnl","P&L"],["operations","Operations"],["risk","Risk discipline"]].map(([Q,te])=>`<button data-leaderboard-mode="${Q}" class="${_e===Q?"active":""}">${te}</button>`).join("")}</div>
      <div class="leaderboard-head"><span>Rank</span><span>Trading house</span><span>${_e==="overall"?"Rating":_e==="pnl"?"Realized P&L":_e==="operations"?"Ops score":"Risk score"}</span></div>
      <div class="leaderboard-rows">${P.slice(0,10).map(Q=>`<div class="leaderboard-row ${Q.isPlayer?"player":""}"><span class="leaderboard-position ${Q.position<=3?"podium":""}">${Q.position<=3?["\u2160","\u2161","\u2162"][Q.position-1]:`#${Q.position}`}</span><div><strong>${Q.name}</strong><small>${Q.isPlayer?Q.trader:`${Q.city} \xB7 ${Q.country}`}</small></div><b>${Uu(Q,_e)}</b></div>`).join("")}${D.position>10?`<div class="leaderboard-divider">Your position</div><div class="leaderboard-row player"><span class="leaderboard-position">#${D.position}</span><div><strong>${D.name}</strong><small>${D.trader}</small></div><b>${Uu(D,_e)}</b></div>`:""}</div>
      <div class="leaderboard-disclosure">Career League uses transparent simulated rivals in this offline prototype. Your score is based only on your real SHIPPY career results.</div>
      <button class="button secondary leaderboard-share" id="copyLeaderboardResult">Copy ranking result</button>`,T.innerHTML=(v.leaderboardSnapshots||[]).length?v.leaderboardSnapshots.map(Q=>`<div class="season-card"><div><span>Season ${Q.season}</span><strong>#${Q.position} \xB7 ${Q.league}</strong></div><div><span>Rating</span><strong>${Q.score.toLocaleString("en-US")}</strong></div><div><span>P&L</span><strong>${o(Q.pnl,!0)}</strong></div></div>`).join(""):'<div class="empty-card">La prima stagione verr\xE0 archiviata dopo 90 giorni di gioco.</div>',e("[data-leaderboard-mode]",h).forEach(Q=>Q.addEventListener("click",()=>{_e=Q.dataset.leaderboardMode,qu()})),r("#saveLeaderboardProfile")?.addEventListener("click",()=>{let Q=r("#leaderboardTraderName")?.value.trim(),te=r("#leaderboardCompanyName")?.value.trim();Q&&(v.profileName=Q),te&&(v.companyName=te),It(),zt(),je("Identit\xE0 della Career League aggiornata.")}),r("#copyLeaderboardResult")?.addEventListener("click",async()=>{let Q=`SHIPPY Career League \xB7 ${v.companyName} \xB7 #${D.position}/${P.length} \xB7 ${B.name} \xB7 rating ${Wn()} \xB7 P&L ${o(v.realizedPnl||0)}`;try{await navigator.clipboard.writeText(Q),je("Risultato copiato.")}catch{je(Q)}})}function Xu(){Vu(),Wu(),Rp(),Pp(),$u(),Ip(),mr(),Lp(),Dp(),Np(),Fp(),pl(),Op(),Bp(),qu()}function kp(l){let h=d.filter(m=>xn(m)&&pr(m)&&[m.origin,m.destination,...m.via||[]].includes(l.id));return`
      <div class="location-badge">${l.type==="hq"?"\u25CF Headquarters":l.type}</div>
      <h2>${l.name}</h2>
      <div class="inspector-subtitle">${l.country} \xB7 ${l.subtitle}</div>
      <p class="inspector-subtitle" style="margin-top:12px">${l.description}</p>
      <div class="inspector-grid">
        <div class="inspector-stat"><span>Risk level</span><strong>${l.risk}</strong></div>
        <div class="inspector-stat"><span>Rotte disponibili</span><strong>${h.length}</strong></div>
        <div class="inspector-stat"><span>SHIPPY presence</span><strong>${ot(l.id)?"Regional desk":l.id==="geneva"?"Headquarters":"No office"}</strong></div>
        <div class="inspector-stat"><span>Commodity access</span><strong>${l.commodities.length}</strong></div>
      </div>
      <div class="inspector-section"><h3>Mercato locale</h3><div class="tag-row">${l.commodities.map(m=>`<span class="tag">${m}</span>`).join("")}</div></div>
      ${h.length?`<div class="inspector-section"><h3>Opportunit\xE0 collegate</h3>${h.map(m=>`<button class="event-choice" data-open-opportunity="${m.id}"><strong>${m.title}</strong><small>${st(m.origin).name} \u2192 ${st(m.destination).name} \xB7 ${o(Oe(m).basePnl)} attesi</small></button>`).join("")}</div>`:""}
      ${l.locked&&h.length===0?'<div class="warning-box">Hub non ancora accessibile. Completa pi\xF9 deal e aumenta la reputazione.</div>':""}
    `}function zp(l){let h=_n(),m=st(l.origin),T=st(l.destination),P=Ze(l.id),D=Oe(l,P),B=D.equity,ne=D.borrowed,Q=B+D.initialMargin,te=Q?v.cash/Q:10,le=ne?h.creditAvailable/ne:10,Le=Gu(l),ct=Number(Ne[l.id]??l.recommendedHedge??100),it=we(l,D.quantity,D.capital),vt=it*Math.max(0,1-ct/100),Nt=rs(l),yt=Ae[l.id]||"spot",oi=yt.startsWith("fleet:")?si(yt.slice(6)):null,bt=oi?Fe(oi.catalogId):null,Tn=D.expectedPnl+(bt?.bonusPnl||0)+(oi&&Xt("freight-charterer")?5e3:0),fr=Math.max(10,D.duration-(bt?.durationBonus||0)),us=ie(l),fl=R(us.supplierId),gl=R(us.buyerId),Zp=Y(us.supplierId),Jp=Y(us.buyerId),oa=P.status==="accepted",vl=P.status==="rejected",Kp=P.status==="consumed",en=D.structure,Qp=v.cash>=Q&&h.creditAvailable>=ne&&tt(en.financingId);return`
      <div class="location-badge">\u25CE Live market offer \xB7 ${D.expiresIn}d</div>
      <h2>${l.title}</h2>
      <div class="inspector-subtitle">${m.name} \u2192 ${T.name}${l.via?.length?` via ${l.via.map(St=>st(St).name).join(", ")}`:""}</div>
      <p class="inspector-subtitle" style="margin-top:12px">${l.description}</p>
      ${D.crisisLabels.length?`<div class="global-impact-box"><strong>Global disruption impact</strong><span>${D.crisisLabels.join(" \xB7 ")}</span></div>`:""}
      ${D.verticalSources?.length?`<div class="vertical-impact-box"><strong>Vertical integration advantage</strong><span>${D.verticalSources.join(" \xB7 ")}</span></div>`:""}
      <div class="inspector-grid">
        <div class="inspector-stat"><span>Expected P&amp;L</span><strong style="color:var(--green)">${o(Tn)}</strong></div>
        <div class="inspector-stat"><span>Duration</span><strong>${fr} giorni</strong></div>
        <div class="inspector-stat"><span>Total capital</span><strong>${o(D.capital,!0)}</strong></div>
        <div class="inspector-stat"><span>Offer quantity</span><strong>${D.quantity} t</strong></div>
      </div>
      <div class="inspector-section"><h3>Commercial counterparties</h3>
        <div class="party-pair">
          <div class="party-mini"><span>Supplier \xB7 ${fl?.country||""}</span><strong>${fl?.name||"Supplier"}</strong><small>Credit ${fl?.credit||0} \xB7 relationship ${Zp.relationship}</small></div>
          <div class="party-mini"><span>Buyer \xB7 ${gl?.country||""}</span><strong>${gl?.name||"Buyer"}</strong><small>Credit ${gl?.credit||0} \xB7 relationship ${Jp.relationship}</small></div>
        </div>
      </div>
      <div class="negotiation-box">
        <div class="negotiation-heading"><div><span class="eyebrow">Contract negotiation</span><h3>Costruisci la tua offerta</h3></div><strong>${Math.round(D.acceptance)}%</strong></div>
        <div class="acceptance-meter"><span style="width:${D.acceptance}%"></span></div>
        <label>Commercial quote<select id="commercialTermSelect">
          ${Object.entries(p.commercial).map(([St,pi])=>`<option value="${St}" ${P.commercial===St?"selected":""}>${pi.label}</option>`).join("")}
        </select></label>
        <label>Payment terms<select id="paymentTermSelect">
          ${Object.entries(p.payment).map(([St,pi])=>`<option value="${St}" ${P.payment===St?"selected":""}>${pi.label}</option>`).join("")}
        </select></label>
        <label>Delivery window<select id="deliveryTermSelect">
          ${Object.entries(p.delivery).map(([St,pi])=>`<option value="${St}" ${P.delivery===St?"selected":""}>${pi.label}</option>`).join("")}
        </select></label>
        <div class="negotiation-result ${oa?"accepted":vl?"rejected":""}">
          ${oa?"Offerta accettata: condizioni bloccate fino al refresh del mercato.":vl?"Offerta rifiutata: modifica almeno una condizione e inviala nuovamente.":"La probabilit\xE0 combina prezzo, pagamento, reputazione e relazione con il buyer."}
        </div>
        <button class="button secondary" id="submitNegotiationButton" ${Kp?"disabled":""}>${oa?"Rinegozia le condizioni":vl?"Invia nuova offerta":"Invia offerta al buyer"}</button>
      </div>
      <div class="inspector-section"><h3>Capital structure</h3>
        <div class="timeline-mini-row"><i></i><span>Equity richiesta</span><strong>${o(B)}</strong></div>
        <div class="capital-bar"><span style="width:${t(te*100,0,100)}%"></span></div>
        <div class="timeline-mini-row" style="margin-top:12px"><i></i><span>Credit facility</span><strong>${o(ne)}</strong></div>
        <div class="capital-bar"><span style="width:${t(le*100,0,100)}%"></span></div>
        <div class="timeline-mini-row" style="margin-top:12px"><i></i><span>Initial futures margin</span><strong>${o(D.initialMargin)}</strong></div>
        <div class="capital-bar margin"><span style="width:${t(v.cash/Math.max(1,D.initialMargin)*100,0,100)}%"></span></div>
      </div>
      <div class="deal-structure-box">
        <span class="eyebrow">Deal structuring</span><h3>Funding, insurance e controls</h3>
        <label>Trade finance<select id="financingStrategySelect">
          ${Object.entries(b).map(([St,pi])=>`<option value="${St}" ${en.financingId===St?"selected":""} ${tt(St)?"":"disabled"}>${pi.label}${tt(St)?"":" \xB7 requires Trade Finance Manager"}</option>`).join("")}
        </select><small>${en.financing.description}</small></label>
        <label>Cargo insurance<select id="insuranceStrategySelect">
          ${Object.entries(y).map(([St,pi])=>`<option value="${St}" ${en.insuranceId===St?"selected":""}>${pi.label}</option>`).join("")}
        </select><small>${en.insurance.description}</small></label>
        <label>Quality control<select id="inspectionStrategySelect">
          ${Object.entries(S).map(([St,pi])=>`<option value="${St}" ${en.inspectionId===St?"selected":""}>${pi.label}</option>`).join("")}
        </select><small>${en.inspection.description}</small></label>
        <div class="hedge-control compact">
          <label for="fxHedgeRatioInput"><span>FX hedge ratio</span><strong id="fxHedgeRatioValue">${en.fxHedgeRatio}%</strong></label>
          <input id="fxHedgeRatioInput" type="range" min="0" max="100" step="10" value="${en.fxHedgeRatio}">
          <div class="hedge-scale"><span>Open FX</span><span>${o(it*ze(l),!0)} gross exposure</span><span>Fully hedged</span></div>
        </div>
      </div>
      ${Lt(l)!=="land"?`<div class="shipping-control">
        <label for="carrierStrategySelect"><span>Shipping strategy</span><strong>${bt?bt.name:"Spot carrier"}</strong></label>
        <select id="carrierStrategySelect">
          <option value="spot" ${yt==="spot"?"selected":""}>Spot / voyage booking</option>
          ${Nt.map(St=>{let pi=Fe(St.catalogId);return`<option value="fleet:${St.id}" ${yt===`fleet:${St.id}`?"selected":""}>Internal fleet \xB7 ${pi.name}</option>`}).join("")}
        </select>
        <div class="shipping-benefit">${bt?`Freight advantage +${o(bt.bonusPnl)} \xB7 ETA -${bt.durationBonus} days`:`Freight index ${v.freightIndex.toFixed(1)} \xB7 third-party carrier`}</div>
        ${Nt.length?"":"<small>Nessuna nave compatibile nel porto di origine. Apri il Fleet Desk per chartering.</small>"}
      </div>`:""}
      <div class="hedge-control">
        <label for="hedgeRatioInput"><span>Futures hedge ratio</span><strong id="hedgeRatioValue">${ct}%</strong></label>
        <input id="hedgeRatioInput" type="range" min="0" max="100" step="10" value="${ct}">
        <div class="hedge-scale"><span>0% speculative</span><span>${l.recommendedHedge}% recommended</span><span>100% protected</span></div>
        <div class="timeline-mini-row" style="margin-top:12px;margin-bottom:0"><i></i><span>Residual flat-price exposure</span><strong id="residualExposureValue">${o(vt,!0)}</strong></div>
      </div>
      ${oa&&Qp?'<div class="success-box">Contratto accettato e funding disponibile. Puoi aprire il deal.</div>':oa?'<div class="warning-box">Offerta accettata, ma cash, margin collateral, facility o struttura finanziaria non sono sufficienti.</div>':'<div class="warning-box">Il deal non pu\xF2 partire finch\xE9 il buyer non accetta le condizioni.</div>'}
      <button class="button primary" id="startDealButton" ${Le?"":"disabled"}>Apri il physical deal</button>
      <button class="button secondary" id="focusOriginButton">Vai al fornitore</button>
    `}function Gp(l){l=Ot(l);let h=qe(l.opportunityId),m=Qi(l),T=al(l),P=os(l),D=as(l),ne=we(h,l.quantity||h.quantity,l.capital)*Math.max(0,1-(l.hedgeRatio||0)/100),Q=rl(l),te=ss(l),le=b[l.financingStrategy||"revolver"]||b.revolver,Le=y[l.insuranceStrategy||"basic"]||y.basic,ct=S[l.inspectionStrategy||"standard"]||S.standard,it=cs(h,m),vt=[h.origin,...h.via||[],h.destination].map(st).sort((yt,oi)=>Math.hypot(yt.lat-it.lat,yt.lon-it.lon)-Math.hypot(oi.lat-it.lat,oi.lon-it.lon))[0],Nt=l.pendingDecision?`
      <div class="event-box"><span class="eyebrow">Operational event</span><h3>${h.event.title}</h3><p>${h.event.text}</p>
      ${h.event.choices.map(yt=>`<button class="event-choice" data-event-choice="${yt.id}"><strong>${yt.label}</strong><small>${yt.hint}</small></button>`).join("")}</div>`:"";return`
      <div class="location-badge">\u2197 Active shipment</div>
      <h2>${h.title}</h2>
      <div class="inspector-subtitle">${st(h.origin).name} \u2192 ${st(h.destination).name} \xB7 ${Math.round(m*100)}% completato</div>
      <div class="inspector-grid">
        <div class="inspector-stat"><span>Unrealized P&amp;L</span><strong style="color:${T>=0?"var(--green)":"var(--red)"}">${o(T)}</strong></div>
        <div class="inspector-stat"><span>ETA</span><strong>${Math.max(0,l.duration-l.elapsed)} giorni</strong></div>
        <div class="inspector-stat"><span>Hedge ratio</span><strong>${l.hedgeRatio||0}%</strong></div>
        <div class="inspector-stat"><span>Physical phase</span><strong>${P.label}</strong></div>
      </div>
      <div class="inspector-section"><h3>Commercial execution</h3>
        <div class="timeline-mini-row"><i></i><span>Supplier</span><strong>${R(l.supplierId)?.name||"N/A"}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Buyer</span><strong>${R(l.buyerId)?.name||"N/A"}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Quantity</span><strong>${l.quantity||h.quantity} t</strong></div>
        <div class="timeline-mini-row"><i></i><span>Payment</span><strong>${p.payment[l.commercialTerms?.payment]?.label||"Contract terms"}</strong></div>
        ${(l.globalEventImpacts||[]).length?`<div class="global-impact-box"><strong>Global events affecting this cargo</strong><span>${l.globalEventImpacts.map(yt=>C.find(oi=>oi.id===yt)?.title||yt).join(" \xB7 ")}</span></div>`:""}
      </div>
      <div class="inspector-section"><h3>Risk, treasury &amp; hedge liquidity</h3>
        <div class="timeline-mini-row"><i></i><span>Residual flat-price exposure</span><strong>${o(ne,!0)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Commodity impact to date</span><strong style="color:${D>=0?"var(--green)":"var(--red)"}">${o(D)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>FX impact \xB7 hedge ${l.fxHedgeRatio||0}%</span><strong style="color:${Q>=0?"var(--green)":"var(--red)"}">${o(Q)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Equity locked</span><strong>${o(l.equity,!0)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Debt funded \xB7 ${(l.financingRate*100).toFixed(1)}%</span><strong>${o(l.borrowed,!0)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Interest accrued</span><strong style="color:var(--orange)">${o(l.financingAccrued||0)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Futures collateral</span><strong>${o(l.marginCollateral||0)} / ${o(te)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Margin calls funded</span><strong>${l.marginCalls||0}</strong></div>
        ${l.hedgeRatio<100?'<button class="button secondary" id="increaseHedgeButton">Porta hedge al 100%</button>':'<div class="success-box">Flat-price exposure completamente coperta. Monitora comunque variation margin e basis risk.</div>'}
      </div>
      <div class="inspector-section"><h3>Deal protection</h3>
        <div class="contract-card"><div class="contract-card-head"><strong>${le.label}</strong><span>Funding</span></div><p>${le.description}</p></div>
        <div class="contract-card"><div class="contract-card-head"><strong>${Le.label}</strong><span>Insurance</span></div><p>${Le.description}</p></div>
        <div class="contract-card"><div class="contract-card-head"><strong>${ct.label}</strong><span>Quality</span></div><p>${ct.description}</p></div>
      </div>

      <div class="inspector-section"><h3>Contracts &amp; execution</h3>
        <div class="contract-card"><div class="contract-card-head"><strong>Purchase contract</strong><span>${l.operations.purchaseContract.status}</span></div><p>${l.operations.purchaseContract.terms}</p></div>
        <div class="contract-card"><div class="contract-card-head"><strong>Sales contract</strong><span>${l.operations.salesContract.status}</span></div><p>${l.operations.salesContract.terms}</p></div>
        <div class="asset-banner"><span>Carrier / vessel</span><strong>${l.operations.transport.carrier}</strong><small>${l.operations.transport.mode} \xB7 ${l.operations.transport.booking} \xB7 ${l.operations.transport.status}</small></div>
        <div class="shipping-ledger">
          <div><span>Charter type</span><strong>${l.operations.transport.charterType}</strong></div>
          <div><span>Laycan</span><strong>${l.operations.transport.laycan}</strong></div>
          <div><span>Laytime</span><strong>${l.operations.transport.laytimeUsed}/${l.operations.transport.laytimeAllowed} days</strong></div>
          <div><span>Demurrage</span><strong style="color:${l.operations.transport.demurrageAccrued?"var(--red)":"var(--green)"}">${o(l.operations.transport.demurrageAccrued)}</strong></div>
        </div>
        <div class="asset-banner"><span>Storage plan</span><strong>${l.operations.storage.name}</strong><small>${l.operations.storage.reserved?"Reserved":"Not reserved"} \xB7 ${l.operations.storage.days} buffer days${l.operations.storage.active?" \xB7 currently active":""}</small></div>
      </div>
      <div class="inspector-section"><h3>Document readiness \xB7 ${Math.round(Ki(l))}%</h3>
        <div class="document-list">${l.operations.documents.map(yt=>`<div class="document-row ${yt.status}"><i></i><span>${yt.name}</span><strong>${yt.status}</strong></div>`).join("")}</div>
        <div class="ops-actions">
          <button class="button secondary" id="expediteDocsButton" ${l.operations.expedited?"disabled":""}>Expedite docs</button>
          <button class="button secondary" id="upgradeTransportButton" ${l.operations.transport.upgraded||m>.7?"disabled":""}>Priority transport</button>
        </div>
        <button class="button secondary" id="emergencyStorageButton" ${l.operations.storage.emergency?"disabled":""}>Book emergency storage</button>
      </div>
      <div class="inspector-section"><h3>Shipment timeline</h3>
        <div class="timeline-mini">
          <div class="timeline-mini-row done"><i></i><span>Contratti firmati</span><strong>Day 0</strong></div>
          <div class="timeline-mini-row ${m>.18?"done":"current"}"><i></i><span>Materiale caricato</span><strong>${m>.18?"Done":"Pending"}</strong></div>
          <div class="timeline-mini-row ${m>.18&&m<.9?"current":m>=.9?"done":""}"><i></i><span>In transito \xB7 vicino ${vt.name}</span><strong>${Math.round(m*100)}%</strong></div>
          <div class="timeline-mini-row ${m>=1?"done":""}"><i></i><span>Delivery &amp; settlement</span><strong>${m>=1?"Done":"Pending"}</strong></div>
        </div>
      </div>
      ${l.eventResult?`<div class="inspector-section"><h3>Ultimo evento</h3><p>${l.eventResult}</p></div>`:""}
      ${Nt}
      <button class="button secondary" id="focusShipmentButton">Centra la spedizione</button>
    `}function Hp(l){let h=qe(l.opportunityId),m=l.pnlBreakdown||{commercial:l.pnl,operations:0,financing:0,market:0,fx:0},T=[["Commercial / route margin",m.commercial||0],["Operations, claims & shipping",m.operations||0],["Financing cost",m.financing||0],["Commodity hedge / residual",m.market||0],["FX result",m.fx||0]],P=Math.max(1,...T.map(([,D])=>Math.abs(D)));return`<div class="location-badge">\u2713 Settled cargo</div><h2>${h.title}</h2><div class="inspector-subtitle">${st(h.origin).name} \u2192 ${st(h.destination).name} \xB7 closed ${u(new Date(l.completed))}</div>
      <div class="settlement-hero ${l.pnl>=0?"positive":"negative"}"><span>Realized P&amp;L</span><strong>${o(l.pnl)}</strong><small>${l.quantity||h.quantity} t \xB7 ${l.days} days \xB7 ops ${Math.round(l.operationalReadiness||0)}%</small></div>
      <div class="inspector-section"><h3>P&amp;L attribution</h3><div class="pnl-waterfall">${T.map(([D,B])=>`<div class="pnl-row"><div><span>${D}</span><strong style="color:${B>=0?"var(--green)":"var(--red)"}">${o(B)}</strong></div><div class="pnl-bar"><span class="${B>=0?"positive":"negative"}" style="width:${Math.max(3,Math.abs(B)/P*100)}%"></span></div></div>`).join("")}</div></div>
      <div class="inspector-section"><h3>Execution scorecard</h3><div class="inspector-grid"><div class="inspector-stat"><span>Hedge</span><strong>${l.hedgeRatio||0}%</strong></div><div class="inspector-stat"><span>FX hedge</span><strong>${l.fxHedgeRatio||0}%</strong></div><div class="inspector-stat"><span>Margin calls</span><strong>${l.marginCalls||0}</strong></div><div class="inspector-stat"><span>Demurrage</span><strong>${o(l.demurrage||0)}</strong></div></div></div>
      <div class="inspector-section"><h3>Structure used</h3><div class="timeline-mini-row"><i></i><span>Funding</span><strong>${b[l.financingStrategy||"revolver"]?.label||"N/A"}</strong></div><div class="timeline-mini-row"><i></i><span>Insurance</span><strong>${y[l.insuranceStrategy||"basic"]?.label||"N/A"}</strong></div><div class="timeline-mini-row"><i></i><span>Inspection</span><strong>${S[l.inspectionStrategy||"standard"]?.label||"N/A"}</strong></div></div>
      ${l.eventResult?`<div class="inspector-section"><h3>Operational outcome</h3><p>${l.eventResult}</p></div>`:""}`}function Vp(l){let h=Fe(l.catalogId),m=l.assignedDealId?ai(l.assignedDealId):null;return`
      <div class="location-badge">\u25C6 Chartered asset</div>
      <h2>${h.name}</h2>
      <div class="inspector-subtitle">${h.vesselClass} \xB7 ${h.capacity.toLocaleString("en-US")} t DWT</div>
      <p class="inspector-subtitle" style="margin-top:12px">${h.description}</p>
      <div class="inspector-grid">
        <div class="inspector-stat"><span>Status</span><strong>${l.status}</strong></div>
        <div class="inspector-stat"><span>Position</span><strong>${st(l.positionHub)?.name||"At sea"}</strong></div>
        <div class="inspector-stat"><span>Days remaining</span><strong>${l.daysRemaining}</strong></div>
        <div class="inspector-stat"><span>Charter cost</span><strong>${o(l.charterCost+(l.extensionCost||0))}</strong></div>
      </div>
      <div class="inspector-section"><h3>Commercial employment</h3>
        ${m?`<div class="success-box">Assigned to ${qe(m.opportunityId).title}. The vessel will be released at settlement.</div><button class="button secondary" id="openAssignedDealButton">Open assigned deal</button>`:'<div class="success-box">Available for a compatible opportunity departing from this location.</div>'}
      </div>
      <div class="inspector-section"><h3>Charter profile</h3>
        <div class="timeline-mini-row"><i></i><span>Transport class</span><strong>${h.transportClass}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Expected freight advantage</span><strong>${o(h.bonusPnl)}</strong></div>
        <div class="timeline-mini-row"><i></i><span>Execution advantage</span><strong>-${h.durationBonus} days</strong></div>
      </div>
      <button class="button secondary" id="focusVesselButton">Centra la nave</button>
      <button class="button danger" id="releaseVesselButton" ${l.status==="assigned"?"disabled":""}>Terminate charter</button>`}function ju(l,h=!0){let m=kn(l);m&&($={type:"investment",id:l},ue="empire",h&&Mn(m.hub),Sn(),Ei(),pl())}function Wp(l){let h=ki(l.id),m=h.level||0,T=m+1,P=m>=l.maxLevel,D=P?0:cr(l,T),B=P?0:xi(l,T);return`<div class="location-badge chain-${l.chain}">${l.chain} asset</div><h2>${l.name}</h2><div class="inspector-subtitle">${st(l.hub)?.name} \xB7 Level ${m}/${l.maxLevel}</div><p class="inspector-subtitle" style="margin-top:12px">${l.description}</p><div class="economics-grid"><div><span>Daily income</span><strong>${o((l.dailyIncome||0)*m)}</strong></div><div><span>Deal P&L edge</span><strong>${o((l.pnlBonus||0)*m)}</strong></div><div><span>Book value</span><strong>${o((h.totalSpent||0)*.88,!0)}</strong></div><div><span>Status</span><strong>${h.buildingTo?`Building L${h.buildingTo}`:m?"Operational":"Greenfield"}</strong></div></div>${h.buildingTo?`<div class="success-box">Project team al lavoro \xB7 ${h.daysRemaining} giorni rimanenti.</div>`:`<button class="button primary" id="inspectorBuildInvestment" ${P||!zn(l)||v.cash<D||fn()>=gn()?"disabled":""}>${P?"Maximum level":`Invest ${o(D)} \xB7 ${B} days`}</button>`}<button class="button secondary" id="focusInvestmentHub">Focus location</button>`}function Ei(){let l=r("#inspectorEyebrow"),h=r("#inspectorContent");if($.type==="hub"){let m=st($.id)||st("geneva");l.textContent=m.type==="hq"?"Headquarters":"Market location",h.innerHTML=kp(m),e("[data-open-opportunity]",h).forEach(T=>T.addEventListener("click",()=>zu(T.dataset.openOpportunity)))}else if($.type==="investment"){let m=kn($.id);if(!m)return $n("geneva");l.textContent="Industrial asset",h.innerHTML=Wp(m),r("#inspectorBuildInvestment")?.addEventListener("click",()=>Gn(m.id)),r("#focusInvestmentHub")?.addEventListener("click",()=>Mn(m.hub))}else if($.type==="opportunity"){let m=qe($.id);l.textContent="Opportunity analysis",h.innerHTML=zp(m);let T=r("#hedgeRatioInput");T?.addEventListener("input",()=>{Ne[m.id]=Number(T.value),r("#hedgeRatioValue").textContent=`${T.value}%`;let P=Oe(m),D=we(m,P.quantity,P.capital)*Math.max(0,1-Number(T.value)/100);r("#residualExposureValue").textContent=o(D,!0)}),["commercial","payment","delivery"].forEach(P=>{r(P==="commercial"?"#commercialTermSelect":P==="payment"?"#paymentTermSelect":"#deliveryTermSelect")?.addEventListener("change",B=>{Mt(m.id,P,B.target.value),Ei(),mr()})}),r("#submitNegotiationButton")?.addEventListener("click",()=>bp(m.id)),r("#carrierStrategySelect")?.addEventListener("change",P=>{Ae[m.id]=P.target.value,Ei()}),r("#financingStrategySelect")?.addEventListener("change",P=>{Pe[m.id]=P.target.value,Ei(),mr()}),r("#insuranceStrategySelect")?.addEventListener("change",P=>{he[m.id]=P.target.value,Ei(),mr()}),r("#inspectionStrategySelect")?.addEventListener("change",P=>{Me[m.id]=P.target.value,Ei(),mr()}),r("#fxHedgeRatioInput")?.addEventListener("input",P=>{ye[m.id]=Number(P.target.value),r("#fxHedgeRatioValue").textContent=`${P.target.value}%`}),r("#startDealButton")?.addEventListener("click",()=>Mp(m.id)),r("#focusOriginButton")?.addEventListener("click",()=>$n(m.origin))}else if($.type==="history"){let m=ra($.id);if(!m)return $n("geneva");l.textContent="Deal review",h.innerHTML=Hp(m)}else if($.type==="vessel"){let m=si($.id);if(!m)return $n("geneva");l.textContent="Fleet asset",h.innerHTML=Vp(m),r("#focusVesselButton")?.addEventListener("click",()=>Mn(m.positionHub)),r("#releaseVesselButton")?.addEventListener("click",()=>aa(m.id)),r("#openAssignedDealButton")?.addEventListener("click",()=>Gi(m.assignedDealId))}else if($.type==="deal"){let m=ai($.id);if(!m)return $n("geneva");l.textContent=m.pendingDecision?"Decision required":"Live operation",h.innerHTML=Gp(m),e("[data-event-choice]",h).forEach(T=>T.addEventListener("click",()=>Tp(m.id,T.dataset.eventChoice))),r("#increaseHedgeButton")?.addEventListener("click",()=>Ep(m.id)),r("#expediteDocsButton")?.addEventListener("click",()=>Si(m.id)),r("#upgradeTransportButton")?.addEventListener("click",()=>hi(m.id)),r("#emergencyStorageButton")?.addEventListener("click",()=>Dt(m.id)),r("#focusShipmentButton")?.addEventListener("click",()=>ul(m.id))}}function $p(){let l=v.activeDeals.find(T=>T.pendingDecision),h=r("#eventBanner");if(!l){h.classList.add("hidden");return}let m=qe(l.opportunityId);r("#eventBannerText").textContent=m.event?.title||l.eventResult||"Treasury decision required",h.classList.remove("hidden"),r("#openEventButton").onclick=()=>Gi(l.id)}function qp(){let l=r("#worldEventTicker"),h=ae();if(!l||!h.length){l?.classList.add("hidden");return}r("#worldEventTickerText").textContent=h.map(m=>`${m.title} (${m.remaining}d)`).join(" \xB7 "),l.classList.remove("hidden"),r("#openWorldEventsButton").onclick=()=>{ue="events",Sn()}}function Yu(){e(".layer-button").forEach(l=>l.classList.toggle("active",Ue[l.dataset.layer]))}function zt(){Ap(),Cp(),Sn(),Xu(),Ei(),$p(),qp(),Yu()}function Xp(l){v.difficulty=l,l==="guided"?(v.cash=13e5,v.creditLimit=75e5,v.nextGlobalEventDay=10):l==="expert"?(v.cash=8e5,v.creditLimit=5e6,v.nextGlobalEventDay=4):(v.cash=1e6,v.creditLimit=6e6,v.nextGlobalEventDay=6),v.navHistory=[v.cash,v.cash,v.cash],v.onboardingComplete=!0,It()}function ml(){let l=r("#onboardingDialog");!l||v.onboardingComplete||l.open||l.showModal()}function jp(){v=ee(),na(),$={type:"hub",id:"geneva"},ue="portfolio",_e="overall",oe=0,sa(),It(),O={lon:6,lat:18,zoom:1,targetLon:6,targetLat:18},zt(),je("Nuova carriera SHIPPY pronta. Scegli la difficolt\xE0."),setTimeout(ml,80)}function Yp(){window.addEventListener("resize",ll),new ResizeObserver(ll).observe(r("#globeStage")),N.addEventListener("pointerdown",m=>{kt=!0,De=!1,at={x:m.clientX,y:m.clientY,lon:O.lon,lat:O.lat},O.targetLon=null,N.setPointerCapture(m.pointerId),N.classList.add("dragging"),r("#globeHint").style.opacity=".25"}),N.addEventListener("pointermove",m=>{if(!kt)return;let T=m.clientX-at.x,P=m.clientY-at.y;Math.abs(T)+Math.abs(P)>3&&(De=!0),O.lon=(at.lon-T*.28/O.zoom+540)%360-180,O.lat=t(at.lat+P*.2/O.zoom,-70,70)}),N.addEventListener("pointerup",m=>{if(kt=!1,N.releasePointerCapture(m.pointerId),N.classList.remove("dragging"),!De){let T=N.getBoundingClientRect(),P=m.clientX-T.left,D=m.clientY-T.top,B=[...Et].sort((le,Le)=>Le.z-le.z).find(le=>Math.hypot(P-le.x,D-le.y)<=le.r);if(B)return ju(B.id,!1);let ne=[...ut].sort((le,Le)=>Le.z-le.z).find(le=>Math.hypot(P-le.x,D-le.y)<=le.r);if(ne)return dl(ne.id,!1);let Q=[...Ut].sort((le,Le)=>Le.z-le.z).find(le=>Math.hypot(P-le.x,D-le.y)<=le.r);if(Q)return Gi(Q.id,!1);let te=[...Ye].sort((le,Le)=>Le.z-le.z).find(le=>Math.hypot(P-le.x,D-le.y)<=le.r);if(te)return $n(te.id,!1)}}),N.addEventListener("wheel",m=>{m.preventDefault(),O.zoom=t(O.zoom*(m.deltaY>0?.93:1.07),.72,1.45),r("#globeHint").style.opacity=".25"},{passive:!1}),e(".panel-tab").forEach(m=>m.addEventListener("click",()=>{ue=m.dataset.leftTab,Sn()})),e(".layer-button").forEach(m=>m.addEventListener("click",()=>{Ue[m.dataset.layer]=!Ue[m.dataset.layer],Yu()})),r("#pauseButton").addEventListener("click",()=>{oe=0,sa()}),e(".time-button[data-speed]").forEach(m=>m.addEventListener("click",()=>{oe=Number(m.dataset.speed),sa()})),r("#nextDayButton").addEventListener("click",()=>hl()),r("#nextEventButton").addEventListener("click",wp),r("#closeInspector").addEventListener("click",()=>$n("geneva")),r(".profile-button")?.addEventListener("click",()=>{ue="career",Sn()});let l=r("#confirmDialog");r("#resetButton").addEventListener("click",()=>l.showModal()),l.addEventListener("close",()=>{l.returnValue==="confirm"&&jp()});let h=r("#onboardingDialog");h?.addEventListener("close",()=>{h.returnValue==="start"?(Xp(r("#difficultySelect")?.value||"standard"),zt(),je(`Carriera ${v.difficulty} iniziata. Apri Market e negozia il primo deal.`)):v.onboardingComplete||setTimeout(ml,80)})}ht(),ll(),Yp(),zt(),sa(),requestAnimationFrame(ku),setTimeout(ml,120)})();})();
/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
