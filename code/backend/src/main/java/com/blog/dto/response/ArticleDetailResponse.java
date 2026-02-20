package com.blog.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ArticleDetailResponse {
    
    private Long id;
    private String title;
    private String slug;
    private String content;
    private String summary;
    private String coverImage;
    private CategoryResponse category;
    private Integer viewCount;
    private LocalDateTime publishedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
