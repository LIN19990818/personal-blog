package com.blog.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MusicResponse {
    
    private Long id;
    private String title;
    private String artist;
    private String album;
    private Integer duration;
    private String url;
    private String coverUrl;
    private Integer displayOrder;
    private LocalDateTime uploadedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
