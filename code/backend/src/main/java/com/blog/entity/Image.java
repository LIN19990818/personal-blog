package com.blog.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "image")
public class Image {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 255)
    private String filename;
    
    @Column(nullable = false, length = 500)
    private String url;
    
    @Column(length = 100)
    private String location;
    
    @Column(name = "taken_at")
    private LocalDate takenAt;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
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
