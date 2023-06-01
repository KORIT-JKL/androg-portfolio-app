package com.korit.androg.androg.dto.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InquiryRespDto {
	private int inquiryId;
	private String email;
	private int orderId;
	private String category;
	private String inquiryContent;
	private String date;
	private String answer;
}
