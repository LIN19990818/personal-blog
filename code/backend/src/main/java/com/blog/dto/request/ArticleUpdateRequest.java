package com.blog.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class ArticleUpdateRequest {
    
    private Long id;
    
    @Size(max = 200, message = "文章标题长度不能超过200个字符")
    private String title;
    
    @Size(max = 50000, message = "文章内容长度不能超过50000个字符")
    private String content;
    
    @Size(max = 500, message = "文章摘要长度不能超过500个字符")
    private String summary;
    
    @Size(max = 500, message = "封面图URL长度不能超过500个字符")
    private String coverImage;
    
    private Long categoryId;
    
    private List<Long> tagIds;
    
    private Integer status;
}
