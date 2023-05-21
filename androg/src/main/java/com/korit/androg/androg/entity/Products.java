package com.korit.androg.androg.entity;

import com.korit.androg.androg.dto.Product.SearchProductsRespDto;
import com.korit.androg.androg.dto.admin.getProductRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Products {
	private int productId;
	private String productName;
	private int productPrice;
	private String productImg;
	private String sizeS;
	private String sizeM;
	private String sizeL;
	private String sizeXL;
	private String sizeXXL;
	
	private Category category;
	private Color color;
	public SearchProductsRespDto toDto() {
		return SearchProductsRespDto.builder()
				.productId(productId)
				.productName(productName)
				.productPrice(productPrice)
				.productImg(productImg)
				.categoryId(category.getCategoryId())
				.categoryName(category.getCategoryName())
				.colorId(color.getColorId())
				.colorName(color.getColorName())
				.sizeS(sizeS)
				.sizeM(sizeM)
				.sizeL(sizeL)
				.sizeXL(sizeXL)
				.sizeXXL(sizeXXL)
				.build();
				
	}
	public getProductRespDto toAdminDto() {
		return getProductRespDto.builder()
				.productId(productId)
				.productName(productName)
				.productPrice(productPrice)
				.productImg(productImg)
				.categoryId(category.getCategoryId())
				.categoryName(category.getCategoryName())
				.colorId(color.getColorId())
				.colorName(color.getColorName())
				.build();
				}
}
