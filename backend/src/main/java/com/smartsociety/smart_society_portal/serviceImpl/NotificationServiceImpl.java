package com.smartsociety.smart_society_portal.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smartsociety.smart_society_portal.entity.Notification;
import com.smartsociety.smart_society_portal.repository.NotificationRepository;
import com.smartsociety.smart_society_portal.service.NotificationService;

@Service
public class NotificationServiceImpl
        implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public Notification addNotification(
            Notification notification) {

        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @Override
    public void deleteNotification(Long id) {
        notificationRepository.deleteById(id);
    }
}