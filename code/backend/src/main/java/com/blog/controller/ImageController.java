package com.blog.controller;

import com.blog.common.Result;
import com.blog.dto.request.ImageCreateRequest;
import com.blog.dto.request.ImageUpdateOrderRequest;
import com.blog.dto.response.ImageResponse;
import com.blog.service.ImageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {
    
    private final ImageService imageService;
    
    @GetMapping
    public Result<List<ImageResponse>> getAllImages() {
        return Result.success(imageService.getAllImages());
    }
    
    @GetMapping("/{id}")
    public Result<ImageResponse> getImageById(@PathVariable Long id) {
        return Result.success(imageService.getImageById(id));
    }
    
    @PostMapping
    public Result<ImageResponse> createImage(@Valid @RequestBody ImageCreateRequest request) {
        return Result.success(imageService.createImage(request));
    }
    
    @PutMapping("/{id}")
    public Result<ImageResponse> updateImage(@PathVariable Long id, @Valid @RequestBody ImageCreateRequest request) {
        return Result.success(imageService.updateImage(id, request));
    }
    
    @PutMapping("/{id}/order")
    public Result<ImageResponse> updateDisplayOrder(@PathVariable Long id, @Valid @RequestBody ImageUpdateOrderRequest request) {
        return Result.success(imageService.updateDisplayOrder(id, request));
    }
    
    @DeleteMapping("/{id}")
    public Result<Void> deleteImage(@PathVariable Long id) {
        imageService.deleteImage(id);
        return Result.success();
    }
}
