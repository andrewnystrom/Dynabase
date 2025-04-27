package com.dynabase.backend.dto;

import java.util.List;

public class UserProfile {
    public String username;
    public String email;
    public List<String> roles;

    public UserProfile() {
        // Empty constructor needed for Jackson
    }

    public UserProfile(String username, String email, List<String> roles) {
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
}
