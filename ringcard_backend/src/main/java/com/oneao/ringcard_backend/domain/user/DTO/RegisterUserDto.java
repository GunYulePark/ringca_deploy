package com.oneao.ringcard_backend.domain.user.DTO;

import lombok.Data;

@Data
public class RegisterUserDto {
    private String username;
    private String userRingcardName;
    private String userEmail;
//    private String twitterId;
//    private String userPicture;
    private boolean emailAlert;

    public RegisterUserDto() {
    }


    public RegisterUserDto(String username, String userRingcardName, String userEmail, boolean emailAlert) {
        this.username = username;
        this.userRingcardName = userRingcardName;
        this.userEmail = userEmail;
        this.emailAlert = emailAlert;
//        this.twitterId = twitterId;
//        this.userPicture = userPicture;
    }
}
