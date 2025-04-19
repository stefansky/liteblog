# 设计模式种类

## 创建型模式 (5 种)

### 1. 单例模式 (Singleton)

- **作用**：确保一个类只有一个实例，并提供全局访问点
- **应用场景**：配置管理、数据库连接池、日志系统
- **示例代码**：
  ```javascript
  class Store {
    static instance;
    constructor() {
      if (!Store.instance) {
        Store.instance = this;
      }
      return Store.instance;
    }
  }
  ```

### 2. 工厂模式 (Factory)

- **作用**：创建对象而不指定具体类
- **应用场景**：UI 组件创建、数据库连接创建
- **示例代码**：
  ```javascript
  class ComponentFactory {
    create(type) {
      switch (type) {
        case "button":
          return new Button();
        case "input":
          return new Input();
        default:
          throw new Error("Unknown component type");
      }
    }
  }
  ```

### 3. 抽象工厂模式 (Abstract Factory)

- **作用**：创建相关或依赖对象的家族，而不指定具体类
- **应用场景**：跨平台 UI 组件、数据库访问层

### 4. 建造者模式 (Builder)

- **作用**：分步构建复杂对象
- **应用场景**：表单构建、查询构建
- **示例代码**：
  ```javascript
  class FormBuilder {
    constructor() {
      this.form = new Form();
    }
    addField(type, name) {
      this.form.addField(new Field(type, name));
      return this;
    }
    build() {
      return this.form;
    }
  }
  ```

### 5. 原型模式 (Prototype)

- **作用**：通过复制现有对象来创建新对象
- **应用场景**：对象克隆、缓存对象

## 结构型模式 (7 种)

### 1. 适配器模式 (Adapter)

- **作用**：使不兼容的接口能够一起工作
- **应用场景**：API 适配、日志系统
- **示例代码**：
  ```javascript
  class APIAdapter {
    constructor(oldAPI) {
      this.oldAPI = oldAPI;
    }
    fetch() {
      const data = this.oldAPI.request();
      return { result: data.data };
    }
  }
  ```

### 2. 桥接模式 (Bridge)

- **作用**：将抽象部分与实现部分分离，使它们可以独立变化
- **应用场景**：跨平台应用、数据库驱动

### 3. 组合模式 (Composite)

- **作用**：将对象组合成树形结构以表示"部分-整体"的层次结构
- **应用场景**：文件系统、UI 组件树

### 4. 装饰器模式 (Decorator)

- **作用**：动态添加功能
- **应用场景**：组件增强、中间件
- **示例代码**：
  ```javascript
  function withLoading(Component) {
    return function (props) {
      return (
        <div>
          {props.loading ? <Spinner /> : null}
          <Component {...props} />
        </div>
      );
    };
  }
  ```

### 5. 外观模式 (Facade)

- **作用**：为子系统中的一组接口提供一个统一的接口
- **应用场景**：API 封装、复杂系统简化

### 6. 享元模式 (Flyweight)

- **作用**：运用共享技术有效地支持大量细粒度的对象
- **应用场景**：文本编辑器、游戏开发

### 7. 代理模式 (Proxy)

- **作用**：控制对对象的访问
- **应用场景**：懒加载、缓存
- **示例代码**：
  ```javascript
  class ImageProxy {
    constructor(realImage) {
      this.realImage = realImage;
    }
    display() {
      if (this.isInViewport()) {
        this.realImage.display();
      }
    }
  }
  ```

## 行为型模式 (11 种)

### 1. 责任链模式 (Chain of Responsibility)

- **作用**：将请求的发送者和接收者解耦，使多个对象都有机会处理请求
- **应用场景**：事件处理、权限验证

### 2. 命令模式 (Command)

- **作用**：将请求封装为对象
- **应用场景**：撤销/重做、任务队列
- **示例代码**：
  ```javascript
  class Command {
    execute() {}
    undo() {}
  }
  class AddCommand extends Command {
    constructor(receiver, value) {
      super();
      this.receiver = receiver;
      this.value = value;
    }
    execute() {
      this.receiver.add(this.value);
    }
    undo() {
      this.receiver.remove(this.value);
    }
  }
  ```

### 3. 解释器模式 (Interpreter)

- **作用**：定义语言的文法，并解释该语言中的句子
- **应用场景**：正则表达式、SQL 解析

### 4. 迭代器模式 (Iterator)

- **作用**：提供一种方法顺序访问一个聚合对象中的各个元素
- **应用场景**：集合遍历、数据流处理

### 5. 中介者模式 (Mediator)

- **作用**：用一个中介对象来封装一系列的对象交互
- **应用场景**：聊天系统、事件总线

### 6. 备忘录模式 (Memento)

- **作用**：在不破坏封装性的前提下，捕获一个对象的内部状态
- **应用场景**：撤销操作、状态保存

### 7. 观察者模式 (Observer)

- **作用**：定义对象间的一对多依赖关系
- **应用场景**：事件系统、消息订阅
- **示例代码**：
  ```javascript
  class EventEmitter {
    constructor() {
      this.listeners = {};
    }
    on(event, callback) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
    }
    emit(event, data) {
      this.listeners[event]?.forEach((callback) => callback(data));
    }
  }
  ```

### 8. 状态模式 (State)

- **作用**：允许对象在内部状态改变时改变它的行为
- **应用场景**：工作流、游戏状态

### 9. 策略模式 (Strategy)

- **作用**：定义算法族，封装每个算法
- **应用场景**：表单验证、排序算法
- **示例代码**：
  ```javascript
  class ValidationStrategy {
    validate(value) {
      throw new Error("Method not implemented");
    }
  }
  class EmailStrategy extends ValidationStrategy {
    validate(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
  }
  ```

### 10. 模板方法模式 (Template Method)

- **作用**：定义一个操作中的算法骨架，将一些步骤延迟到子类中
- **应用场景**：框架设计、算法模板

### 11. 访问者模式 (Visitor)

- **作用**：表示一个作用于某对象结构中的各元素的操作
- **应用场景**：编译器、文档处理

## 设计模式在前端中的应用

1. 组件开发

   - 使用工厂模式创建组件
   - 使用装饰器模式增强组件功能
   - 使用观察者模式处理组件通信

2. 状态管理

   - 使用单例模式管理全局状态
   - 使用观察者模式实现响应式更新
   - 使用命令模式实现状态变更

3. 性能优化
   - 使用代理模式实现懒加载
   - 使用策略模式优化渲染策略
   - 使用装饰器模式实现缓存

## 设计模式在服务端中的应用

1. 架构设计

   - 使用工厂模式创建服务实例
   - 使用适配器模式整合不同系统
   - 使用装饰器模式实现中间件

2. 数据处理

   - 使用策略模式处理不同数据格式
   - 使用命令模式实现事务处理
   - 使用观察者模式实现事件驱动

3. 性能优化
   - 使用代理模式实现缓存
   - 使用装饰器模式实现限流
   - 使用策略模式优化算法选择

## 最佳实践

1. 模式选择

   - 根据具体需求选择合适的设计模式
   - 避免过度设计
   - 保持代码简洁

2. 实现原则

   - 遵循开闭原则
   - 保持单一职责
   - 实现依赖倒置

3. 注意事项
   - 考虑性能影响
   - 注意代码可维护性
   - 保持模式的一致性
