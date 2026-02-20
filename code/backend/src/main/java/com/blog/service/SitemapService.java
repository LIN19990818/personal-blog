package com.blog.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blog.entity.Article;
import com.blog.repository.ArticleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SitemapService {
    
    private final ArticleRepository articleRepository;
    
    private static final String SITE_URL = "http://localhost";
    private static final DateTimeFormatter W3C_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    
    /**
     * 生成sitemap.xml
     */
    @Transactional(readOnly = true)
    public String generateSitemap() {
        StringBuilder sb = new StringBuilder();
        
        sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        sb.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");
        
        sb.append("  <url>\n");
        sb.append("    <loc>").append(SITE_URL).append("/</loc>\n");
        sb.append("    <changefreq>daily</changefreq>\n");
        sb.append("    <priority>1.0</priority>\n");
        sb.append("  </url>\n");
        
        sb.append("  <url>\n");
        sb.append("    <loc>").append(SITE_URL).append("/about</loc>\n");
        sb.append("    <changefreq>monthly</changefreq>\n");
        sb.append("    <priority>0.5</priority>\n");
        sb.append("  </url>\n");
        
        List<Article> articles = articleRepository.findByStatus(1, 
                org.springframework.data.domain.PageRequest.of(0, 1000)).getContent();
        
        for (Article article : articles) {
            sb.append("  <url>\n");
            sb.append("    <loc>").append(SITE_URL).append("/article/").append(article.getSlug()).append("</loc>\n");
            if (article.getPublishedAt() != null) {
                sb.append("    <lastmod>").append(article.getPublishedAt().format(W3C_FORMATTER)).append("</lastmod>\n");
            }
            sb.append("    <changefreq>weekly</changefreq>\n");
            sb.append("    <priority>0.8</priority>\n");
            sb.append("  </url>\n");
        }
        
        sb.append("</urlset>");
        
        return sb.toString();
    }
}
