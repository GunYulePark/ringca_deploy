package com.oneao.ringcard_backend.domain.question;

import com.oneao.ringcard_backend.web.paging.Criteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SpringDataJpaQuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByUserIdLike(Long userId);

    Page<Question> findByUserIdLikeAndAnsweredLikeAndInTrashLike(Long userId, boolean answered, boolean inTrash, Pageable pageable);
//    List<Question> findByUserIdLikeAndAnsweredLikeAndInTrashLike1(Long userId, boolean answered, boolean inTrash);

    Page<Question> findByAnsweredLikeAndInTrashLike(boolean isAnswered, boolean inTrash, Pageable pageable);

    Page<Question> findByUserIdLikeAndInTrashLike(Long userId, boolean inTrash, Pageable pageable);

    Page<Question> findByUserIdLikeAndInCollectionLike(Long userId, boolean inCollection, Pageable pageable);

    List<Question> findAllByUserIdLikeAndInTrashLike(Long userId, boolean inTrash);

    @Transactional
    void deleteByUserIdLikeAndInTrashLike(Long userId, boolean inTrash);

    // 일반 JPQL쿼리, from뒤는 엔티티 명 (소문자로 할 시 에러)
//    @Query(value = "select * from ( select * " +
//            "from ringcard.question " +
//            "order by id desc) as T1 " +
//            "limit #{skip},#{amount}")
//    public List<Question> getListPaging(Criteria cri);

    // 일반 SQL쿼리
//    @Query(value = "select * from (\n" +
//            "    select *\n" +
//            "    from ringcard.question order by id desc) as T1\n" +
//            "    limit #{skip},#{amount}", nativeQuery = true)
//    public List<Question> getListPaging(Criteria cri);

    // 일반 SQL쿼리
//    @Query(value = "select * " +
//            "from ringcard.question " +
//            "order by id desc " +
//            "limit #{skip},#{amount}", nativeQuery = true)
//    public List<Question> getListPaging(Criteria cri);
//
    @Query(value = "select * from ( select * " +
            "from ringcard.question " +
            "order by id desc) as T1 " +
            "limit #{skip},#{amount}", nativeQuery = true)
    public List<Question> getListPaging(Criteria cri);
}
