package com.korit.androg.androg.controller;


import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.LoginReqDto;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto) {
		
		return ResponseEntity.ok().body(null);
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> signup() {
		return null;
	}
}
