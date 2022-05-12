// Typescript 装饰器

// 1. 装饰器定义
// 1) 它是一个表达式
// 2) 该表达式被执行后，返回一个函数
// 3) 函数的入参分别为 targe 、name 、descripor
// 4) 执行该函数后，可能返回 descriptor 对象，用户配置 target 对象

// 2. 装饰器分类
// 1) 类装饰器 Class decorators
// 2) 属性装饰器 Property decorators
// 3) 方法装饰器 Method decorators
// 4) 参数装饰器 Parameter decorators

// 类装饰器声明
// declare type ClassDecorator = <TFunction extends Function>(
//   targe: Function
// ) => TFunction | void;
// target: TFunction -> 被装饰的类

function Greeter(target: Function): void {
  target.prototype.greet = function (): void {
    console.log("Hello Semlinker");
  };
}

@Greeter // ←语法糖，使用装饰器
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
myGreeting.greet(); // console output: 'Hello Semlinker'

// 属性装饰器
// declare type PropertyDecorator = (
//   target: Object,
//   propertyKey: string | symbol
// ) => void;
// target: Object -> 被装饰类
// propertyKey: string | symbol -> 被装饰类的属性名

function logProperty(target: any, key: string) {
  delete target[key];

  const backingField = "_" + key;

  Object.defineProperty(target, backingField, {
    writable: true,
    enumerable: true,
    configurable: true,
  });

  //   property getter
  const getter = function (this: any) {
    const currVal = this[backingField];
    console.log(`GetL ${key} => ${currVal}`);
    return currVal;
  };

  //   property setter
  const setter = function (this: any, newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
    this[backingField] = newVal;
  };

  // Create new property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Person3 {
  @logProperty
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const p1 = new Person3("semlinker");
p1.name = "kakuqo";

// 方法装饰器
// 声明
// declare type MethodDecorator = <T>(
//   targe: Object,
//   propertyKey: string | symbol,
//   descriptor: TypedPropertyDescriptor<T>
// ) => TypedPropertyDescriptor<T> | void;
// target: Object -> 被装饰的类
// propertyKey: string | symbol -> 方法名
// descriptor: TypedPropertyDescriptor -> 属性描述符

function LogOutput(target: Function, key: string, descriptor: any) {
  let originalMethod = target || descriptor.value;
  let newMethod = function (...args: any[]): any {
    let result: any = originalMethod.apply(this, args);
    if (!this.loggedOutput) {
      this.loggedOutput = new Array<any>();
    }
    this.loggedOutput.push({
      method: key,
      parameter: args,
      output: result,
      timestamp: new Date(),
    });
    return result;
  };
  descriptor.value = newMethod;
}

class Calculater {
  @LogOutput
  double(num: number): number {
    return num * 2;
  }
}

let calc = new Calculater();
calc.double(11);
console.log(calc.loggedOutput);

// 参数装饰器
// 声明
// declare type ParameterDecorator = (
//   target: Object,
//   propertyKey: string | symbol,
//   parameterIndex: number
// ) => void;
// target: Object -> 被装饰的类
// propertyKey: string | symbol -> 方法名
// parameterIndex:number -> 方法中参数的索引值

function Log(target: Function, key: string, parameterIndex: number) {
  let functionLogged = key || target.prototype.constructor.name;
  console.log(
    `this parameter in position ${parameterIndex} at ${functionLogged} has been decorated`
  );
}

class Greeter1 {
  greeting: string;
  constructor(@Log phrase: string) {
    this.greeting = phrase;
  }
}
