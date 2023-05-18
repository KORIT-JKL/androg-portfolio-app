package com.korit.androg.androg.entity;

import com.korit.androg.androg.dto.review.ReviewRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Review {
	private int reviewId;
	private int userId;
	private int productId;
	private String content;
	
	private User user;
	
	public ReviewRespDto toDto() {
		return ReviewRespDto.builder()
							.productId(productId)
							.userName(user.getName())
							.content(content)
							.build();
	}
}
