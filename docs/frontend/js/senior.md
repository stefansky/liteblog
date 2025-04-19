# JS 高级

## 作用域和闭包

### 作用域

```javascript
// 全局作用域
var global = "global";

function outer() {
  // 函数作用域
  var outer = "outer";

  function inner() {
    // 块级作用域
    let inner = "inner";
    console.log(global); // 可以访问
    console.log(outer); // 可以访问
    console.log(inner); // 可以访问
  }

  inner();
}

outer();
```

### 闭包

```javascript
function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
```

## 原型和继承

### 原型链

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hello, I'm ${this.name}`);
};

const person = new Person("John");
person.sayHello(); // Hello, I'm John
```

### 继承

```javascript
// 原型链继承
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log(`${this.name} barks`);
};

const dog = new Dog("Buddy", "Golden Retriever");
dog.speak(); // Buddy makes a sound
dog.bark(); // Buddy barks
```

## this 指向

### this 绑定规则

```javascript
// 默认绑定
function sayName() {
  console.log(this.name);
}
sayName(); // undefined (非严格模式指向window)

// 隐式绑定
const person = {
  name: "John",
  sayName() {
    console.log(this.name);
  },
};
person.sayName(); // John

// 显式绑定
function sayName() {
  console.log(this.name);
}
const person = { name: "John" };
sayName.call(person); // John
sayName.apply(person); // John
const boundSayName = sayName.bind(person);
boundSayName(); // John

// new 绑定
function Person(name) {
  this.name = name;
}
const person = new Person("John");
console.log(person.name); // John
```

## 异步编程进阶

### Promise 进阶

```javascript
// Promise 链式调用
fetchData()
  .then((data) => processData(data))
  .then((result) => displayResult(result))
  .catch((error) => handleError(error))
  .finally(() => cleanup());

// Promise.all
Promise.all([fetchData1(), fetchData2(), fetchData3()])
  .then(([data1, data2, data3]) => {
    // 所有请求都成功
  })
  .catch((error) => {
    // 任一请求失败
  });

// Promise.race
Promise.race([fetchData1(), fetchData2()])
  .then((result) => {
    // 第一个完成的请求
  })
  .catch((error) => {
    // 第一个失败的请求
  });
```

### Generator 函数

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```

### async/await 进阶

```javascript
async function fetchData() {
  try {
    const [data1, data2] = await Promise.all([fetchData1(), fetchData2()]);
    return { data1, data2 };
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
```

## 设计模式

### 单例模式

```javascript
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();
console.log(instance1 === instance2); // true
```

### 观察者模式

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach((listener) => listener(...args));
    }
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((l) => l !== listener);
    }
  }
}
```

### 工厂模式

```javascript
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class ProductFactory {
  createProduct(type) {
    switch (type) {
      case "A":
        return new Product("Product A", 100);
      case "B":
        return new Product("Product B", 200);
      default:
        throw new Error("Invalid product type");
    }
  }
}
```

## 性能优化

### 内存管理

```javascript
// 避免内存泄漏
function createLeak() {
  const element = document.getElementById("element");
  element.addEventListener("click", function () {
    // 闭包引用导致内存泄漏
  });
}

// 正确做法
function createNoLeak() {
  const element = document.getElementById("element");
  function handleClick() {
    // 处理点击事件
  }
  element.addEventListener("click", handleClick);
  // 在不需要时移除事件监听
  return () => {
    element.removeEventListener("click", handleClick);
  };
}
```

### 性能优化技巧

```javascript
// 防抖
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 节流
function throttle(func, limit) {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

## 模块化

### CommonJS

```javascript
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// main.js
const { add } = require("./math");
console.log(add(1, 2)); // 3
```

### ES Modules

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

// main.js
import { add } from "./math.js";
console.log(add(1, 2)); // 3
```

## 错误处理

### 错误处理最佳实践

```javascript
try {
  // 可能出错的代码
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  // 处理错误
  console.error("Error:", error.message);
  // 可以选择重新抛出错误
  throw error;
} finally {
  // 清理代码
  cleanup();
}

// 自定义错误
class CustomError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = "CustomError";
  }
}

throw new CustomError("Something went wrong", "ERR_CUSTOM");
```
