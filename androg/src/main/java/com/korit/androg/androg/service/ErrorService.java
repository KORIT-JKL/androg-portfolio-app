package com.korit.androg.androg.service;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.exception.CustomException;
@Service
public class ErrorService {
	
	public  void blankCheck(String content, int maxLengh) {
		if(content == null) {
			throw new CustomException("내용은 빈값은 안됩니다.");
		} else if(content.isBlank() || content.isEmpty()) {
			throw new CustomException("내용은 빈값은 안됩니다.");
		} else if(content.length()>maxLengh) {
			throw new CustomException(maxLengh +"자 이상은 안됩니다~");
		} return ;
	}
}
