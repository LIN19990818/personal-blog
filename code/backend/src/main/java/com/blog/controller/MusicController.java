package com.blog.controller;

import com.blog.common.Result;
import com.blog.dto.request.MusicCreateRequest;
import com.blog.dto.request.MusicUpdateOrderRequest;
import com.blog.dto.response.MusicResponse;
import com.blog.service.MusicService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/music")
@RequiredArgsConstructor
public class MusicController {
    
    private final MusicService musicService;
    
    @GetMapping
    public Result<List<MusicResponse>> getAllMusic() {
        return Result.success(musicService.getAllMusic());
    }
    
    @GetMapping("/{id}")
    public Result<MusicResponse> getMusicById(@PathVariable Long id) {
        return Result.success(musicService.getMusicById(id));
    }
    
    @PostMapping
    public Result<MusicResponse> createMusic(@Valid @RequestBody MusicCreateRequest request) {
        return Result.success(musicService.createMusic(request));
    }
    
    @PutMapping("/{id}")
    public Result<MusicResponse> updateMusic(@PathVariable Long id, @Valid @RequestBody MusicCreateRequest request) {
        return Result.success(musicService.updateMusic(id, request));
    }
    
    @PutMapping("/{id}/order")
    public Result<MusicResponse> updateDisplayOrder(@PathVariable Long id, @Valid @RequestBody MusicUpdateOrderRequest request) {
        return Result.success(musicService.updateDisplayOrder(id, request));
    }
    
    @DeleteMapping("/{id}")
    public Result<Void> deleteMusic(@PathVariable Long id) {
        musicService.deleteMusic(id);
        return Result.success();
    }
}
