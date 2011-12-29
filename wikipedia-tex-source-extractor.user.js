// ==UserScript==
// @name            Wikipedia TeX Source Extractor
// @namespace       http://giu.me
// @description     Allows you to extract the TeX source from an image of a formula on Wikipedia. Just click on the desired formula and you're good to go.
// @version			1.0
// @include			*.wikipedia.org/w*
// ==/UserScript==

//A thanks for this snippet goes to tghw:
//http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js");
	script.addEventListener('load', function() {
	var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function addExtractor(){
	var counter = 0;
	$("img.tex").click(function(){
		var $t = $(this);
		if(!$t.parent("span").find("#wte_close").length){
			var a = $t.attr("alt");
			$t.wrap("<span alt='"+a+"_wte'></span>");
			$t.parent().append("<input id='wte_texsource_"+counter+"' style='padding:5px;border:2px solid #ccc;font: monospace;' type='text' value='"+a+"' /> <a style='color:red !important;font-weight:bold;' href='javascript:void(0);' id='wte_close'>x</a>");
			$("#wte_texsource_"+counter).focus().select();
			counter++;
		}
	});

	$("[id^=wte_t]").live("click", function(){
		$(this).focus().select();
	});

	$("#wte_close").live("click", function(){
		var $t = $(this);
		$t.prev().remove();
		$t.remove();
	});
}


addJQuery(addExtractor);