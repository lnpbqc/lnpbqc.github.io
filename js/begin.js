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
    // location.replace("404");
    alert('暂时没能力弄移动端，推荐PC端');
}
var time = new Date();
var hour = time.getHours();
console.log(hour);
if(23< hour && hour <4){
    alert("怎么还没睡啊，少年(女)？");
}else if(6<= hour && hour <11){
    alert("上午好!");
}else if(11<= hour && hour <= 13){
    alert("午好啊，吃了午饭没？");
}else if(13 < hour && hour <= 18){
    alert("下午好！");
}else {
    alert('晚上好，没事的话，早点睡吧。')
}
