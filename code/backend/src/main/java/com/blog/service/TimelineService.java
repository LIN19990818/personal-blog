package com.blog.service;

import com.blog.dto.request.TimelineCreateRequest;
import com.blog.dto.request.TimelineUpdateOrderRequest;
import com.blog.dto.response.TimelineResponse;
import com.blog.entity.Timeline;
import com.blog.exception.BusinessException;
import com.blog.exception.ErrorCode;
import com.blog.repository.TimelineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TimelineService {
    
    private final TimelineRepository timelineRepository;
    
    public List<TimelineResponse> getAllTimeline() {
        return timelineRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    
    public TimelineResponse getTimelineById(Long id) {
        Timeline timeline = timelineRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "时间轴事件不存在"));
        return toResponse(timeline);
    }
    
    @Transactional
    public TimelineResponse createTimeline(TimelineCreateRequest request) {
        Timeline timeline = new Timeline();
        timeline.setTitle(request.getTitle());
        timeline.setEventDate(request.getEventDate());
        timeline.setDescription(request.getDescription());
        timeline.setImageUrl(request.getImageUrl());
        
        Integer displayOrder = request.getDisplayOrder();
        if (displayOrder == null) {
            Integer maxOrder = timelineRepository.findMaxDisplayOrder();
            displayOrder = (maxOrder == null ? 0 : maxOrder) + 1;
        }
        timeline.setDisplayOrder(displayOrder);
        
        Timeline savedTimeline = timelineRepository.save(timeline);
        return toResponse(savedTimeline);
    }
    
    @Transactional
    public TimelineResponse updateTimeline(Long id, TimelineCreateRequest request) {
        Timeline timeline = timelineRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "时间轴事件不存在"));
        
        timeline.setTitle(request.getTitle());
        timeline.setEventDate(request.getEventDate());
        timeline.setDescription(request.getDescription());
        timeline.setImageUrl(request.getImageUrl());
        
        if (request.getDisplayOrder() != null) {
            timeline.setDisplayOrder(request.getDisplayOrder());
        }
        
        Timeline updatedTimeline = timelineRepository.save(timeline);
        return toResponse(updatedTimeline);
    }
    
    @Transactional
    public TimelineResponse updateDisplayOrder(Long id, TimelineUpdateOrderRequest request) {
        Timeline timeline = timelineRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "时间轴事件不存在"));
        
        Integer newOrder = request.getDisplayOrder();
        Integer oldOrder = timeline.getDisplayOrder();
        
        if (newOrder < oldOrder) {
            timelineRepository.incrementOrdersBetween(newOrder, oldOrder - 1);
        } else if (newOrder > oldOrder) {
            timelineRepository.decrementOrdersBetween(oldOrder + 1, newOrder);
        }
        
        timeline.setDisplayOrder(newOrder);
        Timeline updatedTimeline = timelineRepository.save(timeline);
        return toResponse(updatedTimeline);
    }
    
    @Transactional
    public void deleteTimeline(Long id) {
        Timeline timeline = timelineRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "时间轴事件不存在"));
        
        Integer deletedOrder = timeline.getDisplayOrder();
        timelineRepository.deleteById(id);
        
        timelineRepository.decrementOrdersAfter(deletedOrder);
    }
    
    private TimelineResponse toResponse(Timeline timeline) {
        return new TimelineResponse(
                timeline.getId(),
                timeline.getTitle(),
                timeline.getEventDate(),
                timeline.getDescription(),
                timeline.getImageUrl(),
                timeline.getDisplayOrder(),
                timeline.getCreatedAt(),
                timeline.getUpdatedAt()
        );
    }
}
