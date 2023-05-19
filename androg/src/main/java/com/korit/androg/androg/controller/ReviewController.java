package com.korit.androg.androg.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.review.ReviewRegisterReqDto;
import com.korit.androg.androg.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ReviewController {
	private final ReviewService reviewService;
	
	@GetMapping("/products/review/{productId}")
	public ResponseEntity<?> getReviews(@PathVariable int productId){
		return ResponseEntity.ok().body(reviewService.getReviews(productId));
	}
	
	@GetMapping("/product/{productId}/reviewproduct")
	public ResponseEntity<?> getProduct(@PathVariable int productId, int userId){
		Map<String, Object> requestMap = new HashMap<>();
		requestMap.put("userId", userId);
		requestMap.put("productId", productId);
		return ResponseEntity.ok().body(reviewService.getProduct(requestMap));
	}
	
	@PostMapping("/product/review/register")
	public ResponseEntity<?> reviewRegiset(@RequestBody ReviewRegisterReqDto reviewRegisterReqDto){
		System.out.println(reviewRegisterReqDto);
		return ResponseEntity.ok().body(reviewService.reviewRegister(reviewRegisterReqDto));
	}
	
	@PostMapping("/admin/test")
	public ResponseEntity<?> admintest(){
		return ResponseEntity.ok().body("admin");
	}
}
