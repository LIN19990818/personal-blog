package com.blog.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SystemSettingRequest {
    
    @NotBlank(message = "设置键不能为空")
    private String key;
    
    @NotBlank(message = "设置值不能为空")
    private String value;
    
    private String description;
}
