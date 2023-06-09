package com.korit.androg.androg.controller;


import java.util.Map;

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
import com.korit.androg.androg.dto.ModifyPasswordReqDto;
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
	public ResponseEntity<?> authenticated(@RequestHeader(value = "Authorization") String accessToken) {
		return ResponseEntity.ok().body(authenticationService.authenticated(accessToken));
	}
	
	@GetMapping("/principal")
	public ResponseEntity<?> principal(@RequestHeader(value = "Authorization") String accessToken) {
		return ResponseEntity.ok().body(authenticationService.getPrincipal(accessToken));
	}	
	
	@PostMapping("/forgot")
	public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> requestMap) {
		return ResponseEntity.ok().body(authenticationService.forgotPassword(requestMap.get("email")));
	}
	@ValidAspect
	@PostMapping("/forgot/modify")
	public ResponseEntity<?> modifyPassword(@Valid @RequestBody ModifyPasswordReqDto modifyPasswordReqDto,BindingResult bindingResult) {
		return ResponseEntity.ok().body(authenticationService.modifypassword(modifyPasswordReqDto));

	}
	@PostMapping("/email")
	public ResponseEntity<?> authEmail(@RequestBody Map<String, String> requestMap) {
		return ResponseEntity.ok().body(authenticationService.authEmail(requestMap.get("checkemail")));
	}
}
