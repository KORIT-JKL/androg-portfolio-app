package com.korit.androg.androg.dto.inquiry;

import lombok.Data;

@Data
public class InquirySubmitReqDto {
	private int inquiryId;
	private int userId;
	private int orderDetailId;
	private String inquiryContent;
}
