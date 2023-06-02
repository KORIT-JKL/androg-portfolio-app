package com.korit.androg.androg.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.Product.CartReqDto;
import com.korit.androg.androg.dto.Product.CartRespDto;
import com.korit.androg.androg.repository.CartRepository;
import com.korit.androg.androg.security.PrincipalUser;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {
	private final CartRepository cartRepository;
	public void addCart(CartReqDto addCartRequestDto) {
		PrincipalUser user = (PrincipalUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Map<String, Object> requestMap = new HashMap<>();
		requestMap.put("userId", user.getUserId());
		requestMap.put("productId", addCartRequestDto.getProductId());
		requestMap.put("sizeName", addCartRequestDto.getSizeName());
		requestMap.put("countNumber", addCartRequestDto.getCountNumber());
		if(cartRepository.checkSameProductInCart(requestMap) ==  0) {
			cartRepository.addCart(requestMap);
		} else {
			cartRepository.sameProductCountUp(requestMap);
		}
		return;
	}
	
	public List<CartRespDto> getCartByUserId(int userId) {
		List<CartRespDto> cartRespDtos = new ArrayList<>();
		cartRepository.getCartByuserId(userId).forEach((cart) -> {
		cartRespDtos.add(cart.toDto());
		});
				
		
		return cartRespDtos;
	}
	
	public int deleteCartByCartId(int cartId) {
		
		return cartRepository.deleteCartByCartId(cartId);
	}
	
	public int plusCountByCartId(int cartId) {
		
		return cartRepository.plusCountByCartId(cartId);
	}
	public int minusCountByCartId(int cartId,int countNumber) {
		if(countNumber == 1 ) {
			return cartRepository.deleteCartByCartId(cartId);
		}
		
		return cartRepository.minusCountByCartId(cartId);
	}
	
	
	
}
