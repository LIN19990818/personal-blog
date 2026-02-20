package com.blog.controller;

import com.blog.common.Result;
import com.blog.common.PageResult;
import com.blog.dto.response.ArticleResponse;
import com.blog.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/search")
    public Result<PageResult<ArticleResponse>> search(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageResult<ArticleResponse> pageResult = searchService.searchArticles(keyword, page, size);
        return Result.success(pageResult);
    }
}
