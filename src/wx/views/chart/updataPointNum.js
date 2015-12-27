module.exports = function(self,api){//这个js的功能就是更新self.pointnum;
  var timetype = document.getElementsByClassName("selected")[0].getAttribute("data-name");//month
  var datatype = document.getElementsByClassName("selected")[1].getAttribute("data-name");//weight
  var startdate = document.getElementsByClassName("sed_datetext")[0].getAttribute("data-firstdate");//起始的日期
  var enddate = document.getElementsByClassName("sed_datetext")[0].getAttribute("data-lastdate");//最后的日期

  var getdata = {};//存放已经获得的数据
  var toshowobjs = [];

  var openid =  sessionStorage.getItem("openid")
  if(__DEBUG__){
    openid = "ozEANuNXaPyykVqp6gTm2PwO404g";

  }


  if(timetype=="week"){
    var postobj = {
      "end_date":enddate,
      "days":7,
      "avg":true
    }
    api.BluetoothScale.getDayData(postobj,openid).then(function (data) {
      if(__DEBUG__) {
        console.log(data);
      }
      getdata=data;
      toshowobjs=[7];
      for(var i=0;i<toshowobjs.length;i++){
        toshowobjs[i]={};
      }
      for(var i=0;i<getdata.count;i++){
        var d_day = (new Date(enddate)-new Date(getdata.statistic[i].date))/86400000;
        toshowobjs[6-d_day]=getdata.statistic[i];
      }



      self.pointnum = [];
      if(datatype == "weight"){
        for(var i=0;i<toshowobjs.length;i++){
          self.pointnum.push(toshowobjs[i].weight||0);
        }
      }else if(datatype == "bmi"){
        for(var i=0;i<toshowobjs.length;i++){
          self.pointnum.push(toshowobjs[i].bmi||0);
        }
      }else if(datatype == "fat"){
        for(var i=0;i<toshowobjs.length;i++){
          self.pointnum.push(toshowobjs[i].fat||0);
        }
      }
      self.updataSVG(self);
    });

    /******************调试用假数据 start******************

    self.pointnum = [1,2,1,1,6,5,7];
    self.updataSVG(self);

    ******************调试用假数据 end******************/

  }else if(timetype=="month"){
    var postobj = {
      "end_date":enddate,
      "days":30,
      "avg_days":5
    }
    api.BluetoothScale.getMonthData(postobj,openid).then(function (data) {
      if(__DEBUG__) {
        console.log(data);
      }

      getdata=data.statistic;
      //toshowobjs.length=postobj.days/postobj.avg_days;
      if(datatype == "weight"){
        for(var i=0;i<getdata.length;i++){
          toshowobjs.push(getdata[i].weight||0);
        }
        self.pointnum = toshowobjs;
      }else if(datatype == "bmi"){
        for(var i=0;i<getdata.length;i++){
          toshowobjs.push(getdata[i].bmi||0);
        }
        self.pointnum = toshowobjs;
      }else if(datatype == "fat"){
        for(var i=0;i<getdata.length;i++){
          toshowobjs.push(getdata[i].fat||0);
        }
        self.pointnum = toshowobjs;
      }


      self.updataSVG(self);


    });


    /******************调试用假数据 start***************

    self.pointnum = [1,2,1,1,6,5];
    self.updataSVG(self);

    ******************调试用假数据 end******************/

  }else if(timetype=="year"){
    var postobj = {
      "end-month":new Date(enddate).getFullYear()+"-"+(new Date(enddate).getMonth()+1),
      "months":12
    }
    api.BluetoothScale.getYearData(postobj,openid).then(function (data) {
      if(__DEBUG__) {
        console.log(data);
      }
      //getdata=data.statistic;
      //toshowobjs=[12];



      //self.updataSVG(self);//数据加载完成后更新svg曲线
    });

    /******************调试用假数据 start******************

    self.pointnum = [1,2,1,1,5,6,7,8,9,10,9,6];
    self.updataSVG(self);

    ******************调试用假数据 end******************/



  }


}

