//获取存储数据
var Player = JSON.parse(window.sessionStorage.getItem("all"));
//用于判断点击次数
var x = 0;
//用于下标
var y = 0;
//用于方便号码传递
var z = 2;
//点击事件函数
function btn() {
    //结束条件
    if(y < Player.length){
        //第一次点击
        if(x == 0){
            //隐藏翻牌图片
            $("#pictureOne").css("display","none");
            //判断杀手平民，并显示
            if(Player[y] == "平 民"){
                $("#picturecCivilian").css("display","block");
            }
            else{
                $("#picturecKiller").css("display","block");
            }
            //添加身份描述
            $("#identity").html(Player[y]);
            //更改按钮文字
            $("#footerText").html("隐藏并传递给" + z + "号");
            //为了每次抽取不同和结束条件y每次第一次点击都自增
            y++;
            //最后依次点击变更
            if(y == Player.length){
                $("#footerText").html("查看整体");
            }
            //使下次点击为第二次点击
            x = 1;
        }
        //第二次点击
        else{
            //判断平民还是杀手，并进行隐藏
            if(Player[y - 1] == "平 民"){
                $("#picturecCivilian").css("display","none");
            }
            else{
                $("#picturecKiller").css("display","none");
            }
            //清空标签的内容（杀手？平民？）
            $("#identity").html(" ");
            //更改按钮内容
            $("#footerText").html("看看" + z + "号是谁");
            //更改顶部数字
            $("#mainTopNumber").html(z);
            //显示翻牌样式
            $("#pictureOne").css("display","block");
            //增加每次点击显示的数字
            z++;
            //还原为第一次点击
            x = 0
        }
    }
    else{
        sessionStorage.setItem("all",JSON.stringify(Player));
        window.location.href = "4.html";
    }
}
//后退时弹窗询问是否后退，确定则跳转并清空数据
function BackOff() {
    let b = confirm("退回到上一页？");
    if(b == true){
        sessionStorage.clear();
        window.location.href = "2.html";
    }
}
//关闭时弹窗询问是否关闭，确定则跳转并清空数据
function Close() {
    let c = confirm("关闭本轮游戏回到主页？");
    if(c == true){
        sessionStorage.clear();
        window.location.href = "1.html";
    }
}