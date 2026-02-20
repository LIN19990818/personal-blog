package com.blog.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "system_setting")
public class SystemSetting {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "`key`", nullable = false, unique = true, length = 50)
    private String key;
    
    @Column(name = "`value`", nullable = false, columnDefinition = "TEXT")
    private String value;
    
    @Column(length = 255)
    private String description;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
