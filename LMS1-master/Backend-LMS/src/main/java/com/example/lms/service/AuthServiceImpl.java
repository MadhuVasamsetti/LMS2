package com.example.lms.service;

import com.example.lms.entity.Auth;
import com.example.lms.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private AuthRepository authRepository;

    @Override
    public Auth registerUser(Auth auth) {
        return authRepository.save(auth);
    }

    @Override
    public List<Auth> getAllUsers() {
        return authRepository.findAll();
    }

    @Override
    public Auth getUserById(int id) {
        return authRepository.findById(id).orElse(null);
    }

    @Override
    public Auth login(String email, String password) {
        Auth user = authRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    @Override
    public void deleteUser(int id) {
        authRepository.deleteById(id);
    }
}
