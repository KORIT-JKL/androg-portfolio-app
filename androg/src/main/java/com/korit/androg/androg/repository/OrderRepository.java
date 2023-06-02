package com.korit.androg.androg.repository;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.Order;

@Mapper
public interface OrderRepository {
	public int completeOrder(Map<String, Object> requestMap);
	public int saveOrder(Order order);
}
