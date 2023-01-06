package com.oneao.ringcard_backend.domain.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindPasswordDto {
    private String address;
    private String title;
    private String message;
}
