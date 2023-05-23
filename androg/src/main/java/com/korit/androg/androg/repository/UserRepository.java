package com.korit.androg.androg.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.Authority;
import com.korit.androg.androg.entity.OrderDetail;
import com.korit.androg.androg.entity.User;

@Mapper
public interface UserRepository {
	public User findUserByEmail(String email);
	public int saveUser(User user);
	public int saveAuthority(Authority authority);
	
	public List<OrderDetail>getOrderProducts(int userId);
	
	public int deleteUser(int userId);
}
