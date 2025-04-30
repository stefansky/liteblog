# 基础实现
- 数组
- 栈
- 队列
- 链表
- 树

# js实现数组
const arr = [1,2,3,4,5]
const arr = new Arrar(1,2,3,4,5);
new Arrar(5) //生成长度为5的数组
稀疏数组 [1,,3]

二维数组：
const matrix = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]
# js实现栈
栈的方法包括： push、pop、peek、isEmpty、size、clear、print
```
class Stack{
    constructor(){
        this.items = []
    }

    push(e){
        this.items.push(e)
    }

    pop(){
        if(this.isEmpty()){
            throw new Error("stack is empty")
        }
        return this.items.pop()
    }

    peek(){
        if(this.isEmpty()){ throw new Error("Stack is empty")}
        return this.items[this.items.length-1]
    }
    isEmpty(){
        return this.items.length ===0
    }
    size(){
        return this.items.length;
    }
    clear(){
        this.items = [];
    }

    print(){
        console.log(this.items.join(", "))
    }
}
```
如果不使用数组，可以使用手动管理对象和栈顶指针
```
class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }

  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Stack is empty');
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  clear() {
    this.items = {};
    this.count = 0;
  }

  print() {
    let result = '';
    for (let i = 0; i < this.count; i++) {
      result += this.items[i] + (i < this.count - 1 ? ', ' : '');
    }
    console.log(result);
  }
}
```

# js实现队列
队列：先进先出, 也是使用数组模拟，只是操作数组的push和shfit(从头拿出)
- enqueue 入队
- dequeue 出队
- front 查看对首元素
进阶版： 用对象模拟数组， this.item = {}  this.head = 0; this.tail = 0;
入队： this.items[this.tail] = element; this.tail++;
出队：const result = this.items[this.head];  delete this.items[this.head]; this.head++;return result;
队列大小： size() { return this.tail - this.head} 
isEmpty: return this.head === this.tail

# js实现链表
- 每一个节点Node有一个value和指向下一个节点的指针next,特点：不需要连续存储，删除和插入较为灵活
- 链表类型有：单向链表、双向链表、循环链表
```
class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor(){
        this.head = null; //头节点
        this.size = 0;    //链表长度
    }
    append(value){
        const newNode = new Node(value);
        if(!this.head){
            this.head = newNode;
        }else{
            let current = this.head;
            while(current.next){
                current = current.next
            }
            current.next = newNode;
        }
        this.size++;
    }
    insert(value,index){
        if(index<0 || index>this.size){
            throw new Error("index out of bounds");
        }
        const newNode = new Node(value);
        if(index===0){
            newNode.next = this.head
            this.head = newNode;
        }else{
            let current = this.head;
            let previous = null;
            let i =0;
            while(i<index){
                previous = current;
                current = current.next;
                i++;
            }
            newNode.next = current;
            previous.next = newNode;
        }
        this.size++;
    }

    // 移除指定位置的节点
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }

    let current = this.head;
    let previous = null;
    let i = 0;

    if (index === 0) {
      this.head = current.next;
    } else {
      while (i < index) {
        previous = current;
        current = current.next;
        i++;
      }
      previous.next = current.next;
    }
    this.size--;
    return current.value;
  }
    // 查找元素的索引
  indexOf(value) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  // 判断链表是否为空
  isEmpty() {
    return this.size === 0;
  }

  // 返回链表大小
  getSize() {
    return this.size;
  }

  // 打印链表内容
  print() {
    let current = this.head;
    let result = '';
    while (current) {
      result += current.value + (current.next ? ' -> ' : '');
      current = current.next;
    }
    console.log(result);
  }
}

```

## 双向链表
```
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // 向尾部添加
  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.size++;
  }

  // 在指定位置插入
  insert(value, index) {
    if (index < 0 || index > this.size) {
      throw new Error('Index out of bounds');
    }

    const newNode = new Node(value);

    if (index === 0) {
      // 插入头部
      if (!this.head) {
        this.head = this.tail = newNode;
      } else {
        newNode.next = this.head;
        this.head.prev = newNode;
        this.head = newNode;
      }
    } else if (index === this.size) {
      // 插入尾部（等同于 append）
      this.append(value);
      return;
    } else {
      // 插入中间
      let current = this.head;
      let i = 0;
      while (i < index) {
        current = current.next;
        i++;
      }
      const previous = current.prev;

      previous.next = newNode;
      newNode.prev = previous;
      newNode.next = current;
      current.prev = newNode;
    }

    this.size++;
  }

  // 删除指定位置的节点
  removeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }

    let current;

    if (index === 0) {
      current = this.head;
      this.head = current.next;
      if (this.head) this.head.prev = null;
      else this.tail = null;
    } else if (index === this.size - 1) {
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = null;
    } else {
      current = this.head;
      let i = 0;
      while (i < index) {
        current = current.next;
        i++;
      }
      const prev = current.prev;
      const next = current.next;
      prev.next = next;
      next.prev = prev;
    }

    this.size--;
    return current.value;
  }

  // 打印链表（正向）
  printForward() {
    let current = this.head;
    const result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    console.log('Forward:', result.join(' <-> '));
  }

  // 打印链表（反向）
  printBackward() {
    let current = this.tail;
    const result = [];
    while (current) {
      result.push(current.value);
      current = current.prev;
    }
    console.log('Backward:', result.join(' <-> '));
  }
}


```

## 循环链表

## js实现哈希表
```
class HashTable {
  constructor(size = 37) {
    this.table = new Array(size); // 固定大小的“桶”数组
  }

  // 简单的哈希函数：将字符串转为数字下标
  hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.table.length;
  }

  // 插入或更新键值对
  set(key, value) {
    const index = this.hash(key);

    if (!this.table[index]) {
      this.table[index] = []; // 初始化桶（处理冲突）
    }

    // 如果 key 已存在，更新 value
    for (const pair of this.table[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    // 否则插入新值
    this.table[index].push([key, value]);
  }

  // 获取值
  get(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (bucket) {
      for (const pair of bucket) {
        if (pair[0] === key) {
          return pair[1];
        }
      }
    }
    return undefined;
  }

  // 删除键值对
  remove(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    if (bucket) {
      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }

  // 打印整个哈希表
  print() {
    this.table.forEach((bucket, index) => {
      if (bucket) {
        console.log(index, bucket);
      }
    });
  }
}

```
# js实现tree
```
class TreeNode {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

```

```
class Tree {
  constructor(rootValue) {
    this.root = new TreeNode(rootValue);
  }

  // DFS 插入到指定节点下
  insert(parentValue, newValue) {
    const parentNode = this.find(this.root, parentValue);
    if (parentNode) {
      parentNode.children.push(new TreeNode(newValue));
    } else {
      console.log(`Parent node "${parentValue}" not found.`);
    }
  }

  // DFS 查找
  find(node, value) {
    if (node.value === value) return node;

    for (const child of node.children) {
      const found = this.find(child, value);
      if (found) return found;
    }
    return null;
  }

  // DFS 打印树
  print(node = this.root, prefix = '') {
    console.log(prefix + node.value);
    for (const child of node.children) {
      this.print(child, prefix + '  ');
    }
  }
}

```


