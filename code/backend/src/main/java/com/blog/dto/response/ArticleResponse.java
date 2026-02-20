package com.blog.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ArticleResponse {
    
    private Long id;
    private String title;
    private String slug;
    private String summary;
    private String coverImage;
    private CategoryResponse category;
    private List<TagResponse> tags;
    private Integer viewCount;
    private Integer status;
    private LocalDateTime publishedAt;
}
