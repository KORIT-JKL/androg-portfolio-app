package com.korit.androg.androg.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.admin.getColorResDto;

@Mapper
public interface AdminRepository {
	public List<getColorResDto> getColors();
}
