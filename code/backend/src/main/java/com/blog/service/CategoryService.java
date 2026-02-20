package com.blog.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.dto.request.CategoryRequest;
import com.blog.dto.response.CategoryResponse;
import com.blog.entity.Category;
import com.blog.exception.BusinessException;
import com.blog.exception.ErrorCode;
import com.blog.repository.ArticleRepository;
import com.blog.repository.CategoryRepository;
import com.blog.util.SlugUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    private final ArticleRepository articleRepository;
    
    @Transactional(readOnly = true)
    public List<CategoryResponse> getFrontCategoryList() {
        return categoryRepository.findAllByOrderBySortOrderAsc().stream()
                .map(this::convertToCategoryResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAdminCategoryList() {
        return categoryRepository.findAllByOrderBySortOrderAsc().stream()
                .map(this::convertToCategoryResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public CategoryResponse getCategoryById(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "分类不存在"));
        return convertToCategoryResponse(category);
    }
    
    @Transactional
    public CategoryResponse createCategory(CategoryRequest request) {
        if (categoryRepository.existsByName(request.getName())) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "分类名称已存在");
        }
        
        Category category = new Category();
        category.setName(request.getName());
        category.setSlug(generateUniqueSlug(request.getName()));
        category.setDescription(request.getDescription());
        category.setSortOrder(request.getSortOrder());
        
        Category savedCategory = categoryRepository.save(category);
        return convertToCategoryResponse(savedCategory);
    }
    
    @Transactional
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "分类不存在"));
        
        if (!category.getName().equals(request.getName()) && categoryRepository.existsByName(request.getName())) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "分类名称已存在");
        }
        
        category.setName(request.getName());
        category.setSlug(generateUniqueSlug(request.getName()));
        category.setDescription(request.getDescription());
        category.setSortOrder(request.getSortOrder());
        
        Category savedCategory = categoryRepository.save(category);
        return convertToCategoryResponse(savedCategory);
    }
    
    @Transactional
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "分类不存在"));
        
        Long articleCount = articleRepository.countByCategoryId(id);
        if (articleCount > 0) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "该分类下存在文章，无法删除");
        }
        
        categoryRepository.delete(category);
    }
    
    private String generateUniqueSlug(String name) {
        String baseSlug = SlugUtil.generateSlug(name);
        String slug = baseSlug;
        int counter = 1;
        
        while (categoryRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter;
            counter++;
        }
        
        return slug;
    }
    
    private CategoryResponse convertToCategoryResponse(Category category) {
        CategoryResponse response = new CategoryResponse();
        response.setId(category.getId());
        response.setName(category.getName());
        response.setSlug(category.getSlug());
        response.setDescription(category.getDescription());
        response.setArticleCount(articleRepository.countByCategoryId(category.getId()));
        response.setCreatedAt(category.getCreatedAt());
        return response;
    }
}
