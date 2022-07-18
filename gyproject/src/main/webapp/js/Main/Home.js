var Home = {
	// ----------------------------
	// InfoIndex 객체
	// ----------------------------
	name : 'Home',
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
		test : function(){
    		$("#slide").slideToggle();
		},
	}
}

