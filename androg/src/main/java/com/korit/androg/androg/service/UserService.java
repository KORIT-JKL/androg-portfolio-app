package com.korit.androg.androg.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.user.OrderProductsRespDto;
import com.korit.androg.androg.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;
	
	public List<OrderProductsRespDto> getOrderProducts(int userId){
		List<OrderProductsRespDto> orderProducts = new ArrayList<>();
		userRepository.getOrderProducts(userId).forEach(product->{
			orderProducts.add(product.toDto());
		});
		return orderProducts; 
	}
	
	public int deleteUser(int userId) {
		return userRepository.deleteUser(userId);
	}
}
