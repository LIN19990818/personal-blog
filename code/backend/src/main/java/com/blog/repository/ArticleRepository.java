package com.blog.repository;

import com.blog.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    
    Optional<Article> findBySlug(String slug);
    
    boolean existsBySlug(String slug);
    
    Page<Article> findByStatus(Integer status, Pageable pageable);
    
    Page<Article> findByCategoryId(Long categoryId, Pageable pageable);
    
    Page<Article> findByStatusAndCategoryId(Integer status, Long categoryId, Pageable pageable);
    
    @Query("SELECT a FROM Article a WHERE a.id IN :ids AND a.status = :status")
    Page<Article> findAllByIdInAndStatus(@Param("ids") List<Long> ids, @Param("status") Integer status, Pageable pageable);
    
    @Query("SELECT a FROM Article a WHERE a.status = 1 AND a.deleted = false AND (a.title LIKE %:keyword% OR a.content LIKE %:keyword%)")
    Page<Article> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);
    
    @Query("SELECT COUNT(a) FROM Article a WHERE a.categoryId = :categoryId")
    Long countByCategoryId(@Param("categoryId") Long categoryId);
    
    @Query(value = "SELECT * FROM article WHERE MATCH(title, content) AGAINST(:keyword IN NATURAL LANGUAGE MODE)", nativeQuery = true)
    List<Article> fullTextSearch(@Param("keyword") String keyword);
    
    @Query("SELECT a FROM Article a WHERE a.deleted = false ORDER BY a.createdAt DESC")
    Page<Article> findAllNotDeleted(Pageable pageable);
    
    @Query("SELECT a FROM Article a WHERE a.deleted = true ORDER BY a.deletedAt DESC")
    Page<Article> findAllDeleted(Pageable pageable);
    
    @Query("SELECT a FROM Article a WHERE a.deleted = false AND a.categoryId = :categoryId ORDER BY a.createdAt DESC")
    Page<Article> findByCategoryIdNotDeleted(@Param("categoryId") Long categoryId, Pageable pageable);
    
    @Query("SELECT a FROM Article a WHERE a.deleted = false AND a.status = :status ORDER BY a.createdAt DESC")
    Page<Article> findByStatusNotDeleted(@Param("status") Integer status, Pageable pageable);
    
    @Modifying
    @Query("UPDATE Article a SET a.deleted = true, a.deletedAt = CURRENT_TIMESTAMP WHERE a.id = :id")
    void softDeleteById(@Param("id") Long id);
    
    @Modifying
    @Query("UPDATE Article a SET a.deleted = false, a.deletedAt = null WHERE a.id = :id")
    void restoreById(@Param("id") Long id);
    
    @Modifying
    @Query("DELETE FROM Article a WHERE a.id = :id AND a.deleted = true")
    void permanentDeleteById(@Param("id") Long id);
    
    @Query("SELECT a FROM Article a WHERE a.deleted = false AND a.status = 1 ORDER BY a.publishedAt DESC")
    List<Article> findAllPublishedNotDeleted();
}
