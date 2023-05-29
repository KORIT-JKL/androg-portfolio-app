package com.korit.androg.androg.service;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.korit.androg.androg.dto.auth.oauth2.OAuth2RegisterReqDto;
import com.korit.androg.androg.entity.Authority;
import com.korit.androg.androg.entity.User;
import com.korit.androg.androg.repository.UserRepository;
import com.korit.androg.androg.security.oauth2.OAuth2Attribute;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class OAuth2Service implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {
	
	private final UserRepository userRepository;
	
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		
		OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();
		
		OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);
		
		System.out.println(oAuth2User);
		
		String registrationId = userRequest.getClientRegistration().getRegistrationId();
		
		OAuth2Attribute oAuth2Attribute = OAuth2Attribute.of(registrationId, oAuth2User.getAttributes());
		
		Map<String, Object> attributes = oAuth2Attribute.convertToMap();
		
		return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), attributes, "email");
	}
	
	public int oauth2Register(OAuth2RegisterReqDto oAuth2RegisterReqDto) {
		System.out.println(oAuth2RegisterReqDto);
		User userEntity = oAuth2RegisterReqDto.toEntity();
		userRepository.saveUser(userEntity);
		return userRepository.saveAuthority(Authority.builder().userId(userEntity.getUserId()).roleId(2).build());
	}
	
//	public int oAuth2ProviderMerge(OAuth2ProviderMergeReqDto oAuth2ProviderMergeReqDto) {
//		User userEntity = userRepository.findUserByEmail(oAuth2ProviderMergeReqDto.getEmail());
//		
//		String provider = oAuth2ProviderMergeReqDto.getProvider();
//		if(StringUtils.hasText(userEntity.getProvider())) {
//			userEntity.setProvider(userEntity.getProvider() + "," + provider);
//		}else {
//			userEntity.setProvider(provider);
//		}
//		
//		return userRepository.updateProvider(userEntity);
//	}
}