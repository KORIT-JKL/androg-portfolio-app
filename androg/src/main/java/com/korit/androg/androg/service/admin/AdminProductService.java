package com.korit.androg.androg.service.admin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.admin.ColorRespDto;
import com.korit.androg.androg.dto.admin.ProductRespDto;
import com.korit.androg.androg.dto.admin.ModifyProductReqDto;
import com.korit.androg.androg.dto.admin.RegisterProductReqDto;
import com.korit.androg.androg.entity.Color;
import com.korit.androg.androg.exception.CustomException;
import com.korit.androg.androg.repository.admin.AdminProductRepository;
import com.korit.androg.androg.service.ErrorService;

import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class AdminProductService {
	private int maxLengh = 45;
	private int maxUrlLengh = 900;
	public final ErrorService errorService;
	public final AdminProductRepository adminProductRepository;
	public List<ColorRespDto> getColors() {
		List<ColorRespDto> colorRespDtos = new ArrayList<>();
		adminProductRepository.getColors().forEach(color ->{
			colorRespDtos.add(color.toDto());
		});
		return colorRespDtos;
	}
	public void registerProductDetails(RegisterProductReqDto productReqDto) {
		adminProductRepository.registerProductDetail(productReqDto);
		return ;
	}
	public List<ProductRespDto> getProducts(int categoryId) {
		List<ProductRespDto> resultList = new ArrayList<>();
		adminProductRepository.getProducts(categoryId).forEach((product) -> {
			resultList.add(product.toAdminDto());
		});
		return resultList; 
	}
	public void productModify(ModifyProductReqDto modifyProductReqDto) {
		errorService.blankCheck(modifyProductReqDto.getProductName(), maxLengh);
		errorService.blankCheck(modifyProductReqDto.getProductImg(), maxUrlLengh);
//		errorService.productPriceBlankCheck(modifyProductReqDto.getProductPrice());
		adminProductRepository.productModify(modifyProductReqDto);
		return ;
	}
	public void productDelte(int productId) {
		adminProductRepository.productDelte(productId);
		return ;
	}
	public void modifySoldOut(Map<String, Object> requestMap) {
		int productId = Integer.parseInt((String)requestMap.get("productId"));
		int soldoutFlag = Integer.parseInt((String)requestMap.get("value"));
		adminProductRepository.modifySodlout(productId,soldoutFlag);
		return ;
	}
}
