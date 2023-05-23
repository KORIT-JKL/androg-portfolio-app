package com.korit.androg.androg.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Notice {
	private int noticeId;
	private String subject;
	private String content;
}
