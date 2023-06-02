package com.korit.androg.androg.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.admin.AdminReviewIdReqDto;
import com.korit.androg.androg.entity.AdminReview;
import com.korit.androg.androg.entity.Products;

@Mapper
public interface ProductsRepository {
	public List<Products> getProductsByCategoryId(Map<String, Object> reqeustMap);
	public Products getProductByProductId(int productId);
	public List<Products> getProductsBySearchInput(Map<String, Object> reqeustMap);
	public int getTotalCountByCategoryId(int categoryId);
	public int getTotalCountBySearchInput(String searchInput);
	public List<Products> getSameNameProductsByProductId(int productId);
//	카트
	public List<AdminReview> getAdminReviews(AdminReviewIdReqDto adminReviewIdReqDto);

}
