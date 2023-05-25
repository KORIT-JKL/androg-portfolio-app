package com.korit.androg.androg.repository.admin;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.korit.androg.androg.dto.admin.ModifyProductReqDto;
import com.korit.androg.androg.dto.admin.RegisterProductReqDto;
import com.korit.androg.androg.entity.Color;
import com.korit.androg.androg.entity.Products;
@Mapper
public interface AdminProductRepository {
	public List<Color> getColors();
	public void registerProductDetail(RegisterProductReqDto productReqDto);
	public List<Products> getProducts(int categoryId);
	public void productModify(ModifyProductReqDto modifyProductReqDto);
	public void productDelte(int productId);
	public void modifySodlout(int productId, int soldoutFlag);
}
