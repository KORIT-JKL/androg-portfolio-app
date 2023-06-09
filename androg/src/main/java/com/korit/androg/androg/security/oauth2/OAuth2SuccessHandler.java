package com.korit.androg.androg.security.oauth2;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.korit.androg.androg.entity.User;
import com.korit.androg.androg.repository.UserRepository;
import com.korit.androg.androg.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final UserRepository userRepository;
	private final JwtTokenProvider jwtTokenProvider;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
		String email = oAuth2User.getAttribute("email");
		String provider = oAuth2User.getAttribute("provider");
		User userEntity = userRepository.findUserByEmail(email);
		
		if(userEntity == null) {
			String registerToken = jwtTokenProvider.generateOAuth2RegisterToken(authentication);
			String name = oAuth2User.getAttribute("name");
			response
			.sendRedirect(
					"http://otso.s3-website.ap-northeast-2.amazonaws.com/auth/oauth2/register"
								+"?registerToken=" + registerToken
								+ "&email=" + email
								+ "&name=" + URLEncoder.encode(name, "UTF-8") 
								+ "&provider=" + provider
					);
		}else {
			if(StringUtils.hasText(userEntity.getProvider())) {
				//회원가입이 되어 있고 provider가 등록된 경우
				if(!userEntity.getProvider().contains(provider)) {
					response.sendRedirect("http://otso.s3-website.ap-northeast-2.amazonaws.com/auth/oauth2/merge"	
							+ "?provider="
							+ provider
							+ "&email=" + email);
					return;
				}
				response.sendRedirect("http://otso.s3-website.ap-northeast-2.amazonaws.com/auth/oauth2/login"	
						+ "?accessToken=" +"Bearer " + jwtTokenProvider.generateToken(authentication).getAccessToken());
			}else {
				//회원가입은 되어 있지만 provider가 null인 경우
				response.sendRedirect("http://otso.s3-website.ap-northeast-2.amazonaws.com/auth/oauth2/merge"	
														+ "?provider="
														+ provider
														+ "&email=" + email);
			}
		}
	}

}
