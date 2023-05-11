package com.korit.androg.androg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
	private final AuthenticationService authenticationService;
	
	@GetMapping("user/mypage")
	public ResponseEntity<?> getPrincipal(String accessToken){
		return ResponseEntity.ok().body(authenticationService.getPrincipal(accessToken));
	}
}
