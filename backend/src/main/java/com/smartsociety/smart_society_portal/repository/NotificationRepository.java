package com.smartsociety.smart_society_portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartsociety.smart_society_portal.entity.Notification;

@Repository
public interface NotificationRepository
        extends JpaRepository<Notification, Long> {
}