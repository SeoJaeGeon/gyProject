package com.gycompany.gyapp.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value = "/inquires")
public class InquiresController {
	
	@RequestMapping(value = "/goList")
	public String goList(Locale locale, Model model) {
		return "/inquires/list";
	}
	
	@RequestMapping(value = "/goInsert")
	public String goInsert(Locale locale, Model model) {
		return "/inquires/insert";
	}
	
	@RequestMapping(value = "/goUpdate")
	public String goUpdate(Locale locale, Model model) {
		return "/inquires/update";
	}

	@RequestMapping(value = "/goView")
	public String goView(Locale locale, Model model) {
		return "/inquires/view";
	}
}
