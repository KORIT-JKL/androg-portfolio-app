package com.korit.androg.androg.service.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.InquiryAnswerReqDto;
import com.korit.androg.androg.dto.admin.InquiryRespDto;
import com.korit.androg.androg.repository.admin.AdminInquiryRepository;
import com.korit.androg.androg.service.ErrorService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminInquiryService {
	private int Maximum = 200;	
	private final AdminInquiryRepository adminInquiryRepository;
	private final ErrorService errorService;
	
	public List<InquiryRespDto> getInquiries() {
		List<InquiryRespDto> inquiryList = new ArrayList<>();
		adminInquiryRepository.getInquiries().forEach(inquiry -> {
			inquiryList.add(inquiry.toDto());
		});
		
		return inquiryList;
	}
	
	public int submitAnswer(InquiryAnswerReqDto inquiryAnswerReqDto) {
		errorService.blankCheck(inquiryAnswerReqDto.getAnswer(), Maximum);
		return adminInquiryRepository.submitAnswer(inquiryAnswerReqDto);
	}
}
