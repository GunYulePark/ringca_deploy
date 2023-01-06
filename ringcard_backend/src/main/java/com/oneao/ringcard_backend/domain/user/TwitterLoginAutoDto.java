package com.oneao.ringcard_backend.domain.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TwitterLoginAutoDto {
    private boolean loginFirstTwitter;
    private String usernameTwitter;
}
