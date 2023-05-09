package com.korit.androg.androg.controller.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.korit.androg.androg.dto.common.ErrorResponseDto;
import com.korit.androg.androg.exception.CustomException;

@RestControllerAdvice
public class AdviceController {
	
	@ExceptionHandler(CustomException.class)
	public ResponseEntity<?> customException(CustomException e) {
		return ResponseEntity.badRequest().body(new ErrorResponseDto<>(e.getMessage(), e.getErrorMap()));
	}
}
