package com.korit.androg.androg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.service.ProductsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProductsController {
	private ProductsService productsService;
	
	@GetMapping("/products/{categoryId}")
	public ResponseEntity<?> getProductsByCategoyrId(@PathVariable int categoryId){
		System.out.println(categoryId);
		return ResponseEntity.ok().body(productsService.getProductsByCategoryId(categoryId));
	}
	
}
