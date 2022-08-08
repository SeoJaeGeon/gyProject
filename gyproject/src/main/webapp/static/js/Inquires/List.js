var View = {
	// ----------------------------
	// InfoIndex 객체
	// ----------------------------
	name : 'View',
	currentPage:1,		// 페이지 번호

	pageNo : 1,
	listBlock : 10,

	init : function() {
		this.beforeBind();
		this.bind();
		this.afterBind();
	},

	beforeBind : function() {
		
	},

	bind : function() {

	},

	afterBind : function() {

	},

	// ----------------------------------
	// 처리 메서드가 정의된 객체
	// ----------------------------------
	fn : {
		insertInquires : function(){
    		var form = $("<form id='forward'/>");
			     form.attr("method", "post");
			     form.attr("action", "/inquires/goInsert");
			var input = "<input type='hidden' name='testValue' value='no' />";
			form.append(input);
		    form.appendTo("body").submit();
		    
//		    $.ajax({
//				type : "POST",
//				url : "/goInsert",
//				data: {},
//				contentType: "application/json",
//				dataType: "json",
//				success : function (data, status) {
//				   alert("success");
//				},
//				error : function (status) {
//				   alert(status + "error!");
//				}
//			});
		},
	}
}

