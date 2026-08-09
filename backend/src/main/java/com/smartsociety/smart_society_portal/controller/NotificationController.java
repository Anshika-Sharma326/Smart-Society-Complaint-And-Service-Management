package com.smartsociety.smart_society_portal.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.smartsociety.smart_society_portal.entity.Notification;
import com.smartsociety.smart_society_portal.service.NotificationService;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public Notification addNotification(
            @RequestBody Notification notification) {

        return notificationService.addNotification(notification);
    }

    @GetMapping
    public List<Notification> getAllNotifications() {

        return notificationService.getAllNotifications();
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(
            @PathVariable Long id) {

        notificationService.deleteNotification(id);
    }
    @GetMapping("/user/{userId}")
    public List<Notification> getNotificationsByUser(
            @PathVariable Long userId) {

        return notificationService.getNotificationsByUser(userId);
    }
}
