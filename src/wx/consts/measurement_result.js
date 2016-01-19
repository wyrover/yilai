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
    console.log(toUseArr)

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
    //return toUseArr.length
    //return 111
  }
};