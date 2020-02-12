
//onload
$(document).ready(() => {

	// создание навигации
	var navList = [
		"новости", 
		"обзоры", 
		"музыка", 
		"архитектура", 
		"кино", 
		"театр", 
		"литература", 
		"религия", 
		"живопись"
	];
	createNav(navList);

	// event-handler для кнопок навигации мобильной версии
	$(".phone-nav-opener").click(() => {
		$(".phone-nav-wrap").toggleClass("nav-active")
	});
	$(".phone-nav-exit").click(() => {
		$(".phone-nav-wrap").toggleClass("nav-active")
	});

	// пути для картинок блока обзоров
	var reviewPaths = [
		"resources/images/288386.png",
		"resources/images/Снимок экрана 2018-10-24 в 14.06.png",
		"resources/images/13052221.png",
		"resources/images/208d7a1afa07a8352942b8f211e29b23.png"
	];

	// пути для картинок бокового блока
	var asidePaths = [
		"resources/images/drew-colins-1114440-unsplash.png",
		"resources/images/jeremy-bishop-1114290-unsplash.png",
		"resources/images/bogdan-pasca-1114196-unsplash.png"
	];

	// пути для картинок нижнего слайдера
	var bottomSliderPaths = [
		"resources/images/floris-jan-roelof-huiskamp-1114976-unsplash.png",
		"resources/images/drew-colins-1114447-unsplash.png",
		"resources/images/lasse-moller-1115041-unsplash.png",
		"resources/images/bo-zheng-1114278-unsplash.png"
	];
	replaceSrcMultiple(".slide-image",bottomSliderPaths);

	// подготовка эвент-листенера (на смену размера окна)
	var mediaMobile = window.matchMedia("(max-width: 320px)")
	mobileListener(mediaMobile) // Call listener function
	mediaMobile.addListener(mobileListener) // Attach listener function on state changes
	
	function mobileListener(mediaMobile) {
		// если мобильная версия
		if (mediaMobile.matches) {

			// страницы слайдеров
			var slideQuantity = 5;
			createPhoneSliderPagination(".slider-phone-pagination", slideQuantity);
			createPhoneSliderPagination(".bottom-slider-phone-pagination", slideQuantity);

			// подключение класса центрирования
			$("header").toggleClass("centered");

			// замены изображений
			replaceSrc(".slider-item-image", "resources/images/Hotel-11.jpg");
			replaceSrc(".big-image", "resources/images/1344287851_w640_h640_33_107.jpg");
			replaceSrc(".bottom-ad img", "resources/images/david-hofmann-588877-unsplash.jpg");
			replaceSrc(".slide-item:nth-of-type(1) img", "resources/images/floris-jan-roelof-huiskamp-1114976-unsplash.jpg");
			replaceSrcMultiplePhone(".reviews-content .medium-image", reviewPaths);
			replaceSrcMultiplePhone(".aside-ad .aside-ad-image", asidePaths);

			// создание мобильной пагинации
			var pageArray = ["1", "2", "3", "...", "11"];
			createPagination(pageArray);
			
			// перемещение aside вниз
			var container = $("aside").detach();
			container.appendTo("body");
			$("aside").toggleClass("centered");
			// выравнивание aside по центру
			if (!($("aside").hasClass("centered"))) {
				$("aside").toggleClass("centered");
			}
		} else {

			// замены изображений
			replaceSrc(".slider-item-image", "resources/images/Hotel-11.png");
			replaceSrc(".big-image", "resources/images/1344287851_w640_h640_33_107.png");
			replaceSrc(".bottom-ad img", "resources/images/david-hofmann-588877-unsplash.png");
			replaceSrc(".slide-item:nth-of-type(1) img", "resources/images/floris-jan-roelof-huiskamp-1114976-unsplash.png");
			replaceSrcMultiple(".reviews-content .medium-image", reviewPaths);
			replaceSrcMultiple(".aside-ad .aside-ad-image", asidePaths);
			
			// создание пагинации
			var pageArray = ["1", "2", "3", "4", "5", "...", "35"];
			createPagination(pageArray);

			// перемещение aside обратно, после main
			var container = $("aside").detach();
			container.insertAfter("main");
			// выравнивание aside по центру
			if ($("aside").hasClass("centered")) {
				$("aside").toggleClass("centered");
			}
		}
	};
});

// функция создания навигации из пунктов
function createNav(arr) {
	$(".phone-nav-wrap, #bottom-nav").append("<ul></ul>");
	for (var i = 0; i < arr.length; i++) {
		$(".phone-nav-wrap > ul, #bottom-nav > ul").append(
			"<a href='#'><li><span>" + 
			arr[i] + 
			"<div class='nav-arrow'></div>" +
			"</span></li></a>"
		);
	}
}

// создание мобильной/десктопной пагинации
function createPagination(pageArr) {
	if (($(".pages-wrap .page-number:contains('11')")) ||
		($(".pages-wrap .page-number:contains('35')"))) {
		$(".pages-wrap").empty();
	}
	createPages(pageArr);
}

// внедрение блоков номеров страниц
function createPages(pageArray) {
	for (var i = 0; i < pageArray.length; i++) {
		$(".pages-wrap").append(
			"<a href='#'><div class='page-number'>" + 
			pageArray[i] + 
			"</div></a>"
		);
	}
	$(".page-number:first").toggleClass("current-page")
}

// создание блока мобильной пагинации слайдера (точки)
function createPhoneSliderPagination(selector, slideQuantity) {
	if ($(selector).is(":empty")) {
		for (var i = 0; i < slideQuantity; i++) {
			$(selector).append(
				"<div class='slider-page-dot'>" +
				"</div>"
			);
		}
		$(selector + " .slider-page-dot:first").toggleClass("current-page-dot");
	} 
}

// создание блока  пагинации слайдера (точки)
function replaceSrcMultiplePhone (selector, arrPaths) {
	for (var i = 0; i < arrPaths.length; i++) {
		var path = toPhonePath(arrPaths[i])
		$(selector).eq(i).attr("src", path);
	}
}

// множественная замена атрибута src у тегов img
function replaceSrcMultiple (selector, arrPaths) {
	for (var i = 0; i < arrPaths.length; i++) {
		$(selector).eq(i).attr("src", arrPaths[i]);
	}
}

// вспомогательная функция для обрезки ".png" и вставки ".jpg"
function toPhonePath (path) {
	return path.slice(0, path.length - 4) + ".jpg"
}

// единичная замена  атрибута src у тегов img
function replaceSrc(selector, path) {
	$(selector).attr("src", path);
}

