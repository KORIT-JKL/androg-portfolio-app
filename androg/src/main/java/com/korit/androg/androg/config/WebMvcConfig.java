package com.korit.androg.androg.config;

import java.io.IOException;
import java.net.URLDecoder;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import com.nimbusds.jose.util.StandardCharset;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer{

	@Value("${file.path}")
	private String filePath;
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
		.allowedMethods("*")
		.allowedOrigins("https://web-androg-portfolio-app-7xwyjq992llitnrgqd.sel4.cloudtype.app/");
	}
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		WebMvcConfigurer.super.addResourceHandlers(registry);
		registry.addResourceHandler("/image/**")
				.addResourceLocations("file:///" + filePath)
				.resourceChain(true)
				.addResolver(new PathResourceResolver() {
					@Override
					protected Resource getResource(String resourcePath, Resource location) throws IOException {
						resourcePath = URLDecoder.decode(resourcePath, StandardCharset.UTF_8);
						return super.getResource(resourcePath, location);
					}
				});
	}
		
	
}
