# React 基础

## 核心概念

### JSX

```jsx
// JSX 语法
const element = <h1>Hello, {name}</h1>;

// 条件渲染
const element = <div>{isLoggedIn ? <UserGreeting /> : <GuestGreeting />}</div>;

// 列表渲染
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li key={number}>{number}</li>);
```

### 组件

```jsx
// 函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 类组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### Props

```jsx
// 传递 props
function App() {
  return <Welcome name="Sara" />;
}

// 默认 props
Welcome.defaultProps = {
  name: "Guest",
};

// Props 类型检查
import PropTypes from "prop-types";

Welcome.propTypes = {
  name: PropTypes.string.isRequired,
};
```

### State

```jsx
// 类组件中的 state
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

// 函数组件中的 state (Hooks)
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

## 生命周期

### 类组件生命周期

```jsx
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    // 组件挂载后执行
    console.log("Component mounted");
  }

  componentDidUpdate(prevProps, prevState) {
    // 组件更新后执行
    console.log("Component updated");
  }

  componentWillUnmount() {
    // 组件卸载前执行
    console.log("Component will unmount");
  }

  render() {
    return <div>Example</div>;
  }
}
```

### Hooks 生命周期

```jsx
function Example() {
  useEffect(() => {
    // 组件挂载和更新时执行
    console.log("Effect ran");

    // 清理函数
    return () => {
      console.log("Cleanup");
    };
  }, []); // 依赖数组为空，只在挂载时执行

  return <div>Example</div>;
}
```

## 事件处理

```jsx
function Button() {
  const handleClick = (event) => {
    console.log("Button clicked", event);
  };

  return <button onClick={handleClick}>Click me</button>;
}

// 传递参数
function Button() {
  const handleClick = (id) => {
    console.log("Button clicked", id);
  };

  return <button onClick={() => handleClick(1)}>Click me</button>;
}
```

## 表单处理

```jsx
// 受控组件
function Form() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

// 非受控组件
function Form() {
  const inputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## 条件渲染

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;

  // if 语句
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;

  // 三元运算符
  return <div>{isLoggedIn ? <UserGreeting /> : <GuestGreeting />}</div>;

  // 逻辑与运算符
  return <div>{isLoggedIn && <UserGreeting />}</div>;
}
```

## 列表和 Key

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
  ));

  return <ul>{listItems}</ul>;
}

// 使用 index 作为 key 的注意事项
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number, index) => (
    <li key={index}>{number}</li>
  ));

  return <ul>{listItems}</ul>;
}
```

## 组合 vs 继承

```jsx
// 组合
function App() {
  return (
    <div>
      <Header />
      <Sidebar />
      <Content />
    </div>
  );
}

// 包含关系
function FancyBorder(props) {
  return (
    <div className={"FancyBorder FancyBorder-" + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
}
```

## 最佳实践

1. 组件设计

   - 单一职责原则
   - 组件拆分粒度
   - Props 设计
   - 状态提升

2. 性能优化

   - 使用 React.memo
   - 使用 useMemo 和 useCallback
   - 避免不必要的渲染
   - 列表渲染使用 key

3. 代码组织
   - 文件结构
   - 命名规范
   - 注释规范
   - 代码复用
