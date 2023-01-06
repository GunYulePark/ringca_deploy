package com.oneao.ringcard_backend.domain.user.DTO;

import lombok.Data;

@Data
public class UserSearchCond {

    private String username;
    private String userRingcardName;

    public UserSearchCond() {
    }

    public UserSearchCond(String username, String userRingcardName) {
        this.username = username;
        this.userRingcardName = userRingcardName;
    }
}
