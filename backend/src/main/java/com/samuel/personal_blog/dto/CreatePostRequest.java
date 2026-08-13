package com.samuel.personal_blog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CreatePostRequest {

    @NotBlank(message = "Post title is required.")
    @Size(max = 50, message = "Post title cannot exceed 50 characters.")
    private String title;

    @NotBlank(message = "Post content is required.")
    @Size(max = 1000, message = "Post title cannot exceed 1000 characters.")
    private String content;

    private LocalDateTime date;

}
