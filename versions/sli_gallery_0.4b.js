
	/** ----------------------------------------- **
	 *                  SliGallery                 *
	 * ------------------------------------------- *
	 * File : sli_gallery_0.4a.js                  *
	 * Plugin jQuery oprogramowujący galerię       *
	 * elementów wraz z przyciskami                *
	 * @author Reo  reo.fox@gmail.com              *
	 * @version 0.4 beta <25-02-2012>              *
	 * @license Open Source                        *
	 ** ----------------------------------------- **
	 ** Changelog:                                **
	 **  - Obsługuje animacje easing              **
	 **  - Obsługuje zachowanie karuzeli          **
	 **    (opcja carousel: true)                 **
	 ** ----------------------------------------- **
	*/
	
	
	jQuery.fn.extend ({ 
	
		SliGallery: function (sgConfig)
		{
			// - Konfiguracja domyślna -
			
			var config = {
				pagerItemIdPrefix:     "pbn",          // - Prefix id linków w pagerze -
				contentsItem:          "a",            // - Element w galerii -
				contentsItemIdPrefix:  "baner",        // - Prefix id elementów galerii -
				contents:              "div.contents", // - Element zawierający zawartość galerii -
				itemTimeout:           5000,
				
				pager:                 "div.pager",    // - Element zawierający pager -
				pagerItemSelClass:     "on",           // - Klasa aktywnego linku w pagerze -
				
				goLeftBtn:             ".goleft",      // - Przycisk wstecz -
				goRightBtn:            ".goright",     // - Przycisk dalej -
				
				counter:               ".counter",     
			
				pauseAtHover:          true,
				changeOn:              "click",
				fastClickChange:       false,
				withoutRotation:       false,
				rotationInterval:      null,
				
				easing:                "",            // - easing method
				carousel:              false,
				
				// - Typy przejść i ich czasy trwania -
				showType:     "fade",
				showDuration: "slow",
				hideType:     "fade",
				hideDuration: 300
			};
			

			var elementId = jQuery(this).attr("id");
			
			jQuery.extend(config, sgConfig);
			
			// pomocnicze
			args = { left: 0, right: 0, top: 0, bottom: 0, width: 0 };   // - argumenty pomocy
			rollout = false;
			
			var items = new Array();
			var selectedPagerId = config.pagerItemSelClass + "1";
			
			
			function loadItemsArray ()
			{
				jQuery("#" + elementId + " " + config.contents + " > " + config.contentsItem).each( function(index, dom) {
					if ( jQuery(this).attr("id") == "" || typeof jQuery(this).attr("id") == "undefined" )
						jQuery(this).attr("id", config.contentsItemIdPrefix + (index + 1));
					items[index] = jQuery(this).attr("id");
				});
				
				if ( config.easing != "" )
				{
					args.left = jQuery("#" + elementId + " " + config.contents + " > " + config.contentsItem).css("left");
					args.width = jQuery("#" + elementId + " " + config.contents + " > " + config.contentsItem).css("width");
					
					// - Przy easing'u dla easeOutBack, easeOutQuad nie potrzeba chować elementów innych niż pierwszy
					jQuery("#" + elementId + " " + config.contents + " > " + config.contentsItem).css("display", "block");
				}
				
				jQuery("#" + elementId + " " + config.pager + " a").each( function(index, dom) {
					if ( jQuery(this).attr("id") == "" || typeof jQuery(this).attr("id") == "undefined" )
						jQuery(this).attr("id", config.pagerItemIdPrefix + (index + 1));
					
					// - Element z klasą config.pagerItemSelClass zawierający link do zakładki
					// - wskazuje na otwartą zakładkę
					//if ( jQuery(this).parent().hasClass(config.pagerItemSelClass) )
					//	selectedPagerId = jQuery(this).attr("id");
				});
			};
			
			// --- Odświeża pagera banerów ---
			function refreshPager (pagerNum)
			{
				jQuery("#" + elementId + " " + config.pager + " a").removeClass(config.pagerItemSelClass);
				jQuery("#" + elementId + " " + config.pager + " a#" + config.pagerItemIdPrefix + pagerNum).addClass(config.pagerItemSelClass);
				
				selectedPagerId = config.pagerItemIdPrefix + pagerNum;
				
				jQuery("#" + elementId + " " + config.counter).text(pagerNum);
			};
			
			// --- Pokazuje kolejny lub dany baner ---
			function toggleElement (elId, fastToggle)
			{
				var item = "";
					
				var i = 0;
				var exitLoop = false;
					
				while ( i < items.length && exitLoop == false )
				{
					item = items.shift();
					items.push(item);
					if ( typeof elId == "undefined" )
						exitLoop = true;
						
					else if ( elId == item.substring(config.contentsItemIdPrefix.length, config.contentsItemIdPrefix.length + 2) )
						exitLoop = true;
						
					i++;
				}
				
				
				// - Animacja wyjścia ------------------------------------------------------------------------------------------------
					
				jQuery("#" + elementId + " " + config.contents + " > " + config.contentsItem).each( function(index, dom) {
					
					// - Szybka zamiana -
					if ( fastToggle == true )
					{
						jQuery(this).hide(0);
					}
					
					// - Użycie easing -
					else if ( config.easing != "" )
					{
						if ( config.carousel && !rollout || !config.carousel )
						{
							jQuery(this).animate (
								{ left: args.width }, 
								{ duration: config.hideDuration, easing: config.easing }
							);
						}
						
						else if ( jQuery(this).css("left") == "-" + args.width ) {
							/*jQuery(this).animate (
								{ left: args.width }, 
								{ duration: config.hideDuration, easing: config.easing, complete: function() { jQuery(this).css("opacity", "1"); } }
							);*/
							
							jQuery(this).css("left", args.width);
						}
						
						else if ( rollout && jQuery(this).css("left") == "0px" ) {
							jQuery(this).animate (
								{ left: "-" + args.width }, 
								{ duration: config.hideDuration, easing: config.easing }
								//{ duration: config.hideDuration, easing: config.easing, complete: function() { jQuery(this).css("opacity", "0"); } }
							);
						}
					}
						
					else if ( jQuery(this).css("display") != "none" )
					{
						if ( config.hideType.toLowerCase() == "fade" ) {
						
							// IE8 BUG FIX - for non-fading span in sliG with panel - Need better FIX!
							if ( $.browser.msie && parseInt($.browser.version, 10) == 8)
								jQuery(this).children("span").hide(0);
								
							jQuery(this).fadeOut(config.hideDuration);
						}
							
						else if ( config.showType.toLowerCase() == "slide" )
							jQuery(this).slideUp(config.hideDuration);
							
						else if ( config.showType.toLowerCase() == "hide" )
							jQuery(this).hide(config.hideDuration);
							
						else
							jQuery(this).hide(config.hideDuration);
					}
				});
				
				
				// - Animacja wejścia ------------------------------------------------------------------------------------------------
				
				if ( fastToggle == true )
					jQuery("#" + elementId + " " + config.contents + " > " + config.contentsItem + "#" + item).show(0);
				
				else if ( config.easing != "" )
				{
					/*switch ( config.easing )
					{
						case "easeOutBack" : 
						case "easeOutQuad" :
						case "easeOutBounce" :
					*/	
							jQuery("#" + elementId + " " + config.contents + " > " + config.contentsItem + "#" + item).animate (
								{ left: args.left }, 
								{ duration: config.showDuration, easing: config.easing }
							);
					//}
				}
				
				else if ( config.showType.toLowerCase() == "fade" ){
					
					// IE8 BUG FIX - for non-fading span in sliG with panel - Need better FIX!
					if ( $.browser.msie && parseInt($.browser.version, 10) == 8)
						jQuery("#" + elementId + " " + config.contents + " > " + config.contentsItem + "#" + item).children("span").show(0);
					
					jQuery("#" + elementId + " " + config.contents + " > " + config.contentsItem + "#" + item).fadeIn(config.showDuration);
				}
				else if ( config.showType.toLowerCase() == "slide" )
					jQuery("#" + elementId + " " + config.contents + " > " + config.contentsItem + "#" + item).slideDown(config.showDuration);
						
				else if ( config.showType.toLowerCase() == "show" )
					jQuery("#" + elementId + " " + config.contents + " > " + config.contentsItem + "#" + item).show(config.showDuration);
					
				else
					jQuery("#" + elementId + " " + config.contents + " > " + config.contentsItem + "#" + item).show(config.showDuration);
					
				var pagerNum = item.substring(config.contentsItemIdPrefix.length, config.contentsItemIdPrefix.length + 2);
				refreshPager(pagerNum);
				
				
				if ( config.carousel )
					rollout = true;
				
			};
			
			function toggleElementContainer () 
			{
				toggleElement();
			};
				
			// --- Zaczyna rotację ---
			function startRotation ()
			{
				if ( !config.withoutRotation )
					config.rotationInterval = setInterval(toggleElementContainer, config.itemTimeout);
			};
				
			// --- Pauzuje rotację ---
			function pauseRotation ()
			{
				if ( !config.withoutRotation )
					clearInterval(config.rotationInterval);
			};
			
			// --- Następna strona ---
			function viewNextPage () 
			{
				var pPage = items.shift();
				items.push(pPage);
				
				var id = pPage.substring(config.contentsItemIdPrefix.length, config.contentsItemIdPrefix.length + 1);
				
				toggleElement(id);
				refreshPager(id);
			};
			
			// --- Poprzednia strona ---
			function viewPreviousPage ()
			{
				var pPage = items.pop();
				items.unshift(pPage);
				
				toggleElement(items[items.length - 1]);
				
				var id = items[items.length - 1].substring(config.contentsItemIdPrefix.length, config.contentsItemIdPrefix.length + 2);
				refreshPager(id);
			};
			
			
			$("#" + elementId + " " + config.goRightBtn).click (
				function () {
					viewNextPage();
					return false;
				}
			);
			
			$("#" + elementId + " " + config.goLeftBtn).click (
				function () {
					viewPreviousPage();
					return false;
				}
			);
			
			// --- Pauzuje rotację po najechaniu na baner ---
			if ( config.pauseAtHover ) {
				jQuery("#" + elementId).hover (
					function () {
						pauseRotation();
					},
						
					function () {
						startRotation();
					}
				);
			}
			
			if ( config.changeOn == "click" )
			{
				// --- Pokazuje baner po kliknięciu ---
				jQuery("#" + elementId + " " + config.pager + " a").click (
					function () {
						var bnId = jQuery(this).attr("id");
						
						if ( bnId == selectedPagerId )
							return false;
							
						if ( bnId.indexOf(config.pagerItemIdPrefix) >= 0 )
						{
							var pagerNum = bnId.substring(config.pagerItemIdPrefix.length, config.pagerItemIdPrefix.length + 2);
							toggleElement(pagerNum, config.fastClickChange);
						
							return false;
						}
					}
				);
			}
				
			else if ( config.changeOn == "hover" )
			{
				jQuery("#" + elementId + " " + config.pager + " a").hover (
					function () {
						var bnId = jQuery(this).attr("id");
						
						if ( bnId == selectedPagerId )
							return false;
						
						if ( bnId.indexOf(config.pagerItemIdPrefix) >= 0 )
						{
							var pagerNum = bnId.substring(config.pagerItemIdPrefix.length, config.pagerItemIdPrefix.length + 2);
							config.toggleElement(pagerNum, config.fastClickChange);
							return false;
						}
							
					},
						
					function () {
						
					}
				);
			}
				
			loadItemsArray();
			toggleElement();
			startRotation();
			
		}
	
	});
	
	
	