package com.korit.androg.androg.dto.review;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewModifyReqDto {
	private int reviewId;
	private String reviewDate;
	private String content;
}
