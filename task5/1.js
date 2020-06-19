$("button").click(function () {
    var i = $("#name").val();
    console.log(i);
    var j = $("#password").val();
    console.log(j);
    $.post("/carrots-admin-ajax/a/login",{
            name: i,
            pwd: j,
            // url: "http://dev.admin.carrots.ptteng.com/carrots-admin-ajax/a/login"
        },
        function (data,status) {
            var data = eval("("+data+")");
            console.log(data);
            console.log(status);
            if (data.code === 0){
                window.location = " http://dev.admin.carrots.ptteng.com";
            }
            if (data.code === -5003 || data.code === -5004){
                $("#now").innerHTML = "message"
            }
        }
    )
});
// $(document).ready(function () {
//     $("button").click(function () {
//
//     })
// });