package com.korit.androg.androg.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.Cart;
@Mapper
public interface CartRepository {
	public int checkSameProductInCart(Map<String, Object> reqeustMap);
	public void sameProductCountUp(Map<String, Object> reqeustMap);
	public void addCart(Map<String, Object> reqeustMap);
	public List<Cart> getCartByuserId(int userId);
	public int deleteCartByCartId(int cartId);
	public int plusCountByCartId(int cartId);
	public int minusCountByCartId(int cartId);
}
