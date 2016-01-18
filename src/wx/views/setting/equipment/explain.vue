<template lang="jade">
  .main-content.helppage
    .help_box
      //-h2 使用帮助
      p.question
        |脂肪率
      p.answer
        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是指身体成分中，脂肪组织所占的比率。测量脂肪率比单纯的只测量体重更能反映我们身体的脂肪水平（肥胖程度）。<br>
      p.answer
        |建议：<br>
        |保持健康身材的最佳方法：坚持好的饮食方式和生活习惯。
        |当脂肪率达到肥胖程度，表明体内脂肪太多，建议检测血压、血糖、肝功能等情况，是否潜藏危害。一定要注意饮食控制、适量运动及改变不良生活方式。
        |若脂肪率偏低：则需要加强营养，合理作息。为了增重，最好以易消化、高蛋白、高热量食物为主，摄取优质营养达到增肥。<br>
      p.question
        |水分率
      p.answer
        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;身体水分占体重的百分比，此数据和肌肉量有着极其密切的关系，因为肌肉中含大量水分(大概占肌肉的70%），这项指标能够反应减重的方式是否正确，如果体水分率下降，不但有损健康，更会令体脂肪率上升。<br>
      p.answer
        |建议：
        |规律的饮食习惯和每天喝足8杯水可以维持正常体水分水平，充足的水分可以促进代谢。带走废物和身体毒素。避免暴饮暴食，适当运动，保持身体水分平衡。<br>
      p.question
        |骨量
      p.answer
        |单位体积内，骨组织[骨矿物质（钙、磷等）和骨基质（骨胶原、蛋白质、无机盐等等）]含量。<br>
        |（1）长期低钙饮食、缺乏运动、过度减肥等都可能引起骨量偏低，可多吃含钙的食物，多晒太阳，多运动及时补钙。<br>
        |（2）若骨量超过对应最大值：说明骨骼中包含的钙等无机盐的含量非常充分，但是注意防范肾结石、低血压的风险，尽量避免高钙摄入。<br>
        |（3）只要保证健康的饮食和适当的锻炼，就可以维持稳定健康的骨量水平。<br>
      p.question
        |肌肉率
      p.answer
        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;是根据人体肌肉总量和人体体重、身高等相结合得到的人体的一个比例值，这个值的范围决定一个人的身体健康状况以及力量的多少。加强各种运动，可增加肌肉比例。<br>
      p.question
        |内脏脂肪
      p.answer
        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;内脏脂肪是人体脂肪中的一种，与皮下脂肪（也就是我们平时所了解的身体上可以摸得到的“肥肉”） 不同，它围绕着人的脏器，主要存在于腹腔内。内脏脂肪对我们的健康意义重大。一定量的内脏脂肪其实是人体必需的，因为内脏脂肪围绕着人的脏器，对人的内脏起着支撑、稳定和保护的作用。<br>
      p.question
        |体内年龄
      p.answer
        |是根据体重、肌肉量、脂肪率，水分率等综合计算的
        |最理想的体内年龄是实际年龄*2/3，表明身体处于上佳状态。若测量数值比实际年龄大可能是肌肉率、水分率或者脂肪率/BMI不达标所致，测量会有一定的误差，不用太纠结，仅供参考，更重要的是保持身体健康，良好的生活方式。 <br>

      p.question
        |基础代谢量
      p.answer
        |基础代谢量：是指人体在生活非活动状态下，维持生命所需 必须消耗的能量。<br>

      p.question
        |BMI
      p.answer
        |BMI：是BMI指数（简称体质指数，英文为Body Mass Index，简称BMI），简单算法是用体重公斤数除以身高米数平方得出的数字，是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。
        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;主要用于统计用途，用来比较及分析一个人的体重对于不同高度的人所带来的健康影响。之前BMI值只是一个参考值，随着科技进步，要真正量度一个人是否肥胖，还需要利用微电力量度被测量者的阻抗，以推断脂肪厚度BMI只能作为评估个人体重和健康状况的多项标准之一。<br>


      p.question
        |注意：
      p.answer
        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;过量的饮酒、饮食、训练、医疗、女性月经周期等会影响测量结果。人体脂肪率、水份率和肌肉率测量在妇女怀孕期间会不准确（所以不建议孕妇使用）。
        |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有建议是基于BIA（人体生物阻抗测试）测量，各指标可作为良好生活习惯的指引，不作为医学上面的诊断，如需要在医学上的诊断请咨询专业的医生。<br>
      p.question
        |最后，祝您身体健康，家庭幸福，开心每一天！^_^

</template>
<style lang="stylus">
  @import '../../../../shared/assets/stylus/common'

  .helppage
    width 100%
    height 100%
    padding 10px 5px
    .help_box
      overflow auto
      h2
        font-size 18px
        text-align center
        padding 10px 0
      p
        font-size 16px
      p.question
        color #000
      p.answer
        font-size 15px
        color #353535

</style>
<script>
  //var wxauth = require('../../../assets/js/wxauth');

  module.exports = {
    data:function(){
      return {

      }
    },
    route:{
      data:function(){
        document.title = "使用帮助";

      }
    }

  };
</script>


