package com.korit.androg.androg.dto.Product;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartReqDto {
	private int userId;
	private int productId;
	private String sizeName;
	private int countNumber;
}
