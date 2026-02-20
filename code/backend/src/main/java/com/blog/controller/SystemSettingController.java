package com.blog.controller;

import com.blog.common.Result;
import com.blog.dto.request.SystemSettingRequest;
import com.blog.dto.response.SystemSettingResponse;
import com.blog.service.SystemSettingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
public class SystemSettingController {
    
    private final SystemSettingService systemSettingService;
    
    @GetMapping
    public Result<List<SystemSettingResponse>> getAllSettings() {
        return Result.success(systemSettingService.getAllSettings());
    }
    
    @GetMapping("/{key}")
    public Result<SystemSettingResponse> getSettingByKey(@PathVariable String key) {
        return Result.success(systemSettingService.getSettingByKey(key));
    }
    
    @PostMapping
    public Result<SystemSettingResponse> saveSetting(@Valid @RequestBody SystemSettingRequest request) {
        return Result.success(systemSettingService.saveSetting(request));
    }
    
    @DeleteMapping("/{key}")
    public Result<Void> deleteSetting(@PathVariable String key) {
        systemSettingService.deleteSetting(key);
        return Result.success();
    }
}
