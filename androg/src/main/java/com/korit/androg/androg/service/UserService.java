package com.korit.androg.androg.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.korit.androg.androg.dto.user.OrderProductsRespDto;
import com.korit.androg.androg.entity.User;
import com.korit.androg.androg.repository.UserRepository;
import com.korit.androg.androg.security.PrincipalUser;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	@Value("${file.path}")
	private String filePath;
	private final UserRepository userRepository;
	
	public List<OrderProductsRespDto> getOrderProducts(int userId){
		List<OrderProductsRespDto> orderProducts = new ArrayList<>();
		userRepository.getOrderProducts(userId).forEach(product->{
			orderProducts.add(product.toDto());
		});
		return orderProducts; 
	}
	
	public int updateProfile(MultipartFile profileImgFile) {
		String originFileName = profileImgFile.getOriginalFilename();
		String extension = originFileName.substring(originFileName.lastIndexOf("."));
		String tempFileName = UUID.randomUUID().toString().replaceAll("-","") + extension;
		
		Path uploadPath = Paths.get(filePath+"profile/"+tempFileName);
		
		
		File f = new File(filePath + "profile/");
		
		if(!f.exists()) {
			f.mkdirs();
		}
		
		try {
			Files.write(uploadPath, profileImgFile.getBytes());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		PrincipalUser principalUser = (PrincipalUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		
		return userRepository.updateProfileImg(User.builder().userId(principalUser.getUserId()).profileImg(tempFileName).build());
	}
	
	public int deleteUser(int userId) {
		return userRepository.deleteUser(userId);
	}
}
