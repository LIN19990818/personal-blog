package com.blog.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageResult<T> {
    
    private List<T> list;
    private Long total;
    private Integer page;
    private Integer size;
    private Integer totalPages;
    
    public static <T> PageResult<T> of(List<T> list, Long total, Integer page, Integer size) {
        int totalPages = (int) Math.ceil((double) total / size);
        return new PageResult<>(list, total, page, size, totalPages);
    }
}
