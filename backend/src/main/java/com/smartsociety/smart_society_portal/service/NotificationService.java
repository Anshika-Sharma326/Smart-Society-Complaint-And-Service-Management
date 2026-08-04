package com.smartsociety.smart_society_portal.service;

import java.util.List;

import com.smartsociety.smart_society_portal.entity.Notification;

public interface NotificationService {

    Notification addNotification(Notification notification);

    List<Notification> getAllNotifications();

    void deleteNotification(Long id);
}