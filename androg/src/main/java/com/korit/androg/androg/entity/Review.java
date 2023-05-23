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
	private int orderDetailId;
	private String content;
	private String reviewDate;
	
	private User user;
	private Products products;
	
	public ReviewRespDto toDto() {
		return ReviewRespDto.builder()
							.orderDetailId(orderDetailId)
							.content(content)
							.reviewDate(reviewDate)
							.reviewId(reviewId)
							.productId(products.getProductId())
							.userId(user.getUserId())
							.userName(user.getName())
							.build();
	}
}
