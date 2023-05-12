package com.korit.androg.androg.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.korit.androg.androg.entity.Products;
import com.korit.androg.androg.repository.ProductsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductsService {
	private final ProductsRepository productsRepository;
	
	public List<Products> getProductsByCategoryId(int categoryId) {
		return productsRepository.getProductsByCategoryId(categoryId);
	}
	public Products getProductByProductId(int productId) {
		return productsRepository.getProductByProductId(productId);
	}
	
	public List<Products> getProductsBySearchInput(@RequestParam String searchInput) {
		System.out.println(productsRepository.getProductsBySearchInput(searchInput));
		return productsRepository.getProductsBySearchInput(searchInput);
	}
	
	
}
