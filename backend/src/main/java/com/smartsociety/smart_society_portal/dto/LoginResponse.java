package com.smartsociety.smart_society_portal.dto;

public class LoginResponse {

    private Long id;
    private String message;
    private String role;
    private String name;
    private String email;

    public LoginResponse() {
    }

    public LoginResponse(
            Long id,
            String message,
            String role,
            String name,
            String email
    ) {
        this.id = id;
        this.message = message;
        this.role = role;
        this.name = name;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}