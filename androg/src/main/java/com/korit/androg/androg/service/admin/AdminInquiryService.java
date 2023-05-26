package com.korit.androg.androg.service.admin;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.InquiryAnswerReqDto;
import com.korit.androg.androg.dto.admin.InquiryRespDto;
import com.korit.androg.androg.repository.admin.AdminInquiryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminInquiryService {
	
	private final AdminInquiryRepository adminInquiryRepository;
	
	public List<InquiryRespDto> getInquiries() {
		List<InquiryRespDto> inquiryList = new ArrayList<>();
		adminInquiryRepository.getInquiries().forEach(inquiry -> {
			inquiryList.add(inquiry.toDto());
		});
		
		return inquiryList;
	}
	
	public int submitAnswer(InquiryAnswerReqDto inquiryAnswerReqDto) {
		return adminInquiryRepository.submitAnswer(inquiryAnswerReqDto);
	}
}
