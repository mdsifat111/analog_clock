//select hour,minute,second hand by querySelector
const s_hand = document.querySelector(".second_hand")
const m_hand = document.querySelector(".minute_hand")
const h_hand = document.querySelector(".hour_hand")

const digital_hour_box=document.querySelector(".digital_hour_box");
const digital_minute_box=document.querySelector(".digital_minute_box");
const digital_second_box=document.querySelector(".digital_second_box");
const digital_millisecond_box=document.querySelector(".digital_millisecond_box");


var s_grid = document.querySelectorAll(".s_gd")

for (i = 0; i <= 28; i++) {
  var s_gd_rotate = ((i+1)*6)
  var rtn = "rotate("+s_gd_rotate+"deg)";
  s_grid[i].style.transform = rtn
}


//this code for print hour greed
var h_grid = document.querySelectorAll(".h_gd");
for (j = 0; j <= 5; j++) {
  var h_gd_rt = ((j+1)*30)-30
  var rtn = "rotate("+h_gd_rt+"deg)";
  h_grid[j].style.transform = rtn
}


//this two variable for adjust hour_hand first position and first transition length
var h_signal1 = false;
var h_signal2 = false;

//this two variable for adjust minute_hand first position and first transition length
var m_signal1 = false;
var m_signal2 = false;

//this function will handle hour_hand rotation based of that time
function hour_updator(hour, min, sec) {
  if (h_signal1 == true) {
    var h_degree = (hour*30)+30
    var rtn = "rotate("+h_degree+"deg)";
    h_hand.style.transform = rtn
    if (h_signal2 == true) {
      h_hand.style.transition = "3600s"
    } else {
      var h_trans = (60-min)*60
      h_hand.style.transition = h_trans+"s linear"
    }
  }
//calculate hour_hand transition length for first time based on passed minute and second
  else {
    var h_degree = (hour*30)+((min*6)/12)+(((sec*6)/12)/60)
    var rtn = "rotate("+h_degree+"deg)";
    h_hand.style.transform = rtn;
    h_signal1 = true;
  }
}

//this function will handle minute_hand rotation based of that time
function min_updator(min, sec) {
  //calculate m_hand transition length for first time dependent on passed second
  if (m_signal1 == false) {
    var m_degree = (min*6)+((sec*6)/60);
    var rtn = "rotate("+m_degree+"deg)";
    m_hand.style.transform = rtn;
    m_signal1 = true
  } else {
    m_degree = (min*6)+6
    var rtn = "rotate("+m_degree+"deg)";
    m_hand.style.transform = rtn;
    if (m_signal2 == false) {
      var m_trns = 60-sec
      m_hand.style.transition = m_trns+"s linear"
      m_signal2 = true;
    } else {
      m_hand.style.transition = "60s linear";
    }
  }
}

//this function will handle second_hand rotation based of that time
function sec_updator(sec) {
  var s_degree = sec*6
  var rtn = "rotate("+s_degree+"deg)";
  s_hand.style.transform = rtn
  if (sec == 0) {
    s_hand.style.transition = "0s"
  } else {
    s_hand.style.transition = "0.1s linear"
  }
}


/*this function will handle zero visuality before hour,minute,second,millisecond like 03:09:12:347*/
function time_visual(t_name,t_box){
  if(t_name<=9){
    t_box.innerHTML="0"+String(t_name)
  }else{
    t_box.innerHTML=t_name
  }
}

/*this function will update hour,minute and milliseconds on digital_clock_box dcb stand for digital clock box*/
function d_c_b_updator(h,m,s,ms){
  if(h>=13){
    var visual_h=h-12
  }else{
    visual_h=h
  }
  time_visual(visual_h,digital_hour_box)
  time_visual(m,digital_minute_box)
  time_visual(s,digital_second_box)
  time_visual(ms,digital_millisecond_box)
}


//this is parent function
function time_updator() {
  var hour = new Date().getHours()
  var minute = new Date().getMinutes()
  var second = new Date().getSeconds()
  var millisecond=new Date().getMilliseconds()
  sec_updator(second);
  min_updator(minute, second);
  hour_updator(hour, minute, second);
  d_c_b_updator(hour,minute,second,millisecond)
}

//first call for initialize all second minute and hour hand
time_updator()
//setInterval will call the time_updator function continuesly to update second minute and hour hand based on current time
setInterval(time_updator,4)