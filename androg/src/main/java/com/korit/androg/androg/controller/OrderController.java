package com.korit.androg.androg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.order.OrderCompleteReqDto;
import com.korit.androg.androg.dto.order.SaveAddressReqDto;
import com.korit.androg.androg.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OrderController {
	private final OrderService orderService;
	
	// api 수정 products/buying 
	@PostMapping("/products/order")
	public ResponseEntity<?> completeOrder(@RequestBody OrderCompleteReqDto orderCompleteReqDto) {
		System.out.println(orderCompleteReqDto);
		return ResponseEntity.ok().body(orderService.completeOrder(orderCompleteReqDto));
	}
	
	@PostMapping("/products/address")
	public ResponseEntity<?> saveDeliveryAddress(@RequestBody SaveAddressReqDto saveAddressReqDto) {
		return ResponseEntity.ok().body(orderService.saveAddress(saveAddressReqDto));
		
	}
}
