package com.korit.androg.androg.entity;

import com.korit.androg.androg.dto.user.OrderProductsRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderProducts {
	private int orderId;
	private String sizeName;
	private int countNumber;
	
	private User user;
	private Products products;
	private Color color;
	
	public OrderProductsRespDto toDto() {
		return OrderProductsRespDto.builder()
				.orderId(orderId)
				.productName(products.getProductName())
				.productImg(products.getProductImg())
				.productPrice(products.getProductPrice())
				.colorName(color.getColorName())
				.sizeName(sizeName)
				.countNumber(countNumber)
				.userName(user.getName())
				.build();
	}
}