package com.blog.service;

import com.blog.dto.request.InspirationCreateRequest;
import com.blog.dto.response.InspirationResponse;
import com.blog.entity.Inspiration;
import com.blog.exception.BusinessException;
import com.blog.exception.ErrorCode;
import com.blog.repository.InspirationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InspirationService {
    
    private final InspirationRepository inspirationRepository;
    
    public List<InspirationResponse> getAllInspirations() {
        return inspirationRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    
    public List<InspirationResponse> getInspirationsByCategory(String category) {
        return inspirationRepository.findByCategoryOrderByCreatedAtDesc(category).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    
    public InspirationResponse getInspirationById(Long id) {
        Inspiration inspiration = inspirationRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "灵感不存在"));
        return toResponse(inspiration);
    }
    
    @Transactional
    public InspirationResponse createInspiration(InspirationCreateRequest request) {
        Inspiration inspiration = new Inspiration();
        inspiration.setContent(request.getContent());
        inspiration.setArticleId(request.getArticleId());
        inspiration.setCategory(request.getCategory());
        
        Inspiration savedInspiration = inspirationRepository.save(inspiration);
        return toResponse(savedInspiration);
    }
    
    @Transactional
    public InspirationResponse updateInspiration(Long id, InspirationCreateRequest request) {
        Inspiration inspiration = inspirationRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "灵感不存在"));
        
        inspiration.setContent(request.getContent());
        inspiration.setArticleId(request.getArticleId());
        inspiration.setCategory(request.getCategory());
        
        Inspiration updatedInspiration = inspirationRepository.save(inspiration);
        return toResponse(updatedInspiration);
    }
    
    @Transactional
    public void deleteInspiration(Long id) {
        if (!inspirationRepository.existsById(id)) {
            throw new BusinessException(ErrorCode.NOT_FOUND, "灵感不存在");
        }
        inspirationRepository.deleteById(id);
    }
    
    private InspirationResponse toResponse(Inspiration inspiration) {
        return new InspirationResponse(
                inspiration.getId(),
                inspiration.getContent(),
                inspiration.getArticleId(),
                inspiration.getCategory(),
                inspiration.getCreatedAt(),
                inspiration.getUpdatedAt()
        );
    }
}
