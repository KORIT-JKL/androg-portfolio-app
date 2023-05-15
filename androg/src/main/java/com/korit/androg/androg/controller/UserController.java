package com.korit.androg.androg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.service.AuthenticationService;
import com.korit.androg.androg.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
	private final AuthenticationService authenticationService;
	private final UserService userService;
	
	@GetMapping("/user/mypage")
	public ResponseEntity<?> getPrincipal(String accessToken){
		System.out.println(accessToken);
		return ResponseEntity.ok().body(authenticationService.getPrincipal(accessToken));
	}
	
	@GetMapping("/user/mypage/purchases")
	public ResponseEntity<?> getOrderProducts(int userId){
		System.out.println(userId);
		return ResponseEntity.ok().body(userService.getOrderProducts(userId));
	}
}