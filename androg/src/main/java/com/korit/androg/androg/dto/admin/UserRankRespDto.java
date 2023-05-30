package com.korit.androg.androg.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRankRespDto {
	private int rank;
	private String name;
	private String email;
	private int totalCount;
	private int totalPrice;
}
