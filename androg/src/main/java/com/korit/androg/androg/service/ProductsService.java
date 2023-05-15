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
	
	public Map<String, Object> getProductsBySearchInput(Map<String,Object> requestMap) {
		List<Products> productList = new ArrayList<>();
		Map<String, Object> mapperRequestMap = new HashMap<>();
		mapperRequestMap.put("page", requestMap.get("searchParams[page]"));
		mapperRequestMap.put("searhInput", requestMap.get("searchParams[searchInput]"));
		productList = productsRepository.getProductsBySearchInput(mapperRequestMap);
		int productTotalCount = productsRepository.getTotalCountBySearchInput((String)requestMap.get("searchParams[searchInput]"));
		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("productList", productList);
		responseMap.put("productTotalCount",productTotalCount);
		return responseMap;
	}
	
	
}