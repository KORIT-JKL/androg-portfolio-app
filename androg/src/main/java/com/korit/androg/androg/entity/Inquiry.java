package com.korit.androg.androg.entity;

import com.korit.androg.androg.dto.admin.InquiryRespDto;

import lombok.Data;

@Data
public class Inquiry {
	private int inquiryId;
	private String userId;
	private int orderId;
	private String category;
	private String inquiryContent;
	private String date;
	
	private User user;
	
	public InquiryRespDto toDto() {
		return InquiryRespDto.builder()
			.inquiryId(inquiryId)
			.email(user.getEmail())
			.orderId(orderId)
			.category(category)
			.inquiryContent(inquiryContent)
			.date(date)
			.build();
	}
}
