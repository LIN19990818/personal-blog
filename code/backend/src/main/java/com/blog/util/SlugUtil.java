package com.blog.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public class SlugUtil {
    
    private static final Pattern NON_LATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("[\\s]");
    private static final Pattern EDGES = Pattern.compile("^-+|-+$");
    
    public static String generateSlug(String input) {
        if (input == null || input.isBlank()) {
            return "";
        }
        
        String slug = Normalizer.normalize(input, Normalizer.Form.NFKD);
        slug = slug.toLowerCase(Locale.ENGLISH);
        slug = WHITESPACE.matcher(slug).replaceAll("-");
        slug = NON_LATIN.matcher(slug).replaceAll("");
        slug = EDGES.matcher(slug).replaceAll("");
        
        if (slug.length() > 100) {
            slug = slug.substring(0, 100);
        }
        
        return slug;
    }
}
