package com.korit.androg.androg.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.admin.getColorResDto;
import com.korit.androg.androg.dto.admin.getProductRespDto;
import com.korit.androg.androg.dto.admin.getReviewsRespDto;
import com.korit.androg.androg.dto.admin.modifyProductReqDto;
import com.korit.androg.androg.dto.admin.registerProductReqDto;
import com.korit.androg.androg.entity.Products;

@Mapper
public interface AdminRepository {
	public List<getColorResDto> getColors();
	public void registerProductDetail(registerProductReqDto productReqDto);
	public List<Products> getProducts(int categoryId);
	public void productModify(modifyProductReqDto modifyProductReqDto);
	public void productDelte(int productId);
	public void modifySodlout(int productId, int soldoutFlag);
	public int popUpRegister (String content);
//	리뷰
	public List<getReviewsRespDto> getReviews();
	public void delteReivews(int reviewsId);
}
