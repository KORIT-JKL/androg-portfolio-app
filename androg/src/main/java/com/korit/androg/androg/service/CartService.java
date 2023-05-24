package com.korit.androg.androg.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.Product.CartReqDto;
import com.korit.androg.androg.dto.Product.CartRespDto;
import com.korit.androg.androg.entity.Products;
import com.korit.androg.androg.repository.CartRepository;
import com.korit.androg.androg.repository.ProductsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {
	private final CartRepository cartRepository;
	public void addCart(CartReqDto addCartRequestDto) {
		Map<String, Object> requestMap = new HashMap<>();
		requestMap.put("userId", addCartRequestDto.getUserId());
		requestMap.put("productId", addCartRequestDto.getProductId());
		requestMap.put("sizeName", addCartRequestDto.getSizeName());
		requestMap.put("countNumber", addCartRequestDto.getCountNumber());
		cartRepository.addCart(requestMap);
		return;
	}
	
	public List<CartRespDto> getCartByUserId(int userId) {
		return cartRepository.getCartByuserId(userId);
	}
	
	public void deleteCartByCartId(int cartId) {
		cartRepository.deleteCartByCartId(cartId);
		return ;
	}
	
	public void plusCountByCartId(int cartId) {
		cartRepository.plusCountByCartId(cartId);
		return ;
	}
	public void minusCountByCartId(int cartId,int countNumber) {
		if(countNumber == 1 ) {
			cartRepository.deleteCartByCartId(cartId);
		}
		cartRepository.minusCountByCartId(cartId);
		return ;
	}
	
	
	
}
