package com.korit.androg.androg.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserReviewsRespDto {
	private int reviewId;
	private String userName;
	private String productName;
	private String content;
	private String date;
}
