package com.korit.androg.androg.service;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.exception.CustomException;

@Service
public class ErrorService {
	public void blankCheck(String content, int maxLengh) {
		if(content == null) {
			throw new CustomException("내용은 빈값은 안됩니다.");
		} else if(content.isBlank() || content.isEmpty()) {
			throw new CustomException("내용은 빈값은 안됩니다.");
		} else if(content.length()>maxLengh) {
			throw new CustomException(maxLengh +"자 이상은 안됩니다~");
		} return ;
	}
	
	public void blankCheck(String content) {
		if(content == null) {
			throw new CustomException("내용은 빈값은 안됩니다.");
		} else if(content.isBlank() || content.isEmpty()) {
			throw new CustomException("내용은 빈값은 안됩니다.");
		} return ;
	}
	
	public void minMaxLengthCheck(String str,String content, int min, int max) {
		if(content.length() < min || content.length() > max) {
			throw new CustomException(str +"은(는) 최소 "+ min + "자이상 최대" + max + "이하로 작성하세요");
		}
		return ;
	}

	
	public void idCategoryCheck(Integer id, String category) {
		if( id == null || id == 0) {
			throw new CustomException("유효한 상품번호를 입력해주세요");
		} else if(category.isBlank()) {
			throw new CustomException("문의사항을 선택해주세요.");
		}
		return;
	}
	public void productPriceBlankCheck(Integer price) {
		if(price == null ) {
			throw new CustomException("가격은 빈값은 안됩니다.");
		} 
		return;
	}
	
}
