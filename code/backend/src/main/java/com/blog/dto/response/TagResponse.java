package com.blog.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TagResponse {
    
    private Long id;
    private String name;
    private String slug;
    private Long articleCount;
    private LocalDateTime createdAt;
}
