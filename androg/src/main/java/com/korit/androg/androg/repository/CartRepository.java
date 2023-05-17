package com.korit.androg.androg.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.Product.addCartRequestDto;
import com.korit.androg.androg.dto.Product.getCartResponseDto;
@Mapper
public interface CartRepository {
	public void addCart(Map<String, Object> reqeustMap);
	public addCartRequestDto getCart(int userId);
	public List<getCartResponseDto> getCartByuserId(int userId);
	public void deleteCartByCartId(int cartId);
	public void plusCountByCartId(int cartId);
	public void minusCountByCartId(int cartId);
}
