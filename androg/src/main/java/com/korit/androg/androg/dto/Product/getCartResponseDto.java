package com.korit.androg.androg.dto.Product;

import com.korit.androg.androg.entity.Products;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class getCartResponseDto {
	private int cartId;
	private int productId;
	private String productName;
	private int productPrice;
	private String productImg;
	private String sizeName;
	private String colorName;
	private int countNumber;
}
