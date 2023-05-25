package com.korit.androg.androg.entity;

import com.korit.androg.androg.dto.admin.AdminReviewCheckRespDto;
import com.korit.androg.androg.dto.admin.UserReviewsRespDto;
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
	private OrderDetail orderDetail;
	private Order order;
	private AdminReview adminReview;
	
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

	public UserReviewsRespDto toReviews() {
		return UserReviewsRespDto.builder()
								 .reviewId(reviewId)
								 .userName(user.getName())
								 .content(content)
								 .productName(products.getProductName())
								 .date(reviewDate)
								 .build();
	}
	public AdminReviewCheckRespDto toCheck() {
		
		if(adminReview != null) {
			return AdminReviewCheckRespDto.builder()
					.content(content)
					.date(reviewDate)
					.name(user.getName())
					.reviewContent(adminReview.getReviewContent())
					.productName(products.getProductName())
					.reviewId(reviewId)
					.build();
		}
		return AdminReviewCheckRespDto.builder()
				.content(content)
				.date(reviewDate)
				.name(user.getName())
				.productName(products.getProductName())
				.reviewId(reviewId)
				.build();
		
	}
}
