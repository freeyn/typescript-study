// Typescript 类
class Greeter {
  // 静态属性
  static cname: string = "Greeter";

  // 成员属性
  greeting: string;

  // 构造函数 - 执行初始化操作
  constructor(message: string) {
    this.greeting = message;
  }

  // 静态方法
  static getClassName() {
    return "Class name is Greeter";
  }

  // 成员方法
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("World");

// 访问器
let passcode = "Hello Typescript";

class Employee {
  // @ts-ignore -> 取消↓下一行的 @ts-check的错误提示
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == "Hello Typescript") {
      this._fullName = newName;
    } else {
      console.log("Error, Unauthrized update of employee");
    }
  }
}

let employee = new Employee();
employee.fullName = "Semlinker";
employee.fullName && console.log(employee.fullName);

// 类继承
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}
let sam = new Snake("Sammy the Python");
sam.move();

// ECMAScript 私有字段
class Person {
  #name: string;
  constructor(name: string) {
    this.#name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}`);
  }
}

let semlinker = new Person("Semlinker");
// semlinker.#name // 私有字段在类之外无法访问，也不能被检测到

// Typescript 泛型
// 1. 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}
// 2. 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = (x, y) => x + y;

// 3. 泛型变量
// T (Type) 指一个Typescript类型
// K (Key) 指对象中的键类型
// V (Value) 指对象中的值类型
// E (Element) 指元素类型

// 4. 泛型工具类型
// 1) typeof 获取一个变量生命或对象的类型
interface Person1 {
  name1: string;
  age1: number;
}
const sem: Person1 = { name1: "semlinker", age1: 30 };
type Sem = typeof sem; // -> Person1

function toArray(x: number): Array<number> {
  return [x];
}
type Func = typeof toArray; // -> (x: number) => number[]

// 2) keyof 可以用来获取一个对象中的所有 key 值
interface Person2 {
  name2: string;
  age: number;
}
type K1 = keyof Person2; // "name" | "age"
type K2 = keyof Person2[]; // "length" | "toString" | "pop" | "concat" | "join"
type K3 = keyof { [x: string]: Person2 }; // "string" | "number"

// 3) in 用来枚举遍历
type Keys = "a" | "b" | "c";
type Obj = {
  [p in Keys]: any; // => { a: any, b" any, c: any }
};

// 4) infer 在条件类型语句中，使用 infer 声明一个类型变量并且对它进行使用
type ReturnType0<T> = T extends (...args: any[]) => infer R ? R : any;

// 5) extends 用于添加泛型约束
interface ILengthwise {
  length: number;
}
function loggingIdentity<T extends ILengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
// loggingIdentity(3); // Error number
loggingIdentity({ length: 10, value: 3 });

//  6) Partial<T> 作用是将某个泛型里的属性全部变成可选项
// 定义:
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// };
interface Todo {
  title: string;
  description: string;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};
const todo2 = {
  desciption: "throw out trash",
};
