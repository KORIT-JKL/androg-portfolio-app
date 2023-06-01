package com.korit.androg.androg.service;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.LoginReqDto;
import com.korit.androg.androg.dto.SignupReqDto;
import com.korit.androg.androg.dto.ModifyPasswordReqDto;
import com.korit.androg.androg.dto.auth.JwtRespDto;
import com.korit.androg.androg.dto.auth.PrincipalRespDto;
import com.korit.androg.androg.entity.Authority;
import com.korit.androg.androg.entity.User;
import com.korit.androg.androg.exception.CustomException;
import com.korit.androg.androg.exception.ErrorMap;
import com.korit.androg.androg.repository.UserRepository;
import com.korit.androg.androg.security.jwt.JwtTokenProvider;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements UserDetailsService {
	
	private final JwtTokenProvider jwtTokenProvider;
	private final UserRepository userRepository;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JavaMailSender javaMailSender;
	public void checkDuplicatedEmail(String email) {
		if(userRepository.findUserByEmail(email) != null) {
			throw new CustomException("Duplicated Email",
					ErrorMap.builder()
					.put("email", "이미 사용중인 email입니다.")
					.build());
		};
	};
	
	public void signup(SignupReqDto signupReqDto) {
		User userEntity = signupReqDto.toEntity();
		userRepository.saveUser(userEntity);
		userRepository.saveAuthority(Authority.builder().userId(userEntity.getUserId()).roleId(2).build());
	};
	
	
	public JwtRespDto signin(LoginReqDto loginReqDto) {
		
		User userEntity = userRepository.findUserByEmail(loginReqDto.getEmail());
		
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		if(!passwordEncoder.matches(loginReqDto.getPassword(), userEntity.getPassword())) {
			throw new CustomException("로그인실패",ErrorMap.builder().put("password", "사용자 정보를 확인하세요").build());
		}
		
		UsernamePasswordAuthenticationToken authenticationToken =
				new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword());
		
		Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
		return jwtTokenProvider.generateToken(authentication);
	}
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User userEntity = userRepository.findUserByEmail(username);
		
		if(userEntity == null ) {
			throw new CustomException("로그인 실패", ErrorMap.builder().put("email", "사용자 정보를 확인하세요").build());
		}
		
		return userEntity.toPrincipal();
	}
	
	public boolean authenticated(String accessToken) {
		return jwtTokenProvider.validateToken(jwtTokenProvider.getToken(accessToken));
	}
	
	public PrincipalRespDto getPrincipal(String accessToken) {
		Claims claims = jwtTokenProvider.getClaims(jwtTokenProvider.getToken(accessToken));
		User userEntity = userRepository.findUserByEmail(claims.getSubject());
			
		return PrincipalRespDto.builder()
					.userId(userEntity.getUserId())
					.email(userEntity.getEmail())
					.name(userEntity.getName())
					.authorities((String) claims.get("auth"))
					.profileImg(userEntity.getProfileImg())
					.build();
	}
	
	public Map<String, Object> forgotPassword(String email) {
		User userEntity = userRepository.findUserByEmail(email);
		Map<String, Object> responseMap = new HashMap<>();
		if(userEntity == null) {
			responseMap.put("result", 2);
			return responseMap;
		}
		MimeMessage message = javaMailSender.createMimeMessage();
		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
			helper.setSubject("ANDROG 비밀번호 찾기");
			helper.setFrom("ANDROG@naver.com");
			helper.setTo(email);
			String token = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 6);
			message.setText(
					"<div>"
					+ "<h1>비밀번호 찾기</h1>"
					+ "<p>아래의 코드를 웹페이지에서 입력해주세요</p>"
					+ "<h1>" + token +"</h1>"
					+ "</div>", "utf-8", "html");
			javaMailSender.send(message);
			responseMap.put("token", token);
			responseMap.put("result", 1);
			return responseMap;
		}catch (Exception e) {
			responseMap.put("result", 2);
			return responseMap;
		}

	}
	public Map<String, Object> authEmail(String email) {
		User userEntity = userRepository.findUserByEmail(email);
		Map<String, Object> responseMap = new HashMap<>();
		if(userEntity != null) {
			responseMap.put("result", 2);
			return responseMap;
		}
		MimeMessage message = javaMailSender.createMimeMessage();
		try {
			MimeMessageHelper helper = new MimeMessageHelper(message, false, "utf-8");
			helper.setSubject("ANDROG 이메일 인증");
			helper.setFrom("ANDROG@naver.com");
			helper.setTo(email);
			String token = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 6);
			message.setText(
					"<div>"
					+ "<h1>이메일 인증</h1>"
					+ "<p>아래의 코드를 웹페이지에서 입력해주세요</p>"
					+ "<h1>" + token +"</h1>"
					+ "</div>", "utf-8", "html");
			javaMailSender.send(message);
			responseMap.put("token", token);
			responseMap.put("result", 1);
			return responseMap;
		}catch (Exception e) {
			responseMap.put("result", 2);
			return responseMap;
		}

	}
	public int modifypassword(ModifyPasswordReqDto modifyPasswordReqDto) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		
		String password = passwordEncoder.encode(modifyPasswordReqDto.getPassword()); 
		
		modifyPasswordReqDto.setPassword(password);
		
		
		return userRepository.modifyPassword(modifyPasswordReqDto);
	}
	
}
