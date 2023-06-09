package com.korit.androg.androg.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderProductsRespDto {
	private int orderDetailId;
	private int countNumber;
	private int productId;
	private int productPrice;
	private int orderId;
	private int reviewId;
	private String productName;
	private String productImg;
	private String colorName;
	private String sizeName;
	private String userName;
}
