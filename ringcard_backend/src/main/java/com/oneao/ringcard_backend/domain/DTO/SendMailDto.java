package com.oneao.ringcard_backend.domain.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SendMailDto {
    private String address;
    private String title;
    private String message;
}
