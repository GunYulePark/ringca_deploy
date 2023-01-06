package com.oneao.ringcard_backend.config;

import com.oneao.ringcard_backend.config.auth.PrincipalDetails;
import com.oneao.ringcard_backend.config.auth.PrincipalDetailsService;
import com.oneao.ringcard_backend.config.oauth.PrincipalOauth2UserService;
import com.oneao.ringcard_backend.domain.answer.AnswerRepository;
import com.oneao.ringcard_backend.domain.answer.JpaAnswerRepository;
import com.oneao.ringcard_backend.domain.answer.SpringDataJpaAnswerRepository;
import com.oneao.ringcard_backend.domain.suggestion.JpaSuggestionRepository;
import com.oneao.ringcard_backend.domain.suggestion.SpringDataJpaSuggestionRepository;
import com.oneao.ringcard_backend.domain.suggestion.SuggestionRepository;
import com.oneao.ringcard_backend.domain.user.JpaUserRepository;
import com.oneao.ringcard_backend.domain.user.User;
import com.oneao.ringcard_backend.domain.user.UserRepository;
import com.oneao.ringcard_backend.domain.user.SpringDataJpaUserRepository;
import com.oneao.ringcard_backend.domain.question.JpaQuestionRepository;
import com.oneao.ringcard_backend.domain.question.QuestionRepository;
import com.oneao.ringcard_backend.domain.question.SpringDataJpaQuestionRepository;
import com.oneao.ringcard_backend.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class SpringDataJpaConfig {

    private final SpringDataJpaUserRepository springDataJpaUserRepository;
    private final SpringDataJpaQuestionRepository springDataJpaQuestionRepository;
    private final SpringDataJpaAnswerRepository springDataJpaAnswerRepository;

    private final JavaMailSender javaMailSender;


    private final SpringDataJpaSuggestionRepository springDataJpaSuggestionRepository;

    @Bean
    public MailService mailService() {
        return new MailService(javaMailSender);
    }

    @Bean
    public SuggestionRepository suggestionRepository() {
        return new JpaSuggestionRepository(springDataJpaSuggestionRepository);
    }

    @Bean
    public SuggestionService suggestionService() {
        return new SuggestionService(suggestionRepository());
    }

    @Bean
    public UserService userService() {
        return new UserService(userRepository(), bCryptPasswordEncoder());
    }

    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public JavaMailSender javaMailSender() {
//        return new JavaMailSenderImpl();
//    }

    @Bean
    public UserRepository userRepository() {
        return new JpaUserRepository(springDataJpaUserRepository);
    }

    @Bean
    public QuestionService questionService() {
        return new QuestionService(questionRepository());
    }

    @Bean
    public QuestionRepository questionRepository() {
        return new JpaQuestionRepository(springDataJpaQuestionRepository, springDataJpaAnswerRepository);
    }

    @Bean
    public AnswerService answerService() {
        return new AnswerService(answerRepository());
    }

    @Bean
    public AnswerRepository answerRepository() {
        return new JpaAnswerRepository(springDataJpaAnswerRepository);
    }

    @Bean
    public PrincipalDetailsService principalDetailsService() {
        return new PrincipalDetailsService(userService());
    }

    private User user;
    @Bean
    public PrincipalDetails principalDetails() {
        return new PrincipalDetails(user);
    }

    @Bean
    public PrincipalOauth2UserService principalOauth2UserService() {
        return new PrincipalOauth2UserService();
    }

}
