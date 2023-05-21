package com.korit.androg.androg.dto.order;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderCompleteReqDto {
	private int userId;
	private int productId;
	private int countNumber;
	private String colorName;
	private String sizeName;
}
