let Win = window.sessionStorage.getItem("win");
let Player = JSON.parse(window.sessionStorage.getItem("player"));
let Die = JSON.parse(window.sessionStorage.getItem("Die"));
let toDay = JSON.parse(window.sessionStorage.getItem("today"));
let Alive = JSON.parse(window.sessionStorage.getItem("alive"));
let KillerNumber = JSON.parse(window.sessionStorage.getItem("KillerNumber"));
$(".main-result-picture").text(Win);
$(".main-result-detailed").eq(1).text('杀手还有' + KillerNumber.length + '人 , 平民还有' + (Alive.length - KillerNumber.length) + '人');
console.log(toDay.length)

for (let i = 2; i < toDay.length; i++) {
    $(".main-log-box").first().clone().prependTo($('.package'))
}
//修改天数
for (let t = 1; t < toDay.length; t++) {
    $(".main-log-day").eq(t - 1).html("第" + t + "天");
}

if (Die.length !== 0) {
    for (let s = 0; s < Die.length; s++) {
        let t = Die[s]
        if ((s + 1) % 2 === 0) {
            $(".add").eq(s).html("白天:" + t + "号被大家投死，他的身份是" + Player[t - 1].name);
        } else {
            $(".add").eq(s).html("晚上:" + t + "号被杀手杀死，他的身份是" + Player[t - 1].name);
        }
    }
}


function Close() {
    let c = confirm("关闭本轮游戏回到主页？")
    if (c == true) {
        sessionStorage.clear();
        window.location.href = "1.html";
    }
}