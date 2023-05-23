package com.korit.androg.androg.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {
	private int orderId;
	private int userId;
	private int addressId;
}
