package com.blog.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AdminResponse {
    
    private Long id;
    private String username;
    private String nickname;
    private String avatar;
    private LocalDateTime createdAt;
}
