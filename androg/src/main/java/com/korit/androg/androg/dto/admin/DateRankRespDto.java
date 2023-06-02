package com.korit.androg.androg.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
@Data
@Builder
@AllArgsConstructor
public class DateRankRespDto {
	private String date;
	private int totalDatePrice;
}
