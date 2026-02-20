package com.blog.repository;

import com.blog.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    Optional<Category> findBySlug(String slug);
    
    Optional<Category> findByName(String name);
    
    boolean existsBySlug(String slug);
    
    boolean existsByName(String name);
    
    List<Category> findAllByOrderBySortOrderAsc();
    
    @Query("SELECT COUNT(a) FROM Article a WHERE a.categoryId = :categoryId")
    Long countArticlesByCategoryId(@Param("categoryId") Long categoryId);
}
