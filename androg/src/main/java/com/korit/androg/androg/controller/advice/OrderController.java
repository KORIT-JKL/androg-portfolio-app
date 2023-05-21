package com.korit.androg.androg.controller.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.order.OrderCompleteReqDto;
import com.korit.androg.androg.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class OrderController {
	private final OrderService orderService;
	
	@PostMapping("/payment/order")
	public ResponseEntity<?> completeOrder(@RequestBody OrderCompleteReqDto orderCompleteReqDto) {
		return ResponseEntity.ok().body(orderService.completeOrder(orderCompleteReqDto));
	}
	
//	@PostMapping("/payment/address")
//	public ResponseEntity<?> saveDelivery() {
//		
//	}
}
