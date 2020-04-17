// ==UserScript==
// @name             Wikipedia TeX Source Extractor
// @namespace        http://giu.me
// @description      Allows you to extract the TeX source from an image of a formula on Wikipedia. Just click on the desired formula and you're good to go.
// @require          http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js
// @version          1.0
// @include          *.wikipedia.org/w*
// @include          *.wikibooks.org/w*
// ==/UserScript==

$(document).ready(function() {  
  var counter = 0;
  $("img.mwe-math-fallback-image-inline").click(function(){
    var $t = $(this);
    if(!$t.parent("span").find("#wte_close").length){
      $t.wrap("<span></span>");
      $t.parent().append("<input id='wte_texsource_"+counter+"' style='width:250px;padding:5px;border:2px solid #ccc;font: monospace;margin-left:10px;' type='text' /> <a style='margin-right:10px;color:red !important;font-weight:bold;' href='javascript:void(0);' id='wte_close'>x</a>");
      $("#wte_texsource_"+counter).val($t.attr("alt")).focus().select();
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
});
