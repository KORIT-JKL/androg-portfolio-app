package com.korit.androg.androg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.inquiry.InquirySubmitReqDto;
import com.korit.androg.androg.service.InquiryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class InquiryController {
	private final InquiryService inquiryService;
	@PostMapping("/users/inquiry")
	public ResponseEntity<?> submitInquiry(@RequestBody InquirySubmitReqDto inquirySubmitReqDto) {
		return ResponseEntity.ok().body(inquiryService.submitInquiry(inquirySubmitReqDto));
	}
}
