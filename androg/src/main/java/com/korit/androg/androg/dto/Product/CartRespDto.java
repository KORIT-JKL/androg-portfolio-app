package com.korit.androg.androg.dto.Product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartRespDto {
	private int cartId;
	private int productId;
	private String productName;
	private int productPrice;
	private String productImg;
	private String sizeName;
	private int colorId;
	private String colorName;
	private int countNumber;
}
