package com.blog.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SystemSettingResponse {
    
    private Long id;
    private String key;
    private String value;
    private String description;
    private LocalDateTime updatedAt;
}
