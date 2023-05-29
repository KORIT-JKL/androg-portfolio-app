package com.korit.androg.androg.dto.auth.oauth2;

import javax.validation.constraints.Pattern;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.korit.androg.androg.entity.User;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OAuth2RegisterReqDto {
	private String email;
	private String name;
	private String password;
	private String provider;
	
	public User toEntity() {
		return User.builder()
				.email(email)
				.name(name)
				.password(new BCryptPasswordEncoder().encode(password))
				.provider(provider)
				.build();
	}

}