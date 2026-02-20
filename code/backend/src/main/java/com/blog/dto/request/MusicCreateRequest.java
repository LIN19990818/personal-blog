package com.blog.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MusicCreateRequest {
    
    @NotBlank(message = "歌曲标题不能为空")
    private String title;
    
    @NotBlank(message = "歌手不能为空")
    private String artist;
    
    private String album;
    
    @NotNull(message = "时长不能为空")
    private Integer duration;
    
    @NotBlank(message = "音频URL不能为空")
    private String url;
    
    private String coverUrl;
    
    private Integer displayOrder;
}
