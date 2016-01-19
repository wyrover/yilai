module.exports = {
  fat:function(gender,age,value){
    var female = [
      [2.999,16,21,29.6,50],
      [2.999,16.4,22,30.4,50],
      [2.999,17,22.4,31.4,50],
      [2.999,17.6,23,32,50]
    ];
    var male = [
      [2.999,13,17.4,25.6,50],
      [2.999,13.6,18,26.4,50],
      [2.999,14,18.6,27,50],
      [2.999,14.4,19,28,50]
    ];
    var resultArr=["低","正常","高","非常高"];

    function selectArr(gender,age){
      if(gender=="female"){
        if(age-0>=6&&age-0<=15){
          return female[0]
        }else if(age<=30){
          return female[1]
        }else if(age<=60){
          return female[2]
        }else if(age>60){
          return female[3]
        }
      }else if(gender=="male"){
        if(age-0>=6&&age-0<=15){
          return male[0]
        }else if(age<=30){
          return male[1]
        }else if(age<=60){
          return male[2]
        }else if(age>60){
          return male[3]
        }
      }
    }
    var toUseArr=[];
    toUseArr = selectArr(gender,age-0);

    if(value>=3&&toUseArr.length==5){
      //return toUseArr.length
      for(var i=0;i<toUseArr.length;i++){
        if(value>toUseArr[i] && value<=(toUseArr[i+1]||toUseArr[toUseArr.length-1])){
          return resultArr[i];
        }
      }
    }else{
      return false;
    }
  },
  moisture:function(gender,age,value){
    var female = [
      [57,67],
      [47,57],
      [42,52],
      [37,47]
    ];
    var male = [
      [58,72],
      [53,67],
      [47,61],
      [42,56]

    ];
    var resultArr=["低","正常","高"];
    function selectArr(gender,age){
      if(gender=="female"){
        if(age-0>=10&&age-0<=15){
          return female[0]
        }else if(age<=30){
          return female[1]
        }else if(age<=60){
          return female[2]
        }else if(age<80){
          return female[3]
        }
      }else if(gender=="male"){
        if(age-0>=10&&age-0<=15){
          return male[0]
        }else if(age<=30){
          return male[1]
        }else if(age<=60){
          return male[2]
        }else if(age<80){
          return male[3]
        }
      }
    }
    var toUseArr=[];
    toUseArr = selectArr(gender,age-0);

    if(value>0&&toUseArr.length==2){
      //return toUseArr.length
      if(value<toUseArr[0]){
        return resultArr[0]
      }else if(value<toUseArr[1]){
        return resultArr[1]
      }else if(value>toUseArr[1]){
        return resultArr[2]
      }
    }else{
      return false;
    }
  },
  muscle:function(gender,age,value){
    var female = [
      [35,56],
      [35,58],
      [42,58],
      [40,56],
      [39,55],
      [35,51]
    ];
    var male = [
      [38,56],
      [43,64],
      [48,69],
      [46,62],
      [44,59],
      [41,58]

    ];
    var resultArr=["偏低","标准","偏高"];
    function selectArr(gender,age){
      if(gender=="female"){
        if(age-0>=20&&age-0<=30){
          return female[0]
        }else if(age<=40){
          return female[1]
        }else if(age<=50){
          return female[2]
        }else if(age<60){
          return female[3]
        }else if(age>60){
          return female[4]
        }
      }else if(gender=="male"){
        if(age>=20&&age<=30){
          return male[0]
        }else if(age<=40){
          return male[1]
        }else if(age<=50){
          return male[2]
        }else if(age<60){
          return male[3]
        }else if(age>60){
          return male[4]
        }
      }
    }
    var toUseArr=[];
    toUseArr = selectArr(gender,age-0);

    if(value>0&&toUseArr.length==2){
      //return toUseArr.length
      if(value<toUseArr[0]){
        return resultArr[0]
      }else if(value<toUseArr[1]){
        return resultArr[1]
      }else if(value>toUseArr[1]){
        return resultArr[2]
      }
    }else{
      return false;
    }
  },
};