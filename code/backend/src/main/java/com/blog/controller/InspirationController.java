package com.blog.controller;

import com.blog.common.Result;
import com.blog.dto.request.InspirationCreateRequest;
import com.blog.dto.response.InspirationResponse;
import com.blog.service.InspirationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inspirations")
@RequiredArgsConstructor
public class InspirationController {
    
    private final InspirationService inspirationService;
    
    @GetMapping
    public Result<List<InspirationResponse>> getAllInspirations() {
        return Result.success(inspirationService.getAllInspirations());
    }
    
    @GetMapping("/category/{category}")
    public Result<List<InspirationResponse>> getInspirationsByCategory(@PathVariable String category) {
        return Result.success(inspirationService.getInspirationsByCategory(category));
    }
    
    @GetMapping("/{id}")
    public Result<InspirationResponse> getInspirationById(@PathVariable Long id) {
        return Result.success(inspirationService.getInspirationById(id));
    }
    
    @PostMapping
    public Result<InspirationResponse> createInspiration(@Valid @RequestBody InspirationCreateRequest request) {
        return Result.success(inspirationService.createInspiration(request));
    }
    
    @PutMapping("/{id}")
    public Result<InspirationResponse> updateInspiration(@PathVariable Long id, @Valid @RequestBody InspirationCreateRequest request) {
        return Result.success(inspirationService.updateInspiration(id, request));
    }
    
    @DeleteMapping("/{id}")
    public Result<Void> deleteInspiration(@PathVariable Long id) {
        inspirationService.deleteInspiration(id);
        return Result.success();
    }
}
