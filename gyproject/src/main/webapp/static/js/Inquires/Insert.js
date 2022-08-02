var Insert = {
	name : 'Insert',
	currentPage:1,
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
		Insert.fn.ckEditor();
	},

	// ----------------------------------
	// 처리 메서드가 정의된 객체
	// ----------------------------------
	fn : {
		ckEditor : function(){
			/* 책 소개 */
			ClassicEditor
				.create(document.querySelector('#inquires_textarea'))
				.catch(error=>{
					console.error(error);
				});
		},
	}
}

