package com.korit.androg.androg.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.Product.addCartRequestDto;
import com.korit.androg.androg.dto.Product.getCartResponseDto;
import com.korit.androg.androg.entity.Products;

@Mapper
public interface ProductsRepository {
	public List<Products> getProductsByCategoryId(Map<String, Object> reqeustMap);
	public Products getProductByProductId(int productId);
	public List<Products> getProductsBySearchInput(Map<String, Object> reqeustMap);
	public int getTotalCountByCategoryId(int categoryId);
	public int getTotalCountBySearchInput(String searchInput);
	
//	카트
	public void addCart(Map<String, Object> reqeustMap);
	public addCartRequestDto getCart(int userId);
	public List<getCartResponseDto> getCartByuserId(int userId);
	public void deleteCartByCartId(int cartId);
	public void plusCountByCartId(int cartId);
	public void minusCountByCartId(int cartId);
}
