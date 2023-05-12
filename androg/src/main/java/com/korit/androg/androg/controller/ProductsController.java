package com.korit.androg.androg.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.service.ProductsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProductsController {
	private final ProductsService productsService;
	
	@GetMapping("/products/{categoryId}")
	public ResponseEntity<?> getProductsByCategoyrId (@PathVariable int categoryId) {
//		System.out.println(categoryId);
		System.out.println(productsService.getProductsByCategoryId(categoryId));
		return ResponseEntity.ok().body(productsService.getProductsByCategoryId(categoryId));
	}
	@GetMapping("/products/{productId}/details")
	public ResponseEntity<?> getProductByProductId (@PathVariable int productId) {
//		System.out.println(productId);
		return ResponseEntity.ok().body(productsService.getProductByProductId(productId));
	}
	
	@GetMapping("/products/search")
	public ResponseEntity<?> getProductsBySearchInput (@RequestParam String searchInput) {
		System.out.println(searchInput);
		return ResponseEntity.ok().body(productsService.getProductsBySearchInput(searchInput));
	}
	
}
