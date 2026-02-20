package com.blog.repository;

import com.blog.entity.Inspiration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InspirationRepository extends JpaRepository<Inspiration, Long> {
    
    List<Inspiration> findByArticleIdOrderByCreatedAtDesc(Long articleId);
    
    List<Inspiration> findByCategoryOrderByCreatedAtDesc(String category);
    
    List<Inspiration> findAllByOrderByCreatedAtDesc();
}
