//获取存储数据
let Player = JSON.parse(window.sessionStorage.getItem("player"));
let Click = JSON.parse(window.sessionStorage.getItem("click"));
let diaryColor = JSON.parse(window.sessionStorage.getItem("diarycolor"));
let activation = JSON.parse(window.sessionStorage.getItem("activation"));
let toDay = JSON.parse(window.sessionStorage.getItem("today"));
let Die = JSON.parse(window.sessionStorage.getItem("Die"));
let Journal = JSON.parse(window.sessionStorage.getItem("journal"));
console.log(Player);

//console.log(Click.length);
//循环添加标签及标签样式
for (let i = 0; i < Player.length; i++) {
    //创建大盒子div
    $("main").append(`<div class="main-square-box"></div>`);
    //给大盒子内部添加身份p标签
    $(".main-square-box").eq(i).append('<p class="main-square-identity"></p>');
    //给身份p标签添加内容
    $(".main-square-identity").eq(i).html(Player[i].name);
    //给大盒子添加玩家号数p标签
    $(".main-square-box").eq(i).append('<p class="main-square-number">p>');
    //给玩家号数p标签添加对应数字
    $(".main-square-number").eq(i).html((i + 1) + "号");
}
//根据点击次数修改样式
if (Journal.length !== 1) {
    if (Click == 0) {
        $(".header-nav-word").html("杀手开杀");
        $(".header-in-word").html("天黑请闭眼，杀手睁眼");
    } else {
        $(".header-nav-word").html("全民投票");
        $(".header-in-word").html("快投，赶下一场");
    }
} else {
    $(".header-nav-word").html("战况表");
    $(".header-in-word").html("死的就这些，赶快返回");
    $(".header-bottom-word").html(" ");
    $(".footer-choice-jump").html("返回");
    for (let l = 0; l < Player.length; l++) {
        $(".main-square-box").eq(l).addClass("disabled");
    }
}
//给亡者上色
for (let b = 0; b < Player.length; b++) {
    if (Player[b].death == false) {
        $(".main-square-identity").eq(b).css("background-color", "red");
    }
}
//此为为了方便存储数据用，跟下方按钮关联
let clickNumber;
//点击判断
$(".main-square-box").click(function () {
    //获取点击的数组下标
    let s = $(".main-square-box").index($(this));
    //关联下方按钮
    clickNumber = s;
    //重置样式
    for (let l = 0; l < Player.length; l++) {
        $(".main-square-identity").eq(l).removeClass("mainRed");
    }
    if (Journal.length !== 1) {
        //判断杀人或投票界面
        if ((Click.length - 1) == 0) {
            //判断是否是平民，是否存活
            if (Player[s].name == "平民" && Player[s].death == true) {
                $(".main-square-identity").eq(s).addClass("mainRed");
                //点击死人弹窗
            } else if (Player[s].death !== true) {
                alert("鞭尸人品减一")
                //杀人界面不能点击杀手
            } else {
                alert("兄弟自己人！");
            }
            //投票逻辑
        } else {
            if (Player[s].death == true) {
                $(".main-square-identity").eq(s).addClass("mainRed");
            } else {
                alert("鞭尸人品减一")
            }
        }
    } else {
        for (let l = 0; l < Player.length; l++) {
            $(".main-square-identity").eq(l).removeClass("mainRed");
        }
    }
})
//胜利及跳转
function Winjump() {
    let SurvivalNumber = Player.filter(function (item, index, array) {
        return (item.death == true)
    })
    //存活组里得杀手
    let KillerNumber = SurvivalNumber.filter(function (item, index, array) {
        return (item.name == "杀手")
    })
    //胜利条件
    if (KillerNumber.length == 0) {
        JumpStorage();
        let win = "平民胜利";
        sessionStorage.setItem("win", win);
        sessionStorage.setItem("alive", JSON.stringify(SurvivalNumber));
        sessionStorage.setItem("KillerNumber", JSON.stringify(KillerNumber));
        window.location.href = "7.html"
    } else if (KillerNumber.length >= (SurvivalNumber.length - KillerNumber.length)) {
        JumpStorage();
        let win = "杀手胜利";
        //如果杀人页面胜利则增加天数
        if ((Click.length - 1) == 0) {
            toDay.push(0);
            sessionStorage.setItem("today", JSON.stringify(toDay));
        }
        sessionStorage.setItem("win", win);
        sessionStorage.setItem("alive", JSON.stringify(SurvivalNumber));
        sessionStorage.setItem("KillerNumber", JSON.stringify(KillerNumber));
        window.location.href = "7.html"
    } else {
        window.location.href = "5.html"
    }
}
//底部按钮操作函数
function JumpOperation() {
    //修改存活状态
    Player[clickNumber].death = false;
    //给死亡组添加数据
    Die.push(clickNumber + 1);
}
//存储并跳转
function JumpStorage() {
    //存储需要的数据
    sessionStorage.setItem("Die", JSON.stringify(Die));
    sessionStorage.setItem("today", JSON.stringify(toDay));
    sessionStorage.setItem("activation", JSON.stringify(activation));
    sessionStorage.setItem("diarycolor", JSON.stringify(diaryColor));
    sessionStorage.setItem("click", JSON.stringify(Click))
    sessionStorage.setItem("player", JSON.stringify(Player))
}
//选中杀或投的后点击跳转
$(".footer-choice-jump").click(function () {
    if (Journal.length !== 1) {
        //判断第几次点击，第一次则附加必须选中平民才可
        if (clickNumber !== undefined && (Click.length - 1) == 0 && Player[clickNumber].name == "平民" && Player[clickNumber].death == true) {
            //关联按钮操作
            JumpOperation();
            //关联存储
            JumpStorage();
            //存活组
            Winjump();
            //投票页面
        } else if (clickNumber !== undefined && (Click.length - 1) == 3 && Player[clickNumber].death == true) {
            //增加天数
            toDay.push(0);
            //清空点击
            Click.splice(0, Click.length);
            JumpOperation();
            JumpStorage();
            Winjump();
        } else {
            alert("?还没选人你就点");
        }
    } else {
        if (Journal.length == 1) {
            JumpStorage();
            Journal.splice(0, Journal.length);
            sessionStorage.setItem("journal", JSON.stringify(Journal));
            window.location.href = "5.html";
        }
    }

})

//回到操作页
$(".header-top-box").click(function () {
    JumpStorage();
    window.location.href = "5.html"
})

//关闭时弹窗询问是否关闭，确定则跳转并清空数据
function Close() {
    let c = confirm("关闭本轮游戏回到主页？")
    if (c == true) {
        sessionStorage.clear();
        window.location.href = "1.html";
    }
}
