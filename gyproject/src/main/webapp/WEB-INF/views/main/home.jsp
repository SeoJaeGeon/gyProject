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
		<div class="sub-wrap_300 flex-column_center">
			<img class="top-image" src="images/air_plane.png" />
		</div>
		<div class="content_increase">
			<div class="item-orderby_btn">
				<div class="click">조회순</div>
				<div class="none">등록순</div>
				<div class="none">이름순</div>
			</div>
		</div>
		<div class="content_increase content_padding list">
			<ul class="row">
				<li class="cell">
					<div class="img-box">
						<img  class="cursor-pointer" src="http://bnx.oa.gg/img/bnx_16fw_visual_01_list.jpg" alt="">
					</div>
					<div class="product-name cursor-pointer">단가라 ops</div>
					<div class="product-price">19800</div>
				</li>
				<li class="cell">
					<div class="img-box">
						<img  class="cursor-pointer" src="http://bnx.oa.gg/img/bnx_16fw_visual_01_list.jpg" alt="">
					</div>
					<div class="product-name cursor-pointer">단가라 ops</div>
					<div class="product-price">19800</div>
				</li>
				<li class="cell">
					<div class="img-box">
						<img  class="cursor-pointer" src="http://bnx.oa.gg/img/bnx_16fw_visual_01_list.jpg" alt="">
					</div>
					<div class="product-name cursor-pointer">단가라 ops</div>
					<div class="product-price">19800</div>
				</li>
			</ul>
		</div>
	</main>
</body>
</html>