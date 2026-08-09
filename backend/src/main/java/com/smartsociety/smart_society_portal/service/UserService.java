package com.smartsociety.smart_society_portal.service;

import java.util.List;

import com.smartsociety.smart_society_portal.dto.LoginRequest;
import com.smartsociety.smart_society_portal.dto.LoginResponse;
import com.smartsociety.smart_society_portal.entity.User;
import com.smartsociety.smart_society_portal.dto.StaffRegistrationRequest;
import com.smartsociety.smart_society_portal.dto.ChangePasswordRequest;
public interface UserService {

    User registerUser(User user);
    User getUserByEmail(String email);
    List<User> getAllUsers();

    User getUserById(Long id);

    User updateUser(Long id, User user);
    User registerStaff(StaffRegistrationRequest request);
    void deleteUser(Long id);
   
    
    LoginResponse login(LoginRequest request);
    String changePassword(Long userId, ChangePasswordRequest request);
    void resetPassword(String email, String password);
}