var tearChar = '';
// 广义表存储结构 及其方法
class GLNode {
    constructor() {
        // 公共部分，用于区分原子结点和表结点
        this.tag = undefined;
        // atom是原子结点的值域
        this.atom = null;
        // ptr是表结点的指针域
        this.ptr = {
            // ptr.hp和ptr.tp分别指向表头和表尾
            hp: null,
            tp: null
        }
    }
    // 广义表的基本操作

    // 创建一个原子节点
    makeAtom(e) {
        var L = new GLNode();
        L.tag = 0;
        L.atom = e;
        return L;
    }

    // 创建一个表节点
    makeGL() {
        var L = new GLNode;
        L.tag = 1;
        L.ptr.hp = null;
        L.ptr.tp = null;
        return L;
    }
    // 在表头插入
    InsertHead(GL, head) {
        GL.ptr.hp = head;
        return GL.ptr.hp;
    }
    // 在表尾插入
    AppendTail(GL, tail) {
        var pp = new GLNode();
        for (pp = GL; pp.ptr.tp != null; pp = pp.ptr.tp);
        pp.ptr.tp = tail;
        return pp.ptr.tp;
    }
    // 遍历输出广义表原子

    ergodicGL() {
        if (this != null) {
            if (this.tag == ATOM) {
                hobbyChar += '（' + this.atom;
                tearChar += '）';
                // console.log(tearChar + this.atom);
            }
            else if (this.ptr.hp) {
                this.ptr.hp.ergodicGL()
            }

            if (this.ptr.tp) {
                if (this.ptr.tp.ptr.tp == null)
                    hobbyChar += '，';
                // else hobbyChar += '）））<br>';
                else {
                    hobbyChar += tearChar + '<br>';
                    tearChar = '';
                }

                this.ptr.tp.ergodicGL();
            }
        }
        return hobbyChar;    // 返回字符串 1型 （文学，（现代，（金色梦乡）））<br>（文学，（现代，（金色梦乡）））<br>
    }
    // // 采用头尾链表存储结构，由广义表的书写形式串创建广义表 ------ 爱好的子表
    createGList(string) {
        // var string = string.trim();
        var ch = '';
        var str = string.toString();
        var n = str.length;
        var i = 0;
        // 检查是否有括号
        if (str[0] == "（" || str[0] == "(") {
            //  脱去括弧
            str = str.substr(1, n - 2);
            this.tag = 1;
            this.InsertHead(this, this.makeGL());
            this.ptr.hp.createGList(str);
            return;
        }
        for (i = 0; (ch != '，' && ch != ',') && (i < n);) {
            ch = str[i++];
        }
        //最后一个原子
        if (i >= n) {
            this.InsertHead(this, this.makeAtom(str));
            this.AppendTail(this, null);
        } else {

            //除去逗号，表头插入原子节点
            this.InsertHead(this, this.makeAtom(str.slice(0, i - 1)))
            // 表尾
            var tp = this.makeGL();
            var hstr = str.slice(i, n);
            if (hstr) {
                // 把字符串的表尾递归生成广义表
                tp.createGList(hstr);
            }
            this.AppendTail(this, tp)
        }
    }
}