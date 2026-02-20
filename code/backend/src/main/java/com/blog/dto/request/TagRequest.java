package com.blog.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TagRequest {
    
    @NotBlank(message = "标签名称不能为空")
    @Size(max = 30, message = "标签名称长度不能超过30个字符")
    private String name;
}
