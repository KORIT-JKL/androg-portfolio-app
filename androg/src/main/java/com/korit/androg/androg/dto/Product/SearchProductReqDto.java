package com.korit.androg.androg.dto.Product;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchProductReqDto {
	private String searchInput;
	private int page;
}
