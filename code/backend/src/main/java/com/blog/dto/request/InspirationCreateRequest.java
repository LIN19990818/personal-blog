package com.blog.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class InspirationCreateRequest {
    
    @NotBlank(message = "灵感内容不能为空")
    private String content;
    
    private Long articleId;
    
    private String category;
}
