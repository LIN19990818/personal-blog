package com.blog.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TimelineCreateRequest {
    
    @NotBlank(message = "标题不能为空")
    private String title;
    
    @NotNull(message = "日期不能为空")
    private LocalDate eventDate;
    
    private String description;
    
    private String imageUrl;
    
    private Integer displayOrder;
}
