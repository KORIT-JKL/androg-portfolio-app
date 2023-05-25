package com.korit.androg.androg.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminReviewCheckRespDto {
	private int reviewId;
	private String name;
	private String productName;
	private String content;
	private String date;
	private String reviewContent;
}
