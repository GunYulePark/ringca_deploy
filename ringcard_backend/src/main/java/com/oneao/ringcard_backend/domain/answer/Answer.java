package com.oneao.ringcard_backend.domain.answer;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.time.LocalDateTime;


@Data
@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @NotEmpty
    private String answerContents;

    @NotNull
    private Long questionId;


    private Timestamp uploadTime;

    public Answer(){
    }

    public Answer(String answerContents, Long questionId) {
        this.answerContents = answerContents;
        this.questionId = questionId;
    }
}