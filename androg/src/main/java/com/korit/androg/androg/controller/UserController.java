package com.korit.androg.androg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.service.AuthenticationService;
import com.korit.androg.androg.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;

	
	@GetMapping("/user/mypage/purchases")
	public ResponseEntity<?> getOrderProducts(int userId){
		return ResponseEntity.ok().body(userService.getOrderProducts(userId));
	}
	
	@DeleteMapping("/user/{userId}")
	public ResponseEntity<?> withdrawal(int userId) {
		return ResponseEntity.ok().body(userService.deletelUser(userId));
	}
}
