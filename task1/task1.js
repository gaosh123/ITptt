
var z = document.getElementsByClassName('box');//选取
function colors() { //选取的rgb颜色
    var r = Math.floor(Math.random() * 256);//Math.random 去小数大于等于0.0且小于1.0产生一个0到1的随机数
    var g = Math.floor(Math.random() * 256);//) Math.floor 返回小于等于x的最大整数；
    var b = Math.floor(Math.random() * 256);//整体意思就是取整数
    var rgb = "rgb(" + r + "," + g + "," + b + ")";
    console.log(rgb);//输出
    return rgb;//返回
}
var time;
function changeColor() {
    time = setInterval(function () {
        for (var i = 0; i < z.length; i++) {
            z[i].style.backgroundColor = "#ffa500"; //每次获取随机颜色后恢复默认颜色
        }
        for (;a == b || b == c || c == a;) {//当abc有任意两个相等，就开始运行，直到没有相等。选择三个不相同的随机数
            var a = Math.floor(Math.random() * 9);
            var b = Math.floor(Math.random() * 9);
            var c = Math.floor(Math.random() * 9);
        }
        for (; one == two || two == three || three == one;) {//判断三个盒子背景颜色是否重复，并给随机的三个盒子赋值上随机背景颜色
            var one = z[a].style.backgroundColor = colors();
            var two = z[b].style.backgroundColor = colors();
            var three = z[c].style.backgroundColor = colors();
        }
    }, 1000);
    document.getElementById("start").disabled = true; //禁用开始按钮
    // document.getElementsByClassName("start").disabled = true; //禁用开始按钮
}

//设置重置
function end() {
    for (var l = 0; l < z.length; l++) {
        z[l].style.backgroundColor = "#ffa500"; //恢复默认颜色
    }
    clearInterval(time); //去除延时
    document.getElementById("start").disabled=false; //启用开始按钮
}