package com.korit.androg.androg.dto.Product;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SameProductRespDto {
	private int productId;
	private String productImg;
}
