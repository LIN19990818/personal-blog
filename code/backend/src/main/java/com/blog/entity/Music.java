package com.blog.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "music")
public class Music {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 200)
    private String title;
    
    @Column(nullable = false, length = 100)
    private String artist;
    
    @Column(length = 200)
    private String album;
    
    @Column(nullable = false)
    private Integer duration;
    
    @Column(nullable = false, length = 500)
    private String url;
    
    @Column(name = "cover_url", length = 500)
    private String coverUrl;
    
    @Column(name = "display_order", nullable = false)
    private Integer displayOrder = 1;
    
    @Column(name = "uploaded_at")
    private LocalDateTime uploadedAt;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
