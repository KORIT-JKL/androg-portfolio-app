package com.korit.androg.androg.controller;


import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.aop.annotation.ValidAspect;
import com.korit.androg.androg.dto.LoginReqDto;
import com.korit.androg.androg.dto.SignupReqDto;
import com.korit.androg.androg.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
	
	private final AuthenticationService authenticationService;
	
	@ValidAspect
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto, BindingResult bindingResult) {
		return ResponseEntity.ok().body(authenticationService.signin(loginReqDto));
	}
	
	@ValidAspect
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@Valid @RequestBody SignupReqDto signupReqDto, BindingResult bindingResult) {
		
		authenticationService.checkDuplicatedEmail(signupReqDto.getEmail());
		authenticationService.signup(signupReqDto);
		
		return ResponseEntity.ok().body(true);
	}
	
	@GetMapping("/authenticated")
	public ResponseEntity<?> authenticated(String accessToken) {
		System.out.println(accessToken);
		return ResponseEntity.ok().body(authenticationService.authenticated(accessToken));
	}
	
	@GetMapping("/principal")
	public ResponseEntity<?> principal(@RequestHeader(value = "Authorization") String accessToken) {
		System.out.println(accessToken);
		return ResponseEntity.ok().body(authenticationService.getPrincipal(accessToken));
	}	
}
