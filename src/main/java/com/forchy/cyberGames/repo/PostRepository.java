package com.forchy.cyberGames.repo;

import com.forchy.cyberGames.models.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Long> {
}
