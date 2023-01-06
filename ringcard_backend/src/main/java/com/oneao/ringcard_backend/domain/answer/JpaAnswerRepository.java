package com.oneao.ringcard_backend.domain.answer;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
@Transactional
@RequiredArgsConstructor
public class JpaAnswerRepository implements AnswerRepository{

    private final SpringDataJpaAnswerRepository repository;

    @Override
    public Answer save(Answer answer) {
        answer.setUploadTime(Timestamp.valueOf(LocalDateTime.now()));
        return repository.save(answer);
    }

    @Override
    public Optional<Answer> findById(Long id) {
        return repository.findById(id);

    }

    @Override
    public Optional<Answer> findByQuestionId(Long questionId) {
        return repository.findByQuestionIdLike(questionId);
    }

    @Override
    public void edit(Long answerId, AnswerEditDto editParam) {
        Answer findAnswer = repository.findById(answerId).orElseThrow();
        findAnswer.setAnswerContents(editParam.getAnswerContents());
        findAnswer.setUploadTime(Timestamp.valueOf(LocalDateTime.now()));
    }

    @Override
    public void delete(Long answerId) {
        repository.delete(repository.findById(answerId).get());
    }

    @Override
    public void deleteByQuestionId(Long questionId) {
        repository.deleteByQuestionIdLike(questionId);
    }
    @Override
    public void clearStore() {
        repository.deleteAll();
    }
}
