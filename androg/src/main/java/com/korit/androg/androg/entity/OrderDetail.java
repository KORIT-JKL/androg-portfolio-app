package com.korit.androg.androg.entity;

import com.korit.androg.androg.dto.admin.CountRankRespDto;
import com.korit.androg.androg.dto.admin.UserRankRespDto;
import com.korit.androg.androg.dto.admin.UserReviewsRespDto;
import com.korit.androg.androg.dto.user.OrderProductsRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetail {
	private int orderDetailId;
	private int countNumber;
	private int productId;
	private String sizeName;
	
	private User user;
	private Products products;
	private Color color;
	private Order order;
	private Review review;
	private int rank;
	private int totalcount;
	private int totalPrice;
	private int userTotalCount;
	private int userTotalPrice;
	public OrderProductsRespDto toDto() {
		return OrderProductsRespDto.builder()
				.orderDetailId(orderDetailId)
				.productId(productId)
				.productName(products.getProductName())
				.productImg(products.getProductImg())
				.productPrice(products.getProductPrice())
				.colorName(color.getColorName())
				.sizeName(sizeName)
				.countNumber(countNumber)
				.userName(user.getName())
				.orderId(order.getOrderId())
				.reviewId(review.getReviewId())
				.build();
	}
	public CountRankRespDto toRankDto() {
		return CountRankRespDto.builder()
				.orderDetailId(orderDetailId)
				.productName(products.getProductName())
				.colorName(products.getColor().getColorName())
				.rank(rank)
				.productPrice(products.getProductPrice())
				.totalCount(totalcount)
				.totalPrice(totalPrice)
				.build();
	}
	public UserRankRespDto toUserRankDto() {
		return UserRankRespDto.builder()
				.name(order.getUser().getName())
				.email(order.getUser().getEmail())
				.totalCount(userTotalCount)
				.totalPrice(userTotalPrice)
				.rank(rank)
				.build();
	}
}
