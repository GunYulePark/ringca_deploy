package com.oneao.ringcard_backend.domain.answer;

import lombok.Data;

import java.util.List;

@Data
public class EditAnswerDto {
    private String question;
    private String oldAnswer;
    private List questions;
}
