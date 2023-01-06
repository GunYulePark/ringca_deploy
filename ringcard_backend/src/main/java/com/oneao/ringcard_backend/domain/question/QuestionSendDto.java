package com.oneao.ringcard_backend.domain.question;

import lombok.Data;

@Data
public class QuestionSendDto {

    private String questionContents;
    private String questionHyperlink;
    private Integer noteType;
    private Integer tapeType;
    private Integer tapePosition;
}
