package com.oneao.ringcard_backend.domain.suggestion;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Repository
@Configuration
@RequiredArgsConstructor
public class JpaSuggestionRepository implements SuggestionRepository {

    private final SpringDataJpaSuggestionRepository repository;

    @Override
    public Suggestion save(Suggestion suggestion) {
        suggestion.setUploadTime(Timestamp.valueOf(LocalDateTime.now()));
        return repository.save(suggestion);
    }
    @Override
    public Optional<Suggestion> findById(Long id) {
        Optional<Suggestion> suggestion = repository.findById(id);
            return suggestion;
    }
}
