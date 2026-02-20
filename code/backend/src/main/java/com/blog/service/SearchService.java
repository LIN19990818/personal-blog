package com.blog.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.common.PageResult;
import com.blog.dto.response.ArticleResponse;
import com.blog.dto.response.CategoryResponse;
import com.blog.dto.response.TagResponse;
import com.blog.entity.Article;
import com.blog.entity.Tag;
import com.blog.repository.ArticleRepository;
import com.blog.repository.ArticleTagRepository;
import com.blog.repository.TagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchService {
    
    private final ArticleRepository articleRepository;
    private final TagRepository tagRepository;
    private final ArticleTagRepository articleTagRepository;
    
    /**
     * 搜索文章
     */
    @Transactional(readOnly = true)
    public PageResult<ArticleResponse> searchArticles(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "publishedAt"));
        
        Page<Article> articlePage = articleRepository.searchByKeyword(keyword, pageable);
        
        List<ArticleResponse> list = articlePage.getContent().stream()
                .map(this::convertToArticleResponse)
                .collect(Collectors.toList());
        
        return PageResult.of(list, articlePage.getTotalElements(), page, size);
    }
    
    private ArticleResponse convertToArticleResponse(Article article) {
        ArticleResponse response = new ArticleResponse();
        response.setId(article.getId());
        response.setTitle(article.getTitle());
        response.setSlug(article.getSlug());
        response.setSummary(article.getSummary());
        response.setCoverImage(article.getCoverImage());
        response.setViewCount(article.getViewCount());
        response.setPublishedAt(article.getPublishedAt());
        
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
}
