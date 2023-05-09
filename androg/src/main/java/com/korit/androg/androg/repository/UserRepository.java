package com.korit.androg.androg.repository;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.User;

@Mapper
public interface UserRepository {
	public User findUserByEmail(String email);
}
