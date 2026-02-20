package com.blog.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.common.PageResult;
import com.blog.dto.request.ArticleCreateRequest;
import com.blog.dto.request.ArticleUpdateRequest;
import com.blog.dto.response.ArticleDetailResponse;
import com.blog.dto.response.ArticleResponse;
import com.blog.dto.response.CategoryResponse;
import com.blog.dto.response.TagResponse;
import com.blog.entity.Article;
import com.blog.entity.ArticleTag;
import com.blog.entity.Category;
import com.blog.entity.Tag;
import com.blog.exception.BusinessException;
import com.blog.exception.ErrorCode;
import com.blog.repository.ArticleRepository;
import com.blog.repository.ArticleTagRepository;
import com.blog.repository.CategoryRepository;
import com.blog.repository.TagRepository;
import com.blog.util.SlugUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleService {
    
    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final ArticleTagRepository articleTagRepository;
    
    @Transactional(readOnly = true)
    public PageResult<ArticleResponse> getFrontArticleList(int page, int size, Long categoryId, Long tagId) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "publishedAt"));
        
        Page<Article> articlePage;
        
        if (categoryId != null) {
            articlePage = articleRepository.findByStatusAndCategoryId(1, categoryId, pageable);
        } else if (tagId != null) {
            List<Long> articleIds = articleTagRepository.findArticleIdsByTagId(tagId);
            if (articleIds.isEmpty()) {
                return PageResult.of(List.of(), 0L, page, size);
            }
            articlePage = articleRepository.findAllByIdInAndStatus(articleIds, 1, pageable);
        } else {
            articlePage = articleRepository.findByStatus(1, pageable);
        }
        
        List<ArticleResponse> list = articlePage.getContent().stream()
                .map(this::convertToArticleResponse)
                .collect(Collectors.toList());
        
        return PageResult.of(list, articlePage.getTotalElements(), page, size);
    }
    
    @Transactional
    public ArticleDetailResponse getArticleBySlug(String slug) {
        Article article = articleRepository.findBySlug(slug)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "文章不存在"));
        
        if (article.getStatus() != 1) {
            throw new BusinessException(ErrorCode.NOT_FOUND, "文章不存在");
        }
        
        article.setViewCount(article.getViewCount() + 1);
        articleRepository.save(article);
        
        return convertToArticleDetailResponse(article);
    }
    
    @Transactional(readOnly = true)
    public ArticleDetailResponse getArticleDetailById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "文章不存在"));
        return convertToArticleDetailResponse(article);
    }
    
    @Transactional(readOnly = true)
    public PageResult<ArticleResponse> getAdminArticleList(int page, int size, Integer status, Long categoryId, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        
        Page<Article> articlePage;
        
        if (keyword != null && !keyword.isBlank()) {
            articlePage = articleRepository.searchByKeyword(keyword, pageable);
        } else if (status != null && categoryId != null) {
            articlePage = articleRepository.findByStatusAndCategoryId(status, categoryId, pageable);
        } else if (status != null) {
            articlePage = articleRepository.findByStatus(status, pageable);
        } else if (categoryId != null) {
            articlePage = articleRepository.findByCategoryId(categoryId, pageable);
        } else {
            articlePage = articleRepository.findAll(pageable);
        }
        
        List<ArticleResponse> list = articlePage.getContent().stream()
                .map(this::convertToArticleResponse)
                .collect(Collectors.toList());
        
        return PageResult.of(list, articlePage.getTotalElements(), page, size);
    }
    
    @Transactional
    public ArticleDetailResponse createArticle(ArticleCreateRequest request) {
        Long categoryId = request.getCategoryId();
        if (categoryId != null) {
            categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "分类不存在"));
        }
        
        Article article = new Article();
        article.setTitle(request.getTitle() != null ? request.getTitle() : "未命名文章");
        article.setSlug(generateUniqueSlug(request.getTitle() != null ? request.getTitle() : "untitled"));
        article.setContent(request.getContent());
        article.setSummary(request.getSummary());
        article.setCoverImage(request.getCoverImage());
        article.setCategoryId(categoryId);
        article.setStatus(request.getStatus() != null ? request.getStatus() : 0);
        article.setViewCount(0);
        
        if (request.getStatus() != null && request.getStatus() == 1) {
            article.setPublishedAt(LocalDateTime.now());
        }
        
        Article savedArticle = articleRepository.save(article);
        
        if (request.getTagIds() != null && !request.getTagIds().isEmpty()) {
            saveArticleTags(savedArticle.getId(), request.getTagIds());
        }
        
        return convertToArticleDetailResponse(savedArticle);
    }
    
    @Transactional
    public ArticleDetailResponse updateArticle(ArticleUpdateRequest request) {
        Article article = articleRepository.findById(request.getId())
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "文章不存在"));
        
        Long categoryId = request.getCategoryId();
        if (categoryId != null) {
            categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "分类不存在"));
        }
        
        if (request.getTitle() != null) {
            article.setTitle(request.getTitle());
        }
        if (request.getContent() != null) {
            article.setContent(request.getContent());
        }
        article.setSummary(request.getSummary());
        article.setCoverImage(request.getCoverImage());
        article.setCategoryId(categoryId);
        
        if (article.getStatus() != 1 && request.getStatus() != null && request.getStatus() == 1) {
            article.setPublishedAt(LocalDateTime.now());
        }
        if (request.getStatus() != null) {
            article.setStatus(request.getStatus());
        }
        
        Article savedArticle = articleRepository.save(article);
        
        articleTagRepository.deleteByArticleId(savedArticle.getId());
        if (request.getTagIds() != null && !request.getTagIds().isEmpty()) {
            saveArticleTags(savedArticle.getId(), request.getTagIds());
        }
        
        return convertToArticleDetailResponse(savedArticle);
    }
    
    @Transactional
    public void updateArticleStatus(Long id, Integer status) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "文章不存在"));
        
        if (article.getStatus() != 1 && status == 1) {
            article.setPublishedAt(LocalDateTime.now());
        }
        article.setStatus(status);
        articleRepository.save(article);
    }
    
    @Transactional
    public void deleteArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "文章不存在"));
        
        if (article.getDeleted()) {
            articleTagRepository.deleteByArticleId(id);
            articleRepository.permanentDeleteById(id);
        } else {
            articleRepository.softDeleteById(id);
        }
    }
    
    @Transactional
    public void softDeleteArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "文章不存在"));
        
        if (article.getDeleted()) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "文章已在回收站中");
        }
        articleRepository.softDeleteById(id);
    }
    
    @Transactional
    public void restoreArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "文章不存在"));
        
        if (!article.getDeleted()) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "文章不在回收站中");
        }
        articleRepository.restoreById(id);
    }
    
    @Transactional
    public void permanentDeleteArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "文章不存在"));
        
        if (!article.getDeleted()) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "只能永久删除回收站中的文章");
        }
        articleTagRepository.deleteByArticleId(id);
        articleRepository.permanentDeleteById(id);
    }
    
    @Transactional(readOnly = true)
    public PageResult<ArticleResponse> getDeletedArticleList(int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "deletedAt"));
        Page<Article> articlePage = articleRepository.findAllDeleted(pageable);
        
        List<ArticleResponse> list = articlePage.getContent().stream()
                .map(this::convertToArticleResponse)
                .collect(Collectors.toList());
        
        return PageResult.of(list, articlePage.getTotalElements(), page, size);
    }
    
    @Transactional(readOnly = true)
    public List<Object> getArticleArchive() {
        List<Article> articles = articleRepository.findAllPublishedNotDeleted();
        
        java.util.Map<String, List<ArticleResponse>> archiveMap = new java.util.TreeMap<>(java.util.Collections.reverseOrder());
        
        for (Article article : articles) {
            if (article.getPublishedAt() != null) {
                String yearMonth = article.getPublishedAt().getYear() + "-" + 
                        String.format("%02d", article.getPublishedAt().getMonthValue());
                
                archiveMap.computeIfAbsent(yearMonth, k -> new java.util.ArrayList<>())
                        .add(convertToArticleResponse(article));
            }
        }
        
        List<Object> result = new java.util.ArrayList<>();
        archiveMap.forEach((yearMonth, articleList) -> {
            java.util.Map<String, Object> group = new java.util.LinkedHashMap<>();
            group.put("yearMonth", yearMonth);
            group.put("count", articleList.size());
            group.put("articles", articleList);
            result.add(group);
        });
        
        return result;
    }
    
    private String generateUniqueSlug(String title) {
        String baseSlug = SlugUtil.generateSlug(title);
        String slug = baseSlug;
        int counter = 1;
        
        while (articleRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter;
            counter++;
        }
        
        return slug;
    }
    
    private void saveArticleTags(Long articleId, List<Long> tagIds) {
        for (Long tagId : tagIds) {
            if (tagRepository.existsById(tagId)) {
                ArticleTag articleTag = new ArticleTag();
                articleTag.setArticleId(articleId);
                articleTag.setTagId(tagId);
                articleTagRepository.save(articleTag);
            }
        }
    }
    
    private ArticleResponse convertToArticleResponse(Article article) {
        ArticleResponse response = new ArticleResponse();
        response.setId(article.getId());
        response.setTitle(article.getTitle());
        response.setSlug(article.getSlug());
        response.setSummary(article.getSummary());
        response.setCoverImage(article.getCoverImage());
        response.setViewCount(article.getViewCount());
        response.setStatus(article.getStatus());
        response.setPublishedAt(article.getPublishedAt());
        
        if (article.getCategoryId() != null) {
            Category category = categoryRepository.findById(article.getCategoryId()).orElse(null);
            if (category != null) {
                CategoryResponse categoryResponse = new CategoryResponse();
                categoryResponse.setId(category.getId());
                categoryResponse.setName(category.getName());
                categoryResponse.setSlug(category.getSlug());
                response.setCategory(categoryResponse);
            }
        }
        
        List<Long> tagIds = articleTagRepository.findTagIdsByArticleId(article.getId());
        if (!tagIds.isEmpty()) {
            List<TagResponse> tags = tagRepository.findAllById(tagIds).stream()
                    .map(tag -> {
                        TagResponse tagResponse = new TagResponse();
                        tagResponse.setId(tag.getId());
                        tagResponse.setName(tag.getName());
                        tagResponse.setSlug(tag.getSlug());
                        return tagResponse;
                    })
                    .collect(Collectors.toList());
            response.setTags(tags);
        }
        
        return response;
    }
    
    private ArticleDetailResponse convertToArticleDetailResponse(Article article) {
        ArticleDetailResponse response = new ArticleDetailResponse();
        response.setId(article.getId());
        response.setTitle(article.getTitle());
        response.setSlug(article.getSlug());
        response.setContent(article.getContent());
        response.setSummary(article.getSummary());
        response.setCoverImage(article.getCoverImage());
        response.setViewCount(article.getViewCount());
        response.setPublishedAt(article.getPublishedAt());
        response.setCreatedAt(article.getCreatedAt());
        response.setUpdatedAt(article.getUpdatedAt());
        
        if (article.getCategoryId() != null) {
            Category category = categoryRepository.findById(article.getCategoryId()).orElse(null);
            if (category != null) {
                CategoryResponse categoryResponse = new CategoryResponse();
                categoryResponse.setId(category.getId());
                categoryResponse.setName(category.getName());
                categoryResponse.setSlug(category.getSlug());
                response.setCategory(categoryResponse);
            }
        }
        
        return response;
    }
}
