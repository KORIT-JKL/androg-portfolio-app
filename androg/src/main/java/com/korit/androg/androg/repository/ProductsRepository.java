package com.korit.androg.androg.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.entity.Products;

@Mapper
public interface ProductsRepository {
	public List<Products> getProductsByCategoryId(int categoryId);
	public Products getProductByProductId(int productId);
}
