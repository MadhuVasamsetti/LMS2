package com.example.lms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.lms.entity.Auth;

public interface AuthRepository extends JpaRepository<Auth, Integer> {

    // custom finder by email (for login)
    Auth findByEmail(String email);
}
