package com.samuel.personal_blog.service;

import com.samuel.personal_blog.dto.CreatePostRequest;
import com.samuel.personal_blog.dto.PostResponse;
import com.samuel.personal_blog.dto.UpdatePostRequest;
import com.samuel.personal_blog.entity.Post;
import com.samuel.personal_blog.repository.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    private PostResponse toResponse(Post post) {
        return PostResponse.builder()
                .id(post.getId())
                .name(post.getTitle())
                .content(post.getContent())
                .date(post.getDate())
                .build();
    }

    public List<PostResponse> findAll() {
        List<Post> posts = postRepository.findAll();

        return posts.stream().map(post -> new PostResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getDate()
        )).toList();
    }

    public PostResponse findById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found."));

        return toResponse(post);
    }

    public PostResponse create(CreatePostRequest request) {

        Post post = new Post();

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setDate(LocalDateTime.now());

        postRepository.save(post);

        return toResponse(post);
    }

    public PostResponse update(UpdatePostRequest request, Long id) {

        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setDate(LocalDateTime.now());

        postRepository.save(post);

        return toResponse(post);
    }

    public void delete(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not Found"));

        postRepository.delete(post);
    }
}
