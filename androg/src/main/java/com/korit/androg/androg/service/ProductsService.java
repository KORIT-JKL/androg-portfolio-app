package com.korit.androg.androg.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.Product.SameProductRespDto;
import com.korit.androg.androg.dto.admin.AdminReviewIdReqDto;
import com.korit.androg.androg.entity.AdminReview;
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
		mapperRequestMap.put("page", (Integer.parseInt((String)requestMap.get("searchParams[setSearchPage]"))-1)*20 );
		mapperRequestMap.put("searhInput", requestMap.get("searchParams[setSearchInput]"));
		productList = productsRepository.getProductsBySearchInput(mapperRequestMap);
		int productTotalCount = productsRepository.getTotalCountBySearchInput((String)requestMap.get("searchParams[setSearchInput]"));
		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("productList", productList);
		responseMap.put("productTotalCount",productTotalCount);
		return responseMap;

	}
	public List<SameProductRespDto> getSameNameProductsByProductId(int productId) {
		List<SameProductRespDto> productRespDtos = new ArrayList<>();
		productsRepository.getSameNameProductsByProductId(productId).forEach((product) -> {
			productRespDtos.add(product.toSameProductDto());
		});
		return productRespDtos;
	}
	//여기서부터 cart
	public List<AdminReview> getAdminReview(AdminReviewIdReqDto adminReviewIdReqDto) {
		return productsRepository.getAdminReviews(adminReviewIdReqDto);
	}
	
	
}
