package com.korit.androg.androg.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import lombok.Data;

@Data
public class LoginReqDto {
	
	@Email
	@NotBlank
	private String email;
	
	
	private String password;
}
