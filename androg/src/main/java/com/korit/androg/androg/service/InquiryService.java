package com.korit.androg.androg.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.InquiryAnswerRespDto;
import com.korit.androg.androg.dto.admin.InquiryRespDto;
import com.korit.androg.androg.dto.inquiry.InquirySubmitReqDto;
import com.korit.androg.androg.repository.InquiryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InquiryService {
	private final InquiryRepository inquiryRepository;
	public int submitInquiry(InquirySubmitReqDto inquirySubmitReqDto) {
		Map<String, Object> requestMap = new HashMap<>();
		requestMap.put("userId", inquirySubmitReqDto.getUserId());
		requestMap.put("orderId", inquirySubmitReqDto.getOrderId());
		requestMap.put("category", inquirySubmitReqDto.getCategory());
		requestMap.put("inquiryContent", inquirySubmitReqDto.getInquiryContent());
		return inquiryRepository.submitInquiry(requestMap); 
	}
	public List<InquiryAnswerRespDto> getAnswer(int userId) {
		List<InquiryAnswerRespDto> list = new ArrayList<>();
		inquiryRepository.getAnswer(userId).forEach(answer -> {
			list.add(answer.toDto());
		});
		return list; 
	}
}
