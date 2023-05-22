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
public class OrderDetail {
	private int orderDetailId;
	private int countNumber;
	private int productId;
	private String sizeName;
	
	private User user;
	private Products products;
	private Color color;
	private Order order;
	
	public OrderProductsRespDto toDto() {
		System.out.println(orderDetailId);
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
				.build();
	}
}
