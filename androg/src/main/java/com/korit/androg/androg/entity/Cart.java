package com.korit.androg.androg.entity;

import com.korit.androg.androg.dto.Product.CartRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
	private int cartId;
	private String sizeName;
	private int countNumber;
	
	private Color color;
	private Products products;
	
	public CartRespDto toDto() {
		return CartRespDto.builder()
				.cartId(cartId)
				.productId(products.getProductId())
				.productName(products.getProductName())
				.productPrice(products.getProductPrice())
				.productImg(products.getProductImg())
				.sizeName(sizeName)
				.colorId(color.getColorId())
				.colorName(color.getColorName())
				.countNumber(countNumber)
				.build();
	}
}
