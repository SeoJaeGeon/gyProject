var UploadFileGroupId = '123';
var agent = navigator.userAgent.toLowerCase();
var textAreaId = '';
(function ($) {
	/**
	 * 자바스크립트가 로드될 때까지 기다린후 화면제어 로직을 처리하는 스크립트의 init 함수를 호출한다.
	 */
	var ScriptInvoker = function (scriptName) {
		this.scriptName = scriptName;	// 실행할 스크립트 객체명
		this.timeVar = undefined;	// timeout 이벤트의 참조 변수
		this.attrValue = undefined;	// 객체에 전달할 데이터 값
		this.attrName;					// 객체에 생성할 데이터

		/**
		 * script에 전달할 데이터를 설정한다..
		 * @param attrName  변수명
		 * @param attrValue 데이터, Object, string, int 등
		 */
		this.setAttribute = function (attrName, attrValue) {
			this.attrName = attrName;
			this.attrValue = attrValue;
		};

		/**
		 * script의 init를 호출한다.
		 */
		this.invoke = function () {
			var self = this;

			this.timeVar = setTimeout(function () {
				var func = window[self.scriptName];

				if (func) {
					if (self.attrName) {
						func[self.attrName] = self.attrValue;
					}

					func.init();
					self.clearTime();
				} else {
					self.invoke();
				}
			});
		};

		/**
		 * 타임아웃을 해제한다.
		 */
		this.clearTime = function () {
			clearTimeout(this.timeVar);
		};
	};

	var common = function () {

	};

	common.invoker = {
		/**
		 * Javascript가 로드될 때까지 기다린 후 javascript object가 유효하면 script의 init function을 호출한다.
		 * 화면개발가이드 참조
		 *
		 * @param scriptName  javascript 객체이름
		 * @param varName  객체에 추가할 변수이름
		 * @param jsonStr 객체에 담을 변수, Object or primitive type
		 */
		invoke: function (scriptName, varName, jsonStr) {
			var invoker = new ScriptInvoker(scriptName);
			invoker.setAttribute(varName, jsonStr);
			invoker.invoke();
		}
	};

	common.string = {
		/**
		 * 문자열의 앞뒤 공백문자를 제거한다.
		 *
		 * @param str 문자열
		 * @return 앞뒤 공백문자가 제거된 문자열
		 */
		trim: function (str) {
			return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		},

		trim2: function (str) {
			return str.replace(/(^\s*)|(\s*$)/gi, '').replace(/(^\s*)|(\s*$)/gi, '');
		},

		/**
		 * 문자열의 일부를 지정한 문자열로 교체합니다.
		 *
		 * @param str 문자열
		 * @param findStr 교체 대상 문자열
		 * @param replaceStr 교체할 문자열
		 * @return 지정한 문자열로 교체된 문자열
		 */
		replace: function (str, findStr, replaceStr) {
			if (!str) {
				return str;
			}

			return str.replace(new RegExp(findStr, "g"), replaceStr);
		},

		// 숫자 문자열&&계산완료 문자열 교체
		checkNumReplace: function (str, replaceStr) {
			if (str == 'NaN' || str == '0' || str == 'Infinity') {
				str = "-";
			}
			return str;
		},


		/**
		 * 패딩문자로 문자열의 왼쪽을 채운다.
		 *
		 * @param src 원본문자열
		 * @param length 문자열의 제한 길이
		 * @param pad 채울 문자
		 * @return 패딩된 문자열
		 */
		lpad: function (src, length, pad) {
			if (!this.hasText(src)) {
				return "";
			}

			var buffer = [];
			for (var i = 0; i < length - src.length; i++) {
				buffer.push(pad);
			}

			src = buffer.join("") + src;

			return src.substring(0, length);
		},

		/**
		 * 문자열이 통화형식(123,456.78)인지 확인한다.
		 *
		 * @param str 문자열
		 * @return 형식이 맞으년 true, 아니면 false
		 */
		isCurrency: function (str) {
			return !str.match(/(-){,1}[^0-9,\.]{1,}/);
		},

		/**
		 * 문자열이 정수형(1234567)인지 확인한다.
		 * @param str 문자열
		 * @return 형식이 맞으년 true, 아니면 false
		 */
		isInteger: function (str) {
			return !str.match(/(-){,1}[^0-9]{1,}/);
		},

		/**
		 * 공백을 제외한 문자열을 가지고 있는지 확인한다.
		 * @param str 체크할 문자열
		 * @return 문자열의 길이가 > 0 이면 true, 아니면 false
		 */
		hasText: function (str) {
			if (!str) {
				return false;
			}

			str = this.trim(str);
			if ("" == str) {
				return false;
			}

			return true;
		},

		/**
		 * 주어진 문자열이 null 이거나 "" 인지 확인
		 * @param str 비교할 문자열
		 * @return null 이거나 "" 이면 true, 아니면 false
		 */
		isEmpty: function (str) {
			return ((null == str) || ("" == str)) ? true : false;
		},


		/**
		 * 주어진 문자열이 null 이거나 "" 인지 확인
		 * @param str 비교할 문자열
		 * @return null 이거나 "" 이면 true, 아니면 false
		 */
		isCheckStr: function (str, addStr) {

			var result = ((null == str) || ("" == str) || (addStr == str)) ? true : false;
			if (result) {
				return '';
			} else {
				return str;
			}
		},

		/**
		 * 주어진 문자열이 null 또는 "" 가 아닌지 확인
		 * @param str 비교할 문자열
		 * @return null 이거나 "" 이면 true, 아니면 false
		 */
		isNotEmpty: function (str) {
			return ((null == str) || ("" == str)) ? false : true;
		},

		/**
		 * 바이트로 환산한 문자열의 길이값 반환
		 *
		 * @param str 문자열
		 * @return 문자열의 바이트 길이
		 */
		getBytesLength: function (str) {
			var str_len = str.length;
			var byte_cnt = 0;

			if (str_len != escape(str).length) {
				for (var i = 0; i < str_len; i++) {
					byte_cnt++;

					if (this.isUnicode(str.charAt(i))) {
						byte_cnt++;
					}
				}
			} else {
				byte_cnt = str_len;
			}

			return byte_cnt;
		},

		/**
		 * 문자가 유니코드인지 확인한다.
		 * @param chr 문자
		 * @return 유니코드이면 true, 아니면 false
		 */
		isUnicode: function (chr) {
			return (escape(chr).length == 6);
		},

		/**
		 * 바이트로 환산한 문자열의 길이값 반환
		 *
		 * @param str 문자열
		 * @return 문자열의 UTF-8 바이트 길이
		 */
		getBytesLengthUTF8: function (str) {
			if ((null == str) || (0 == str.length)) {
				return 0;
			}

			var byte_cnt = 0;

			for (var i = 0; i < str.length; i++) {
				byte_cnt += this.charByteSizeUTF8(str.charAt(i));
			}

			return byte_cnt;
		},

		/**
		 * 문자의 유니코드를 분석하여, UTF-8로 변환시 차지하는 byte 수를 리턴한다.
		 *
		 * @param ch 문자
		 * @return 문자의 UTF-8 바이트 길이
		 */
		charByteSizeUTF8: function (ch) {
			if ((null == ch) || (0 == ch.length)) {
				return 0;
			}

			var charCode = ch.charCodeAt(0);

			if (0x00007F >= charCode) {
				return 1;
			} else if (0x0007FF >= charCode) {
				return 2;
			} else if (0x00FFFF >= charCode) {
				return 3;
			} else {
				return 4;
			}
		},

		setComma: function (num) {
			var str = num + "";
			var sep = str.split('.');
			var num_int = sep[0];
			var num_pnt = (1 < sep.length) ? ('.' + sep[1]) : '';
			var rgx = /(\d+)(\d{3})/;

			while (rgx.test(num_int)) {
				num_int = num_int.replace(rgx, '$1' + ',' + '$2');
			}

			return num_int + num_pnt;
		},

		removeComma: function (str) {
			return common.string.replace(str, ",", "");
		},

		/**
		 * mobile의 번호에 자동으로 하이푼(-) 추가한다.
		 * */
		autoHypenPhone: function (str, id) {

			//console.log(id);
			str = str.replace(/[^0-9]/g, '');
			var tmp = '';
			if (str.length < 4) {
				tmp += str;
			} else if (str.length < 7) {
				tmp += str.substr(0, 3);
				tmp += '-';
				tmp += str.substr(3);
			} else if (str.length < 11) {
				tmp += str.substr(0, 3);
				tmp += '-';
				tmp += str.substr(3, 3);
				tmp += '-';
				tmp += str.substr(6);
			} else {
				tmp += str.substr(0, 3);
				tmp += '-';
				tmp += str.substr(3, 4);
				tmp += '-';
				tmp += str.substr(7);
			}
			$('#' + id).val(tmp);
			//return str;
		},

		autoPasteBox: function (str, id) {
			str = str.replace(/[^0-9]/g, '');
			var tmp1 = '';
			var tmp2 = '';
			var tmp3 = '';
			if (str.length >= 9) {
				if (str.length == 9) {
					//02
					tmp1 = str.substr(0, 2);
					tmp2 = str.substr(2, 3);
					tmp3 = str.substr(5);
				} else if (str.length == 10) {
					tmp1 = str.substr(0, 3);
					tmp2 = str.substr(3, 3);
					tmp3 = str.substr(6);
				} else if (str.length == 11) {
					tmp1 = str.substr(0, 3);
					tmp2 = str.substr(3, 4);
					tmp3 = str.substr(7);
				}
				$('#' + id + "1").val(tmp1);
				$('#' + id + "2").val(tmp2);
				$('#' + id + "3").val(tmp3);
			}


			//return str;
		},

		// 패스워드 체크
		checkerPassword: function (fnval) {
			var userPw = fnval;
			var RegExp = /^[a-zA-Z0-9]{8,32}$/; //숫자 영문 체크
			var RegExp2 = /(\w)\1\1\1/; //같은문자 4번이상 사용체크
			if (!RegExp.test(userPw) || userPw.indexOf(' ') > -1) {
				alert('비밀번호는 숫자와 영문자 조합으로 8~32자리를 사용해야 합니다.');
				return true;
			}
			var chk_num = userPw.search(/[0-9]/g);
			var chk_eng = userPw.search(/[a-z]/ig);
			if (chk_num < 0 || chk_eng < 0) {
				alert('비밀번호는 숫자와 영문자를 혼용하여야 합니다.');
				return true;
			}
			if (RegExp2.test(userPw)) {
				alert('비밀번호에 같은 문자를 4번 이상 사용하실 수 없습니다.');
				return true;
			}
			return false;
		},

		/**
		 * 소수점 변환기
		 * @param float_val 변환할 값
		 * @param chk_num 몇번째 소수점
		 */
		float_change: function (float_val, chk_num) {
			var num_format = 10;
			for (var i = 1; i < chk_num; i++) {
				num_format *= 10;
			}
			num_format = parseInt(num_format);
			return parseFloat(Math.round(parseFloat(float_val) * num_format) / num_format);
		},




		dummy: function () {
			// not used
		}
	};

	common.util = {
		//이벤트 막기
		eventStop: function (e) {
			e.stopPropagation();
			e.preventDefault();
		},

		formatterDate: function (dateTime, str, comma) {

			if (dateTime == "") {
				return "";
			} else {
				var dateStr = common.string.replace(dateTime, str, "");
				var year = dateStr.substring(0, 4);
				var month = dateStr.substring(4, 6);
				var day = dateStr.substring(6, 8);
				return year + comma + month + comma + day;
			}


		},

		formatterDateYm: function (dateTime, str, comma) {

			var dateStr = common.string.replace(dateTime, str, "");


			var year = dateStr.substring(0, 4);
			var month = dateStr.substring(4, 6);

			return year + '년 ' + month + '월';
		},


		/**
		 * 해당 년월의 마지막 일자를 구한다.
		 *
		 * @param year 년
		 * @param month 월
		 * @return 마지막 일자
		 */
		lastDateInMonth: function (year, month) {
			var date = new Date(year, month, 0);
			return date.getDate();
		},

		getToday: function () {
			return common.util.getFormattedDate(new Date());
		},

		getFormattedDate: function (date) {
			var nYear = date.getFullYear();
			var nMonth = date.getMonth() + 1;
			var nDate = date.getDate();

			return nYear + "." + ((10 > nMonth) ? "0" : "") + nMonth + "." + ((10 > nDate) ? "0" : "") + nDate;
		},





		imeMode: function (event) {
			var keyCode = (window.netscape) ? event.which : event.keyCode;
			if (229 == keyCode) {
				event.preventDefault();
			}
		},

		onlyDigit: function (event) {
			var keyCode = (window.netscape) ? event.which : event.keyCode;

			if (((48 <= keyCode) && (57 >= keyCode))
				|| ((96 <= keyCode) && (105 >= keyCode))
				|| (109 == keyCode) || (189 == keyCode) || (110 == keyCode) || (190 == keyCode)
				|| (8 == keyCode) || (9 == keyCode) || (45 == keyCode) || (46 == keyCode)
				|| (35 == keyCode) || (36 == keyCode) || (37 == keyCode) || (39 == keyCode)) {
			} else {
				event.preventDefault();
			}
		},

		/**
		 * CK editor를 로드하는 함수
		 *
		 * @param addUrl : get방식으로 인자값들을 넘긴다. (필수 : returnFuncNm='해당 js이름')
		 * @param target : editor를 로딩할 Textarea의 id이다.
		 * */
		editorLoad: function (addUrl, target, w, h) {
			textAreaId = target;
			if (w == 0) {
				CKEDITOR.replace(
					target,
					{
						//enterMode : CKEDITOR.ENTER_P,
						filebrowserUploadUrl: '/fileCommon/ckeditorFileUpload' + addUrl,

						toolbar: /*'full',*/
							[
								['Source', '-', 'Save', 'NewPage', '-', 'Templates', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Print', 'Scayt', 'Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat', 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
								'/',
								['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'Font', 'FontSize', 'TextColor', 'BGColor', 'Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote', 'Link', 'Unlink', 'Anchor', '-', 'About'],
								'/',
								['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Maximize', 'ShowBlocks']
							],


					});
			} else {
				CKEDITOR.replace(
					target,
					{
						//enterMode : CKEDITOR.ENTER_P,
						filebrowserUploadUrl: '/fileCommon/ckeditorFileUpload' + addUrl,
						width: w + "%",
						height: h + "px",

						toolbar: /*'full',*/
							[
								['Source', '-', 'Save', 'NewPage', '-', 'Templates', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Print', 'Scayt', 'Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat', 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
								'/',
								['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', 'Font', 'FontSize', 'TextColor', 'BGColor', 'Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote', 'Link', 'Unlink', 'Anchor', '-', 'About'],
								'/',
								['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Maximize', 'ShowBlocks']
							],

					});
			}

			CKEDITOR.on('dialogDefinition', function (ev) {
				var dialogName = ev.data.name;
				var dialog = ev.data.definition.dialog;
				var dialogDefinition = ev.data.definition;

				if (dialogName == 'image') {
					dialog.on('show', function (obj) {
						this.selectPage('Upload'); //업로드텝으로 시작
					});

					dialogDefinition.removeContents('advanced'); // 자세히탭 제거
					dialogDefinition.removeContents('Link'); // 링크탭 제거
				}


			});

			/*CKEDITOR.on('change', function() {      // Called when the value is changed
				var typeFlag = common.fileCheck.isImage(this.value);

				alert("typefFlag ; " + typeFlag);
			});*/
		},

		dummy: function () {
			// not used
		}
	};

	common.ui = {
		/**
		 * 브라우저의 기본 팝업창을 화면 중앙에 표시한다.
		 *
		 * @param url 팝업창에 오픈할 URL
		 * @param title 팝업창명 (팝업창의 타이틀이 아닌 팝업창 자체의 윈도우 창 이름이다.)
		 * @param width 팝업창의 가로 크기
		 * @param height 팝업창의 세로크기
		 * @param options 팝업창의 부가적인 옵션 스트링
		 */
		popup: function (url, title, width, height, options) {
			var position = common.ui.getCenterXY(width, height);
			if (title == "") { title = "밸류마크"; }
			title = title.replace(/ /gi, "_");
			title = title.replace(/:/gi, "_");
			title = title.replace(/\//gi, "_");
			var popWin = window.open("about:blank", title, "width=" + width + ",height=" + height + ",top=" + position.y + ",left=" + position.x + "," + options);

			if (null == popWin) {
				alert("브라우저의 팝업 차단 기능 혹은 팝업 차단 프로그램이 동작 중입니다.\n\n팝업 차단 기능을 해제한 후 다시 시도해 주십시오.");
			} else {
				popWin = window.open(url, title, "width=" + width + ",height=" + height + ",top=" + position.y + ",left=" + position.x + "," + options);
				popWin.focus();
			}

			return popWin;
		},

		/**
		 * 브라우저의 기본 팝업창을 화면 중앙에 표시한다. (POST 파라미터)
		 *
		 * @param url 팝업창에 오픈할 URL
		 * @param params URL에 전달할 POST 파라미터
		 * @param title 팝업창명 (팝업창의 타이틀이 아닌 팝업창 자체의 윈도우 창 이름이다.)
		 * @param width 팝업창의 가로 크기
		 * @param height 팝업창의 세로크기
		 * @param options 팝업창의 부가적인 옵션 스트링
		 */
		popupPost: function (url, params, title, width, height, options) {
			var position = common.ui.getCenterXY(width, height);
			if (title == "") { title = ""; }
			title = title.replace(/ /gi, "_");
			title = title.replace(/:/gi, "_");
			title = title.replace(/\//gi, "_");
			var popWin = window.open("about:blank", title, "width=" + width + ",height=" + height + ",top=" + position.y + ",left=" + position.x + "," + options);

			if (null == popWin) {
				alert("브라우저의 팝업 차단 기능 혹은 팝업 차단 프로그램이 동작 중입니다.\n\n팝업 차단 기능을 해제한 후 다시 시도해 주십시오.");
			} else {
				// 임시 폼 생성
				var formObj = document.createElement("form");

				document.body.appendChild(formObj);

				// 파라미터 전달용 hidden input 생성
				var inputObj = document.createElement("input");

				inputObj.setAttribute("type", "hidden");
				inputObj.setAttribute("name", "params");
				inputObj.setAttribute("value", params);

				formObj.appendChild(inputObj);

				formObj.setAttribute("id", "postPopupForm");
				formObj.setAttribute("method", "post");
				formObj.setAttribute("action", url);
				formObj.setAttribute("target", title);

				formObj.submit();

				//document.getElementById("postPopupForm").removeNode(true);
				formObj.parentNode.removeChild(formObj);
			}

			return popWin;
		},

		/**
		 * 레이어 팝업창을 화면 중앙에 표시한다.
		 *
		 * @param elLayer 표시할 레이어의 ID
		 * @param elClose 화면닫기에 사용할 엘리먼트의 ID
		 */
		layerPopup: function (elLayer, elClose) {
			$('.layerPopup').fadeIn();

			var winObj = $('#' + elLayer);

			if (winObj.outerHeight() < $(document).height()) {
				winObj.css('margin-top', '-' + (winObj.outerHeight() / 2) + 'px');
			} else {
				winObj.css('top', '0px');
			}

			if (winObj.outerWidth() < $(document).width()) {
				winObj.css('margin-left', '-' + (winObj.outerWidth() / 2) + 'px');
			} else {
				winObj.css('left', '0px');
			}

			var closeObj = $('#' + elClose);
			closeObj.click(function () {
				$('.layerPopup').fadeOut();
			});
		},

		customToast: function (elLayer, alertText) {

			var winObj = $('#' + elLayer);

			$("#alertText").html("&nbsp;&nbsp;&nbsp;" + alertText + "&nbsp;&nbsp;&nbsp;");

			$('.alertLayer').fadeIn();

			setTimeout("$('.alertLayer').fadeOut()", 1000);

		},

		coustomLayerPopup: function (elLayer, elClose, targetId, closeType) {
			$('#' + targetId).fadeIn();

			var winObj = $('#' + elLayer);

			if (winObj.outerHeight() < $(document).height()) {
				winObj.css('margin-top', '-' + (winObj.outerHeight() / 2) + 'px');
			} else {
				winObj.css('top', '0px');
			}

			if (winObj.outerWidth() < $(document).width()) {
				winObj.css('margin-left', '-' + (winObj.outerWidth() / 2) + 'px');
			} else {
				winObj.css('left', '0px');
			}

			var closeObj = $('#' + elClose);
			closeObj.click(function () {
				if ('popup' == closeType) {
					// 레이어를 띄운 팝업까지 닫는다.
					self.close();
				} else {
					// 레이어만 fadeOut
					$('#' + targetId).fadeOut();
				}
			});
		},


		/**
		 * layer popup 로딩
		 * */
		customLayerPop: function (el, layer) {

			$("body").attr("style", "overflow:hidden");
			var temp = $('#' + el);
			var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

			if (bg) {
				$('.' + layer).fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
			} else {
				temp.fadeIn();
			}

			// 화면의 중앙에 레이어를 띄운다.
			if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
			else temp.css('top', '0px');
			if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
			else temp.css('left', '0px');

			temp.find('a.cbtn').click(function (e) {
				if (bg) {
					$('.' + layer).fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
					$("body").attr("style", "");
				} else {
					temp.fadeOut();
					$("body").attr("style", "");
				}
				e.preventDefault();

			});

			$('.' + layer + ' .bg').click(function (e) {	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
				$('.' + layer).fadeOut();
				$("body").attr("style", "");
				e.preventDefault();
			});
		},

		/**
		 * layer popup 로딩
		 * */
		customLayerPopPurpose: function (el, layer) {

			$("body").attr("style", "overflow:hidden");
			var temp = $('#' + el);
			var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

			if (bg) {
				$('.' + layer).fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
			} else {
				temp.fadeIn();
			}

			// 화면의 중앙에 레이어를 띄운다.
			if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
			else temp.css('top', '0px');
			if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
			else temp.css('left', '0px');

			/*temp.find('a.cbtn').click(function(e){
				if(bg){
					$('.'+layer).fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
					$("body").attr("style", "");
				}else{
					temp.fadeOut();
					$("body").attr("style", "");
				}
				e.preventDefault();

			});*/

			/*$('.'+layer+' .bg').click(function(e){	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
				$('.'+layer).fadeOut();
				$("body").attr("style", "");
				e.preventDefault();
			});*/

		},


		customLayerPopTopMargin: function (el, layer, marginTop) {

			$("body").attr("style", "overflow:hidden");
			var temp = $('#' + el);
			var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

			if (bg) {
				$('.' + layer).fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
			} else {
				temp.fadeIn();
			}

			// 화면의 중앙에 레이어를 띄운다.
			temp.css('top', marginTop + 'px');
			if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
			else temp.css('left', '0px');

			temp.find('a.cbtn').click(function (e) {
				if (bg) {
					$('.' + layer).fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
					$("body").attr("style", "");
				} else {
					temp.fadeOut();
					$("body").attr("style", "");
				}
				e.preventDefault();

			});

			$('.' + layer + ' .bg').click(function (e) {	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
				$('.' + layer).fadeOut();
				$("body").attr("style", "");
				e.preventDefault();
			});
		},

		commonLayerPopClose: function () {
			$("body").attr("style", "");
			$('.layer').fadeOut();
		},

		commonLayerPopClose2: function (p) {
			$("body").attr("style", "");
			$(p).fadeOut();
		},

		customLayerPop2: function (el) {

			var temp = $('#' + el);
			var bg = temp.prev().hasClass('bg');	//dimmed 레이어를 감지하기 위한 boolean 변수

			if (bg) {
				$('.layer2').fadeIn();	//'bg' 클래스가 존재하면 레이어가 나타나고 배경은 dimmed 된다.
			} else {
				temp.fadeIn();
			}

			// 화면의 중앙에 레이어를 띄운다.
			if (temp.outerHeight() < $(document).height()) temp.css('margin-top', '-' + temp.outerHeight() / 2 + 'px');
			else temp.css('top', '0px');
			if (temp.outerWidth() < $(document).width()) temp.css('margin-left', '-' + temp.outerWidth() / 2 + 'px');
			else temp.css('left', '0px');

			temp.find('a.cbtn').click(function (e) {
				if (bg) {
					$('.layer2').fadeOut(); //'bg' 클래스가 존재하면 레이어를 사라지게 한다.
				} else {
					temp.fadeOut();
				}
				e.preventDefault();
			});

			$('.layer2 .bg').click(function (e) {	//배경을 클릭하면 레이어를 사라지게 하는 이벤트 핸들러
				$('.layer2').fadeOut();
				e.preventDefault();
			});
		},

		/**
		 * jquery.ui.dialog 를 이용하여 모달 다이얼로그를 표시한다.
		 * jquery.ui.dialog 와 다른 점이 있다면 selector를 옵션에 추가적으로 정의한다.
		 *
		 * @param opts JSON object(jquery.ui.dialog의 option 참조)
		 */
		showModal: function (opts) {
			var internalOpts = $.extend({}, opts, {
				modal: true
			});

			return $(opts.selector).dialog(internalOpts);
		},

		/**
		 * jquery.ui.dialog 를 이용하여 다이얼로그를 표시한다.
		 * jquery.ui.dialog 와 다른 점이 있다면 selector를 옵션에 추가적으로 정의한다.
		 *
		 * @param opts JSON object(jquery.ui.dialog의 option 참조)
		 */
		showDialog: function (opts) {
			return $(opts.selector).dialog(opts);
		},

		/**
		 * AJAX 실행 후 에러가 발생한 경우 에러 내용을 표시한다.
		 *
		 * @param opts JSON object(jquery.ui.dialog의 option 참조)
		 */
		showAjaxError: function (opts) {
			var ctime = new Date().getTime();
			var randomVal = Math.floor(Math.random() * 100) + 1;
			var divId = 'DIV' + ctime + "_" + randomVal;

			var html = "<table width='100%' style='border:1px black solid;border-collapse:collapse'>"
				+ "<tr>"
				+ "<td style='border:1px black solid;' width='100px'>에러 코드</td>"
				+ "<td style='border:1px black solid;'>" + opts.responseCode + "</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td style='border:1px black solid;'>에러 메시지</td>"
				+ "<td>" + opts.responseText + "</td>"
				+ "</tr>"
				+ "<tr>"
				+ "<td style='border:1px black solid;'>시스템 오류 메시지</td>"
				+ "<td style='border:1px black solid;'><pre>" + opts.systemError + "</pre></td>"
				+ "</tr>"
				+ "</table>";

			var newDiv = document.createElement('div');
			newDiv.id = divId;
			document.body.appendChild(newDiv);
			$('#' + divId).html(html);

			var defaultSettings = {
				selector: '#' + divId,
				height: 400,
				width: 600,
				modal: false,
				title: 'Error!'
			};

			this.showModal(defaultSettings);
		},

		/**
		 * 팝업창을 중앙에 위치시키기 위한 좌표를 계산한다.
		 *
		 * 예)
		 *     var position = common.ui.getCenterXY(448, 366);
		 *     window.open(url,'postalCode','width=448,height=366,top=' + position.y + ',left=' + position.x);
		 *
		 * @param width 팝업창의 width
		 * @param height 팝업창의 height
		 * @return 좌표객체 (.y : 좌측 위치, .x : 위쪽 위치)
		 */
		getCenterXY: function (width, height) {
			var point = {};

			point.x = (screen.availWidth / 2) - (width / 2);
			point.y = (screen.availHeight / 2) - (height / 2) - 40;

			return point;
		},

		/**
		 * Element의 좌표와 width, height를 반환
		 *
		 * @param selector 요소 selector
		 * @return 객체 (.left : 좌측 위치, .top : 상단 위치, .width : 폭, .height : 높이)
		 */
		getBounds: function (selector) {
			var ret = {
				left: $(selector).offset().left,
				top: $(selector).offset().top,
				width: $(selector).outerWidth(),
				height: $(selector).outerHeight()
			};

			return ret;
		},




	};

	common.json = {
		/**
		 * 데이타 객체를 쿼리스트링으로 변환한다.
		 *
		 * 예)
		 *     var json = { name : "kim", age : 10 };
		 *     var str  = common.json.toQueryString(json);
		 *
		 *     => str == "&name=kim&age=10"
		 *
		 * @param JSON 데이타 객체
		 * @return 쿼리스트링
		 */
		toQueryString: function (dataObject) {
			var result = "";

			for (var prop in dataObject) {
				result += "&" + prop + "=" + dataObject[prop];
			}

			return result;
		},

		/**
		 *
		 * JSON 객체를 문자열로 변환한다.
		 *
		 * 예)
		 *     var jsonObject = new Object();
		 *
		 *     jsonObject.name = "kim";
		 *     jsonObject.age  = 10;
		 *
		 *     var convertedString = common.json.getJSONString(jsonObject);
		 *
		 *     => convertedString == {name:"kim", age : 10 }
		 *
		 * @param JSON 데이타 객체
		 * @return JSON 문자열
		 */
		getJSONString: function (object) {
			if ( object ) {
				var keys = Object.keys(object);
				for ( var i = 0 ; i < keys.length ; i++ ) {
					var key = keys[i];
					if ( object[key] === null ) {
//						console.log(key, object[key])
						object[key] = undefined;
					}
				}
			}
			return $.toJSON(object);
		},

		dummy: function () {
			// not used
		}
	};

	common.form = {
		/**
		 * 입력된 문자열이 날짜 타입(yyyy.MM.dd)이 맞는지 확인한다.
		 *
		 * @param dateStr 날짜 문자열
		 * @return 날짜 문자열이면 true, 아니면 false
		 */
		validateDate: function (dateStr) {
			dateStr = common.string.replace(dateStr, ".", "");

			if (common.string.isEmpty(dateStr)) {
				return true;
			}

			if (8 != dateStr.length) {
				return false;
			}

			var year = parseInt(dateStr.substring(0, 4), 10);
			var month = parseInt(dateStr.substring(4, 6), 10);
			var date = parseInt(dateStr.substring(6, 8), 10);

			if (year < 1900) {
				return false;
			}

			if ((month < 1) || (month > 12)) {
				return false;
			}

			if ((date < 1) || (date > 31)) {
				return false;
			} else {
				var lastDate = common.util.lastDateInMonth(year, month);

				if (date > lastDate) {
					return false;
				}
			}

			return true;
		},

		validateDate2: function (dateStr) {
			if (dateStr == '') {
				return true;
			}

			dateStr = common.string.replace(dateStr, " ", "");
			if (common.string.isEmpty(dateStr)) {
				return false;
			}

			if (8 != dateStr.length) {
				return false;
			}

			var year = parseInt(dateStr.substring(0, 4), 10);
			var month = parseInt(dateStr.substring(4, 6), 10);
			var date = parseInt(dateStr.substring(6, 8), 10);

			if (year < 1900) {
				return false;
			}

			if ((month < 1) || (month > 12)) {
				return false;
			}

			if ((date < 1) || (date > 31)) {
				return false;
			} else {
				var lastDate = common.util.lastDateInMonth(year, month);

				if (date > lastDate) {
					return false;
				}
			}

			return true;
		},

		/**
		 * input element에 입력한 데이터가 지정한 패턴에 맞는지 검사한다.
		 *
		 * @param 검사할 input element
		 * @return 패턴과 일치하면 true, 아니면 false
		 */
		checkPattern: function (node) {
			var patternStr = $(node).attr("pattern");
			if (!patternStr) {
				return true;
			}

			var nodeVal = $(node).val();
			if (!nodeVal) {
				return true;
			}

			var reg = new RegExp(patternStr);
			var testRes = reg.test(nodeVal);

			if (!testRes) {
				var msg = $(node).data("valid-pattern-message").replace(/\\n/gi, "\n");
				if (msg) {
					alert(msg);
				}

				$(node).focus();
				return false;
			}

			return testRes;
		},

		/**
		 * input element에 입력한 데이터가 숫자인지 검사한다.
		 *
		 * @param 검사할 input element
		 * @return 숫자이면 true, 아니면 false
		 */
		checkNumber: function (node) {
			if ("number" != $(node).data("valid-type")) {
				return true;
			}

			var nodeVal = $(node).val();
			if (!nodeVal) {
				return true;
			}

			if (!common.string.isCurrency(nodeVal)) {
				var msg = $(node).data("valid-number-message").replace(/\\n/gi, "\n");
				if (msg) {
					alert(msg);
				}

				$(node).focus();
				return false;
			}

			nodeVal = nodeVal.replace(new RegExp(",", "g"), "");

			var thisMin = $(node).data("min");
			if (thisMin || ('0' == thisMin)) {
				var fMin = parseFloat(thisMin);
				var fVal = parseFloat(nodeVal);

				if (fVal < fMin) {
					var msg = $(node).data("valid-min-message").replace(/\\n/gi, "\n");
					if (msg) {
						alert(msg);
					}

					$(node).focus();
					return false;
				}
			}

			var thisMax = $(node).data("max");
			if (thisMax || ('0' == thisMax)) {
				var fMax = parseFloat(thisMax);
				var fVal = parseFloat(nodeVal);

				if (fVal > fMax) {
					var msg = $(node).data("valid-max-message").replace(/\\n/gi, "\n");
					if (msg) {
						alert(msg);
					}

					$(node).focus();
					return false;
				}
			}

			return true;
		},

		onlyNumber: function (event) {
			event = event || window.event;
			var keyID = (event.which) ? event.which : event.keyCode;

			if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 9 || keyID == 46 || keyID == 37 || keyID == 39)
				return;
			else
				return false;
		},

		onlyDotNumber: function (event) {
			event = event || window.event;
			var keyID = (event.which) ? event.which : event.keyCode;



			if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 9 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 190 || keyID == 110)
				return;
			else
				return false;
		},


		commaAndNum: function (obj) {

			var n = obj.value;
			n = common.form.onlyNumberCheck(n);
			var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
			n += '';                          // 숫자를 문자열로 변환
			while (reg.test(n))
				n = n.replace(reg, '$1' + ',' + '$2');
			obj.value = n;
		},

		commaAndNumAndMinus: function (obj) {

			var n = obj.value;
			n = common.form.onlyNumberMinusCheck(n);
			var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
			n += '';                          // 숫자를 문자열로 변환
			while (reg.test(n))
				n = n.replace(reg, '$1' + ',' + '$2');
			obj.value = n;
		},


		unNumberFormat: function (num) {
			return (num.replace(/\,/g, ""));
		},

		onlyNumberCheck: function (objVal) {
			var replaceNum = common.form.unNumberFormat(objVal);
			var preNum = replaceNum;
			if (/[^0123456789]/g.test(replaceNum)) {
				preNum = "";
				for (var i = 0; i < (replaceNum.length - 1); i++) {
					preNum = preNum + replaceNum.charAt(i);
				}
				// alert("숫자가 아닙니다.\n\n0-9의 정수만 허용합니다.");
			}

			if (replaceNum == 0) {
				if (preNum != "") {
					alert("첫자리 0은 허용하지 않습니다.");
				}
				preNum = "";
			}
			return preNum;
		},

		onlyNumberMinusCheck: function (objVal) {
			var replaceNum = common.form.unNumberFormat(objVal);
			var preNum = replaceNum;
			if (/[^0123456789\-]/g.test(replaceNum)) {
				preNum = "";
				for (var i = 0; i < (replaceNum.length - 1); i++) {
					preNum = preNum + replaceNum.charAt(i);
				}
				// alert("숫자가 아닙니다.\n\n0-9의 정수만 허용합니다.");
			}

			if (replaceNum == 0) {
				if (preNum != "") {
					alert("첫자리 0은 허용하지 않습니다.");
				}
				preNum = "";
			}
			return preNum;
		},

		/**
		 * input element에 입력한 문자열의 길이가 허용 범위내에 존재하는지 검사한다.
		 *
		 * @param 검사할 input element
		 * @return 문자열의 길이가 허용 범위 내이면 true, 아니면 false
		 */
		checkLength: function (node) {
			if ("length" != $(node).data("valid-type")) {
				return true;
			}

			var nodeVal = $(node).val();
			if (!nodeVal) {
				return true;
			}

			var thisMin = $(node).data("min-length");
			if (thisMin) {
				var fMin = parseInt(thisMin, 10);
				var fVal = nodeVal.length;
				var isAdd = $(node).data("append-current") ? ('Y' == $(node).data("append-current")) : false;

				if (fVal < fMin) {
					var msg = $(node).data("valid-min-length-message").replace(/\\n/gi, "\n");
					if (msg) {
						if (isAdd) {
							msg += "\n현재 길이 : " + fVal + "글자";
						}

						alert(msg);
					}

					$(node).focus();
					return false;
				}
			}

			var thisMax = $(node).data("max-length");
			if (thisMax) {
				var fMax = parseInt(thisMax, 10);
				var fVal = nodeVal.length;
				var isAdd = $(node).data("append-current") ? ('Y' == $(node).data("append-current")) : false;

				if (fVal > fMax) {
					var msg = $(node).data("valid-max-length-message").replace(/\\n/gi, "\n");
					if (msg) {
						if (isAdd) {
							msg += "\n현재 길이 : " + fVal + "글자";
						}

						alert(msg);
					}

					$(node).focus();
					return false;
				}
			}

			return true;
		},

		/**
		 * input element에 입력한 데이터가 지정한 날짜 패턴에 맞는지 검사한다.
		 *
		 * @param 검사할 input element
		 * @return 날짜 패턴과 일치하면 true, 아니면 false
		 */
		checkDate: function (node) {
			if ("date" != $(node).data("valid-type")) {
				return true;
			}

			var nodeVal = $(node).val();
			if (!nodeVal) {
				return true;
			}

			if (!this.validateDate(nodeVal)) {
				var msg = $(node).data("valid-date-message").replace(/\\n/gi, "\n");
				if (msg) {
					alert(msg);
				}

				$(node).focus();
				return false;
			}

			return true;
		},

		/**
		 * input element에 입력한 데이터가 URL 패턴에 맞는지 검사한다.
		 *
		 * @param 검사할 input element
		 * @return URL 패턴과 일치하면 true, 아니면 false
		 */
		checkURL: function (node) {
			if ("url" != $(node).data("valid-type")) {
				return true;
			}

			var filter = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

			var nodeVal = $(node).val();
			if (!nodeVal) {
				return true;
			}

			if (!filter.test(nodeVal)) {
				var msg = $(node).data("valid-url-message").replace(/\\n/gi, "\n");
				if (msg) {
					alert(msg);
				}

				$(node).focus();
				return false;
			}

			return true;
		},

		/**
		 * input element에 입력한 데이터가 이메일주소 패턴에 맞는지 검사한다.
		 *
		 * @param 검사할 input element
		 * @return 이메일주소 패턴과 일치하면 true, 아니면 false
		 */
		checkEmail: function (node) {
			if ("email" != $(node).data("valid-type")) {
				return true;
			}

			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			var nodeVal = $(node).val();

			if (!nodeVal) {
				return true;
			}

			if (!filter.test(nodeVal)) {
				var msg = $(node).data("valid-email-message").replace(/\\n/gi, "\n");
				if (msg) {
					alert(msg);
				}

				$(node).focus();

				return false;
			}

			return true;
		},

		/**
		 * 전달한 데이터가 이메일주소 패턴에 맞는지 검사한다.
		 *
		 * @param 검사할 이메일주소
		 * @return 이메일주소 패턴과 일치하면 true, 아니면 false
		 */
		checkEmailVal: function (email, message) {
			var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (!filter.test(email)) {
				if (message) {
					alert(message);
				}
				return false;
			}

			return true;
		},

		/**
		 * 전달한 데이터가 주민등록번호 패턴에 맞는지 검사한다.
		 *
		 * @param 검사할 주민등록번호
		 * @return 주민등록번호 패턴과 일치하면 true, 아니면 false
		 */
		checkRegIdValue: function (regId, message) {
			if ((null == regId) || ("" == regId)) {
				if (message) {
					alert(message);
				}
				return false;
			}

			regId = regId.replace(/-/gi, '');

			if (13 != regId.length) {
				return false;
			}

			var month = regId.substring(2, 4);
			var date = regId.substring(4, 6);
			var sex = regId.substring(6, 7);

			var valid = true;

			if ((0 < month) && (13 > month)) {
				if (2 == month) {
					valid = (29 >= date);
				} else if ((4 == month) || (6 == month) || (9 == month) || (11 == month)) {
					valid = (30 >= date);
				} else {
					valid = (31 >= date);
				}
			} else {
				valid = false;
			}

			if (valid) {
				valid = (9 == sex) || (0 == sex) || (1 == sex) || (2 == sex) || (3 == sex) || (4 == sex);
			}

			if (valid) {
				if ((3 == sex) || (4 == sex)) {
					valied = parseInt(regId.substring(0, 6), 10) <= parseInt(common.util.getToday().substring(2, 8), 10);
				}
			}

			if (!valid) {
				if (message) {
					alert(message);
				}
				return valid;
			}

			var sum = 0;

			for (var i = 0; i < 12; i++) {
				sum += Number(regId.substr(i, 1)) * ((i % 8) + 2);
			}

			if (((11 - (sum % 11)) % 10) != Number(regId.substr(12, 1))) {
				if (message) {
					alert(message);
				}
				return false;
			}

			return true;
		},

		/**
		 * 전달한 데이터가 사업자등록번호 패턴에 맞는지 검사한다.
		 *
		 * @param 검사할 사업자등록번호
		 * @return 사업자등록번호 패턴과 일치하면 true, 아니면 false
		 */
		checkBizIdValue: function (bizId, message) {
			if ((null == bizId) || ("" == bizId)) {
				if (message) {
					alert(message);
				}
				return false;
			}

			var checkId = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
			var checkSum = 0;
			var remainder = 0;

			bizId = bizId.replace(/-/gi, '');

			if (10 != bizId.length) {
				return false;
			}

			for (var i = 0; i < 9; i++) {
				checkSum += checkId[i] * parseInt(bizId.charAt(i), 10);
			}

			checkSum += Math.floor((parseInt(bizId.charAt(8), 10) * 5) / 10);
			remainder = 10 - (checkSum % 10);

			if (10 <= remainder) {
				remainder = 0;
			}

			if (remainder != parseInt(bizId.charAt(9), 10)) {
				if (message) {
					alert(message);
				}
				return false;
			}

			return true;
		},

		/**
		 * input element에 입력한 데이터가 타겟 input element에 입력한 데이터와 일치하는지 검사한다.
		 *
		 * @param 검사할 input element
		 * @return 두 입력 데이터가 일치하면 true, 아니면 false
		 */
		match: function (node) {
			var matchTarget = $(node).data("valid-match-id");
			if (!matchTarget) {
				return true;
			}

			if (("text" != $(node).attr("type")) && ("password" != $(node).attr("type"))) {
				return true;
			}

			if (!$("#" + matchTarget)) {
				return true;
			}

			var targetVal = $("#" + matchTarget).val();
			if (!targetVal) {
				var msg = $(node).data("valid-match-message").replace(/\\n/gi, "\n");
				if (msg) {
					alert(msg);
				}

				$(node).focus();
				return false;
			} else {
				if (targetVal == $(node).val()) {
					return true;
				}

				var msg = $(node).data("valid-match-message").replace(/\\n/gi, "\n");
				if (msg) {
					alert(msg);
				}

				$(node).focus();
				return false;
			}

			return true;
		},

		/**
		 * 휴대폰, 일반 전화번호에 대한 검사
		 * selectbox - input - input 에 대한 검사로 selectbox에 대한 정규식 검증을 별도로 하지 않는다.
		 *
		 * @param 검사할 input select
		 * @return select를 제외한 input text element 입력데이터가 정규식 검사를 통과하면 ture, 아니면 false
		 */
		checkTelNo: function (node) {
			if (("SELECT" != $(node).get(0).tagName) || !node) {
				return true;
			}

			var linkTarget01 = $(node).data("valid-link-id01");
			var linkTarget02 = $(node).data("valid-link-id02");

			if (!linkTarget01 || !linkTarget02) {
				return true;
			}

			if ('' == $(node).val()) {
				return true;
			}

			if (!$(':input[id=' + linkTarget01 + ']')) {
				alert(linkTarget01 + " 요소가 없습니다.");
				return false;
			}

			if (!$(':input[id=' + linkTarget02 + ']')) {
				alert(linkTarget02 + " 요소가 없습니다.");
				return false;
			}

			var linkTarget01Val = $(':input[name=' + linkTarget01 + ']').val();
			var linkTarget02Val = $(':input[name=' + linkTarget02 + ']').val();

			if ((undefined == linkTarget01Val) || ('' == linkTarget01Val)) {
				var msg = $(node).data("valid-link-message").replace(/\\n/gi, "\n");
				if (msg) {
					alert(msg);
				}
				$('#' + linkTarget01).focus();
				return false;
			}

			if ((undefined == linkTarget02Val) || ('' == linkTarget02Val)) {
				var msg = $(node).data("valid-link-message").replace(/\\n/gi, "\n");
				if (msg) {
					alert(msg);
				}
				$('#' + linkTarget02).focus();
				return false;
			}

			var checkNo = linkTarget01Val + '-' + linkTarget02Val;
			var filter = /^[0-9]{3,4}-[0-9]{4}$/;

			if (!filter.test(checkNo)) {
				var msg = $(node).data("valid-link-message").replace(/\\n/gi, "\n");
				if (msg) {
					alert(msg);
				}

				$(node).focus();
				return false;
			}

			return true;
		},

		/**
		 * 전달한 데이터가 휴대폰번호 패턴에 맞는지 검사한다.
		 *
		 * @param 검사할 휴대폰번호
		 * @param 휴대폰번호 패턴과 불일치할 경우 나타낼 메시지
		 * @return 휴대폰번호 패턴과 일치하면 true, 아니면 false
		 */
		checkMobileNoValue: function (mobileNo, message) {
			var filter = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
			if (!filter.test(mobileNo)) {
				if (message) {
					alert(message);
				}
				return false;
			}
			return true;
		},

		/**
		 * HTML FORM의 input 요소의 값을 검증한다.
		 * 이 함수는 폼 요소를 서버로 전송하기 전에 폼 요소에 정의되어 있는 속성값을 기준으로 폼 요소의 입력값을 검증한다.
		 * 오류가 있으면 alert창을 표시하고 false를 리턴한다. true이면 다음 단계로 진행한다.
		 *
		 * 아래의 코드는 모든 INPUT 요소를 검증하며, 오류가 있으면 더이상 진행하지 않는다.
		 *
		 *     if (!common.form.validate(":input")) {
		 *         return;
		 *     }
		 *
		 * 폼 요소에 사용할 속성값은 다음과 같다.
		 *
		 *  1. 필수값 체크
		 *       required                    : 이 속성이 기술되면 필수값이다.
		 *       data-valid-required-message : 필수값이 없을 때 표시할 메시지
		 *
		 *     예)
		 *         &lt;input type="text" id="userId"
		 *             required="required"
		 *             data-valid-required-messagege="ID를 입력해 주십시오."
		 *         />
		 *
		 *  2. 날짜 입력값 체크
		 *       data-valid-type         : date
		 *       data-valid-date-message : 입력값이 없을 때 나타낼 메시지
		 *
		 *     예)
		 *         &lt;input type="text" id="finishDate"
		 *              required="required"
		 *              data-valid-type="date"
		 *              data-valid-required-message="종료일을 선택해 주십시오."
		 *              data-valid-date-message="종료일이 잘못 선택되었습니다." />
		 *
		 *  3. 두 요소의 값이 일치하는지 체크(Match)
		 *       data-valid-match-id      : 비교할 요소의 아이디 (Target ID)
		 *       data-valid-match-message : 입력값이 서로 다를 때 표시할 메시지
		 *
		 *     예)
		 *         비밀번호 :
		 *         &lt;input type="password" id="password1"
		 *              required="required"
		 *              data-valid-required-message="비밀번호를 입력해 주십시오."
		 *         />
		 *
		 *         비밀번호확인 :
		 *         &lt;input type="password" id="password2"
		 *              required="required"
		 *              data-valid-required-message="비밀번호를 입력해 주십시오."
		 *              data-valid-match-id="password1"
		 *              data-valid-match-message="비밀번호 확인값이 일치하지 않습니다."
		 *         />
		 *
		 *  4. 숫자값의 최소값, 최대값 확인
		 *       data-valid-type           : number
		 *       data-valid-number-message : 데이터 형식이 다를 때 표시할 메지시
		 *       data-min                  : 최소값
		 *       data-max                  : 최대값
		 *       data-valid-min-message    : min값 보다 적을 때 표시할 메시지
		 *       data-valia-max-message    : max값 보다 많을 때 표시할 메시지
		 *
		 *    예)
		 *         &lt;input type="text" id="age"
		 *             data-valid-type="number"
		 *             data-min="30"
		 *             data-max="80"
		 *             data-valid-min-message="입력값이 너무 작습니다.\n입력값은 30보다 크거나 같아야 합니다."
		 *             data-valid-max-message="입력값이 너무 큽니다.\n입력값은 80보다 작거나 같아야 합니다."
		 *         />
		 *
		 *  5. 패턴을 이용한 입력값 검증
		 *       data-valid-type            : pattern
		 *       pattern                    : 패턴을 입력하기 위한 속성
		 *       data-valid-pattern-message : 패턴과 맞지 않을 때 표시할 메시지
		 *
		 *     예)
		 *          &lt;input type="text" id="userId"
		 *              data-valid-type="pattern"
		 *              pattern="ab+c"
		 *              data-valid-pattern-message="입력값은 ab로 시작하고 c로 끝나야 합니다."
		 *          />
		 *
		 *  6. 문자열의 최소길이, 최대길이 확인 (글자 단위)
		 *       data-valid-type               : length
		 *       data-min-length               : 최소길이
		 *       data-max-length               : 최대길이
		 *       data-valid-min-length-message : min-length 보다 짧을 때 표시할 메시지
		 *       data-valid-max-length-message : max-length 보다 길 때 표시할 메시지
		 *       data-append-current           : 메시지 출력시 현재의 글자수를 표시할지 여부(Y/N)
		 *
		 *    예)
		 *         &lt;input type="text" id="age"
		 *             data-valid-type="length"
		 *             data-min-length="30"
		 *             data-max-length="80"
		 *             data-valid-min-message="입력값의 길이가 너무 짧습니다.\n입력값은 30글자보다 길거나 같아야 합니다."
		 *             data-valid-max-message="입력값의 길이가 너무 깁니다.\n입력값은 80글자보다 짧거나 같아야 합니다."
		 *             data-append-current="Y"
		 *         />
		 *
		 *  7. 휴대폰 및 전화번호 체크
		 *  	data-valid-link-name01			: 휴대폰 및 전화번호의 두번째 항목 이름
		 *  	data-valid-link-name02			: 휴대폰 및 전화번호의 세번째 항목 이름
		 *  	data-valid-link-message			: 첫번째 항목(select)을 제외한 나머지 항목에 대해 정규식이 맞지 않으면 표시할 메시지
		 *
		 * 	  예)
		 *          &lt;select name="mblNo01" id="mblNo01" class="ml8"
		 *              data-valid-link-id01="mblNo2"
		 *              data-valid-link-id02="mblNo3"
		 *              data-valid-link-message="휴대폰 번호를 형식에 맞게 입력해 주십시오."
		 *          >&lt;/select>
		 *          -&lt;input type="text" name="mblNo02" id="mblNo02" title="휴대폰번호" class="iTxt ml8" style="width:30px;"
		 *              maxlength="4"
		 *              onkeydown="common.util.onlyDigit(event);" />
		 *          -&lt;input type="text" name="mblNo03" id="mblNo03" title="휴대폰번호" class="iTxt ml8" style="width:30px;"
		 *              maxlength="4"
		 *              onkeydown="common.util.onlyDigit(event);" />
		 *
		 *  8. 이메일 주소를 가지고 체크하고자 할때 (node아님)
		 *  	var email = $('#mail01').val() + '@' + $('mail02').val();
		 *  	if (!common.form.checkEmailVal(email, "이메일 주소를 형식에 맞게 입력해 주십시오.")) {
		 *  		return false;
		 *  	}
		 *
		 * @param selector jQuery의 Selector
		 */
		validate: function (selector) {
			var checkStatus = true;
			$(selector).not("[type=image],[type=submit],[type=button]").each(function () {
				// Check the required attribute
				if (undefined != $(this).attr("required")) {
					if ($(this).hasClass("ckeditor")) {
						var editorData = CKEDITOR.instances[$(this).attr('id')].getData().trim();
						editorData = common.string.replace(editorData, "\r", "");
						editorData = common.string.replace(editorData, "\n", "");
						editorData = common.string.replace(editorData, "\t", "");

						if (("" == editorData)
							|| ("<html><head><title></title></head><body></body></html>" == editorData)) {
							var msg = $(this).data("valid-required-message").replace(/\\n/gi, "\n");
							if (msg) {
								alert(msg);
							}

							CKEDITOR.instances[$(this).attr('id')].focus();
							checkStatus = false;

							return checkStatus;
						}
					} else {
						if ((null == $(this).val()) || ("" == $(this).val())) {
							var msg = $(this).data("valid-required-message").replace(/\\n/gi, "\n");
							if (msg) {
								alert(msg);
							}

							$(this).focus();
							checkStatus = false;

							return checkStatus;
						}
					}
				}

				if (!common.form.checkDate(this)) {
					checkStatus = false;
					return checkStatus;
				}

				if (!common.form.match(this)) {
					checkStatus = false;
					return checkStatus;
				}

				if (!common.form.checkEmail(this)) {
					checkStatus = false;
					return checkStatus;
				}

				if (!common.form.checkURL(this)) {
					checkStatus = false;
					return checkStatus;
				}

				if (!common.form.checkNumber(this)) {
					checkStatus = false;
					return checkStatus;
				}

				if (!common.form.checkLength(this)) {
					checkStatus = false;
					return checkStatus;
				}

				if (!common.form.checkPattern(this)) {
					checkStatus = false;
					return checkStatus;
				}

				// 추가
				if (!common.form.checkTelNo(this)) {
					checkStatus = false;
					return checkStatus;
				}
			});

			return checkStatus;
		},

		toJSON: function (values) {
			var json = {};

			$.each(values, function () {
				var value = (null != this.value) ? this.value : '';

				if (null != json[this.name]) {
					if (!json[this.name].push) {
						json[this.name] = [json[this.name]];
					}

					json[this.name].push(value);
				} else {
					json[this.name] = value;
				}
			});

			return json;
		},
		/* JOSN 형태의 파라미터를   FORM POST 형태로 SUBMIT REQEUST JSON 과 동일**/
		formJSONsubmit: function (params, url) {
			if (!params) return;

			var formObj = document.createElement("form");
			document.body.appendChild(formObj);

			var inputObj = document.createElement("input");

			inputObj.setAttribute("type", "hidden");
			inputObj.setAttribute("name", "_REQ_JSON_OBJECT_");
			inputObj.setAttribute("value", common.json.getJSONString(params));

			formObj.appendChild(inputObj);

			formObj.setAttribute("id", "hidden");
			formObj.setAttribute("method", "post");
			formObj.setAttribute("action", url);

			formObj.submit();
		},
		dummy: function () {
			// not used
		}
	};

	common.http = {
		ajax: function (opts) {
			$('button').prop('disabled', true);
			// default options
			var settings = {
				url: "",
				target: document.body,
				errorProcType: "",				// "alert" 에러처리 방식 alert, html
				data: {},					// 요청 데이터
				success: function () {			// 응답성공시 실행할 함수
				},
				error: function (xhr, statusText) {	// 에러발생시 실행할 함수
				},
				dataType: "json",				// 응답데이터 유형  json, xml, html, script, json, jsonp, text
				useWrappedObject: true,					// 응답결과를 ResponseData 객체에 넣어서 사용할지 여부
				type: "post",				// 전송방법 기본값  post, (get/post)
				sendDataType: "undefined",			// 전송 데이터 타입 json, (json/string)
				animation: true,				// 로딩 이미지 표시
				async: true,
				isErrorMessageAlert : false					// error, complete에서 에러 alert 했는지 여부.
			};

			$.extend(settings, opts);
			// 서버 프레임워크에서 에러발생시 처리방법을 결정하기 위해 _REQ_DATA_TYPE_ 에 dataType을 값을 설정함.
			// 서버에서 useWrappedObject가 true인 경우에는 ResponseData.class를 사용하여 오류정보를 반환함.
			if (0 <= settings.url.indexOf('?')) {
				settings.url = common.string.trim(settings.url)
					+ '&_REQ_DATA_TYPE_=' + settings.dataType + "&_USE_WRAPPED_OBJECT_=" + settings.useWrappedObject;
			} else {
				settings.url = common.string.trim(settings.url)
					+ '?_REQ_DATA_TYPE_=' + settings.dataType + "&_USE_WRAPPED_OBJECT_=" + settings.useWrappedObject;
			}






			// make the request data.
			var sendData = (typeof settings.data == "object") ? common.json.getJSONString(settings.data) : settings.data;

			if (settings.sendDataType == "json") {
				sendData = "_REQ_JSON_OBJECT_=" + encodeURIComponent(sendData);
			} else {
				sendData = common.json.toQueryString(settings.data);

				if ("post" == settings.type) {
					sendData = sendData.replace(/[+]/g, '%2B');
				}
			}

			// make the default timeout value.
			var timeoutValue = (settings.timeout) ? settings.timeout : 100000;	// default 10초


			// make a loading image IE대응
			var ctime = new Date().getTime();
			var randomVal = Math.floor(Math.random() * 100) + 1;
			var divId = "DIV" + ctime + "_" + randomVal;


			var options = {
				url: settings.url,		// 요청URL
				async: settings.async,	// 동기식
				data: sendData,
				beforeSend: function () {
					if (!settings.animation) {
						return;
					}

					// before sending a request, display the loading image.
					var target = (typeof settings.target == "string") ? $(settings.target).get(0) : settings.target;
					var rect = common.ui.getBounds(target);
					var offset = $(target).offset();


					if (agent.indexOf("msie") != -1) {
						var newDiv = document.createElement("div");
						newDiv.id = divId;
						document.body.appendChild(newDiv);
						$("#" + divId).css("visibility", "visible");
						$("#" + divId).css("top", offset.top);
						$("#" + divId).css("left", offset.left);
						$("#" + divId).css("position", "absolute");
						$("#" + divId).css("width", '100%');
						$("#" + divId).css("height", '100%');
						$("#" + divId).css("text-align", "center");
						$("#" + divId).css("background-color", "#FFF");
						$("#" + divId).css("opacity", "0.50");
						$("#" + divId).css("filter", "alpha(opacity=50)");
						$("#" + divId).css("z-index", "3000");

						$("#" + divId).css({
							//backgroundImage	: "url('http://storege.valuemark.co.kr/image/icon_loading.gif')",
							backgroundImage: "url('/images/icon_loading.gif')",
							backgroundRepeat: "no-repeat",
							backgroundPosition: "50% 50%",
						});
						$("#" + divId).css("background-size", "100px");
					} else {
						Pace.restart();
					}


				},
				success: function (responseData, statusText) {

					$("#" + divId).remove();	// delete the loading image.
					// 응답데이타가 없다면 아무것도 하지 않음.
					if (!responseData) {
						return;
					}

					// server에서 json으로 되돌리면 object로 인식하는 경우
					if (settings.useWrappedObject) {
						var resObject = responseData;

						//server framework에서 반환하는 구조확인
						if (resObject.responseCode) {
							if (parseInt(resObject.responseCode) == 0) {
								if (settings.success) {
									settings.success(resObject, statusText);
								}
							} else if (parseInt(resObject.responseCode) == 500) {
								if (settings.errorProcType == "alert") {
									//alert("시스템 오류입니다.\n" + resObject.systemError);
									common.ui.showAjaxError(resObject);
									settings.error(resObject, statusText);
								}
							} else {
								if (settings.errorProcType == "alert") {
									//alert("오류코드:" + resObject.responseCode + "\n"
									//        + "오류메시지:" + resObject.responseText);
									common.ui.showAjaxError(resObject);
									settings.error(resObject, statusText);
								}
							}
						} else {
							settings.success(responseData, statusText); // callback 함수 직접 호출
						}
					} else {
						if (settings.dataType == "json") {
							// JSON 문자열을 JSON 객체로 변환
							var resObject = window["eval"]("(" + responseData + ")");

							//server framework에서 반환하는 구조확인
							if (resObject.responseCode) {
								if (parseInt(resObject.responseCode) == 0) {
									if (settings.success) {
										settings.success(resObject, statusText);
									}
								} else if (parseInt(resObject.responseCode) == 500) {
									if (settings.errorProcType == "alert") {
										//alert("시스템 오류입니다.\n" + resObject.systemError);
										common.ui.showAjaxError(resObject);
										settings.error(resObject, statusText);
									}
								} else {
									if (settings.errorProcType == "alert") {
										//alert("오류코드:" + resObject.responseCode + "\n"
										//        + "오류메시지:" + resObject.responseText);
										common.ui.showAjaxError(resObject);
										settings.error(resObject, statusText);
									}
								}
							} else {
								// JSON문자열을 callback 함수로 bypass.
								settings.success(responseData, statusText);
							}
						} else if (settings.dataType == "xml") {
							//  XML로 통신하는 방식은 기본적으로 지원하지 않음.
							//  callback 함수로 bypass
							if (settings.success) {
								settings.success(responseData, statusText);
							} else {
								settings.error(responseData, statusText);
							}
						} else { // html, text
							// text, html 처리방법은 응답결과를 그대로 callback 함수로 패스
							if (settings.success) {
								settings.success(responseData, statusText);
							} else {
								settings.error(responseData, statusText);
							}
						}
					}


				},
				// 통신오류
				error: function (xhr, statusText) {
					$("#" + divId).remove();
					//Pace.stop();
					if (settings.error) {
						if (settings.errorProcType == "alert") {
							var errCode = xhr.status;
							var errMsg = "";

							switch (xhr.status) {
								case 0:
									errMsg = "서버에 접속할 수 없습니다.";
									break;
								case 404:
									errMsg = "요청하신 페이지를 찾을 수 없습니다.";
									break;
								case 500:
									errMsg = "서버에서 오류가 발생했습니다.";
									break;
								case 408:
									errMsg = "서버로 부터 응답이 없습니다(Timeout).";
									break;
								default:
									errMsg = "알수없는 오류가 발생했습니다.";
									break;
							}

							var resObject = {
								reqURL: settings.url,
								responseCode: errCode,
								responseText: errMsg,
								systemError: '수신된 서버의 오류 메시지가 없습니다.'
							};

							settings.isErrorMessageAlert = true;
							common.ui.showAjaxError(resObject);
							settings.error(xhr, statusText);
						}
					}
					if ( !settings.isErrorMessageAlert && xhr.status == 500 ) {
						settings.isErrorMessageAlert = true;
						var response = $.parseJSON(xhr.responseText);
						if ( opts.error ) {
							// 호출한 함수가 error 처리 함수가  있으면 메시지 안함.
							opts.error(xhr, statusText, response);
						} else {
							if ( response.message ) {
//								alert('[common error()] 호출할때 option으로 error 함수 없음. 공통alert\n' + response.errorHandler + response.message);
								alert(response.message);
							}
						}

					}
				},
				type: settings.type, // POST / GET
				timeout: timeoutValue,
				complete: function (xhr) {
					setTimeout(function() {
						$('button').prop('disabled', false);
					});
					var errMsg = "";
					switch (xhr.status) {
						case 0:
							errMsg = "서버에 접속할 수 없습니다.";
							break;
						case 500:
							errMsg = "서버에서 오류가 발생했습니다.";
							break;
						case 408:
							errMsg = "서버로 부터 응답이 없습니다(Timeout).";
							break;
						case 401:
							//errMsg = "로그인이 필요합니다.";
							location.reload();
							break;
						default:
							errMsg = "서버에서 오류가 발생했습니다.";
							break;
					}
//					if (xhr.status != "200") {
//						alert(errMsg);
//					}
					if (!settings.isErrorMessageAlert && xhr.status != "200") {
						var response = $.parseJSON(xhr.responseText);
						if (response.message) {
//							alert('[common complete()]\n' + response.errorHandler + response.message);
							alert(response.message);
							return;
						}
						alert(errMsg);

					}
				}
			};

			$.ajax(options);
		},

		dummy: function () {
			// not used
		},

		//location.href post request
		sendFormData: function (opts) {
			// default options
			var settings = {
				url: "",
				target: document.body,
				data: {},					// 요청 데이터
				dataType: "json",				// 응답데이터 유형  json, xml, html, script, json, jsonp, text
				type: "post",				// 전송방법 기본값  post, (get/post)
			};
			$.extend(settings, opts);

			var sendData = (typeof settings.data == "object") ? common.json.getJSONString(settings.data) : settings.data;
			sendData = "_REQ_DATA_TYPE_=" + settings.dataType + "&_REQ_JSON_OBJECT_=" + encodeURIComponent(sendData) + "&_USE_WRAPPED_OBJECT_=false";
			location.href = settings.url + "?" + sendData;
		},

	};

	common.cookie = {
		setCookie: function (name, value, expires, path, domain, secure) {
			// Set-Cookie 구조
			// name=value;expires=date;path=path;domain=domain_name;secure

			// set time, it's in milliseconds
			var today = new Date();

			/*
				if the expires variable is set, make the correct
				expires time, the current script below will set
				it for x number of days, to make it for hours,
				delete * 24, for minutes, delete * 60 * 24
			*/
			if (expires) {
				expires = expires * 24 * 60 * 60 * 1000;
			}

			var expires_date = new Date(today.getTime() + expires);

			document.cookie = name + "=" + escape(value)
				+ ((expires) ? ";expires=" + expires_date.toGMTString() : "")
				+ ((path) ? ";path=" + path : ";path=/")
				+ ((domain) ? ";domain=" + domain : "")
				+ ((secure) ? ";secure" : "");
		},

		getCookie: function (name) {
			var i, paramName, paramValue;
			var cookies = document.cookie.split(";");

			for (i = 0; i < cookies.length; i++) {
				paramName = cookies[i].substr(0, cookies[i].indexOf("="));
				paramValue = cookies[i].substr(cookies[i].indexOf("=") + 1);

				paramName = paramName.replace(/^\s+|\s+$/g, "");

				if (name == paramName) {
					return unescape(paramValue);
				}
			}
		},

		deleteCookie: function (name, path, domain) {
			var today = new Date();

			if (common.cookie.getCookie(name)) {
				today.setTime(today.getTime(-1));

				document.cookie = name + "=" + ((path) ? ";path=" + path : "")
					+ ((domain) ? ";domain=" + domain : "")
					+ ";expires=" + today.toGMTString();
			}
		},

		dummy: function () {
			// not used
		}
	};

	common.paging = {
		// 표시형식 :
		//    처음    이전    (1) 2 3 4 5 6 7 8 9 10   다음   마지막
		//    First   Prev    Selected                 Next    Last
		options: {
			divId: "paging",
			pageObject: "",
			funcName: "",	// 링크 클릭시 호출할 함수 이름 (주의 : 함수 포인터 아님)
			pageNo: 1,	// 현재 선택된 페이지 번호
			listBlock: 10,	// 목록의 출력 갯수
			pageBlock: 10,	// 페이지 목록의 수
			totalCount: 0,	// 전체 데이터 행의 수
			showImage: true	// 이미지 표시여부(default : true)
		},

		getStartPageNo: function (pageNo, listBlock) {
			return (pageNo * listBlock) - listBlock + 1;
		},

		getTotalPageCount: function (totalCount, listBlock) {
			var count = Math.floor(totalCount / listBlock);

			if (0 < totalCount % listBlock) {
				count++;
			}

			return count;
		},

		getNavigator: function (settings) {
			var opts = $.extend(common.paging.options, settings);
			// pageBlockNo는 0 부터 시작.
			// page block는 "1 2 3 4 5 6 7 8 9 10"과 같이 표시할 페이지 목록의 갯수를 묶는 단위.
			// 10개씩 페이지 블럭을 묶고 전체 페이지가 13개라고 하면 2개의 page block이 생긴다.
			// 첫번째 페이지 블럭은 0, 그다음은 1이다.
			var totalPageCnt = (common.paging.getTotalPageCount(opts.totalCount, opts.listBlock) == 0) ? 1 : common.paging.getTotalPageCount(opts.totalCount, opts.listBlock);		// 전체 페이지수


			var liPrevPageNo = opts.pageNo - 1;
			var liNextPageNo = opts.pageNo + 1;

			var pageBlockNo = Math.floor((opts.pageNo - 1) / opts.pageBlock);		// 선택페이지의 블럭 번호
			var lastPageBlockNo = Math.floor(totalPageCnt / opts.pageBlock);	// 마지막 페이지블럭 번호

			/*
				 <!-- 다음페이지가 없을 경우 span으로 변경 -->
			*/
			var liFirst = '<a class="btn_pp" href="javascript:void(0);" onclick="{{funcName}}({{pageNo}}); return false;"><img src="/images/btn_pp.png" alt="처음"/></a> ';
			var liPrev = '<a class="btn_p" href="javascript:void(0);" onclick="{{funcName}}({{pageNo}})"; return false;><img src="/images/btn_p.png" alt="이전" /></a> ';
			var liActive = '<a href=javascript:void(0) class="active">{{pageNo}}</a> ';
			var liPageTemplate = '<a href="javascript:void(0);" onclick="{{funcName}}({{pageNo}})"; return false;>{{pageNoStr}}</a> ';
			var liPage = '';
			var liNext = '<a class="btn_n" href="javascript:void(0);" onclick="{{funcName}}({{pageNo}})"; return false;><img src="/images/btn_n.png" alt="다음" /></a> ';
			var liLast = '<a class="btn_nn" href="javascript:void(0);" onclick="{{funcName}}({{pageNo}}); return false;"><img src="/images/btn_nn.png" alt="마지막"/></a> ';

			var html = '';

			// 1. First
			//if (0 < pageBlockNo) {
			liFirst = common.string.replace(liFirst, "{{funcName}}", opts.funcName);
			liFirst = common.string.replace(liFirst, "{{pageNo}}", 1);
			html += liFirst;
			//}


			// 2. Prev
			//if (0 < pageBlockNo) {
			var prevPageBlockNo = pageBlockNo - 1;							// 이전 페이지 블록
			var prevPageNo = prevPageBlockNo * opts.pageBlock + opts.pageBlock;		// 이전 페이지 블록의 첫번째 페이지 번호

			liPrev = common.string.replace(liPrev, "{{funcName}}", opts.funcName);
			liPrev = common.string.replace(liPrev, "{{pageNo}}", liPrevPageNo);


			if (opts.pageNo > 1) {
				html += liPrev;
			} else {
				html += '<a class="btn_p" href="javascript:void(0);" return false;><img src="/images/btn_p.png" alt="이전" /></a> ';
			}



			//}

			// 3. Active & 4. Page
			for (var i = pageBlockNo * opts.pageBlock + 1; i <= (pageBlockNo + 1) * opts.pageBlock; i++) {
				if (totalPageCnt < i) {
					break;
				}

				if (opts.pageNo == i) {
					liActive = common.string.replace(liActive, "{{funcName}}", opts.funcName);
					liActive = common.string.replace(liActive, "{{pageNo}}", common.string.setComma(i));

					html += liActive;
				} else {
					liPage = common.string.replace(liPageTemplate, "{{funcName}}", opts.funcName);
					liPage = common.string.replace(liPage, "{{pageNo}}", i);
					liPage = common.string.replace(liPage, "{{pageNoStr}}", common.string.setComma(i));

					html += liPage;
				}
			}

			// 5. Next
			//if (pageBlockNo < lastPageBlockNo) {
			var nextPageBlockNo = pageBlockNo + 2;
			var nextPageNo = (nextPageBlockNo * opts.pageBlock) - (opts.pageBlock - 1);

			if (nextPageNo > totalPageCnt) {
				nextPageNo = totalPageCnt;
			}

			liNext = common.string.replace(liNext, "{{funcName}}", opts.funcName);
			liNext = common.string.replace(liNext, "{{pageNo}}", liNextPageNo);


			if (opts.pageNo >= totalPageCnt) {
				html += '<a class="btn_n" href="javascript:void(0);"return false;><img src="/images/btn_n.png" alt="다음" /></a> ';
			} else {
				html += liNext;
			}

			//}

			// 6. Last
			//if (pageBlockNo < lastPageBlockNo) {
			liLast = common.string.replace(liLast, "{{funcName}}", opts.funcName);
			liLast = common.string.replace(liLast, "{{pageNo}}", totalPageCnt);

			html += liLast;
			//}
			return html;
		}
	},

		common.adminPaging = {
			// 표시형식 :
			//    처음    이전    (1) 2 3 4 5 6 7 8 9 10   다음   마지막
			//    First   Prev    Selected                 Next    Last
			options: {
				divId: "paging",
				pageObject: "",
				funcName: "",	// 링크 클릭시 호출할 함수 이름 (주의 : 함수 포인터 아님)
				pageNo: 1,	// 현재 선택된 페이지 번호
				listBlock: 10,	// 목록의 출력 갯수
				pageBlock: 10,	// 페이지 목록의 수
				totalCount: 0,	// 전체 데이터 행의 수
				showImage: true	// 이미지 표시여부(default : true)
			},

			getStartPageNo: function (pageNo, listBlock) {
				return (pageNo * listBlock) - listBlock + 1;
			},

			getTotalPageCount: function (totalCount, listBlock) {
				var count = Math.floor(totalCount / listBlock);

				if (0 < totalCount % listBlock) {
					count++;
				}

				return count;
			},

			getNavigator: function (settings) {
				var opts = $.extend(common.adminPaging.options, settings);
				// pageBlockNo는 0 부터 시작.
				// page block는 "1 2 3 4 5 6 7 8 9 10"과 같이 표시할 페이지 목록의 갯수를 묶는 단위.
				// 10개씩 페이지 블럭을 묶고 전체 페이지가 13개라고 하면 2개의 page block이 생긴다.
				// 첫번째 페이지 블럭은 0, 그다음은 1이다.
				var totalPageCnt = (common.adminPaging.getTotalPageCount(opts.totalCount, opts.listBlock) == 0) ? 1 : common.adminPaging.getTotalPageCount(opts.totalCount, opts.listBlock);		// 전체 페이지수


				var liPrevPageNo = opts.pageNo - 1;
				var liNextPageNo = opts.pageNo + 1;

				var pageBlockNo = Math.floor((opts.pageNo - 1) / opts.pageBlock);		// 선택페이지의 블럭 번호
				var lastPageBlockNo = Math.floor(totalPageCnt / opts.pageBlock);	// 마지막 페이지블럭 번호

				/*
					 <!-- 다음페이지가 없을 경우 span으로 변경 -->
				*/
				//var liFirst			    = ' <a class="btn_pp" href="javascript:void(0);" onclick="{{funcName}}({{pageNo}});"></a>';
				var liPrev = ' <li><a class="btn_p" href="javascript:void(0);" onclick="{{funcName}}({{pageNo}})";>&#171;</a></li>';
				var liActive = ' <li class="on"><a href="javascript:void(0);">{{pageNo}}</a></li>';
				var liPageTemplate = ' <li><a href="javascript:void(0);" onclick="{{funcName}}({{pageNo}})";>{{pageNoStr}}</a></li>';
				var liPage = '';
				var liNext = ' <li><a class="btn_n" href="javascript:void(0);" onclick="{{funcName}}({{pageNo}})";>&#187;</a></li>';
				//var liLast			    = ' <a class="btn_nn" href="javascript:void(0);" onclick="{{funcName}}({{pageNo}})";></a>';

				var html = '<ul>';

				// 1. First
				if (0 < pageBlockNo) {
					liFirst = common.string.replace(liFirst, "{{funcName}}", opts.funcName);
					liFirst = common.string.replace(liFirst, "{{pageNo}}", 1);

					html += liFirst;
				}

				// 2. Prev
				//if (0 < pageBlockNo) {
				var prevPageBlockNo = pageBlockNo - 1;							// 이전 페이지 블록
				var prevPageNo = prevPageBlockNo * opts.pageBlock + opts.pageBlock;		// 이전 페이지 블록의 첫번째 페이지 번호

				liPrev = common.string.replace(liPrev, "{{funcName}}", opts.funcName);
				liPrev = common.string.replace(liPrev, "{{pageNo}}", liPrevPageNo);


				if (opts.pageNo > 1) {
					html += liPrev;
				} else {
					html += '<li><a class="btn_p" href="javascript:void(0);" onclick="alert(\'첫페이지 입니다.\')";>&#171;</a></li>';
				}

				//}

				// 3. Active & 4. Page
				for (var i = pageBlockNo * opts.pageBlock + 1; i <= (pageBlockNo + 1) * opts.pageBlock; i++) {
					if (totalPageCnt < i) {
						break;
					}

					if (opts.pageNo == i) {
						liActive = common.string.replace(liActive, "{{funcName}}", opts.funcName);
						liActive = common.string.replace(liActive, "{{pageNo}}", common.string.setComma(i));

						html += liActive;
					} else {
						liPage = common.string.replace(liPageTemplate, "{{funcName}}", opts.funcName);
						liPage = common.string.replace(liPage, "{{pageNo}}", i);
						liPage = common.string.replace(liPage, "{{pageNoStr}}", common.string.setComma(i));

						html += liPage;
					}
				}

				// 5. Next
				//if (pageBlockNo < lastPageBlockNo) {
				var nextPageBlockNo = pageBlockNo + 2;
				var nextPageNo = (nextPageBlockNo * opts.pageBlock) - (opts.pageBlock - 1);

				if (nextPageNo > totalPageCnt) {
					nextPageNo = totalPageCnt;
				}

				liNext = common.string.replace(liNext, "{{funcName}}", opts.funcName);
				liNext = common.string.replace(liNext, "{{pageNo}}", liNextPageNo);


				if (opts.pageNo >= totalPageCnt) {
					html += ' <li><a class="btn_n" href="javascript:void(0);" onclick="alert(\'마지막 페이지 입니다.\')";>&#187;</a> </li>';
				} else {
					html += liNext;
				}

				//}

				// 6. Last
				if (pageBlockNo < lastPageBlockNo) {
					liLast = common.string.replace(liLast, "{{funcName}}", opts.funcName);
					liLast = common.string.replace(liLast, "{{pageNo}}", totalPageCnt);

					html += liLast;
				}

				html += '</ul>';

				return html;
			},
		};

	common.mobilePaging = {
		// 표시형식 :
		//    처음    이전    (1) 2 3 4 5 6 7 8 9 10   다음   마지막
		//    First   Prev    Selected                 Next    Last
		options: {
			divId: "paging",
			pageObject: "",
			funcName: "",	// 링크 클릭시 호출할 함수 이름 (주의 : 함수 포인터 아님)
			pageNo: 1,	// 현재 선택된 페이지 번호
			listBlock: 10,	// 목록의 출력 갯수
			pageBlock: 10,	// 페이지 목록의 수
			totalCount: 0,	// 전체 데이터 행의 수
			showImage: true	// 이미지 표시여부(default : true)
		},

		getStartPageNo: function (pageNo, listBlock) {
			return (pageNo * listBlock) - listBlock + 1;
		},

		getTotalPageCount: function (totalCount, listBlock) {
			var count = Math.floor(totalCount / listBlock);

			if (0 < totalCount % listBlock) {
				count++;
			}

			return count;
		},

		getNavigator: function (settings) {
			var opts = $.extend(common.paging.options, settings);
			// pageBlockNo는 0 부터 시작.
			// page block는 "1 2 3 4 5 6 7 8 9 10"과 같이 표시할 페이지 목록의 갯수를 묶는 단위.
			// 10개씩 페이지 블럭을 묶고 전체 페이지가 13개라고 하면 2개의 page block이 생긴다.
			// 첫번째 페이지 블럭은 0, 그다음은 1이다.
			var totalPageCnt = (common.paging.getTotalPageCount(opts.totalCount, opts.listBlock) == 0) ? 1 : common.paging.getTotalPageCount(opts.totalCount, opts.listBlock);		// 전체 페이지수


			var liPrevPageNo = opts.pageNo - 1;
			var liNextPageNo = opts.pageNo + 1;


			var pageBlockNo = Math.floor((opts.pageNo - 1) / opts.pageBlock);		// 선택페이지의 블럭 번호
			var lastPageBlockNo = Math.floor(totalPageCnt / opts.pageBlock);	// 마지막 페이지블럭 번호


			/*
				 <!-- 다음페이지가 없을 경우 span으로 변경 -->
			*/

			var liFirst = "";//'<a class="first" href="javascript:void(0);" onclick="{{funcName}}({{pageNo}}); return false;">처음페이지</a>';
			var liPrev = '<a class="btn_page" href="javascript:void(0);" onclick="{{funcName}}({{pageNo}})"; return false;><span class="ico_prev">이전</span></a>';
			var liActive = '<span class="screen_out">현재페이지</span><em class="link_page">{{pageNo}}</em>';
			var liPageTemplate = '<a class="link_page" href="javascript:void(0);" onclick="{{funcName}}({{pageNo}})"; return false;">{{pageNoStr}}</a>';
			var liPage = '';
			var liNext = '<a class="btn_page" href="javascript:void(0);" onclick="{{funcName}}({{pageNo}})"; return false; ><span class="ico_next">다음</span></a>';
			var liLast = "";//'<a class="end" href="javascript:void(0);" onclick="{{funcName}}({{pageNo}}); return false;">마지막페이지</a>';

			var html = '';

			// 1. First
			if (0 < pageBlockNo) {
				liFirst = common.string.replace(liFirst, "{{funcName}}", opts.funcName);
				liFirst = common.string.replace(liFirst, "{{pageNo}}", 1);

				html += liFirst;
			}

			// 2. Prev
			//if (0 < pageBlockNo) {
			var prevPageBlockNo = pageBlockNo - 1;							// 이전 페이지 블록
			var prevPageNo = prevPageBlockNo * opts.pageBlock + opts.pageBlock;		// 이전 페이지 블록의 첫번째 페이지 번호

			liPrev = common.string.replace(liPrev, "{{funcName}}", opts.funcName);
			liPrev = common.string.replace(liPrev, "{{pageNo}}", liPrevPageNo);


			if (opts.pageNo > 1) {
				html += liPrev;
			} else {
				html += "<span class='btn_page'><span class='ico_prev'>이전</span></span>";
			}



			//}

			// 3. Active & 4. Page
			for (var i = pageBlockNo * opts.pageBlock + 1; i <= (pageBlockNo + 1) * opts.pageBlock; i++) {
				if (totalPageCnt < i) {
					break;
				}

				if (opts.pageNo == i) {
					liActive = common.string.replace(liActive, "{{funcName}}", opts.funcName);
					liActive = common.string.replace(liActive, "{{pageNo}}", common.string.setComma(i));

					html += liActive;
				} else {
					liPage = common.string.replace(liPageTemplate, "{{funcName}}", opts.funcName);
					liPage = common.string.replace(liPage, "{{pageNo}}", i);
					liPage = common.string.replace(liPage, "{{pageNoStr}}", common.string.setComma(i));

					html += liPage;
				}
			}

			// 5. Next
			//if (pageBlockNo < lastPageBlockNo) {
			var nextPageBlockNo = pageBlockNo + 2;
			var nextPageNo = (nextPageBlockNo * opts.pageBlock) - (opts.pageBlock - 1);

			if (nextPageNo > totalPageCnt) {
				nextPageNo = totalPageCnt;
			}

			liNext = common.string.replace(liNext, "{{funcName}}", opts.funcName);
			liNext = common.string.replace(liNext, "{{pageNo}}", liNextPageNo);


			if (opts.pageNo >= totalPageCnt) {
				html += "<span class=btn_page><span class=ico_next>다음</span></span>";
			} else {
				html += liNext;
			}

			//}

			// 6. Last
			if (pageBlockNo < lastPageBlockNo) {
				liLast = common.string.replace(liLast, "{{funcName}}", opts.funcName);
				liLast = common.string.replace(liLast, "{{pageNo}}", totalPageCnt);

				html += liLast;
			}

			html += '';

			return html;
		},
	};


	common.zipcode = {
		execDaumPostcode: function (zipId, addr1Id, addr2Id, latId, longId, func) {

			new daum.Postcode({
				oncomplete: function(data) {
	            	common.zipcode._complete(data, addr1Id, addr2Id, latId, longId, func);
	            }
			}).open();
		},

		mobileDaumPostcode: function(zipId, addr1Id, addr2Id, latId, longId) {
			var element_wrap = document.getElementById(zipId);
			$('#' + zipId).html('<img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" onclick="common.zipcode._close(\''+zipId+'\')" alt="접기 버튼">');
	        // 현재 scroll 위치를 저장해놓는다.
			var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	        new daum.Postcode({
	            oncomplete: function(data) {
	            	common.zipcode._complete(data, addr1Id, addr2Id, latId, longId);
	            	common.zipcode._close(zipId);
	            },
	            // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
	            onresize : function(size) {
	                element_wrap.style.height = size.height+'px';
	            },
	            width : '100%',
	            height : '100%'
	        }).embed(element_wrap);

	        // iframe을 넣은 element를 보이게 한다.
	        element_wrap.style.display = 'block';
		},

		_complete : function(data, addr1Id, addr2Id, latId, longId, func) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 각 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullAddr = ''; // 최종 주소 변수
			var extraAddr = ''; // 조합형 주소 변수

			// 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
				fullAddr = data.roadAddress;

			} else { // 사용자가 지번 주소를 선택했을 경우(J)
				fullAddr = data.jibunAddress;
			}

			// 사용자가 선택한 주소가 도로명 타입일때 조합한다.
			if (data.userSelectedType === 'R') {
				//법정동명이 있을 경우 추가한다.
				if (data.bname !== '') {
					extraAddr += data.bname;
				}
				// 건물명이 있을 경우 추가한다.
				if (data.buildingName !== '') {
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
				fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			$("#" + addr1Id).val("(" + data.zonecode + ") " + fullAddr);
			if (latId && longId) {
				common.zipcode.getLatLong(fullAddr, latId, longId, func);
			}
			// 커서를 상세주소 필드로 이동한다.
			document.getElementById(addr2Id).focus();
		},

		_close : function(zipId) {
			document.getElementById(zipId).style.display = 'none';
		},

		getLatLong: function (addr, latId, longId, func) {
			if (addr) {
				// 주소-좌표 변환 객체를 생성합니다
				var geocoder = new kakao.maps.services.Geocoder();
				// 주소로 좌표를 검색합니다
				geocoder.addressSearch(addr, function(result, status) {
					// 정상적으로 검색이 완료됐으면 
					if (status === kakao.maps.services.Status.OK) {
						$("#" + latId).val(result[0].y);
						$("#" + longId).val(result[0].x);
						if (func != undefined) {
							func();
						}
				    } else {
						$("#" + latId).val('');
						$("#" + longId).val('');
					}
				}); 
			} else {
				$("#" + latId).val('');
				$("#" + longId).val('');
			}
		}
	};

	// 입사지원시스템 도로명주소만 등록되게 수정 shin 20200515
	common.joinZipcode = {
		execDaumPostcode: function (zipId, addr1Id, addr2Id, latId, longId) {

			new daum.Postcode({
				oncomplete: function(data) {
	            	common.joinZipcode._complete(data, addr1Id, addr2Id, latId, longId);
	            }
			}).open();
		},

		mobileDaumPostcode: function(zipId, addr1Id, addr2Id, latId, longId) {
			var element_wrap = document.getElementById(zipId);
			$('#' + zipId).html('<img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" onclick="common.joinZipcode._close(\''+zipId+'\')" alt="접기 버튼">');
	        // 현재 scroll 위치를 저장해놓는다.
			var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	        new daum.Postcode({
	            oncomplete: function(data) {
	            	common.joinZipcode._complete(data, addr1Id, addr2Id, latId, longId);
	            	common.joinZipcode._close(zipId);
	            },
	            // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
	            onresize : function(size) {
	                element_wrap.style.height = size.height+'px';
	            },
	            width : '100%',
	            height : '100%'
	        }).embed(element_wrap);

	        // iframe을 넣은 element를 보이게 한다.
	        element_wrap.style.display = 'block';
		},

		_complete : function(data, addr1Id, addr2Id, latId, longId) {
			// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

			// 각 주소의 노출 규칙에 따라 주소를 조합한다.
			// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
			var fullAddr = ''; // 최종 주소 변수
			var extraAddr = ''; // 조합형 주소 변수

			// 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
			fullAddr = data.roadAddress;

			// 사용자가 선택한 주소가 도로명 타입일때 조합한다.
			//법정동명이 있을 경우 추가한다.
			if (data.bname !== '') {
				extraAddr += data.bname;
			}
			// 건물명이 있을 경우 추가한다.
			if (data.buildingName !== '') {
				extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
			}
			// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
			fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');

			// 우편번호와 주소 정보를 해당 필드에 넣는다.
			$("#" + addr1Id).val("(" + data.zonecode + ") " + fullAddr);
			if (latId && longId) {
				common.joinZipcode.getLatLong(fullAddr, latId, longId);
			}
			// 커서를 상세주소 필드로 이동한다.
			document.getElementById(addr2Id).focus();
		},

		_close : function(zipId) {
			document.getElementById(zipId).style.display = 'none';
		},

		getLatLong: function (addr, latId, longId) {
			if (addr) {
				var geocoder = new google.maps.Geocoder();

				geocoder.geocode({ 'address': addr }, function (results, status) {
					if (results.length > 0) {
						$("#" + longId).val(results[0].geometry.location.lng());
						$("#" + latId).val(results[0].geometry.location.lat());
					} else {
						$("#" + latId).val('');
						$("#" + longId).val('');
					}
				});
			} else {
				$("#" + latId).val('');
				$("#" + longId).val('');
			}
		},
	};

	common.fileCheck = {
		getExtension: function (filename) {
			var parts = filename.split('.');
			return parts[parts.length - 1];
		},

		getExtension02: function (files) {
			for (var i = 0; i < files.length; i++) {
				//		            	return common.fileCheck.getExtension(files[i].name);
				return files[i].name;
			}
		},

		extensionCheck: function (extensionFunc, getExtension) {

			if (extensionFunc == 1) {
				return common.fileCheck.isImage(getExtension);
			} else if (extensionFunc == 2) {
				return common.fileCheck.isVideo(getExtension);
			} else if (extensionFunc == 3) {
				return common.fileCheck.isDoc(getExtension);
			} else if (extensionFunc == 4) {
				return common.fileCheck.AllFile(getExtension);
			}
		},

		isImage: function (filename) {
			var ext = this.getExtension(filename);
			switch (ext.toLowerCase()) {
				case 'jpg':
				case 'gif':
				case 'bmp':
				case 'png':
				case 'jpeg':
					//etc
					return true;
			}
			return false;
		},

		isVideo: function (filename) {
			var ext = this.getExtension(filename);
			switch (ext.toLowerCase()) {
				case 'm4v':
				case 'avi':
				case 'mpg':
				case 'mp4':
					// etc
					return true;
			}
			return false;
		},

		isDoc: function (filename) {
			var ext = this.getExtension(filename);
			switch (ext.toLowerCase()) {
				case 'pdf':
				case 'doc':
				case 'docx':
				case 'xlsx':
				case 'xls':
				case 'txt':
				case 'ppt':
				case 'pptx':
				case 'zip':
					// etc
					return true;
			}
			return false;
		},

		AllFile: function (filename) {
			var ext = this.getExtension(filename);
			switch (ext.toLowerCase()) {
				case 'pdf':
				case 'doc':
				case 'docx':
				case 'xlsx':
				case 'xls':
				case 'txt':
				case 'ppt':
				case 'pptx':
				case 'jpg':
				case 'gif':
				case 'bmp':
				case 'png':
				case 'zip':
				case 'hwp':
				case 'jpeg':
					// etc
					return true;
			}
			return false;
		},
	};

	common.file = {
		upload: function (fileArray) {
			var attachId = 0;
			var param = {
				"files": fileArray,
			};

			var opts = {
				url: "/admin/common/setAttachFile",
				data: param,
				async: false,
				type: "post",
				sendDataType: "json", animation: false,
				success: function (resJSON, resCode) {
					attachId = resJSON.data;
				}
			};
			common.http.ajax(opts);

			return attachId;
		},

		editorHtml: function (imgSrc, width, height) {

			CKEDITOR.instances.boardCntt.insertHtml('<p><img alt="" src="' + imgSrc + '" width="' + width + '" height="' + height + '" /></p><p>&nbsp;</p>');

			$(".cke_dialog_background_cover").attr("style", "display:none");
			$(".cke_editor_boardCntt_dialog").attr("style", "display:none");
		},

		download: function (attachId) {
			var param = {
				"attachId": attachId,
			};
			var opts = {
				url: "/admin/common/download",
				data: param,
				type: "post",
				sendDataType: "json", animation: false,
			};
			common.http.sendFormData(opts);
		},

		//한 번에 업로드하는 파일 숫자ex)드래그
		fileNum01: function (e, num) {
			var files = e.originalEvent.dataTransfer.files;
			if (files.length > num) {
				alert("업로드 가능 파일 수는 " + num + "개 입니다.");
				return false;
			}
		},

		fileNum02: function (num) {
			var count = $('tr:visible').length;
			if (count + 1 > num) {
				alert("업로드 가능 파일 수는 " + num + "개 입니다.");
				return false;
			}
			return true;
		},

		fileNumCheck: function (files, num, id) {
			var count = $(id + "> div").length;
			if (files.length > num || count + 1 > num || count + files.length > num) {
				alert("업로드 가능 파일 수는 " + num + "개 입니다.");
				return false;
			}
		},

		//파일 얻기
		fileGet: function (e) {
			var files = e.originalEvent.dataTransfer.files;
			return files;
		},

		//temp 폴더에 파일 업로드
		sendFileToForm: function (files) {
			var fd = new FormData();
			for (var i = 0; i < files.length; i++) {

				console.log(files[i]);

				fd.append('file', files[i]);
			}
			return fd;
		},

		sendFileToServer: function (fd, url, id, flag) {
			var data;
			$.ajax({
				url: url,
				type: "POST",
				contentType: false,
				processData: false,
				//		                 cache: false,
				data: fd,
				async: false,
				success: function (resJSON, resCode) {
					data = resJSON.data;
				}
			});
			return data;
		},

		setTempFileDelete: function (saveNm) {
			var param = {
				"saveNm": saveNm,
			};

			var opts = {
				url: "/common/setTempFileDelete",
				data: param,
				type: "post",
				async: false,
				sendDataType: "json", animation: false,
				success: function (resJSON, resCode) {
					if ("success" == resCode) {
						if (resJSON.responseCode == "0") {
							//idx 리턴해서 미리보기
							$("#tr" + saveNm).remove();
						} else {
							alert("오류가 발생하였습니다. \n" + resObj.responseText);
						}
					}
				}
			};
			common.http.ajax(opts);
		},

		setFileDelete: function (attachId, saveNm) {
			var param = {
				"attachId": attachId,
				"saveNm": saveNm,
			};
			var opts = {
				url: "/admin/common/setFileDelete",
				data: param,
				type: "post",
				async: false,
				sendDataType: "json", animation: false,
				success: function (resJSON, resCode) {
					if ("success" == resCode) {
						if (resJSON.responseCode == "0") {
							//idx 리턴해서 미리보기
							$("#tr" + saveNm).remove();
						} else {
							alert("오류가 발생하였습니다. \n" + resObj.responseText);
						}
					}
				}
			};
			common.http.ajax(opts);
		},


	};

	//공통코드 콤보BOX
	common.sys = {

		/** 게시물 데이터**/
		getComboData: function (commGrCd) {
			var returnVal = "";
			var param = {
				"commGrCd": commGrCd,
			};

			var opts = {
				url: "/sys/commCode/getComboData",
				data: param,
				type: "post",
				sendDataType: "json", animation: false,
				async: false,
				success: function (resJSON, resCode) {
					// 페이지 넘버링
					returnVal = resJSON.data.list;

				}
			};
			common.http.ajax(opts);
			return returnVal;
		},

		getGridComboData: function (commGrCd, optionFirst) {
			var returnVal = "";
			var param = {
					"commGrCd": commGrCd,
			};

			var opts = {
					url: "/sys/commCode/getComboData",
					data: param,
					type: "post",
					sendDataType: "json", animation: false,
					async: false,
					success: function (resJSON, resCode) {
						// 페이지 넘버링
						returnVal = resJSON.data.list;

					}
			};
			common.http.ajax(opts);

			/**
			 * wijmo-grid 에서 콤보박스를 만들 때 사용
			 */
			if (optionFirst) {
				var commNmStr = '';

				if (optionFirst == 'all') {
					commNmStr = '- 전체 -';
				} else if (optionFirst == 'choose') {
					commNmStr = '- 선택 -';
				} else if (optionFirst == 'require') {
					commNmStr = '- 필수선택 -';
				}
				returnVal.unshift({ commIdx: 0, commNm: commNmStr });
			}
			return returnVal;
		},

		/** 게시물 데이터
		 * commGrCd       : 공통그룹코드
		 * pstId                : 셀렉트박스 삽입위치
		 * selectId             : 셀렉트박스 ID값 Name값
		 * classNm            : 스타일 클래스명
		 * onChangeFlag    : onChange처리여부 (Y : N)
		 * fnNm                : onChange 함수명
		 * tagFn                : 태그 삽입 방식 append, html, prepend
		 * **/
		getComboBox: function (commGrCd, pstId, selectId, classNm, onChangeFlag, fnNm, tagFn) {
			var param = {
				"commGrCd": commGrCd,
				"selectId": selectId,
				"classNm": classNm,
				"event": onChangeFlag,
				"eventFn": fnNm,
			};

			var opts = {
				url: "/sys/commCode/getComboBox",
				data: param,
				type: "post",
				sendDataType: "json", animation: false,
				async: false,
				success: function (resJSON, resCode) {
					// 페이지 넘버링
					if (tagFn == "append") {
						$("#" + pstId).append("<" + resJSON + ">");
					} else if (tagFn == "prepend") {
						$("#" + pstId).prepend("<" + resJSON + ">");
					} else {
						$("#" + pstId).html("<" + resJSON + ">");
					}

				}
			};
			common.http.ajax(opts);
		},

		getMenuPersAuthCd: function (hrsIdx, menuIdx) {
			var returnVal = "";
			var param = {
				"hrsIdx": hrsIdx,
				"menuIdx": menuIdx,
			};
			var opts = {
				url: "/sys/commCode/getMenuPersAuthCd",
				data: param,
				type: "post",
				sendDataType: "json", animation: false,
				async: false,
				success: function (resJSON, resCode) {
					returnVal = resJSON;
				}
			};
			common.http.ajax(opts);
			return returnVal;
		},

		getMenuOrgtAuthCd: function (hrsPstCd, orgtId, menuIdx) {
			var returnVal = "";
			var param = {
				"hrsPstCd": hrsPstCd,
				"menuIdx": menuIdx,
				"orgtId": orgtId,
			};
			var opts = {
				url: "/sys/commCode/getMenuOrgtAuthCd",
				data: param,
				type: "post",
				sendDataType: "json", animation: false,
				async: false,
				success: function (resJSON, resCode) {
					returnVal = resJSON.data;
				}
			};
			common.http.ajax(opts);
			return returnVal;
		},

		checkMenuLevelOver: function (checkId) {
			var returnVal = "";
			var param = {
				"loginId": loginData.userId,
				"checkId": checkId,
			};
			var opts = {
				url: "/sys/commCode/checkMenuLevelOver",
				data: param,
				type: "post",
				sendDataType: "json", animation: false,
				async: false,
				success: function (resJSON, resCode) {
					returnVal = resJSON;
				}
			};
			common.http.ajax(opts);
			return returnVal;
		},

	};
	window.common = common;
})(jQuery);
