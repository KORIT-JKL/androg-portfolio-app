package com.korit.androg.androg.controller;


import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.LoginReqDto;
import com.korit.androg.androg.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
	
	private final AuthenticationService authenticationService;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto) {
		System.out.println(loginReqDto);
		System.out.println(authenticationService.signin(loginReqDto));
		return ResponseEntity.ok().body(authenticationService.signin(loginReqDto));
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> signup() {
		return null;
	}
}
