package com.example.lms.service;

import com.example.lms.entity.Auth;
import java.util.List;

public interface AuthService {

    Auth registerUser(Auth auth);

    List<Auth> getAllUsers();

    Auth getUserById(int id);

    Auth login(String email, String password);

    void deleteUser(int id);
}
