package com.oneao.ringcard_backend.service;

import com.oneao.ringcard_backend.domain.question.Question;
import com.oneao.ringcard_backend.domain.suggestion.Suggestion;
import com.oneao.ringcard_backend.domain.suggestion.SuggestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SuggestionService {

    private final SuggestionRepository suggestionRepository;

    public Suggestion save(Suggestion suggestion) {
        return suggestionRepository.save(suggestion);
    }

    public Optional<Suggestion> findById(Long id) {
        return suggestionRepository.findById(id);
    }

}
