package com.blog.controller;

import com.blog.common.Result;
import com.blog.dto.request.TimelineCreateRequest;
import com.blog.dto.request.TimelineUpdateOrderRequest;
import com.blog.dto.response.TimelineResponse;
import com.blog.service.TimelineService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timeline")
@RequiredArgsConstructor
public class TimelineController {
    
    private final TimelineService timelineService;
    
    @GetMapping
    public Result<List<TimelineResponse>> getAllTimeline() {
        return Result.success(timelineService.getAllTimeline());
    }
    
    @GetMapping("/{id}")
    public Result<TimelineResponse> getTimelineById(@PathVariable Long id) {
        return Result.success(timelineService.getTimelineById(id));
    }
    
    @PostMapping
    public Result<TimelineResponse> createTimeline(@Valid @RequestBody TimelineCreateRequest request) {
        return Result.success(timelineService.createTimeline(request));
    }
    
    @PutMapping("/{id}")
    public Result<TimelineResponse> updateTimeline(@PathVariable Long id, @Valid @RequestBody TimelineCreateRequest request) {
        return Result.success(timelineService.updateTimeline(id, request));
    }
    
    @PutMapping("/{id}/order")
    public Result<TimelineResponse> updateDisplayOrder(@PathVariable Long id, @Valid @RequestBody TimelineUpdateOrderRequest request) {
        return Result.success(timelineService.updateDisplayOrder(id, request));
    }
    
    @DeleteMapping("/{id}")
    public Result<Void> deleteTimeline(@PathVariable Long id) {
        timelineService.deleteTimeline(id);
        return Result.success();
    }
}
