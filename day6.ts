// q3
type Foo1 = {
  a: number;
  b?: string;
  c: boolean;
};

// 测试
type Simplely<T> = {
  [P in keyof T]: T[P];
};

type SetOptional<T, K extends keyof T> = Simplely<
  { [X in keyof Omit<T, K>]: T[X] } & { [P in K]?: T[P] }
>;
type SetRequired<T, K extends keyof T> = Simplely<
  { [X in keyof Omit<T, K>]: T[X] } & { [P in K]-?: T[P] }
>;

// 测试用例
type SomeOptional = SetOptional<Foo, "a" | "b">;
type SomeRequired = SetRequired<Foo, "b" | "c">;
