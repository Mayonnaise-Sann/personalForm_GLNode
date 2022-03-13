
// 交互部分---------------------------------------------------------------------
//  1.添加信息 ---------------------------------------------------------------------star
// 1.1数据操作
function addMessage(message, string) {
    // 爱好--生成爱好的广义表GLN
    var GLN = new GLNode;
    GLN = GLN.makeGL();
    var pp = GLN;
    let i = 0;
    var arr = string.split('\n');
    var len = arr.length;
    do {
        var GL = new GLNode;
        GL.createGList(arr[i]);
        if (!pp.ptr.hp) {
            pp.InsertHead(pp, GL);
            pp.ptr.tp = new GLNode;
            pp = pp.ptr.tp;
        }
        i++;
    } while (i < len);
    // 个人信息
    var p1 = new People;
    p1.creatPMessage(message[0].value, message[1].value, message[2].value, message[3].value, GLN);
    return p1;
}
// 1.2页面DOM操作
var hobbyText = $('#hobbyText');
var message = $('#addMessage input');

var addBtn = $('#addBtn').on('click', function () {      //添加按钮
    isAdd = 1;
    $(".inputForm").slideToggle();
});
var cancelBtn = $("#cancelBtn").on('click', function () {  // 取消按钮
    isAdd = 0;
    // 清除表单数据
    for (i = 0; i < message.length; i++) {
        message[i].value = '';
    }
    hobbyText.val('');
    $(".inputForm").slideToggle();
})

// var formSub = $('#formSub').on('submit', function () {   // 提交按钮
//     if (isAdd) {                                         // 增加操作
//         // 验证身份证
//         mLinkList.ergodicLink(function (element) {
//             console.log(element.name);
//         });
//         alert(1);
//         // if (message[2].value) { };
//         var p = addMessage(message, hobbyText.val())
//         mLinkList.append(p);
//         storage.mLinkList = JSON.stringify(mLinkList);
//     } else {
//         modify();                                        // 修改操作
//     }
//     $(".inputForm").slideToggle();
//     isAdd = 0;
//     // 清除表单数据
//     for (i = 0; i < message.length; i++) {
//         message[i].value = '';
//     }
//     hobbyText.val('');
// })
var subBtn = $('#subBtn').on('click', function () {   // 提交按钮


    let quit = 0;
    if (isAdd) {

        let newID = message[2].value.toUpperCase();
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(newID))) {
            alert("该身份证格式有误！");
            return false;
        } else {
            mLinkList.ergodicLink(function (element) {
                if (message[2].value == element.Id) {
                    alert("该身份证已有信息记录!");
                    quit = 1;

                }
            });
            if (quit == 1) {
                quit = 0;
                return false;
            }
        }
    }
    $('#formSub').on('submit', function () {   // 提交成功
        if (isAdd) {                                         // 增加操作
            // 验证身份证

            var p = addMessage(message, hobbyText.val())
            mLinkList.append(p);
            storage.mLinkList = JSON.stringify(mLinkList);
        } else {
            modify();                                        // 修改操作
        }
        $(".inputForm").slideToggle();
        isAdd = 0;
        // 清除表单数据
        for (i = 0; i < message.length; i++) {
            message[i].value = '';
        }
        hobbyText.val('');
    })
});


// 添加信息 --------------------------------------------------------------------------------end


// 2.展示所有信息 ---------------------------------------------------------------------------star

// 对链表节点的遍历操作函数
// 遍历操作函数，生成一个爱好字符串
var displayTbody = $('#displayTbody');
function visit(ele) {
    hobbyChar += ele.hobby.ergodicGL();
    var addChar = `                   
    <tr>
    <td>${ele.name}</td>
    <td>${ele.age}</td>
    <td>${ele.Id}</td>
    <td>${ele.birthday}</td>
    <td>${hobbyChar.slice(0, hobbyChar.length - 6)}</td>
    <td class="mdBtn"><span class="modify"></span>|<span class="delect"></span></td>
    </tr>`;
    tearChar = ''; //右括号字符串清空
    displayTbody.append(addChar);   // 页面操作
    hobbyChar = '';
}
var displayTable = $('.displayTable');
var displayBtn = $('#displayAll').on('click', function () {
    clearALL();
    mLinkList.ergodicLink(visit);  // 遍历
})
// 2.展示所有信息 ---------------------------------------------------------------------------end


// 3.清除展示区---------------------------------------------------------------------------star
var clearBtn = $('#clear').on('click', clearALL);
function clearALL() {
    displayTbody.html('');
}


// 4.查询个人信息---------------------------------------------------------------------------star
var searchBtn = $('#search').on('click', function (e) {
    if ($(e.target).siblings("input").val()) {
        clearBtn.click();
        let p = search($(e.target).siblings("input").val());
        if (p)
            visit(p);
        else alert("查询不到此人！");
        $(e.target).siblings("input").val('');
    }
});
//  查询函数，返回这个节点Node的element，即People
function search(ID) {
    let index = mLinkList.indexOf(ID);
    let searchPeople = mLinkList.getElementAt(index)
    if (searchPeople)
        return searchPeople.element;
}



// // 5. 修改个人信息 和 6.删除信息 -----------------------------------------------------------------------star
displayTbody.on('click', 'span', function (e) {
    var currentID = $(e.target).parent().parent().children('td').eq(2).html();
    var index = mLinkList.indexOf(currentID);

    if (e.target.className == 'modify') {  // 修改
        $(".inputForm").slideToggle();
        let modiPeople = (mLinkList.getElementAt(index)).element;
        currentPeople = modiPeople;
        message[0].value = modiPeople.name;
        message[1].value = modiPeople.age;
        message[2].value = modiPeople.Id;
        message[3].value = modiPeople.birthday;
        hobbyText.val(modiPeople.hobby.ergodicGL().slice(0, hobbyChar.length - 2).replace(/\<br\>/g, '\n'));
        hobbyChar = '';
    }
    if (e.target.className == 'delect') {  // 删除
        if (confirm('您确定删除该信息吗？') == true) {
            mLinkList.removeAt(index);
            storage.mLinkList = JSON.stringify(mLinkList);
            clearBtn.click();
        }
    }
})
// 修改个人信息 和 6.删除信息 -----------------------------------------------------------------------end

function modify() {
    //////////////////////////////////////////////////////////////////////////////////

    var GLN = new GLNode;
    GLN = GLN.makeGL();
    var pp = GLN;
    let i = 0;
    var arr = hobbyText.val().split('\n');
    var len = arr.length;
    do {
        var GL = new GLNode;
        // console.log(arr[i]);
        GL.createGList(arr[i]);
        if (!pp.ptr.hp) {
            pp.InsertHead(pp, GL);
            pp.ptr.tp = new GLNode;
            pp = pp.ptr.tp;
        }
        i++;
    } while (i < len);
    //////////////////////////////////////////////////////////////////////////////////
    currentPeople.name = message[0].value;
    currentPeople.age = message[1].value;
    currentPeople.Id = message[2].value;
    currentPeople.birthday = message[3].value;
    currentPeople.hobby = GLN;
    storage.mLinkList = JSON.stringify(mLinkList);
    // clearBtn.click();
}


// 7.复制爱好----------------------------------------------------------------------star
var copyBtn = $('#copyBtn').on('click', copyHobby);
function copyHobby() {
    // console.log(message[4].value);
    let index = mLinkList.indexOf(message[4].value);
    if (index >= 0) {
        let copyPeopleHobby = (mLinkList.getElementAt(index)).element.hobby;
        // 返回字符串 2型----（文学，（现代，（金色梦乡）））\n（文学，（现代，（金色梦乡）））\n
        hobbyText.val(copyPeopleHobby.ergodicGL().slice(0, hobbyChar.length - 2).replace(/\<br\>/g, '\n'));
    }
    hobbyChar = ''; // 清除字符串的缓存
}


// 8. 比较爱好---------------------------------------------------------------------------star
var contrastBtn = $('#contrast').on('click', function () { //按钮
    $(".contrastForm").toggleClass('isDisplay');
})
var contrastFormArea = $('.contrastFormArea');
var btnArea = $('.btnArea').on('click', function (e) {
    // 确认按钮
    if (e.target.id == 'confirm') {
        formRestore();
        $(".contrastForm").toggleClass('isDisplay');
    }
    // 1.增加按钮
    if (e.target.id == 'addContrast') {
        addContrastPeople()
    }
    // 2.提交按钮
    if (e.target.id == 'contrastSub') {
        contrast();
    }
    // 3.取消按钮
    if (e.target.id == 'contrastCancel') {
        formRestore();

    }
})
// 增加比较的人
function addContrastPeople() {
    let c = `
    <div class="row">
    <div class="small-4 columns">
        <p class="notice">身份证号码 </p>
    </div>
    <div class="small-8 columns">
        <div class="form-group-material">
            <input class="material-field contrastText" type="text" placeholder="ID" />
        </div>
    </div>

</div>`
    contrastFormArea.append(c);
}
// 表单复原函数
function formRestore() {
    let c1 = `
                  <div class="small-12 columns logo">
                  <header class="form-header">
                      <h2><span>| 简记</span><small>请输入需要对比爱好的人的身份证号码</small></h2>
                  </header>
              </div>
                            <div class="row">
                                <div class="small-4 columns">
                                    <p class="notice">身份证号码 </p>
                                </div>
                                <div class="small-8 columns">
                                    <div class="form-group-material">
                                        <input class="material-field contrastText" type="text" placeholder="ID" />
                                    </div>
                                </div>

                            </div>
                            <div class="row">
                                <div class="small-4 columns">
                                    <p class="notice">身份证号码 </p>
                                </div>
                                <div class="small-8 columns">
                                    <div class="form-group-material">
                                        <input class="material-field contrastText" type="text" placeholder="ID" />
                                    </div>
                                </div>
                            </div>
        `;
    let c2 = `
                <button id="addContrast">ADD</button>
                <button id="contrastSub">submmit !</button>
                <button id="contrastCancel" class="toCancelBtn">Cancel</button>
        `
    //   出入表单复原
    contrastFormArea.html(c1);
    btnArea.html(c2);
    $(".contrastForm").toggleClass('isDisplay');
}
// var contrastSub = $('#contrastSub').on('click', contrast);
// 对比爱好的主函数
function contrast() {
    let contrastText = $('.contrastText');
    let arrHobby = [];
    let sameHobby = [];
    //i为下标
    //n为元素本身
    contrastText.each(function (i, n) {
        if ($(n).val()) {
            let p = search($(n).val());
            if (p) {
                let pHobby = p.hobby.ergodicGL().slice(0, hobbyChar.length - 2).replace(/\<br\>/g, '\n');
                // console.log(pHobby.split('\n').slice(0, -1));  // 将爱好字符串转为数组
                arrHobby.push(pHobby.split('\n').slice(0, -1));
                hobbyChar = '';
            } else {
                confirm("查询不到此人！");
                arrHobby = [];
            }
        }
    });
    if (arrHobby.length != 0) {
        if (arrHobby.length < 2) {
            alert("请至少输入两个人的身份证信息！");
        } else {
            sameHobby = arrHobby[0];
            // console.log(arrHobby);
            $(arrHobby).each(function (i, n) {
                sameHobby = getArrEqual(sameHobby, n);
            })
            let len = sameHobby.length;
            if (len <= 0) {
                contrastFormArea.html('他们没有共同的兴趣爱好！');
                btnArea.html(`<button id="confirm">CONFIRM</button>`);
            } else {
                let c1 = ''; c2 = '';
                for (let i = 0; i < len; i++) {
                    c1 += `<tr>
                    <td> ${sameHobby[i]}</td>
                </tr > `
                }
                c2 = `
                <header class="form-header">
                <h2>他们相同的爱好有：</h2>
            </header>
            <div class="row">
                <table>
                    <tbody class="sameHobbyDisplay">
                    ${c1}
                    </tbody>
                </table>
            </div>
                `
                contrastFormArea.html(c2);
                btnArea.html(`<button id="confirm">CONFIRM</button>`);
            }
        }
    }
}
//   比较爱好---------------------------------------------------------------------------end


