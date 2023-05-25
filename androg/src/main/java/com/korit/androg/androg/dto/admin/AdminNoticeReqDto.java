package com.korit.androg.androg.dto.admin;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdminNoticeReqDto {
	private int noticeId;
	private String Subject;
	private String content;
}
