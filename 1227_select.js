
	$(function(){
		var select =  $(".selectBox");
		var selectBtn =  $(".selectBox button");
		var beforeObj = null;
		//index()
		var selectHandller = function(){
			//.log(selectBtn.index($(this)));
			//$("ul",select) =>하위요소 선택자. // $(select,"ul"):안된다.
			if(beforeObj != selectBtn.index($(this))){
				$("ul:visible", select).slideUp("fast");//하위요소 선택자. 
				var o = $(this).parent().next();
				o.slideDown("normal");
				beforeObj = selectBtn.index($(this));
			}
		}
		selectBtn.on("mouseover focus", selectHandller );
		
		var selMouseLeave = function(){
			//console.log(12);
			$("ul:visible", select).slideUp("fast");
			beforeObj = null;
		}
		select.on("mouseleave", selMouseLeave);
	
		var selAtagClick = function(e){
			e.preventDefault();
			var t = $(this).text();
			var btn = $(this).closest(".selectBox").find("button");
			var inputH = $(this).closest(".selectBox").find(":hidden");
			btn.text(t);
			inputH.val($(this).attr("href"));
		}
		$("a", select).on("click", selAtagClick);
	});
	
