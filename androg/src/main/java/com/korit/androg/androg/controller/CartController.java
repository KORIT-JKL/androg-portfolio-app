package com.korit.androg.androg.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.korit.androg.androg.dto.Product.addCartRequestDto;
import com.korit.androg.androg.dto.Product.getCartResponseDto;
import com.korit.androg.androg.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class CartController {
	private final CartService cartService;
	@PostMapping("/cart/addition")
	public ResponseEntity<?> addCart(@RequestBody addCartRequestDto addCartRequestDto) {
		System.out.println(addCartRequestDto);
		cartService.addCart(addCartRequestDto);
		return null;
	}
	@GetMapping("/cart")
	public ResponseEntity<?> getCart(@RequestParam Map<String, Object> searchParams) {
//		System.out.println(productsService.getCartByUserId(Integer.parseInt((String)searchParams.get("userId"))));
		return 	ResponseEntity.ok(
				cartService.getCartByUserId(Integer.parseInt((String)searchParams.get("userId"))));
	}

	@DeleteMapping("/cart/delete")
	public ResponseEntity<?> deleteCartByProductId(@RequestParam Map<String, Object> params) {
//		System.out.println(params.get("produ	ct[cartId]"));
		cartService.deleteCartByCartId(Integer.parseInt((String)params.get("product[cartId]")));
		return 	null;
	}
	
	@PutMapping("/cart/update/countUp")
	public ResponseEntity<?> countUp(@RequestBody getCartResponseDto cartResponseDto) {
		System.out.println(cartResponseDto);
		
		
		cartService.plusCountByCartId(cartResponseDto.getCartId());
		return null;
	}
	@PutMapping("/cart/update/countDown")
	public ResponseEntity<?> countDown(@RequestBody getCartResponseDto cartResponseDto) {
		System.out.println(cartResponseDto);
		
		
		cartService.minusCountByCartId(cartResponseDto.getCartId(),cartResponseDto.getCountNumber());
		return null;
	}
}
