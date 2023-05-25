package com.korit.androg.androg.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.InquiryAnswer;

@Mapper
public interface InquiryRepository {
	public int submitInquiry(Map<String, Object> requestMap);
	public List<InquiryAnswer> getAnswer(int userId);
}
