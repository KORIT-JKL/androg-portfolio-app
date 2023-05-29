package com.korit.androg.androg.dto.auth.oauth2;

import lombok.Data;

@Data
public class OAuth2ProviderMergeReqDto {
	private String email;
	private String password;
	private String provider;
}
