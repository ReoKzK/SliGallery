
	/** --------------------------------- **
	 *               Tabs_Box              *
	 * ----------------------------------- *
	 * File : sli_gallery.js               *
	 * Klasa oprogramowująca galerię       *
	 * elementów wraz z przyciskami        *
	 * @author Reo  reo.fox@gmail.com      *
	 * @version 0.1.2 EDT <2011-02-21>     *
	 * @license Open Source                *
	 ** --------------------------------- **
	*/
	
		function Sli_Gallery (elementId)
		{
			var thisObj = new Object();
			
			// - ID elementu nadrzędnego -
			thisObj.id = elementId;
			
			// - Element zawierający pager -
			thisObj.pager = "div.pager";
			
			// - Klasa aktywnego linku w pagerze -
			thisObj.pagerItemSelClass = "on";
			
			// - Prefix id linków w pagerze -
			thisObj.pagerItemIdPrefix = "bn";
			
			// - Element zawierający zawartość galerii -
			thisObj.contents = "div.contents";
			
			// - Element w galerii -
			thisObj.contentsItem = "a";
			
			// - Prefix id elementów galerii -
			thisObj.contentsItemIdPrefix = "image";
			
			thisObj.changeOn = "click";
			thisObj.fastClickChange = false;
			
			
			thisObj.items = new Array();
			
			thisObj.withoutRotation = false;
			
			thisObj.itemTimeout = 5000;
			thisObj.rotationInterval = null;
			
			
			// --- Funkcje ---
			
			thisObj.loadItemsArray = null;
			thisObj.refreshPager = null;
			thisObj.toggleElement = null;
			thisObj.toggleElementContainer = null;
			
			thisObj.startRotation = null;
			thisObj.pauseRotation = null;
			
			
			// - Typy przejść i ich czasy trwania -
			
			thisObj.showType = "fade";
			thisObj.showDuration = "slow";
			thisObj.hideType = "fade";
			thisObj.hideDuration = 300;
			
			thisObj.run = function ()
			{
				thisObj.loadItemsArray = function ()
				{
					$("#" + thisObj.id + " " + thisObj.contents + " > " + thisObj.contentsItem).each( function(index, dom) {
						if ( $(this).attr("id") == "" )
							$(this).attr("id", thisObj.contentsItemIdPrefix + (index + 1));
						thisObj.items[index] = $(this).attr("id");
					});
					
					$("#" + thisObj.id + " " + thisObj.pager + " a").each( function(index, dom) {
						if ( $(this).attr("id") == "" )
							$(this).attr("id", thisObj.pagerItemIdPrefix + (index + 1));
					});
				};
			
				// --- Odświeża pagera banerów ---
				thisObj.refreshPager = function (pagerNum)
				{
					$("#" + thisObj.id + " " + thisObj.pager + " a").removeClass(thisObj.pagerItemSelClass);
					$("#" + thisObj.id + " " + thisObj.pager + " a#" + thisObj.pagerItemIdPrefix + pagerNum).addClass(thisObj.pagerItemSelClass);
				};
				
				// --- Pokazuje kolejny lub dany baner ---
				thisObj.toggleElement = function (elId, fastToggle)
				{
					var item = "";
					
					var i = 0;
					var exitLoop = false;
					
					while ( i < thisObj.items.length && exitLoop == false )
					{
						item = thisObj.items.shift();
						thisObj.items.push(item);
						if ( typeof elId == "undefined" )
							exitLoop = true;
						
						else if ( elId == item.substring(thisObj.contentsItemIdPrefix.length, thisObj.contentsItemIdPrefix.length + 2) )
							exitLoop = true;
						
						i++;
					}
						//alert(item.substring(thisObj.contentsItemIdPrefix.length, thisObj.contentsItemIdPrefix.length + 2));
					
					$("#" + thisObj.id + " " + thisObj.contents + " > " + thisObj.contentsItem).each( function(index, dom) {
						if ( fastToggle == true )
						{
							$(this).hide(0);
						}
						
						else if ( $(this).css("display") != "none" )
						{
							if ( thisObj.hideType.toLowerCase() == "fade" )
								$(this).fadeOut(thisObj.hideDuration);
							
							else if ( thisObj.showType.toLowerCase() == "slide" )
								$(this).slideUp(thisObj.hideDuration);
							
							else if ( thisObj.showType.toLowerCase() == "hide" )
								$(this).hide(thisObj.hideDuration);
							
							else
								$(this).hide(thisObj.hideDuration);
						}
					});
					
					if ( fastToggle == true )
						$("#" + thisObj.id + " " + thisObj.contents + " > " + thisObj.contentsItem + "#" + item).show(0);
					
					else if ( thisObj.showType.toLowerCase() == "fade" )
						$("#" + thisObj.id + " " + thisObj.contents + " > " + thisObj.contentsItem + "#" + item).fadeIn(thisObj.showDuration);
					
					else if ( thisObj.showType.toLowerCase() == "slide" )
						$("#" + thisObj.id + " " + thisObj.contents + " > " + thisObj.contentsItem + "#" + item).slideDown(thisObj.showDuration);
						
					else if ( thisObj.showType.toLowerCase() == "show" )
						$("#" + thisObj.id + " " + thisObj.contents + " > " + thisObj.contentsItem + "#" + item).show(thisObj.showDuration);
					
					else
						$("#" + thisObj.id + " " + thisObj.contents + " > " + thisObj.contentsItem + "#" + item).show(thisObj.showDuration);
					
					var pagerNum = item.substring(thisObj.contentsItemIdPrefix.length, thisObj.contentsItemIdPrefix.length + 2);
					thisObj.refreshPager(pagerNum);
				};
				
				thisObj.toggleElementContainer = function () 
				{
					thisObj.toggleElement();
				};
				
				// --- Zaczyna rotację ---
				thisObj.startRotation = function ()
				{
					if ( !thisObj.withoutRotation )
						thisObj.rotationInterval = setInterval(thisObj.toggleElementContainer, thisObj.itemTimeout);
				};
				
				// --- Pauzuje rotację ---
				thisObj.pauseRotation = function ()
				{
					if ( !thisObj.withoutRotation )
						clearInterval(thisObj.rotationInterval);
				};
			
				// --- Pauzuje rotację po najechaniu na baner ---
				$("#" + thisObj.id).hover (
					function () {
						thisObj.pauseRotation();
					},
					
					function () {
						thisObj.startRotation();
					}
				);
				
				if ( thisObj.changeOn == "click" )
				{
					// --- Pokazuje baner po kliknięciu ---
					$("#" + thisObj.id + " " + thisObj.pager + " a").click (
						function () {
							var bnId = $(this).attr("id");
							
							if ( bnId.indexOf(thisObj.pagerItemIdPrefix) >= 0 )
							{
								var pagerNum = bnId.substring(thisObj.pagerItemIdPrefix.length, thisObj.pagerItemIdPrefix.length + 2);
								thisObj.toggleElement(pagerNum, thisObj.fastClickChange);
							
								return false;
							}
						}
					);
				}
				
				else if ( thisObj.changeOn == "hover" )
				{
					$("#" + thisObj.id + " " + thisObj.pager + " a").hover (
						function () {
							var bnId = $(this).attr("id");
							
							if ( bnId.indexOf(thisObj.pagerItemIdPrefix) >= 0 )
							{
								var pagerNum = bnId.substring(thisObj.pagerItemIdPrefix.length, thisObj.pagerItemIdPrefix.length + 2);
								thisObj.toggleElement(pagerNum, thisObj.fastClickChange);
								return false;
							}
							
						},
						
						function () {
							
						}
					);
				}
				
				thisObj.loadItemsArray();
				thisObj.toggleElement();
				thisObj.startRotation();
			
			};
			
			return thisObj;
		}
		
		