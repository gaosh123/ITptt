//获取存储数据
let Player = JSON.parse(window.sessionStorage.getItem("player"));

//判断点击的数组
if (JSON.parse(window.sessionStorage.getItem("click"))) {
    x = JSON.parse(window.sessionStorage.getItem("click"));
} else {
    //创建一个空数组
    x = new Array();
}
//判断天数
if (JSON.parse(window.sessionStorage.getItem("today"))) {
    toDay = JSON.parse(window.sessionStorage.getItem("today"));
} else {
    //创建一个数组,并让长度为1
    toDay = [0];
}
//根据天数添加标签
for (let y = 1; y < toDay.length; y++) {
    if (y > 0) {
        $(".mainToDayBox").first().clone().prependTo($('main'))
        $(".mainOperate").eq(y - 1).hide();
    }
}
//修改天数
for (let t = 1; t <= toDay.length; t++) {
    $(".mainToDayNumber").eq(t - 1).html("第" + t + "天");
}
//第二天开始前一天操作隐藏

$(".mainOperate").eq(toDay.length - 1).show();
$(".mainToDayNumber").click(function () {
    $(this).siblings().toggle();
})


//console.log(toDay)
//判断背景色
if (JSON.parse(window.sessionStorage.getItem("diarycolor"))) {
    diaryColor = JSON.parse(window.sessionStorage.getItem("diarycolor"));
} else {
    //创建一个空数组
    diaryColor = new Array();
}
//激活背景色的变量
if (JSON.parse(window.sessionStorage.getItem("activation"))) {
    activation = JSON.parse(window.sessionStorage.getItem("activation"));
} else {
    activation = 0;
}
//设置激活for循环条件
if (activation == 1) {
    //使每次跳转都能保持颜色
    for (let i = 0; i < diaryColor.length; i++) {
        $(".mainButton").eq(i).css("background-color", "#83b09a");
        $(".mainTriangle").eq(i).css("border-right-color", "#83b09a");
    }
}
//死亡组
if (JSON.parse(window.sessionStorage.getItem("Die"))) {
    Die = JSON.parse(window.sessionStorage.getItem("Die"));
} else {
    //创建一个空数组
    Die = new Array();
}
console.log(Die)
//根据死亡组判断添加文本
if (Die.length !== 0) {
    for (let s = 0; s < Die.length; s++) {
        let t = Die[s]
        if ((s + 1) % 2 === 0) {
            $(".add").eq(s).after(`<p class="resultFontSize">` + t + "号被大家投死，他的身份是" + Player[t - 1].name + '</p>');
        } else {
            $(".add").eq(s).after(`<p class="resultFontSize">` + t + "号被杀手杀死，他的身份是" + Player[t - 1].name + '</p>');
        }
    }
}
//每次点击必做操作
function ButtonOperation() {
    //点击次数
    x.push(0);
    //背景色
    diaryColor.push(0);
}
function StorageJume() {
    sessionStorage.setItem("Die", JSON.stringify(Die));
    sessionStorage.setItem("activation", JSON.stringify(activation));
    sessionStorage.setItem("player", JSON.stringify(Player));
    sessionStorage.setItem("click", JSON.stringify(x));
    sessionStorage.setItem("diarycolor", JSON.stringify(diaryColor));
}
//杀人点击事件
$(".buttonBox").eq(toDay.length * 4 - 4).click(function () {
    if (x.length == 0) {
        $(".mainButton").eq(toDay.length * 4 - 4).addClass("buttonBackgroundColor");
        $(".mainTriangle").eq(toDay.length * 4 - 4).addClass("buttonBorderColor");
        alert("天黑了!人就要跪");
        activation = 1;
        ButtonOperation();
        StorageJume();
        window.location.href = "6.html";
    } else {
        alert("老哥按顺序来!");
    }
})
//console.log(x.length)
//亡者点击事件
$(".buttonBox").eq(toDay.length * 4 - 3).click(function () {
    if (x.length == 1) {
        $(".mainButton").eq(toDay.length * 4 - 3).addClass("buttonBackgroundColor");
        $(".mainTriangle").eq(toDay.length * 4 - 3).addClass("buttonBorderColor");
        ButtonOperation();
        StorageJume();
        alert("亡者快说话，不说滚");
    } else {
        alert("老哥按顺序来!");
    }
})
//发言点击事件
$(".buttonBox").eq(toDay.length * 4 - 2).click(function () {
    if (x.length == 2) {
        $(".mainButton").eq(toDay.length * 4 - 2).addClass("buttonBackgroundColor");
        $(".mainTriangle").eq(toDay.length * 4 - 2).addClass("buttonBorderColor");
        ButtonOperation();
        StorageJume()
        alert("顺序开始依次说话");
    } else {
        alert("老哥按顺序来!");
    }
})
//投票点击事件
$(".buttonBox").eq(toDay.length * 4 - 1).click(function () {
    if (x.length == 3) {
        $(".mainButton").eq(toDay.length * 4 - 1).addClass("buttonBackgroundColor");
        $(".mainTriangle").eq(toDay.length * 4 - 1).addClass("buttonBorderColor");
        sessionStorage.setItem("today", JSON.stringify(toDay));
        ButtonOperation();
        StorageJume()
        alert("速度投，开始下一轮");
        window.location.href = "6.html";
        //x.splice(0,x.length);
    } else {
        alert("老哥按顺序来!");
    }
})

if (JSON.parse(window.sessionStorage.getItem("journal"))) {
    Journal = JSON.parse(window.sessionStorage.getItem("journal"));
} else {
    //创建一个空数组
    Journal = new Array();
    sessionStorage.setItem("journal", JSON.stringify(Journal));
}
//查看日志
$(".footerLog").click(function () {
    StorageJume();
    Journal.push(0);
    sessionStorage.setItem("journal", JSON.stringify(Journal));
    window.location.href = "6.html";
})
//关闭时弹窗询问是否关闭，确定则跳转并清空数据
function Close() {
    let c = confirm("关闭本轮游戏回到主页？")
    if (c == true) {
        sessionStorage.clear();
        window.location.href = "1.html";
    }
}
// if(x.length == 0){
//     $(".mainButton").eq(x.length).css("background-color","#83b09a");
//     $(".mainTriangle").eq(x.length).css("border-right-color","#83b09a");
//     x.push(0);
//     console.log(x)
// }else if(x.length == 1){
//     $(".mainButton").eq(x.length).css("background-color","#83b09a");
//     $(".mainTriangle").eq(x.length).css("border-right-color","#83b09a");
//     x.push(0);
//     console.log(x)
// }else if(x.length == 2){
//     $(".mainButton").eq(x.length).css("background-color","#83b09a");
//     $(".mainTriangle").eq(x.length).css("border-right-color","#83b09a");
//     x.push(0);
//     console.log(x)
// }else if(x.length == 3){
//     $(".mainButton").eq(x.length).css("background-color","#83b09a");
//     $(".mainTriangle").eq(x.length).css("border-right-color","#83b09a");
// }else{
//     alert("请按顺序点击")
// }