package com.oneao.ringcard_backend.domain.answer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface SpringDataJpaAnswerRepository extends JpaRepository<Answer, Long> {

    Optional<Answer> findByQuestionIdLike(Long questionId);
    @Transactional
    void deleteByQuestionIdLike(Long questionId);
}
