package com.korit.androg.androg.dto.admin;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModifyProductReqDto {
	private int productId;
	@NotBlank(message = "상품이름은 빈값이 안됩니다.")
	@NotEmpty(message = "상품이름은 빈값이 안됩니다.")
	@Size(min =1 , max = 45 , message = "상품이름은 1~45자까지 입력이 가능합니다.")
	private String productName;
	private int productPrice;
	private String categoryId;
	private String colorId;
	@NotBlank(message = "상품이름은 빈값이 안됩니다.")
	@NotEmpty(message = "상품이름은 빈값이 안됩니다.")
	private String productImg;
	private String sizeS;
	private String sizeM;
	private String sizeL;
	private String sizeXL;
	private String sizeXXL;
}
