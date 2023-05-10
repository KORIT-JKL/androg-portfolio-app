package com.korit.androg.androg.dto.Product;

import com.korit.androg.androg.entity.Category;
import com.korit.androg.androg.entity.Color;

import lombok.Builder;
import lombok.Data;
@Data
@Builder
public class SearchProductsRespDto {
	private int productId;
	private String productName;
	private int productPrice;
	private String productImg;
	private String sizeS;
	private String sizeM;
	private String sizeL;
	private String sizeXL;
	private String sizeXXL;
	private int categoryId;
	private String categoryName;
	private int colorId;
	private String colorName;
	
	
}
