package com.oneao.ringcard_backend.domain.suggestion;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Data
@Entity
public class Suggestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @NotNull
    private Long senderUserId;

    @NotEmpty
    private String senderUsername;

    @NotEmpty
    private String contents;

    private Timestamp uploadTime;

    public Suggestion(){

    }

    public Suggestion(Long senderUserId, String senderUsername, String contents) {
        this.senderUserId = senderUserId;
        this.senderUsername = senderUsername;
        this.contents = contents;
    }
}
