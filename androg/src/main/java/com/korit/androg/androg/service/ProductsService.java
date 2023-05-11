package com.korit.androg.androg.service;

import java.util.List;

import org.springframework.stereotype.Service;

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
	
	
	
	
}
