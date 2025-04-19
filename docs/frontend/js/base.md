# JS 基础

## 数据类型

### 基本类型

- `Number`: 数字
- `String`: 字符串
- `Boolean`: 布尔值
- `Null`: 空值
- `Undefined`: 未定义
- `Symbol`: 唯一标识符
- `BigInt`: 大整数

### 引用类型

- `Object`: 对象
- `Array`: 数组
- `Function`: 函数
- `Date`: 日期
- `RegExp`: 正则表达式

## 变量和常量

```javascript
// 变量声明
var name = "John"; // 函数作用域
let age = 25; // 块级作用域
const PI = 3.14; // 常量，不可重新赋值

// 变量提升
console.log(a); // undefined
var a = 1;
```

## 运算符

### 算术运算符

```javascript
let x = 10,
  y = 5;
console.log(x + y); // 15
console.log(x - y); // 5
console.log(x * y); // 50
console.log(x / y); // 2
console.log(x % y); // 0
```

### 比较运算符

```javascript
console.log(1 == "1"); // true (值相等)
console.log(1 === "1"); // false (值和类型都相等)
console.log(1 != "1"); // false
console.log(1 !== "1"); // true
```

### 逻辑运算符

```javascript
console.log(true && false); // false
console.log(true || false); // true
console.log(!true); // false
```

## 流程控制

### 条件语句

```javascript
// if-else
if (age >= 18) {
  console.log("成年人");
} else {
  console.log("未成年人");
}

// switch
switch (day) {
  case 1:
    console.log("周一");
    break;
  case 2:
    console.log("周二");
    break;
  default:
    console.log("其他");
}
```

### 循环语句

```javascript
// for 循环
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// while 循环
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// do-while 循环
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);
```

## 函数

### 函数声明

```javascript
// 函数声明
function greet(name) {
  return `Hello, ${name}!`;
}

// 函数表达式
const greet = function (name) {
  return `Hello, ${name}!`;
};

// 箭头函数
const greet = (name) => `Hello, ${name}!`;
```

### 函数参数

```javascript
// 默认参数
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

// 剩余参数
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
```

## 数组

### 数组操作

```javascript
const fruits = ["apple", "banana", "orange"];

// 访问元素
console.log(fruits[0]); // 'apple'

// 添加元素
fruits.push("grape"); // 末尾添加
fruits.unshift("pear"); // 开头添加

// 删除元素
fruits.pop(); // 删除末尾
fruits.shift(); // 删除开头

// 数组方法
fruits.forEach((fruit) => console.log(fruit));
const newFruits = fruits.map((fruit) => fruit.toUpperCase());
const filtered = fruits.filter((fruit) => fruit.length > 5);
```

## 对象

### 对象创建

```javascript
// 对象字面量
const person = {
  name: "John",
  age: 30,
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  },
};

// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const john = new Person("John", 30);
```

### 对象操作

```javascript
// 访问属性
console.log(person.name);
console.log(person["name"]);

// 添加属性
person.job = "developer";

// 删除属性
delete person.age;

// 遍历属性
for (let key in person) {
  console.log(key, person[key]);
}
```

## DOM 操作

### 选择元素

```javascript
// 选择单个元素
const element = document.getElementById("id");
const element = document.querySelector(".class");

// 选择多个元素
const elements = document.getElementsByClassName("class");
const elements = document.querySelectorAll(".class");
```

### 修改元素

```javascript
// 修改内容
element.textContent = "新内容";
element.innerHTML = "<strong>新内容</strong>";

// 修改样式
element.style.color = "red";
element.classList.add("active");
element.classList.remove("inactive");

// 修改属性
element.setAttribute("data-id", "123");
element.getAttribute("data-id");
```

### 事件处理

```javascript
// 添加事件监听
element.addEventListener("click", function (event) {
  console.log("点击了元素");
});

// 移除事件监听
function handleClick() {
  console.log("点击了元素");
}
element.addEventListener("click", handleClick);
element.removeEventListener("click", handleClick);
```

## 异步编程

### 回调函数

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("数据");
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});
```

### Promise

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("数据");
    }, 1000);
  });
}

fetchData()
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### async/await

```javascript
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```
