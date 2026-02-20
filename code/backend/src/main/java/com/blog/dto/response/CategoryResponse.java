package com.blog.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CategoryResponse {
    
    private Long id;
    private String name;
    private String slug;
    private String description;
    private Long articleCount;
    private LocalDateTime createdAt;
}
