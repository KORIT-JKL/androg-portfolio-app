package com.korit.androg.androg.dto.inquiry;

import lombok.Data;

@Data
public class InquirySubmitReqDto {
	private int userId;
	private int orderId;
	private String category;
	private String inquiryContent;
}
