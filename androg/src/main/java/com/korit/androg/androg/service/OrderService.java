package com.korit.androg.androg.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.order.OrderCompleteReqDto;
import com.korit.androg.androg.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
	private final OrderRepository orderRepository;
	public int completeOrder(OrderCompleteReqDto orderCompleteReqDto) {
		Map<String, Object> requestMap = new HashMap<>();
		requestMap.put("userId", orderCompleteReqDto.getUserId());
		requestMap.put("productId", orderCompleteReqDto.getProductId());
		requestMap.put("countNumber", orderCompleteReqDto.getCountNumber());
		requestMap.put("sizeName", orderCompleteReqDto.getSizeName());
		return orderRepository.completeOrder(requestMap);
	}
}	
