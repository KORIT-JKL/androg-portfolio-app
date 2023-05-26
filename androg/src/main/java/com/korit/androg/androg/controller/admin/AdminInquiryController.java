package com.korit.androg.androg.controller.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.admin.InquiryAnswerReqDto;
import com.korit.androg.androg.service.admin.AdminInquiryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class AdminInquiryController {
	private final AdminInquiryService adminInquiryService;
	@GetMapping("/admin/inquiries")
	public ResponseEntity<?> getInquiries() {
		return ResponseEntity.ok().body(adminInquiryService.getInquiries());
	}
	
	@PostMapping("/admin/inquiries/answer")
	public ResponseEntity<?> submitAnswer(@RequestBody InquiryAnswerReqDto inquiryAnswerReqDto)	{
		return ResponseEntity.ok().body(adminInquiryService.submitAnswer(inquiryAnswerReqDto));
	}
}
