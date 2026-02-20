package com.blog.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MusicUpdateOrderRequest {
    
    @NotNull(message = "序号不能为空")
    @Min(value = 1, message = "序号最小为1")
    private Integer displayOrder;
}
