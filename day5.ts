// question1
type User = {
  id: number;
  kind: string;
};
function makeCustomer<T extends User>(u: T): T {
  return {
    ...u, // T类型可能是User类型的子类型，可能会包含更多的属性
    id: u.id,
    kind: "customer",
  };
}

// question2
function f(a: string | number, b: string | number) {
  let returnvalue: any;
  if (typeof a === "string") {
    returnvalue = `${a}:${b}`;
  } else {
    // 1) 函数重载
    returnvalue = (a as number) + (b as number);
  }
  return returnvalue;
}
// 2) 参数组合为一种类型
const isStrArr = (a: string[] | number[]): a is string[] =>
  typeof a[0] === "string";

function f2(...args: string[] | number[]) {
  if (isStrArr(args)) {
    return `${args[0]}:${args[1]}`;
  } else {
    return args[0] + args[1];
  }
}

f(1, 2);
f(1, "2");
f("1", 2);
f("1", "2");

f2(3, 4);
f2(3, "b");
f2("a", 4);
f2("a", "b");
