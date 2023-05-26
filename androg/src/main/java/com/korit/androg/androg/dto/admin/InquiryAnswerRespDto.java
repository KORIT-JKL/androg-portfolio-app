package com.korit.androg.androg.dto.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InquiryAnswerRespDto {
	private int inquiryRespId;
	private int inquiryId;
	private String answer;
}
