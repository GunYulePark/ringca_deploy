package com.oneao.ringcard_backend.service;

import com.oneao.ringcard_backend.domain.answer.Answer;
import com.oneao.ringcard_backend.domain.answer.AnswerEditDto;
import com.oneao.ringcard_backend.domain.answer.AnswerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerService {

    private final AnswerRepository answerRepository;

    public Answer save(Answer answer) {
        return answerRepository.save(answer);
    }
    public Optional<Answer> findById(Long id) {
        return answerRepository.findById(id);
    }

    public Optional<Answer> findByQuestionId(Long questionId) {
        return answerRepository.findByQuestionId(questionId);
    }

    public void editAnswer(Long answerId, AnswerEditDto editParam) {
        answerRepository.edit(answerId, editParam);
    }

    public void deleteAnswer(Long answerId) {
        answerRepository.delete(answerId);
    }


    public void clearStore() {
        answerRepository.clearStore();
    }
}
