# Vue3 源码解析

## 响应式系统

### 响应式原理

```typescript
// 响应式核心实现
function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>
) {
  // 如果目标对象已经被代理，直接返回代理对象
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }

  // 创建代理对象
  const proxy = new Proxy(target, baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}

// 响应式处理器
const baseHandlers: ProxyHandler<any> = {
  get(target: Target, key: string | symbol, receiver: object) {
    // 收集依赖
    track(target, key);
    // 返回属性值
    return Reflect.get(target, key, receiver);
  },
  set(target: Target, key: string | symbol, value: any, receiver: object) {
    // 设置属性值
    const result = Reflect.set(target, key, value, receiver);
    // 触发更新
    trigger(target, key);
    return result;
  },
};
```

### 依赖收集

```typescript
// 依赖收集
function track(target: object, key: unknown) {
  if (!activeEffect) return;

  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }

  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }

  dep.add(activeEffect);
}

// 触发更新
function trigger(target: object, key: unknown) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => {
      effect();
    });
  }
}
```

## 编译系统

### 模板编译

```typescript
// 模板编译过程
function compile(template: string, options?: CompilerOptions): CompiledResult {
  // 1. 解析模板生成 AST
  const ast = parse(template, options);

  // 2. 转换 AST
  transform(ast, {
    nodeTransforms: [transformElement, transformText, transformExpression],
  });

  // 3. 生成代码
  const code = generate(ast, options);

  return {
    ast,
    code,
  };
}

// AST 节点类型
interface ASTNode {
  type: NodeTypes;
  tag?: string;
  props?: Array<ASTAttr>;
  children?: Array<ASTNode>;
  content?: string;
}
```

### 渲染函数生成

```typescript
// 生成渲染函数
function generate(ast: ASTNode, options: CompilerOptions): string {
  const context = createCodegenContext(ast, options);
  const { push } = context;

  // 生成导入语句
  push(`import { createElementVNode as _createElementVNode } from "vue"`);

  // 生成渲染函数
  push(`export function render(_ctx, _cache) {`);
  push(`  return `);
  genNode(ast, context);
  push(`}`);

  return context.code;
}
```

## 虚拟 DOM

### 虚拟 DOM 创建

```typescript
// 创建虚拟 DOM
function createVNode(
  type: VNodeTypes,
  props: VNodeProps | null = null,
  children: unknown = null,
  patchFlag: number = 0,
  dynamicProps: string[] | null = null,
  isBlockNode = false
): VNode {
  const vnode: VNode = {
    type,
    props,
    children,
    patchFlag,
    dynamicProps,
    isBlockNode,
    el: null,
    key: props?.key,
    shapeFlag: getShapeFlag(type),
  };

  // 规范化子节点
  if (children) {
    normalizeChildren(vnode, children);
  }

  return vnode;
}
```

### 虚拟 DOM 更新

```typescript
// 更新虚拟 DOM
function patch(
  n1: VNode | null,
  n2: VNode,
  container: RendererElement,
  anchor: RendererNode | null = null,
  parentComponent: ComponentInternalInstance | null = null
) {
  // 如果新旧节点类型不同，直接替换
  if (n1 && !isSameVNodeType(n1, n2)) {
    unmount(n1, parentComponent);
    n1 = null;
  }

  const { type, shapeFlag } = n2;

  // 根据节点类型进行不同的处理
  switch (type) {
    case Text:
      processText(n1, n2, container, anchor);
      break;
    case Comment:
      processCommentNode(n1, n2, container, anchor);
      break;
    case Fragment:
      processFragment(n1, n2, container, anchor);
      break;
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(n1, n2, container, anchor);
      } else if (shapeFlag & ShapeFlags.COMPONENT) {
        processComponent(n1, n2, container, anchor);
      }
  }
}
```

## 组件系统

### 组件初始化

```typescript
// 组件初始化
function setupComponent(instance: ComponentInternalInstance, isSSR = false) {
  // 初始化 props
  initProps(instance, instance.vnode.props);

  // 初始化 slots
  initSlots(instance, instance.vnode.children);

  // 执行 setup 函数
  const setupResult = setupStatefulComponent(instance, isSSR);

  return setupResult;
}

// 执行 setup 函数
function setupStatefulComponent(
  instance: ComponentInternalInstance,
  isSSR: boolean
) {
  const Component = instance.type;
  const { setup } = Component;

  if (setup) {
    // 创建 setup 上下文
    const setupContext = createSetupContext(instance);

    // 执行 setup 函数
    const setupResult = setup(instance.props, setupContext);

    // 处理 setup 返回值
    handleSetupResult(instance, setupResult);
  }
}
```

### 组件更新

```typescript
// 组件更新
function updateComponent(n1: VNode | null, n2: VNode, optimized: boolean) {
  const instance = (n2.component = n1.component);

  // 检查是否需要更新
  if (shouldUpdateComponent(n1, n2, optimized)) {
    // 更新组件
    instance.next = n2;
    instance.update();
  } else {
    // 不需要更新，直接复制属性
    n2.el = n1.el;
    instance.vnode = n2;
  }
}
```

## 性能优化

### 静态提升

```typescript
// 静态节点提升
function hoistStatic(root: RootNode, context: TransformContext) {
  walk(root, context, (node, context) => {
    if (node.type === NodeTypes.ELEMENT) {
      // 检查是否是静态节点
      if (isStaticNode(node)) {
        // 提升静态节点
        context.hoists.push(node);
        node.codegenNode = context.helper(CREATE_STATIC);
      }
    }
  });
}
```

### 事件缓存

```typescript
// 事件缓存
function cacheHandlers(node: ElementNode, context: TransformContext) {
  const { props } = node;
  if (props) {
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      if (prop.type === NodeTypes.DIRECTIVE && prop.name === "on") {
        // 缓存事件处理函数
        context.cachedHandlers.push(prop);
      }
    }
  }
}
```

## 最佳实践

1. 源码阅读建议

   - 从入口文件开始
   - 理解核心概念
   - 关注关键函数
   - 调试关键流程

2. 性能优化建议

   - 合理使用响应式
   - 避免不必要的渲染
   - 使用静态提升
   - 优化事件处理

3. 调试技巧

   - 使用 Vue Devtools
   - 添加调试日志
   - 断点调试
   - 性能分析

4. 贡献指南
   - 代码规范
   - 测试要求
   - 文档更新
   - 提交规范
