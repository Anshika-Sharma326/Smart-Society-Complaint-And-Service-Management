package com.smartsociety.smart_society_portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.smartsociety.smart_society_portal.entity.Notification;
import com.smartsociety.smart_society_portal.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public Notification addNotification(
            @RequestBody Notification notification) {

        return notificationService.addNotification(
                notification);
    }

    @GetMapping
    public List<Notification> getAllNotifications() {

        return notificationService
                .getAllNotifications();
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(
            @PathVariable Long id) {

        notificationService.deleteNotification(id);
    }
}