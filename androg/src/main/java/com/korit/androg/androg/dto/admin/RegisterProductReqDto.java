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
	@NotNull
	@NotBlank(message = "빈값은 안되요 바보탱아")
	@NotEmpty
	private String productName;

//	@Pattern(regexp = "\\d+" ,message = "가격은 숫자만 입력이 가능합니다.")
	private int productPrice;
	@NotNull
	@NotBlank
	@NotEmpty
	private String categoryId;
	@NotNull
	@NotBlank
	@NotEmpty
	private String colorId;
	@NotNull
	@NotBlank
	@NotEmpty
	private String productImg;
}
