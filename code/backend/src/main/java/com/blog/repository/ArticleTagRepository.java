package com.blog.repository;

import com.blog.entity.ArticleTag;
import com.blog.entity.ArticleTagId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleTagRepository extends JpaRepository<ArticleTag, ArticleTagId> {
    
    List<ArticleTag> findByArticleId(Long articleId);
    
    List<ArticleTag> findByTagId(Long tagId);
    
    @Modifying
    @Query("DELETE FROM ArticleTag at WHERE at.articleId = :articleId")
    void deleteByArticleId(@Param("articleId") Long articleId);
    
    @Modifying
    @Query("DELETE FROM ArticleTag at WHERE at.tagId = :tagId")
    void deleteByTagId(@Param("tagId") Long tagId);
    
    @Query("SELECT at.tagId FROM ArticleTag at WHERE at.articleId = :articleId")
    List<Long> findTagIdsByArticleId(@Param("articleId") Long articleId);
    
    @Query("SELECT at.articleId FROM ArticleTag at WHERE at.tagId = :tagId")
    List<Long> findArticleIdsByTagId(@Param("tagId") Long tagId);
    
    @Query("SELECT COUNT(at) FROM ArticleTag at WHERE at.tagId = :tagId")
    Long countArticlesByTagId(@Param("tagId") Long tagId);
}
