(function() {//170105
	/*
		1. 객체 생성함수를 정의
		2. 객체 생성
		3. 속성, 메서드 등록
	*/
	/*
	* @탭버튼 on off
	*
	*/
	function TabFnc(tabs, idx){//
		this.tabName = tabs;
		this.thisIdx = idx;
		this.thisTab = this.tabName + ":eq(" + this.thisIdx + ")";
		this.actImg =  $(this.thisTab).find(" h3:first img, h4:first img");
		this.bindEvent();
	}
	TabFnc.prototype.bindEvent = function(){
		$(document).on("click", this.thisTab + " h3 a," + this.thisTab + " h4 a", $.proxy(this.tabEventHandler, this));
	}
	TabFnc.prototype.tabEventHandler = function(e){
		e.preventDefault();
		var $myImg = $(e.target);
		console.log($myImg)
		var $myThis = $myImg.closest("a");
		var $myDiv = $myThis.parent().next();
		var $visibleDiv = $(this.thisTab + " div:visible");

		//보이는 div숨기기
		//클릭한 탭에 해당하는 div는 보여라
		if($myDiv.is(":hidden")){
			$visibleDiv.hide();
			$myDiv.show();
			var src_1 = this.actImg.attr("src").replace("_ov.gif",".gif");
			this.actImg.attr("src", src_1)

			var src_2 = $myImg.attr("src").replace(".gif","_ov.gif");
			$myImg.attr("src", src_2);
			this.actImg = $myImg;
		}
	}
	$(function(){
		var arrTab = [];
		var wrapTab = "div[data-type=tabmenu]"; //div>h3>a>img
		var wTab = $(wrapTab); // 참조 저장아님
		$.each(wTab, function(i,o){ //.each(function 익명함수(index 포문에서의 아이, element))
			arrTab[i] = new TabFnc(wrapTab, i);
		});
	});

	/*
	* @$.fn.playSlide: 반응형 bxSlide메서드
	* @opt {Opject} : bxSlider 옵션 값
	* ex) mobile:{
	*				mimSlides:2, 
	*				maxSlides:2,
	*				slideWidth:150
	*			},
	*			tablet:{
	*				mimSlides:3, 
	*				maxSlides:3,
	*				slideWidth:150
	*			},
	*			pc:{
	*				mimSlides:5, 
	*				maxSlides:5,
	*				slideWidth:150
	*			}
	* @설정 예시:
	*	$(function(){
			$("적용대상").playSlide({
				mobile:{	//변수에 대입하는 것 처럼 쓰면 된다.
					mimSlides:2, 
					maxSlides:2,
					slideWidth:150,
					easing:'ease-in',
					oneToOneTouch:true,
					pause:5000
	*			}//, 쓰고 또 쓰면 된다. 화이팅! 최선화! 재밌잖아 힘들지만 또 재밌잖아 ㅎㅎ
	*	});
	*
	*/
	$.fn.playSlide = function(opt){
		/***공통으로 들어갈 옵션***/
		var baseOption = {
			auto:true, //슬라이드 자동재생
			autoControls:true, //start stop
			controls:true, //이전보기 다음 보기
			pager:true,//슬라이드 페이지 번호
			speed:100, //in ms
			//pause:4000,
			autoHover:false,//마우스호버시 멈출지 말지
			mode:'horizontal',// 'vertical', 'fade'
			//easing:'ease-out',
			mimSlides:4, 
			maxSlides:5,
			slideWidth:100,
			slideMargin:0
		}
		var mobileOption = opt.mobile; //매개변수 속성 사용
		var tabletOption = opt.tablet;
		var pcOption = opt.pc;
		
		var k ;
		$(window).on("resize",function(){
			if($(window).width() > 780){
				k = $.extend(baseOption, opt.pc); 	
			}else if($(window).width() > 480){
				k = $.extend(baseOption, opt.tablet); //2개 이상 객체 합치기/ 동일한 내용은 첫번째 객체로 덮어써진다
			}else{
				k = $.extend(baseOption, opt.mobile);
			}
			//console.log(k);
		});
		$(window).resize();

		var slider = $(this).bxSlider(k);
		$(window).on("resize", function(){
			slider.reloadSlider(k);
			//slider.reloadSlider({ pause:1000});
		});
	}


	$.fn.gnb = function(opt){ //$fn이라고 써야 함.
		var th = $(this); //#gnb
		var activeA = null; //lnb가 보여진 th, 즉 #gnb
		var mouseOver = function(){ //마우스 오버의 대상은 a태그
			if(activeA){
				activeA.next().hide(); //lnb
				var repImg = $("img", activeA).attr("src").replace(opt.name2, opt.name1);//리플레이스 된 이미지가 저장됨
				
				$("img", activeA).attr("src", repImg);
			}
			var aOfGnb = $(this); //gnb>ul>li>a 
			// console.log(aOfGnb.next()); // lnb 즉 ul
			//console.log(aOfGnb);
			aOfGnb.next().show(); //lnb를 보여라
			var ovImg = $("img", aOfGnb).attr("src").replace(opt.name1, opt.name2);
			console.log(ovImg);
			$("img", aOfGnb).attr("src", ovImg)
			activeA = aOfGnb;//한번 더 옮겨 줘야 한다. 오류남
		}

		//$("ul ul", th).hide();//CSS에서 원래 먼저 숨겨줘야함

		$(">ul>li>a", th).on({ 
			//"mouseover focus":function(){// 아래와 같은 의미
			"mouseover focus": mouseOver //함수를 따로빼줌
		});

		//th.css({height:"47px"}); GNB의 하이트 값이 작으면 호버가 잘 안된다. 체크 할것.

		th.on({
			"mouseleave" : function(){
				if(activeA){
					activeA.next().hide();
					var repImg = $("img", activeA).attr("src").replace(opt.name2, opt.name1);
					 $("img", activeA).attr("src", repImg);
				}
			}	
		});
	}
	$(function(){
		$("#gnb").gnb({name1:".gif", name2:"_ov.gif"}); //이미지 파일명 참조
	});


}());