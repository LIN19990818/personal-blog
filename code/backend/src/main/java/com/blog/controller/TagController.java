package com.blog.controller;

import com.blog.common.Result;
import com.blog.dto.request.TagRequest;
import com.blog.dto.response.TagResponse;
import com.blog.service.TagService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TagController {

    @Autowired
    private TagService tagService;

    @PostMapping("/admin/tags")
    public Result<TagResponse> createTag(@Valid @RequestBody TagRequest request) {
        TagResponse response = tagService.createTag(request);
        return Result.success(response);
    }

    @PutMapping("/admin/tags/{id}")
    public Result<TagResponse> updateTag(
            @PathVariable Long id,
            @Valid @RequestBody TagRequest request) {
        TagResponse response = tagService.updateTag(id, request);
        return Result.success(response);
    }

    @DeleteMapping("/admin/tags/{id}")
    public Result<Void> deleteTag(@PathVariable Long id) {
        tagService.deleteTag(id);
        return Result.success();
    }

    @GetMapping("/admin/tags")
    public Result<List<TagResponse>> getAdminTags() {
        List<TagResponse> list = tagService.getAdminTagList();
        return Result.success(list);
    }

    @GetMapping("/tags")
    public Result<List<TagResponse>> getTags() {
        List<TagResponse> list = tagService.getFrontTagList();
        return Result.success(list);
    }

    @GetMapping("/tags/{id}")
    public Result<TagResponse> getTag(@PathVariable Long id) {
        TagResponse response = tagService.getTagById(id);
        return Result.success(response);
    }
}
