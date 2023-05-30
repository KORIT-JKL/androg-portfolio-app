package com.korit.androg.androg.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CountRankRespDto {
	private int orderDetailId;
	private String productName;
	private String colorName;
	private int totalCount;
	private int productPrice;
	private int totalPrice;
	private int rank;
}
