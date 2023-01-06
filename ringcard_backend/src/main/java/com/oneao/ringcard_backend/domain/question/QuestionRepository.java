package com.oneao.ringcard_backend.domain.question;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface QuestionRepository {

    Question save(Question question);

    Optional<Question> findById(Long id, Long userId);

    Optional<Question> findByIdNoAuth(Long id);
//    List<Question> findAll(Long userId);
    Page<Question> findAll(Long userId, QuestionSearchCond cond, Pageable pageable);
//    List<Question> findAll1(Long userId, QuestionSearchCond cond);
//    List<Question> findAllAnsweredNotInTrash(Long userId);
    Page<Question> findAllAnsweredNotInTrashNoAuth(Long userId, Pageable pageable);
//    List<Question> findAllUnansweredInTrash(Long userId);
//    List<Question> findAllUnansweredNotInTrash(Long userId);

    Page<Question> findAllInTrash(Long userId, Pageable pageable);
    Page<Question> findAllInCollection(Long userId, Pageable pageable);

    List<Question> findAllByUserId(Long userId);

    /* 게시판 목록(페이징 적용) */
//    List<Question> getListPaging(Criteria cri);

    void delete(Long questionId);

//    void throwInTrash(Long questionId, Long userId);

    void updateInTrash(Long questionId);

//    void restore(Long questionId, Long userId);

    void updateToAnswered(Long questionId);

    void updateToUnanswered(Long questionId);

    void updateInCollection(Long questionId);

    void clearTrashcan(Long userId);


    void clearStore();
}
