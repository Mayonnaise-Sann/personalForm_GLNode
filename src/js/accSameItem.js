class accSame {
    constructor() {
        this.item = undefined;
        this.queue = [];
        this.count = 0;
    }
    creatm(item, queue) {
        this.item = item;
        this.queue.push(queue);
        // this.count = 0;
    }
}
let accSameBirth = [];
$('#accumulate').on('click', function () {
    mLinkList.ergodicLink(function (element) {

        if (accSameBirth.length == 0) {
            console.log("succ   ")
            let a = new accSame;
            accSameBirth.push(a.creatm(element.birthday, element.name));
            console.log(a);
        }
        // else
        //     for (let i = 0; i < accSameBirth.length; i++) {
        //         console.log("success")
        //         if (accSameBirth[i].item == element.birthday) {
        //             accSameBirth[i].queue.push(element.name)
        //             accSameBirth[i].count++;
        //         }
        //         else {
        //             accSameBirth.push(new accSame(element.birthday));
        //         }
        //     }
        console.log(element.birthday)
    })
    console.log(accSameBirth);
})