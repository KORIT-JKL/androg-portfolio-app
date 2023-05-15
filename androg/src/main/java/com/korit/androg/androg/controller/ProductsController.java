package com.korit.androg.androg.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
	
	@GetMapping("/category/{categoryId}")
	public ResponseEntity<?> getProductsByCategoyrId (@PathVariable int categoryId, @RequestParam int page) {
		Map<String, Object> requestMap = new HashMap<>();
		int startIndex = (page-1)*20;
		requestMap.put("page", startIndex);
		requestMap.put("categoryId", categoryId);
		
		return ResponseEntity.ok().body(productsService.getProductsByCategoryId(requestMap));
	}
	@GetMapping("/products/{productId}/details")
	public ResponseEntity<?> getProductByProductId (@PathVariable int productId) {
//		System.out.println(productId);
		return ResponseEntity.ok().body(productsService.getProductByProductId(productId));
	}
	
	@GetMapping("/products/search")
	public ResponseEntity<?> getProductsBySearchInput (@RequestParam Map<String, Object> searchParams) {
		Map<String, Object> requestMap = new HashMap<>(searchParams);
//		System.out.println(requestMap);
//		System.out.println(requestMap.get("searchParams[searchInput]"));
		
		return ResponseEntity.ok().body(productsService.getProductsBySearchInput(requestMap));
	}
	
}
