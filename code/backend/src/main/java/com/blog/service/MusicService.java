package com.blog.service;

import com.blog.dto.request.MusicCreateRequest;
import com.blog.dto.request.MusicUpdateOrderRequest;
import com.blog.dto.response.MusicResponse;
import com.blog.entity.Music;
import com.blog.exception.BusinessException;
import com.blog.exception.ErrorCode;
import com.blog.repository.MusicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MusicService {
    
    private final MusicRepository musicRepository;
    
    public List<MusicResponse> getAllMusic() {
        return musicRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    
    public MusicResponse getMusicById(Long id) {
        Music music = musicRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "音乐不存在"));
        return toResponse(music);
    }
    
    @Transactional
    public MusicResponse createMusic(MusicCreateRequest request) {
        Music music = new Music();
        music.setTitle(request.getTitle());
        music.setArtist(request.getArtist());
        music.setAlbum(request.getAlbum());
        music.setDuration(request.getDuration());
        music.setUrl(request.getUrl());
        music.setCoverUrl(request.getCoverUrl());
        
        Integer displayOrder = request.getDisplayOrder();
        if (displayOrder == null) {
            Integer maxOrder = musicRepository.findMaxDisplayOrder();
            displayOrder = (maxOrder == null ? 0 : maxOrder) + 1;
        }
        music.setDisplayOrder(displayOrder);
        music.setUploadedAt(LocalDateTime.now());
        
        Music savedMusic = musicRepository.save(music);
        return toResponse(savedMusic);
    }
    
    @Transactional
    public MusicResponse updateMusic(Long id, MusicCreateRequest request) {
        Music music = musicRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "音乐不存在"));
        
        music.setTitle(request.getTitle());
        music.setArtist(request.getArtist());
        music.setAlbum(request.getAlbum());
        music.setDuration(request.getDuration());
        music.setUrl(request.getUrl());
        music.setCoverUrl(request.getCoverUrl());
        
        if (request.getDisplayOrder() != null) {
            music.setDisplayOrder(request.getDisplayOrder());
        }
        
        Music updatedMusic = musicRepository.save(music);
        return toResponse(updatedMusic);
    }
    
    @Transactional
    public MusicResponse updateDisplayOrder(Long id, MusicUpdateOrderRequest request) {
        Music music = musicRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "音乐不存在"));
        
        Integer newOrder = request.getDisplayOrder();
        Integer oldOrder = music.getDisplayOrder();
        
        if (newOrder < oldOrder) {
            musicRepository.incrementOrdersBetween(newOrder, oldOrder - 1);
        } else if (newOrder > oldOrder) {
            musicRepository.decrementOrdersBetween(oldOrder + 1, newOrder);
        }
        
        music.setDisplayOrder(newOrder);
        Music updatedMusic = musicRepository.save(music);
        return toResponse(updatedMusic);
    }
    
    @Transactional
    public void deleteMusic(Long id) {
        Music music = musicRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.NOT_FOUND, "音乐不存在"));
        
        Integer deletedOrder = music.getDisplayOrder();
        musicRepository.deleteById(id);
        
        musicRepository.decrementOrdersAfter(deletedOrder);
    }
    
    private MusicResponse toResponse(Music music) {
        return new MusicResponse(
                music.getId(),
                music.getTitle(),
                music.getArtist(),
                music.getAlbum(),
                music.getDuration(),
                music.getUrl(),
                music.getCoverUrl(),
                music.getDisplayOrder(),
                music.getUploadedAt(),
                music.getCreatedAt(),
                music.getUpdatedAt()
        );
    }
}
