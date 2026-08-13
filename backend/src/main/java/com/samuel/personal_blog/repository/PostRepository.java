package com.samuel.personal_blog.repository;

import com.samuel.personal_blog.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}