package com.blog.controller;

import com.blog.common.Result;
import com.blog.dto.request.CategoryRequest;
import com.blog.dto.response.CategoryResponse;
import com.blog.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/admin/categories")
    public Result<CategoryResponse> createCategory(
            @RequestAttribute("adminId") Long adminId,
            @Valid @RequestBody CategoryRequest request) {
        CategoryResponse response = categoryService.createCategory(request);
        return Result.success(response);
    }

    @PutMapping("/admin/categories/{id}")
    public Result<CategoryResponse> updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody CategoryRequest request) {
        CategoryResponse response = categoryService.updateCategory(id, request);
        return Result.success(response);
    }

    @DeleteMapping("/admin/categories/{id}")
    public Result<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return Result.success();
    }

    @GetMapping("/admin/categories")
    public Result<List<CategoryResponse>> getAdminCategories() {
        List<CategoryResponse> list = categoryService.getAdminCategoryList();
        return Result.success(list);
    }

    @GetMapping("/categories")
    public Result<List<CategoryResponse>> getCategories() {
        List<CategoryResponse> list = categoryService.getFrontCategoryList();
        return Result.success(list);
    }

    @GetMapping("/categories/{id}")
    public Result<CategoryResponse> getCategory(@PathVariable Long id) {
        CategoryResponse response = categoryService.getCategoryById(id);
        return Result.success(response);
    }
}
