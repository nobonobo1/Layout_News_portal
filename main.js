
//onload
$(document).ready(function() {

	var navList = ["новости", "обзоры", "музыка", "архитектура", "кино", "театр", "литература", "религия", "живопись"]
	createNav(navList);

	var pageArray = ["1", "2", "3", "4", "5", "...", "35"];
	createPagination(pageArray);
});

function createNav(arr) {
	$("#top-nav, #bottom-nav").append("<ul></ul>");
	for (var i = 0; i < arr.length; i++) {
		$("#top-nav > ul, #bottom-nav > ul").append(
			"<li><a href='#'>" + arr[i] + "</a></li>"
		);
	}
}

//Usable when pageQuantity is known, needed to rewrite

/*function createPagination(pageQuantity) {
	for (var i = 1; i < pageQuantity + 1; i++) {
		$(".pages-wrap").append("<div class='page-number'>" + i + "</div>");
	}
}*/

function createPagination(pageArray) {
	for (var i = 0; i < pageArray.length; i++) {
		$(".pages-wrap")
		.append(
			"<a href='#'><div class='page-number'>" + 
			pageArray[i] + 
			"</div></a>"
		);

	}
	$(".page-number:first")
	.toggleClass("current-page")
}

