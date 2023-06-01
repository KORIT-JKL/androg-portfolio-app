package com.korit.androg.androg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.aop.annotation.ValidAspect;
import com.korit.androg.androg.dto.order.OrderCompleteReqDto;
import com.korit.androg.androg.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OrderController {
	private final OrderService orderService;
	
	// api 수정 products/buying 
	@ValidAspect
	@PostMapping("/products/order")
	public ResponseEntity<?> completeOrder(@RequestBody OrderCompleteReqDto orderCompleteReqDto) {
		return ResponseEntity.ok().body(orderService.completeOrder(orderCompleteReqDto));
	}
	
	@PostMapping("/products/order/address/{addressId}")
	public ResponseEntity<?> saveDeliveryAddress(@PathVariable int addressId) {
		return ResponseEntity.ok().body(orderService.saveAddress(addressId));
		
	}
}
