package com.korit.androg.androg.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.InquiryAnswerRespDto;
import com.korit.androg.androg.dto.inquiry.InquirySubmitReqDto;
import com.korit.androg.androg.repository.InquiryRepository;
import com.korit.androg.androg.security.PrincipalUser;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InquiryService {
	private final int Maximum = 200;
	private final InquiryRepository inquiryRepository;
	private final ErrorService errorService;
	public int submitInquiry(InquirySubmitReqDto inquirySubmitReqDto) {
		PrincipalUser user = (PrincipalUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		errorService.idCategoryCheck(inquirySubmitReqDto.getOrderId(), inquirySubmitReqDto.getCategory());
		errorService.blankCheck(inquirySubmitReqDto.getInquiryContent(), Maximum);
		
		Map<String, Object> requestMap = new HashMap<>();
		requestMap.put("userId", user.getUserId());
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
