package com.oneao.ringcard_backend.domain.answer;

import java.util.Optional;


public interface AnswerRepository {
    Answer save(Answer answer);
    Optional<Answer> findById(Long id);

    Optional<Answer> findByQuestionId(Long questionId);

    void edit(Long answerId, AnswerEditDto editParam);

    void delete(Long answerId);

    void deleteByQuestionId(Long questionId);

    void clearStore();

}
