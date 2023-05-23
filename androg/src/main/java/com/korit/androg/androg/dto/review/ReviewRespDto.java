package com.korit.androg.androg.dto.review;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewRespDto {
	private int orderDetailId;
	private int userId;
	private int reviewId;
	private int productId;
	private String userName;
	private String content;
	private String reviewDate;
}
