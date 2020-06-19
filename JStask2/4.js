//获取存储数据
let Player = JSON.parse(window.sessionStorage.getItem("all"));
//循环添加标签及标签样式
for (let i = 0; i < Player.length; i++) {
    //创建大盒子div
    $("main").append(`<div class="main-square-box"></div>`);
    //给大盒子内部添加身份p标签
    $(".main-square-box").eq(i).append('<p class="main-square-identity"></p>');
    //给身份p标签添加内容
    $(".main-square-identity").eq(i).html(Player[i]);
    //给大盒子添加玩家号数p标签
    $(".main-square-box").eq(i).append('<p class="main-square-number">p>');
    //给玩家号数p标签添加对应数字
    $(".main-square-number").eq(i).html((i + 1) + "号");
}
//跳转至游戏页面
function Jump() {
    let y = [];
    for (let x = 0; x < Player.length; x++) {
        if (Player[x] == "平 民") {
            y.push({ name: "平民", death: true })
        } else {
            y.push({ name: "杀手", death: true })
        }
    }
    sessionStorage.setItem("player", JSON.stringify(y));
    window.location.href = "5.html"
}
//关闭时弹窗询问是否关闭，确定则跳转并清空数据
function Close() {
    let c = confirm("关闭本轮游戏回到主页？")
    if (c == true) {
        sessionStorage.clear();
        window.location.href = "1.html";
    }
}
