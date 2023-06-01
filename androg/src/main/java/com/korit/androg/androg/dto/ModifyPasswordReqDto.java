package com.korit.androg.androg.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ModifyPasswordReqDto {
	private String email;
	private String password;
}
