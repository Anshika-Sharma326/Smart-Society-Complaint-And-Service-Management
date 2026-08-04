package com.smartsociety.smart_society_portal.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.smartsociety.smart_society_portal.dto.ChangePasswordRequest;
import com.smartsociety.smart_society_portal.dto.LoginRequest;
import com.smartsociety.smart_society_portal.dto.LoginResponse;
import com.smartsociety.smart_society_portal.dto.ResetPasswordRequest;
import com.smartsociety.smart_society_portal.entity.User;
import com.smartsociety.smart_society_portal.service.UserService;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {


    @Autowired
    private UserService userService;



    // Register User
    @PostMapping
    public User registerUser(
            @RequestBody User user
    ) {

        return userService.registerUser(user);

    }



    // Get All Users
    @GetMapping
    public List<User> getAllUsers() {

        return userService.getAllUsers();

    }



    // Get User By Id
    @GetMapping("/{id}")
    public User getUserById(
            @PathVariable Long id
    ) {

        return userService.getUserById(id);

    }



    // Update User
    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user
    ) {

        return userService.updateUser(id, user);

    }



    // Delete User
    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id
    ) {

        userService.deleteUser(id);

        return "User deleted successfully";

    }



    // Login
    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request
    ) {

        return userService.login(request);

    }



    // Get Profile By Email
    @GetMapping("/profile/{email}")
    public User getUserByEmail(
            @PathVariable String email
    ) {

        return userService.getUserByEmail(email);

    }



    // Change Password
    @PutMapping("/change-password/{id}")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id,
            @RequestBody ChangePasswordRequest request
    ) {


        String result =
                userService.changePassword(id, request);


        return ResponseEntity.ok(result);

    }



    // Forgot Password / Reset Password
    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @RequestBody ResetPasswordRequest request
    ) {


        userService.resetPassword(
                request.getEmail(),
                request.getPassword()
        );


        return ResponseEntity.ok(
                "Password Updated Successfully"
        );

    }

}