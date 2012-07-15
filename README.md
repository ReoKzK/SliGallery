SliGallery
=======

simple jquery plugin creating JavaScript gallery

Sample usage:
-------------

###Javascript:

```html
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
	<script type="text/javascript" src="./js/jquery.easing.1.3.js"></script>
	<script type="text/javascript" src="./js/sli_gallery_0.4b3.js"></script>
	<script type="text/javascript">
	// <![CDATA[
			
			$(document).ready(function() {
				
				$("#promoContainer").SliGallery({
					showDuration: 800,
					hideDuration: 1000,
					
					pagerItemIdPrefix:    "pbn",
					contentsItem:         "a",
					contentsItemIdPrefix: "promo",
					itemTimeout:          7000,
					
					easing:               "easeOutExpo",   // Type of easing
					carousel:             true,            // Working as carousel
					
					// - Configuration of html structure - also default values -
					
					pagerItemIdPrefix:     "pbn",          // - Prefix id of links in pager -
					contentsItem:          "a",            // - Element in gallery -
					contentsItemIdPrefix:  "baner",        // - Prefix id of elements in gallery -
					contents:              "div.contents", // - Element containing gallery elements -
					itemTimeout:           5000,
					
					pager:                 "div.pager",    // - Element containing pager -
					pagerItemSelClass:     "on",           // - Class of active link in pager -
					
					goLeftBtn:             ".goleft",      // - Button back -
					goRightBtn:            ".goright"      // - Button forward -
					
				});
				
			});
			
	//]]>
	</script>
	
###Sample HTML structure:

```html
	<div id="promoContainer">
	
		<div class="contents">  <!-- Here goes all elements used in gallery, such as images, links with images - they must be all the same type (a, img, div etc.) -->
			<a href="#"><img alt="Promocja" src="./images/promo1.jpg" /></a>
			<a href="#"><img alt="Promocja" src="./images/promo2.jpg" /></a>
			<a href="#"><img alt="Promocja" src="./images/promo3.jpg" /></a>
			<a href="#"><img alt="Promocja" src="./images/promo4.jpg" /></a>
		</div>
					
		<div class="pager">  <!-- Here goes pager for these elements -->
			<a href="#">1</a>  
			<a href="#">2</a>  
			<a href="#">3</a>  
			<a href="#">4</a>  
		</div>
		
		<!-- Additional buttons for forward/backward actions -->
		
		<a href="#" class="goleft"><img src="./images/goleft.png" alt="&lt;" /></a>
		<a href="#" class="goright"><img src="./images/goright.png" alt="&gt;" /></a>
		
	</div>
				
	

