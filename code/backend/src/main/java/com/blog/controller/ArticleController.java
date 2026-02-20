package com.blog.controller;

import com.blog.common.Result;
import com.blog.common.PageResult;
import com.blog.dto.request.ArticleCreateRequest;
import com.blog.dto.request.ArticleUpdateRequest;
import com.blog.dto.request.ArticleStatusRequest;
import com.blog.dto.response.ArticleResponse;
import com.blog.dto.response.ArticleDetailResponse;
import com.blog.service.ArticleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @PostMapping("/admin/articles")
    public Result<ArticleDetailResponse> createArticle(
            @RequestAttribute("adminId") Long adminId,
            @Valid @RequestBody ArticleCreateRequest request) {
        ArticleDetailResponse response = articleService.createArticle(request);
        return Result.success(response);
    }

    @PutMapping("/admin/articles/{id}")
    public Result<ArticleDetailResponse> updateArticle(
            @PathVariable Long id,
            @Valid @RequestBody ArticleUpdateRequest request) {
        request.setId(id);
        ArticleDetailResponse response = articleService.updateArticle(request);
        return Result.success(response);
    }

    @PutMapping("/admin/articles/{id}/status")
    public Result<Void> updateArticleStatus(
            @PathVariable Long id,
            @Valid @RequestBody ArticleStatusRequest request) {
        articleService.updateArticleStatus(id, request.getStatus());
        return Result.success();
    }

    @DeleteMapping("/admin/articles/{id}")
    public Result<Void> deleteArticle(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return Result.success();
    }
    
    @PutMapping("/admin/articles/{id}/trash")
    public Result<Void> moveToTrash(@PathVariable Long id) {
        articleService.softDeleteArticle(id);
        return Result.success();
    }
    
    @PutMapping("/admin/articles/{id}/restore")
    public Result<Void> restoreArticle(@PathVariable Long id) {
        articleService.restoreArticle(id);
        return Result.success();
    }
    
    @DeleteMapping("/admin/articles/{id}/permanent")
    public Result<Void> permanentDeleteArticle(@PathVariable Long id) {
        articleService.permanentDeleteArticle(id);
        return Result.success();
    }
    
    @GetMapping("/admin/articles/trash")
    public Result<PageResult<ArticleResponse>> getTrashArticles(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {
        PageResult<ArticleResponse> pageResult = articleService.getDeletedArticleList(page, size);
        return Result.success(pageResult);
    }

    @GetMapping("/admin/articles")
    public Result<PageResult<ArticleResponse>> getAdminArticles(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long tagId,
            @RequestParam(required = false) Integer status) {
        PageResult<ArticleResponse> pageResult = articleService.getAdminArticleList(page, size, status, categoryId, keyword);
        return Result.success(pageResult);
    }

    @GetMapping("/admin/articles/{id}")
    public Result<ArticleDetailResponse> getAdminArticle(@PathVariable Long id) {
        ArticleDetailResponse response = articleService.getArticleDetailById(id);
        return Result.success(response);
    }

    @GetMapping("/articles")
    public Result<PageResult<ArticleResponse>> getArticles(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long tagId) {
        String categorySlug = null;
        String tagSlug = null;
        PageResult<ArticleResponse> pageResult = articleService.getFrontArticleList(page, size, categoryId, tagId);
        return Result.success(pageResult);
    }

    @GetMapping("/articles/{id}")
    public Result<ArticleDetailResponse> getArticle(@PathVariable Long id) {
        ArticleDetailResponse response = articleService.getArticleDetailById(id);
        return Result.success(response);
    }

    @GetMapping("/articles/slug/{slug}")
    public Result<ArticleDetailResponse> getArticleBySlug(@PathVariable String slug) {
        ArticleDetailResponse response = articleService.getArticleBySlug(slug);
        return Result.success(response);
    }
    
    @GetMapping("/articles/archive")
    public Result<List<Object>> getArticleArchive() {
        return Result.success(articleService.getArticleArchive());
    }
}
