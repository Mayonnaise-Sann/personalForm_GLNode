
// 单向链表存储结构 及其方法
class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}
// 总表--所有信息的链式存储结构
class messageLinkList {
    constructor() {
        this.length = 0;
        this.head = null;
    }
    //   获取指定位置节点
    getElementAt(position) {
        if (position < 0 || position >= this.length) return null;
        let current = this.head;
        for (let i = 0; i < position; i++) {
            current = current.next;
        }
        return current;
    }
    // 尾部插入节点
    append(element) {
        let node = new Node(element);

        // 如果当前链表为空，则将head指向node
        if (this.head === null) this.head = node;
        else {
            // 否则，找到链表尾部的元素，然后添加新元素
            let current = this.getElementAt(this.length - 1);
            current.next = node;
        }
        this.length++;
    }
    // 删除指定位置的节点
    removeAt(position) {
        // position不能超出边界值
        if (position < 0 || position >= this.length) return null;
        let current = this.head;
        if (position === 0) this.head = current.next;
        else {
            let previous = this.getElementAt(position - 1);
            current = previous.next;
            previous.next = current.next;
        }
        this.length--;
        return current.element;
    }
    // 删除某元素节点
    remove() {
        let index = this.indexOf(Id);
        return this.removeAt(index);
    }
    // 获取某元素在链表中的位置（索引号）,返回这种节点----- 为方便本实验数据操作，对寻找的对象进行修改，使用对象的ID进行查询
    indexOf(Id) {
        let current = this.head;
        for (let i = 0; i < this.length; i++) {
            if (current.element.Id == Id) return i;
            current = current.next;
        }
        return -1;
    }

    // 遍历链表
    ergodicLink(visit) {
        if (this.head == null)
            return null;
        else {
            let current = this.head;
            for (let i = 0; i < this.length; i++) {
                visit(current.element);
                current = current.next;
            }
            return current;
        }

    }
}
