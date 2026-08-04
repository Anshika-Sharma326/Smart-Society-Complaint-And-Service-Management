package com.smartsociety.smart_society_portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartsociety.smart_society_portal.dto.DashboardResponse;
import com.smartsociety.smart_society_portal.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;
    

    @GetMapping
    public DashboardResponse getDashboard() {
        return dashboardService.getDashboardData();
    }
}