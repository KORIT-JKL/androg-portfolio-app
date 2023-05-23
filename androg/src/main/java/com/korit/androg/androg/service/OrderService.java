package com.korit.androg.androg.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.order.OrderCompleteReqDto;
import com.korit.androg.androg.entity.Order;
import com.korit.androg.androg.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
	private final OrderRepository orderRepository;
	
	public int completeOrder(OrderCompleteReqDto orderCompleteReqDto) {
		Order order = Order
				.builder()
				.userId(orderCompleteReqDto.getUserId())
				.addressId(orderCompleteReqDto.getAddressId())
				.build();
		orderRepository.saveOrder(order);
		
		Map<String, Object> requestMap = new HashMap<>();
		requestMap.put("userId", orderCompleteReqDto.getUserId());
		requestMap.put("products", orderCompleteReqDto.getProducts());
		requestMap.put("orderId", order.getOrderId());
		System.out.println(requestMap);
		return orderRepository.completeOrder(requestMap);
	}
	
	public int saveAddress(int addressId) {
		return orderRepository.saveAddress(addressId);
	}
}	
