package com.korit.androg.androg.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.Product.CartReqDto;
import com.korit.androg.androg.dto.Product.CartRespDto;
import com.korit.androg.androg.dto.admin.AdminReviewIdReqDto;
import com.korit.androg.androg.entity.Products;
import com.korit.androg.androg.service.CartService;
import com.korit.androg.androg.service.ProductsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ProductsController {
	private final ProductsService productsService;
	private final CartService cartService;
	
	@GetMapping("/products/category/{categoryId}")
	public ResponseEntity<?> getProductsByCategoyrId (@PathVariable int categoryId, @RequestParam Map<String, Object> requestMap) {
		Map<String, Object> request = new HashMap<>();
		int startIndex = (Integer.parseInt((String)requestMap.get("page"))-1)*20;
		request.put("page", startIndex);
		request.put("categoryId", categoryId);
		request.put("select", Integer.parseInt((String)requestMap.get("select")));
		return ResponseEntity.ok().body(productsService.getProductsByCategoryId(request));
	}
	@GetMapping("/products/{productId}/details")
	public ResponseEntity<?> getProductByProductId (@PathVariable int productId) {
		return ResponseEntity.ok().body(productsService.getProductByProductId(productId));
	}
	
	@GetMapping("/products/search")
	public ResponseEntity<?> getProductsBySearchInput (@RequestParam Map<String, Object> searchParams) {
		Map<String, Object> requestMap = new HashMap<>(searchParams);
		return ResponseEntity.ok().body(productsService.getProductsBySearchInput(requestMap));
	}
	
	@GetMapping("/products/{productId}/sameName")
	public ResponseEntity<?> getSameNameProducts (@PathVariable int productId){

		return ResponseEntity.ok().body(productsService.getSameNameProductsByProductId(productId));
	}
	
	@PostMapping("/product/directBuy")
	public ResponseEntity<?> productsDirectBuy(@RequestBody CartReqDto addCartRequestDto){
		cartService.addCart(addCartRequestDto);
		return null;
	}
	@GetMapping("/products/adminReview")
	public ResponseEntity<?> getAdmingReview(AdminReviewIdReqDto adminReviewIdReqDto){
		
		return ResponseEntity.ok().body(productsService.getAdminReview(adminReviewIdReqDto));
	}

	
	
}
