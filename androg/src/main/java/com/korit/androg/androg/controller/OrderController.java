package com.korit.androg.androg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OrderController {
	
	private final OrderService orderService;
	
	@GetMapping("/products/payment")
	public ResponseEntity<?> getBuyingProducts(int userId) {
		return ResponseEntity.ok().body(orderService.getBuyingProducts(userId));
	}
}
