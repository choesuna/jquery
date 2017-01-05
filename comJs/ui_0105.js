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
					mimSlides:2, 
					maxSlides:2,
					slideWidth:150

				},
				tablet:{
					mimSlides:3, 
					maxSlides:3,
					slideWidth:150


				},
				pc:{
					mimSlides:5, 
					maxSlides:5,
					slideWidth:150
				}

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
	
	$.fn.gnb = function(opt){
		var myThis = $(this);
		
		var activeMenu = null;
		var mouseOver = function(){
			if(activeMenu){
				activeMenu.next().hide();
				var bfImg = $("img", activeMenu).attr("src").replace(opt.name2, opt.name1);
				 $("img", activeMenu).attr("src", bfImg);
			}
			var ts =  $(this);
			console.log(ts.next());
			ts.next().show();
			var ovImg = $("img", ts).attr("src").replace(opt.name1, opt.name2);
			$("img", ts).attr("src", ovImg)
			activeMenu = ts;
		}
		$("ul ul", myThis).hide();
		$(">ul>li>a", myThis).on({
			//"mouseover":function(){
			"mouseover focus": mouseOver
		});
			myThis.css({height:"47px"});
		myThis.on({
			"mouseleave" : function(){
			//alert(1);
				if(activeMenu){
					activeMenu.next().hide();
					var bfImg = $("img", activeMenu).attr("src").replace(opt.name2, opt.name1);
					 $("img", activeMenu).attr("src", bfImg);
				}
			}
				
		});
	}
	$(function(){
		$("#gnb").gnb({name1:".gif", name2:"_ov.gif"});
	});
	

}());