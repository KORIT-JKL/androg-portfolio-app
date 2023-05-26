package com.korit.androg.androg.repository.admin;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.admin.InquiryAnswerReqDto;
import com.korit.androg.androg.entity.Inquiry;

@Mapper
public interface AdminInquiryRepository {
	public List<Inquiry> getInquiries();
	public int submitAnswer(InquiryAnswerReqDto inquiryAnswerReqDto);
}
