package com.korit.androg.androg.entity;

import com.korit.androg.androg.dto.admin.AdminReviewRespdto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminReview {
	private int reviewId;
	private String content;
}
