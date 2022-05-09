// Boolean
let isDone: boolean = false;

// Number
let count: number = 1;

// String
let str: string = "i'm string type";

// Array
let list0: number[] = [1];
let list1: Array<number> = [1];

// Enum
// 数字枚举
enum Direction0 {
  NORTH = 3, // 设置初始值
  SOUTH,
  EAST,
  WEST,
}
// 字符串枚举
enum Direction1 {
  NORTH = "NORTH",
  SOUTH = "SOUTH",
  EAST = "EAST",
  WEST = "WEST",
}
let dir = Direction0.NORTH;

// 数字与字符串混合的异构枚举
enum Direction2 {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}

// Any 全局超级类型，接受任何类型
let notSure: any = 666;
notSure = "Semlinker";
notSure = false;

// Unknown 顶级类型
let un: unknown;
un = true;
un = 42;
un = "Unknown";
un = [];
un = {};
un = Math.random();
un = null;
un = undefined;
un = new TypeError();
// un = Symbol("type");

// Tuple元组 多个类型数组
let tupleType: [string, boolean];
tupleType = ["tupleType", true];

// Void 无返回值
function warnUser(): void {
  console.log("this is my warning message");
}
let unusable: void = undefined;

//Null 与 Undefined
let u: undefined = undefined;
let n: null = null;

// Never 用不存在的值类型
function error(message: string): never {
  throw new Error(message);
}
function infiniteLoop(): never {
  while (true) {}
}
type Foo = string | number;
function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // here foo is string type
  } else if (typeof foo === "number") {
    // here foo is number type
  } else {
    // here foo is never type
    const check: never = foo;
  }
}

/// 断言
const someValue: any = "this is a string";
// 1.尖括号
let strLength: number = (<string>someValue).length;
// 2.as
let strLength1: number = (someValue as string).length;

// 类型守卫
//  in
interface Admin {
  name: string;
  privileges: string[];
}
interface Employee {
  name: string;
  startDate: Date;
}

type UnknowEmployee = Admin | Employee;

function printEmployeeInformation(emp: UnknowEmployee) {
  console.log("name", emp.name);
  if ("privileges" in emp) {
    console.log("privileges", emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("start date", emp.startDate);
  }
}

// typeof
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`expect string or number , got ${padding}.`);
}

// instanceof
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

let padder: Padder = new SpaceRepeatingPadder(6);
if (padder instanceof SpaceRepeatingPadder) {
  // padder 类型为 SpaceRepeatingPadder
}

// 自定义类型保护的类型谓词
function isNumber(x: any): x is number {
  return typeof x === "number";
}
function isString(x: any): x is string {
  return typeof x === "string";
}

// 联合类型
const sayHello = (name: string | undefined) => {
  console.log(name);
};

sayHello('hello');
sayHello(undefined)
