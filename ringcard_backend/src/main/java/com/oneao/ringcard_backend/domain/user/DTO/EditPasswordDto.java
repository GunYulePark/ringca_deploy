package com.oneao.ringcard_backend.domain.user.DTO;

import lombok.Data;

@Data
public class EditPasswordDto {
    private String pastPassword;
    private String newPassword;
    private String newPasswordConfirm;
}
