package com.korit.androg.androg.dto.review;

import com.korit.androg.androg.entity.Review;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewRegisterReqDto {
	private int userId;
	private int productId;
	private String content;
	
	public Review toEntity() {
		return Review.builder()
				.userId(userId)
				.productId(productId)
				.content(content)
				.build();
	}
}
