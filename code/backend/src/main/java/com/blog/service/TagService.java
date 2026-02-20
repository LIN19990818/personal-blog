package com.blog.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.dto.request.TagRequest;
import com.blog.dto.response.TagResponse;
import com.blog.entity.Tag;
import com.blog.exception.BusinessException;
import com.blog.exception.ErrorCode;
import com.blog.repository.ArticleTagRepository;
import com.blog.repository.TagRepository;
import com.blog.util.SlugUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagService {
    
    private final TagRepository tagRepository;
    private final ArticleTagRepository articleTagRepository;
    
    @Transactional(readOnly = true)
    public List<TagResponse> getFrontTagList() {
        return tagRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToTagResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public List<TagResponse> getAdminTagList() {
        return tagRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToTagResponse)
                .collect(Collectors.toList());
    }
    
    @Transactional(readOnly = true)
    public TagResponse getTagById(Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "标签不存在"));
        return convertToTagResponse(tag);
    }
    
    @Transactional
    public TagResponse createTag(TagRequest request) {
        if (tagRepository.existsByName(request.getName())) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "标签名称已存在");
        }
        
        Tag tag = new Tag();
        tag.setName(request.getName());
        tag.setSlug(generateUniqueSlug(request.getName()));
        
        Tag savedTag = tagRepository.save(tag);
        return convertToTagResponse(savedTag);
    }
    
    @Transactional
    public TagResponse updateTag(Long id, TagRequest request) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "标签不存在"));
        
        if (!tag.getName().equals(request.getName()) && tagRepository.existsByName(request.getName())) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "标签名称已存在");
        }
        
        tag.setName(request.getName());
        tag.setSlug(generateUniqueSlug(request.getName()));
        
        Tag savedTag = tagRepository.save(tag);
        return convertToTagResponse(savedTag);
    }
    
    @Transactional
    public void deleteTag(Long id) {
        Tag tag = tagRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "标签不存在"));
        
        articleTagRepository.deleteByTagId(id);
        tagRepository.delete(tag);
    }
    
    private String generateUniqueSlug(String name) {
        String baseSlug = SlugUtil.generateSlug(name);
        String slug = baseSlug;
        int counter = 1;
        
        while (tagRepository.existsBySlug(slug)) {
            slug = baseSlug + "-" + counter;
            counter++;
        }
        
        return slug;
    }
    
    private TagResponse convertToTagResponse(Tag tag) {
        TagResponse response = new TagResponse();
        response.setId(tag.getId());
        response.setName(tag.getName());
        response.setSlug(tag.getSlug());
        response.setArticleCount(articleTagRepository.countArticlesByTagId(tag.getId()));
        response.setCreatedAt(tag.getCreatedAt());
        return response;
    }
}
