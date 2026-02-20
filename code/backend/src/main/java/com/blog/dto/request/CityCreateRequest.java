package com.blog.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class CityCreateRequest {
    
    @NotBlank(message = "城市名称不能为空")
    private String name;
    
    @NotNull(message = "纬度不能为空")
    private BigDecimal latitude;
    
    @NotNull(message = "经度不能为空")
    private BigDecimal longitude;
    
    private Integer visitCount = 1;
    
    @NotNull(message = "首次访问日期不能为空")
    private LocalDate firstVisit;
    
    private String notes;
}
