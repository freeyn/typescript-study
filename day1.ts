// 可辨识联合
// 1.可辨识
enum CarTransmission {
  Automatic = 200,
  Manual = 300,
}

interface Motorcycle {
  vType: "motorcycle";
  make: number;
}

interface Car {
  vType: "car";
  transmission: CarTransmission;
}

interface Trunk {
  vType: "trunk";
  capacity: number;
}

// 2. 联合类型
type Vehicle = Motorcycle | Car | Trunk;

// 3. 类型守卫
const EVALUATION_FACTOR = Math.PI;

function evaluatePrice(vehicle: Vehicle) {
  switch (vehicle.vType) {
    case "car":
      return vehicle.transmission * EVALUATION_FACTOR;
    case "trunk":
      return vehicle.capacity * EVALUATION_FACTOR;
    case "motorcycle":
      return vehicle.make * EVALUATION_FACTOR;
  }
}
const myTrunk: Trunk = { vType: "trunk", capacity: 9.5 };
evaluatePrice(myTrunk);

// 类型别名
type Message = string | string[];
let greet = (message: Message) => {};

// 交叉类型
interface IPerson {
  id: string;
  age: number;
}

interface IWoker {
  companyId: string;
}
type iStaff = IPerson & IWoker;

const staff: iStaff = {
  id: "E1006",
  age: 33,
  companyId: "EFT",
};

// 箭头函数
const myBook: number[] = [1, 2, 3];

myBook.forEach(() => console.log("reading"));
myBook.forEach((title) => console.log(title));

// 参数类型与返回类型
function createUserId(name: string, id: number): string {
  return name + id;
}

//  函数类型
let IdGenerator: (chars: string, id: number) => string;
IdGenerator = createUserId;

// 可选参数及默认参数
function createUserId1(name: string, id: number, age?: number): string {
  return name + id;
}
function createUserId2(
  name: string = "Semlinker",
  id: number,
  age: number
): string {
  return name + id;
}

// 剩余参数
function push(array: any[], ...items: any[]) {
  items.forEach((item: any) => {
    array.push(item);
  });
}
let a: any[] = [];
push(a, 1, 2, 3);

// 函数重载
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: any, b: any) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toSring() + b.toSring();
  }
  return a + b;
}
// 成员方法重载
class Calcultator {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: string, b: number): string;
  add(a: number, b: string): string;
  add(a: any, b: any) {
    if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    }
    return a + b;
  }
}
const calcultator = new Calcultator();
const result = calcultator.add("Semlinker", "Kakuqo");

// Typescript 数组
// 1. 数组解构
let x: number;
let y: number;
let z: number;
let five_Array = [0, 1, 2, 3, 4];
[x, y, z] = five_Array;
// 2、数组展开运算符
let two_array = [0, 1];
let five_array = [...two_array, 2, 3, 4];
// 数组遍历
let colors: string[] = ["red", "green", "blue"];
for (let i of colors) {
  console.log(i);
}

// Typescript 对象
// 1.对象解构
let person = {
  firstname: "Semlinker",
  gender: "Male",
};
let { firstname, gender } = person;
// 2.对象展开运算符
// 组装对象
let personWithAge = { ...person, age: 13 };
// 获取除某些项外其他项
let { firstname: firstname1, ...rest } = personWithAge;

// Typescript 接口
// 1.对象的形状
interface Person {
  name: string;
  age: number;
}
let Semlinker: Person = {
  name: "Semlinker",
  age: 33,
};
// 2.可选、只读属性
interface Person1 {
  readonly name: string;
  age?: number;
}
let arr: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = arr;
// ro[0] = 12; // error
// ro.push(5); // error
// ro.length = 100; // error
// arr = ro; // error
