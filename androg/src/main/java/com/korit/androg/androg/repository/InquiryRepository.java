package com.korit.androg.androg.repository;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface InquiryRepository {
	public int submitInquiry(Map<String, Object> requestMap);
}
