package com.oneao.ringcard_backend.domain.question;

import lombok.Data;

@Data
public class QuestionSearchCond {

    private boolean isAnswered;
    private boolean isInTrash;

    public QuestionSearchCond() {
    }

    public QuestionSearchCond(boolean isAnswered, boolean isInTrash) {
        this.isAnswered = isAnswered;
        this.isInTrash = isInTrash;
    }
}
