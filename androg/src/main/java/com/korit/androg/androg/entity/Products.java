package com.korit.androg.androg.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class Products {
	private String productId;
	private String productName;
	private int productPrice;
	private int categoryId;
	private String categoryName;
	private String productImg;
	private String sizeS;
	private String sizeM;
	private String sizeL;
	private String sizeXL;
	private String sizeXXL;
	private int colorId;
	private String colorName;
}
