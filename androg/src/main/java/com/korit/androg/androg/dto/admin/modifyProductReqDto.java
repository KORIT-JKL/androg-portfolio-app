package com.korit.androg.androg.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class modifyProductReqDto {
	private int productId;
	private String productName;
	private int productPrice;
	private String categoryId;
	private String colorId;
	private String productImg;
}
