
var lyrics =
    "[00:31.020]我心动就在这一秒 你带我加速奔跑" +
    "[00:35.620]风声在耳边呼啸 是谁在尖叫" +
    "[00:41.710]跟我拼飞车你赢不了 这就是我较量的口号" +
    "[00:47.960]哦 下一秒 请你们看好" +
    "[00:53.920]We gonna rock you" +
    "[00:57.190]Coming days That would be like the summer" +
    "[00:59.460]I ll be free I'm working on drifting" +
    "[01:02.690]Happy days I will be the winner" +
    "[01:05.740]I'll be free 'cause I'm In the speed super cup" +
    "[01:21.040]我领先你百分一秒 这就是我的记号" +
    "[01:26.640]呐喊从耳边呼啸 是我在炫耀" +
    "[01:32.620]跟我拼飞车你赢不了 要紧跟我漂移的轨道" +
    "[01:39.120]哦 下一秒 就请你看好" +
    "[01:44.470]We gonna rock you" +
    "[01:47.380]Coming days That would be like the summer" +
    "[01:50.330]I ll be free I'm working on drifting" +
    "[01:53.580]Happy days I will be the winner" +
    "[01:57.520]I'll be free 'cause I'm In the speed super cup" +
    "[02:00.720]别错过飞车这场完美的较量" +
    "[02:06.530]你赢了终点我们就为你鼓掌" +
    "[02:12.710]管你懂不懂我就要开的漂亮" +
    "[02:19.890]Happy days I will be the winner" +
    "[02:23.490]Coming days That would be like the summer" +
    "[02:26.230]I ll be free I'm working on drifting" +
    "[02:27.520]Coming days That would be like the summer" +
    "[02:28.360]I ll be free I'm working on drifting" +
    "[02:29.380]Happy days I will be the winner" +
    "[02:30.810]Happy days I will be the winner" +
    "[02:32.740]I'll be free 'cause I'm In the speed super cup" +
    "[03:02.760]I'll be free 'cause I'm In the speed super cup";
var songs =[],
    time = [],
    min = [],
    sec = [],
    step = [],
    flag = true,
    timer = null,
    index = 0,
    height = 0,
    arr = lyrics.split("["),
    $ul = $("#lyc ul");
arr.splice(0,1);
for(var i=0;i<arr.length;i++){
    time.push(arr[i].split("]")[0]);
    songs.push(arr[i].split("]")[1]);
}
for(var i = 0,len = arr.length;i < len;i++){
    min.push(parseInt(time[i].split(":")[0]));
    sec.push(parseFloat(time[i].split(":")[1]));
}
for(var i = 1,len = arr.length;i < len;i++){
    step.push(min[i]*60 + sec[i]);
}
for(var i = 0,len = arr.length;i < len;i++){
    $ul.append($("<li>"+ songs[i] +"</li>"));
}
$("#play").click(function(){
    height = $("ul").height();
    if(flag){
        $ul.find($("li")).eq(index).addClass("on");
        $("#play").addClass("on");
        $("#audio").get(0).play();
        flag = !flag;
        timer = setInterval(function(){
            var currentTime =  $("#audio").get(0).currentTime;
            for (var i = 0,len = step.length;i < len;i++){
                if(step[i] <= currentTime){
                    continue;
                }else{
                    index = i || 0;
                    $ul.find($("li")).eq(index).addClass("on").siblings().removeClass("on");
                    $ul.css({
                        "marginTop" : -30 * index + 60 + "px"
                    });
                    break;
                }
            }

        },1000/30)
    }else{
        $("#audio").get(0).pause();
        $("#play").removeClass("on");
        clearInterval(timer);
        flag = !flag;
    }
})


var audio  = document.getElementById("audio");
var button = document.getElementById("play");
var currBar = document.getElementById("bar");
var totalBar = document.getElementById("bar_box");
var currTime = document.getElementById("curr-time");
var totalTime = document.getElementById("total-time");
var totalWidth = parseFloat(getStyle(totalBar,"width"));
var newWidth = 0;

audio.oncanplay = function(){
    totalTimeSetting();//歌曲总时长设置
}
setInterval(function(){
    currTimeSetting();//歌曲当前播放时间设置
    currBarSetting();//当前进度条长度设置
},30)

//        time progress bar setting
currTimeSetting = function(){
    currTime.innerHTML = toTime(audio.currentTime);
}

totalTimeSetting = function(){
    totalTime.innerHTML = toTime(audio.duration);
}
//        current bar length setting
currBarSetting = function(){
    var newWidth = totalWidth * audio.currentTime / audio.duration;
    currBar.style.width = newWidth +"px";
}

function toTime(num){
    var sec = toTen(Math.floor(num%60)),
        min = toTen(Math.floor(num/60));
    return min+":"+sec;
}
function toTen(n){
    return n<10?"0"+n:n;
}
function getStyle(obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj,null)[attr];
}
