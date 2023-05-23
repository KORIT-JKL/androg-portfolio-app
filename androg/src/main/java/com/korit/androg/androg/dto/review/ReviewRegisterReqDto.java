package com.korit.androg.androg.dto.review;

import com.korit.androg.androg.entity.Review;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewRegisterReqDto {
	private int orderDetailId;
	private String content;
	
	public Review toEntity() {
		return Review.builder()
				.orderDetailId(orderDetailId)
				.content(content)
				.build();
	}
}
