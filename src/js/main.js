// 类宏定义
var ATOM = 0;
var LIST = 1;
var YES = 1;
var NO = 0;
var TRUE = 1;
var FALSE = 0;
var hobbyChar = '';          // 用于在DOM展示爱好的字符串
var storage = localStorage;  //存储
var isAdd = 0;
var currentPeople;
var mLinkList = new messageLinkList;    // 信息全局变量


// 个人信息存储结构
class People {
    constructor() {
        this.name = undefined;
        this.age = undefined;
        this.Id = undefined;
        this.birthday = null;
        // 存储爱好的广义表
        this.hobby = null;
    }
    // 生成爱好信息广义表
    // 创建信息
    creatPMessage(oname, age, Id, birthday, hobby) {
        this.name = oname;
        this.age = age;
        this.Id = Id;
        this.birthday = birthday;
        this.hobby = hobby;      // 存储爱好的广义表
    }
}
// 转化函数  将JSON对象转化为GLNode广义表的类实例
function toGLNode(p) {
    if (p != null) {
        p.__proto__.constructor = GLNode;
        p.__proto__ = GLNode.prototype;
    }
    if (p.ptr.hp) {
        toGLNode(p.ptr.hp);
    }

    if (p.ptr.tp) {
        toGLNode(p.ptr.tp);
    }
}

// 比较两个数组，返回他们的共同元素[数组]
function getArrEqual(arr1, arr2) {
    let newArr = [];
    for (let i = 0; i < arr2.length; i++) {
        for (let j = 0; j < arr1.length; j++) {
            if (arr1[j] === arr2[i]) {
                newArr.push(arr1[j]);
            }
        }
    }
    return newArr;
}
// 读取存储信息
function loadStorageData() {
    if (storage.mLinkList) {
        // console.log(storage.mLinkList);
        mLinkList = JSON.parse(storage.mLinkList);
        // console.log(mLinkList);
    } else {
        mLinkList = JSON.parse(JSON.stringify(baseData));
    }
    // 将JSON.parse() 对象转化为结构体（类）实例化对象
    mLinkList.__proto__.constructor = messageLinkList;
    mLinkList.__proto__ = messageLinkList.prototype;
    let p = mLinkList.head;
    while (p != null) {   // 将将JSON对象转化为 Node和People类实例
        p.__proto__.constructor = Node;
        p.__proto__ = Node.prototype;

        p.element.__proto__.constructor = People;
        p.element.__proto__ = People.prototype;

        toGLNode(p.element.hobby);
        p = p.next;
    }
}

// 入口函数
function Info() {
    loadStorageData();
}
Info();
