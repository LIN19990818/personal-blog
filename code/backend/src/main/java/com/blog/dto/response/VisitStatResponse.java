package com.blog.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VisitStatResponse {
    
    private LocalDate visitDate;
    private Integer pageViews;
    private Integer uniqueVisitors;
}
