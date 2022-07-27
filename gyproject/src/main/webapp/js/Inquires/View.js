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
			var input = "<input type='hidden' name='pageNo' value='"+List.currentPage+"' />";
				input += "<input type='hidden' name='listBlock' value='"+List.fn.nvl($("#listBlock option:selected").val(), 10)+"' />";
				input += "<input type='hidden' name='searchType' value='"+List.fn.nvl($("#searchType option:selected").val(), 0)+"' />";
				input += "<input type='hidden' name='inputString' value='"+$("#inputString").val()+"' />";
				input += "<input type='hidden' name='bid' value='"+ List.bid +"' />";
				input += "<input type='hidden' name='type' value='insert' />";
			form.append(input);
		    form.appendTo("body").submit();
		},
	}
}

