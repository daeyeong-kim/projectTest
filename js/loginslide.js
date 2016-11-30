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
		if(id!=""){
			Id.val(id);
			Pass.focus();
			$("input:checkbox").prop("checked",true);
		}
		else{
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

	financeInput.keyup(function(event){
		if(event.which==8){return;}
		if((event.which < 48 || event.which > 57)&&(event.which < 96 || event.which > 106) ){
			var num = $(this).val().length;
			var str=$(this).val().substring(-1,num-1);
			$(this).val(str);
		}
	});

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
		})

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

	//


})
