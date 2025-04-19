# React 高级

## Hooks

### 基础 Hooks

```jsx
// useState
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// useEffect
function Example() {
  useEffect(() => {
    // 副作用逻辑
    const subscription = subscribe();
    return () => {
      // 清理逻辑
      subscription.unsubscribe();
    };
  }, []); // 依赖数组
}

// useContext
const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div>{theme}</div>;
}
```

### 高级 Hooks

```jsx
// useReducer
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </>
  );
}

// useCallback
function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  return <Child onClick={handleClick} />;
}

// useMemo
function ExpensiveComponent({ a, b }) {
  const result = useMemo(() => {
    return expensiveCalculation(a, b);
  }, [a, b]);
  return <div>{result}</div>;
}
```

### 自定义 Hooks

```jsx
// 自定义 Hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount((c) => c - 1);
  }, []);

  return { count, increment, decrement };
}

// 使用自定义 Hook
function Counter() {
  const { count, increment, decrement } = useCounter();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

## 性能优化

### React.memo

```jsx
// 使用 React.memo 优化函数组件
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.value}</div>;
});

// 自定义比较函数
const MyComponent = React.memo(
  function MyComponent(props) {
    return <div>{props.value}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.value === nextProps.value;
  }
);
```

### useMemo 和 useCallback

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // 使用 useMemo 缓存计算结果
  const expensiveValue = useMemo(() => {
    return expensiveCalculation(count);
  }, [count]);

  // 使用 useCallback 缓存函数
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Expensive Value: {expensiveValue}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

### 虚拟化列表

```jsx
import { FixedSizeList } from "react-window";

function List() {
  return (
    <FixedSizeList height={400} width={300} itemCount={1000} itemSize={35}>
      {({ index, style }) => <div style={style}>Row {index}</div>}
    </FixedSizeList>
  );
}
```

## 高级模式

### 高阶组件

```jsx
// 高阶组件
function withSubscription(WrappedComponent, selectData) {
  return function (props) {
    const [data, setData] = useState(selectData(DataSource, props));

    useEffect(() => {
      const handleChange = () => {
        setData(selectData(DataSource, props));
      };

      DataSource.addChangeListener(handleChange);
      return () => {
        DataSource.removeChangeListener(handleChange);
      };
    }, [props]);

    return <WrappedComponent data={data} {...props} />;
  };
}

// 使用高阶组件
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);
```

### Render Props

```jsx
// Render Props 组件
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// 使用 Render Props
function App() {
  return (
    <Mouse
      render={({ x, y }) => (
        <h1>
          The mouse position is ({x}, {y})
        </h1>
      )}
    />
  );
}
```

### Context API

```jsx
// 创建 Context
const ThemeContext = React.createContext({
  theme: "light",
  toggleTheme: () => {},
});

// Provider 组件
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 使用 Context
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      style={{ backgroundColor: theme === "light" ? "#fff" : "#000" }}
    >
      Toggle Theme
    </button>
  );
}
```

## 错误边界

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// 使用错误边界
function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

## 最佳实践

1. 状态管理

   - 合理使用 Context
   - 状态提升
   - 使用 Redux 或 MobX

2. 性能优化

   - 使用 React.memo
   - 合理使用 useMemo 和 useCallback
   - 实现虚拟化列表
   - 使用 React.lazy 和 Suspense

3. 代码组织

   - 使用自定义 Hooks
   - 实现高阶组件
   - 使用 Render Props
   - 错误处理策略

4. 测试策略
   - 单元测试
   - 集成测试
   - 端到端测试
   - 测试工具选择
