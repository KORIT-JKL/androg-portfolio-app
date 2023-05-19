package com.korit.androg.androg.dto.admin;

import java.util.List;

import com.korit.androg.androg.entity.Color;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class getColorResDto {
	private String colorName;
	
}
