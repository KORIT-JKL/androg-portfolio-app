package com.korit.androg.androg.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.order.OrderCompleteReqDto;
import com.korit.androg.androg.dto.order.SaveAddressReqDto;
import com.korit.androg.androg.entity.Order;
import com.korit.androg.androg.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
	private final OrderRepository orderRepository;
	
	public int completeOrder(OrderCompleteReqDto orderCompleteReqDto) {
		Order order = Order.builder().userId(orderCompleteReqDto.getUserId()).build();
		orderRepository.saveOrder(order);
		
		Map<String, Object> requestMap = new HashMap<>();
		requestMap.put("userId", orderCompleteReqDto.getUserId());
		requestMap.put("products", orderCompleteReqDto.getProducts());
		requestMap.put("orderId", order.getOrderId());
		System.out.println(requestMap);
		return orderRepository.completeOrder(requestMap);
	}
	
	public int saveAddress(SaveAddressReqDto saveAddressReqDto) {
		Map<String, Object> requestMap = new HashMap<>();
		requestMap.put("arrivalId", saveAddressReqDto.getAddressId());
		requestMap.put("addressId", saveAddressReqDto.getAddressId());
		requestMap.put("phone", saveAddressReqDto.getPhone());
		return orderRepository.saveAddress(requestMap);
	}
}	
