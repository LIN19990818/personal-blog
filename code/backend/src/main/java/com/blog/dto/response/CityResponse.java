package com.blog.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CityResponse {
    
    private Long id;
    private String name;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private Integer visitCount;
    private LocalDate firstVisit;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
