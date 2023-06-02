package com.korit.androg.androg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.korit.androg.androg.security.jwt.JwtTokenProvider;
import com.korit.androg.androg.service.AuthenticationService;
import com.korit.androg.androg.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class UserController {
	private final UserService userService;
	private final AuthenticationService authenticationService;
	@GetMapping("/user/mypage/purchases")
	public ResponseEntity<?> getOrderProducts(int userId) {
		return ResponseEntity.ok().body(userService.getOrderProducts(userId));
	}

	@DeleteMapping("/user/delete")
	public ResponseEntity<?> withdrawal(int userId) {
		return ResponseEntity.ok().body(userService.deleteUser(userId));
	}

	@PostMapping("/user/mypage/profile/img")
	public ResponseEntity<?> updateProfile(@RequestPart MultipartFile profileImgFile) {
		return ResponseEntity.ok(userService.updateProfile(profileImgFile));
	}

	@GetMapping("/token/authenticated")
	public ResponseEntity<?> tokenAuthenticated(@RequestHeader(value = "Authorization") String accessToken) {
		return ResponseEntity.ok().body(authenticationService.getPrincipal(accessToken));
	}
}
