package com.korit.androg.androg.service;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.entity.Payment;
import com.korit.androg.androg.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
	
	private final OrderRepository orderRepository; 
	
	public Payment getBuyingProducts(int userId) {
		return orderRepository.getBuyingProducts(userId);
	}
}
