package com.blog.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "article_tag")
@IdClass(ArticleTagId.class)
public class ArticleTag {
    
    @Id
    @Column(name = "article_id", nullable = false)
    private Long articleId;
    
    @Id
    @Column(name = "tag_id", nullable = false)
    private Long tagId;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
