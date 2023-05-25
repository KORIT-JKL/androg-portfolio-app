package com.korit.androg.androg.entity;

import com.korit.androg.androg.dto.admin.InquiryAnswerRespDto;

import lombok.Data;

@Data
public class InquiryAnswer {
	private int inquiryRespId;
	private int inquiryId;
	private String answer;
	
	private Inquiry inquiry;
	
	public InquiryAnswerRespDto toDto() {
		return InquiryAnswerRespDto.builder()
				.inquiryRespId(inquiryRespId)
				.inquiryId(inquiry.getInquiryId())
				.answer(answer)
				.build();
	}
}
