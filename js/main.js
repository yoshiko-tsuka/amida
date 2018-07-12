var pnum = 2;


function draw(num) {
  /* canvas要素のノードオブジェクト */
  var canvas = document.getElementById('canvassample');
  /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
  if ( ! canvas || ! canvas.getContext ) {
    return false;
  }
  /* 2Dコンテキスト */
  var ctx = canvas.getContext('2d');
  /* 四角を描く */
  ctx.clearRect(0,0,1000,500);
  $("#trace").empty();
  for (var i=1; i<=num; i++){
  
  $("#trace").append('<button type="button" class="btn btn-info trace" id="amida_trace' + i + '">' + i + '</button>');
  var xheight = 60*i;
  var namecl = "name" + i ;
  var resultcl = "result" + i;
  var nameval = $('#personName [name=' + namecl + ']').val();
  var resultval = $('#roll [name=' + resultcl + ']').val();
  ctx.font = "20px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(nameval, xheight, 90, 40);
  ctx.fillText(resultval, xheight, 420, 40);
  ctx.beginPath();
  ctx.strokeStyle = 'rgb(128, 128, 128)';
  ctx.lineWidth = 1;
  ctx.moveTo(xheight, 100);
  ctx.lineTo(xheight, 400);
  ctx.closePath();
  ctx.stroke();
    if (i > 1){
      var xheight_old = 60*(i-1);
      for (var j = 0; j < 8; j++){
        var yheight = 130 + 30*j;
        var idata = ctx.getImageData(xheight - 70, yheight, 1, 1);
        console.log(idata.data[3]);
        if(idata.data[3] == 0){
        if(Math.floor(Math.random()*11) > 5){
          ctx.beginPath();
          ctx.strokeStyle = 'rgb(128, 128, 128)';
          ctx.lineWidth = 1;
          ctx.moveTo(xheight, yheight);
          ctx.lineTo(xheight_old, yheight);
          ctx.closePath();
          ctx.stroke();
        }
        }
      }
    }
  }
}

function trace(num) {
  console.log(num);
  
  var canvas = document.getElementById('canvassample');
  var xheight = 60*num;
  var yheight = 100;
  var width = 60;
  var height = 30;
  var direction = 0;
 
  if ( ! canvas || ! canvas.getContext ) {
    return false;
  }
 
  var ctx = canvas.getContext('2d');
 
  ctx.beginPath();
  ctx.clearRect(xheight - 3,yheight,6,height - 1);
  ctx.strokeStyle = 'rgb(250, 60, 150)';
  ctx.lineWidth = 3;
  ctx.moveTo(xheight, yheight);
  ctx.lineTo(xheight, yheight + height);
  ctx.closePath();
  ctx.stroke();
  yheight = yheight + height;
  while( yheight < 400 ){
    direction = checkRL(direction, xheight, yheight);
    console.log(direction);
    if (direction == 0){
      ctx.beginPath();
      ctx.clearRect(xheight - 2,yheight,4,height);
      ctx.strokeStyle = 'rgb(250, 60, 150)';
      ctx.lineWidth = 3;
      ctx.moveTo(xheight, yheight);
      ctx.lineTo(xheight, yheight + height + 2);
      ctx.closePath();
      ctx.stroke();
      yheight = yheight + height;
    }else{
      ctx.beginPath();
      ctx.clearRect(xheight + direction*(-1), yheight - 1 , direction * (width + 2), 2);
      ctx.strokeStyle = 'rgb(250, 60, 150)';
      ctx.lineWidth = 3;
      ctx.moveTo(xheight, yheight);
      ctx.lineTo(xheight + direction * (width + 2), yheight);
      ctx.closePath();
      ctx.stroke();
      xheight = xheight + direction * width;
    }
  }
  
  setTimeout(function(){glaytrace(num)},1000);
}

function checkRL(dir, xposition, yposition){
  var RL = 1;
  if (dir != 0){
    RL = 0;
  }else {
    var canvas = document.getElementById('canvassample');
    var ctx = canvas.getContext('2d');
  
    var idataR = ctx.getImageData(xposition + 10, yposition, 1, 1);
    var idataL = ctx.getImageData(xposition - 10, yposition, 1, 1);
    if (idataR.data[3] != 0){
      RL = 1;
    }else if(idataL.data[3] != 0){
      RL = -1;
    }else{
     RL = 0;
    }
  }
  
  return RL;
}

function glaytrace(num){
  var canvas = document.getElementById('canvassample');
  var xheight = 60*num;
  var yheight = 100;
  var width = 60;
  var height = 30;
  var direction = 0;
 
  if ( ! canvas || ! canvas.getContext ) {
    return false;
  }
 
  var ctx = canvas.getContext('2d');
 
  ctx.beginPath();
  ctx.clearRect(xheight - 3,yheight,6,height +3);
  ctx.strokeStyle = 'rgb(128, 128, 128)';
  ctx.lineWidth = 1;
  ctx.moveTo(xheight, yheight);
  ctx.lineTo(xheight, yheight + height);
  ctx.closePath();
  ctx.stroke();
  yheight = yheight + height;
  while( yheight < 400 ){
    direction = checkRL(direction, xheight, yheight);
    console.log(direction);
    if (direction == 0){
      ctx.beginPath();
      ctx.clearRect(xheight - 3,yheight,6,height + 3);
      ctx.strokeStyle = 'rgb(128, 128, 128)';
      ctx.lineWidth = 1;
      ctx.moveTo(xheight, yheight);
      ctx.lineTo(xheight, yheight + height + 2);
      ctx.closePath();
      ctx.stroke();
      yheight = yheight + height;
    }else{
      ctx.beginPath();
      ctx.clearRect(xheight + direction*(-3), yheight - 3 , direction * (width + 5), 6);
      ctx.strokeStyle = 'rgb(128, 128, 128)';
      ctx.lineWidth = 1;
      ctx.moveTo(xheight, yheight);
      ctx.lineTo(xheight + direction * (width + 2), yheight);
      ctx.closePath();
      ctx.stroke();
      xheight = xheight + direction * width;
    }
  }

}

$(document).ready(function() {
  // ページロード時に実行する処理。DOM操作が絡む処理はここに入れる。

  // ログインフォームが送信されたらログインする
  $('[name=personNum]').change(function() {


    $("#personName .col-sm-2").remove();
    $("#roll .col-sm-2").remove();
    var personNum = $(this).val();
    for(var i=1; i<= personNum; i++ ){
      var appendcl = "col-sm-2 name" + i ;
      console.log(appendcl);
      $("#personName").append($('<div class="' + appendcl + '">')
      .append('<input type="text" class="form-control" name="name' + i + '" placeholder="' + i + '人目">'));
    }
    for(var i=1; i<= personNum; i++ ){
      var appendcl = "col-sm-2 num" + i ;
      console.log(appendcl);
      $("#roll").append($('<div class="' + appendcl + '">')
      .append('<input type="text" class="form-control" name="result' + i + '" placeholder="結果' + i + '">'));
    }
    var personNumOld = personNum;
    pnum = personNum;
    
    
      
  
    return false;
  });

  $("#amida_start").click(function() {
   draw(pnum);
    $(".trace").on('click', function() {
        var id = 1;
        console.log('trace');
        id = $(this).text();
        trace(id);
        return false;
    });

    console.log('text');
    return false;
  });

});

