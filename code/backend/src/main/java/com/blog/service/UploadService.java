package com.blog.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.blog.dto.response.UploadResponse;
import com.blog.exception.BusinessException;
import com.blog.exception.ErrorCode;

@Service
public class UploadService {
    
    @Value("${upload.path:./uploads}")
    private String uploadPath;
    
    private static final long MAX_IMAGE_SIZE = 20 * 1024 * 1024;
    private static final long MAX_AUDIO_SIZE = 50 * 1024 * 1024;
    private static final String[] ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/gif", "image/webp"};
    private static final String[] ALLOWED_AUDIO_TYPES = {"audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/x-m4a", "audio/m4a"};
    
    @Transactional
    public UploadResponse uploadFile(MultipartFile file, String type) {
        if (file.isEmpty()) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "文件不能为空");
        }
        
        String contentType = file.getContentType();
        
        if ("audio".equals(type)) {
            return uploadAudioFile(file, contentType);
        } else {
            return uploadImageFile(file, contentType, type);
        }
    }
    
    private UploadResponse uploadImageFile(MultipartFile file, String contentType, String type) {
        if (file.getSize() > MAX_IMAGE_SIZE) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "图片大小不能超过5MB");
        }
        
        if (!isAllowedImageType(contentType)) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "不支持的图片类型，仅支持 JPG、PNG、GIF、WEBP");
        }
        
        try {
            String subDir = "covers";
            if ("avatar".equals(type)) {
                subDir = "avatars";
            }
            
            Path uploadDir = Paths.get(uploadPath, subDir);
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
            
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".")
                    ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : ".jpg";
            String filename = UUID.randomUUID().toString() + extension;
            
            Path filePath = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), filePath);
            
            String url = "/uploads/" + subDir + "/" + filename;
            
            return new UploadResponse(url, filename, file.getSize());
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.INTERNAL_ERROR, "图片上传失败");
        }
    }
    
    private UploadResponse uploadAudioFile(MultipartFile file, String contentType) {
        if (file.getSize() > MAX_AUDIO_SIZE) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "音频大小不能超过50MB");
        }
        
        if (!isAllowedAudioType(contentType)) {
            throw new BusinessException(ErrorCode.PARAM_ERROR, "不支持的音频类型，仅支持 MP3、WAV、OGG、M4A");
        }
        
        try {
            String subDir = "audio";
            
            Path uploadDir = Paths.get(uploadPath, subDir);
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
            
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".")
                    ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : ".mp3";
            String filename = UUID.randomUUID().toString() + extension;
            
            Path filePath = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), filePath);
            
            String url = "/uploads/" + subDir + "/" + filename;
            
            return new UploadResponse(url, filename, file.getSize());
        } catch (IOException e) {
            throw new BusinessException(ErrorCode.INTERNAL_ERROR, "音频上传失败");
        }
    }
    
    private boolean isAllowedImageType(String contentType) {
        if (contentType == null) {
            return false;
        }
        for (String allowedType : ALLOWED_IMAGE_TYPES) {
            if (allowedType.equals(contentType)) {
                return true;
            }
        }
        return false;
    }
    
    private boolean isAllowedAudioType(String contentType) {
        if (contentType == null) {
            return false;
        }
        for (String allowedType : ALLOWED_AUDIO_TYPES) {
            if (allowedType.equals(contentType)) {
                return true;
            }
        }
        return false;
    }
}
