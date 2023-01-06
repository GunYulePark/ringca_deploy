package com.oneao.ringcard_backend.domain.suggestion;

import java.util.Optional;

public interface SuggestionRepository {

    Suggestion save(Suggestion suggestion);

    Optional<Suggestion> findById(Long id);
}
