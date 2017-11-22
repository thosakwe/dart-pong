(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isb=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isd)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="b"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="m"){processStatics(init.statics[b1]=b2.m,b3)
delete b2.m}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.bj"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.bj"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.bj(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.t=function(){}
var dart=[["","",,H,{"^":"",hb:{"^":"b;a"}}],["","",,J,{"^":"",
n:function(a){return void 0},
aO:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
aL:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.bm==null){H.fm()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.e(new P.cj("Return interceptor for "+H.c(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$aV()]
if(v!=null)return v
v=H.fv(a)
if(v!=null)return v
if(typeof a=="function")return C.I
y=Object.getPrototypeOf(a)
if(y==null)return C.m
if(y===Object.prototype)return C.m
if(typeof w=="function"){Object.defineProperty(w,$.$get$aV(),{value:C.f,enumerable:false,writable:true,configurable:true})
return C.f}return C.f},
d:{"^":"b;",
q:function(a,b){return a===b},
gn:function(a){return H.J(a)},
i:["bM",function(a){return H.aA(a)}],
"%":"Blob|CanvasGradient|CanvasPattern|DOMError|File|FileError|MediaError|NavigatorUserMediaError|PositionError|SQLError|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedString|TextMetrics|WebGLRenderingContext"},
dv:{"^":"d;",
i:function(a){return String(a)},
gn:function(a){return a?519018:218159},
$isfa:1},
dx:{"^":"d;",
q:function(a,b){return null==b},
i:function(a){return"null"},
gn:function(a){return 0}},
aW:{"^":"d;",
gn:function(a){return 0},
i:["bN",function(a){return String(a)}],
$isdy:1},
dO:{"^":"aW;"},
aF:{"^":"aW;"},
aj:{"^":"aW;",
i:function(a){var z=a[$.$get$bz()]
return z==null?this.bN(a):J.M(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}}},
ah:{"^":"d;$ti",
ba:function(a,b){if(!!a.immutable$list)throw H.e(new P.x(b))},
cl:function(a,b){if(!!a.fixed$length)throw H.e(new P.x(b))},
P:function(a,b){return new H.b0(a,b,[H.ac(a,0),null])},
J:function(a,b){if(b<0||b>=a.length)return H.i(a,b)
return a[b]},
gcu:function(a){if(a.length>0)return a[0]
throw H.e(H.bJ())},
aC:function(a,b,c,d,e){var z,y,x
this.ba(a,"setRange")
P.c0(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e+z>d.length)throw H.e(H.dt())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x>=d.length)return H.i(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x>=d.length)return H.i(d,x)
a[b+y]=d[x]}},
i:function(a){return P.aw(a,"[","]")},
gA:function(a){return new J.cY(a,a.length,0,null)},
gn:function(a){return H.J(a)},
gk:function(a){return a.length},
sk:function(a,b){this.cl(a,"set length")
if(b<0)throw H.e(P.aB(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.o(a,b))
if(b>=a.length||b<0)throw H.e(H.o(a,b))
return a[b]},
w:function(a,b,c){this.ba(a,"indexed set")
if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.o(a,b))
if(b>=a.length||b<0)throw H.e(H.o(a,b))
a[b]=c},
$isD:1,
$asD:I.t,
$isk:1,
$ask:null,
$ish:1,
$ash:null},
ha:{"^":"ah;$ti"},
cY:{"^":"b;a,b,c,d",
gv:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.e(H.fB(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
ai:{"^":"d;",
ay:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.e(new P.x(""+a+".toInt()"))},
cR:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.e(new P.x(""+a+".round()"))},
i:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gn:function(a){return a&0x1FFFFFFF},
G:function(a,b){if(typeof b!=="number")throw H.e(H.X(b))
return a+b},
C:function(a,b){return(a|0)===a?a/b|0:this.ci(a,b)},
ci:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.e(new P.x("Result of truncating division is "+H.c(z)+": "+H.c(a)+" ~/ "+b))},
b2:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
R:function(a,b){if(typeof b!=="number")throw H.e(H.X(b))
return a<b},
$isap:1},
bK:{"^":"ai;",$isap:1,$isj:1},
dw:{"^":"ai;",$isap:1},
ax:{"^":"d;",
c1:function(a,b){if(b>=a.length)throw H.e(H.o(a,b))
return a.charCodeAt(b)},
G:function(a,b){if(typeof b!=="string")throw H.e(P.bu(b,null,null))
return a+b},
bL:function(a,b,c){if(c==null)c=a.length
H.fb(c)
if(b<0)throw H.e(P.aC(b,null,null))
if(typeof c!=="number")return H.ad(c)
if(b>c)throw H.e(P.aC(b,null,null))
if(c>a.length)throw H.e(P.aC(c,null,null))
return a.substring(b,c)},
bK:function(a,b){return this.bL(a,b,null)},
i:function(a){return a},
gn:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gk:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.e(H.o(a,b))
if(b>=a.length||b<0)throw H.e(H.o(a,b))
return a[b]},
$isD:1,
$asD:I.t,
$isS:1}}],["","",,H,{"^":"",
bJ:function(){return new P.b8("No element")},
dt:function(){return new P.b8("Too few elements")},
h:{"^":"C;$ti",$ash:null},
ak:{"^":"h;$ti",
gA:function(a){return new H.bM(this,this.gk(this),0,null)},
P:function(a,b){return new H.b0(this,b,[H.q(this,"ak",0),null])},
aA:function(a,b){var z,y,x
z=H.G([],[H.q(this,"ak",0)])
C.c.sk(z,this.gk(this))
for(y=0;y<this.gk(this);++y){x=this.J(0,y)
if(y>=z.length)return H.i(z,y)
z[y]=x}return z},
az:function(a){return this.aA(a,!0)}},
bM:{"^":"b;a,b,c,d",
gv:function(){return this.d},
u:function(){var z,y,x,w
z=this.a
y=J.F(z)
x=y.gk(z)
if(this.b!==x)throw H.e(new P.a1(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.J(z,w);++this.c
return!0}},
bN:{"^":"C;a,b,$ti",
gA:function(a){return new H.dK(null,J.aQ(this.a),this.b,this.$ti)},
gk:function(a){return J.ag(this.a)},
$asC:function(a,b){return[b]},
m:{
ay:function(a,b,c,d){if(!!J.n(a).$ish)return new H.bA(a,b,[c,d])
return new H.bN(a,b,[c,d])}}},
bA:{"^":"bN;a,b,$ti",$ish:1,
$ash:function(a,b){return[b]}},
dK:{"^":"du;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gv())
return!0}this.a=null
return!1},
gv:function(){return this.a}},
b0:{"^":"ak;a,b,$ti",
gk:function(a){return J.ag(this.a)},
J:function(a,b){return this.b.$1(J.cT(this.a,b))},
$asak:function(a,b){return[b]},
$ash:function(a,b){return[b]},
$asC:function(a,b){return[b]}},
bF:{"^":"b;$ti"}}],["","",,H,{"^":"",
an:function(a,b){var z=a.V(b)
if(!init.globalState.d.cy)init.globalState.f.a_()
return z},
cN:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.n(y).$isk)throw H.e(P.bt("Arguments to main must be a List: "+H.c(y)))
init.globalState=new H.eM(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$bH()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.eo(P.aZ(null,H.am),0)
x=P.j
y.z=new H.Q(0,null,null,null,null,null,0,[x,H.be])
y.ch=new H.Q(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.eL()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.dl,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.eN)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.a4(null,null,null,x)
v=new H.aD(0,null,!1)
u=new H.be(y,new H.Q(0,null,null,null,null,null,0,[x,H.aD]),w,init.createNewIsolate(),v,new H.O(H.aP()),new H.O(H.aP()),!1,!1,[],P.a4(null,null,null,null),null,null,!1,!0,P.a4(null,null,null,null))
w.N(0,0)
u.aF(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.Z(a,{func:1,args:[,]}))u.V(new H.fz(z,a))
else if(H.Z(a,{func:1,args:[,,]}))u.V(new H.fA(z,a))
else u.V(a)
init.globalState.f.a_()},
dq:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.dr()
return},
dr:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.e(new P.x("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.e(new P.x('Cannot extract URI from "'+z+'"'))},
dl:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.aH(!0,[]).I(b.data)
y=J.F(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.aH(!0,[]).I(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.aH(!0,[]).I(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.j
p=P.a4(null,null,null,q)
o=new H.aD(0,null,!1)
n=new H.be(y,new H.Q(0,null,null,null,null,null,0,[q,H.aD]),p,init.createNewIsolate(),o,new H.O(H.aP()),new H.O(H.aP()),!1,!1,[],P.a4(null,null,null,null),null,null,!1,!0,P.a4(null,null,null,null))
p.N(0,0)
n.aF(0,o)
init.globalState.f.a.E(new H.am(n,new H.dm(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.a_()
break
case"spawn-worker":break
case"message":if(y.h(z,"port")!=null)y.h(z,"port").H(y.h(z,"msg"))
init.globalState.f.a_()
break
case"close":init.globalState.ch.Z(0,$.$get$bI().h(0,a))
a.terminate()
init.globalState.f.a_()
break
case"log":H.dk(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.R(["command","print","msg",z])
q=new H.U(!0,P.a8(null,P.j)).B(q)
y.toString
self.postMessage(q)}else P.bp(y.h(z,"msg"))
break
case"error":throw H.e(y.h(z,"msg"))}},
dk:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.R(["command","log","msg",a])
x=new H.U(!0,P.a8(null,P.j)).B(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.A(w)
z=H.y(w)
y=P.au(z)
throw H.e(y)}},
dn:function(a,b,c,d,e,f){var z,y,x,w
z=init.globalState.d
y=z.a
$.bX=$.bX+("_"+y)
$.bY=$.bY+("_"+y)
y=z.e
x=init.globalState.d.a
w=z.f
f.H(["spawned",new H.aI(y,x),w,z.r])
x=new H.dp(a,b,c,d,z)
if(e===!0){z.b6(w,w)
init.globalState.f.a.E(new H.am(z,x,"start isolate"))}else x.$0()},
f_:function(a){return new H.aH(!0,[]).I(new H.U(!1,P.a8(null,P.j)).B(a))},
fz:{"^":"f:0;a,b",
$0:function(){this.b.$1(this.a.a)}},
fA:{"^":"f:0;a,b",
$0:function(){this.b.$2(this.a.a,null)}},
eM:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",m:{
eN:function(a){var z=P.R(["command","print","msg",a])
return new H.U(!0,P.a8(null,P.j)).B(z)}}},
be:{"^":"b;a,b,c,cH:d<,cn:e<,f,r,x,y,z,Q,ch,cx,cy,db,dx",
b6:function(a,b){if(!this.f.q(0,a))return
if(this.Q.N(0,b)&&!this.y)this.y=!0
this.ar()},
cQ:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.Z(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.i(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.i(v,w)
v[w]=x
if(w===y.c)y.aN();++y.d}this.y=!1}this.ar()},
ck:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.i(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
cP:function(a){var z,y,x
if(this.ch==null)return
for(z=J.n(a),y=0;x=this.ch,y<x.length;y+=2)if(z.q(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.p(new P.x("removeRange"))
P.c0(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
bG:function(a,b){if(!this.r.q(0,a))return
this.db=b},
cz:function(a,b,c){var z=J.n(b)
if(!z.q(b,0))z=z.q(b,1)&&!this.cy
else z=!0
if(z){a.H(c)
return}z=this.cx
if(z==null){z=P.aZ(null,null)
this.cx=z}z.E(new H.eG(a,c))},
cw:function(a,b){var z
if(!this.r.q(0,a))return
z=J.n(b)
if(!z.q(b,0))z=z.q(b,1)&&!this.cy
else z=!0
if(z){this.at()
return}z=this.cx
if(z==null){z=P.aZ(null,null)
this.cx=z}z.E(this.gcJ())},
cA:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bp(a)
if(b!=null)P.bp(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.M(a)
y[1]=b==null?null:J.M(b)
for(x=new P.cr(z,z.r,null,null),x.c=z.e;x.u();)x.d.H(y)},
V:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.A(u)
v=H.y(u)
this.cA(w,v)
if(this.db===!0){this.at()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gcH()
if(this.cx!=null)for(;t=this.cx,!t.gF(t);)this.cx.bn().$0()}return y},
bl:function(a){return this.b.h(0,a)},
aF:function(a,b){var z=this.b
if(z.T(a))throw H.e(P.au("Registry: ports must be registered only once."))
z.w(0,a,b)},
ar:function(){var z=this.b
if(z.gk(z)-this.c.a>0||this.y||!this.x)init.globalState.z.w(0,this.a,this)
else this.at()},
at:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.O(0)
for(z=this.b,y=z.gbu(z),y=y.gA(y);y.u();)y.gv().c0()
z.O(0)
this.c.O(0)
init.globalState.z.Z(0,this.a)
this.dx.O(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.i(z,v)
w.H(z[v])}this.ch=null}},"$0","gcJ",0,0,1]},
eG:{"^":"f:1;a,b",
$0:function(){this.a.H(this.b)}},
eo:{"^":"b;a,b",
co:function(){var z=this.a
if(z.b===z.c)return
return z.bn()},
br:function(){var z,y,x
z=this.co()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.T(init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gF(y)}else y=!1
else y=!1
else y=!1
if(y)H.p(P.au("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gF(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.R(["command","close"])
x=new H.U(!0,new P.cs(0,null,null,null,null,null,0,[null,P.j])).B(x)
y.toString
self.postMessage(x)}return!1}z.cN()
return!0},
aZ:function(){if(self.window!=null)new H.ep(this).$0()
else for(;this.br(););},
a_:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.aZ()
else try{this.aZ()}catch(x){z=H.A(x)
y=H.y(x)
w=init.globalState.Q
v=P.R(["command","error","msg",H.c(z)+"\n"+H.c(y)])
v=new H.U(!0,P.a8(null,P.j)).B(v)
w.toString
self.postMessage(v)}}},
ep:{"^":"f:1;a",
$0:function(){if(!this.a.br())return
P.c6(C.h,this)}},
am:{"^":"b;a,b,c",
cN:function(){var z=this.a
if(z.y){z.z.push(this)
return}z.V(this.b)}},
eL:{"^":"b;"},
dm:{"^":"f:0;a,b,c,d,e,f",
$0:function(){H.dn(this.a,this.b,this.c,this.d,this.e,this.f)}},
dp:{"^":"f:1;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.x=!0
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.Z(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.Z(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.ar()}},
cl:{"^":"b;"},
aI:{"^":"cl;b,a",
H:function(a){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gaQ())return
x=H.f_(a)
if(z.gcn()===y){y=J.F(x)
switch(y.h(x,0)){case"pause":z.b6(y.h(x,1),y.h(x,2))
break
case"resume":z.cQ(y.h(x,1))
break
case"add-ondone":z.ck(y.h(x,1),y.h(x,2))
break
case"remove-ondone":z.cP(y.h(x,1))
break
case"set-errors-fatal":z.bG(y.h(x,1),y.h(x,2))
break
case"ping":z.cz(y.h(x,1),y.h(x,2),y.h(x,3))
break
case"kill":z.cw(y.h(x,1),y.h(x,2))
break
case"getErrors":y=y.h(x,1)
z.dx.N(0,y)
break
case"stopErrors":y=y.h(x,1)
z.dx.Z(0,y)
break}return}init.globalState.f.a.E(new H.am(z,new H.eP(this,x),"receive"))},
q:function(a,b){if(b==null)return!1
return b instanceof H.aI&&J.L(this.b,b.b)},
gn:function(a){return this.b.gak()}},
eP:{"^":"f:0;a,b",
$0:function(){var z=this.a.b
if(!z.gaQ())z.bY(this.b)}},
bg:{"^":"cl;b,c,a",
H:function(a){var z,y,x
z=P.R(["command","message","port",this,"msg",a])
y=new H.U(!0,P.a8(null,P.j)).B(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
q:function(a,b){if(b==null)return!1
return b instanceof H.bg&&J.L(this.b,b.b)&&J.L(this.a,b.a)&&J.L(this.c,b.c)},
gn:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.bI()
y=this.a
if(typeof y!=="number")return y.bI()
x=this.c
if(typeof x!=="number")return H.ad(x)
return(z<<16^y<<8^x)>>>0}},
aD:{"^":"b;ak:a<,b,aQ:c<",
c0:function(){this.c=!0
this.b=null},
bY:function(a){if(this.c)return
this.b.$1(a)},
$isdR:1},
c5:{"^":"b;a,b,c",
bT:function(a,b){if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setInterval(H.Y(new H.e5(this,b),0),a)}else throw H.e(new P.x("Periodic timer."))},
bS:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.E(new H.am(y,new H.e6(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.Y(new H.e7(this,b),0),a)}else throw H.e(new P.x("Timer greater than 0."))},
m:{
e3:function(a,b){var z=new H.c5(!0,!1,null)
z.bS(a,b)
return z},
e4:function(a,b){var z=new H.c5(!1,!1,null)
z.bT(a,b)
return z}}},
e6:{"^":"f:1;a,b",
$0:function(){this.a.c=null
this.b.$0()}},
e7:{"^":"f:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()}},
e5:{"^":"f:0;a,b",
$0:function(){this.b.$1(this.a)}},
O:{"^":"b;ak:a<",
gn:function(a){var z=this.a
if(typeof z!=="number")return z.cW()
z=C.d.b2(z,0)^C.d.C(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
q:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.O){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
U:{"^":"b;a,b",
B:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.w(0,a,z.gk(z))
z=J.n(a)
if(!!z.$isbP)return["buffer",a]
if(!!z.$isb3)return["typed",a]
if(!!z.$isD)return this.bC(a)
if(!!z.$isdj){x=this.gbz()
w=a.gbj()
w=H.ay(w,x,H.q(w,"C",0),null)
w=P.b_(w,!0,H.q(w,"C",0))
z=z.gbu(a)
z=H.ay(z,x,H.q(z,"C",0),null)
return["map",w,P.b_(z,!0,H.q(z,"C",0))]}if(!!z.$isdy)return this.bD(a)
if(!!z.$isd)this.bt(a)
if(!!z.$isdR)this.a0(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isaI)return this.bE(a)
if(!!z.$isbg)return this.bF(a)
if(!!z.$isf){v=a.$static_name
if(v==null)this.a0(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isO)return["capability",a.a]
if(!(a instanceof P.b))this.bt(a)
return["dart",init.classIdExtractor(a),this.bB(init.classFieldsExtractor(a))]},"$1","gbz",2,0,2],
a0:function(a,b){throw H.e(new P.x((b==null?"Can't transmit:":b)+" "+H.c(a)))},
bt:function(a){return this.a0(a,null)},
bC:function(a){var z=this.bA(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.a0(a,"Can't serialize indexable: ")},
bA:function(a){var z,y,x
z=[]
C.c.sk(z,a.length)
for(y=0;y<a.length;++y){x=this.B(a[y])
if(y>=z.length)return H.i(z,y)
z[y]=x}return z},
bB:function(a){var z
for(z=0;z<a.length;++z)C.c.w(a,z,this.B(a[z]))
return a},
bD:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.a0(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.c.sk(y,z.length)
for(x=0;x<z.length;++x){w=this.B(a[z[x]])
if(x>=y.length)return H.i(y,x)
y[x]=w}return["js-object",z,y]},
bF:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
bE:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gak()]
return["raw sendport",a]}},
aH:{"^":"b;a,b",
I:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.e(P.bt("Bad serialized message: "+H.c(a)))
switch(C.c.gcu(a)){case"ref":if(1>=a.length)return H.i(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.i(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
y=H.G(this.U(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
return H.G(this.U(x),[null])
case"mutable":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
return this.U(x)
case"const":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
y=H.G(this.U(x),[null])
y.fixed$length=Array
return y
case"map":return this.cr(a)
case"sendport":return this.cs(a)
case"raw sendport":if(1>=a.length)return H.i(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.cq(a)
case"function":if(1>=a.length)return H.i(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.i(a,1)
return new H.O(a[1])
case"dart":y=a.length
if(1>=y)return H.i(a,1)
w=a[1]
if(2>=y)return H.i(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.U(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.e("couldn't deserialize: "+H.c(a))}},"$1","gcp",2,0,2],
U:function(a){var z,y,x
z=J.F(a)
y=0
while(!0){x=z.gk(a)
if(typeof x!=="number")return H.ad(x)
if(!(y<x))break
z.w(a,y,this.I(z.h(a,y)));++y}return a},
cr:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.i(a,1)
y=a[1]
if(2>=z)return H.i(a,2)
x=a[2]
w=P.bL()
this.b.push(w)
y=J.cW(y,this.gcp()).az(0)
for(z=J.F(y),v=J.F(x),u=0;u<z.gk(y);++u){if(u>=y.length)return H.i(y,u)
w.w(0,y[u],this.I(v.h(x,u)))}return w},
cs:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.i(a,1)
y=a[1]
if(2>=z)return H.i(a,2)
x=a[2]
if(3>=z)return H.i(a,3)
w=a[3]
if(J.L(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.bl(w)
if(u==null)return
t=new H.aI(u,x)}else t=new H.bg(y,w,x)
this.b.push(t)
return t},
cq:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.i(a,1)
y=a[1]
if(2>=z)return H.i(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.F(y)
v=J.F(x)
u=0
while(!0){t=z.gk(y)
if(typeof t!=="number")return H.ad(t)
if(!(u<t))break
w[z.h(y,u)]=this.I(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
d6:function(){throw H.e(new P.x("Cannot modify unmodifiable Map"))},
fh:function(a){return init.types[a]},
fu:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.n(a).$isH},
c:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.M(a)
if(typeof z!=="string")throw H.e(H.X(a))
return z},
J:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
bZ:function(a){var z,y,x,w,v,u,t,s
z=J.n(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.B||!!J.n(a).$isaF){v=C.k(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.i.c1(w,0)===36)w=C.i.bK(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.cI(H.aM(a),0,null),init.mangledGlobalNames)},
aA:function(a){return"Instance of '"+H.bZ(a)+"'"},
b5:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.X(a))
return a[b]},
c_:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.e(H.X(a))
a[b]=c},
ad:function(a){throw H.e(H.X(a))},
i:function(a,b){if(a==null)J.ag(a)
throw H.e(H.o(a,b))},
o:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.N(!0,b,"index",null)
z=J.ag(a)
if(!(b<0)){if(typeof z!=="number")return H.ad(z)
y=b>=z}else y=!0
if(y)return P.aU(b,a,"index",null,z)
return P.aC(b,"index",null)},
X:function(a){return new P.N(!0,a,null,null)},
fb:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.e(H.X(a))
return a},
e:function(a){var z
if(a==null)a=new P.bV()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.cO})
z.name=""}else z.toString=H.cO
return z},
cO:function(){return J.M(this.dartException)},
p:function(a){throw H.e(a)},
fB:function(a){throw H.e(new P.a1(a))},
A:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.fD(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.b.b2(x,16)&8191)===10)switch(w){case 438:return z.$1(H.aX(H.c(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.c(y)+" (Error "+w+")"
return z.$1(new H.bU(v,null))}}if(a instanceof TypeError){u=$.$get$c8()
t=$.$get$c9()
s=$.$get$ca()
r=$.$get$cb()
q=$.$get$cf()
p=$.$get$cg()
o=$.$get$cd()
$.$get$cc()
n=$.$get$ci()
m=$.$get$ch()
l=u.D(y)
if(l!=null)return z.$1(H.aX(y,l))
else{l=t.D(y)
if(l!=null){l.method="call"
return z.$1(H.aX(y,l))}else{l=s.D(y)
if(l==null){l=r.D(y)
if(l==null){l=q.D(y)
if(l==null){l=p.D(y)
if(l==null){l=o.D(y)
if(l==null){l=r.D(y)
if(l==null){l=n.D(y)
if(l==null){l=m.D(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.bU(y,l==null?null:l.method))}}return z.$1(new H.eb(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.c2()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.N(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.c2()
return a},
y:function(a){var z
if(a==null)return new H.ct(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ct(a,null)},
fx:function(a){if(a==null||typeof a!='object')return J.aq(a)
else return H.J(a)},
fe:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.w(0,a[y],a[x])}return b},
fo:function(a,b,c,d,e,f,g){switch(c){case 0:return H.an(b,new H.fp(a))
case 1:return H.an(b,new H.fq(a,d))
case 2:return H.an(b,new H.fr(a,d,e))
case 3:return H.an(b,new H.fs(a,d,e,f))
case 4:return H.an(b,new H.ft(a,d,e,f,g))}throw H.e(P.au("Unsupported number of arguments for wrapped closure"))},
Y:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.fo)
a.$identity=z
return z},
d4:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.n(c).$isk){z.$reflectionInfo=c
x=H.dT(z).r}else x=c
w=d?Object.create(new H.dX().constructor.prototype):Object.create(new H.aR(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.B
$.B=J.ae(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.bx(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.fh,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.bw:H.aS
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.e("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.bx(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
d1:function(a,b,c,d){var z=H.aS
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bx:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.d3(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.d1(y,!w,z,b)
if(y===0){w=$.B
$.B=J.ae(w,1)
u="self"+H.c(w)
w="return function(){var "+u+" = this."
v=$.a0
if(v==null){v=H.at("self")
$.a0=v}return new Function(w+H.c(v)+";return "+u+"."+H.c(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.B
$.B=J.ae(w,1)
t+=H.c(w)
w="return function("+t+"){return this."
v=$.a0
if(v==null){v=H.at("self")
$.a0=v}return new Function(w+H.c(v)+"."+H.c(z)+"("+t+");}")()},
d2:function(a,b,c,d){var z,y
z=H.aS
y=H.bw
switch(b?-1:a){case 0:throw H.e(new H.dU("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
d3:function(a,b){var z,y,x,w,v,u,t,s
z=H.d_()
y=$.bv
if(y==null){y=H.at("receiver")
$.bv=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.d2(w,!u,x,b)
if(w===1){y="return function(){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+");"
u=$.B
$.B=J.ae(u,1)
return new Function(y+H.c(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.c(z)+"."+H.c(x)+"(this."+H.c(y)+", "+s+");"
u=$.B
$.B=J.ae(u,1)
return new Function(y+H.c(u)+"}")()},
bj:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.n(c).$isk){c.fixed$length=Array
z=c}else z=c
return H.d4(a,b,z,!!d,e,f)},
fc:function(a){var z=J.n(a)
return"$S" in z?z.$S():null},
Z:function(a,b){var z
if(a==null)return!1
z=H.fc(a)
return z==null?!1:H.cH(z,b)},
fC:function(a){throw H.e(new P.d8(a))},
aP:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
cF:function(a){return init.getIsolateTag(a)},
G:function(a,b){a.$ti=b
return a},
aM:function(a){if(a==null)return
return a.$ti},
cG:function(a,b){return H.bq(a["$as"+H.c(b)],H.aM(a))},
q:function(a,b,c){var z=H.cG(a,b)
return z==null?null:z[c]},
ac:function(a,b){var z=H.aM(a)
return z==null?null:z[b]},
a_:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.cI(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.c(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.a_(z,b)
return H.f0(a,b)}return"unknown-reified-type"},
f0:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.a_(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.a_(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.a_(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.fd(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.a_(r[p],b)+(" "+H.c(p))}w+="}"}return"("+w+") => "+z},
cI:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.b9("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.t=v+", "
u=a[y]
if(u!=null)w=!1
v=z.t+=H.a_(u,c)}return w?"":"<"+z.i(0)+">"},
bq:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
cD:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.aM(a)
y=J.n(a)
if(y[b]==null)return!1
return H.cB(H.bq(y[d],z),c)},
cB:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.v(a[y],b[y]))return!1
return!0},
cE:function(a,b,c){return a.apply(b,H.cG(b,c))},
v:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="az")return!0
if('func' in b)return H.cH(a,b)
if('func' in a)return b.builtin$cls==="h5"||b.builtin$cls==="b"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.a_(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.cB(H.bq(u,z),x)},
cA:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.v(z,v)||H.v(v,z)))return!1}return!0},
f6:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.v(v,u)||H.v(u,v)))return!1}return!0},
cH:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.v(z,y)||H.v(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.cA(x,w,!1))return!1
if(!H.cA(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.v(o,n)||H.v(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.v(o,n)||H.v(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.v(o,n)||H.v(n,o)))return!1}}return H.f6(a.named,b.named)},
hP:function(a){var z=$.bl
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
hN:function(a){return H.J(a)},
hM:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
fv:function(a){var z,y,x,w,v,u
z=$.bl.$1(a)
y=$.aK[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aN[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.cz.$2(a,z)
if(z!=null){y=$.aK[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.aN[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bo(x)
$.aK[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.aN[z]=x
return x}if(v==="-"){u=H.bo(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.cK(a,x)
if(v==="*")throw H.e(new P.cj(z))
if(init.leafTags[z]===true){u=H.bo(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.cK(a,x)},
cK:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.aO(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bo:function(a){return J.aO(a,!1,null,!!a.$isH)},
fw:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.aO(z,!1,null,!!z.$isH)
else return J.aO(z,c,null,null)},
fm:function(){if(!0===$.bm)return
$.bm=!0
H.fn()},
fn:function(){var z,y,x,w,v,u,t,s
$.aK=Object.create(null)
$.aN=Object.create(null)
H.fi()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.cL.$1(v)
if(u!=null){t=H.fw(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
fi:function(){var z,y,x,w,v,u,t
z=C.F()
z=H.W(C.C,H.W(C.H,H.W(C.j,H.W(C.j,H.W(C.G,H.W(C.D,H.W(C.E(C.k),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.bl=new H.fj(v)
$.cz=new H.fk(u)
$.cL=new H.fl(t)},
W:function(a,b){return a(b)||b},
d5:{"^":"b;",
i:function(a){return P.bO(this)},
w:function(a,b,c){return H.d6()}},
d7:{"^":"d5;a,b,c,$ti",
gk:function(a){return this.a},
T:function(a){if(typeof a!=="string")return!1
if("__proto__"===a)return!1
return this.b.hasOwnProperty(a)},
h:function(a,b){if(!this.T(b))return
return this.aM(b)},
aM:function(a){return this.b[a]},
be:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.aM(w))}}},
dS:{"^":"b;a,b,c,d,e,f,r,x",m:{
dT:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.dS(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
e9:{"^":"b;a,b,c,d,e,f",
D:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
m:{
E:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.e9(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
aE:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
ce:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
bU:{"^":"r;a,b",
i:function(a){var z=this.b
if(z==null)return"NullError: "+H.c(this.a)
return"NullError: method not found: '"+H.c(z)+"' on null"}},
dA:{"^":"r;a,b,c",
i:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.c(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.c(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.c(this.a)+")"},
m:{
aX:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.dA(a,y,z?null:b.receiver)}}},
eb:{"^":"r;a",
i:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
fD:{"^":"f:2;a",
$1:function(a){if(!!J.n(a).$isr)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
ct:{"^":"b;a,b",
i:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
fp:{"^":"f:0;a",
$0:function(){return this.a.$0()}},
fq:{"^":"f:0;a,b",
$0:function(){return this.a.$1(this.b)}},
fr:{"^":"f:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)}},
fs:{"^":"f:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)}},
ft:{"^":"f:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)}},
f:{"^":"b;",
i:function(a){return"Closure '"+H.bZ(this).trim()+"'"},
gbw:function(){return this},
gbw:function(){return this}},
c4:{"^":"f;"},
dX:{"^":"c4;",
i:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
aR:{"^":"c4;a,b,c,d",
q:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.aR))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gn:function(a){var z,y
z=this.c
if(z==null)y=H.J(this.a)
else y=typeof z!=="object"?J.aq(z):H.J(z)
z=H.J(this.b)
if(typeof y!=="number")return y.cY()
return(y^z)>>>0},
i:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.c(this.d)+"' of "+H.aA(z)},
m:{
aS:function(a){return a.a},
bw:function(a){return a.c},
d_:function(){var z=$.a0
if(z==null){z=H.at("self")
$.a0=z}return z},
at:function(a){var z,y,x,w,v
z=new H.aR("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
dU:{"^":"r;a",
i:function(a){return"RuntimeError: "+H.c(this.a)}},
Q:{"^":"b;a,b,c,d,e,f,r,$ti",
gk:function(a){return this.a},
gF:function(a){return this.a===0},
gbj:function(){return new H.dH(this,[H.ac(this,0)])},
gbu:function(a){return H.ay(this.gbj(),new H.dz(this),H.ac(this,0),H.ac(this,1))},
T:function(a){var z
if((a&0x3ffffff)===a){z=this.c
if(z==null)return!1
return this.c4(z,a)}else return this.cE(a)},
cE:function(a){var z=this.d
if(z==null)return!1
return this.X(this.a3(z,this.W(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.S(z,b)
return y==null?null:y.gL()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.S(x,b)
return y==null?null:y.gL()}else return this.cF(b)},
cF:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.a3(z,this.W(a))
x=this.X(y,a)
if(x<0)return
return y[x].gL()},
w:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.am()
this.b=z}this.aE(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.am()
this.c=y}this.aE(y,b,c)}else{x=this.d
if(x==null){x=this.am()
this.d=x}w=this.W(b)
v=this.a3(x,w)
if(v==null)this.aq(x,w,[this.an(b,c)])
else{u=this.X(v,b)
if(u>=0)v[u].sL(c)
else v.push(this.an(b,c))}}},
cO:function(a,b){var z
if(this.T(a))return this.h(0,a)
z=b.$0()
this.w(0,a,z)
return z},
Z:function(a,b){if(typeof b==="string")return this.aY(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.aY(this.c,b)
else return this.cG(b)},
cG:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.a3(z,this.W(a))
x=this.X(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.b4(w)
return w.gL()},
O:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
be:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.e(new P.a1(this))
z=z.c}},
aE:function(a,b,c){var z=this.S(a,b)
if(z==null)this.aq(a,b,this.an(b,c))
else z.sL(c)},
aY:function(a,b){var z
if(a==null)return
z=this.S(a,b)
if(z==null)return
this.b4(z)
this.aK(a,b)
return z.gL()},
an:function(a,b){var z,y
z=new H.dG(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
b4:function(a){var z,y
z=a.gcd()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
W:function(a){return J.aq(a)&0x3ffffff},
X:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.L(a[y].gbh(),b))return y
return-1},
i:function(a){return P.bO(this)},
S:function(a,b){return a[b]},
a3:function(a,b){return a[b]},
aq:function(a,b,c){a[b]=c},
aK:function(a,b){delete a[b]},
c4:function(a,b){return this.S(a,b)!=null},
am:function(){var z=Object.create(null)
this.aq(z,"<non-identifier-key>",z)
this.aK(z,"<non-identifier-key>")
return z},
$isdj:1},
dz:{"^":"f:2;a",
$1:function(a){return this.a.h(0,a)}},
dG:{"^":"b;bh:a<,L:b@,c,cd:d<"},
dH:{"^":"h;a,$ti",
gk:function(a){return this.a.a},
gA:function(a){var z,y
z=this.a
y=new H.dI(z,z.r,null,null)
y.c=z.e
return y}},
dI:{"^":"b;a,b,c,d",
gv:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.a1(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
fj:{"^":"f:2;a",
$1:function(a){return this.a(a)}},
fk:{"^":"f:5;a",
$2:function(a,b){return this.a(a,b)}},
fl:{"^":"f:6;a",
$1:function(a){return this.a(a)}}}],["","",,H,{"^":"",
fd:function(a){var z=H.G(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
fy:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",bP:{"^":"d;",$isbP:1,"%":"ArrayBuffer"},b3:{"^":"d;",$isb3:1,"%":"DataView;ArrayBufferView;b1|bQ|bS|b2|bR|bT|I"},b1:{"^":"b3;",
gk:function(a){return a.length},
$isH:1,
$asH:I.t,
$isD:1,
$asD:I.t},b2:{"^":"bS;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
w:function(a,b,c){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
a[b]=c}},bQ:{"^":"b1+aY;",$asH:I.t,$asD:I.t,
$ask:function(){return[P.K]},
$ash:function(){return[P.K]},
$isk:1,
$ish:1},bS:{"^":"bQ+bF;",$asH:I.t,$asD:I.t,
$ask:function(){return[P.K]},
$ash:function(){return[P.K]}},I:{"^":"bT;",
w:function(a,b,c){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
a[b]=c},
$isk:1,
$ask:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]}},bR:{"^":"b1+aY;",$asH:I.t,$asD:I.t,
$ask:function(){return[P.j]},
$ash:function(){return[P.j]},
$isk:1,
$ish:1},bT:{"^":"bR+bF;",$asH:I.t,$asD:I.t,
$ask:function(){return[P.j]},
$ash:function(){return[P.j]}},he:{"^":"b2;",$isk:1,
$ask:function(){return[P.K]},
$ish:1,
$ash:function(){return[P.K]},
"%":"Float32Array"},hf:{"^":"b2;",$isk:1,
$ask:function(){return[P.K]},
$ish:1,
$ash:function(){return[P.K]},
"%":"Float64Array"},hg:{"^":"I;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Int16Array"},hh:{"^":"I;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Int32Array"},hi:{"^":"I;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Int8Array"},hj:{"^":"I;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Uint16Array"},hk:{"^":"I;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"Uint32Array"},hl:{"^":"I;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":"CanvasPixelArray|Uint8ClampedArray"},hm:{"^":"I;",
gk:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.p(H.o(a,b))
return a[b]},
$isk:1,
$ask:function(){return[P.j]},
$ish:1,
$ash:function(){return[P.j]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
ee:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.f7()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.Y(new P.eg(z),1)).observe(y,{childList:true})
return new P.ef(z,y,x)}else if(self.setImmediate!=null)return P.f8()
return P.f9()},
hC:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.Y(new P.eh(a),0))},"$1","f7",2,0,3],
hD:[function(a){++init.globalState.f.b
self.setImmediate(H.Y(new P.ei(a),0))},"$1","f8",2,0,3],
hE:[function(a){P.ba(C.h,a)},"$1","f9",2,0,3],
cu:function(a,b){if(H.Z(a,{func:1,args:[P.az,P.az]})){b.toString
return a}else{b.toString
return a}},
f2:function(){var z,y
for(;z=$.V,z!=null;){$.aa=null
y=z.b
$.V=y
if(y==null)$.a9=null
z.a.$0()}},
hL:[function(){$.bh=!0
try{P.f2()}finally{$.aa=null
$.bh=!1
if($.V!=null)$.$get$bb().$1(P.cC())}},"$0","cC",0,0,1],
cy:function(a){var z=new P.ck(a,null)
if($.V==null){$.a9=z
$.V=z
if(!$.bh)$.$get$bb().$1(P.cC())}else{$.a9.b=z
$.a9=z}},
f4:function(a){var z,y,x
z=$.V
if(z==null){P.cy(a)
$.aa=$.a9
return}y=new P.ck(a,null)
x=$.aa
if(x==null){y.b=z
$.aa=y
$.V=y}else{y.b=x.b
x.b=y
$.aa=y
if(y.b==null)$.a9=y}},
cM:function(a){var z=$.l
if(C.a===z){P.aJ(null,null,C.a,a)
return}z.toString
P.aJ(null,null,z,z.as(a,!0))},
eZ:function(a,b,c){$.l.toString
a.a9(b,c)},
c6:function(a,b){var z=$.l
if(z===C.a){z.toString
return P.ba(a,b)}return P.ba(a,z.as(b,!0))},
e8:function(a,b){var z,y
z=$.l
if(z===C.a){z.toString
return P.c7(a,b)}y=z.b7(b,!0)
$.l.toString
return P.c7(a,y)},
ba:function(a,b){var z=C.b.C(a.a,1000)
return H.e3(z<0?0:z,b)},
c7:function(a,b){var z=C.b.C(a.a,1000)
return H.e4(z<0?0:z,b)},
ed:function(){return $.l},
ao:function(a,b,c,d,e){var z={}
z.a=d
P.f4(new P.f3(z,e))},
cv:function(a,b,c,d){var z,y
y=$.l
if(y===c)return d.$0()
$.l=c
z=y
try{y=d.$0()
return y}finally{$.l=z}},
cx:function(a,b,c,d,e){var z,y
y=$.l
if(y===c)return d.$1(e)
$.l=c
z=y
try{y=d.$1(e)
return y}finally{$.l=z}},
cw:function(a,b,c,d,e,f){var z,y
y=$.l
if(y===c)return d.$2(e,f)
$.l=c
z=y
try{y=d.$2(e,f)
return y}finally{$.l=z}},
aJ:function(a,b,c,d){var z=C.a!==c
if(z)d=c.as(d,!(!z||!1))
P.cy(d)},
eg:{"^":"f:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()}},
ef:{"^":"f:7;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
eh:{"^":"f:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
ei:{"^":"f:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()}},
co:{"^":"b;ao:a<,b,c,d,e",
gcj:function(){return this.b.b},
gbg:function(){return(this.c&1)!==0},
gcD:function(){return(this.c&2)!==0},
gbf:function(){return this.c===8},
cB:function(a){return this.b.b.aw(this.d,a)},
cL:function(a){if(this.c!==6)return!0
return this.b.b.aw(this.d,J.af(a))},
cv:function(a){var z,y,x
z=this.e
y=J.z(a)
x=this.b.b
if(H.Z(z,{func:1,args:[,,]}))return x.cS(z,y.gK(a),a.gM())
else return x.aw(z,y.gK(a))},
cC:function(){return this.b.b.bp(this.d)}},
T:{"^":"b;a5:a<,b,cg:c<,$ti",
gcb:function(){return this.a===2},
gal:function(){return this.a>=4},
bs:function(a,b){var z,y
z=$.l
if(z!==C.a){z.toString
if(b!=null)b=P.cu(b,z)}y=new P.T(0,z,null,[null])
this.aa(new P.co(null,y,b==null?1:3,a,b))
return y},
cU:function(a){return this.bs(a,null)},
bv:function(a){var z,y
z=$.l
y=new P.T(0,z,null,this.$ti)
if(z!==C.a)z.toString
this.aa(new P.co(null,y,8,a,null))
return y},
aa:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gal()){y.aa(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.aJ(null,null,z,new P.ev(this,a))}},
aX:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gao()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gal()){v.aX(a)
return}this.a=v.a
this.c=v.c}z.a=this.a4(a)
y=this.b
y.toString
P.aJ(null,null,y,new P.eA(z,this))}},
ap:function(){var z=this.c
this.c=null
return this.a4(z)},
a4:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gao()
z.a=y}return y},
ag:function(a){var z,y
z=this.$ti
if(H.cD(a,"$isa3",z,"$asa3"))if(H.cD(a,"$isT",z,null))P.cp(a,this)
else P.ew(a,this)
else{y=this.ap()
this.a=4
this.c=a
P.a6(this,y)}},
ah:[function(a,b){var z=this.ap()
this.a=8
this.c=new P.ar(a,b)
P.a6(this,z)},function(a){return this.ah(a,null)},"cZ","$2","$1","gaJ",2,2,8,0],
bX:function(a,b){this.a=4
this.c=a},
$isa3:1,
m:{
ew:function(a,b){var z,y,x
b.a=1
try{a.bs(new P.ex(b),new P.ey(b))}catch(x){z=H.A(x)
y=H.y(x)
P.cM(new P.ez(b,z,y))}},
cp:function(a,b){var z,y,x
for(;a.gcb();)a=a.c
z=a.gal()
y=b.c
if(z){b.c=null
x=b.a4(y)
b.a=a.a
b.c=a.c
P.a6(b,x)}else{b.a=2
b.c=a
a.aX(y)}},
a6:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=y.c
y=y.b
u=J.af(v)
t=v.gM()
y.toString
P.ao(null,null,y,u,t)}return}for(;b.gao()!=null;b=s){s=b.a
b.a=null
P.a6(z.a,b)}r=z.a.c
x.a=w
x.b=r
y=!w
if(!y||b.gbg()||b.gbf()){q=b.gcj()
if(w){u=z.a.b
u.toString
u=u==null?q==null:u===q
if(!u)q.toString
else u=!0
u=!u}else u=!1
if(u){y=z.a
v=y.c
y=y.b
u=J.af(v)
t=v.gM()
y.toString
P.ao(null,null,y,u,t)
return}p=$.l
if(p==null?q!=null:p!==q)$.l=q
else p=null
if(b.gbf())new P.eD(z,x,w,b).$0()
else if(y){if(b.gbg())new P.eC(x,b,r).$0()}else if(b.gcD())new P.eB(z,x,b).$0()
if(p!=null)$.l=p
y=x.b
if(!!J.n(y).$isa3){o=b.b
if(y.a>=4){n=o.c
o.c=null
b=o.a4(n)
o.a=y.a
o.c=y.c
z.a=y
continue}else P.cp(y,o)
return}}o=b.b
b=o.ap()
y=x.a
u=x.b
if(!y){o.a=4
o.c=u}else{o.a=8
o.c=u}z.a=o
y=o}}}},
ev:{"^":"f:0;a,b",
$0:function(){P.a6(this.a,this.b)}},
eA:{"^":"f:0;a,b",
$0:function(){P.a6(this.b,this.a.a)}},
ex:{"^":"f:2;a",
$1:function(a){var z=this.a
z.a=0
z.ag(a)}},
ey:{"^":"f:9;a",
$2:function(a,b){this.a.ah(a,b)},
$1:function(a){return this.$2(a,null)}},
ez:{"^":"f:0;a,b,c",
$0:function(){this.a.ah(this.b,this.c)}},
eD:{"^":"f:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.cC()}catch(w){y=H.A(w)
x=H.y(w)
if(this.c){v=J.af(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.ar(y,x)
u.a=!0
return}if(!!J.n(z).$isa3){if(z instanceof P.T&&z.ga5()>=4){if(z.ga5()===8){v=this.b
v.b=z.gcg()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.cU(new P.eE(t))
v.a=!1}}},
eE:{"^":"f:2;a",
$1:function(a){return this.a}},
eC:{"^":"f:1;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.cB(this.c)}catch(x){z=H.A(x)
y=H.y(x)
w=this.a
w.b=new P.ar(z,y)
w.a=!0}}},
eB:{"^":"f:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.cL(z)===!0&&w.e!=null){v=this.b
v.b=w.cv(z)
v.a=!1}}catch(u){y=H.A(u)
x=H.y(u)
w=this.a
v=J.af(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.ar(y,x)
s.a=!0}}},
ck:{"^":"b;a,b"},
a5:{"^":"b;$ti",
P:function(a,b){return new P.eO(b,this,[H.q(this,"a5",0),null])},
gk:function(a){var z,y
z={}
y=new P.T(0,$.l,null,[P.j])
z.a=0
this.Y(new P.dZ(z),!0,new P.e_(z,y),y.gaJ())
return y},
az:function(a){var z,y,x
z=H.q(this,"a5",0)
y=H.G([],[z])
x=new P.T(0,$.l,null,[[P.k,z]])
this.Y(new P.e0(this,y),!0,new P.e1(y,x),x.gaJ())
return x}},
dZ:{"^":"f:2;a",
$1:function(a){++this.a.a}},
e_:{"^":"f:0;a,b",
$0:function(){this.b.ag(this.a.a)}},
e0:{"^":"f;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.cE(function(a){return{func:1,args:[a]}},this.a,"a5")}},
e1:{"^":"f:0;a,b",
$0:function(){this.b.ag(this.a)}},
dY:{"^":"b;"},
aG:{"^":"b;a5:e<,$ti",
au:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.b9()
if((z&4)===0&&(this.e&32)===0)this.aO(this.gaT())},
bm:function(a){return this.au(a,null)},
bo:function(){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gF(z)}else z=!1
if(z)this.r.a7(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.aO(this.gaV())}}}},
b8:function(){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.ad()
z=this.f
return z==null?$.$get$av():z},
ad:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.b9()
if((this.e&32)===0)this.r=null
this.f=this.aS()},
ac:["bO",function(a){var z=this.e
if((z&8)!==0)return
if(z<32)this.b_(a)
else this.ab(new P.el(a,null,[H.q(this,"aG",0)]))}],
a9:["bP",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.b1(a,b)
else this.ab(new P.en(a,b,null))}],
c_:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.b0()
else this.ab(C.y)},
aU:[function(){},"$0","gaT",0,0,1],
aW:[function(){},"$0","gaV",0,0,1],
aS:function(){return},
ab:function(a){var z,y
z=this.r
if(z==null){z=new P.eX(null,null,0,[H.q(this,"aG",0)])
this.r=z}z.N(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.a7(this)}},
b_:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.ax(this.a,a)
this.e=(this.e&4294967263)>>>0
this.ae((z&4)!==0)},
b1:function(a,b){var z,y
z=this.e
y=new P.ek(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.ad()
z=this.f
if(!!J.n(z).$isa3&&z!==$.$get$av())z.bv(y)
else y.$0()}else{y.$0()
this.ae((z&4)!==0)}},
b0:function(){var z,y
z=new P.ej(this)
this.ad()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.n(y).$isa3&&y!==$.$get$av())y.bv(z)
else z.$0()},
aO:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.ae((z&4)!==0)},
ae:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gF(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gF(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.aU()
else this.aW()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.a7(this)},
bU:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.cu(b,z)
this.c=c}},
ek:{"^":"f:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.Z(y,{func:1,args:[P.b,P.al]})
w=z.d
v=this.b
u=z.b
if(x)w.cT(u,v,this.c)
else w.ax(u,v)
z.e=(z.e&4294967263)>>>0}},
ej:{"^":"f:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.bq(z.c)
z.e=(z.e&4294967263)>>>0}},
cm:{"^":"b;a6:a@"},
el:{"^":"cm;b,a,$ti",
av:function(a){a.b_(this.b)}},
en:{"^":"cm;K:b>,M:c<,a",
av:function(a){a.b1(this.b,this.c)}},
em:{"^":"b;",
av:function(a){a.b0()},
ga6:function(){return},
sa6:function(a){throw H.e(new P.b8("No events after a done."))}},
eQ:{"^":"b;a5:a<",
a7:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.cM(new P.eR(this,a))
this.a=1},
b9:function(){if(this.a===1)this.a=3}},
eR:{"^":"f:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=x.ga6()
z.b=w
if(w==null)z.c=null
x.av(this.b)}},
eX:{"^":"eQ;b,c,a,$ti",
gF:function(a){return this.c==null},
N:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{z.sa6(b)
this.c=b}}},
bd:{"^":"a5;$ti",
Y:function(a,b,c,d){return this.c5(a,d,c,!0===b)},
bk:function(a,b,c){return this.Y(a,null,b,c)},
c5:function(a,b,c,d){return P.eu(this,a,b,c,d,H.q(this,"bd",0),H.q(this,"bd",1))},
aP:function(a,b){b.ac(a)},
ca:function(a,b,c){c.a9(a,b)},
$asa5:function(a,b){return[b]}},
cn:{"^":"aG;x,y,a,b,c,d,e,f,r,$ti",
ac:function(a){if((this.e&2)!==0)return
this.bO(a)},
a9:function(a,b){if((this.e&2)!==0)return
this.bP(a,b)},
aU:[function(){var z=this.y
if(z==null)return
z.bm(0)},"$0","gaT",0,0,1],
aW:[function(){var z=this.y
if(z==null)return
z.bo()},"$0","gaV",0,0,1],
aS:function(){var z=this.y
if(z!=null){this.y=null
return z.b8()}return},
d_:[function(a){this.x.aP(a,this)},"$1","gc7",2,0,function(){return H.cE(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"cn")}],
d1:[function(a,b){this.x.ca(a,b,this)},"$2","gc9",4,0,10],
d0:[function(){this.c_()},"$0","gc8",0,0,1],
bW:function(a,b,c,d,e,f,g){this.y=this.x.a.bk(this.gc7(),this.gc8(),this.gc9())},
$asaG:function(a,b){return[b]},
m:{
eu:function(a,b,c,d,e,f,g){var z,y
z=$.l
y=e?1:0
y=new P.cn(a,null,null,null,null,z,y,null,null,[f,g])
y.bU(b,c,d,e,g)
y.bW(a,b,c,d,e,f,g)
return y}}},
eO:{"^":"bd;b,a,$ti",
aP:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.A(w)
x=H.y(w)
P.eZ(b,y,x)
return}b.ac(z)}},
ar:{"^":"b;K:a>,M:b<",
i:function(a){return H.c(this.a)},
$isr:1},
eY:{"^":"b;"},
f3:{"^":"f:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.bV()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.e(z)
x=H.e(z)
x.stack=J.M(y)
throw x}},
eT:{"^":"eY;",
bq:function(a){var z,y,x,w
try{if(C.a===$.l){x=a.$0()
return x}x=P.cv(null,null,this,a)
return x}catch(w){z=H.A(w)
y=H.y(w)
x=P.ao(null,null,this,z,y)
return x}},
ax:function(a,b){var z,y,x,w
try{if(C.a===$.l){x=a.$1(b)
return x}x=P.cx(null,null,this,a,b)
return x}catch(w){z=H.A(w)
y=H.y(w)
x=P.ao(null,null,this,z,y)
return x}},
cT:function(a,b,c){var z,y,x,w
try{if(C.a===$.l){x=a.$2(b,c)
return x}x=P.cw(null,null,this,a,b,c)
return x}catch(w){z=H.A(w)
y=H.y(w)
x=P.ao(null,null,this,z,y)
return x}},
as:function(a,b){if(b)return new P.eU(this,a)
else return new P.eV(this,a)},
b7:function(a,b){return new P.eW(this,a)},
h:function(a,b){return},
bp:function(a){if($.l===C.a)return a.$0()
return P.cv(null,null,this,a)},
aw:function(a,b){if($.l===C.a)return a.$1(b)
return P.cx(null,null,this,a,b)},
cS:function(a,b,c){if($.l===C.a)return a.$2(b,c)
return P.cw(null,null,this,a,b,c)}},
eU:{"^":"f:0;a,b",
$0:function(){return this.a.bq(this.b)}},
eV:{"^":"f:0;a,b",
$0:function(){return this.a.bp(this.b)}},
eW:{"^":"f:2;a,b",
$1:function(a){return this.a.ax(this.b,a)}}}],["","",,P,{"^":"",
bL:function(){return new H.Q(0,null,null,null,null,null,0,[null,null])},
R:function(a){return H.fe(a,new H.Q(0,null,null,null,null,null,0,[null,null]))},
ds:function(a,b,c){var z,y
if(P.bi(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$ab()
y.push(a)
try{P.f1(a,z)}finally{if(0>=y.length)return H.i(y,-1)
y.pop()}y=P.c3(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
aw:function(a,b,c){var z,y,x
if(P.bi(a))return b+"..."+c
z=new P.b9(b)
y=$.$get$ab()
y.push(a)
try{x=z
x.t=P.c3(x.gt(),a,", ")}finally{if(0>=y.length)return H.i(y,-1)
y.pop()}y=z
y.t=y.gt()+c
y=z.gt()
return y.charCodeAt(0)==0?y:y},
bi:function(a){var z,y
for(z=0;y=$.$get$ab(),z<y.length;++z)if(a===y[z])return!0
return!1},
f1:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gA(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.c(z.gv())
b.push(w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.i(b,-1)
v=b.pop()
if(0>=b.length)return H.i(b,-1)
u=b.pop()}else{t=z.gv();++x
if(!z.u()){if(x<=4){b.push(H.c(t))
return}v=H.c(t)
if(0>=b.length)return H.i(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gv();++x
for(;z.u();t=s,s=r){r=z.gv();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.i(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.c(t)
v=H.c(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.i(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
a4:function(a,b,c,d){return new P.eI(0,null,null,null,null,null,0,[d])},
bO:function(a){var z,y,x
z={}
if(P.bi(a))return"{...}"
y=new P.b9("")
try{$.$get$ab().push(a)
x=y
x.t=x.gt()+"{"
z.a=!0
a.be(0,new P.dL(z,y))
z=y
z.t=z.gt()+"}"}finally{z=$.$get$ab()
if(0>=z.length)return H.i(z,-1)
z.pop()}z=y.gt()
return z.charCodeAt(0)==0?z:z},
cs:{"^":"Q;a,b,c,d,e,f,r,$ti",
W:function(a){return H.fx(a)&0x3ffffff},
X:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gbh()
if(x==null?b==null:x===b)return y}return-1},
m:{
a8:function(a,b){return new P.cs(0,null,null,null,null,null,0,[a,b])}}},
eI:{"^":"eF;a,b,c,d,e,f,r,$ti",
gA:function(a){var z=new P.cr(this,this.r,null,null)
z.c=this.e
return z},
gk:function(a){return this.a},
cm:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.c3(b)},
c3:function(a){var z=this.d
if(z==null)return!1
return this.a2(z[this.a1(a)],a)>=0},
bl:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.cm(0,a)?a:null
else return this.cc(a)},
cc:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.a1(a)]
x=this.a2(y,a)
if(x<0)return
return J.cQ(y,x).gaL()},
N:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.bf()
this.b=z}return this.aG(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.bf()
this.c=y}return this.aG(y,b)}else return this.E(b)},
E:function(a){var z,y,x
z=this.d
if(z==null){z=P.bf()
this.d=z}y=this.a1(a)
x=z[y]
if(x==null)z[y]=[this.af(a)]
else{if(this.a2(x,a)>=0)return!1
x.push(this.af(a))}return!0},
Z:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.aH(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.aH(this.c,b)
else return this.ce(b)},
ce:function(a){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.a1(a)]
x=this.a2(y,a)
if(x<0)return!1
this.aI(y.splice(x,1)[0])
return!0},
O:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
aG:function(a,b){if(a[b]!=null)return!1
a[b]=this.af(b)
return!0},
aH:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.aI(z)
delete a[b]
return!0},
af:function(a){var z,y
z=new P.eJ(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
aI:function(a){var z,y
z=a.gc2()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
a1:function(a){return J.aq(a)&0x3ffffff},
a2:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.L(a[y].gaL(),b))return y
return-1},
$ish:1,
$ash:null,
m:{
bf:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
eJ:{"^":"b;aL:a<,b,c2:c<"},
cr:{"^":"b;a,b,c,d",
gv:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.e(new P.a1(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
eF:{"^":"dV;$ti"},
aY:{"^":"b;$ti",
gA:function(a){return new H.bM(a,this.gk(a),0,null)},
J:function(a,b){return this.h(a,b)},
P:function(a,b){return new H.b0(a,b,[H.q(a,"aY",0),null])},
i:function(a){return P.aw(a,"[","]")},
$isk:1,
$ask:null,
$ish:1,
$ash:null},
dL:{"^":"f:11;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.t+=", "
z.a=!1
z=this.b
y=z.t+=H.c(a)
z.t=y+": "
z.t+=H.c(b)}},
dJ:{"^":"ak;a,b,c,d,$ti",
gA:function(a){return new P.eK(this,this.c,this.d,this.b,null)},
gF:function(a){return this.b===this.c},
gk:function(a){return(this.c-this.b&this.a.length-1)>>>0},
J:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.p(P.aU(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.i(y,w)
return y[w]},
O:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.i(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
i:function(a){return P.aw(this,"{","}")},
bn:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.e(H.bJ());++this.d
y=this.a
x=y.length
if(z>=x)return H.i(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
E:function(a){var z,y,x
z=this.a
y=this.c
x=z.length
if(y>=x)return H.i(z,y)
z[y]=a
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.aN();++this.d},
aN:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.G(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.c.aC(y,0,w,z,x)
C.c.aC(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
bR:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.G(z,[b])},
$ash:null,
m:{
aZ:function(a,b){var z=new P.dJ(null,0,0,0,[b])
z.bR(a,b)
return z}}},
eK:{"^":"b;a,b,c,d,e",
gv:function(){return this.e},
u:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.p(new P.a1(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.i(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
dW:{"^":"b;$ti",
P:function(a,b){return new H.bA(this,b,[H.ac(this,0),null])},
i:function(a){return P.aw(this,"{","}")},
$ish:1,
$ash:null},
dV:{"^":"dW;$ti"}}],["","",,P,{"^":"",
bC:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.M(a)
if(typeof a==="string")return JSON.stringify(a)
return P.dc(a)},
dc:function(a){var z=J.n(a)
if(!!z.$isf)return z.i(a)
return H.aA(a)},
au:function(a){return new P.et(a)},
b_:function(a,b,c){var z,y
z=H.G([],[c])
for(y=J.aQ(a);y.u();)z.push(y.gv())
return z},
bp:function(a){H.fy(H.c(a))},
fa:{"^":"b;",
gn:function(a){return P.b.prototype.gn.call(this,this)},
i:function(a){return this?"true":"false"}},
"+bool":0,
K:{"^":"ap;"},
"+double":0,
a2:{"^":"b;a",
G:function(a,b){return new P.a2(C.b.G(this.a,b.gc6()))},
R:function(a,b){return C.b.R(this.a,b.gc6())},
q:function(a,b){if(b==null)return!1
if(!(b instanceof P.a2))return!1
return this.a===b.a},
gn:function(a){return this.a&0x1FFFFFFF},
i:function(a){var z,y,x,w,v
z=new P.db()
y=this.a
if(y<0)return"-"+new P.a2(0-y).i(0)
x=z.$1(C.b.C(y,6e7)%60)
w=z.$1(C.b.C(y,1e6)%60)
v=new P.da().$1(y%1e6)
return""+C.b.C(y,36e8)+":"+H.c(x)+":"+H.c(w)+"."+H.c(v)},
m:{
d9:function(a,b,c,d,e,f){return new P.a2(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
da:{"^":"f:4;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
db:{"^":"f:4;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
r:{"^":"b;",
gM:function(){return H.y(this.$thrownJsError)}},
bV:{"^":"r;",
i:function(a){return"Throw of null."}},
N:{"^":"r;a,b,c,d",
gaj:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gai:function(){return""},
i:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.c(z)
w=this.gaj()+y+x
if(!this.a)return w
v=this.gai()
u=P.bC(this.b)
return w+v+": "+H.c(u)},
m:{
bt:function(a){return new P.N(!1,null,null,a)},
bu:function(a,b,c){return new P.N(!0,a,b,c)}}},
b6:{"^":"N;e,f,a,b,c,d",
gaj:function(){return"RangeError"},
gai:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.c(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.c(z)
else if(x>z)y=": Not in range "+H.c(z)+".."+H.c(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.c(z)}return y},
m:{
dQ:function(a){return new P.b6(null,null,!1,null,null,a)},
aC:function(a,b,c){return new P.b6(null,null,!0,a,b,"Value not in range")},
aB:function(a,b,c,d,e){return new P.b6(b,c,!0,a,d,"Invalid value")},
c0:function(a,b,c,d,e,f){if(0>a||a>c)throw H.e(P.aB(a,0,c,"start",f))
if(a>b||b>c)throw H.e(P.aB(b,a,c,"end",f))
return b}}},
di:{"^":"N;e,k:f>,a,b,c,d",
gaj:function(){return"RangeError"},
gai:function(){if(J.cP(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.c(z)},
m:{
aU:function(a,b,c,d,e){var z=e!=null?e:J.ag(b)
return new P.di(b,z,!0,a,c,"Index out of range")}}},
x:{"^":"r;a",
i:function(a){return"Unsupported operation: "+this.a}},
cj:{"^":"r;a",
i:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.c(z):"UnimplementedError"}},
b8:{"^":"r;a",
i:function(a){return"Bad state: "+this.a}},
a1:{"^":"r;a",
i:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.c(P.bC(z))+"."}},
c2:{"^":"b;",
i:function(a){return"Stack Overflow"},
gM:function(){return},
$isr:1},
d8:{"^":"r;a",
i:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.c(z)+"' during its initialization"}},
et:{"^":"b;a",
i:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.c(z)}},
dd:{"^":"b;a,aR",
i:function(a){return"Expando:"+H.c(this.a)},
h:function(a,b){var z,y
z=this.aR
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.p(P.bu(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.b5(b,"expando$values")
return y==null?null:H.b5(y,z)},
w:function(a,b,c){var z,y
z=this.aR
if(typeof z!=="string")z.set(b,c)
else{y=H.b5(b,"expando$values")
if(y==null){y=new P.b()
H.c_(b,"expando$values",y)}H.c_(y,z,c)}}},
j:{"^":"ap;"},
"+int":0,
C:{"^":"b;$ti",
P:function(a,b){return H.ay(this,b,H.q(this,"C",0),null)},
aA:function(a,b){return P.b_(this,!0,H.q(this,"C",0))},
az:function(a){return this.aA(a,!0)},
gk:function(a){var z,y
z=this.gA(this)
for(y=0;z.u();)++y
return y},
J:function(a,b){var z,y,x
if(b<0)H.p(P.aB(b,0,null,"index",null))
for(z=this.gA(this),y=0;z.u();){x=z.gv()
if(b===y)return x;++y}throw H.e(P.aU(b,this,"index",null,y))},
i:function(a){return P.ds(this,"(",")")}},
du:{"^":"b;"},
k:{"^":"b;$ti",$ask:null,$ish:1,$ash:null},
"+List":0,
az:{"^":"b;",
gn:function(a){return P.b.prototype.gn.call(this,this)},
i:function(a){return"null"}},
"+Null":0,
ap:{"^":"b;"},
"+num":0,
b:{"^":";",
q:function(a,b){return this===b},
gn:function(a){return H.J(this)},
i:function(a){return H.aA(this)},
toString:function(){return this.i(this)}},
al:{"^":"b;"},
S:{"^":"b;"},
"+String":0,
b9:{"^":"b;t<",
gk:function(a){return this.t.length},
i:function(a){var z=this.t
return z.charCodeAt(0)==0?z:z},
m:{
c3:function(a,b,c){var z=J.aQ(b)
if(!z.u())return a
if(c.length===0){do a+=H.c(z.gv())
while(z.u())}else{a+=H.c(z.gv())
for(;z.u();)a=a+c+H.c(z.gv())}return a}}}}],["","",,W,{"^":"",
f5:function(a){var z=$.l
if(z===C.a)return a
return z.b7(a,!0)},
u:{"^":"bB;","%":"HTMLBRElement|HTMLBaseElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLKeygenElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMenuItemElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
fF:{"^":"u;",
i:function(a){return String(a)},
$isd:1,
"%":"HTMLAnchorElement"},
fH:{"^":"u;",
i:function(a){return String(a)},
$isd:1,
"%":"HTMLAreaElement"},
fI:{"^":"u;",$isd:1,"%":"HTMLBodyElement"},
fJ:{"^":"u;j:height=,l:width=",
by:function(a,b,c){return a.getContext(b)},
bx:function(a,b){return this.by(a,b,null)},
"%":"HTMLCanvasElement"},
d0:{"^":"d;",
bH:function(a,b,c,d,e){a.fillStyle="rgba("+b+", "+c+", "+d+", "+e+")"},
a8:function(a,b,c,d){return this.bH(a,b,c,d,1)},
ct:function(a,b,c,d,e){a.fillText(b,c,d)},
bd:function(a,b,c,d){return this.ct(a,b,c,d,null)},
"%":"CanvasRenderingContext2D"},
fK:{"^":"d;",
i:function(a){return String(a)},
"%":"DOMException"},
bB:{"^":"dN;",
i:function(a){return a.localName},
$isd:1,
"%":";Element"},
fL:{"^":"u;j:height=,l:width=","%":"HTMLEmbedElement"},
fM:{"^":"aT;K:error=","%":"ErrorEvent"},
aT:{"^":"d;","%":"AnimationEvent|AnimationPlayerEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceLightEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
bD:{"^":"d;",
bZ:function(a,b,c,d){return a.addEventListener(b,H.Y(c,1),!1)},
cf:function(a,b,c,d){return a.removeEventListener(b,H.Y(c,1),!1)},
"%":"MediaStream;EventTarget"},
h4:{"^":"u;k:length=","%":"HTMLFormElement"},
h6:{"^":"u;j:height=,l:width=","%":"HTMLIFrameElement"},
h7:{"^":"u;j:height=,l:width=","%":"HTMLImageElement"},
h9:{"^":"u;j:height=,l:width=",$isd:1,"%":"HTMLInputElement"},
dC:{"^":"ea;cI:keyCode=","%":"KeyboardEvent"},
dM:{"^":"u;K:error=","%":"HTMLAudioElement;HTMLMediaElement"},
hn:{"^":"d;",$isd:1,"%":"Navigator"},
dN:{"^":"bD;",
i:function(a){var z=a.nodeValue
return z==null?this.bM(a):z},
"%":"Document|HTMLDocument;Node"},
ho:{"^":"u;j:height=,l:width=","%":"HTMLObjectElement"},
ht:{"^":"u;k:length=","%":"HTMLSelectElement"},
hu:{"^":"aT;K:error=","%":"SpeechRecognitionError"},
ea:{"^":"aT;","%":"CompositionEvent|DragEvent|FocusEvent|MouseEvent|PointerEvent|SVGZoomEvent|TextEvent|TouchEvent|WheelEvent;UIEvent"},
hz:{"^":"dM;j:height=,l:width=","%":"HTMLVideoElement"},
hB:{"^":"bD;",$isd:1,"%":"DOMWindow|Window"},
hH:{"^":"u;",$isd:1,"%":"HTMLFrameSetElement"},
eq:{"^":"a5;$ti",
Y:function(a,b,c,d){return W.bc(this.a,this.b,a,!1,H.ac(this,0))},
bk:function(a,b,c){return this.Y(a,null,b,c)}},
hF:{"^":"eq;a,b,c,$ti"},
er:{"^":"dY;a,b,c,d,e,$ti",
b8:function(){if(this.b==null)return
this.b5()
this.b=null
this.d=null
return},
au:function(a,b){if(this.b==null)return;++this.a
this.b5()},
bm:function(a){return this.au(a,null)},
bo:function(){if(this.b==null||this.a<=0)return;--this.a
this.b3()},
b3:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.cR(x,this.c,z,!1)}},
b5:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.cS(x,this.c,z,!1)}},
bV:function(a,b,c,d,e){this.b3()},
m:{
bc:function(a,b,c,d,e){var z=W.f5(new W.es(c))
z=new W.er(0,a,b,z,!1,[e])
z.bV(a,b,c,!1,e)
return z}}},
es:{"^":"f:2;a",
$1:function(a){return this.a.$1(a)}}}],["","",,P,{"^":""}],["","",,P,{"^":"",
a7:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
cq:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
eH:{"^":"b;",
cM:function(a){if(a<=0||a>4294967296)throw H.e(P.dQ("max must be in range 0 < max \u2264 2^32, was "+H.c(a)))
return Math.random()*a>>>0}},
w:{"^":"b;a,b,$ti",
i:function(a){return"Point("+H.c(this.a)+", "+H.c(this.b)+")"},
q:function(a,b){if(b==null)return!1
if(!(b instanceof P.w))return!1
return this.a===b.a&&this.b===b.b},
gn:function(a){return P.cq(P.a7(P.a7(0,this.a&0x1FFFFFFF),this.b&0x1FFFFFFF))},
G:function(a,b){var z=J.z(b)
return new P.w(C.d.G(this.a,z.gd2(b)),C.d.G(this.b,z.gd3(b)),this.$ti)},
m:{
dP:function(a,b,c){return new P.w(a,b,[c])}}},
eS:{"^":"b;",
i:function(a){return"Rectangle ("+H.c(this.a)+", "+H.c(this.b)+") "+H.c(this.c)+" x "+H.c(this.d)},
q:function(a,b){var z,y,x,w
if(b==null)return!1
if(!(b instanceof P.c1))return!1
z=this.a
y=b.a
if(z===y){x=this.b
w=b.b
z=x===w&&z+this.c===y+b.c&&x+this.d===w+b.d}else z=!1
return z},
gn:function(a){var z,y
z=this.a
y=this.b
return P.cq(P.a7(P.a7(P.a7(P.a7(0,z&0x1FFFFFFF),y&0x1FFFFFFF),z+this.c&0x1FFFFFFF),y+this.d&0x1FFFFFFF))}},
c1:{"^":"eS;a,b,c,d,$ti",m:{
b7:function(a,b,c,d,e){var z,y
if(typeof c!=="number")return c.R()
if(c<0)z=-c*0
else z=c
if(typeof d!=="number")return d.R()
if(d<0)y=-d*0
else y=d
return new P.c1(a,b,z,y,[e])}}}}],["","",,P,{"^":"",fE:{"^":"P;",$isd:1,"%":"SVGAElement"},fG:{"^":"m;",$isd:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},fN:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFEBlendElement"},fO:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFEColorMatrixElement"},fP:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFEComponentTransferElement"},fQ:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFECompositeElement"},fR:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFEConvolveMatrixElement"},fS:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFEDiffuseLightingElement"},fT:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFEDisplacementMapElement"},fU:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFEFloodElement"},fV:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFEGaussianBlurElement"},fW:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFEImageElement"},fX:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFEMergeElement"},fY:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFEMorphologyElement"},fZ:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFEOffsetElement"},h_:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFESpecularLightingElement"},h0:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFETileElement"},h1:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFETurbulenceElement"},h2:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGFilterElement"},h3:{"^":"P;j:height=,l:width=","%":"SVGForeignObjectElement"},dh:{"^":"P;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},P:{"^":"m;",$isd:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},h8:{"^":"P;j:height=,l:width=",$isd:1,"%":"SVGImageElement"},hc:{"^":"m;",$isd:1,"%":"SVGMarkerElement"},hd:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGMaskElement"},hp:{"^":"m;j:height=,l:width=",$isd:1,"%":"SVGPatternElement"},hq:{"^":"dh;j:height=,l:width=","%":"SVGRectElement"},hs:{"^":"m;",$isd:1,"%":"SVGScriptElement"},m:{"^":"bB;",$isd:1,"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGMetadataElement|SVGStopElement|SVGStyleElement|SVGTitleElement;SVGElement"},hv:{"^":"P;j:height=,l:width=",$isd:1,"%":"SVGSVGElement"},hw:{"^":"m;",$isd:1,"%":"SVGSymbolElement"},e2:{"^":"P;","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement;SVGTextContentElement"},hx:{"^":"e2;",$isd:1,"%":"SVGTextPathElement"},hy:{"^":"P;j:height=,l:width=",$isd:1,"%":"SVGUseElement"},hA:{"^":"m;",$isd:1,"%":"SVGViewElement"},hG:{"^":"m;",$isd:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},hI:{"^":"m;",$isd:1,"%":"SVGCursorElement"},hJ:{"^":"m;",$isd:1,"%":"SVGFEDropShadowElement"},hK:{"^":"m;",$isd:1,"%":"SVGMPathElement"}}],["","",,P,{"^":""}],["","",,P,{"^":"",hr:{"^":"d;",$isd:1,"%":"WebGL2RenderingContext"}}],["","",,P,{"^":""}],["","",,S,{"^":"",by:{"^":"b;",
gn:function(a){return 65536*C.b.ay(this.a)+256*C.b.ay(this.b)+C.b.ay(this.c)},
q:function(a,b){var z
if(b==null)return!1
z=J.n(b)
return!!z.$isby&&this.gn(this)===z.gn(b)},
h:function(a,b){return P.R(["r",this.a,"g",this.b,"b",this.c]).h(0,b)}},a:{"^":"by;a,b,c",
i:function(a){return"r: "+this.a+", g: "+this.b+", b: "+this.c}}}],["","",,X,{"^":"",cZ:{"^":"b;a,b,c,d",
gp:function(){var z,y
z=this.d
y=$.$get$as()
return P.b7(z.a,z.b,y.a,y.b,P.j)}}}],["","",,D,{"^":"",de:{"^":"b;a,b,c,d,e,f,r,x,y,z,Q",
bJ:function(a){var z,y,x,w
z=this.c
y=J.z(z)
x=y.gl(z)
if(typeof x!=="number")return x.bQ()
w=C.b.C(x,2)-50
z=y.gj(z)
if(typeof z!=="number")return z.cX()
y=[P.j]
z=new U.bW(C.bO,new P.w(w,z-15,y))
this.y=z
this.z=new U.bW(C.x,new P.w(w,0,y))
this.aD(z)
this.a.cK()
this.Q=P.e8(P.d9(0,0,0,17,0,0),new D.df(this))},
aD:function(a){var z,y,x,w,v
z=a.gp().a-100
y=a.gp()
x=y.a+y.c+100
if(z<0)z=0
w=this.e.c
if(x>w)x=w
y=this.b.cM(x-z)
v=J.cU(this.c)
if(typeof v!=="number")return v.bQ()
v=new X.cZ(5,1,0,new P.w(z+y,C.b.C(v,2)-C.d.C($.$get$as().b,2),[P.j]))
this.x=v
return v},
cV:function(a){var z,y,x,w,v,u,t,s,r,q
z={}
y=this.y
x=this.a
w=this.x
y.b=y.a.aB(y.b,w,x,a)
w=this.z
y=this.x
w.b=w.a.aB(w.b,y,x,a)
this.bc(this.y)
this.bc(this.z)
x=this.x
y=x.d
w=y.a+x.c
x.d=new P.w(w,y.b+x.b*x.a,[P.j])
y=this.e
v=y.a
if(!(w<v)){x=x.gp()
v=x.a+x.c>v+y.c-this.x.gp().c
x=v}else x=!0
if(x)this.x.c*=-1
x=this.x.gp()
if(x.b+x.d>=this.y.gp().b){x=this.x.gp()
if(x.a+x.c>=this.y.gp().a){x=this.x.gp()
w=this.y.gp()
w=x.a<=w.a+w.c
u=w}else u=!1}else u=!1
x=this.x.gp()
w=this.z.gp()
if(x.b<=w.b+w.d){x=this.x.gp()
if(x.a+x.c>=this.z.gp().a){x=this.x.gp()
w=this.z.gp()
w=x.a<=w.a+w.c
t=w}else t=!1}else t=!1
if(u)this.x.b=-1
else if(t)this.x.b=1
if(u||t){s=(u?this.y:this.z).b.a+50
x=this.x.gp()
w=this.x
r=C.d.cR(10*C.d.C(Math.abs(w.d.a-s),25))
w.c=x.a+x.c<=s?r*-1:r}z.a=1
x=this.x.gp()
w=y.b
q=x.b+x.d<w
if(q){++this.f
y=1}else{q=this.x.gp().b>w+y.d
if(q){++this.r
z.a=2
y=2}else y=1}if(q){this.aD(y===1?this.z:this.y).b=0
P.c6(C.A,new D.dg(z,this))}},
bc:function(a){var z,y,x
z=a.b
y=this.e
x=y.a
if(z.a<x)a.b=new P.w(0,z.b,[P.j])
else{z=a.gp()
y=x+y.c
if(z.a+z.c>y)a.b=new P.w(y-100,a.b.b,[P.j])}}},df:{"^":"f:2;a",
$1:function(a){var z,y,x,w,v,u
z=this.a
z.cV(a)
y=z.d
x=$.$get$bG()
J.bs(y,x.a,x.b,x.c)
x=z.c
w=J.z(x)
y.fillRect(0,0,w.gl(x),w.gj(x))
z.y.bb(a,y)
z.z.bb(a,y)
x=z.x
x.toString
v=$.$get$b4()
C.e.a8(y,v.a,v.b,v.c)
x=x.d
w=$.$get$as()
y.fillRect(x.a,x.b,w.a,w.b)
y.font="20px sans-serif"
C.e.a8(y,255,255,255)
C.e.bd(y,"Player 1: "+z.f,20,20)
u="Player 2: "+z.r
z=z.e
w=y.measureText(u).width
if(typeof w!=="number")return H.ad(w)
C.e.bd(y,u,z.a+z.c-w-20,20)}},dg:{"^":"f:0;a,b",
$0:function(){var z,y
z=this.a.a
y=this.b.x
if(z===1)y.b=-1
else y.b=1}}}],["","",,T,{"^":"",cX:{"^":"b;a",
aB:function(a,b,c,d){var z,y,x
z=a.a
y=b.d.a
x=this.a
if(Math.abs(y-z)>=x)if(z<y)z+=x
else if(z>y)z-=x
return new P.w(z,a.b,[P.j])}},ec:{"^":"b;a",
aB:function(a,b,c,d){if(c.bi(37)===!0)return new P.w(a.a-this.a,a.b,[P.j])
else if(c.bi(39)===!0)return new P.w(a.a+this.a,a.b,[P.j])
return a}}}],["","",,D,{"^":"",dB:{"^":"b;a,b,c,d",
bi:function(a){return this.b.cO(a,new D.dD())},
cK:function(){var z,y
z=this.a
z.toString
y=W.dC
this.c=W.bc(z,"keyup",new D.dE(this),!1,y)
this.d=W.bc(z,"keydown",new D.dF(this),!1,y)}},dD:{"^":"f:0;",
$0:function(){return!1}},dE:{"^":"f:2;a",
$1:function(a){this.a.b.w(0,J.br(a),!1)}},dF:{"^":"f:2;a",
$1:function(a){this.a.b.w(0,J.br(a),!0)}}}],["","",,U,{"^":"",bW:{"^":"b;a,b",
gp:function(){var z=this.b
return P.b7(z.a,z.b,100,15,P.j)},
bb:function(a,b){var z=$.$get$b4()
J.bs(b,z.a,z.b,z.c)
z=this.b
b.fillRect(z.a,z.b,100,15)}}}],["","",,F,{"^":"",
hO:[function(){var z,y
z=document
y=z.querySelector("#game")
z=z.body
new D.de(new D.dB(z,P.bL(),null,null),C.z,y,J.cV(y,"2d"),P.b7(0,0,y.width,y.height,null),0,0,null,null,null,null).bJ(0)},"$0","cJ",0,0,1]},1]]
setupProgram(dart,0)
J.n=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bK.prototype
return J.dw.prototype}if(typeof a=="string")return J.ax.prototype
if(a==null)return J.dx.prototype
if(typeof a=="boolean")return J.dv.prototype
if(a.constructor==Array)return J.ah.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aj.prototype
return a}if(a instanceof P.b)return a
return J.aL(a)}
J.F=function(a){if(typeof a=="string")return J.ax.prototype
if(a==null)return a
if(a.constructor==Array)return J.ah.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aj.prototype
return a}if(a instanceof P.b)return a
return J.aL(a)}
J.bk=function(a){if(a==null)return a
if(a.constructor==Array)return J.ah.prototype
if(typeof a!="object"){if(typeof a=="function")return J.aj.prototype
return a}if(a instanceof P.b)return a
return J.aL(a)}
J.ff=function(a){if(typeof a=="number")return J.ai.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.aF.prototype
return a}
J.fg=function(a){if(typeof a=="number")return J.ai.prototype
if(typeof a=="string")return J.ax.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.aF.prototype
return a}
J.z=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.aj.prototype
return a}if(a instanceof P.b)return a
return J.aL(a)}
J.ae=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.fg(a).G(a,b)}
J.L=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.n(a).q(a,b)}
J.cP=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.ff(a).R(a,b)}
J.cQ=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.fu(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.F(a).h(a,b)}
J.cR=function(a,b,c,d){return J.z(a).bZ(a,b,c,d)}
J.cS=function(a,b,c,d){return J.z(a).cf(a,b,c,d)}
J.cT=function(a,b){return J.bk(a).J(a,b)}
J.af=function(a){return J.z(a).gK(a)}
J.aq=function(a){return J.n(a).gn(a)}
J.cU=function(a){return J.z(a).gj(a)}
J.aQ=function(a){return J.bk(a).gA(a)}
J.br=function(a){return J.z(a).gcI(a)}
J.ag=function(a){return J.F(a).gk(a)}
J.cV=function(a,b){return J.z(a).bx(a,b)}
J.cW=function(a,b){return J.bk(a).P(a,b)}
J.bs=function(a,b,c,d){return J.z(a).a8(a,b,c,d)}
J.M=function(a){return J.n(a).i(a)}
I.bn=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.e=W.d0.prototype
C.B=J.d.prototype
C.c=J.ah.prototype
C.b=J.bK.prototype
C.d=J.ai.prototype
C.i=J.ax.prototype
C.I=J.aj.prototype
C.m=J.dO.prototype
C.f=J.aF.prototype
C.x=new T.cX(7)
C.y=new P.em()
C.z=new P.eH()
C.a=new P.eT()
C.h=new P.a2(0)
C.A=new P.a2(1e6)
C.C=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.D=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.j=function(hooks) { return hooks; }

C.E=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.F=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.G=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.H=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.k=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.J=I.bn(["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","grey","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","slategrey","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"])
C.aT=new S.a(240,248,255)
C.b2=new S.a(250,235,215)
C.n=new S.a(0,255,255)
C.a5=new S.a(127,255,212)
C.aV=new S.a(240,255,255)
C.aY=new S.a(245,245,220)
C.bj=new S.a(255,228,196)
C.K=new S.a(0,0,0)
C.bl=new S.a(255,235,205)
C.O=new S.a(0,0,255)
C.ab=new S.a(138,43,226)
C.an=new S.a(165,42,42)
C.aL=new S.a(222,184,135)
C.bN=new S.a(95,158,160)
C.a4=new S.a(127,255,0)
C.aC=new S.a(210,105,30)
C.b8=new S.a(255,127,80)
C.Y=new S.a(100,149,237)
C.bp=new S.a(255,248,220)
C.aI=new S.a(220,20,60)
C.M=new S.a(0,0,139)
C.S=new S.a(0,139,139)
C.au=new S.a(184,134,11)
C.t=new S.a(169,169,169)
C.P=new S.a(0,100,0)
C.ax=new S.a(189,183,107)
C.ad=new S.a(139,0,139)
C.bM=new S.a(85,107,47)
C.b9=new S.a(255,140,0)
C.ak=new S.a(153,50,204)
C.ac=new S.a(139,0,0)
C.aO=new S.a(233,150,122)
C.af=new S.a(143,188,143)
C.bK=new S.a(72,61,139)
C.w=new S.a(47,79,79)
C.U=new S.a(0,206,209)
C.ai=new S.a(148,0,211)
C.be=new S.a(255,20,147)
C.T=new S.a(0,191,255)
C.o=new S.a(105,105,105)
C.bA=new S.a(30,144,255)
C.at=new S.a(178,34,34)
C.br=new S.a(255,250,240)
C.bC=new S.a(34,139,34)
C.v=new S.a(255,0,255)
C.aJ=new S.a(220,220,220)
C.b0=new S.a(248,248,255)
C.bf=new S.a(255,215,0)
C.aG=new S.a(218,165,32)
C.r=new S.a(128,128,128)
C.Q=new S.a(0,128,0)
C.ap=new S.a(173,255,47)
C.aU=new S.a(240,255,240)
C.b7=new S.a(255,105,180)
C.aB=new S.a(205,92,92)
C.bL=new S.a(75,0,130)
C.bv=new S.a(255,255,240)
C.aS=new S.a(240,230,140)
C.aN=new S.a(230,230,250)
C.bn=new S.a(255,240,245)
C.a3=new S.a(124,252,0)
C.bq=new S.a(255,250,205)
C.ao=new S.a(173,216,230)
C.aR=new S.a(240,128,128)
C.aM=new S.a(224,255,255)
C.b4=new S.a(250,250,210)
C.u=new S.a(211,211,211)
C.ag=new S.a(144,238,144)
C.bc=new S.a(255,182,193)
C.ba=new S.a(255,160,122)
C.bB=new S.a(32,178,170)
C.aa=new S.a(135,206,250)
C.q=new S.a(119,136,153)
C.ar=new S.a(176,196,222)
C.bu=new S.a(255,255,224)
C.W=new S.a(0,255,0)
C.bE=new S.a(50,205,50)
C.b3=new S.a(250,240,230)
C.a6=new S.a(128,0,0)
C.Z=new S.a(102,205,170)
C.N=new S.a(0,0,205)
C.av=new S.a(186,85,211)
C.ah=new S.a(147,112,219)
C.bF=new S.a(60,179,113)
C.a2=new S.a(123,104,238)
C.V=new S.a(0,250,154)
C.bJ=new S.a(72,209,204)
C.az=new S.a(199,21,133)
C.bz=new S.a(25,25,112)
C.b_=new S.a(245,255,250)
C.bk=new S.a(255,228,225)
C.bi=new S.a(255,228,181)
C.bh=new S.a(255,222,173)
C.L=new S.a(0,0,128)
C.b5=new S.a(253,245,230)
C.a8=new S.a(128,128,0)
C.a1=new S.a(107,142,35)
C.bb=new S.a(255,165,0)
C.bx=new S.a(255,69,0)
C.aF=new S.a(218,112,214)
C.aQ=new S.a(238,232,170)
C.aj=new S.a(152,251,152)
C.aq=new S.a(175,238,238)
C.aH=new S.a(219,112,147)
C.bm=new S.a(255,239,213)
C.bg=new S.a(255,218,185)
C.aA=new S.a(205,133,63)
C.bd=new S.a(255,192,203)
C.aK=new S.a(221,160,221)
C.as=new S.a(176,224,230)
C.a7=new S.a(128,0,128)
C.a_=new S.a(102,51,153)
C.b6=new S.a(255,0,0)
C.aw=new S.a(188,143,143)
C.bH=new S.a(65,105,225)
C.ae=new S.a(139,69,19)
C.b1=new S.a(250,128,114)
C.aW=new S.a(244,164,96)
C.bD=new S.a(46,139,87)
C.bo=new S.a(255,245,238)
C.am=new S.a(160,82,45)
C.ay=new S.a(192,192,192)
C.a9=new S.a(135,206,235)
C.a0=new S.a(106,90,205)
C.p=new S.a(112,128,144)
C.bs=new S.a(255,250,250)
C.X=new S.a(0,255,127)
C.bI=new S.a(70,130,180)
C.aD=new S.a(210,180,140)
C.R=new S.a(0,128,128)
C.aE=new S.a(216,191,216)
C.by=new S.a(255,99,71)
C.bG=new S.a(64,224,208)
C.aP=new S.a(238,130,238)
C.aX=new S.a(245,222,179)
C.bw=new S.a(255,255,255)
C.aZ=new S.a(245,245,245)
C.bt=new S.a(255,255,0)
C.al=new S.a(154,205,50)
C.l=new H.d7(148,{aliceblue:C.aT,antiquewhite:C.b2,aqua:C.n,aquamarine:C.a5,azure:C.aV,beige:C.aY,bisque:C.bj,black:C.K,blanchedalmond:C.bl,blue:C.O,blueviolet:C.ab,brown:C.an,burlywood:C.aL,cadetblue:C.bN,chartreuse:C.a4,chocolate:C.aC,coral:C.b8,cornflowerblue:C.Y,cornsilk:C.bp,crimson:C.aI,cyan:C.n,darkblue:C.M,darkcyan:C.S,darkgoldenrod:C.au,darkgray:C.t,darkgreen:C.P,darkgrey:C.t,darkkhaki:C.ax,darkmagenta:C.ad,darkolivegreen:C.bM,darkorange:C.b9,darkorchid:C.ak,darkred:C.ac,darksalmon:C.aO,darkseagreen:C.af,darkslateblue:C.bK,darkslategray:C.w,darkslategrey:C.w,darkturquoise:C.U,darkviolet:C.ai,deeppink:C.be,deepskyblue:C.T,dimgray:C.o,dimgrey:C.o,dodgerblue:C.bA,firebrick:C.at,floralwhite:C.br,forestgreen:C.bC,fuchsia:C.v,gainsboro:C.aJ,ghostwhite:C.b0,gold:C.bf,goldenrod:C.aG,gray:C.r,green:C.Q,greenyellow:C.ap,grey:C.r,honeydew:C.aU,hotpink:C.b7,indianred:C.aB,indigo:C.bL,ivory:C.bv,khaki:C.aS,lavender:C.aN,lavenderblush:C.bn,lawngreen:C.a3,lemonchiffon:C.bq,lightblue:C.ao,lightcoral:C.aR,lightcyan:C.aM,lightgoldenrodyellow:C.b4,lightgray:C.u,lightgreen:C.ag,lightgrey:C.u,lightpink:C.bc,lightsalmon:C.ba,lightseagreen:C.bB,lightskyblue:C.aa,lightslategray:C.q,lightslategrey:C.q,lightsteelblue:C.ar,lightyellow:C.bu,lime:C.W,limegreen:C.bE,linen:C.b3,magenta:C.v,maroon:C.a6,mediumaquamarine:C.Z,mediumblue:C.N,mediumorchid:C.av,mediumpurple:C.ah,mediumseagreen:C.bF,mediumslateblue:C.a2,mediumspringgreen:C.V,mediumturquoise:C.bJ,mediumvioletred:C.az,midnightblue:C.bz,mintcream:C.b_,mistyrose:C.bk,moccasin:C.bi,navajowhite:C.bh,navy:C.L,oldlace:C.b5,olive:C.a8,olivedrab:C.a1,orange:C.bb,orangered:C.bx,orchid:C.aF,palegoldenrod:C.aQ,palegreen:C.aj,paleturquoise:C.aq,palevioletred:C.aH,papayawhip:C.bm,peachpuff:C.bg,peru:C.aA,pink:C.bd,plum:C.aK,powderblue:C.as,purple:C.a7,rebeccapurple:C.a_,red:C.b6,rosybrown:C.aw,royalblue:C.bH,saddlebrown:C.ae,salmon:C.b1,sandybrown:C.aW,seagreen:C.bD,seashell:C.bo,sienna:C.am,silver:C.ay,skyblue:C.a9,slateblue:C.a0,slategray:C.p,slategrey:C.p,snow:C.bs,springgreen:C.X,steelblue:C.bI,tan:C.aD,teal:C.R,thistle:C.aE,tomato:C.by,turquoise:C.bG,violet:C.aP,wheat:C.aX,white:C.bw,whitesmoke:C.aZ,yellow:C.bt,yellowgreen:C.al},C.J,[null,null])
C.bO=new T.ec(5)
$.bX="$cachedFunction"
$.bY="$cachedInvocation"
$.B=0
$.a0=null
$.bv=null
$.bl=null
$.cz=null
$.cL=null
$.aK=null
$.aN=null
$.bm=null
$.V=null
$.a9=null
$.aa=null
$.bh=!1
$.l=C.a
$.bE=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["bz","$get$bz",function(){return H.cF("_$dart_dartClosure")},"aV","$get$aV",function(){return H.cF("_$dart_js")},"bH","$get$bH",function(){return H.dq()},"bI","$get$bI",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.bE
$.bE=z+1
z="expando$key$"+z}return new P.dd(null,z)},"c8","$get$c8",function(){return H.E(H.aE({
toString:function(){return"$receiver$"}}))},"c9","$get$c9",function(){return H.E(H.aE({$method$:null,
toString:function(){return"$receiver$"}}))},"ca","$get$ca",function(){return H.E(H.aE(null))},"cb","$get$cb",function(){return H.E(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"cf","$get$cf",function(){return H.E(H.aE(void 0))},"cg","$get$cg",function(){return H.E(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"cd","$get$cd",function(){return H.E(H.ce(null))},"cc","$get$cc",function(){return H.E(function(){try{null.$method$}catch(z){return z.message}}())},"ci","$get$ci",function(){return H.E(H.ce(void 0))},"ch","$get$ch",function(){return H.E(function(){try{(void 0).$method$}catch(z){return z.message}}())},"bb","$get$bb",function(){return P.ee()},"av","$get$av",function(){var z,y
z=P.az
y=new P.T(0,P.ed(),null,[z])
y.bX(null,z)
return y},"ab","$get$ab",function(){return[]},"as","$get$as",function(){return P.dP(15,15,null)},"bG","$get$bG",function(){return C.l.h(0,"black")},"b4","$get$b4",function(){return C.l.h(0,"magenta")}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[null]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,ret:P.S,args:[P.j]},{func:1,args:[,P.S]},{func:1,args:[P.S]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[P.b],opt:[P.al]},{func:1,args:[,],opt:[,]},{func:1,v:true,args:[,P.al]},{func:1,args:[,,]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.fC(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.bn=a.bn
Isolate.t=a.t
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.cN(F.cJ(),b)},[])
else (function(b){H.cN(F.cJ(),b)})([])})})()