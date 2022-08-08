<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<head>
<%@include file="../includes/header.jsp"%>
<link type="text/css" rel="stylesheet" href="css/main/update.css" />
<script type="text/javascript" src="/js/Main/Update.js"></script>
<link rel="stylesheet" href="../static/css/inquires/css.css">
<title>GeonYoung</title>
</head>
<body>
    <div class="board_wrap">
        <div class="board_title">
            <strong>공지사항</strong>
            <p>공지사항을 빠르고 정확하게 안내해드립니다.</p>
        </div>
        <div class="board_write_wrap">
            <div class="board_write">
                <div class="title">
                    <dl>
                        <dt>제목</dt>
                        <dd><input type="text" placeholder="제목 입력" value="글 제목이 들어갑니다"></dd>
                    </dl>
                </div>
                <div class="info">
                    <dl>
                        <dt>글쓴이</dt>
                        <dd><input type="text" placeholder="글쓴이 입력" value="김이름"></dd>
                    </dl>
                    <dl>
                        <dt>비밀번호</dt>
                        <dd><input type="password" placeholder="비밀번호 입력" value="1234"></dd>
                    </dl>
                </div>
                <div class="cont">
                    <textarea placeholder="내용 입력">
글 내용이 들어갑니다.
글 내용이 들어갑니다.
글 내용이 들어갑니다.
글 내용이 들어갑니다.
글 내용이 들어갑니다.
글 내용이 들어갑니다.
글 내용이 들어갑니다.
글 내용이 들어갑니다.</textarea>
                </div>
            </div>
            <div class="bt_wrap">
                <a href="/inquires/goUpdate" class="on">수정</a>
                <a href="/inquires/goList">취소</a>
            </div>
        </div>
    </div>
</body>