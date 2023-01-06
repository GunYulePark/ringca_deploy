package com.oneao.ringcard_backend.domain.suggestion;

import lombok.Data;

@Data
public class SuggestionSendDto {
    private Long senderUserId;
    private String senderUsername;
    private String contents;
}
