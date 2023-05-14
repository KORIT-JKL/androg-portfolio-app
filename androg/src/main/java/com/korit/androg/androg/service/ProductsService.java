package com.korit.androg.androg.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.korit.androg.androg.entity.Products;
import com.korit.androg.androg.repository.ProductsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductsService {
	private final ProductsRepository productsRepository;
	
	public Map<String, Object> getProductsByCategoryId(Map<String,Object> reqeustMap) {
		List<Products> productList = new ArrayList<>();
		productList = productsRepository.getProductsByCategoryId(reqeustMap);
		System.out.println(productList);
		int productTotalCount = productsRepository.getTotalCountByCategoryId((int)reqeustMap.get("categoryId"));
		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("productList", productList);
		responseMap.put("productTotalCount", productTotalCount);
 		return responseMap;
	}
	public Products getProductByProductId(int productId) {
		return productsRepository.getProductByProductId(productId);
	}
	
	public List<Products> getProductsBySearchInput(@RequestParam String searchInput) {
		System.out.println(productsRepository.getProductsBySearchInput(searchInput));
		return productsRepository.getProductsBySearchInput(searchInput);
	}
	
	
}
