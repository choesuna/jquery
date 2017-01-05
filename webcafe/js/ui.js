(function() {
	/*
		1. 객체 생성함수를 정의
		2. 객체 생성
		3. 속성, 메서드 등록
	*/
	function TabmenuFnc(objName, idx){
		this.myObjName = objName;
		this.myIdx = idx;
		this.myObj = this.myObjName + ":eq(" + this.myIdx + ")";
		this.actImg =  $(this.myObj).find(" h3:first img, h4:first img");
		this.bindEvent();
	}
	TabmenuFnc.prototype.bindEvent = function(){
		//console.log(5);
		$(document).on("click", this.myObj + " h3 a," + this.myObj + " h4 a", $.proxy(this.tabEventHandler, this));
	}
	TabmenuFnc.prototype.tabEventHandler = function(e){
		e.preventDefault();
		var $myImg = $(e.target);
		var $myThis = $myImg.closest("a");
		var $myDiv = $myThis.parent().next();
		var $visibleDiv = $(this.myObj + " div:visible");

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
		//console.log($("div[data-type=tabmenu]"))
		var arrTab = [];
		var tabText = "div[data-type=tabmenu]";

		var tabMenuWrap = $(tabText); // 참조 저장아님
		$.each(tabMenuWrap, function(i,o){
			arrTab[i] = new TabmenuFnc(tabText, i);

		});
		//console.log(arrTab);
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
				auto:true,
				speed:100,
				//randomStart:true,
				//mode:'fade',
				//mode:'vertical',
				easing:'ease-out',
				mimSlides:4, 
				maxSlides:5,
				slideWidth:100,
				slideMargin:0
		}
		var mobileOption = opt.mobile;
		var tabletOption = opt.tablet;
		var pcOption = opt.pc;
		
		var k ;
		$(window).on("resize",function(){
		//console.log($(window).width());
		//var w = $(window).width();
		
			if($(window).width() > 780){
				k = $.extend(baseOption, opt.pc);	

			}else if($(window).width() > 480){
				k = $.extend(baseOption, opt.tablet);
				//console.log(k);

			}else{
				k = $.extend(baseOption, opt.mobile);
				
			}
			console.log(k);
		});
		$(window).resize();
		var slider = $(this).bxSlider(k);
		$(window).on("resize", function(){
			slider.reloadSlider(k);
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