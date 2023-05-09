package com.korit.androg.androg.repository;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.Authority;
import com.korit.androg.androg.entity.User;

@Mapper
public interface UserRepository {
	public User findUserByEmail(String email);
	public int saveUser(User user);
	public int saveAuthority(Authority authority);
}
