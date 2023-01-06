package com.oneao.ringcard_backend.service;

import com.oneao.ringcard_backend.domain.DTO.SendMailDto;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;

//    @Async
    public SendMailDto sendNewQuestionMail(String userEmail) {
        SendMailDto dto = new SendMailDto();
        dto.setAddress(userEmail);
        dto.setTitle("링카에 새로운 질문카드가 도착했습니다!");
        dto.setMessage("링카에 새로운 질문카드가 도착했습니다!\n" +
                "얼른 가서 답변해보세요!");
        return dto;
    }
    @Async
    public void mailSend(SendMailDto mailDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDto.getAddress());
        message.setSubject(mailDto.getTitle());
        message.setText(mailDto.getMessage());
        message.setFrom("RingcaOfficial@gmail.com");
        message.setReplyTo("RingcaOfficial@gmail.com");
        mailSender.send(message);
    }

}
