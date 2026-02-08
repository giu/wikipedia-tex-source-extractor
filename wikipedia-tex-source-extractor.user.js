// ==UserScript==
// @name             Wikipedia TeX Source Extractor
// @namespace        http://giu.me
// @description      Extract TeX source from Wikipedia formula images
// @version          2.1
// @match            https://*.wikipedia.org/*
// @match            https://*.wikibooks.org/*
// @grant            none
// ==/UserScript==

(function() {
  'use strict';

  var counter = 0;

  document.addEventListener('click', function(e) {
    var img = e.target;

    // Check if clicked on a math formula image
    if (img.tagName === 'IMG' && (
        img.classList.contains('mwe-math-fallback-image-inline') ||
        img.classList.contains('mwe-math-fallback-image-display')
    )) {
      // Check if already has input
      if (img.parentNode.querySelector('.wte_input')) {
        return;
      }

      // Find the TeX source from the MathML element
      var texSource = img.alt; // fallback
      var mathElement = img.parentNode.querySelector('math');
      if (mathElement && mathElement.getAttribute('alttext')) {
        texSource = mathElement.getAttribute('alttext');
      }

      // Create input field
      var input = document.createElement('input');
      input.className = 'wte_input';
      input.type = 'text';
      input.value = texSource;
      input.style.cssText = 'width:400px;padding:5px;border:2px solid #3366cc;font-family:monospace;margin-left:10px;font-size:14px;';

      // Create close button
      var closeBtn = document.createElement('button');
      closeBtn.className = 'wte_close';
      closeBtn.textContent = '×';
      closeBtn.style.cssText = 'margin-left:5px;padding:2px 8px;color:white;background:#cc0000;border:none;font-weight:bold;cursor:pointer;font-size:16px;';

      // Insert after the image
      img.parentNode.insertBefore(input, img.nextSibling);
      input.parentNode.insertBefore(closeBtn, input.nextSibling);

      input.focus();
      input.select();
      counter++;
    }

    // Handle input click (reselect)
    if (e.target.classList.contains('wte_input')) {
      e.target.select();
    }

    // Handle close button
    if (e.target.classList.contains('wte_close')) {
      e.preventDefault();
      var btn = e.target;
      var input = btn.previousElementSibling;
      if (input) input.remove();
      btn.remove();
    }
  });
})();
