package com.korit.androg.androg.dto.admin;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class getReviewsRespDto {
	private int reviewId;
	private String name;
	private String productName;
	private String content;
	private Date date;
}
