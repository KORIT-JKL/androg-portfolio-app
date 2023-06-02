package com.korit.androg.androg.security.jwt;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.korit.androg.androg.dto.auth.JwtRespDto;
import com.korit.androg.androg.entity.User;
import com.korit.androg.androg.repository.UserRepository;
import com.korit.androg.androg.security.PrincipalUser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SecurityException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtTokenProvider {
	@Autowired
	private UserRepository userRepository;
	private final Key key;

	public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
		key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
	}

	public JwtRespDto generateToken(Authentication authentication) {
		System.out.println(authentication.getPrincipal().getClass());
		String email = null;
		if (authentication.getPrincipal().getClass() == PrincipalUser.class) {
			// PrincipalUser
			PrincipalUser principalsUser = (PrincipalUser) authentication.getPrincipal();
			email = principalsUser.getEmail();
		} else {
			// OAuth2User
			OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
			email = oAuth2User.getAttribute("email");
		}
		if (authentication.getAuthorities() == null) {
			throw new RuntimeException("등록된 권한이 없습니다.");
		}

		StringBuilder builder = new StringBuilder();

		authentication.getAuthorities().forEach(authority -> {
			builder.append(authority.getAuthority() + ",");
		});

		builder.delete(builder.length() - 1, builder.length());
		String authorities = builder.toString();

		Date tokenExpiresDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);

		String accessToken = Jwts.builder()
				.setSubject(authentication.getName())
				.claim("auth", authorities)
				.claim("email", email)
				.setExpiration(tokenExpiresDate)
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();

		return JwtRespDto.builder().grantType("Bearer").accessToken(accessToken).build();
	}

	public boolean validateToken(String token) {

		try {
			 Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
			return true;
		} catch (SecurityException | MalformedJwtException e) {
//			log.info("Invalid JWT Token", e);
			return false;
		} catch (ExpiredJwtException e) {
			log.info("ExpiredJwtException",e);
			return false;
		} catch (UnsupportedJwtException e) {
//			log.info("Unsupported JWT Token", e);
			return false;
		} catch (IllegalArgumentException e) {
//			log.info("IllegalArgument JWT Token", e);
			return false;
		} catch (Exception e) {
//			log.info("JWT Token Error", e);
			return false;
		}
	}

	public String getToken(String token) {
		String type = "Bearer";
		if (StringUtils.hasText(token) && token.startsWith(type)) {
			return token.substring(type.length() + 1);
		}
		return null;
	}

	public Claims getClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
	}

	public Authentication getAuthentication(String accessToken) {
		Authentication authentication = null;

		Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();

		String email = claims.get("email").toString();

		User user = userRepository.findUserByEmail(email);

		PrincipalUser principalsUser = user.toPrincipal();
		authentication = new UsernamePasswordAuthenticationToken(principalsUser, null, principalsUser.getAuthorities());
		return authentication;
	}

	public String generateOAuth2RegisterToken(Authentication authentication) {
		Date tokenExpiresDate = new Date(new Date().getTime() + (1000 * 60 * 10));
		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
		String email = oAuth2User.getAttribute("email");

		return Jwts.builder()
				.setSubject("OAuth2Register")
				.claim("email", email)
				.setExpiration(tokenExpiresDate)
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
	}
}