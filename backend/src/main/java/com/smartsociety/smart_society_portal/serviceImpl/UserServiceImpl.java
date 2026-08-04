package com.smartsociety.smart_society_portal.serviceImpl;
import java.util.Optional;

import com.smartsociety.smart_society_portal.dto.LoginRequest;
import com.smartsociety.smart_society_portal.dto.LoginResponse;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartsociety.smart_society_portal.entity.User;
import com.smartsociety.smart_society_portal.exception.ResourceNotFoundException;
import com.smartsociety.smart_society_portal.repository.UserRepository;
import com.smartsociety.smart_society_portal.service.UserService;
import org.springframework.http.ResponseEntity;
import com.smartsociety.smart_society_portal.dto.ChangePasswordRequest;
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getUserById(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

    }

    @Override
    public User updateUser(Long id, User user) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        existingUser.setName(user.getName());
        existingUser.setPhone(user.getPhone());

        return userRepository.save(existingUser);
    }
    @Override
    public void deleteUser(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        userRepository.delete(user);
    }
    
    @Override
    public User getUserByEmail(String email) {

        return userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        Optional<User> optionalUser =
                userRepository.findByEmail(request.getEmail());

        if (optionalUser.isEmpty()) {
            throw new RuntimeException(
                    "Invalid Email or Password"
            );
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException(
                    "Invalid Email or Password"
            );
        }

        return new LoginResponse(
                user.getId(),
                "Login Successful",
                user.getRole().name(),
                user.getName(),
                user.getEmail()
        );
    }
    @Override
    public String changePassword(Long id, ChangePasswordRequest request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!user.getPassword().equals(request.getOldPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(request.getNewPassword());
        userRepository.save(user);

        return "Password changed successfully";
    }
    @Override
    public void resetPassword(String email, String password) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new RuntimeException("User not found")
                );

        user.setPassword(password);

        userRepository.save(user);
    }
    }
