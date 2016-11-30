$(document).ready(function(){
	var handler = function(e) { e.preventDefault(); }
	$("#login_btn").click(function(){
		if($("#main").hasClass("hide")){
		$("#main").removeClass("hide");
		$("#main").addClass("show");
		}
	})
	$(".top_home").click(function(){
		if($("#main").hasClass("show")){
		$("#main").removeClass("show");
		$("#main").addClass("hide");
		}
	})
	/* dae-yeong  start */
	var Id = $(".bg-primary");
	var login_Div = $("#login input");
	login_Div.eq(1).addClass("bg-primary-1");
	var Pass = $(".bg-primary-1");
	var Login = $("#login_btn");
	var nowDate = new Date();
	var nowMonth = nowDate.getMonth()+1;
	var nowTime = $(".visit_time");
		Id.focus(function(){if(Id.val()=="아이디"){Id.val("");};})
		Id.blur(function(){if(Id.val()==""){Id.val("아이디")};});
		Pass.focus(function(){if(Pass.val()=="비밀번호"){Pass.val("");};});
		Pass.blur(function(){if(Pass.val()==""){Pass.val("비밀번호")};});
	Login.click(function(){
		if(Id.val()==""|| Id.val()=="아이디"){$('#main').removeClass("show");$('#main').addClass("hide");Id.focus();};
		if(Pass.val()==""||Pass.val()=="비밀번호"){$('#main').removeClass("show");$('#main').addClass("hide");Pass.focus();if(Id.val()==""|| Id.val()=="아이디"){$('#main').removeClass("show");$('#main').addClass("hide");Id.focus();};};
    if((Id.val()!=""&& Id.val()!="아이디")&&(Pass.val()!="" && Pass.val()!="비밀번호")){$("#login").removeClass("logshow");$("#login").addClass("loghide");}
	})

	nowTime.html(nowDate.getFullYear()+"년 "+nowMonth+"월 "+nowDate.getDate()+"일 "+nowDate.getHours()+"시 "+nowDate.getMinutes()+"분");

	//고정값 클릭하고 로그인시 쿠키 생성
	Login.click(function(){
		if(Id.val()!=""|| Id.val()!="아이디"){
			if($('input:checkbox:checked').val()=='on'){setCookie('id',Id.val(),30)}
		}
	});
	//고정값 클릭안하고 로그인시 쿠키 지움
	Login.click(function(){
		if(Id.val()!=""|| Id.val()!="아이디"){
			if($('input:checkbox:checked').val()==undefined){setCookie('id',Id.val(),0)}
		}
	});

	//쿠키 설정
	function setCookie(cname,cvalue,exdays){
		 var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    var expires = "expires=" + d.toGMTString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	//쿠키 확인
	$(function(){
		var id= getCookie('id');
		if(id!=""||id!=undefined){
			Id.val(id);
			Pass.focus();
			$("input:checkbox").prop("checked",true);
		}
		if(id==undefined){
			Id.focus();
			$("input:checkbox").prop("checked",false);
		}
	})

	//쿠키값 가져오기
	function getCookie(cName){
		cName = cName+"=";
		var cookieData = document.cookie;
		var start = cookieData.indexOf(cName);
		if(start != -1){
			start +=cName.length;
			var end = cookieData.length;
			var cValue = cookieData.substring(start,end);
			return cValue;
		}
	}

	//input box에 숫자만 적기
	var financeInput = $('#finance_box input');
  //
	// financeInput.keyup(function(event){
	// 	if(event.which==8){return;}
	// 	if((event.which < 48 || event.which > 57)&&(event.which < 100 || event.which > 106) ){
	// 		var num = $(this).val().length;
	// 		var str=$(this).val().substring(-1,num-1);
	// 		$(this).val(str);
	// 	}
	// });

	//inputbox  오류날경우 예외처리
		financeInput.blur(function(){
		var str = $(this).val();
		var stringinput="";
		var num = 1;
		for(var i=0;i<$(this).val().length;i++,num++){
			if(str[i]>=0 && str[i]<10){
				stringinput += str[i];
			};
		};
			$(this).val(stringinput);
		});

	//inputbox 마우스 벗어날시 콤마 처리
		financeInput.blur(function(){
			var str = fnComma($(this).val());
			$(this).val(str);
		});

	//천다위로 콤마 처리실행 함수
		function fnComma(param){
			if(param != null){
				var numStr = param.toString().trim();
				var reg = /(^[+-]?\d+)(\d{3})/;

				while(reg.test(numStr)){
					numStr = numStr.replace(reg,'$1,$2');
				}
				return numStr;
			}
		}

  //웹 실행시 보유재산 콤마 처리
  var com = financeInput.eq(0).val();
  var com = fnComma(com);
  financeInput.eq(0).val(com);

	//현금지출 버튼값 입력
  var cashSpending = $("#finance_box p").eq(3).find("button");

	 cashSpending.click(function(){
    var orginValue = $('#finance_box input').eq(2).val();
    var num=0;
    for(var i=0;i<orginValue.length;i++){
      if(orginValue[i]>=0 && orginValue[i] < 10){
        num+=orginValue[i];
      }
    }
    if($(this).html()=="100만원"){
      var value=Number(num)+1000000;
      $('#finance_box input').eq(2).val(fnComma(value));
    }

    else if($(this).html()=="50만원"){
      var value=Number(num)+500000;
      $('#finance_box input').eq(2).val(fnComma(value));
    }

    else if($(this).html()=="10만원"){
      var value=Number(num)+100000;
      $('#finance_box input').eq(2).val(fnComma(value));
    }

    else if($(this).html()=="5만원"){
      var value=Number(num)+50000;
      $('#finance_box input').eq(2).val(fnComma(value));
    }
    else{
      $('#finance_box input').eq(2).val("");
    }

  });

  //현금수입 버튼값 입력
  var cashIncome = $("#finance_box p").eq(6).find("button");
   cashIncome.click(function(){
    var orginValue = $('#finance_box input').eq(3).val();
    var num=0;
    for(var i=0;i<orginValue.length;i++){
      if(orginValue[i]>=0 && orginValue[i] < 10){
        num+=orginValue[i];
      }
    }
    if($(this).html()=="100만원"){
      var value=Number(num)+1000000;
      $('#finance_box input').eq(3).val(fnComma(value));
    }

    else if($(this).html()=="50만원"){
      var value=Number(num)+500000;
      $('#finance_box input').eq(3).val(fnComma(value));
    }

    else if($(this).html()=="10만원"){
      var value=Number(num)+100000;
      $('#finance_box input').eq(3).val(fnComma(value));
    }

    else if($(this).html()=="5만원"){
      var value=Number(num)+50000;
      $('#finance_box input').eq(3).val(fnComma(value));
    }
    else{
      $('#finance_box input').eq(3).val("");
    }

  });

  //신용카드 지출 버튼값 입력
  var creditSpending = $("#finance_box p").eq(9).find("button");
   creditSpending.click(function(){
    var orginValue = $('#finance_box input').eq(4).val();
    var num=0;
    for(var i=0;i<orginValue.length;i++){
      if(orginValue[i]>=0 && orginValue[i] < 10){
        num+=orginValue[i];
      }
    }
    if($(this).html()=="100만원"){
      var value=Number(num)+1000000;
      $('#finance_box input').eq(4).val(fnComma(value));
    }

    else if($(this).html()=="50만원"){
      var value=Number(num)+500000;
      $('#finance_box input').eq(4).val(fnComma(value));
    }

    else if($(this).html()=="10만원"){
      var value=Number(num)+100000;
      $('#finance_box input').eq(4).val(fnComma(value));
    }

    else if($(this).html()=="5만원"){
      var value=Number(num)+50000;
      $('#finance_box input').eq(4).val(fnComma(value));
    }
    else{
      $('#finance_box input').eq(4).val("");
    }
  });

  //투자금 지출 버튼값 입력
  var investMent = $("#finance_box p").eq(12).find("button");
   investMent.click(function(){
    var orginValue = $('#finance_box input').eq(5).val();
    var num=0;
    for(var i=0;i<orginValue.length;i++){
      if(orginValue[i]>=0 && orginValue[i] < 10){
        num+=orginValue[i];
      }
    }
    if($(this).html()=="100만원"){
      var value=Number(num)+1000000;
      $('#finance_box input').eq(5).val(fnComma(value));
    }

    else if($(this).html()=="50만원"){
      var value=Number(num)+500000;
      $('#finance_box input').eq(5).val(fnComma(value));
    }

    else if($(this).html()=="10만원"){
      var value=Number(num)+100000;
      $('#finance_box input').eq(5).val(fnComma(value));
    }

    else if($(this).html()=="5만원"){
      var value=Number(num)+50000;
      $('#finance_box input').eq(5).val(fnComma(value));
    }
    else{
      $('#finance_box input').eq(5).val("");
    }
  });

  //콤마 없애기 함수
  function notComma(x){
    var str="";
    for(var i=0;i<x.length;i++){
      if((x[i]>=0 && x[i] <10)||x[i]=='-'){
        str +=x[i];
      }
    }
    return str;
  }

  //inputbox 입력하고 벗어날시 덧셈,뺄셈
  financeInput.blur(function(){
    var value =  $('#finance_box input').eq(0).val();       //보유재산
    var FixedIncome = $('#finance_box input').eq(1).val();    //고정수입
    var cashSpending = $('#finance_box input').eq(2).val();  //현금지출
    var cashIncome =   $('#finance_box input').eq(3).val();    //현금수입
    var creditSpending = $('#finance_box input').eq(4).val();    //신용카드지출
    var investMent = $('#finance_box input').eq(5).val();     //투자금
    var result="";

    result=Number(notComma(FixedIncome))-Number(notComma(cashSpending))+Number(notComma(cashIncome))-Number(notComma(creditSpending))-Number(notComma(investMent));
     $('#finance_box input').eq(0).val(fnComma(result));
  });

  //버튼 클릭할시 덧셈,뺄셈
  $("#finance_box p").find("button").click(function(){
    var value =  $('#finance_box input').eq(0).val();       //보유재산
    var FixedIncome = $('#finance_box input').eq(1).val();    //고정수입
    var cashSpending = $('#finance_box input').eq(2).val();  //현금지출
    var cashIncome =   $('#finance_box input').eq(3).val();    //현금수입
    var creditSpending = $('#finance_box input').eq(4).val();    //신용카드지출
    var investMent = $('#finance_box input').eq(5).val();     //투자금
    var result="";

    result=Number(notComma(FixedIncome))-Number(notComma(cashSpending))+Number(notComma(cashIncome))-Number(notComma(creditSpending))-Number(notComma(investMent));
     $('#finance_box input').eq(0).val(fnComma(result));
  });

  //캔버스/그래프 영역
  $("#graph").css("background-color","white");
  $("#graph").html("<table id='ggg' style='width:80%;height:100%;margin:auto;'>");
	$("#ggg").append("<tr><td></td><td></td></tr>")
  $("#ggg").append("<tr><th>보유재산</th><th><canvas id='propertyminus' style='width:50%;height:20px;'></canvas><canvas id='property' style='width:50%;height:20px;'></canvas></th></tr><tr><td></td><td></td></tr>");
  $("#ggg").append("<tr><td>고정수입(월급)</td><td><canvas id='Fincome' style='width:100%;height:20px;'></canvas></td></tr><tr><td></td><td></td></tr><tr><td>현금지출</td><td><canvas id='Cspending' style='width:100%;height:20px;'></canvas></td></tr><tr><td></td><td></td></tr><tr><td>현금수입</td><td><canvas id='Cincome' style='width:100%;height:20px;'></canvas></td></tr>");
  $("#ggg").append("<tr><td></td><td></td></tr><tr><td>신용카드 지출</td><td><canvas id='Cardspending' style='width:100%;height:20px;'></canvas></td></tr><tr><td></td><td></td></tr><tr><td>투자금(지출)</td><td><canvas id='Investment' style='width:100%;height:20px;'></canvas></td></tr>")
  $("#ggg").append("</table>");
  $("#ggg td,th").css({"border":"0px solid black"});

	$("#ggg td:even").css("width","88px");
	$("#graph canvas").css({"font-family":"'돋움', sans-serif","height":"15px","border-radius":"1px","border-top":"1px solid silver","border-bottom":"1px solid #eee","background-color":"#e9e9e9"});
	$("#ggg td:odd").css({"text-align":"center","font-size":"3px"});
	$("#ggg tr:even td:eq(1)").append("<div style='display:inline-block;text-align:left;font-size:3px;width:14.2%;height:100%;'>-3000</div>");
	$("#ggg tr:even td:eq(1)").append("<div style='display:inline-block;text-align:left;font-size:3px;width:14.2%;height:100%;'>-2000</div>");
	$("#ggg tr:even td:eq(1)").append("<div style='display:inline-block;text-align:center;font-size:3px;width:14.2%;height:100%;'>-850</div>");
	$("#ggg tr:even td:eq(1)").append("<div style='display:inline-block;text-align:center;font-size:3px;width:14.2%;height:100%;'>0</div>");
	$("#ggg tr:even td:eq(1)").append("<div style='display:inline-block;text-align:center;font-size:3px;width:14.2%;height:100%;'>850</div>");
	$("#ggg tr:even td:eq(1)").append("<div style='display:inline-block;text-align:right;font-size:3px;width:14.2%;height:100%;'>2000</div>");
	$("#ggg tr:even td:eq(1)").append("<div style='display:inline-block;text-align:right;font-size:3px;width:14.2%;height:100%;'>3000</div>");
	$("#ggg tr:even:gt(0) td:odd").append("<div style='display:inline-block;text-align:left;font-size:3px;width:33.33%;height:100%;'>0</div>");			//표시
	$("#ggg tr:even:gt(0) td:odd").append("<div style='display:inline-block;text-align:center;font-size:3px;width:33.33%;height:100%;'>1500</div>");
	$("#ggg tr:even:gt(0) td:odd").append("<div style='display:inline-block;text-align:right;font-size:3px;width:33.33%;height:100%;'>3000</div>");
	$("#ggg font").css({"font-size":"4px"})

  //포커스 아웃시 그리기
  financeInput.blur(function(){

    //보유재산 마이너스 일때
    var propertyminus = document.getElementById('propertyminus');
    var propertyminusValue = parseInt(notComma($('#finance_box input').eq(0).val())/100000);
      //alert(propertyminusValue);
    var propertyminus = propertyminus.getContext("2d");
    var grdminus = propertyminus.createLinearGradient(0,0,200,0);
    grdminus.addColorStop(0,"DeepSkyBlue");              //그래프 색깔 입히기
    propertyminus.clearRect(0, 0, 1000, 1000);
    propertyminus.fillStyle = grdminus;
    propertyminus.fillRect(300,10,propertyminusValue,1000);

    //보유재산 플러스 일때
    var property = document.getElementById('property');
    var propertyValue = parseInt(notComma($('#finance_box input').eq(0).val())/100000);
    var property = property.getContext("2d");
    var grdplus = property.createLinearGradient(0,0,200,0);
    grdplus.addColorStop(0,"gold");              //그래프 색깔 입히기
    property.clearRect(0, 0, 800, 600);
    property.fillStyle = grdplus;
    property.fillRect(0,10,propertyValue,1000);


    //고정수입그리기
    var fincome = document.getElementById('Fincome');
    var fincomeValue = Number(notComma($('#finance_box input').eq(1).val()))/100000;
    var fincome = fincome.getContext("2d");
    var grd = fincome.createLinearGradient(10,10,200,0);
    grd.addColorStop(0,"gold");              //그래프 색깔 입히기
    fincome.clearRect(0, 0, 800, 600);
    fincome.fillStyle = grd;
    fincome.fillRect(0,10,fincomeValue,1000);

    //현금지출그리기
    var cspending = document.getElementById('Cspending');
    var cspendingValue = Number(notComma($('#finance_box input').eq(2).val()))/100000;
    var cspending = cspending.getContext("2d");
    var grd1 = cspending.createLinearGradient(10,10,200,0);
    grd1.addColorStop(0,"DeepSkyBlue");             //그래프 색깔 입히기
   cspending.clearRect(0, 0, 800, 600);
   cspending.fillStyle = grd1;
   cspending.fillRect(0,10,cspendingValue,1000);

   //현금수입그리기
   var cincome = document.getElementById('Cincome');
   var cincomeValue = Number(notComma($('#finance_box input').eq(3).val()))/100000;
   var cincome = cincome.getContext("2d");
   var grd2 = cincome.createLinearGradient(10,10,200,0);
   grd2.addColorStop(0,"gold");              //그래프 색깔 입히기
  cincome.clearRect(0, 0, 800, 600);
  cincome.fillStyle = grd2;
  cincome.fillRect(0,10,cincomeValue,1000);

  //신용카드지출그리기
  var cardspending = document.getElementById('Cardspending');
  var cardspendingValue = Number(notComma($('#finance_box input').eq(4).val()))/100000;
  var cardspending = cardspending.getContext("2d");
  var grd3 = cardspending.createLinearGradient(10,10,200,0);
  grd3.addColorStop(0,"DeepSkyBlue");             //그래프 색깔 입히기
 cardspending.clearRect(0, 0, 800, 600);
 cardspending.fillStyle = grd3;
 cardspending.fillRect(0,10,cardspendingValue,1000);

 //투자금그리기
 var investment = document.getElementById('Investment');
 var investmentValue = Number(notComma($('#finance_box input').eq(5).val()))/100000;
 var investment = investment.getContext("2d");
 var grd4 = investment.createLinearGradient(10,10,200,0);
 grd4.addColorStop(0,"DeepSkyBlue");             //그래프 색깔 입히기
investment.clearRect(0, 0, 800, 600);
investment.fillStyle = grd4;
investment.fillRect(0,10,investmentValue,1000);


  });

  //버튼 클릭할시 그래프 그리기
  $("#finance_box p").find("button").click(function(){
    //보유재산그리기

    //보유재산 마이너스 일때
    var propertyminus = document.getElementById('propertyminus');
    var propertyminusValue = parseInt(notComma($('#finance_box input').eq(0).val())/100000);
      //alert(propertyminusValue);
    var propertyminus = propertyminus.getContext("2d");
    var grdminus = propertyminus.createLinearGradient(0,0,200,0);
    grdminus.addColorStop(0,"DeepSkyBlue");              //그래프 색깔 입히기
    propertyminus.clearRect(0, 0, 1000, 1000);
    propertyminus.fillStyle = grdminus;
    propertyminus.fillRect(300,10,propertyminusValue,1000);

    //보유재산 플러스 일때
    var property = document.getElementById('property');
    var propertyValue = parseInt(notComma($('#finance_box input').eq(0).val())/100000);
    var property = property.getContext("2d");
    var grdplus = property.createLinearGradient(0,0,200,0);
    grdplus.addColorStop(0,"gold");              //그래프 색깔 입히기
    property.clearRect(0, 0, 800, 600);
    property.fillStyle = grdplus;
    property.fillRect(0,10,propertyValue,1000);


    //고정수입그리기
    var fincome = document.getElementById('Fincome');
    var fincomeValue = Number(notComma($('#finance_box input').eq(1).val()))/100000;
    var fincome = fincome.getContext("2d");
    var grd = fincome.createLinearGradient(10,10,200,0);
    grd.addColorStop(0,"gold");              //그래프 색깔 입히기
    fincome.clearRect(0, 0, 800, 600);
    fincome.fillStyle = grd;
    fincome.fillRect(0,10,fincomeValue,1000);

    //현금지출그리기
    var cspending = document.getElementById('Cspending');
    var cspendingValue = Number(notComma($('#finance_box input').eq(2).val()))/100000;
    var cspending = cspending.getContext("2d");
    var grd1 = cspending.createLinearGradient(10,10,200,0);
    grd1.addColorStop(0,"DeepSkyBlue");             //그래프 색깔 입히기
   cspending.clearRect(0, 0, 800, 600);
   cspending.fillStyle = grd1;
   cspending.fillRect(0,10,cspendingValue,1000);

   //현금수입그리기
   var cincome = document.getElementById('Cincome');
   var cincomeValue = Number(notComma($('#finance_box input').eq(3).val()))/100000;
   var cincome = cincome.getContext("2d");
   var grd2 = cincome.createLinearGradient(10,10,200,0);
   grd2.addColorStop(0,"gold");              //그래프 색깔 입히기
  cincome.clearRect(0, 0, 800, 600);
  cincome.fillStyle = grd2;
  cincome.fillRect(0,10,cincomeValue,1000);

  //신용카드지출그리기
  var cardspending = document.getElementById('Cardspending');
  var cardspendingValue = Number(notComma($('#finance_box input').eq(4).val()))/100000;
  var cardspending = cardspending.getContext("2d");
  var grd3 = cardspending.createLinearGradient(10,10,200,0);
  grd3.addColorStop(0,"DeepSkyBlue");             //그래프 색깔 입히기
 cardspending.clearRect(0, 0, 800, 600);
 cardspending.fillStyle = grd3;
 cardspending.fillRect(0,10,cardspendingValue,1000);

 //투자금그리기
 var investment = document.getElementById('Investment');
 var investmentValue = Number(notComma($('#finance_box input').eq(5).val()))/100000;
 var investment = investment.getContext("2d");
 var grd4 = investment.createLinearGradient(10,10,200,0);
 grd4.addColorStop(0,"DeepSkyBlue");             //그래프 색깔 입히기
investment.clearRect(0, 0, 800, 600);
investment.fillStyle = grd4;
investment.fillRect(0,10,investmentValue,1000);


  });


})
