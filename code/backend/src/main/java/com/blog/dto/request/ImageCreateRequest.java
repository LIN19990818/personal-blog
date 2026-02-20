package com.blog.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ImageCreateRequest {
    
    @NotBlank(message = "文件名不能为空")
    private String filename;
    
    @NotBlank(message = "图片URL不能为空")
    private String url;
    
    private String location;
    
    private LocalDate takenAt;
    
    private String description;
}
