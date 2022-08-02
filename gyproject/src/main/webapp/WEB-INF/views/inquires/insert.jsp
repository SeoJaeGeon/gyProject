<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<head>
<%@include file="../includes/header.jsp"%>
<script src="https://cdn.ckeditor.com/ckeditor5/34.2.0/classic/ckeditor.js"></script> <!-- 게시글 에디터 -->
<link type="text/css" rel="stylesheet" href="../static/css/inquires/insert.css" />
<script type="text/javascript" src="../static/js/Inquires/Insert.js"></script>

<script type="text/javascript">
 	$(function() {
		common.invoke("Insert");
	});
</script>

<title>GeonYoung</title>
</head>
<body>
	<main class="cd-main-content">
		<div class="sub-wrap_500 content_increase">
			<label for="gdsDes">상품소개</label>
			<textarea name="inquiresInput" id="inquires_textarea"></textarea>
		</div>
	</main>
</body>
