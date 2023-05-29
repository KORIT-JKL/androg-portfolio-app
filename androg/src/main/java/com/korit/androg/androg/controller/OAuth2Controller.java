package com.korit.androg.androg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.aop.annotation.ValidAspect;
import com.korit.androg.androg.dto.auth.oauth2.OAuth2RegisterReqDto;
import com.korit.androg.androg.security.jwt.JwtTokenProvider;
import com.korit.androg.androg.service.OAuth2Service;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class OAuth2Controller {
	private final OAuth2Service oAuth2Service;
	private final JwtTokenProvider jwtTokenProvider;
	
	@PostMapping("/auth/oauth2/register")
	public ResponseEntity<?> oauth2Register(@RequestHeader(value="registerToken") String registerToken
											,@RequestBody OAuth2RegisterReqDto oAuth2RegisterReqDto){
		boolean validated = jwtTokenProvider.validateToken(jwtTokenProvider.getToken(registerToken));
		
		if(!validated) {
			return ResponseEntity.badRequest().body("회원가인 요청시간이 초과하였습니다.");
		}
		
		
		return ResponseEntity.ok().body(oAuth2Service.oauth2Register(oAuth2RegisterReqDto));
	}
}
