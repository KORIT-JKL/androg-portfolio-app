package com.korit.androg.androg.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductRespDto {
	private int productId;
	private String productName;
	private int productPrice;
	private String productImg;
	private	int colorId;
	private String colorName;
	private int categoryId;
	private String categoryName;
	private int soldoutFlag;
	private String sizeS;
	private String sizeM;
	private String sizeL;
	private String sizeXL;
	private String sizeXXL;
}
