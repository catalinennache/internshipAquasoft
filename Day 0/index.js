const GREEN_FOREGROUND = "\x1b[32m"
const WHITE_FOREGROUND = "\x1b[37m"


// var let const demo
console.log(GREEN_FOREGROUND,'***** Key points on "var vs let vs const"');
console.log(GREEN_FOREGROUND,"*var is function scoped while let and const are block scoped");

const SCOPE_TEST = `{   
    var var_variable = 1;
    let let_variable = 2;
    const const_variable = 3;
 }`
console.log(WHITE_FOREGROUND, SCOPE_TEST)
eval(SCOPE_TEST)
console.log(GREEN_FOREGROUND, "After execution we get: ");

try{ console.log(" var_variable is ",var_variable) } catch(e){console.warn(e)}
try{ console.log(" let_variable is ",let_variable) } catch(e){console.warn(e)}
try{ console.log(" const_variable is ",const_variable) } catch(e){console.warn(e)}

console.log(GREEN_FOREGROUND,"*var variables can be referenced before declaration while the other two types can't")
console.log(GREEN_FOREGROUND,"*all variable types are hoisted, the difference is that var is also initialised with undefined")

const REF_TEST = `
console.log(x);
var x = true;

try{
    console.log(y);
    let y = true;
}catch(e){console.warn(e)}
`
console.log(WHITE_FOREGROUND, REF_TEST);
eval(REF_TEST)

console.log()
console.log(GREEN_FOREGROUND, "*A const variable needs to be defined upon declaration.")
console.log(GREEN_FOREGROUND, "*A let variable cannot be redeclared.")



// use of spread
console.log("\n\n\n")
console.log(GREEN_FOREGROUND, "****Use of Spread operator",'"..."')
console.log(GREEN_FOREGROUND,"... in iterables")

const SPREAD_ITERABLES_TEST = `
let iterable = [3,5,6,25,6]
console.log(iterable)
console.log(...iterable)
`
console.log(WHITE_FOREGROUND, SPREAD_ITERABLES_TEST, "\n", GREEN_FOREGROUND, "Will produce the following");
eval(SPREAD_ITERABLES_TEST)
console.log(GREEN_FOREGROUND, "*The first log shows the array as an entity with its elements")
console.log(GREEN_FOREGROUND, "*The second log shows the elements of the array, presented independently as in console.log(1,2,3,4,5)")


console.log(GREEN_FOREGROUND,"\n\n"," ... in Objects")

const SPREAD_OBJECTS_TEST = `
let object1 = {prop1:true}
let object2 = {prop2:2, test(){}}

let object3 = {...object1, ...object2}
console.log(object1)
console.log(object2)
console.log(object3)
`
console.log(WHITE_FOREGROUND, SPREAD_OBJECTS_TEST, "\n", GREEN_FOREGROUND, "Will produce the following", WHITE_FOREGROUND);
eval(SPREAD_OBJECTS_TEST)
console.log("\n",GREEN_FOREGROUND, "*Spread can be used to copy or merge simple objects. Note that the copying process is shallow")
console.log(GREEN_FOREGROUND, "*However it cannot place setters and getters like Object.assign would do")



//Objects and deepcopy
console.log("\n", "***** Key points in \"objects and deepcopy\"","\n")

console.log(GREEN_FOREGROUND, "*The Spread operator or the Object.assign method will copy the object in a shallow manner")
console.log(GREEN_FOREGROUND, "*There are implementations of deepcopy in libraries like Lodash (cloneDeep) or JQuery (extend).")

const CLOSEST_NATIVE_DC_VS_SC = `
let a = {prop1: 1, prop2:{x:5}}
let b_1 = JSON.parse(JSON.stringify(a))
let b_2 = Object.assign({},a)
a.prop2.x = 10
console.log(a) //original object
console.log(b_1) //deepcopy but limited only to object's properties
console.log(b_2) //shallow copy, copies values and references
`

console.log(WHITE_FOREGROUND, CLOSEST_NATIVE_DC_VS_SC)
eval(CLOSEST_NATIVE_DC_VS_SC)
console.log("\n\n")


//Arrays





//Promise and Callbacks





//Await Async





//Closures