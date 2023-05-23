package com.korit.androg.androg.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.admin.PopUpRespDto;
import com.korit.androg.androg.dto.admin.getColorResDto;
import com.korit.androg.androg.dto.admin.getProductRespDto;
import com.korit.androg.androg.dto.admin.getReviewsRespDto;
import com.korit.androg.androg.dto.admin.getReviewsReviewRespDto;
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
//popUp
	public List<PopUpRespDto> getPopUpList();
	public int popUpRegister (String content);
	public int popUpModify(String content);
//	리뷰
	public List<getReviewsRespDto> getReviews();
	public void delteReivews(int reviewsId);
	public List<getReviewsReviewRespDto> getReviewsNoReview();
	public List<getReviewsReviewRespDto> getReviewsYesReview();
	public void reviewReviewRegister(int reviewId, String content);
}
