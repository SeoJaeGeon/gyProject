<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link type="text/css" rel="stylesheet" href="css/main/home.css" />
<script type="text/javascript" src="/js/Main/Home.js"></script>

<title>GeonYoung</title>
</head>
<body>
	<%@include file="../includes/header.jsp"%>

	<main class="cd-main-content">
		<div class="div-sub-content-300 div-flex-column_center">
			<img class="top-image" src="images/air_plane.png" />
		</div>

		<div class="div-sub-content_increase div-sub-content_padding div-flex-column_row">
			<div class="item-box">
				<div class="item-box_top">
					<img class="full-image cursor-onClick" src="images/tottenham.png" onClick="javascript:Home.fn.selectItem();"/>
				</div>
				<div class="item-box_bottom">
					<span>상품 설명</span>
				</div>
			</div>
			
			<div class="item-box">
				<div class="item-box_top">
					<img class="full-image cursor-onClick" src="images/tottenham.png" onClick="javascript:Home.fn.selectItem();"/>
				</div>
				<div class="item-box_bottom">
					<span>상품 설명</span>
				</div>
			</div>
		</div>
	</main>
</body>
</html>