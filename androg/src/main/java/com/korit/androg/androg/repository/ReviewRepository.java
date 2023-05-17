package com.korit.androg.androg.repository;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.OrderProducts;
import com.korit.androg.androg.entity.Review;

@Mapper
public interface ReviewRepository {
	public OrderProducts getProduct(Map<String, Object> requestMap);
	
	public int reviewRegister(Review review);
}
