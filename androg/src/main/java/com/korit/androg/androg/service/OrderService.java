package com.korit.androg.androg.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.korit.androg.androg.dto.address.AddressRespDto;
import com.korit.androg.androg.dto.order.OrderCompleteReqDto;
import com.korit.androg.androg.entity.Address;
import com.korit.androg.androg.entity.Order;
import com.korit.androg.androg.exception.CustomException;
import com.korit.androg.androg.repository.AddressRepository;
import com.korit.androg.androg.repository.OrderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {
	private final OrderRepository orderRepository;
	private final AddressRepository addressRepository;

	
	public int completeOrder(OrderCompleteReqDto orderCompleteReqDto) {
		if(orderCompleteReqDto.getProducts().size() == 0) {
			throw new CustomException("상품을 선택해주세요.");
		}
		if(orderCompleteReqDto.getAddressId() == 0) { 
			Address newAddress = Address
					.builder()
					.userId(orderCompleteReqDto.getUserId())
					.address(orderCompleteReqDto.getAddress())
					.addressDetail(orderCompleteReqDto.getAddressDetail())
					.addressSigungu(orderCompleteReqDto.getAddressSigungu())
					.addressSido(orderCompleteReqDto.getAddressSido())
					.addressZonecode(orderCompleteReqDto.getAddressZonecode())
					.addressBname(orderCompleteReqDto.getAddressBname())
					.poneNumber(orderCompleteReqDto.getPoneNumber())
					.build();
			addressRepository.addressRegister(newAddress);
			
			List<AddressRespDto> addressList = new ArrayList<>();
			
			addressRepository.getAddress(newAddress.getUserId()).forEach(address -> {
				addressList.add(address.toDto());
			});
			 
			AddressRespDto addressRespDto = addressList.get(addressList.size() -1);
			
			Order order = Order
					.builder()
					.userId(addressRespDto.getUserId())
					.addressId(addressRespDto.getAddressId())
					.build();
			orderRepository.saveOrder(order);
			Map<String, Object> requestMap = new HashMap<>();
			requestMap.put("userId", orderCompleteReqDto.getUserId());
			requestMap.put("products", orderCompleteReqDto.getProducts());
			requestMap.put("orderId", order.getOrderId());
			return orderRepository.completeOrder(requestMap);
		} else {
			Order order = Order
					.builder()
					.userId(orderCompleteReqDto.getUserId())
					.addressId(orderCompleteReqDto.getAddressId())
					.build();
			orderRepository.saveOrder(order);
			
			Map<String, Object> requestMap = new HashMap<>();
			requestMap.put("userId", orderCompleteReqDto.getUserId());
			requestMap.put("products", orderCompleteReqDto.getProducts());
			requestMap.put("orderId", order.getOrderId());
			return orderRepository.completeOrder(requestMap);
		}
		
	}
	
	public int saveAddress(int addressId) {
		return orderRepository.saveAddress(addressId);
	}
}	
