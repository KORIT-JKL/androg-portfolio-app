package com.korit.androg.androg.dto.admin;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterProductReqDto {
	@NotBlank(message = "상품이름은 빈값이 안됩니다.")
	@NotEmpty(message = "상품이름은 빈값이 안됩니다.")
	private String productName;
//	@Pattern(regexp = "\\d+" ,message = "가격은 숫자만 입력이 가능합니다.")
	private int productPrice;
	@NotBlank
	private String categoryId;
	@NotBlank
	private String colorId;
	@NotBlank(message = "상품url은 빈값이 안됩니다.")
	@NotEmpty(message = "상품url은 빈값이 안됩니다.")
	private String productImg;
}
