// confirm('本页面有音乐，请调低音量！！');
function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
    var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) >= 0) {
                flag = false;
                break;
            }
        }
    return flag;
}
var flag = IsPC(); //true为PC端，false为手机端
// console.log(flag);
if(flag != true){
    alert("WELCOME EVERYONE!");
    var fof = confirm("暂时由于各种原因，不支持移动端");
    if(fof == true){
       location.replace("404");
    }else{
       while(true){
            document.write('warning!!!!!!');
       }
    }
}
