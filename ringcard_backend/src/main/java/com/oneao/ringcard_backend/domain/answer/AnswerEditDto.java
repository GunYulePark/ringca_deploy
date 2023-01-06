package com.oneao.ringcard_backend.domain.answer;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;


@Data
public class AnswerEditDto {

    private String answerContents;

    public AnswerEditDto() {
    }

    public AnswerEditDto(String answerContents) {
        this.answerContents = answerContents;
    }
}

