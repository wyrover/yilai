module.exports = function(self,api){//这个js的功能就是更新self.pointnum;
  var timetype = document.getElementsByClassName("selected")[0].getAttribute("data-name");//month
  var datatype = document.getElementsByClassName("selected")[1].getAttribute("data-name");//weight
  var startdate = document.getElementsByClassName("sed_datetext")[0].getAttribute("data-firstdate");//起始的日期
  var enddate = document.getElementsByClassName("sed_datetext")[0].getAttribute("data-lastdate");//最后的日期
  var getdata = {};//存放已经获得的数据
  var toshowobjs = [];
  var openid = sessionStorage.getItem("openid")||"543a121564654czx41c3zxcvzcz";//测试用的乱写的openid
  var issuccess = false;


  if(timetype=="week"){
    var postobj = {
      "openid":openid,
      "end_date":enddate,
      "days":7,
      "avg":true
    }
    api.BluetoothScale.getDayData(postobj).then(function (data) {
      if(__DEBUG__) {
        console.log(data);
        console.log(123);
      }
      getdata=data;
      toshowobjs=[7];
      for(var i=0;i<toshowobjs.length;i++){
        toshowobjs[i]={};
      }
      for(var i=0;i<getdata.count;i++){
        var d_day = (new Date(enddate)-new Date(getdata.statistic[i].date))/86400000;
        toshowobjs[7-d_day]=getdata.statistic[i];
      }
      console.log(toshowobjs)
      issuccess =  true;
      return issuccess;
    });

  }else if(timetype=="month"){

    var postobj = {
      "openid":openid,
      "end_date":enddate,
      "days":30,
      "avg_days":6
    }
    api.BluetoothScale.getMonthData(postobj).then(function (data) {
      if(__DEBUG__) {
        console.log(data);
      }
      getdata=data;
      toshowobjs=[6];
      for(var i=0;i<toshowobjs.length;i++){
        toshowobjs[i]={};
      }


      issuccess = true;
      return issuccess;
    });
  }else if(timetype=="year"){
    var postobj = {
      "openid":openid,
      "year":enddate.split("-")[0]
    }
    api.BluetoothScale.getYearData(postobj).then(function (data) {
      if(__DEBUG__) {
        console.log(data);
      }
      getdata=data;
      toshowobjs=[12];


      issuccess =  true;
      return issuccess;
    });
  }

}

