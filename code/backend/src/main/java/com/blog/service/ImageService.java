package com.blog.service;

import com.blog.dto.request.ImageCreateRequest;
import com.blog.dto.request.ImageUpdateOrderRequest;
import com.blog.dto.response.ImageResponse;
import com.blog.entity.Image;
import com.blog.exception.BusinessException;
import com.blog.exception.ErrorCode;
import com.blog.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ImageService {
    
    private final ImageRepository imageRepository;
    
    public List<ImageResponse> getAllImages() {
        return imageRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    
    public ImageResponse getImageById(Long id) {
        Image image = imageRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "图片不存在"));
        return toResponse(image);
    }
    
    @Transactional
    public ImageResponse createImage(ImageCreateRequest request) {
        Image image = new Image();
        image.setFilename(request.getFilename());
        image.setUrl(request.getUrl());
        image.setLocation(request.getLocation());
        image.setTakenAt(request.getTakenAt());
        image.setDescription(request.getDescription());
        
        Integer maxDisplayOrder = imageRepository.findMaxDisplayOrder();
        image.setDisplayOrder(maxDisplayOrder == null ? 1 : maxDisplayOrder + 1);
        image.setUploadedAt(LocalDateTime.now());
        
        Image savedImage = imageRepository.save(image);
        return toResponse(savedImage);
    }
    
    @Transactional
    public ImageResponse updateImage(Long id, ImageCreateRequest request) {
        Image image = imageRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "图片不存在"));
        
        image.setFilename(request.getFilename());
        image.setUrl(request.getUrl());
        image.setLocation(request.getLocation());
        image.setTakenAt(request.getTakenAt());
        image.setDescription(request.getDescription());
        
        Image updatedImage = imageRepository.save(image);
        return toResponse(updatedImage);
    }
    
    @Transactional
    public ImageResponse updateDisplayOrder(Long id, ImageUpdateOrderRequest request) {
        Image image = imageRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "图片不存在"));
        
        Integer newOrder = request.getDisplayOrder();
        Integer oldOrder = image.getDisplayOrder();
        
        if (newOrder.equals(oldOrder)) {
            return toResponse(image);
        }
        
        if (newOrder < oldOrder) {
            imageRepository.incrementOrdersBetween(newOrder, oldOrder - 1);
        } else {
            imageRepository.decrementOrdersBetween(oldOrder + 1, newOrder);
        }
        
        image.setDisplayOrder(newOrder);
        Image updatedImage = imageRepository.save(image);
        return toResponse(updatedImage);
    }
    
    @Transactional
    public void deleteImage(Long id) {
        Image image = imageRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "图片不存在"));
        
        Integer deletedOrder = image.getDisplayOrder();
        imageRepository.deleteById(id);
        
        imageRepository.decrementOrdersAfter(deletedOrder);
    }
    
    private ImageResponse toResponse(Image image) {
        return new ImageResponse(
                image.getId(),
                image.getFilename(),
                image.getUrl(),
                image.getLocation(),
                image.getTakenAt(),
                image.getDescription(),
                image.getDisplayOrder(),
                image.getUploadedAt(),
                image.getCreatedAt(),
                image.getUpdatedAt()
        );
    }
}
