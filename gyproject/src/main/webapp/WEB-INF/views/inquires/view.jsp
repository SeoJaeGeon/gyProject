<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<head>
<%@include file="../includes/header.jsp"%>
<link type="text/css" rel="stylesheet" href="../static/css/inquires/view.css" />
<script type="text/javascript" src="../static/js/Inquires/View.js"></script>

<title>GeonYoung</title>
</head>
<body>
	<main class="cd-main-content">
		<div class="sub-wrap_500">
			<div class="board_list_wrap">
	            <div class="board_list">
	                <div class="board_list_head">
	                    <div class="num">번호</div>
	                    <div class="tit">제목</div>
	                    <div class="writer">글쓴이</div>
	                    <div class="date">작성일</div>
	                    <div class="view">조회</div>
	                </div>
	                <div class="board_list_body">
	                    <div class="item">
	                        <div class="num">5</div>
	                        <div class="tit"><a href="#">크롬 개발자도구 활용하는 방법</a></div>
	                        <div class="writer">관리자</div>
	                        <div class="date">2019-11-20</div>
	                        <div class="view">111</div>
	                    </div>
	                    <div class="item">
	                        <div class="num">4</div>
	                        <div class="tit"><a href="#">html과 css로 웹사이트를 만들어요.</a></div>
	                        <div class="writer">관리자</div>
	                        <div class="date">2019-11-12</div>
	                        <div class="view">222</div>
	                    </div>
	                    <div class="item">
	                        <div class="num">3</div>
	                        <div class="tit"><a href="#">코딩은 즐거워요.</a></div>
	                        <div class="writer">관리자</div>
	                        <div class="date">2019-11-02</div>
	                        <div class="view">333</div>
	                    </div>
	                    <div class="item">
	                        <div class="num">2</div>
	                        <div class="tit"><a href="#">전주코딩학원은 전주 법조타운에 있습니다.</a></div>
	                        <div class="writer">관리자</div>
	                        <div class="date">2019-10-28</div>
	                        <div class="view">222</div>
	                    </div>
	                    <div class="item">
	                        <div class="num">1</div>
	                        <div class="tit"><a href="#">전주코딩학원 공지사항</a></div>
	                        <div class="writer">관리자</div>
	                        <div class="date">2019-10-24</div>
	                        <div class="view">111</div>
	                    </div>
	                </div>
	            </div>
	            <div class="btn_wrap">
	            	<button class="btn right" onClick="javascript=View.fn.insertInquires()">작성하기</button>
	            </div>
	            <div class="paging">
	                <a href="#" class="bt first">처음 페이지</a>
	                <a href="#" class="bt prev">이전 페이지</a>
	                <a href="#" class="num on">1</a>
	                <a href="#" class="num">2</a>
	                <a href="#" class="num">3</a>
	                <a href="#" class="bt next">다음 페이지</a>
	                <a href="#" class="bt last">마지막 페이지</a>
	            </div>
     	   </div>
		</div>
	</main>
</body>
