package com.korit.androg.androg.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.review.ReviewModifyReqDto;
import com.korit.androg.androg.dto.review.ReviewRegisterReqDto;
import com.korit.androg.androg.service.ErrorService;
import com.korit.androg.androg.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ReviewController {
	private final ReviewService reviewService;
	private final ErrorService errorService;
	private int minReviewLength = 5;
	private int maxReviewLength = 20;
	@GetMapping("/products/review/{productId}")
	public ResponseEntity<?> getReviews(@PathVariable int productId){
		return ResponseEntity.ok().body(reviewService.getReviews(productId));
	}
	
	@GetMapping("/product/{orderDetailId}/reviewproduct")
	public ResponseEntity<?> getProduct(@PathVariable int orderDetailId, int userId, int productId){
		Map<String, Object> requestMap = new HashMap<>();
		requestMap.put("userId", userId);
		requestMap.put("productId", productId);
		requestMap.put("orderDetailId",orderDetailId);
		return ResponseEntity.ok().body(reviewService.getProduct(requestMap));
	}
	
	@PostMapping("/product/review/register")
	public ResponseEntity<?> reviewRegiset(@RequestBody ReviewRegisterReqDto reviewRegisterReqDto){
		errorService.minMaxLengthCheck(reviewRegisterReqDto.getContent(), minReviewLength, maxReviewLength);
		return ResponseEntity.ok().body(reviewService.reviewRegister(reviewRegisterReqDto));
	}
	
	@PostMapping("/admin/test")
	public ResponseEntity<?> admintest(){
		return ResponseEntity.ok().body("admin");
	}
	
	@PutMapping("/product/review/reviewflag")
	public ResponseEntity<?> reviewFlag(@RequestBody Map<String, Object> requestMap){
		return ResponseEntity.ok().body(reviewService.reviewFlag(requestMap));
	}
	@PutMapping("/product/review/modify")
	public ResponseEntity<?> reviewModify(@RequestBody ReviewModifyReqDto modifyReqDto){
		errorService.minMaxLengthCheck(modifyReqDto.getContent(), minReviewLength, maxReviewLength);
		return ResponseEntity.ok().body(reviewService.reviewModify(modifyReqDto));
	}
}
