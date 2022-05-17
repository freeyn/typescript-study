// q3
type Foo1 = {
  a: number;
  b?: string;
  c: boolean;
};

//测试
type SomeOptional = SetOptional<Foo, "a" | "b">;
type SetOptional<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]-?;T[P]
};
