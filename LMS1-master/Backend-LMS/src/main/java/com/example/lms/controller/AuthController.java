package com.example.lms.controller;

import com.example.lms.entity.Auth;
import com.example.lms.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth-api")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // ✅ Register User
    @PostMapping("/register")
    public ResponseEntity<Auth> registerUser(@RequestBody Auth auth) {
        Auth savedUser = authService.registerUser(auth);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // ✅ Get all users
    @GetMapping("/all")
    public ResponseEntity<List<Auth>> getAllUsers() {
        List<Auth> users = authService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // ✅ Get user by ID
    @GetMapping("/get/{id}")
    public ResponseEntity<Auth> getUserById(@PathVariable int id) {
        Auth user = authService.getUserById(id);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @PostMapping("/login")
    public ResponseEntity<Auth> login(@RequestBody Auth loginRequest) {
        Auth user = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        Auth existing = authService.getUserById(id);
        if (existing != null) {
            authService.deleteUser(id);
            return new ResponseEntity<>("User with ID " + id + " deleted successfully.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Cannot delete. User with ID " + id + " not found.", HttpStatus.NOT_FOUND);
        }
    }
}
