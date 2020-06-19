//获取人数
var textNumber = document.getElementById("TextNumber");
var rangeNumber = document.getElementById("RangeNumber");
//关联2个input并限制输入
textNumber.onchange = function () {
    if (textNumber.value >= 4 && textNumber.value <= 18) {
        rangeNumber.value = textNumber.value;
    }
    else {
        alert("玩家数应在4-18人");
    }
}
//关联2个input
rangeNumber.oninput = function () {
    textNumber.value = rangeNumber.value;
}
//关联加号按钮并限制
function BtnAdd() {
    rangeNumber.value++;
    if (textNumber.value >= 18) {
        alert("这么多人咋玩!");
    }
    else {
        textNumber.value = rangeNumber.value;
    }
}
//关联减号按钮并限制
function Btnsub() {
    rangeNumber.value--;
    if (textNumber.value <= 4) {
        alert("人这么少玩毛!");
    }
    else {
        textNumber.value = rangeNumber.value;
    }
}
var r = 0;
//分配身份
function PlayerRatio() {
    //总人数
    var peopleNumber = textNumber.value;
    //杀手
    var killerNumber = Math.floor(peopleNumber / 3);
    //平民
    var civilianNumber = peopleNumber - killerNumber;
    //消除重复点击产生的多余
    var Ullabel = document.getElementById("list");
    var Lilabel = document.getElementsByTagName("li");
    for (var o = Lilabel.length; o > 0; o--) {
        Ullabel.removeChild(Lilabel[0]);
    }
    if (peopleNumber < 4 || peopleNumber > 18) {
        alert("都弹窗提醒了还弄错人数？")
        r = 0
    } else {
        //添加杀手
        for (var i = 0; i < killerNumber; i++) {
            var List = document.getElementById("list");
            var Killer = document.createElement("li");
            var Text = document.createTextNode("   杀  手 1人");
            var Square = document.createElement("span");
            List.appendChild(Killer);
            Killer.appendChild(Square);
            Killer.appendChild(Text);
            Killer.className = 'killer';
            //console.log(i)
            //console.log(killerNumber)
        }
        //添加平民
        for (var l = 0; l < civilianNumber; l++) {
            var List = document.getElementById("list");
            var Civilian = document.createElement("li");
            var Text = document.createTextNode(" 平  民 1人");
            var Square = document.createElement("span");
            List.appendChild(Civilian);
            Civilian.appendChild(Square);
            Civilian.appendChild(Text);
            Civilian.className = 'civilian';
        }
        r = 1;
    }
}

function Start() {
    //总人数
    var peopleNumber = textNumber.value;
    //杀手
    var killerNumber = Math.floor(peopleNumber / 3);
    //平民
    var civilianNumber = peopleNumber - killerNumber;
    if (r == 0) {
        alert("不设置人数一发都来不了");
    }else {
        //创建空数组all
        var all = [];
        //将杀手加入数组
        for (var k = 0; k < killerNumber; k++) {
            all.push("杀 手");
        }
        //将平民加入数组
        for (var c = 0; c < civilianNumber; c++) {
            all.push("平 民");
        }
        //console.log(all)
        //洗牌，打乱数组
        for (var l = all.length - 1; l >= 0; l--) {
            var rand = Math.floor(Math.random() * (l + 1))
            var p = all[l];
            all[l] = all[rand];
            all[rand] = p;
        }
        sessionStorage.setItem("all", JSON.stringify(all));
        window.location.href = "3.html";
    }
}
//后退时弹窗询问是否后退，确定则跳转并清空数据
function BackOff() {
    let b = confirm("需要退回到主页面嘛")
    if (b == true) {
        sessionStorage.clear();
        window.location.href = "1.html";
    }
}